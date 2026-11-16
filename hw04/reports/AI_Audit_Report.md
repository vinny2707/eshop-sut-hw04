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
