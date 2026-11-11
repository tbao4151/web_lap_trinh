# Trạng thái Triển khai Giao diện (UI Implementation Status)

**Dự án:** AlgoAcademy (`web_lap_trinh`)  
**Cập nhật lần cuối:** 12/11/2026  

---

## 1. Tổng quan Tiến độ theo Milestone

| Milestone | Phạm vi | Trạng thái | Ghi chú |
|---|---|---|---|
| **Milestone A** | Design System, App Shell, Role Switcher, Mock Store, Trang chủ `/`, `/dang-nhap`, `404` | Hoàn thành | Đã có DP Visualizer tương tác ngay trên trang chủ |
| **Milestone B** | Learning Experience (P0): `/khoa-hoc`, `/khoa-hoc/[slug]`, `/hoc`, `/hoc/khoa-hoc`, Lesson Player `/hoc/khoa-hoc/[courseSlug]/bai/[lessonSlug]` | Hoàn thành | Đủ 10 loại LessonBlock, DP Visualizer, Quiz, Ghi chú, Focus Mode |
| **Milestone C** | Coding Practice (P0): `/hoc/bai-tap`, Coding Lab `/hoc/bai-tap/[slug]`, Submission Detail `/hoc/bai-nop/[id]` | Hoàn thành | 12 bài tập seed, 4 ngôn ngữ C/C++/Python/Java, lưu nháp riêng, chấm mẫu minh bạch |
| **Milestone D** | Teaching Studio (P0): `/giang-vien`, `/giang-vien/khoa-hoc`, Course Builder `/giang-vien/khoa-hoc/[id]/bien-soan`, Lesson Block Editor `/giang-vien/bai-hoc/[id]/soan-thao` | Hoàn thành | Hỗ trợ thêm/sửa/xóa/nhân bản/sắp xếp Học phần, Bài học, Block và chuyển đổi Xem trước Học viên / Giảng viên |
| **Milestone E** | Secondary Areas (P1): Lộ trình, Tiến độ, Ghi chú, Ngân hàng đề GV, Lớp học, Bài nộp GV, Admin Users | Hoàn thành | Ma trận năng lực đa trục (không thanh % chung), Sổ tay ghi chú CRUD, trình biên soạn đề bài & Subtask, quản lý lớp học, phân vai Admin |
| **Milestone F** | Extended Demos (P2): Giới thiệu `/gioi-thieu`, Checkout Preview `/thanh-toan/[courseSlug]`, Cuộc thi `/hoc/cuoc-thi`, `/hoc/cuoc-thi/[slug]`, Nghiên cứu GV `/giang-vien/nghien-cuu`, Admin `/quan-tri/noi-dung`, `/quan-tri/don-hang`, `/quan-tri/cau-hinh` | Hoàn thành | Đầy đủ toàn bộ P0 + P1 + P2 routes, tuân thủ nghiêm ngặt quy tắc minh bạch Demo |

---

## 2. Danh sách đầy đủ các Routes đã triển khai

### Không gian Công khai (Public Discovery)
- `/` — Trang chủ với bộ chọn mục tiêu học tập, bản thử trực tiếp DP Visualizer, khóa học tiêu biểu và danh mục đa mảng kiến thức.
- `/khoa-hoc` — Danh mục khóa học có tìm kiếm, lọc theo mảng/ngôn ngữ/trình độ/mục tiêu/học phí, sắp xếp và chuyển đổi Grid/List.
- `/khoa-hoc/[slug]` — Chi tiết khóa học, trạng thái quyền truy cập và đề cương từng học phần/bài học.
- `/lo-trinh` — Danh mục lộ trình học tập theo mục tiêu.
- `/lo-trinh/[slug]` — Chi tiết từng chặng lộ trình gắn với khóa học và bài tập thực hành.
- `/bai-tap` — Ngân hàng bài tập công khai.
- `/gioi-thieu` — Triết lý sư phạm, kiến trúc đa mảng và biểu mẫu liên hệ Demo.
- `/dang-nhap` — Chuyển đổi nhanh vai trò trải nghiệm hoặc đăng nhập mẫu.
- `/dang-ky` — Khởi tạo hồ sơ học tập và chọn mục tiêu đầu vào (Onboarding Demo).
- `/thanh-toan/[courseSlug]` — Xem trước luồng mở khóa học liệu 1-click minh bạch (không thu thông tin thẻ hay thanh toán thật).

