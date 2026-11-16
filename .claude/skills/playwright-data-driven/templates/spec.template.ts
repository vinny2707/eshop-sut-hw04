// TEMPLATE → hw04/automation/tests/<fr>.spec.ts. Thay mọi <...>; giữ nguyên cấu trúc.
import { test, expect } from '@playwright/test';
import { loadCases } from '../helpers/data';
// import { loginAs } from '../helpers/auth';     // fr09, fr17: gọi TRƯỚC goto đầu tiên
// import { ADMIN_URL } from '../helpers/env';    // fr17
import { <Name>Page } from '../pages/<Name>Page';

type Input = { <field>?: string };
type Expected = { outcome: 'success' | 'rejected'; url: string; message?: string };

const cases = loadCases<Input, Expected>('<fr>');

test.describe('<FR-xx> <Tên tính năng>', () => {
  // test.use({ baseURL: ADMIN_URL });           // fr17

  for (const tc of cases) {
    test(`${tc.id} | ${tc.title}`, { annotation: [{ type: 'type', description: tc.type }] }, async ({ page }) => {
      const p = new <Name>Page(page);

      await test.step('Chuẩn bị', async () => {
        // await loginAs(page, 'user');
        await p.open();
      });

      await test.step('Thực hiện', async () => {
        await p.fillForm(tc.input);
        await p.submit();
      });

      await test.step('Kiểm tra', async () => {
        // Expected CHỈ lấy từ tc.expected (theo đặc tả). Mỗi nhánh phải có ít nhất một expect.
        // AP-01 URL
        await expect(page).toHaveURL(new RegExp(`${tc.expected.url}$`));

        if (tc.expected.outcome === 'success') {
          // AP-02 nội dung hiển thị
          // await expect(p.message).toHaveText(tc.expected.message!);
        } else {
          // AP-02 thông báo lỗi
          // await expect(p.message).toBeVisible();
          // AP-03 validation HTML5
          // expect(await p.<field>Input.evaluate((el: HTMLInputElement) => el.validationMessage)).not.toBe('');
        }
        // Khác: toHaveValue (giá trị ô nhập / tổng tiền), toHaveCount (số dòng trong bảng).
      });
    });
  }
});
