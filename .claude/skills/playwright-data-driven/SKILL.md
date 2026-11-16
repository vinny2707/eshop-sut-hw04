---
name: playwright-data-driven
description: Tự động hóa một tính năng EShop (fr01 / fr09 / fr17) bằng Playwright theo kiểu data-driven, chạy 3 trình duyệt, qua 4 bước có điểm dừng để sinh viên duyệt — chọn TC từ HW02, khảo sát UI + sinh data JSON, sinh Page Object + spec rồi chạy, sửa theo review và nháp báo cáo. Dùng khi người dùng gõ /playwright-data-driven hoặc nhờ tự động hóa một FR.
argument-hint: "<fr01|fr09|fr17> [bước 1-4]"
---

# Playwright data-driven

Đối số: `$ARGUMENTS` = `<fr> [bước]`. Không có bước → bắt đầu từ bước 1. Có bước → đọc các file đã có của FR đó rồi làm tiếp từ bước ấy.

## Đường dẫn

| Thứ | Vị trí |
| :-- | :-- |
| TC nguồn (chỉ đọc) | `D:/semester1-year4/software_testing/lab/HW02/eshop-sut/hw02/reports/23120409_HW02_Report.md` |
| Đặc tả SUT | `README.md` (gốc repo) |
| Code UI | `frontend-web/src/`, `frontend-admin/src/` |
| Automation | `hw04/automation/` — `data/`, `pages/`, `helpers/`, `tests/` |
| Báo cáo | `hw04/reports/23120409_HW04_Report.md` (FR-01 → mục 3, FR-09 → mục 4, FR-17 → mục 5), `hw04/reports/bug_report.md` |

Hạ tầng đã có, **không sửa**: `playwright.config.ts`, `scripts/run-all.mjs`, `scripts/build-dashboard.mjs`. `helpers/env.ts` chỉ được thêm tài khoản seed, không sửa URL / MSSV. Backend tự reset DB mỗi lượt chạy.

## Quy trình — 4 bước, dừng sau mỗi bước

### Bước 1 — Chọn TC
- Đọc phần FR trong báo cáo HW02 và mục FR trong đặc tả.
- Chọn **12–15 TC tiêu biểu**: đủ Positive / Negative / Edge, mỗi nhóm EC / biên BVA có đại diện, ưu tiên TC đã lộ bug ở HW02, bỏ TC gần trùng.
- Xuất bảng: `ID (FRxx-AT-NN) | Nguồn HW02 | Loại | Mô tả | Expected (theo đặc tả)`.
- Liệt kê TC không tự động hóa được + lý do.

### Bước 2 — Khảo sát UI + sinh data
- Đọc code trang liên quan (mở trang thật nếu cần). Xuất bảng: route, phần tử, selector đề xuất, thông báo thành công / lỗi, điểm dễ flaky (validation HTML5, `alert`, toast, điều hướng).
- Sinh `data/<fr>.json` theo khuôn bên dưới.

### Bước 3 — Sinh Page Object + spec, chạy, phân loại
- Sinh `pages/<Tên>Page.ts`, `tests/<fr>.spec.ts` **theo đúng** `templates/page.template.ts` và `templates/spec.template.ts` (trong thư mục skill này), cùng helper còn thiếu.
- Kiểm tra biên dịch: `npx playwright test --list` (trong `hw04/automation`).
- Chạy: `npm run test:<fr>` (3 trình duyệt, ra `reports/<fr>/<browser>/` và dashboard `reports/index.html`).
- Đọc `reports/<fr>/<browser>.json`, xuất bảng phân loại fail: `TC | Trình duyệt | Thông báo lỗi | Bug SUT / Lỗi script / Flaky | Lý do`.
- Đưa **checklist review** để sinh viên tự xem, chỉ rõ chỗ trong code:
  - Selector: dễ vỡ? (class CSS, `nth`, text dễ đổi)
  - Assertion: yếu? sai expected so với đặc tả?
  - Edge case: TC đã chọn nào chưa được phủ?
  - Wait: chờ cứng hoặc chờ thiếu?
- Nhắc: commit bản AI **trước khi sửa** (sinh viên tự commit).

