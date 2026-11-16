// Page Object cho trang /register (FR-01). Chỉ chứa locator + thao tác, không có expect.
import type { Page, Locator } from '@playwright/test';

export type RegisterInput = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type RegisterField = keyof RegisterInput;

export class RegisterPage {
  readonly page: Page;

  // Label không gắn với input (không có htmlFor) nên getByLabel không dùng được:
  // chọn input đứng ngay sau label có đúng nhãn đó.
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  // Khối thông báo lỗi không có role / thuộc tính ổn định: là div con trực tiếp của khung chứa form.
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('label:text-is("Họ Tên") + input');
    this.emailInput = page.locator('label:text-is("Email") + input');
    this.passwordInput = page.locator('label:text-is("Mật khẩu") + input');
    this.confirmPasswordInput = page.locator('label:text-is("Xác nhận mật khẩu") + input');
    this.submitButton = page.getByRole('button', { name: 'Đăng Ký' });
    this.errorMessage = page.locator('div:has(> form) > div');
  }

  async open() {
    await this.page.goto('/register');
  }

  // Trường nào không có trong input thì để trống.
  async fillForm(input: RegisterInput) {
    if (input.name !== undefined) await this.nameInput.fill(input.name);
    if (input.email !== undefined) await this.emailInput.fill(input.email);
    if (input.password !== undefined) await this.passwordInput.fill(input.password);
    if (input.confirmPassword !== undefined) await this.confirmPasswordInput.fill(input.confirmPassword);
  }

  async submit() {
    await this.submitButton.click();
  }

  field(name: RegisterField): Locator {
    return {
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
      confirmPassword: this.confirmPasswordInput,
    }[name];
  }
}
