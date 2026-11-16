// FR-01 Đăng ký tài khoản — data-driven từ data/fr01.json.
import { test, expect } from '@playwright/test';
import { loadCases } from '../helpers/data';
import { RegisterPage, type RegisterInput, type RegisterField } from '../pages/RegisterPage';

type Expected = {
  outcome: 'success' | 'rejected';
  url: string;
  invalidField?: RegisterField; // trường bị validation HTML5 chặn
  message?: string; // từ khóa thông báo lỗi phải chứa (quy ước oracle (a))
};

const cases = loadCases<RegisterInput, Expected>('fr01');

test.describe('FR-01 Đăng ký tài khoản', () => {
  for (const tc of cases) {
    test(`${tc.id} | ${tc.title}`, { annotation: [{ type: 'type', description: tc.type }] }, async ({ page }) => {
      const p = new RegisterPage(page);

      await test.step('Chuẩn bị', async () => {
        await p.open();
      });

      await test.step('Thực hiện', async () => {
        if (tc.input.confirmPassword !== undefined) {
          // AP-02 hiển thị: FR-01 yêu cầu form có trường Xác nhận mật khẩu.
          await expect(p.confirmPasswordInput, 'Form phải có trường "Xác nhận mật khẩu" (FR-01)').toBeVisible();
        }
        await p.fillForm(tc.input);
        await p.submit();
      });

      await test.step('Kiểm tra', async () => {
        // Expected chỉ lấy từ tc.expected (theo đặc tả FR-01).
        if (tc.expected.outcome === 'success') {
          // AP-01 URL: chuyển tới trang Đăng nhập.
          await expect(page).toHaveURL(new RegExp(`${tc.expected.url}$`));
          return;
        }

        if (tc.expected.invalidField) {
          const field = p.field(tc.expected.invalidField);
          // AP-03 validation HTML5: trường bắt buộc đang trống không hợp lệ.
          const msg = await field.evaluate((el: HTMLInputElement) => el.validationMessage);
          expect(msg, `Trường "${tc.expected.invalidField}" phải bị validation HTML5 đánh dấu không hợp lệ`).not.toBe('');
          // AP-05 focus: trình duyệt chặn submit và đưa focus về trường lỗi → bằng chứng form không được gửi.
          await expect(field).toBeFocused();
          // AP-04 số lượng: form không được gửi → ứng dụng không hiện thông báo lỗi nào.
          await expect(p.errorMessage).toHaveCount(0);
        }

        if (tc.expected.message) {
          // AP-02 nội dung: thông báo lỗi nêu đúng trường bị sai.
          await expect(p.errorMessage).toBeVisible();
          await expect(p.errorMessage).toContainText(new RegExp(tc.expected.message, 'i'));
        }

        // AP-01 URL: kiểm sau cùng để không pass sớm khi trang còn đang xử lý.
        await expect(page).toHaveURL(new RegExp(`${tc.expected.url}$`));
      });
    });
  }
});