### Không gian Học viên (Learner Studio)
- `/hoc` — Bảng điều khiển học viên, học tiếp bài đang dở, cảnh báo kỹ năng cần củng cố và biểu đồ nhịp độ 14 ngày.
- `/hoc/khoa-hoc` — Khóa học đang theo học và toàn bộ kho học liệu.
- `/hoc/khoa-hoc/[courseSlug]/bai/[lessonSlug]` — Trình học bài giảng tương tác (Focus Mode, Đánh dấu hoàn thành, Lưu bài, Ghi chú cá nhân, Quiz, DP Visualizer).
- `/hoc/bai-tap` — Kho bài tập luyện tập có lọc theo trạng thái giải.
- `/hoc/bai-tap/[slug]` — Coding Lab IDE đa ngôn ngữ (C, C++, Python, Java) có lưu nháp tự động và xem kịch bản chấm mẫu.
- `/hoc/bai-nop/[id]` — Báo cáo chi tiết bài nộp theo từng Subtask và thông báo trình biên dịch.
- `/hoc/tien-do` — Bản đồ năng lực đa trục theo kỹ năng & ngôn ngữ.
- `/hoc/ghi-chu` — Sổ tay ghi chú và danh sách bài học đã đánh dấu.
- `/hoc/lo-trinh` — Lộ trình cá nhân hóa theo mục tiêu đang chọn.
- `/hoc/cuoc-thi` — Danh sách kỳ thi thử thuật toán.
- `/hoc/cuoc-thi/[slug]` — Chi tiết phòng thi và bảng xếp hạng điểm từng phần theo chuẩn IOI.
- `/hoc/tai-khoan` — Thiết lập hồ sơ, chế độ Sáng/Tối và khôi phục dữ liệu mẫu.

### Không gian Giảng viên (Teaching Studio)
- `/giang-vien` — Tổng quan công tác giảng dạy và biên soạn.
- `/giang-vien/khoa-hoc` — Quản lý danh sách khóa học (Published / Draft) và tạo khóa học mới.
- `/giang-vien/khoa-hoc/[id]/bien-soan` — Course Outline Builder (thêm/sửa/xóa/sắp xếp Học phần và Bài học).
- `/giang-vien/bai-hoc/[id]/soan-thao` — Lesson Block Editor (chỉnh sửa 10 loại Block, chuyển đổi Xem trước như Học viên / Giảng viên).
- `/giang-vien/ngan-hang-bai-tap` — Quản lý ngân hàng đề bài.
- `/giang-vien/bai-tap/[id]/bien-soan` — Trình biên soạn đề bài, Sample I/O, Subtask và Starter Code.
- `/giang-vien/lop-hoc` — Danh sách lớp học và đội tuyển.
- `/giang-vien/lop-hoc/[id]` — Chi tiết học sinh và bài tập giao về nhà.
- `/giang-vien/bai-nop` — Nhật ký bài nộp học viên.
- `/giang-vien/nghien-cuu` — Không gian nghiên cứu chuyên đề và chuyển hóa thành bản nháp bài học.

### Không gian Quản trị (Admin Console)
- `/quan-tri` — Tổng quan hệ thống.
- `/quan-tri/nguoi-dung` — Quản lý người dùng và bật/tắt phân vai.
- `/quan-tri/noi-dung` — Kiểm duyệt trạng thái xuất bản khóa học.
- `/quan-tri/don-hang` — Nhật ký kích hoạt khóa học minh họa.
- `/quan-tri/cau-hinh` — Cấu hình thương hiệu và phân loại đa mảng kiến thức.
