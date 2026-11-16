// Page Object cho Trang chủ + header + Giỏ hàng (frontend-web). Chỉ locator + thao tác, không có expect.
import type { Page, Locator } from '@playwright/test';

export class ShopPage {
  readonly page: Page;

  // Header
  readonly greeting: Locator;
  readonly cartLink: Locator;
  readonly logoutButton: Locator;
  readonly loginLink: Locator;
  // Giỏ hàng
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.greeting = page.getByRole('link', { name: /^Chào,/ });
    this.cartLink = page.getByRole('link', { name: 'Giỏ hàng', exact: true });
    this.logoutButton = page.getByRole('button', { name: 'Thoát' });
    this.loginLink = page.getByRole('link', { name: 'Đăng nhập', exact: true });
    this.checkoutButton = page.getByRole('button', { name: 'Tiến hành thanh toán' });
  }

  async open() {
    await this.page.goto('/');
  }

  // Thẻ sản phẩm = phần tử cha của tiêu đề tên sản phẩm. Dùng nút "Thêm vào giỏ" ở trang chủ
  // (nút trên trang chi tiết phải bấm 2 lần — lỗi FR-07).
  async addToCart(product: string) {
    const card = this.page.getByRole('heading', { name: product, exact: true }).locator('..');
    await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
  }

  // Đi tới Checkout bằng click (giỏ hàng chỉ nằm trong bộ nhớ React; goto/reload sẽ xóa giỏ).
  async goToCheckout() {
    await this.cartLink.click();
    await this.checkoutButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}
