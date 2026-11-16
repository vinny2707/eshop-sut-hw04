// Page Object cho trang /checkout (FR-09 áp mã giảm giá). Chỉ locator + thao tác, không có expect.
import type { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly totalInput: Locator;
  readonly codeInput: Locator;
  readonly applyButton: Locator;
  readonly successMessage: Locator;
  readonly savings: Locator;
  readonly finalAmount: Locator;
  readonly grandTotal: Locator;
  // Thông báo lỗi coupon không có role / text cố định / thuộc tính ổn định → buộc dùng class CSS.
  readonly couponError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalInput = page.getByRole('spinbutton'); // ô số duy nhất trên trang (Tổng tiền thanh toán)
    this.codeInput = page.getByPlaceholder('Nhập mã giảm giá...');
    this.applyButton = page.getByRole('button', { name: 'Áp dụng' });
    this.successMessage = page.getByText(/Áp dụng thành công/);
    this.savings = page.getByText(/^Tiết kiệm:/);
    this.finalAmount = page.getByText(/^Thành tiền:/);
    this.grandTotal = page.getByText(/^Tổng thanh toán:/);
    this.couponError = page.locator('p.text-red-600');
  }

  // Sửa ô tổng tiền sẽ xóa mã đã áp → luôn gọi trước apply().
  async setTotal(total: number) {
    await this.totalInput.fill(String(total));
  }

  async enterCode(code: string) {
    await this.codeInput.fill(code);
  }

  async apply() {
    await this.applyButton.click();
  }

  /** Đọc số tiền trong một dòng hiển thị; bỏ dấu phân cách theo locale, giữ dấu "-" của số âm. */
  async money(locator: Locator): Promise<number> {
    const text = (await locator.textContent()) ?? '';
    return Number(text.replace(/[^\d-]/g, ''));
  }
}
