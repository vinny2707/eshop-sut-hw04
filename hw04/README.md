# HW04 — Automation Testing on EShop

| Mục | Giá trị |
| :-- | :-- |
| Sinh viên | NGUYỄN KHẮC VƯỢNG — 23120409 — CSC13003 23_3 |
| Repository | [vinny2707/eshop-sut-HW04](https://github.com/vinny2707/eshop-sut-HW04) |
| Báo cáo chính | [23120409_HW04_Report.md](reports/23120409_HW04_Report.md) |
| Bug report | [bug_report.md](reports/bug_report.md) |
| AI Audit Report | [AI_Audit_Report.md](reports/AI_Audit_Report.md) |
| AI Critique | [AI_Critique.md](reports/AI_Critique.md) |
| Agent Skills | [`playwright-data-driven`](skills/playwright-data-driven/SKILL.md), [`ai-audit`](skills/ai-audit/SKILL.md) |
| GitHub Issues | [vinny2707/eshop-sut-hw04/issues](https://github.com/vinny2707/eshop-sut-hw04/issues) |

## 1. Bảng tự đánh giá

| No. | Criteria | Grade | Self-Assessed Grade |
| :-- | :-- | :-- | :-- |
| 1 | Task 1 — Feature A: FR-01 Registration | 25 | 25 |
| 2 | Task 1 — Feature B: FR-09 Discount Coupons | 25 | 25 |
| 3 | Task 1 — Feature C: FR-17 Coupon CRUD | 25 | 25 |
| 4 | Task 2 — Demo video | 15 | 15 |
| 5 | Agent Skills | 10 | 10 |
| | **Total** | **100** | 100 |

## 2. Test summary

Mỗi tính năng chạy trên 3 trình duyệt (Chromium / Firefox / WebKit); một lượt chạy = một tính năng trên một trình duyệt, có HTML report riêng ghi "Run by: 23120409" và ISO timestamp. Dashboard tổng: [automation/reports/index.html](automation/reports/index.html).

| Chỉ số | Giá trị |
| :-- | :-- |
| Số tính năng | 3 |
| TC đã tự động hóa | 44 (FR-01: 15, FR-09: 15, FR-17: 14) |
| TC đã chạy (tính trên mọi lượt chạy) | 132 (44 × 3) |
| Pass | 81 |
| Fail | 51 |
| Số lượt chạy trình duyệt | 9 (3 tính năng × 3 trình duyệt) |
| Số bug | 12 (FR-01: 6, FR-09: 3, FR-17: 3) — GitHub Issue #1–#12 |

| FR | Nền tảng | TC tự động hóa | Trình duyệt | Đã chạy | Pass | Fail | Bug | HTML report |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| FR-01 Registration | Web | 15 | Chromium | 15 | 6 | 9 | 6 | [fr01/chromium](automation/reports/fr01/chromium/index.html) |
| | | | Firefox | 15 | 6 | 9 | | [fr01/firefox](automation/reports/fr01/firefox/index.html) |
| | | | WebKit | 15 | 6 | 9 | | [fr01/webkit](automation/reports/fr01/webkit/index.html) |
| FR-09 Discount Coupons | Web | 15 | Chromium | 15 | 11 | 4 | 3 | [fr09/chromium](automation/reports/fr09/chromium/index.html) |
| | | | Firefox | 15 | 11 | 4 | | [fr09/firefox](automation/reports/fr09/firefox/index.html) |
| | | | WebKit | 15 | 11 | 4 | | [fr09/webkit](automation/reports/fr09/webkit/index.html) |
| FR-17 Coupon CRUD | Admin | 14 | Chromium | 14 | 10 | 4 | 3 | [fr17/chromium](automation/reports/fr17/chromium/index.html) |
| | | | Firefox | 14 | 10 | 4 | | [fr17/firefox](automation/reports/fr17/firefox/index.html) |
| | | | WebKit | 14 | 10 | 4 | | [fr17/webkit](automation/reports/fr17/webkit/index.html) |
| **Tổng** | **3 FR** | 44 | **9 lượt** | 132 | 81 | 51 | 12 | |

## 3. Video demo

Video Demo Task 2 (YouTube, unlisted):

Video Demo Agent Skill (YouTube, unlisted):

