# AlgoAcademy (`web_lap_trinh`)

**AlgoAcademy** là nền tảng học tập đa trình độ và đa mảng kiến thức về Lập trình (C, C++, Python, Java), Cấu trúc dữ liệu & Thuật toán / Bồi dưỡng Học sinh giỏi, Công nghệ phần mềm (Git/GitHub) và Cơ sở dữ liệu & Hệ thống (SQL).

> **Lưu ý phạm vi (UI/UX Stage):** Dự án hiện tại là **bản trình diễn giao diện người dùng (Production-Grade Frontend / UI Demo)** sử dụng dữ liệu mẫu chuẩn kiểu (typed mock seed data) và lưu trữ trạng thái trên trình duyệt (`localStorage`). Chưa kết nối máy chấm code (Judge Worker), cơ sở dữ liệu máy chủ hay cổng thanh toán thật.

---

## Tính năng nổi bật

1. **4 Không gian Vai trò (Role Switcher toàn cục):**
   - **Khách tham quan (`guest`):** Khám phá lộ trình theo mục tiêu, danh mục khóa học, kho bài tập công khai, dùng thử trực tiếp bộ mô phỏng Quy hoạch động (DP Visualizer) ngay trên trang chủ.
   - **Học viên (`learner`):** Trình học tương tác 10 loại khối nội dung (RichText, Code đa ngôn ngữ, Callout, Quiz, Interactive DP Visualizer, Problem Reference, Slide, Video, Diagram, Teacher Note ẩn với học viên), chế độ Tập trung (Focus Mode), Sổ tay ghi chú, Bản đồ năng lực đa trục và phòng thực hành Coding Lab.
   - **Giảng viên (`teacher`):** Teaching Studio với trình dựng cấu trúc khóa học (Course Outline Builder), trình soạn thảo khối bài giảng (Lesson Block Editor), chế độ Xem trước góc nhìn Học viên / Giảng viên, Ngân hàng bài tập theo Subtask, Sổ theo dõi lớp học và Không gian nghiên cứu chuyên đề.
   - **Quản trị viên (`admin`):** Quản lý người dùng & phân vai, kiểm duyệt trạng thái xuất bản học liệu, nhật ký mở khóa Demo và cấu hình phân loại đa mảng kiến thức.

2. **Tương tác có trạng thái lưu trữ (`localStorage`):**
   - Lưu tiến độ hoàn thành bài học, đánh dấu bài học, ghi chú cá nhân và câu trả lời Quiz.
   - Lưu nháp mã nguồn riêng biệt theo từng cặp `Bài tập + Ngôn ngữ (C / C++ / Python / Java)`.
   - Lưu thay đổi khi Giảng viên thêm/sửa/xóa/sắp xếp Học phần, Bài học, Khối nội dung (Blocks) hoặc chuyển ghi chép nghiên cứu thành bản nháp bài giảng.
   - Hỗ trợ nút **Khôi phục dữ liệu mẫu gốc (Reset Demo)** bất kỳ lúc nào.

---

## Công nghệ sử dụng

- **Framework:** Next.js 15 (App Router)
- **Ngôn ngữ:** TypeScript (`strict: true`)
- **Styling:** Tailwind CSS v4 + CSS Design Tokens (`Plus Jakarta Sans` & `JetBrains Mono`)
- **Icons:** `lucide-react`

---

## Hướng dẫn cài đặt và chạy dự án

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy môi trường phát triển (Development Server)
npm run dev

# 3. Kiểm tra kiểu TypeScript
npm run typecheck

# 4. Kiểm tra ESLint
npm run lint

# 5. Build bản Production
npm run build
```

---

## Cấu trúc thư mục chính

- `src/config/brand.ts` — Cấu hình thương hiệu tập trung, routes, taxonomy đa mảng kiến thức và metadata ngôn ngữ/độ khó.
- `src/types/index.ts` — Toàn bộ định nghĩa kiểu dữ liệu nghiêm ngặt (Course, LessonBlock, Problem, Submission, SkillCompetency, Classroom, Contest, ResearchNote...).
- `src/data/` — Bộ dữ liệu mẫu (8 khóa học, bài giảng đầy đủ 10 loại Block, 12 bài tập đa ngôn ngữ, 8 bài nộp mẫu, 4 lộ trình, lớp học, cuộc thi).
- `src/services/index.ts` — Lớp dịch vụ truy vấn và lọc dữ liệu đồng bộ.
- `src/providers/AppStateProvider.tsx` — Quản lý trạng thái toàn cục, đồng bộ `localStorage`, thông báo Toast và chuyển đổi giao diện Sáng/Tối.
- `src/components/` — Hệ thống thành phần giao diện tái sử dụng (`WorkspaceShell`, `PublicHeader`, `RoleSwitcherBar`, `DPVisualizer`, `LessonBlockRenderer`...).
- `src/app/` — Hệ thống 32 routes đầy đủ thuộc các Milestone A, B, C, D, E, F.
- `docs/` — Tài liệu quyết định thiết kế (`UI_DECISIONS.md`) và báo cáo trạng thái triển khai (`UI_IMPLEMENTATION_STATUS.md`).
