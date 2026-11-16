// FR-09 Mã giảm giá — data-driven từ data/fr09.json.
import { test, expect } from '@playwright/test';
import { loadCases } from '../helpers/data';
import { registerAndLogin, addCouponUsage } from '../helpers/auth';
import { ShopPage } from '../pages/ShopPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type Input = {
  product: string;
  code: string;
  total?: number; // nhập vào ô tổng tiền ở Checkout (ô sửa được — lỗi FR-08)
  logoutBeforeApply?: boolean;
  usage?: { couponId: number; times: number }; // lượt đã dùng mã, dựng bằng API
};
type Expected = {
  outcome: 'applied' | 'rejected' | 'disabled';
  total: number; // tổng trước khi áp mã (và tổng giữ nguyên khi bị từ chối)
  discount?: number | number[]; // mảng = chấp nhận nhiều cách làm tròn
  final?: number;
};

const cases = loadCases<Input, Expected>('fr09');

test.describe('FR-09 Mã giảm giá', () => {
  for (const tc of cases) {
    const annotation = [{ type: 'type', description: tc.type }, ...(tc.note ? [{ type: 'note', description: tc.note }] : [])];

    test(`${tc.id} | ${tc.title}`, { annotation }, async ({ page }) => {
      const shop = new ShopPage(page);
      const co = new CheckoutPage(page);
      const { input, expected } = tc;

      await test.step('Chuẩn bị', async () => {
        const { token } = await registerAndLogin(page); // user mới cho mỗi test
        if (input.usage) await addCouponUsage(page, token, input.usage.couponId, input.usage.times);
        await shop.open(); // goto duy nhất
        // Chờ AuthContext tải xong user; nếu không, user_id gửi đi là null và C5 bị bỏ qua.
        await expect(shop.greeting, 'Phải đăng nhập xong trước khi mua hàng').toBeVisible();
        await shop.addToCart(input.product);
        await shop.goToCheckout();
        await expect(page, 'Phải tới trang Checkout bằng click').toHaveURL(/\/checkout$/);
      });

      await test.step('Thực hiện', async () => {
        if (input.total !== undefined) await co.setTotal(input.total);
        if (input.logoutBeforeApply) {
          await shop.logout();
          await expect(shop.loginLink, 'Đã thoát đăng nhập').toBeVisible();
        }
        await co.enterCode(input.code);
        await co.applyIfEnabled();
      });

      await test.step('Kiểm tra', async () => {
        // Expected chỉ lấy từ tc.expected (theo đặc tả FR-09).
        if (expected.outcome === 'disabled') {
          // AP-02 trạng thái: mã rỗng → không áp dụng được.
          await expect(co.applyButton, 'Mã rỗng thì nút "Áp dụng" phải bị vô hiệu hóa').toBeDisabled();
        }

        if (expected.outcome === 'applied') {
          // AP-03 hiển thị: thông báo áp dụng thành công.
          await expect(co.successMessage, 'Phải hiện thông báo áp dụng mã thành công').toBeVisible();
          await expect(co.couponError, 'Không được có thông báo lỗi khi mã hợp lệ').toHaveCount(0);

          // AP-04 giá trị số: số tiền giảm theo công thức FR-09.
          const allowed = Array.isArray(expected.discount) ? expected.discount : [expected.discount];
          const discount = await co.money(co.savings);
          expect(allowed, `Số tiền giảm phải là ${allowed.join(' hoặc ')}`).toContain(discount);

          const final = expected.final ?? expected.total - discount;
          await expect
            .poll(() => co.money(co.finalAmount), { message: `Thành tiền phải là ${final}` })
            .toBe(final);
          await expect
            .poll(() => co.money(co.grandTotal), { message: `Tổng thanh toán phải là ${final}` })
            .toBe(final);
          return;
        }

        if (expected.outcome === 'rejected') {
          // AP-03 hiển thị: thông báo lỗi, không có kết quả giảm giá.
          await expect(co.couponError, 'Mã không hợp lệ phải hiện thông báo lỗi').toBeVisible();
          await expect(co.successMessage, 'Mã bị từ chối thì không được hiện kết quả giảm giá').toHaveCount(0);
        }

        // AP-04 giá trị số + AP-01 giá trị ô nhập: tổng giữ nguyên khi không áp được mã.
        await expect
          .poll(() => co.money(co.grandTotal), { message: `Tổng thanh toán phải giữ nguyên ${expected.total}` })
          .toBe(expected.total);
        await expect(co.totalInput, 'Ô tổng tiền phải giữ nguyên').toHaveValue(String(expected.total));
      });
    });
  }
});