### Bước 4 — Sửa theo review, nháp báo cáo
- Sinh viên liệt kê vấn đề. **Chỉ sửa đúng các điểm đó**, không tự review thêm.
- Chạy lại `npm run test:<fr>` đến khi chỉ còn fail do bug SUT.
- Nháp vào mục FR của báo cáo chính:
  - Bảng TC tự động hóa (cột Kết quả ghi theo thứ tự Chromium / Firefox / WebKit) + TC không tự động hóa được.
  - Bảng kết quả chạy: thời điểm ISO, tổng / pass / fail, link `../automation/reports/<fr>/<browser>/index.html`.
  - Bảng bug.
  - AI gap analysis: mỗi điểm sinh viên nêu → AI sai gì, loại (Selector / Assertion / Edge case / Wait), nguyên nhân (**Prompt / Giới hạn AI / Đặc điểm tính năng**), cách xử lý. Để trống cột Commit, Audit.
- Nháp `bug_report.md` cho mỗi bug SUT, ảnh lấy từ `../automation/reports/<fr>/<browser>-shots/`. Để trống cột GitHub Issue.

### Khi dừng mỗi bước
Tóm tắt kết quả, liệt kê file đã tạo / sửa, nhắc `/ai-audit`. Chờ sinh viên trả lời rồi mới sang bước sau.

## Quy ước

**Data** — `data/<fr>.json`, mảng, mỗi phần tử một TC:

```json
{
  "id": "FR01-AT-05",
  "source": "FR01-TC-15",
  "type": "Negative",
  "title": "Email đã tồn tại",
  "input": { "name": "Test", "email": "test@eshop.com", "password": "Abcdef1!" },
  "expected": { "outcome": "rejected", "url": "/register", "message": "..." }
}
```

`"{{unique}}"` trong chuỗi email → helper thay bằng email duy nhất lúc chạy.

**Page Object + spec**: theo `templates/`. Page Object chỉ có locator + thao tác (không `expect`). Spec: `loadCases` → `test.describe` → mỗi TC một `test` (tên `id | title`, annotation `type`) → 3 `test.step` Chuẩn bị / Thực hiện / Kiểm tra.

- **Không hardcode dữ liệu** trong spec / page; mọi input và expected lấy từ JSON.
- **Assertion chỉ ở tầng UI**, mỗi FR ≥ 3 kiểu: `toHaveURL`, `toBeVisible` / `toHaveText`, `toHaveValue`, `toHaveCount`, `validationMessage` của input HTML5…
- **Oracle theo đặc tả.** Fail do SUT sai → giữ test, ghi bug. Không chỉnh expected cho khớp hành vi thực tế.
- **Selector**: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByText` > CSS. Không `nth`, không XPath. **Không sửa code SUT.**
- **Chờ**: chỉ web-first assertion. Không `waitForTimeout`.
- Dự án là ESM: đọc file bằng `fs` + `new URL('../data/<fr>.json', import.meta.url)`.

**Helper** (tạo ở bước 3 nếu chưa có, trong `helpers/`, dùng chung cho cả 3 FR — đã có thì dùng lại, không sinh lại):
- `data.ts` — `loadCases<I, E>(fr)`: đọc `data/<fr>.json`, thay `{{unique}}` bằng `<fr>-<timestamp>-<i>-<rand>@test.com`.
- `auth.ts` — `loginAs(page, 'user' | 'admin')`: gọi `POST /api/login`, ghi token bằng `page.addInitScript` **trước** `goto` đầu tiên. Tài khoản seed đặt trong `helpers/env.ts`. Chỉ để chuẩn bị, không dùng để kiểm tra.

## Lưu ý theo FR

- **fr01**: email trong seed `test@eshop.com`; cột email không có UNIQUE.
- **fr09**: user `test@eshop.com` / `Test1234!`, token ở `localStorage["token"]`. **Giỏ hàng chỉ nằm trong bộ nhớ React** (không dùng `/api/cart`) → thêm sản phẩm qua UI, rồi đi đến Checkout bằng click; **không `goto` / reload sau khi đã thêm hàng**. Checkout có ô tổng tiền sửa được (`editableTotal`) — đối chiếu đặc tả ở bước 1 để quyết định dùng làm input hay ghi bug. Coupon seed: `SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`.
- **fr17**: admin `admin@eshop.com` / `Admin123!` (không phải `admin123` như setup_guide), token ở `localStorage["adminToken"]`, `test.use({ baseURL: ADMIN_URL })`.

## Không làm
Không tự commit, không đăng GitHub Issue, không điền Verdict trong audit, không sửa hạ tầng hay code SUT.
