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
| **Ngày làm bài:**                    | 2026-11-16        |
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

## **4. Tổng kết Độ chính xác AI**

Tổng hợp verdict từ Mục 3 và điền vào bảng dưới.

| Chỉ số | Số lượng | Tỉ lệ |
| :-- | :-- | :-- |
| **Tổng artifact AI sinh đã audit** | | 100% |
| **VALID (đúng, dùng nguyên)** | | |
| **INVALID (sai; loại bỏ)** | | |
| **INCOMPLETE (chấp nhận sau khi sửa)** | | |

## **5. Kết luận — Khi nào nên / không nên dùng AI?**

| | Nên dùng AI | Không nên giao hẳn cho AI |
| :-- | :-- | :-- |
| Chọn TC và thiết kế data | | |
| Sinh script | | |
| Chạy và sửa | | |
| Báo cáo | | |

**Kết luận:**

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

## **Chữ ký**

| Họ tên sinh viên (in hoa): | NGUYỄN KHẮC VƯỢNG                      |
| :------------------------- | :------------------------------------- |
| **MSSV:**                  | 23120409                               |
| **Lớp / Khoá:**            | 23_3                                   |
| **Môn học:**               | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| **Giảng viên:**            | Lâm Quang Vũ                           |
| **Ngày:**                  |                                        |
| **Chữ ký:**                |                                        |

## **Tham khảo**

- Kharbach, M. (2026). AI Use Policy Templates for Higher Education. CC BY-NC-SA 4.0.
- ISTQB Foundation Level Syllabus (latest version).
- Hardman, P. (2025). A Post-AI Learning Taxonomy.
- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.
- Perkins, M., Roe, J., & Furze, L. (2025). AI Assessment Scale.
- Anthropic (2025). Building reliable AI test agents — engineering blog.
- DeepEval & Promptfoo documentation — testing frameworks for LLM systems.
