---
name: ai-audit
description: Ghi một audit entry (AUDIT-NN) cho bước làm việc với AI vừa xong vào hw04/reports/AI_Audit_Report.md, gồm prompt nguyên văn, output tóm tắt, và một dòng ở bảng Mandatory Disclosure. Dùng khi người dùng gõ /ai-audit hoặc nhờ ghi audit / log lại bước vừa làm.
argument-hint: "[tính năng / bước, ví dụ: FR-01 sinh file data]"
---

# AI Audit

Ghi entry vào `hw04/reports/AI_Audit_Report.md`. Chỉ ghi, không chấm verdict.

## Các bước

1. Đọc file để lấy số AUDIT và số dòng Mục 6 lớn nhất.
2. Lấy giờ UTC+7: `powershell -NoProfile -Command "[DateTime]::UtcNow.AddHours(7).ToString('yyyy-MM-dd HH:mm')"`
3. Gom các prompt người dùng gõ **kể từ entry trước** trong phiên này (bỏ lời gọi `/ai-audit`). Các bước khác hẳn nhau → tách nhiều entry.
4. Thêm entry vào cuối Mục 3 (trước `## **4.`). Còn khối mẫu `AUDIT-01` trống thì thay khối đó.
5. Thêm dòng vào bảng Mục 6. Còn dòng mẫu `| 1 | | | | |` thì thay dòng đó.
6. Mục 1 còn trống thì điền `Công cụ AI đã dùng` và `Ngày làm bài`.

## Khuôn entry

````markdown
### AUDIT-NN — <Tính năng / Skill> — <Bước>

| Mục | Nội dung |
| :-- | :-- |
| Công cụ AI | Claude Code (<model>) |
| Thời gian | YYYY-MM-DD HH:MM (UTC+7) |
| Bước | <Bước — lấy từ $ARGUMENTS nếu có> |
| Verdict | _(SV điền: VALID / INVALID / INCOMPLETE)_ |

**Prompt (nguyên văn):**

```text
<prompt 1>
---
<prompt 2>
```

**Output AI (tóm tắt):**

- <kết quả chính, mỗi ý một dòng>
- File: [`path`](../../path)

**Lý do verdict:** _(SV điền)_

**Bản sửa của sinh viên:** _(SV điền)_

---
````

Dòng Mục 6: `| N | Claude Code (<model>) | YYYY-MM-DD HH:MM | <Bước> | Xem AUDIT-NN |`

## Quy tắc

- Prompt chép **nguyên văn**, giữ cả lỗi chính tả. Nội dung dán dài → `[dán: <mô tả>]`.
- Output chỉ **tóm tắt**, không dán code.
- Không tự điền Verdict / Lý do / Bản sửa. Không sửa entry cũ, không đụng Mục 2, 4, 5.
- Chỉ ghi những gì có trong phiên hiện tại, không bịa.
