**Khoa Công nghệ Thông tin (FIT) – Trường Đại học Khoa học Tự nhiên (HCMUS)**

**CS423 / CSC13003 – Kiểm chứng Phần mềm (AI-augmented · 2026)**

**CHÍNH SÁCH AI · BIỂU MẪU — 2026 v1.0**

# **Biểu mẫu Khai báo Sử dụng AI**

_Đính kèm cho mọi bài tập có dùng AI ở bất kỳ mức nào._

_Tài liệu được biên soạn lại từ Med Kharbach, PhD (2026) — Mẫu Chính sách Sử dụng AI cho Giáo dục Đại học. Giấy phép CC BY-NC-SA 4.0. Phiên bản này được FIT@HCMUS điều chỉnh cho môn CS423 / CSC13003 Kiểm chứng Phần mềm._

## **1. Thông tin Môn học & Sinh viên**

| Mục                   | Giá trị                                |
| :-------------------- | :------------------------------------- |
| **Môn học:**          | CS423 / CSC13003 – Kiểm chứng Phần mềm |
| **Mã bài tập:**       | HW#04                                  |
| **Tên bài tập:**      | Automation Testing on EShop            |
| **Cấp độ AI (1–5):**  | Cấp 4                                  |
| **Ngày:**             | 2026-11-17                             |
| **Họ tên sinh viên:** | Nguyễn Khắc Vượng                      |
| **MSSV:**             | 23120409                               |

## **2. Câu hỏi Khai báo**

### **1. Công cụ AI đã dùng:**

Claude Code (ứng dụng desktop), model `claude-opus-5-5` (Opus 5.5), dùng kèm hai Agent Skill tự xây (`playwright-data-driven`, `ai-audit`) và Playwright Test 1.65.1 để sinh, chạy và báo cáo test trên Chromium / Firefox / WebKit. Chi tiết từng lần dùng (prompt, thời gian, output) ở [AI_Audit_Report.md](AI_Audit_Report.md) (AUDIT-01…16).

### **2. Giai đoạn nào của bài tập có dùng AI:**

Tick tất cả:

- [x] brainstorm
- [x] outline
- [x] viết nháp
- [x] phản hồi
- [x] sửa chữa
- [x] code
- [x] phân tích dữ liệu
- [ ] thiết kế đồ hoạ
- [x] khác (ghi rõ): đăng GitHub Issue, chụp evidence, ghi AI Audit.

## **3. AI Critique**

Trong HW04, AI (Claude Code, Opus 5.5) làm nhanh và đều phần việc có khuôn: đọc báo cáo HW02, sinh data JSON, Page Object và spec theo template, chạy ba trình duyệt và nháp báo cáo. Tuy vậy 10/16 artifact phải sửa, và mọi bản script đều có lỗi. Điểm chung của các lỗi là assertion trông hợp lý nhưng không thể fail hoặc fail sai chỗ. Ở FR-01, AI kiểm `validationMessage` của ô trống, giá trị luôn khác rỗng, và không cảnh báo ba TC mật khẩu chỉ pass nhờ regex sai che khuất. Sang FR-09, dù vừa gặp che khuất, AI vẫn sinh nhánh từ chối không kiểm lý do, còn hàm `applyIfEnabled` bỏ qua lặng lẽ khi nút tắt nên test báo sai nguyên nhân. Ở FR-17, điều kiện phụ khiến test pass khi data sai, assertion bắt buộc làm mất bằng chứng mã sai đã được lưu, và ảnh lúc fail không thấy dòng lỗi. AI còn giữ TC `save10` trùng đường đi với AT-07 và báo đã thêm `validateCase` khi chưa ghi vào file.

AI không tự phát hiện vì nó tối ưu cho code "chạy được" và khớp template, không tự hỏi test có phân biệt được SUT đúng với SUT sai hay không. Nó không đối chiếu lại với hành vi UI đã khảo sát, không mang bài học của FR trước sang FR sau, và tin vào thao tác của chính mình mà không kiểm chứng.

Nguyên tắc tôi rút ra: chia việc thành bước nhỏ có điểm dừng; người kiểm thử giữ quyền quyết định oracle; với mỗi assertion phải hỏi "khi nào nó fail"; và luôn xác minh bằng lần chạy thật hoặc dữ liệu sai thay vì tin vào lời AI.

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
