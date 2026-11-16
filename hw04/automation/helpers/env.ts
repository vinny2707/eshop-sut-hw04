export const STUDENT_ID = '23120409';

export const WEB_URL = 'http://localhost:5173';
export const ADMIN_URL = 'http://localhost:5174';
export const API_URL = 'http://localhost:3000';

// Tài khoản dùng cho bước chuẩn bị (không phải dữ liệu test).
// FR-09: mỗi test đăng ký một user mới với thông tin này + email duy nhất.
export const NEW_USER = { name: 'FR09 Tester', password: 'Abcdef1!' };
// FR-17: tài khoản admin trong seed (backend/database.js) — không phải "admin123" như setup_guide.
export const ADMIN = { email: 'admin@eshop.com', password: 'Admin123!' };
