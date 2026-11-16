// Helper chuẩn bị trạng thái qua API (không dùng để kiểm tra kết quả).
import type { Page } from '@playwright/test';
import { API_URL, NEW_USER } from './env';
import { uniqueEmail } from './data';

export type SessionUser = { token: string; user: { id: number; name: string; email: string } };

/**
 * Đăng ký một user mới (email duy nhất) rồi đăng nhập; ghi token vào localStorage["token"]
 * TRƯỚC goto đầu tiên để AuthContext của frontend-web đọc được khi trang tải.
 * Mỗi test một user → lượt dùng mã (C5) không dồn giữa các test.
 */
export async function registerAndLogin(page: Page, prefix = 'fr09'): Promise<SessionUser> {
  const email = uniqueEmail(prefix);
  const { name, password } = NEW_USER;

  const reg = await page.request.post(`${API_URL}/api/register`, { data: { name, email, password } });
  if (!reg.ok()) throw new Error(`Setup failed: register HTTP ${reg.status()}`);

  const res = await page.request.post(`${API_URL}/api/login`, { data: { email, password } });
  if (!res.ok()) throw new Error(`Setup failed: login HTTP ${res.status()}`);
  const session = (await res.json()) as SessionUser;

  await page.addInitScript(([key, value]) => window.localStorage.setItem(key, value), ['token', session.token]);
  return session;
}

/** Ghi sẵn `times` lượt đã dùng mã `couponId` cho user sở hữu `token` (POST /api/coupon-usage). */
export async function addCouponUsage(page: Page, token: string, couponId: number, times: number): Promise<void> {
  for (let i = 0; i < times; i++) {
    const res = await page.request.post(`${API_URL}/api/coupon-usage`, {
      data: { coupon_id: couponId },
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok()) throw new Error(`Setup failed: coupon-usage HTTP ${res.status()}`);
  }
}
