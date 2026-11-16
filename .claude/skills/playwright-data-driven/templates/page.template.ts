// TEMPLATE → hw04/automation/pages/<Name>Page.ts. Thay mọi <...>; giữ nguyên cấu trúc.
// Page Object chỉ chứa locator + thao tác. KHÔNG đặt expect ở đây.
import type { Page, Locator } from '@playwright/test';

export class <Name>Page {
  readonly page: Page;

  // Locator khai báo một lần ở đây. Ưu tiên: getByRole > getByLabel > getByPlaceholder > getByText > CSS.
  readonly <field>Input: Locator;
  readonly submitButton: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.<field>Input = page.getByLabel('<nhãn>');
    this.submitButton = page.getByRole('button', { name: '<tên nút>' });
    this.message = page.getByText(/<mẫu thông báo>/);
  }

  async open() {
    await this.page.goto('<route>');
  }

  // Mỗi thao tác của người dùng = một method. Field nào không có trong input thì bỏ qua.
  async fillForm(input: { <field>?: string }) {
    if (input.<field> !== undefined) await this.<field>Input.fill(input.<field>);
  }

  async submit() {
    await this.submitButton.click();
  }
}
