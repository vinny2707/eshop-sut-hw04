// FR-17 Quản lý mã giảm giá (Web Admin) — data-driven từ data/fr17.json.
import { test, expect } from '@playwright/test';
import { loadCases } from '../helpers/data';
import { loginAs } from '../helpers/auth';
import { ADMIN_URL } from '../helpers/env';
import { AdminCouponPage, type CouponForm, type CouponField } from '../pages/AdminCouponPage';

type Input = {
  action: 'create' | 'view' | 'delete';
  coupon?: CouponForm; // create
  code?: string; // delete
};
type Expected = {
  outcome: 'created' | 'rejected' | 'listed' | 'deleted';
  row?: string[]; // 6 ô mong đợi của dòng vừa tạo
  rows?: string[][]; // listed: các dòng mã seed
  rejectedBy?: 'browser' | 'app'; // validation HTML5 hay thông báo lỗi (alert) của app
  invalidField?: CouponField;
  remaining?: string[]; // deleted: các mã phải còn lại
};

const cases = loadCases<Input, Expected>('fr17');

/** Data thiếu trường / gõ sai → fail ngay, không để test "pass" mà không kiểm tra gì. */
function validateCase(id: string, input: Input, expected: Expected): void {
  const fail = (msg: string): never => {
    throw new Error(`Data không hợp lệ ở ${id}: ${msg}`);
  };
  if (!['create', 'view', 'delete'].includes(input.action)) fail(`input.action "${input.action}"`);
  if (input.action === 'create' && !input.coupon) fail('thiếu input.coupon');
  if (input.action === 'delete' && !input.code) fail('thiếu input.code');
  switch (expected.outcome) {
    case 'created':
      if (expected.row?.length !== 6) fail('expected.row phải có đúng 6 ô');
      break;
    case 'listed':
      if (!expected.rows?.length) fail('thiếu expected.rows');
      break;
    case 'deleted':
      if (!input.code) fail('thiếu input.code');
      break;
    case 'rejected':
      if (expected.rejectedBy === 'browser') {
        if (!expected.invalidField) fail('thiếu expected.invalidField');
      } else if (expected.rejectedBy !== 'app') {
        fail(`expected.rejectedBy "${expected.rejectedBy}"`);
      }
      break;
    default:
      fail(`expected.outcome "${expected.outcome}"`);
  }
}

test.describe('FR-17 Quản lý mã giảm giá', () => {
  test.use({ baseURL: ADMIN_URL });

  for (const tc of cases) {
    const annotation = [{ type: 'type', description: tc.type }, ...(tc.note ? [{ type: 'note', description: tc.note }] : [])];

    test(`${tc.id} | ${tc.title}`, { annotation }, async ({ page }) => {
      const p = new AdminCouponPage(page);
      const { input, expected } = tc;
      validateCase(tc.id, input, expected);

      // App báo lỗi bằng alert(): ghi lại nội dung rồi accept để trang không bị chặn.
      const dialogs: string[] = [];
      page.on('dialog', async (dialog) => {
        dialogs.push(dialog.message());
        await dialog.accept();
      });

      let rowsBefore = 0;

      await test.step('Chuẩn bị', async () => {
        await loginAs(page, 'admin');
        await p.open();
        await expect(p.heading, 'Phải vào được trang quản trị').toBeVisible();
        await p.openCouponsTab();
        // Heading hiện trước khi bảng tải xong → chờ một dòng seed rồi mới đếm.
        await expect(p.row('SAVE10'), 'Bảng mã giảm giá phải tải xong').toBeVisible();
        rowsBefore = await p.rows.count();
      });

      await test.step('Thực hiện', async () => {
        // Data đã được validateCase kiểm tra: create có coupon, delete có code.
        if (input.action === 'create') {
          await p.fillForm(input.coupon!);
          await p.submit();
        } else if (input.action === 'delete') {
          await p.deleteRow(input.code!);
        }
      });

      await test.step('Kiểm tra', async () => {
        // Expected chỉ lấy từ tc.expected (theo đặc tả FR-17).
        if (expected.outcome === 'created') {
          const row = expected.row!;
          const code = row[0];
          // AP-04 giá trị: dòng mới hiển thị đúng 6 trường.
          await expect
            .poll(() => p.rowValues(code), { message: `Dòng ${code} phải hiển thị đúng giá trị đã nhập` })
            .toEqual(row);
          // AP-03 số lượng: tạo đúng 1 mã.
          await expect(p.row(code), `Chỉ có 1 dòng ${code}`).toHaveCount(1);
          expect(dialogs, 'Tạo mã hợp lệ không được có thông báo lỗi').toEqual([]);
        }

        if (expected.outcome === 'listed') {
          for (const r of expected.rows!) {
            await expect.poll(() => p.rowValues(r[0]), { message: `Mã ${r[0]} phải hiển thị đủ 6 cột` }).toEqual(r);
          }
        }

        if (expected.outcome === 'deleted') {
          const code = input.code!;
          // AP-03 số lượng: dòng bị xóa biến mất; AP-02 hiển thị: các mã khác còn nguyên.
          await expect(p.row(code), `Mã ${code} phải bị xóa khỏi bảng`).toHaveCount(0);
          for (const other of expected.remaining ?? []) {
            await expect(p.row(other), `Mã ${other} phải còn nguyên`).toBeVisible();
          }
        }

        if (expected.outcome === 'rejected') {
          if (expected.rejectedBy === 'browser') {
            const field = p.field(expected.invalidField!);
            // AP-05 validation HTML5 + focus: trình duyệt chặn submit.
            const msg = await field.evaluate((el: HTMLInputElement) => el.validationMessage);
            expect(msg, `Trường "${expected.invalidField}" phải bị validation HTML5 chặn`).not.toBe('');
            await expect(field, `Trình duyệt phải focus vào trường "${expected.invalidField}"`).toBeFocused();
          }
          if (expected.rejectedBy === 'app') {
            // AP-01 thông báo: app phải báo lỗi (alert).
            await expect
              .poll(() => dialogs.length, { message: 'Phải có thông báo lỗi khi dữ liệu mã không hợp lệ' })
              .toBeGreaterThan(0);
          }
          // AP-03 số lượng: không có dòng mới.
          await expect(p.rows, 'Không được tạo thêm mã').toHaveCount(rowsBefore);
        }
      });
    });
  }
});
