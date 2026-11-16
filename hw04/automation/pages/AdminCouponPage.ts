// Page Object cho tab "Mã Giảm Giá" của Web Admin (FR-17). Chỉ locator + thao tác, không có expect.
import type { Page, Locator } from '@playwright/test';

export type CouponForm = {
  code: string;
  type: 'percent' | 'fixed';
  discount_value: string;
  min_order_amount: string;
  expired_at: string;
  max_uses_per_user: string;
};
export type CouponField = keyof CouponForm;

export class AdminCouponPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly couponsTab: Locator;
  // Form không có label → chọn theo placeholder.
  readonly codeInput: Locator;
  readonly typeSelect: Locator;
  readonly valueInput: Locator;
  readonly minOrderInput: Locator;
  readonly expiryInput: Locator;
  readonly maxUsesInput: Locator;
  readonly submitButton: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'EShop Admin' });
    this.couponsTab = page.getByText('Mã Giảm Giá', { exact: true }); // <li> ở thanh bên, không có role
    this.codeInput = page.getByPlaceholder('Mã coupon (VD: SAVE10)');
    this.typeSelect = page.getByRole('combobox'); // select duy nhất trên tab
    this.valueInput = page.getByPlaceholder(/Giá trị %|Số tiền/); // placeholder đổi theo loại mã
    this.minOrderInput = page.getByPlaceholder('Đơn tối thiểu (₫)');
    this.expiryInput = page.getByPlaceholder('Ngày hết hạn');
    this.maxUsesInput = page.getByPlaceholder('Số lần dùng tối đa/người');
    this.submitButton = page.getByRole('button', { name: 'Tạo mã' });
    this.rows = page.getByRole('table').getByRole('row'); // gồm cả dòng tiêu đề
  }

  /**
   * Dòng của bảng có ít nhất một ô (bất kỳ cột nào) có nội dung đúng bằng `code`.
   * Với data hiện tại chỉ ô Mã khớp vì mã không trùng nội dung các cột khác.
   */
  row(code: string): Locator {
    return this.rows.filter({ has: this.page.getByRole('cell', { name: code, exact: true }) });
  }

  async open() {
    await this.page.goto('/');
  }

  async openCouponsTab() {
    await this.couponsTab.click();
  }

  // Chọn loại trước: placeholder ô giá trị đổi theo loại mã.
  async fillForm(c: CouponForm) {
    await this.typeSelect.selectOption(c.type);
    await this.codeInput.fill(c.code);
    await this.valueInput.fill(c.discount_value);
    await this.minOrderInput.fill(c.min_order_amount);
    await this.expiryInput.fill(c.expired_at);
    await this.maxUsesInput.fill(c.max_uses_per_user);
  }

  async submit() {
    await this.submitButton.click();
  }

  // Nội dung trang cuộn trong khung riêng (không phải window): đưa đáy bảng vào khung nhìn
  // để ảnh chụp lúc fail thấy được các dòng mới nhất.
  async scrollTableToEnd() {
    await this.page.getByRole('table').evaluate((el) => el.scrollIntoView({ block: 'end' }));
  }

  async deleteRow(code: string) {
    await this.row(code).getByRole('button', { name: 'Xóa' }).click();
  }

  field(name: CouponField): Locator {
    return {
      code: this.codeInput,
      type: this.typeSelect,
      discount_value: this.valueInput,
      min_order_amount: this.minOrderInput,
      expired_at: this.expiryInput,
      max_uses_per_user: this.maxUsesInput,
    }[name];
  }

  /** 6 ô đầu của dòng (bỏ ô nút "Xóa"), bỏ dấu phân cách hàng nghìn theo locale: "200,000 ₫" → "200000 ₫". */
  async rowValues(code: string): Promise<string[]> {
    const cells = await this.row(code).getByRole('cell').allInnerTexts();
    return cells.slice(0, 6).map((t) => t.trim().replace(/(\d)[,.  ](?=\d{3}\b)/g, '$1'));
  }
}
