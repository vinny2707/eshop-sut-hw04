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
