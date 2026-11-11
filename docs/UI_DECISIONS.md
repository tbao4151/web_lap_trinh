# Quyết định Thiết kế & Kiến trúc Giao diện (UI Decisions)

Tài liệu này ghi nhận các quyết định kỹ thuật và trải nghiệm người dùng được chốt trong quá trình triển khai giai đoạn UI cho **AlgoAcademy (`web_lap_trinh`)**.

## 1. Hệ thống Design Tokens & Typography

- **Bảng màu chủ đạo (Semantic Palette):**
  - Primary: `#4F46E5` (Indigo 600), Hover: `#4338CA` (Indigo 700).
  - Accent / Tiến độ: `#0D9488` (Teal 600).
  - Nền sáng: `#F8FAFC` (Slate 50), Thẻ nội dung sáng: `#FFFFFF`.
  - Nền tối: `#0B1120` (Slate 950), Thẻ nội dung tối: `#111827`.
  - Trạng thái chấm bài & học tập:
    - Thành công (`AC`, Hoàn thành): `#15803D` (Emerald) kèm biểu tượng `CheckCircle2`.
    - Cảnh báo (`TLE`, `MLE`, Đang làm): `#B45309` (Amber) kèm biểu tượng `AlertTriangle`.
    - Lỗi (`WA`, `RE`, `CE`): `#B91C1C` (Rose) kèm biểu tượng `XCircle` / `Terminal`.
- **Typography:**
  - Văn bản tiếng Việt: `Be Vietnam Pro` (Google Fonts) hỗ trợ đầy đủ dấu tiếng Việt, độ rộng chữ cân đối khi đọc bài học dài (giới hạn `max-w-[800px]` ở vùng đọc lý thuyết).
  - Mã nguồn & Độ phức tạp thuật toán: `JetBrains Mono` cho toàn bộ khối code, chỉ số mảng `dp[s]`, độ phức tạp `O(N * S)` và đầu vào/đầu ra test case.

## 2. Phân tách Đa chiều: Mục tiêu (Goal) ≠ Trình độ (Level) ≠ Ngôn ngữ (Language)

- Người học không bị khóa cứng vào một trình độ duy nhất.
- `LearningGoal` (`zero-to-hero`, `high-school`, `competitive`, `career-cs`) đóng vai trò bộ lọc ưu tiên lộ trình trên Dashboard, trong khi `SkillCompetency` đánh giá năng lực riêng theo từng kỹ năng và ngôn ngữ (ví dụ: đã vững mảng 1 chiều C++ nhưng mới bắt đầu OOP Java).

## 3. Chiến lược Trình soạn thảo Code (Coding Lab Editor)

- Để tránh lỗi SSR/Hydration, giữ kích thước gói tải (bundle size) gọn nhẹ và hoạt động mượt trên cả Desktop lẫn Mobile (360px–1920px), trình soạn thảo `CodeEditor` sử dụng kiến trúc Client Component thuần với cột đánh số dòng đồng bộ, hỗ trợ phím `Tab` chèn 4 khoảng trắng, lưu nháp riêng theo từng cặp `(problemSlug, language)` trong `localStorage`, và cảnh báo/giữ bản nháp riêng khi chuyển đổi giữa `C`, `C++`, `Python`, `Java`.

## 4. Minh bạch Trạng thái Demo (No Fake Execution / No Fake Payment)

- Thanh công cụ đầu trang (`RoleSwitcherBar`) hiển thị rõ nhãn **"Chế độ trình diễn UI (Mock State)"** kèm công tắc chuyển đổi 4 vai trò (`Guest`, `Learner`, `Teacher`, `Admin`) và nút **Reset Demo**.
- Khi người học bấm **Chạy thử (Demo)** hoặc **Nộp bài (Demo)** trong Coding Lab, hệ thống hiển thị hộp thoại minh bạch giải thích chưa kết nối Judge Worker thực, đồng thời liệt kê danh sách các **Bản ghi chấm mẫu (Seeded Submissions)** (`AC`, `WA`, `TLE`, `CE`, `RE`) để người dùng kiểm tra giao diện chi tiết từng Subtask.
