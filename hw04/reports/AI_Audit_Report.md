**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# **AI Audit Report — Mẫu 5 mục cho mỗi Artifact**

_Phụ lục bắt buộc đính kèm cho mọi bài tập có dùng AI (HW#01–HW#06, Seminar)._

_Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC15003 Kiểm chứng Phần mềm._

## **1. Thông tin Sinh viên**

| Mục                                  | Giá trị           |
| :----------------------------------- | :---------------- |
| **Họ tên sinh viên (in hoa):**       | NGUYỄN KHẮC VƯỢNG |
| **MSSV:**                            | 23120409          |
| **Lớp / Khoá:**                      | CSC13003 - 23_3   |
| **Mã bài tập (ví dụ HW#00, HW#02):** | HW#04             |
| **Ngày làm bài:**                    | 2026-11-16 – 2026-11-17 |
| **Công cụ AI đã dùng:**              | Claude Code (Opus 5.5) |
| **Có sử dụng AI hay không:**         | [x] Có [ ] Không  |

## **2. Hướng dẫn (đọc trước khi điền)**

- Thêm 1 hàng cho mỗi artifact AI sinh (test case, script, checklist, OpenAPI spec, JMeter plan…).
- Dán nguyên văn prompt — KHÔNG paraphrase.
- Dán nguyên văn output AI (hoặc kèm screenshot có chú thích trong báo cáo).
- Gắn nhãn: VALID / INVALID / INCOMPLETE.
- Lý do phải dẫn chiếu slide, mục ISTQB, hoặc RFC kỹ thuật.
- Hiển thị bản sửa với phần thay đổi được tô sáng.
- Hàng mẫu in nghiêng — thay trước khi nộp.

## **3. Bảng Audit — 1 hàng / artifact**

### AUDIT-01 — Hạ tầng — Cấu hình Playwright

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 17:16 (UTC+7) |
| Bước | Hạ tầng — Cấu hình Playwright đa trình duyệt và report |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
Mình nghĩ se viết skills bao gồm 1 skills viết audit report và skills playwright data driven luôn. Và dùng cho cả 3 feature luôn.  À và có dựng config cho cả cái playwright nữa
---
Chưa viết mình cần chốt với bạn rồi mới dựng chứ
---
1. chromium/firefox, webkit
2. như ý đầu tôi không reset bằng tay
3. để tự bật cho dễ kiểm soát
4. Ổn bạn. cần thêm allure là gì. Chọn playwright thôi có đủ không
---
mình chia theo kiểu report/fr/nền tảng ấy. Ngoài ra báo cáo trực quan dễ nhìn tí. không cần quay video lại nếu fail đâu screen shot là được rồi. và thông báo lỗi.
---
không cần link issue đâu bạn. Chạy ra lỗi mới đăng lên đó mà
```

**Output AI (tóm tắt):**

- Đề xuất thiết kế và hỏi chốt 4 điểm (trình duyệt, reset DB, bật server, vị trí / Allure) trước khi dựng; trả lời Playwright HTML reporter là đủ.
- Dựng project Playwright 3 project Chromium / Firefox / WebKit; `webServer` tự bật backend + web + admin, backend khởi động mới mỗi lượt để reset DB; chạy tuần tự 1 worker; chỉ lưu screenshot khi fail.
- HTML report theo `reports/<fr>/<browser>/`, tiêu đề `Run by: 23120409 | <fr>-<browser> | <ISO timestamp>`; script chạy 3 FR × 3 trình duyệt.
- Dashboard tổng `reports/index.html`: thẻ số liệu, ma trận FR × trình duyệt, lỗi kèm thông báo và screenshot; bỏ link issue theo yêu cầu.
- Bỏ theo dõi `backend/database.sqlite`, thêm `.gitignore`; kiểm chứng bằng smoke test pass trên 3 trình duyệt.
- File: [`playwright.config.ts`](../automation/playwright.config.ts), [`run-all.mjs`](../automation/scripts/run-all.mjs), [`build-dashboard.mjs`](../automation/scripts/build-dashboard.mjs), [`env.ts`](../automation/helpers/env.ts)

**Lý do verdict:**

- Đạt yêu cầu đề HW04 mục 6 Task 1: 3 trình duyệt, mỗi lượt chạy một HTML report hiển thị "Run by: 23120409" kèm ISO timestamp (Playwright docs — HTML reporter `title`, `metadata`).
- Chưa dùng nguyên được: AI bắt đầu dựng khi thiết kế chưa chốt; bản đầu xếp report thành `reports/<fr>-<browser>`, giữ cả video và trace khi fail (nặng, không cần cho bug report), và dashboard có cột link GitHub issue dù issue chỉ được tạo sau khi chạy ra lỗi.

**Bản sửa của sinh viên:**

- Yêu cầu **chốt thiết kế trước rồi mới dựng**; chọn **Chromium / Firefox / WebKit**, **Playwright tự bật server**, **chỉ dùng Playwright HTML reporter (không Allure)**.
- Đổi cấu trúc report thành **`reports/<fr>/<browser>/`** và yêu cầu thêm **báo cáo tổng trực quan** (dashboard).
- **Tắt video và trace**, khi fail chỉ giữ **screenshot + thông báo lỗi**.
- **Bỏ link GitHub issue** khỏi dashboard.

---

### AUDIT-02 — FR-01 Registration — Bước 1: Chọn TC

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 18:34 (UTC+7) |
| Bước | FR-01 — Bước 1: Chọn TC từ HW02 |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
/playwright-data-driven fr01
---
Có TC nào cần phải kiểm tra lại không
---
1. Vẫn giữ  và điền bug là pass ở UI nhưng bị che khuất
2. Giữ và ghi rõ expect
---
bộ 15 TC sau chốt là gì
```

**Output AI (tóm tắt):**

- Chọn 15 TC từ 34 TC của HW02 (1 Positive, 4 Edge, 10 Negative): FR01-AT-01…15, expected theo đặc tả FR-01; oracle kiểm cả lý do từ chối (thông báo đúng trường sai).
- Liệt kê TC không chọn (TC-02…07, 12…14, 20, 21, 23, 26, 27, 28, 30, 32…34) do gần trùng; phần "không tạo user" không quan sát được ở tầng UI.
- Khi được hỏi, tự chỉ ra 2 điểm cần xem lại: AT-05/12/13 sẽ pass sai lý do do regex mật khẩu sai che khuất (BUG-FR01-01); AT-02 có expected không có căn cứ trong đặc tả (phân biệt hoa/thường email).
- Chốt bộ 15 TC theo quyết định của SV, thêm ghi chú che khuất và căn cứ expected. Chưa tạo file.

**Lý do verdict:**

- Bộ TC phủ đủ các lớp tương đương và biên chính của FR-01 (ISTQB FL — phân hoạch tương đương, phân tích giá trị biên): 3 trường bắt buộc, định dạng / trùng email, biên độ dài 7/8, thiếu chữ hoa / ký tự đặc biệt, ô Xác nhận mật khẩu; expected bám đặc tả FR-01.
- Chưa dùng nguyên được: bản đầu không cảnh báo AT-05, 12, 13 sẽ pass sai lý do vì regex mật khẩu sai che khuất (lặp lại lỗi HW02 gap #2), và để expected của AT-02 như thể có trong đặc tả trong khi đặc tả không quy định phân biệt hoa/thường email (HW02 gap #6). AI chỉ nêu 2 điểm này khi SV hỏi lại.

**Bản sửa của sinh viên:**

- Yêu cầu AI **rà lại bộ TC** trước khi chốt.
- Giữ AT-05, 12, 13 và **ghi kết quả "Pass ở UI nhưng bị che khuất bởi BUG-FR01-01"** thay vì coi là Pass thường.
- Giữ AT-02 và **ghi rõ expected theo quyết định HW02**, không coi là yêu cầu của đặc tả.

---

### AUDIT-03 — FR-01 Registration — Bước 2: Khảo sát UI + sinh data

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 18:42 (UTC+7) |
| Bước | FR-01 — Bước 2: Khảo sát UI và sinh data JSON |
| Verdict | VALID |

**Prompt (nguyên văn):**

```text
ok, sang bước 2 đi
---
có điểm nào bạn còn băn khoăn không
---
1. Giữ selector như hiện tại
2. Được chốt với phương án đó
3. Ghi chú quy ước
```

**Output AI (tóm tắt):**

- Khảo sát `Register.jsx`: label không gắn input (không `htmlFor`) nên dùng `label:text-is("…") + input`; Email dùng `type="text"`; không có ô Xác nhận mật khẩu; khối lỗi không có thuộc tính ổn định → selector cấu trúc `div:has(> form) > div`; thành công điều hướng `/login`.
- Chỉ ra điểm dễ flaky: validationMessage khác nhau giữa trình duyệt, regex mật khẩu sai che khuất lỗi, AT-14 có thể pass sớm nếu kiểm URL trước.
- Sinh `data/fr01.json`: 15 TC, `expected` gồm `outcome`, `url`, `invalidField`, `message`; thêm `note` cho AT-02, 05, 12, 13; kiểm ID không trùng, không thiếu trường.
- Khi được hỏi, nêu 4 băn khoăn: selector lỗi theo cấu trúc DOM, assertion trường rỗng gần như hiển nhiên, oracle từ khóa là quy ước tự đặt, chưa mở lại trang thật.
- File: [`data/fr01.json`](../automation/data/fr01.json)

**Lý do verdict:** Selector khớp code `Register.jsx`, data đúng bộ 15 TC đã chốt và expected theo đặc tả FR-01; dùng nguyên, không sửa. Các điểm băn khoăn chỉ ảnh hưởng spec (bước 3) và báo cáo (bước 4).

**Bản sửa của sinh viên:** Không sửa data / selector. Chốt thêm: **test trường rỗng phải kiểm cả "form không được gửi"** (bước 3) và **ghi chú quy ước từ khóa thông báo lỗi** vào báo cáo (bước 4).

---

### AUDIT-04 — FR-01 Registration — Bước 3: Sinh Page Object + spec, chạy, phân loại

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 18:52 (UTC+7) |
| Bước | FR-01 — Bước 3: Sinh Page Object + spec, chạy 3 trình duyệt, phân loại fail |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
Sang bước 3
```

**Output AI (tóm tắt):**

- Sinh `helpers/data.ts` (`loadCases`), `pages/RegisterPage.ts` (chỉ locator + thao tác), `tests/fr01.spec.ts` theo template: 15 test, 3 `test.step`, annotation `type`, 4 assertion pattern (`toHaveURL`, `toBeVisible`/`toContainText`, `validationMessage`, `toHaveCount`); áp dụng quyết định bước 2.
- `--list`: 45 test (15 × 3). Chạy `npm run test:fr01`: Chromium / Firefox / WebKit mỗi trình duyệt 6 pass, 9 fail, cùng tập TC.
- Phân loại 9 fail đều là bug SUT: AT-01…04 (BUG-FR01-01), AT-09…11 (BUG-FR01-03…05, bị che khuất), AT-14 (BUG-FR01-01, 06), AT-15 (BUG-FR01-02); AT-05, 12, 13 pass nhưng bị che khuất.
- Đưa checklist review: selector cấu trúc DOM, `toHaveCount(0)` không chờ, oracle từ khóa, TC thành công không xác nhận tài khoản được tạo, AT-15 dừng sớm.
- File: [`fr01.spec.ts`](../automation/tests/fr01.spec.ts), [`RegisterPage.ts`](../automation/pages/RegisterPage.ts), [`data.ts`](../automation/helpers/data.ts), report [`reports/fr01/`](../automation/reports/fr01/)

**Lý do verdict:**

- Script chạy được trên 3 trình duyệt, data tách khỏi script, đủ ≥ 3 assertion pattern; phân loại 9 fail là bug SUT đúng — SV đối chiếu với screenshot và chạy lại `--headed` (AT-14) để xác nhận. Mã bug trong phân loại lúc này còn theo HW02, được đánh lại ở bước 4.
- Chưa dùng nguyên được (Playwright docs — web-first assertions, test annotations):
  - Test trường rỗng (AT-06…08) chỉ kiểm `validationMessage` ≠ rỗng — luôn đúng với ô trống — và `toHaveCount(0)` kiểm ngay, không chờ.
  - Ghi chú "che khuất" có trong data nhưng spec không đọc, report hiện Pass như bình thường.
  - Các `expect` không có mô tả, thông báo fail khó chẩn đoán (AT-14 chỉ báo `toBeVisible() failed`).

**Bản sửa của sinh viên:**

- Commit bản AI gốc `67a122d` trước khi sửa; review theo checklist, đối chiếu screenshot từng fail.
- **Thêm `toBeFocused()` lên ô lỗi trước `toHaveCount(0)`** cho AT-06…08 — commit `fd68ff3`.
- **Gắn `note` thành annotation, dashboard hiện ghi chú "che khuất"** — commit `9f15b65`.
- **Thêm mô tả cho mọi `expect`** — commit `456648c`.
- Không làm điểm "đăng nhập lại để xác nhận tài khoản được tạo" (tránh phụ thuộc FR-02); ghi vào phần không tự động hóa được.

---

### AUDIT-05 — FR-01 Registration — Bước 4: Nháp báo cáo, bug report, đăng GitHub Issue

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 20:18 (UTC+7) |
| Bước | FR-01 — Bước 4: Nháp mục 3 báo cáo, bug report, đăng 6 GitHub Issue |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
có vấn đề nào trong bước 3 không
---
có vấn đề nào cần mình review không
---
1. Đúng là như vậy
2. Đúng như bạn report
3. Có tiêu đề rồi Nhưng sao trong từng file index không thấy mssv của mình ở đâu nhỉ
4. 

6. Bug thì lấy mã mới cũng được.
---
ý phải từng file index.html của từng nền tảng nên thêm mssv của tôi vào bạn ạ
---
1. Được theo đề xuất đi
2. Được theo đề xuất

4. Sửa theo đề xuất
---
9 fail mà gộp lại 6 bug hả bạn
---
bạn có thể đăng hộ bug cho tôi lên issue được không. rồi chụp ảnh lại
---
chụp xong để vào thư mục hw04/evidence/github-issue là được bạn. Thực hiện đi
---
trong bug report chỉ cần trỏ đến ảnh issue với lại là link issue là được rồi vì trong đó có ảnh rồi bỏ phần trỏ sang ảnh trong chronium đi bạn
```

**Output AI (tóm tắt):**

- Liệt kê 6 vấn đề của spec khi được hỏi và checklist việc SV cần tự review; sửa spec theo 3 điểm SV chọn (ghi ở AUDIT-04), chạy lại FR-01 trên 3 trình duyệt (6 pass, 9 fail).
- Gắn "Run by: 23120409" dạng chữ thường vào `<title>` / `<meta>` của từng `index.html`, lấy từ metadata Playwright của lượt chạy.
- Nháp mục 3 báo cáo chính: bảng 15 TC (kết quả Chromium / Firefox / WebKit, "Pass (che khuất)"), quy ước oracle từ khóa, TC không tự động hóa, bảng kết quả chạy, 6 bug mã mới BUG-FR01-01…06, AI gap analysis 5 dòng.
- Nháp `bug_report.md` cho 6 bug (rule, severity, tái hiện, mong đợi / thực tế, assertion fail, nghi vấn vị trí); giải thích 9 fail ↔ 6 bug.
- Push `main`, đăng 6 issue #1…#6 kèm screenshot lúc fail, chụp trang issue vào `hw04/evidence/github-issue/`, điền link và ảnh vào báo cáo.
- Sai sót của AI trong bước này: lệnh `--list` ghi đè report Chromium (đã chạy lại thật lúc 12:47Z); regex điền link issue làm hỏng dòng tiêu đề 2 file báo cáo (đã sửa tay, kiểm diff).
- File: [`23120409_HW04_Report.md`](23120409_HW04_Report.md), [`bug_report.md`](bug_report.md), [`evidence/github-issue/`](../evidence/github-issue/), [`build-dashboard.mjs`](../automation/scripts/build-dashboard.mjs)

**Lý do verdict:** Nội dung báo cáo và bug report bám kết quả chạy thật và đặc tả FR-01; issue đăng đúng 6 bug kèm bằng chứng. Chưa dùng nguyên được: AI làm hỏng report Chromium và tiêu đề báo cáo (đã khắc phục), bug report ban đầu nhúng thừa ảnh Chromium trùng với ảnh trong issue.

**Bản sửa của sinh viên:**

- Yêu cầu **thêm MSSV vào từng file `index.html`** của từng trình duyệt.
- Chốt **mã bug mới cho HW04**, giữ **6 bug** (không gộp BUG-FR01-02 vào BUG-FR01-01).
- Chọn thư mục bằng chứng **`hw04/evidence/github-issue`**; **bỏ ảnh Chromium khỏi bug report**, chỉ giữ link issue và ảnh chụp issue.

---

### AUDIT-06 — FR-09 Discount Coupons — Bước 1: Chọn TC

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 20:50 (UTC+7) |
| Bước | FR-09 — Bước 1: Chọn TC từ HW02 |
| Verdict | VALID |

**Prompt (nguyên văn):**

```text
/playwright-data-driven fr09
---
1. A
2. A
```

**Output AI (tóm tắt):**

- Đọc HW02 mục 4 (25 TC), đặc tả FR-09 và FR-08, code `Checkout.jsx` và `POST /api/apply-coupon` để xác định TC nào làm được ở tầng UI.
- Chọn 15 TC (2 Positive, 7 Edge, 6 Negative) FR09-AT-01…15: phủ C1–C5, 2 loại mã, biên C3 (299.999 / 300.000 / 300.001), biên C5, làm tròn %; dữ liệu cơ sở: user test, 1 × Keychron Q1 (4.000.000 ₫) thêm qua UI, mã `VIP100`.
- Liệt kê 10 TC không chọn / không tự động hóa ở UI: TC-05 (cần sửa DB), TC-11, 24, 25 (chỉ tầng API), TC-16…18 (sửa `expired_at`, phụ thuộc giờ), TC-22, 23 (cần mã thử, thuộc FR-17), TC-09 (trùng nhóm).
- Nêu 2 điểm cần SV chốt: dùng ô tổng tiền sửa được (bug FR-08) làm input cho biên C3 / làm tròn; dựng lượt đã dùng mã bằng API `POST /api/coupon-usage` hay bằng thanh toán UI.

**Lý do verdict:** Bộ TC phủ đủ 5 điều kiện C1–C5, 2 loại mã và các biên chính của FR-09 (ISTQB FL — phân hoạch tương đương, phân tích giá trị biên); expected bám đặc tả; TC loại bỏ có lý do đúng với giới hạn tầng UI. AI tự chỉ ra rủi ro của ô tổng tiền sửa được và cách dựng trạng thái trước — dùng nguyên, không sửa.

**Bản sửa của sinh viên:** Không sửa bộ TC. Chốt: **dùng ô tổng tiền làm input** cho AT-09, 10, 11, 15 (ghi chú là bug FR-08 ngoài phạm vi); **dựng lượt đã dùng mã bằng API ở bước chuẩn bị** cho AT-12, 13, 14.

---

### AUDIT-07 — FR-09 Discount Coupons — Bước 2: Khảo sát UI + sinh data

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 21:03 (UTC+7) |
| Bước | FR-09 — Bước 2: Khảo sát UI và sinh data JSON |
| Verdict | VALID |

**Prompt (nguyên văn):**

```text
Sang bước 2
---
còn điểm nào chưa rõ không
---
Điểm 1: Chốt vậy
Điểm 2: Giữ CSS class và ghi vào checklist đi
Điểm 3: Ghi chú vào báo cáo
Điểm 4: Dùng user mới cho mỗi test.
```

**Output AI (tóm tắt):**

- Khảo sát luồng chuẩn bị Trang chủ → "Thêm vào giỏ" → "Giỏ hàng" → "Tiến hành thanh toán" (không `goto` sau khi thêm hàng); tránh trang chi tiết sản phẩm vì nút thêm giỏ phải bấm 2 lần (bug FR-07).
- Bảng selector cho trang chủ, header, giỏ hàng, Checkout (ô tổng tiền `spinbutton`, ô mã, nút "Áp dụng", khối thành công, tổng thanh toán); thông báo lỗi coupon chỉ chọn được bằng class CSS.
- Điểm dễ flaky: định dạng số theo locale (so số đã tách chữ số bằng `expect.poll`), số tiền giảm âm, nhập tổng trước khi áp mã, lượt dùng mã cộng dồn giữa các test.
- Sinh `data/fr09.json`: 15 TC, `input` (product, code, total, logoutBeforeApply, usage), `expected` (outcome applied / rejected / disabled, total, discount, final); kiểm ID không trùng, không thiếu trường, `final = total − discount`.
- Khi được hỏi, nêu thêm: `user` tải chậm qua `/api/users/me` có thể làm C5 bị bỏ qua (AT-13, 14 fail sai) → chờ header "Chào, …"; expected AT-04, AT-08 là diễn giải; user mới mỗi test dựa vào API đăng ký chấp nhận mọi mật khẩu.
- File: [`data/fr09.json`](../automation/data/fr09.json)

**Lý do verdict:** Selector khớp code `Home.jsx`, `Cart.jsx`, `Checkout.jsx`; data đúng bộ 15 TC đã chốt, expected theo công thức FR-09; dùng nguyên, không sửa. Bản khảo sát đầu chưa nêu rủi ro `user` tải chậm làm C5 bị bỏ qua — AI chỉ nêu khi SV hỏi lại; các điểm chốt thêm chỉ ảnh hưởng spec (bước 3) và báo cáo (bước 4).

**Bản sửa của sinh viên:** Không sửa data / selector. Chốt thêm: **chờ header "Chào, …" trước khi thao tác**; **giữ selector class CSS cho thông báo lỗi coupon và đưa vào checklist review**; **ghi chú expected AT-04, AT-08 vào báo cáo**; **mỗi test dùng user mới** đăng ký bằng API.

---

### AUDIT-08 — FR-09 Discount Coupons — Bước 3: Sinh Page Object + spec, chạy, phân loại

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 21:43 (UTC+7) |
| Bước | FR-09 — Bước 3: Sinh Page Object + spec, chạy 3 trình duyệt, phân loại fail |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
Sang bước 3
---
à khoan nếu mỗi test sinh 1 user mới thì code handle thế nào nhỉ
---
oke vậy sang bước 3 đi
```

**Output AI (tóm tắt):**

- Khi được hỏi, giải thích thiết kế user mới mỗi test: `registerAndLogin` (đăng ký + đăng nhập qua API, ghi token trước `goto`), `addCouponUsage` (ghi sẵn lượt dùng mã), lỗi chuẩn bị ném `Setup failed`.
- Sinh `helpers/auth.ts`, sửa `helpers/data.ts` (tách `uniqueEmail`), thêm `NEW_USER` vào `helpers/env.ts`; sinh `pages/ShopPage.ts`, `pages/CheckoutPage.ts` (đọc số tiền theo mọi locale), `tests/fr09.spec.ts`: 15 test, chờ header "Chào, …", 4 assertion pattern (`toBeVisible`/`toHaveCount`, `toBeDisabled`, `expect.poll` số tiền, `toHaveValue`).
- `--list` 45 test; chạy `npm run test:fr09`: Chromium / Firefox / WebKit mỗi trình duyệt 11 pass, 4 fail, cùng tập TC.
- Phân loại 4 fail đều là bug SUT: AT-02, 15 (mã % giảm âm: −36.000.000, −2.700.045), AT-08 (áp mã được khi đã thoát), AT-10 (tổng đúng ngưỡng 300.000 bị từ chối).
- Checklist review: selector class CSS / emoji / `locator('..')`; `toContain` đặt ngược vế làm nhãn Expected/Received đảo; nhánh từ chối không kiểm lý do (C1/C2/C3/C5); mô tả "Mã không hợp lệ" sai nghĩa với AT-08; `applyIfEnabled` dùng `isEnabled()` không chờ.
- Commit bản AI gốc: `1f566b9`.
- File: [`fr09.spec.ts`](../automation/tests/fr09.spec.ts), [`ShopPage.ts`](../automation/pages/ShopPage.ts), [`CheckoutPage.ts`](../automation/pages/CheckoutPage.ts), [`auth.ts`](../automation/helpers/auth.ts), report [`reports/fr09/`](../automation/reports/fr09/)

**Lý do verdict:**

- Script chạy được trên 3 trình duyệt, user mới mỗi test giúp các TC độc lập, data tách khỏi script, đủ ≥ 3 assertion pattern; phân loại 4 fail là bug SUT đúng — SV đối chiếu với screenshot (AT-08 vẫn áp mã được dù header đã hiện "Đăng nhập").
- Chưa dùng nguyên được (Playwright docs — web-first assertions, actionability):
  - `applyIfEnabled()` dùng `isEnabled()` không chờ, nút tắt thì bỏ qua lặng lẽ → test fail ở bước Kiểm tra với nguyên nhân sai.
  - Comment nhắc hàm `applyCode` không tồn tại.
  - Nhận diện thông báo thành công bằng emoji `✅`.
  - `toContain` đặt ngược vế → report đảo nhãn Expected / Received.
  - Nhánh bị từ chối không kiểm lý do (C1/C2/C3/C5) → có thể pass sai lý do; mô tả "Mã không hợp lệ" sai nghĩa với AT-08.

**Bản sửa của sinh viên:**

- Commit bản AI gốc `1f566b9` trước khi sửa; tự phát hiện lỗi `applyIfEnabled` và comment sai tên hàm, đối chiếu checklist cho các điểm còn lại.
- **Đã nhập mã thì `toBeEnabled()` rồi mới bấm `apply()`; sửa comment** — commit `5287e2d`.
- **Thông báo thành công chọn bằng `getByText(/Áp dụng thành công/)`** — commit `706645a`.
- **Kiểm số tiền giảm theo khoảng / `toBe`, đúng vế** — commit `7e1bac0`.
- **Thêm `expected.reason` theo C1–C5 và `toContainText`; mô tả nêu đúng lý do** — commit `24926c4`.
- Giữ selector `p.text-red-600` và `locator('..')` (SUT không có thuộc tính ổn định, quy ước cấm `nth`); ghi vào báo cáo.

---

### AUDIT-09 — FR-09 Discount Coupons — Bước 4: Sửa theo review, nháp báo cáo, đăng GitHub Issue

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 22:23 (UTC+7) |
| Bước | FR-09 — Bước 4: Sửa theo review, nháp mục 4 báo cáo, bug report, đăng 3 GitHub Issue |
| Verdict | VALID |

**Prompt (nguyên văn):**

```text
Ở các case applied và rejected, nếu nút “Áp dụng” bị tắt ngoài dự kiến, test không bấm. Nó chỉ fail ở bước Kiểm tra với thông báo kiểu “Phải hiện thông báo áp dụng mã thành công” việc này có khiến người dùng hiểu nhầm nguyên nhân không bạn
---
Comment trong `CheckoutPage.ts` ghi `applyCode`, nhưng tên hàm thật là `applyIfEnabled`.
---
check list đâu vậy
---
Đề xuất hướng
---
Được sửa đi
---
Chia để commit phần code trước nhỉ
---
à add cả cái report của play wright nữa chứ
---
pushs những casi đã commit và thêm issue chụp lại cho tôi luôn bạn. Chụp cả report luôn
```

**Output AI (tóm tắt):**

- Xác nhận 2 điểm SV phát hiện (bỏ qua lặng lẽ khi nút tắt, comment sai tên hàm); liệt kê lại checklist 9 điểm kèm trạng thái và đề xuất hướng cho từng điểm.
- Sửa 6 điểm (ghi ở AUDIT-08), chạy lại FR-09 trên 3 trình duyệt sau khi sửa xong: mỗi trình duyệt 11 pass, 4 fail (AT-02, 08, 10, 15); các TC bị từ chối giờ pass vì đúng lý do.
- Tách phần sửa thành 4 commit `test(fr09)` (kiểm file sau commit cuối giống bản đã chạy), commit report `7d4a77a`, push `main`.
- Nháp mục 4 báo cáo chính (quy ước oracle, bảng 15 TC, TC không tự động hóa, kết quả chạy, 3 bug, AI gap analysis 6 dòng) và `bug_report.md` cho 3 bug BUG-FR09-01…03.
- Đăng issue #7, #8, #9 kèm screenshot lúc fail; chụp trang issue vào `hw04/evidence/github-issue/` và 3 report có "Run by" vào `hw04/evidence/run-by/`; điền link và ảnh vào báo cáo.
- Sai sót của AI trong bước này: lệnh regex thêm `reason` vào data lỗi và không ghi gì, AI chuyển sang sửa trực tiếp từng TC rồi kiểm lại trước khi chạy.
- File: [`23120409_HW04_Report.md`](23120409_HW04_Report.md), [`bug_report.md`](bug_report.md), [`evidence/`](../evidence/)

**Lý do verdict:** Báo cáo, bug report và nội dung issue bám kết quả chạy thật và đặc tả FR-09; 3 issue đăng đúng bug kèm bằng chứng; commit tách đúng theo từng điểm sửa. SV dùng nguyên, không phải sửa nội dung; lỗi regex ở data không để lại hậu quả.

**Bản sửa của sinh viên:** Không sửa nội dung. SV chỉ đạo thứ tự: **commit code trước, tách theo từng điểm sửa**, **commit cả Playwright report**, rồi **push, đăng issue và chụp bằng chứng**.

---

### AUDIT-10 — FR-17 Coupon CRUD — Bước 1: Chọn TC

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 22:39 (UTC+7) |
| Bước | FR-17 — Bước 1: Chọn TC từ HW02 |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
/playwright-data-driven fr17
---
AT-08 (`save10`). Ô mã tự đổi chữ nhập vào thành chữ hoa, nên `save10` gửi lên đúng là `SAVE10`. Đường đi trong code giống hệt AT-07, không thêm thông tin nào. Mĩnh nghĩ nên bỏ
---
[trích lại câu của AI về lựa chọn (a)/(b) cho TC phân quyền user thường]
có trong các tc dự tính automation ko
---
Vậy giữ 14 cái TC đi bạn
```

**Output AI (tóm tắt):**

- Đọc HW02 mục 5 (36 TC), đặc tả FR-17 (Thêm / Xem / Xóa, không có Sửa) và FR-12, code tab "Mã Giảm Giá" của `frontend-admin` (form, bảng, nút Xóa, lỗi qua `alert`).
- Chọn ban đầu 15 TC; dự đoán theo code UI: AT `code` khoảng trắng, giá trị 0, % 101, đơn tối thiểu −1 sẽ fail; trường rỗng / số lần 0 bị HTML5 chặn.
- Liệt kê TC không chọn / không tự động hóa ở UI (chỉ tầng API: TC-09, 10, 13, 16, 19, 21, 25, 26; trùng nhóm: TC-12, 15, 27…36) và hỏi SV chốt TC phân quyền user thường (TC-22…24).
- Theo SV: bỏ `save10` (ô mã tự viết hoa → trùng đường đi với AT-07), giữ TC phân quyền ở bảng không tự động hóa; chốt 14 TC FR17-AT-01…14 (4 Positive, 7 Negative, 3 Edge).

**Lý do verdict:** Bộ TC phủ đủ Thêm / Xem / Xóa, các trường bắt buộc và biên chính của FR-17 (ISTQB FL — phân hoạch tương đương, phân tích giá trị biên); TC loại bỏ có lý do đúng với giới hạn tầng UI. Chưa dùng nguyên được: AI giữ TC `save10` dù chính AI đã ghi ô mã tự viết hoa — ở UI TC này đi trùng đường với AT-07, không thêm thông tin (vi phạm tiêu chí "bỏ TC gần trùng" của chính bước chọn TC).

**Bản sửa của sinh viên:** **Bỏ TC `save10` (TC-08)**, chuyển sang bảng không chọn với lý do chỉ kiểm được ở tầng API; **giữ TC phân quyền user thường ở bảng không tự động hóa**, chốt bộ **14 TC**.

---

### AUDIT-11 — FR-17 Coupon CRUD — Bước 2: Khảo sát UI + sinh data

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 22:56 (UTC+7) |
| Bước | FR-17 — Bước 2: Khảo sát UI Admin và sinh data JSON |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
Sang bước 2
---
1. So dòng bằng `toHaveText([...6 ô])` luôn fail: mỗi dòng có 7 ô (ô cuối là nút “Xóa”), và `toHaveText` không bỏ được dấu phân cách số. Nên đọc các ô bằng `allInnerTexts()`, lấy 6 ô đầu, bỏ dấu phân cách rồi so trong `expect.poll`.
2. AT-06 có thể đếm số dòng ban đầu bằng 0: heading “EShop Admin” hiện trước khi bảng tải xong. Hãy chờ dòng `SAVE10` hiện rồi mới đếm.
3. Dialog không được đóng: khi dùng `waitForEvent('dialog')`, Playwright không tự đóng alert. Test phải gọi `dialog.accept()`, nếu không trang bị treo.
---
nói rõ về 2 case cần mình chốt đi
---
Thì theo đúng là từng fr chạy tuần tự từng test mà dko bạn
---
Chốt theo hướng B
```

**Output AI (tóm tắt):**

- Khảo sát tab "Mã Giảm Giá" của `frontend-admin`: form không có label (chọn bằng placeholder), ô mã tự viết hoa, `select` loại mã, placeholder giá trị đổi theo loại, đơn tối thiểu không có `min`; bảng 7 ô / dòng; lỗi hiện qua `alert()`; nút Xóa không xác nhận.
- Đề xuất cách kiểm: bắt dialog lỗi, kiểm validation HTML5 + focus, so số dòng trước / sau cho mã khoảng trắng, chuẩn hóa số theo locale; ban đầu đề xuất so dòng bằng `toHaveText([...6 ô])` và đếm dòng ngay sau heading "EShop Admin".
- Sinh `data/fr17.json`: 14 TC, `input` (action create / view / delete, đủ 6 trường form), `expected` (outcome, row 6 ô, rejectedBy, invalidField, remaining); kiểm ID, mã `CPnn` không trùng, dòng mong đợi khớp mã.
- Sau góp ý của SV: thừa nhận 3 lỗi thiết kế và đưa cách sửa (`allInnerTexts` + `expect.poll`, chờ dòng `SAVE10`, `dialog.accept()`).
- AT-04: ban đầu đề xuất tạo sẵn `CP04` bằng API vì lo phụ thuộc thứ tự; khi SV chỉ ra test chạy tuần tự và mỗi lần chạy reset DB, AI xác nhận đã đánh giá rủi ro quá cao; theo SV đổi sang xóa `BIGBUY` như HW02.
- File: [`data/fr17.json`](../automation/data/fr17.json)

**Lý do verdict:** Selector khớp code `App.jsx` (tab "Mã Giảm Giá"); data đúng 14 TC đã chốt. Chưa dùng nguyên được (Playwright docs — `toHaveText` với mảng, dialogs, auto-waiting):

- So dòng bằng `toHaveText([...6 ô])` luôn fail vì dòng có 7 ô và không bỏ được dấu phân cách số.
- Đếm số dòng ngay sau heading "EShop Admin" — bảng có thể chưa tải xong, số dòng ban đầu bằng 0.
- Bắt dialog bằng `waitForEvent('dialog')` nhưng không đóng — alert chặn trang.
- AT-04 đề xuất thêm bước tạo mã qua API vì đánh giá quá cao rủi ro phụ thuộc thứ tự, trong khi test chạy tuần tự và mỗi lần chạy reset DB.

**Bản sửa của sinh viên:**

- **Đọc 6 ô đầu bằng `allInnerTexts()`, bỏ dấu phân cách rồi so trong `expect.poll`.**
- **Chờ dòng `SAVE10` hiện rồi mới đếm số dòng.**
- **Gọi `dialog.accept()` sau khi đọc thông báo lỗi.**
- **AT-04 xóa `BIGBUY` như HW02**, dựa vào thứ tự chạy tuần tự (ghi chú trong data).

---

### AUDIT-12 — FR-17 Coupon CRUD — Bước 3: Sinh Page Object + spec, chạy, phân loại

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 23:06 (UTC+7) |
| Bước | FR-17 — Bước 3: Sinh Page Object + spec, chạy 3 trình duyệt, phân loại fail |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
Sang bước 3
```

**Output AI (tóm tắt):**

- Thêm `ADMIN` vào `helpers/env.ts`, `loginAs(page, 'admin')` vào `helpers/auth.ts` (ghi `localStorage["adminToken"]` trước `goto`); sinh `pages/AdminCouponPage.ts` (form theo placeholder, `row(code)`, `rowValues()` đọc 6 ô bằng `allInnerTexts` và bỏ dấu phân cách, `deleteRow()`) và `tests/fr17.spec.ts` (`ADMIN_URL`, bắt mọi `alert` bằng `page.on('dialog')` rồi `accept()`, chờ dòng `SAVE10` trước khi đếm; 5 assertion pattern) — áp dụng 3 điểm SV sửa ở bước 2.
- `--list` 42 test; chạy `npm run test:fr17`: Chromium / Firefox / WebKit mỗi trình duyệt 10 pass, 4 fail, cùng tập TC; đủ 9/9 lượt chạy.
- Phân loại 4 fail đều là bug SUT: AT-06 (mã chỉ khoảng trắng được tạo), AT-08 (giá trị 0), AT-09 (percent 101), AT-10 (đơn tối thiểu −1) — không có thông báo lỗi, mã vẫn được tạo.
- Checklist review: selector `getByText` tab / `combobox` duy nhất / placeholder regex; TC bị app từ chối fail ở bước kiểm dialog nên không ghi bằng chứng mã đã được tạo; không kiểm nội dung thông báo lỗi; screenshot chỉ chụp phần màn hình đang hiển thị (không thấy dòng `CP09`); AT-04 dựa vào thứ tự chạy.
- File: [`fr17.spec.ts`](../automation/tests/fr17.spec.ts), [`AdminCouponPage.ts`](../automation/pages/AdminCouponPage.ts), [`auth.ts`](../automation/helpers/auth.ts), [`env.ts`](../automation/helpers/env.ts), report [`reports/fr17/`](../automation/reports/fr17/)

**Lý do verdict:**

- Script chạy được trên 3 trình duyệt, áp dụng đúng 3 điểm SV sửa ở bước 2, data tách khỏi script, đủ ≥ 3 assertion pattern; phân loại 4 fail là bug SUT đúng.
- Chưa dùng nguyên được (Playwright docs — soft assertions, locators):
  - Các nhánh kiểm tra có điều kiện phụ (`&& expected.row`, `&& input.code`…) → data thiếu trường / `outcome` gõ sai thì test pass mà không kiểm gì.
  - Thông báo lỗi kiểm bằng assertion bắt buộc → fail là dừng, report không ghi bằng chứng mã sai đã được tạo.
  - Comment `row(code)` ghi "ô đầu" nhưng locator khớp bất kỳ ô nào.

**Bản sửa của sinh viên:**

- Commit bản AI gốc `bf98b4f` trước khi sửa; tự phát hiện cả 3 điểm khi review và yêu cầu AI kiểm tra lại trước khi sửa.
- **Thêm `validateCase()` kiểm data đầu mỗi test, bỏ điều kiện phụ trong các nhánh.**
- **Kiểm thông báo lỗi bằng soft assertion, vẫn kiểm số dòng** → report hiện cả 2 lỗi.
- **Sửa comment `row(code)` theo hành vi thật** (chọn sửa comment, không đổi locator).

---

### AUDIT-13 — FR-17 Coupon CRUD — Bước 4: Sửa theo review, nháp báo cáo

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-16 23:33 (UTC+7) |
| Bước | FR-17 — Bước 4: Sửa theo review, chạy lại, nháp mục 5 báo cáo và bug report |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
1. Test pass dù không kiểm tra gì khi data sai: các nhánh kiểm tra có thêm điều kiện `&& expected.row`, `&& input.code`… Nếu data thiếu trường hoặc `outcome` gõ sai thì không nhánh nào chạy. Cần báo lỗi ngay khi data không hợp lệ.
2. TC bị app từ chối không ghi bằng chứng mã đã được tạo: đổi assertion chờ dialog thành `expect.soft`, để test vẫn kiểm tra số dòng và báo cáo hiện cả 2 lỗi.
3. `row(code)` khớp với bất kỳ ô nào, không chỉ ô đầu: comment ghi chưa đúng. Data hiện tại không bị ảnh hưởng.
---
[gửi lại nguyên văn 3 điểm trên sau khi dừng AI]
mình thấy có các vấn đề như vậy bạn kiểm tra xem
---
Sửa cả 3 điểm về phần 3 sửa comment theo đúng hành vi thật
```

**Output AI (tóm tắt):**

- Lần đầu AI bắt tay sửa ngay; SV dừng lại và yêu cầu kiểm tra trước. AI xác nhận cả 3 điểm đúng, chỉ ra dòng code liên quan và đề xuất cách sửa; với điểm 3 nêu 2 hướng (sửa comment / sửa locator).
- Sửa: `validateCase()` kiểm data đầu mỗi test và bỏ điều kiện phụ trong các nhánh; kiểm dialog bằng `expect.configure({ soft: true }).poll` rồi vẫn kiểm số dòng; sửa comment `row(code)` theo hành vi thật.
- Sai sót của AI: báo đã thêm `validateCase` trong khi lần ghi đó bị dừng; lỗi lộ ra khi thử data sai (`ReferenceError`), AI bổ sung hàm và thử lại — data sai giờ fail với `Data không hợp lệ ở FR17-AT-03…`; data được khôi phục bằng `git checkout`.
- Chạy lại FR-17: Chromium / Firefox / WebKit mỗi trình duyệt 10 pass, 4 fail (AT-06, 08, 09, 10); mỗi TC fail báo cả "không có thông báo lỗi" và "số dòng tăng 1".
- Nháp mục 5 báo cáo chính (bảng 14 TC, TC không tự động hóa, kết quả chạy, 3 bug, AI gap analysis 8 dòng) và `bug_report.md` cho BUG-FR17-01…03.
- File: [`fr17.spec.ts`](../automation/tests/fr17.spec.ts), [`AdminCouponPage.ts`](../automation/pages/AdminCouponPage.ts), [`23120409_HW04_Report.md`](23120409_HW04_Report.md), [`bug_report.md`](bug_report.md)

**Lý do verdict:** Phần sửa đúng 3 điểm SV nêu, chạy lại cho kết quả và bằng chứng đúng; báo cáo và bug report bám kết quả chạy thật và đặc tả FR-17. Chưa dùng nguyên được: AI bắt tay sửa khi SV mới nêu vấn đề (chưa xác nhận), và báo đã thêm `validateCase` trong khi chưa ghi — nếu không thử với data sai thì bản sửa #1 không có tác dụng (`ReferenceError`).

**Bản sửa của sinh viên:** **Dừng AI, yêu cầu kiểm tra lại 3 điểm trước khi sửa**; **chọn sửa comment `row(code)` thay vì đổi locator**; yêu cầu thử data sai, nhờ đó phát hiện hàm `validateCase` chưa được thêm.

---

### AUDIT-14 — FR-17 Coupon CRUD — Bước 4: Commit, push, đăng GitHub Issue, chụp evidence

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-17 00:02 (UTC+7) |
| Bước | FR-17 — Bước 4: Tách commit, push, đăng 3 GitHub Issue, chụp evidence |
| Verdict | VALID |

**Prompt (nguyên văn):**

```text
đăng github issue đi bạn rồi chụp evidence
---
vậy chia commit và push cái phần code và report html trước đi
---
Đăng issue và chụp evidence cho mình trước đi
```

**Output AI (tóm tắt):**

- Nêu điều kiện trước khi đăng issue: ảnh trong issue trỏ tới file trên GitHub nên cần commit + push code và report FR-17 trước; hỏi SV đồng ý.
- Tách phần sửa thành 3 commit `a8dd8aa`, `59d06a9`, `62a04bb` (kiểm file sau commit cuối giống bản đã chạy), commit report `559eab8`, push `main`.
- Đăng issue #10, #11, #12 (nội dung lấy từ `bug_report.md`, kèm ảnh lúc fail); chụp trang issue và 3 report "Run by" vào `hw04/evidence/` (lần đầu quá thời gian chờ do trang GitHub không "networkidle", AI đổi sang chờ `load`); điền link và ảnh vào báo cáo, kiểm diff chỉ thay ô mẫu.
- Chỉ ra hạn chế còn lại: ảnh lúc fail chỉ chụp khung nhìn nên không thấy dòng `CP08`–`CP10`.
- File: [`23120409_HW04_Report.md`](23120409_HW04_Report.md), [`bug_report.md`](bug_report.md), [`evidence/`](../evidence/)

**Lý do verdict:** Commit tách đúng theo từng điểm sửa, file sau commit cuối giống bản đã chạy; 3 issue đăng đúng nội dung bug report, evidence chụp từ trang thật; AI dừng hỏi SV trước khi commit / push thay vì tự làm. Hạn chế ảnh lúc fail thuộc về spec (xử lý ở AUDIT-15), không phải lỗi của bước này.

**Bản sửa của sinh viên:** Không sửa nội dung. SV chốt thứ tự: **tách commit và push code + report HTML trước**, rồi mới **đăng issue và chụp evidence**.

---

### AUDIT-15 — FR-17 Coupon CRUD — Bước 4: Sửa ảnh lúc fail không thấy mã sai

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-17 00:02 (UTC+7) |
| Bước | FR-17 — Bước 4: Sửa bằng chứng ảnh lúc fail, chạy lại, cập nhật evidence |
| Verdict | INCOMPLETE |

**Prompt (nguyên văn):**

```text
có 2 vấn đề là 2 mã giảm giá ở 2 bug ấy không xuất hiện trong ảnh
---
b đi bạn
---
Bạn sửa spec và khi chạy lại chụp đúng lỗi và kết quả vẫn i chang hả bạn
```

**Output AI (tóm tắt):**

- Xác nhận ảnh AT-08…10 chỉ chụp khung nhìn 1280×720 nên dòng `CP08`–`CP10` ở cuối bảng bị cắt; đưa 2 hướng: (a) `fullPage` trong config, (b) cuộn bảng trong spec — đề xuất (a).
- Theo SV chọn (b): khi đọc layout phát hiện nội dung cuộn trong khung riêng (`h-screen` + `overflow-auto`) nên (a) thực ra cũng không giúp được; thêm `scrollTableToEnd()` (`scrollIntoView({ block: 'end' })`) và gọi trước khi kiểm số dòng.
- Chạy lại FR-17: vẫn 10 pass, 4 fail; ảnh AT-09 thấy `CP09 101%`, AT-10 thấy `CP10 -1 ₫`. Commit `d9e5f8e` + report `21ec407`, push; ảnh trong issue tự cập nhật; chụp lại evidence, cập nhật mốc giờ mục 5.2 / bug report, thêm dòng #9 vào gap analysis.
- Khi được hỏi, so JSON kết quả 2 lượt chạy (`559eab8` và `21ec407`): giống hệt trên từng TC và trình duyệt — phần sửa chỉ thêm thao tác cuộn, không đổi assertion.
- File: [`fr17.spec.ts`](../automation/tests/fr17.spec.ts), [`AdminCouponPage.ts`](../automation/pages/AdminCouponPage.ts), [`evidence/`](../evidence/)

**Lý do verdict:** Bản sửa cuối đúng: ảnh lúc fail thấy rõ mã sai, kết quả chạy không đổi (đối chiếu JSON 2 lượt). Chưa dùng nguyên được: AI không tự kiểm ảnh chụp có chứa bằng chứng trước khi đăng issue, và đề xuất ban đầu (a) `fullPage` sẽ không có tác dụng với layout cuộn trong khung riêng — AI chỉ nhận ra khi đọc layout sau khi SV chọn (b) (Playwright docs — screenshots, `scrollIntoViewIfNeeded`).

**Bản sửa của sinh viên:** **Phát hiện ảnh trong issue không thấy mã giảm giá sai**; **chọn (b) cuộn bảng trong spec thay vì đổi config**; yêu cầu xác nhận kết quả chạy lại không đổi so với lượt trước.

---

### AUDIT-16 — Tài liệu — Hoàn thiện báo cáo, AI Audit, README

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (Opus 5.5) |
| Thời gian | 2026-11-17 00:30 (UTC+7) |
| Bước | Tài liệu — Hoàn thiện báo cáo chính, AI Audit (Mục 4, 5), README |
| Verdict | VALID |

**Prompt (nguyên văn):**

```text
Cập nhật giúp mình các phần tài liệu còn thiếu. 2 video demo mình sẽ quay clip và bỏ link sau.
```

**Output AI (tóm tắt):**

- README: thêm dòng FR-17 và phần tổng (44 TC, 132 lượt test, 81 pass, 51 fail, 9 lượt chạy, 12 bug); điền cột Commit mục 5.4 (9 dòng).
- Rà toàn bộ tài liệu, liệt kê phần còn trống theo nhóm (AI điền được / SV tự làm / sau khi quay / trước khi nộp).
- Báo cáo chính: ngày hoàn thành; mục 2.1 (phiên bản SUT, Playwright, Node, 3 trình duyệt, máy, dữ liệu nền, công cụ AI), 2.2 (thiết kế data-driven, cấu trúc, "Run by", bảng 8 assertion pattern), 2.3 (phân vai AI / SV theo giai đoạn); mục 6 (bảng 3 FR × 3 trình duyệt, 12 commit sửa file test); mục 8 (checklist + trạng thái); mục 7 rút gọn còn 2 link video theo yêu cầu SV.
- AI Audit: Mục 4 (16 artifact: 6 VALID, 0 INVALID, 10 INCOMPLETE, đối chiếu từng entry; sửa một lỗi đếm theo bước trước khi lưu), ngày làm bài.
- File: [`23120409_HW04_Report.md`](23120409_HW04_Report.md), [`AI_Audit_Report.md`](AI_Audit_Report.md), [`README.md`](../README.md)

**Lý do verdict:** Đã cập nhật đủ theo yêu cầu 

**Bản sửa của sinh viên:** Cập nhật đủ nên không chỉnh sửa thêm.

---

## **4. Tổng kết Độ chính xác AI**

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số | Số lượng | Tỉ lệ |
| :-- | :-- | :-- |
| **Tổng artifact AI sinh đã audit** | 16 | 100% |
| **VALID (đúng, dùng nguyên)** | 6 | 37,5% |
| **INVALID (sai; loại bỏ)** | 0 | 0% |
| **INCOMPLETE (chấp nhận sau khi sửa)** | 10 | 62,5% |

Theo bước: **chọn TC** 1 VALID / 2 INCOMPLETE (AUDIT-02, 06, 10); **khảo sát UI + data** 2 VALID / 1 INCOMPLETE (AUDIT-03, 07, 11); **sinh script + chạy** 0 VALID / 3 INCOMPLETE (AUDIT-04, 08, 12); **sửa, báo cáo, issue** 2 VALID / 3 INCOMPLETE (AUDIT-05, 09, 13, 14, 15 — VALID là AUDIT-09, 14); **hạ tầng** AUDIT-01 INCOMPLETE; **tài liệu tổng hợp** AUDIT-16 VALID. Không artifact nào phải bỏ hẳn, nhưng **mọi bản script AI sinh ra đều phải sửa** trước khi dùng.

## **5. Kết luận — Khi nào nên / không nên dùng AI?**

| | Nên dùng AI | Không nên giao hẳn cho AI |
| :-- | :-- | :-- |
| Chọn TC và thiết kế data | Đọc nhanh báo cáo HW02 + đặc tả + code UI để đề xuất bộ TC và chỉ ra TC chỉ làm được ở tầng API; sinh file JSON có cấu trúc thống nhất | Quyết định expected khi đặc tả không quy định (email hoa/thường, % ≤ 100, ngày quá khứ); loại TC trùng đường đi (`save10`); chọn oracle kiểm **lý do** từ chối để tránh che khuất |
| Sinh script | Sinh Page Object + spec theo template, giữ cấu trúc đồng nhất giữa 3 FR; viết helper dùng chung | Duyệt selector bám cấu trúc DOM / class CSS; kiểm assertion có thật sự fail được không (`validationMessage` luôn ≠ rỗng, điều kiện phụ khiến nhánh bị bỏ qua) |
| Chạy và sửa | Chạy 3 trình duyệt, gom kết quả JSON, phân loại fail, đưa checklist; tách commit theo từng điểm sửa | Đối chiếu screenshot với kết luận "bug SUT"; phát hiện lỗi tinh vi (bỏ qua lặng lẽ khi nút tắt, mất bằng chứng do assertion bắt buộc, ảnh thiếu dòng mã sai); xác minh AI đã thật sự sửa (thử data sai) |
| Báo cáo | Nháp bảng TC, bug report, nội dung GitHub Issue, ghi audit từ prompt nguyên văn | Chọn cách gộp / đánh mã bug; quyết định verdict; kiểm diff sau mỗi lần AI sửa file báo cáo (AI từng làm hỏng tiêu đề bằng regex) |

**Kết luận:** AI làm tốt phần khối lượng lớn và có khuôn (đọc tài liệu, sinh code theo template, chạy và tổng hợp kết quả, nháp báo cáo), nhưng 10/16 artifact phải sửa trước khi dùng và mọi bản script đều có lỗi. Các lỗi AI lặp lại có chung một kiểu: **assertion trông hợp lý nhưng không thể fail hoặc fail sai chỗ** (che khuất, điều kiện phụ, bỏ qua lặng lẽ, thiếu bằng chứng), và **AI báo đã làm khi chưa kiểm chứng**. Vì vậy AI nên được dùng như trợ lý chạy từng bước có điểm dừng; người kiểm thử giữ quyền quyết định oracle, review assertion bằng cách tự hỏi "test này có fail được không", và luôn xác minh lại bằng lần chạy hoặc thử dữ liệu sai thay vì tin lời AI.

## **6. Mandatory Disclosure (dán nguyên văn)**

I use AI tools for the following tasks,

| # | Công cụ AI | Thời gian (UTC+7) | Nhiệm vụ | Prompt & output |
| :-- | :-- | :-- | :-- | :-- |
| 1 | Claude Code (Opus 5.5) | 2026-11-16 18:16 | Hạ tầng — Cấu hình Playwright đa trình duyệt và report | Xem AUDIT-01 |
| 2 | Claude Code (Opus 5.5) | 2026-11-16 18:34 | FR-01 — Bước 1: Chọn TC từ HW02 | Xem AUDIT-02 |
| 3 | Claude Code (Opus 5.5) | 2026-11-16 18:42 | FR-01 — Bước 2: Khảo sát UI và sinh data JSON | Xem AUDIT-03 |
| 4 | Claude Code (Opus 5.5) | 2026-11-16 18:52 | FR-01 — Bước 3: Sinh Page Object + spec, chạy, phân loại | Xem AUDIT-04 |
| 5 | Claude Code (Opus 5.5) | 2026-11-16 20:18 | FR-01 — Bước 4: Nháp báo cáo, bug report, đăng GitHub Issue | Xem AUDIT-05 |
| 6 | Claude Code (Opus 5.5) | 2026-11-16 20:50 | FR-09 — Bước 1: Chọn TC từ HW02 | Xem AUDIT-06 |
| 7 | Claude Code (Opus 5.5) | 2026-11-16 21:03 | FR-09 — Bước 2: Khảo sát UI và sinh data JSON | Xem AUDIT-07 |
| 8 | Claude Code (Opus 5.5) | 2026-11-16 21:43 | FR-09 — Bước 3: Sinh Page Object + spec, chạy, phân loại | Xem AUDIT-08 |
| 9 | Claude Code (Opus 5.5) | 2026-11-16 22:23 | FR-09 — Bước 4: Sửa theo review, nháp báo cáo, đăng GitHub Issue | Xem AUDIT-09 |
| 10 | Claude Code (Opus 5.5) | 2026-11-16 22:39 | FR-17 — Bước 1: Chọn TC từ HW02 | Xem AUDIT-10 |
| 11 | Claude Code (Opus 5.5) | 2026-11-16 22:56 | FR-17 — Bước 2: Khảo sát UI Admin và sinh data JSON | Xem AUDIT-11 |
| 12 | Claude Code (Opus 5.5) | 2026-11-16 23:06 | FR-17 — Bước 3: Sinh Page Object + spec, chạy, phân loại | Xem AUDIT-12 |
| 13 | Claude Code (Opus 5.5) | 2026-11-16 23:33 | FR-17 — Bước 4: Sửa theo review, nháp báo cáo | Xem AUDIT-13 |
| 14 | Claude Code (Opus 5.5) | 2026-11-17 00:02 | FR-17 — Bước 4: Commit, push, đăng GitHub Issue, chụp evidence | Xem AUDIT-14 |
| 15 | Claude Code (Opus 5.5) | 2026-11-17 00:02 | FR-17 — Bước 4: Sửa ảnh lúc fail không thấy mã sai | Xem AUDIT-15 |
| 16 | Claude Code (Opus 5.5) | 2026-11-17 00:30 | Tài liệu — Hoàn thiện báo cáo, AI Audit, README | Xem AUDIT-16 |

## **Chữ ký**

| Họ tên sinh viên (in hoa): | NGUYỄN KHẮC VƯỢNG                      |
| :------------------------- | :------------------------------------- |
| **MSSV:**                  | 23120409                               |
| **Lớp / Khoá:**            | 23_3                                   |
| **Môn học:**               | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| **Giảng viên:**            | Lâm Quang Vũ                           |
| **Ngày:**                  | 17/11/2026                             |
| **Chữ ký:**                | Nguyễn Khắc Vượng                      |

## **Tham khảo**

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.
- ISTQB Foundation Level Syllabus (latest version).
- Hardman, P. (2025). A Post-AI Learning Taxonomy.
- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.
- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.
- Anthropic (2025). Building reliable AI test agents — engineering blog.
- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
