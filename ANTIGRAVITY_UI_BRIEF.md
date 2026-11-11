# ANTIGRAVITY UI IMPLEMENTATION BRIEF

**Dự án:** Nền tảng học lập trình, thuật toán và công nghệ thông tin đa trình độ  
**Tên sản phẩm tạm thời:** AlgoAcademy (đặt tại một file cấu hình, dễ thay đổi)  
**Repository duy nhất:** https://github.com/tbao4151/web_lap_trinh  
**Nhánh mặc định:** `main`  
**Phiên bản tài liệu:** 1.1 — 11/11/2026 (bổ sung Agent Skills)  
**Ngôn ngữ giao diện:** Tiếng Việt, kiến trúc sẵn sàng i18n  
**Người nhận triển khai:** Gemini Antigravity  
**Mục tiêu hiện tại:** Xây dựng **frontend/UI/UX hoàn chỉnh theo từng đợt**, dùng mock data có tương tác; chưa xây backend sản xuất.

> QUAN TRỌNG: Tài liệu này là source of truth về mục tiêu sản phẩm và giao diện cho giai đoạn UI. Không tự ý đổi định hướng thành website chỉ dạy HSG C++, website chỉ chứa PDF, hoặc landing page bán khóa học. Không kết nối API thật, không tạo thanh toán thật, không chạy code tùy ý trên web server. Repo ban đầu trống; thiết lập dự án mới trong repo này.

---

## 0. LỆNH TRIỂN KHAI CHO ANTIGRAVITY (ĐỌC PHẦN NÀY TRƯỚC)

Bạn đang làm việc trong repository `tbao4151/web_lap_trinh`.

1. Đọc toàn bộ tài liệu này, `AGENTS.md`, `docs/AGENT_SKILLS_SETUP.md` và `.agents/skills/edtech-ui-standards/SKILL.md` trước khi code. Kiểm tra hiện trạng repository trước khi tạo hoặc ghi đè file.
2. Tạo ứng dụng **Next.js App Router + TypeScript (strict) + Tailwind CSS**. Ưu tiên shadcn/ui hoặc các headless primitives dễ kiểm soát; sử dụng Lucide cho hệ thống biểu tượng nhỏ trong UI khi cần; không dùng emoji trang trí. Dùng React components có thể tái sử dụng, không viết một trang JSX khổng lồ.
3. Triển khai giao diện **responsive, production-grade**, thiên về giáo dục và phần mềm chuyên nghiệp. Không làm bản mock tĩnh kiểu ảnh chụp màn hình. Các thao tác theo mục **8. Hành vi tương tác bắt buộc** phải hoạt động bằng dữ liệu giả lập và state thực.
4. **Không** triển khai Supabase, database, API judge, AI, thanh toán, gửi email, mua khóa học hoặc xác thực thật trong giai đoạn này. Tuy nhiên, thiết kế các model và adapter đủ sạch để có thể thay mock service bằng backend sau này.
5. Xây theo thứ tự: foundation/design system → các luồng P0 → P1 → P2. Nếu công việc quá lớn, hoàn thành P0 với chất lượng cao trước; tuyệt đối không đánh đổi chất lượng bằng cách tạo hàng chục trang rỗng.
6. Dùng data mẫu tiếng Việt có ý nghĩa, nhất quán giữa các màn hình. Có sample C, C++, Python và Java. Không dùng lorem ipsum, số liệu bán hàng thật giả mạo, hay diễn giải một kết quả chấm code giả như kết quả chạy thực.
7. Trước khi kết thúc, chạy lint, typecheck, build; sửa lỗi. Tự kiểm tra desktop, tablet, mobile và các trạng thái loading/empty/error nếu áp dụng. Ghi rõ việc đã làm và chưa làm.
8. Không hỏi lại người dùng những quyết định đã được chốt trong tài liệu. Với chi tiết nhỏ chưa chốt, chọn phương án phù hợp và ghi vào `docs/UI_DECISIONS.md`.

### Định nghĩa hoàn thành

- Có thể chạy local theo README.
- Có app shell, hệ thống route, navigation và responsive phù hợp từng vai trò.
- Các màn P0 có nội dung mẫu và tương tác thật bằng mock state.
- Có phiên bản giao diện sáng/tối, trạng thái focus, form validation, thông báo phản hồi.
- Các nút hiển thị như có chức năng phải thực hiện được hành vi mô phỏng hợp lý hoặc thông báo rõ “Chưa khả dụng trong bản demo”. Không có nút chết.
- Không giả vờ đang chạy mã nguồn, thu tiền, gửi email, cấp chứng nhận hay bảo mật bằng frontend.
- Không có lỗi build, typecheck và lint.

---

## 1. BẢN CHẤT SẢN PHẨM

Một **nền tảng giáo dục công nghệ có thể mở rộng** gồm 4 trụ cột:

- **Learning Studio:** Lộ trình, bài học tương tác, ghi chú, ôn luyện và theo dõi năng lực.
- **Coding Lab:** Trình soạn code, ngân hàng bài tập, nộp bài, kết quả judge, thi thử.
- **Teaching Studio:** Soạn khóa học, biên tập bài học, quản lý bài tập, lớp học và học sinh.
- **Online Academy:** Khám phá khóa học, học thử, trang chi tiết khóa, trải nghiệm mua và quản lý quyền truy cập (demo ở giai đoạn này).

**Khán giả mục tiêu:** (a) người bắt đầu từ số 0, (b) học sinh phổ thông cần học và ôn luyện, (c) học sinh giỏi Tin học/lập trình thi đấu, (d) sinh viên/người tự học, (e) giáo viên/giảng viên, (f) quản trị viên.

**Ngôn ngữ khởi đầu:** C, C++, Python, Java. **Không đồng nhất ngôn ngữ lập trình với trình độ.** Một người có thể giỏi C++ nhưng mới học Java.

**Lĩnh vực mở rộng:** DSA, thuật toán HSG, Web, Git/GitHub, SQL, hệ điều hành, mạng máy tính, an toàn thông tin, AI, và các môn không yêu cầu trình soạn code. Mô hình chương trình học phải linh hoạt, không hardcode danh sách 4 ngôn ngữ ở mọi nơi.

**Khái niệm dữ liệu độc lập:**

- `Domain` (lĩnh vực) → ví dụ Lập trình, Thuật toán, Công nghệ phần mềm, CNTT mở rộng.
- `Course` (khóa học) → ví dụ “C++ từ con số 0”.
- `Module` (học phần) → ví dụ “Mảng và chuỗi”.
- `Lesson` (bài học) → ví dụ “Mảng một chiều”.
- `LessonBlock` (khối nội dung) → văn bản, code, câu hỏi, slide, hình, video, tương tác.
- `Concept` (kiến thức gốc) → ví dụ “Binary Search”, có thể gắn nhiều khóa.
- `Problem` (bài lập trình) → độc lập với bài học, tái sử dụng được.
- `LearningPath` (lộ trình) → tập khóa học/học phần theo mục tiêu.
- `Classroom` (lớp học thực tế) → có giáo viên, danh sách học sinh, bài giao, tiến độ.
- `Enrollment` và `Entitlement` → học viên đăng ký, quyền sử dụng khóa học.

**Trình độ** (mới bắt đầu/cơ bản/trung cấp/nâng cao) là thuộc tính của nội dung và đánh giá năng lực; **mục tiêu** (học phổ thông/HSG/đi làm) là một chiều khác. Không tạo ba ứng dụng tách biệt hoặc ép học sinh phải chọn một trình độ cố định trọn đời.

---

## 2. PHẠM VI GIAI ĐOẠN GIAO DIỆN

### Làm ngay

- Tất cả phần layout, navigation, thiết kế từng nhóm màn hình; triển khai sâu các màn P0.
- Cấu trúc course/lesson, danh sách học, thanh tiến độ, bài học với nhiều loại khối nội dung.
- Coding editor có đổi ngôn ngữ và sample code (Monaco Editor nếu phù hợp; `dynamic import` client-side để tránh SSR lỗi).
- Màn hình kết quả nộp bài, test case, status AC/WA/TLE/CE ở **chế độ mô phỏng rõ ràng**.
- Quản lý học viên, khóa học, lớp học, nội dung bằng mock CRUD; dữ liệu demo được lưu vào localStorage hoặc mock store, có nút reset demo.
- Vai trò học viên, giảng viên, quản trị với công tắc chuyển persona **chỉ dành cho bản demo**.
- Trang giới thiệu khóa học, bảng giá, checkout preview (không thanh toán thật).

### Chưa làm, nhưng phải chuẩn bị đường mở rộng

- Database, authentication, phân quyền server, gửi mail, hệ thống judge thực.
- Thanh toán, hóa đơn, hoàn tiền thực, chứng chỉ thực.
- Gọi API AI, trợ giảng thực, tạo video/slide động từ server.
- Livestream, chấm tay chuyên sâu, chống gian lận thi cử.
- Đồng bộ Drive và nhập hàng loạt DOCX/PDF.

**Nguyên tắc chính xác:** Phân biệt rõ UI demo và chức năng thật. Mọi màn “thanh toán thành công”, “chấm bài thành công”, “AI giải thích” nếu chỉ minh họa phải có chú thích demo hoặc sử dụng dữ liệu mẫu đã xác định sẵn.

---

## 3. BRAND & DESIGN SYSTEM

### 3.1. Cảm giác thương hiệu

Thiết kế như một **sản phẩm EdTech/SaaS chất lượng cao**, không giống template blog, trang download giáo trình hoặc website luyện đề cổ điển. Tông: thông minh, mạch lạc, tin cậy, thân thiện với học sinh, không trẻ con. UX ưu tiên dễ học, dễ dùng, ít nhiễu, tập trung vào nội dung và coding.

Tên hiển thị tạm: `AlgoAcademy`. Đưa vào `src/config/brand.ts` để người dùng thay tên/logo/tagline sau, không hardcode nhiều chỗ. Không sáng tác số liệu đánh giá, học viên, kết quả thi có tính chất quảng cáo như dữ kiện thật; sử dụng nhãn “Dữ liệu minh họa” nếu cần.

### 3.2. Quy chuẩn thị giác đề xuất

| Token | Giá trị đề xuất | Mục đích |
|---|---|---|
| Primary | `#4F46E5` | Tác vụ chính, navigation active |
| Primary hover | `#4338CA` | Hover/focus |
| Accent | `#0D9488` | Gợi ý tích cực, tiến độ |
| Light bg | `#F8FAFC` | Nền sáng |
| Card light | `#FFFFFF` | Nội dung |
| Dark bg | `#0B1120` | Nền tối |
| Dark surface | `#111827` | Card tối |
| Text light mode | `#0F172A` | Heading/body |
| Text secondary | `#64748B` | Metadata |
| Border light | `#E2E8F0` | Đường phân cách |
| Success | `#15803D` | AC, hoàn thành |
| Warning | `#B45309` | Đang chờ, TLE |
| Error | `#B91C1C` | WA, CE/RE |

Dùng CSS variables / semantic tokens. Độ tương phản văn bản phải đạt WCAG AA. Chưa bắt buộc dùng chính xác palette này nếu có lý do thiết kế tốt hơn, nhưng không được làm UI neon, gradient tràn lan hoặc quá nhiều màu bão hòa.

**Font:** Be Vietnam Pro hoặc một sans-serif hỗ trợ tiếng Việt tốt. Code: JetBrains Mono (có fallback monospace). Dùng scale typography nhất quán, spacing 4/8px, border radius khoảng 10–14px, shadow nhẹ, hiệu ứng hover ngắn. Tôn trọng `prefers-reduced-motion`.

### 3.3. Hệ thống layout

- Public: top navbar, mega menu Khám phá, CTA học thử, footer đầy đủ.
- Learner app: sidebar trái desktop + top bar, nội dung đọc dễ tập trung, sidebar thu gọn, mobile navigation phù hợp.
- Teacher app: sidebar quản lý + workspace rộng, bảng danh sách, filter, tabs và các editor chuyên dụng.
- Admin app: dashboard tổng quan, bảng nghiệp vụ, filter và phân quyền demo.
- Lesson player: thanh bài học bên trái, nội dung trung tâm, bảng nội dung/ghi chú tùy chọn bên phải; chế độ Focus để ẩn cạnh bên.
- Coding Lab: responsive split panes “Đề bài / Code / Kết quả”; drag resize trên desktop nếu khả thi; trên mobile chuyển tabs.

### 3.4. Responsive

- Mobile: 360–767px, không tràn ngang; form và bảng có cách hiển thị phù hợp, code panel có cuộn nội bộ.
- Tablet: 768–1023px, sidebar có thể thu gọn.
- Desktop: 1024px trở lên, layout đa cột khi có lợi cho công việc.
- Large desktop: tối ưu 1440px và 1920px; giới hạn max-width cho nội dung học, editor được mở rộng.

Các trạng thái phải thiết kế: default, hover, focus-visible, disabled, active, loading/skeleton, empty, validation error, toast, confirmation, success/error, forbidden và not found.

---

## 4. VAI TRÒ VÀ CHIẾN LƯỢC ĐIỀU HƯỚNG

| Persona | Mục tiêu | Navigation chính |
|---|---|---|
| Guest | Khám phá, học thử, chọn khóa | Khóa học, Lộ trình, Bài tập mẫu, Giới thiệu |
| Learner | Học, luyện code, theo dõi năng lực | Tổng quan, Khóa đang học, Bài tập, Lộ trình, Tiến độ, Ghi chú |
| Teacher | Soạn nội dung, dạy lớp, đánh giá | Tổng quan, Khóa học, Bài học, Ngân hàng bài tập, Lớp học, Bài nộp, Nghiên cứu |
| Admin | Quản trị nền tảng, vận hành kinh doanh | Tổng quan, Người dùng, Nội dung, Đơn hàng, Cấu hình |

Người dùng có thể có nhiều vai trò. Demo mode có nút chuyển persona đặt trong menu tài khoản, không quảng bá là xác thực bảo mật. Trang public vẫn dùng chung cho tất cả vai trò.

---

## 5. SITEMAP / ROUTES CHUẨN

Ký hiệu: **P0** phải triển khai đầy đủ ngay đợt đầu; **P1** tiếp theo; **P2** màn mở rộng. Mỗi route phải có thiết kế đầy đủ và mock data phù hợp khi đến đợt triển khai, không để trang trắng.

### 5.1. Public & onboarding

| Route | Ưu tiên | Màn hình |
|---|---|---|
| `/` | P0 | Trang chủ/landing page, giới thiệu điểm khác biệt |
| `/khoa-hoc` | P0 | Course catalog: search, filter, sort, course cards |
| `/khoa-hoc/[slug]` | P0 | Chi tiết khóa: nội dung, preview, giảng viên, quyền truy cập |
| `/lo-trinh` | P1 | Lộ trình theo kỹ năng và mục tiêu |
| `/lo-trinh/[slug]` | P1 | Chi tiết lộ trình, cấu trúc kiến thức |
| `/bai-tap` | P1 | Ngân hàng bài tập công khai có giới hạn |
| `/gioi-thieu` | P2 | Sứ mệnh, phương pháp giảng dạy, liên hệ |
| `/dang-nhap` | P0 | Login demo, chọn persona minh bạch |
| `/dang-ky` | P1 | Form đăng ký demo với validation |
| `/thanh-toan/[courseSlug]` | P2 | Checkout UI preview, không xử lý tiền |

### 5.2. Learner app

| Route | Ưu tiên | Màn hình |
|---|---|---|
| `/hoc` | P0 | Dashboard: học tiếp, roadmap, bài cần luyện, hoạt động |
| `/hoc/khoa-hoc` | P0 | Các khóa đang học + tiến độ |
| `/hoc/khoa-hoc/[courseSlug]/bai/[lessonSlug]` | P0 | Lesson player giàu tương tác |
| `/hoc/bai-tap` | P0 | Practice library, lọc chủ đề/độ khó/ngôn ngữ/trạng thái |
| `/hoc/bai-tap/[slug]` | P0 | Coding Lab, đề, editor, sample, submit demo |
| `/hoc/bai-nop/[id]` | P0 | Kết quả chấm demo, test cases, metrics |
| `/hoc/tien-do` | P1 | Bản đồ năng lực theo kỹ năng, lịch sử học |
| `/hoc/ghi-chu` | P1 | Ghi chú, bookmarks, ôn tập |
| `/hoc/lo-trinh` | P1 | Lộ trình của tôi, mục tiêu và bước tiếp theo |
| `/hoc/cuoc-thi` | P2 | Danh sách contest, trạng thái sắp diễn ra |
| `/hoc/cuoc-thi/[slug]` | P2 | Contest detail/leaderboard demo |
| `/hoc/tai-khoan` | P1 | Hồ sơ, tùy chỉnh, theme, language preference |

### 5.3. Teacher app

| Route | Ưu tiên | Màn hình |
|---|---|---|
| `/giang-vien` | P0 | Dashboard quản trị học tập |
| `/giang-vien/khoa-hoc` | P0 | Danh sách khóa, trạng thái draft/published |
| `/giang-vien/khoa-hoc/[id]/bien-soan` | P0 | Course outline builder, module, lesson, preview |
| `/giang-vien/bai-hoc/[id]/soan-thao` | P0 | Lesson block editor: add/reorder/edit/preview |
| `/giang-vien/ngan-hang-bai-tap` | P1 | Problem bank + filter, tags, trạng thái |
| `/giang-vien/bai-tap/[id]/bien-soan` | P1 | Problem editor, statements, examples, groups of tests |
| `/giang-vien/lop-hoc` | P1 | Classroom list, danh sách học sinh |
| `/giang-vien/lop-hoc/[id]` | P1 | Chi tiết lớp, bài giao, kết quả, tiến độ |
| `/giang-vien/bai-nop` | P1 | Danh sách submissions, lọc và xem kết quả |
| `/giang-vien/nghien-cuu` | P2 | Knowledge/research workspace cá nhân của giáo viên |

### 5.4. Admin app

| Route | Ưu tiên | Màn hình |
|---|---|---|
| `/quan-tri` | P1 | Overview về người dùng, nội dung, đơn mẫu |
| `/quan-tri/nguoi-dung` | P1 | Users table, trạng thái, phân vai demo |
| `/quan-tri/noi-dung` | P2 | Kiểm duyệt, status, báo cáo nội dung |
| `/quan-tri/don-hang` | P2 | Order table, refund status demo |
| `/quan-tri/cau-hinh` | P2 | Cấu hình danh mục, thương hiệu, cấu hình chung |

### 5.5. System

- Trang 404 đẹp, có đường quay lại.
- Trang thiếu quyền/không có quyền học khóa (demo trạng thái).
- Error boundary phù hợp từng phần ứng dụng.
- Loading skeleton cho catalog, dashboard, lesson.

---

## 6. MÔ TẢ CHI TIẾT CÁC MÀN HÌNH CỐT LÕI

### 6.1. Trang chủ `/` (P0)

**Mục tiêu:** Người lần đầu vào hiểu trong 5–10 giây rằng đây là nơi học lập trình với lý thuyết trực quan, thực hành trong trình duyệt và có lộ trình phù hợp.

Cấu trúc đề xuất theo thứ tự:

1. Navbar rõ ràng: logo dạng chữ, Khám phá khóa học, Lộ trình, Luyện tập, Giới thiệu; CTA “Bắt đầu học”.
2. Hero: headline có giá trị thực, subcopy ngắn; CTA “Khám phá khóa học”, “Trải nghiệm bài học mẫu”. Visual product preview tự thiết kế (minh họa giao diện code/thuật toán, không lấy ảnh stock ngẫu nhiên).
3. Các nhóm mục tiêu “Mới bắt đầu”, “Học phổ thông”, “Luyện HSG” và “Tự học nâng cao”, giải thích mục tiêu khác trình độ.
4. 3 USP: học dễ hiểu, trực quan hóa thuật toán, code và nhận phản hồi.
5. Khóa học nổi bật từ mock data, thẻ có ngôn ngữ/trình độ/thời lượng/miễn phí hoặc trả phí.
6. Preview ngắn một bài học tương tác; phần này phải có tối thiểu một tương tác thật.
7. “Cách học hoạt động” gồm học lý thuyết → thực hành → xem tiến độ.
8. FAQ, footer và chính sách placeholder có nhãn rõ ràng.

Không bịa đánh giá 5 sao, học viên thật, trường học hợp tác hoặc tỷ lệ đậu HSG.

### 6.2. Danh sách khóa học `/khoa-hoc` (P0)

- Search theo tên, mô tả, tag.
- Filter theo lĩnh vực, ngôn ngữ, trình độ, mục tiêu, miễn phí/trả phí.
- Sort: liên quan, mới cập nhật, mức độ; mọi kết quả tính từ mock dataset thật.
- Mỗi course card hiển thị thumbnail minh họa, mô tả 2 dòng, số bài, thời lượng, cấp độ, giá demo/miễn phí.
- Chip filter chọn được, Clear filters, empty state hữu ích.
- Có thể chuyển grid/list nếu hợp lý.

### 6.3. Chi tiết khóa `/khoa-hoc/[slug]` (P0)

- Hero gồm tên khóa, mô tả, outcomes, tags và CTA “Học thử” / “Đăng ký” / “Tiếp tục học” dựa theo trạng thái demo.
- Outline dạng accordion Module → Lesson. Mỗi lesson có thời lượng, loại nội dung và nhãn xem trước nếu mở.
- Yêu cầu đầu vào, mục tiêu, đối tượng phù hợp; phân biệt “trình độ” và “mục tiêu”.
- Preview một phần nội dung; các bài khóa phải thể hiện trạng thái có quyền/chưa có quyền.
- Teacher profile kiểu mẫu, không tự tạo đánh giá giả làm dữ kiện.
- Course enrollment demo bằng state local, không phải thanh toán thật.

### 6.4. Learner dashboard `/hoc` (P0)

- Lời chào ngắn, lịch học hiện tại, CTA học tiếp.
- “Tiếp tục từ bài đang học”: course, lesson, % tiến độ.
- Roadmap hiện tại, kỹ năng cần cải thiện, bài tập gợi ý.
- Mini activity chart/heatmap từ dữ liệu mẫu, chú thích demo.
- Phần “Khám phá thêm” không lấn át tác vụ học.
- Nếu chưa có khóa: onboarding empty state với action mở catalog.

### 6.5. Lesson player `/hoc/khoa-hoc/[courseSlug]/bai/[lessonSlug]` (P0)

**Đây là màn hình quan trọng nhất về chất lượng học thuật.** Layout có mục lục bài học, nội dung học, panel ghi chú hoặc mục tiêu; mobile theo dạng drawer/tab.

Cần hỗ trợ các loại block ở mức UI:

- `richText`: heading, paragraph, list, quote, công thức toán hiển thị (KaTeX nếu cần).
- `code`: nhiều ngôn ngữ, nút copy, syntax highlight, thông tin input/output.
- `callout`: lưu ý, ví dụ, sai lầm thường gặp (không phụ thuộc màu làm ý nghĩa duy nhất).
- `image`: media có caption.
- `slide`: slide deck preview/slideshow mô phỏng từ block content, full-screen UI.
- `video`: video area placeholder có nhãn chưa tích hợp, không dùng video bản quyền tuỳ tiện.
- `quiz`: câu hỏi, radio/multiple-choice, feedback dựa đáp án seed.
- `interactive`: widget trực quan hóa thuật toán được seed, điều khiển bằng nút bước trước/bước sau/reset.
- `problemReference`: thẻ bài tập, liên kết đến Coding Lab.
- `teacherNote`: chỉ xuất hiện trong chế độ xem trước của giáo viên, không rò sang learner view.

Tối thiểu có một bài học mẫu “Quy hoạch động một chiều: Đổi tiền”, minh họa `dp[0]=0`, recurrence `dp[s]=min(dp[s],dp[s-coin]+1)` nếu `s>=coin`, giá trị ban đầu INF và kết quả kiểm tra ví dụ xu [1,3,4], tổng 6 bằng 2 đồng xu. Có widget từng bước cho bảng DP; **giải thích đúng**: khi dp[s-coin] là INF thì không cộng 1 để tránh tràn/nhận trạng thái bất khả thi. Hỗ trợ tập giá trị mẫu khác và giải thích base case; tối thiểu demo một chuỗi chuyển trạng thái đúng.

Mỗi lesson cần có:

- Breadcrumb, mục tiêu học tập, estimated time, đánh dấu hoàn thành.
- Bookmark, notes lưu local, mục lục, quay về bài trước/sang bài tiếp.
- Lesson progress trong khóa.
- Chế độ Focus, chọn theme, font reading (nếu kịp).
- Hiển thị các bài luyện tập liên quan.

### 6.6. Practice bank `/hoc/bai-tap` (P0)

- List/table cards dễ quét, theo tên, code problem ID, chủ đề, tags, độ khó, ngôn ngữ tương thích và trạng thái giải.
- Filter: tất cả/chưa làm/đang làm/đã giải, basic/intermediate/advanced/HSG, domain, tag.
- Search và sort.
- Không có filter dẫn đến kết quả giả cố định: tất cả phải chạy trên cùng mock store.

### 6.7. Coding Lab `/hoc/bai-tap/[slug]` (P0)

**Desktop:** layout split resizable hoặc tab pane có vùng đề bên trái, editor bên phải, panel test/result dưới. **Mobile:** tabs “Đề bài”, “Code”, “Kết quả” với đảm bảo không mất code khi chuyển tab.

Đề bài có: mã bài, tiêu đề, statement, Input, Output, Constraints, Examples, Notes, tags, giới hạn thời gian/bộ nhớ (demo), tab hướng dẫn gợi ý theo từng mức.

Editor có:

- Chọn C / C++ / Python / Java; khi đổi ngôn ngữ cảnh báo trước khi thay code chưa lưu (hoặc giữ draft riêng theo ngôn ngữ).
- Mặc định seed snippet thực tế đúng cho ngôn ngữ.
- Cửa sổ nhập custom input.
- Tác vụ “Lưu nháp”, “Đặt lại”, “Chạy thử (demo)”, “Nộp bài (demo)”.
- Chạy thử/nộp demo KHÔNG biên dịch. Click hiển thị thông báo minh bạch “Bản demo chưa kết nối hệ thống thực thi”. Có thể chọn “Xem kết quả chấm mẫu” để điều hướng tới submission seeded có dữ liệu test thực tế được định nghĩa trong mock.
- Không đánh dấu AC một code tùy ý mà chưa qua judge thật. Nếu có mock simulation theo bài/case cụ thể phải dán nhãn rõ và không mô tả là chấm thực.

### 6.8. Submission detail `/hoc/bai-nop/[id]` (P0)

Hiển thị submitted at, language, trạng thái (Accepted, Wrong Answer, Time Limit Exceeded, Compilation Error, Runtime Error, Pending), score, runtime/memory theo dữ liệu mẫu, test case groups/pass/fail, source code, lỗi compiler của seeded example nếu status CE. Có link quay lại bài và “Thử lại”. Các giá trị đi từ fixture; không tính thật từ code đầu vào.

### 6.9. Teacher dashboard `/giang-vien` (P0)

- Overview: số khóa, số lớp, draft cần hoàn thiện, bài cần đánh giá, hoạt động gần đây (mọi số dựa mock).
- Quick actions: “Tạo khóa học”, “Biên soạn bài học”, “Tạo bài tập”, “Vào lớp học”.
- Bảng tiến độ nội dung, danh sách lớp gần đây.
- Empty state nếu chưa có dữ liệu.

### 6.10. Course builder `/giang-vien/khoa-hoc/[id]/bien-soan` (P0)

- Header khóa học, trạng thái nháp/đã xuất bản giả lập, preview.
- Sidebar outline Module → Lesson có thêm/sửa/xóa/sắp xếp (buttons move up/down chấp nhận được nếu drag-drop chưa ổn định).
- Form course metadata: tiêu đề, slug, mô tả, lĩnh vực, ngôn ngữ, mức, mục tiêu, giá dạng demo, banner mẫu.
- Nút Lưu nháp, Xem trước, “Xuất bản demo” với dialog xác nhận.
- Nội dung phải còn sau refresh khi dùng mock persistence.
- Xóa module/bài có confirmation.

### 6.11. Lesson block editor `/giang-vien/bai-hoc/[id]/soan-thao` (P0)

- Danh sách block theo thứ tự; insert block từ menu, edit nội dung, duplicate, move, delete.
- Block types bắt buộc cho UI P0: Text, Code, Callout, Quiz, Problem reference, Image (local demo placeholder), Slide placeholder, Teacher note.
- Một số blocks nâng cao có thể là prototype nhưng phải có UI riêng, không render thành đoạn văn thuần.
- Panel metadata bài: tiêu đề, thời gian học, trạng thái, tags, objectives.
- “Preview as learner” phải ẩn teacher notes; “Preview as teacher” hiện ghi chú.
- Save draft local, cancel/unsaved changes guard.
- Không upload thật lên cloud, chỉ seed asset/local URL cố định; không tạo chức năng file upload giả không có xử lý.

---

## 7. MÀN HÌNH GIAI ĐOẠN P1/P2 (CẦN CÓ GIAO DIỆN ĐÚNG ĐỊNH HƯỚNG)

### P1

- **Lộ trình:** Course nodes, mục tiêu, prerequisite, progress. Có màn chọn mục tiêu không buộc chọn trình độ vĩnh viễn.
- **Tiến độ:** kỹ năng theo lĩnh vực và ngôn ngữ, mastered/in progress/needs review; biểu đồ dựa dữ liệu mock.
- **Ghi chú:** tạo/sửa/xóa và filter ghi chú, link về lesson gốc.
- **Teacher Problem Bank / Editor:** statement, ví dụ, constraints, visibility, tags, difficulty, languages, test groups. Mock tests chỉ hiển thị UI; không chạy judge.
- **Classroom:** class roster, lessons assigned, homework deadline, due/late/submitted, performance summary. Không lộ bài nộp học sinh sang tài khoản khác trong giả lập demo.
- **Teacher Submissions:** search/filter theo lớp, bài, trạng thái, click xem demo detail.
- **Admin Users:** users table, role chips, trạng thái; thay đổi chỉ trong local demo.

### P2

- **Contest:** lịch thi, trang contest, leaderboard seed và trạng thái sắp diễn ra/đã kết thúc.
- **Research workspace:** giáo viên ghi chép thuật toán, so sánh nhiều cách giải, liên kết bài học và bài tập, chuyển một research note thành bản nháp nội dung bằng thao tác mô phỏng.
- **Checkout:** summary khóa học, mã giảm giá demo, payment placeholder. Không form nhận số thẻ, không redirect cổng thanh toán thật.
- **Admin content/orders/settings:** filters, bảng mẫu có nhãn demo, audit views cơ bản.

---

## 8. HÀNH VI TƯƠNG TÁC BẮT BUỘC

Các chức năng này không được là nút giả/placeholder vô nghĩa ở P0:

| ID | Kịch bản người dùng | Kết quả mong đợi |
|---|---|---|
| F01 | Chuyển Guest → Learner → Teacher → Admin bằng demo role switcher | Chuyển app shell đúng persona; banner/nhãn “Chế độ demo”; không xem là bảo mật thật |
| F02 | Search/filter catalog | Kết quả thay đổi từ mock data; có clear filters và empty state |
| F03 | Mở course detail → học thử → vào lesson | Điều hướng đúng route và bài preview có nội dung |
| F04 | Learner đánh dấu lesson complete | Thanh tiến độ, dashboard và khóa của tôi đồng bộ |
| F05 | Learner thêm/sửa/xóa note + bookmark | Persist local và xem lại ở `/hoc/ghi-chu` nếu trang P1 đã triển khai |
| F06 | Chạy quiz trong lesson | Feedback chính xác theo đáp án fixture, reset được |
| F07 | Demo DP visualizer nhấn bước tới/lùi/reset | Trạng thái bảng và giải thích thay đổi nhất quán |
| F08 | Filter bài tập + mở problem | Đúng bài và đúng metadata, không route 404 |
| F09 | Đổi ngôn ngữ trong editor, nhập code, lưu draft | Code được lưu riêng theo ngôn ngữ/bài; không mất khi chuyển tab/refresh |
| F10 | Bấm Chạy thử hoặc Nộp bài demo | Thông báo không có judge thật; có lối xem sample submission có nhãn demo |
| F11 | Teacher tạo/sửa khóa và module | Mock store cập nhật, hiển thị lại và lưu local |
| F12 | Teacher thêm/sửa/đổi vị trí các lesson block | Preview thay đổi tương ứng; ghi chú giáo viên ẩn ở learner view |
| F13 | Search, sort, filter ở bất kỳ bảng nào đã triển khai | Hoạt động trên dữ liệu đang hiển thị, không reload full page vô ích |
| F14 | Dark/light mode | Toàn app thay đổi consistent, persist preference |
| F15 | Reset demo data từ Settings/developer demo menu | Xác nhận trước, dữ liệu về fixture ban đầu và thông báo thành công |

Nếu một chức năng P1/P2 chưa xong, CTA điều hướng tới placeholder có giải thích rõ *“Tính năng đang phát triển”*, không được tự nhận đã triển khai.

---

## 9. MOCK DATA VÀ MODEL CONTRACT (ĐỂ SAU NÀY GẮN BACKEND)

### 9.1. Seed data tối thiểu

Tạo dữ liệu nhất quán, tiếng Việt:

**Lĩnh vực:** Lập trình, Thuật toán & HSG, Công nghệ phần mềm, CNTT mở rộng.

**Các khóa học mẫu:**

1. `cpp-co-ban` — C++ từ con số 0 — Beginner — free.
2. `c-nen-tang` — Lập trình C nền tảng — Beginner — free.
3. `python-ung-dung` — Python từ cơ bản đến ứng dụng — Beginner/Intermediate — demo paid.
4. `java-oop` — Java và lập trình hướng đối tượng — Intermediate — demo paid.
5. `thuat-toan-hsg-cpp` — Thuật toán C++ luyện thi HSG — Advanced/Competition — demo paid.
6. `dp-tu-duy-den-nang-cao` — Quy hoạch động từ cơ bản đến nâng cao — Intermediate/Advanced — free preview + demo paid.
7. `git-github-thuc-hanh` — Git và GitHub thực hành — Beginner — free.
8. `sql-nen-tang` — SQL cơ bản — Beginner — demo paid.

**Khóa thuật toán HSG / DP** chứa các lesson mẫu liên quan: Nhập môn DP; DP một chiều; DP hai chiều; Balo và chọn tập con. Đặt nội dung có ý nghĩa và bài mô phỏng đúng; không cần nhập file Google Drive.

**Bài tập seed:** ít nhất 12 bài đủ độ khó, tags khác nhau, ví dụ: Tổng hai số, Tổng phần tử mảng, Đếm số chẵn, Tìm max, Số nguyên tố, Tìm kiếm nhị phân, Prefix Sum, Dãy con tăng, Đổi tiền ít nhất, Leo cầu thang, Balo 0/1, Đường đi trên bảng. Mỗi bài có ID, slug, statement, input/output/constraints, sample tests, languages, tags, difficulty, state.

**Personas:** học viên mẫu, giảng viên mẫu, quản trị mẫu. Không dùng thông tin nhận dạng cá nhân thật. Ít nhất 2 lớp học giả lập, 3 bài giao, 8 submissions seed với trạng thái khác nhau. Giá trị thống kê phải được suy ra từ fixtures, không viết số nguyên bất kỳ lên dashboard gây mâu thuẫn.

### 9.2. Types/interface đề nghị

Có thể điều chỉnh chi tiết nhưng nên giữ những concept sau:

```ts
type ProgrammingLanguage = 'c' | 'cpp' | 'python' | 'java';
type AppRole = 'guest' | 'learner' | 'teacher' | 'admin';
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'competition';
type CourseVisibility = 'draft' | 'published' | 'archived';
type LessonBlockType =
  | 'richText' | 'code' | 'callout' | 'image' | 'slide'
  | 'video' | 'quiz' | 'interactive' | 'problemReference' | 'teacherNote';
type SubmissionStatus =
  | 'PENDING' | 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  domainId: string;
  level: Difficulty;
  goals: string[];
  languages: ProgrammingLanguage[];
  tags: string[];
  priceVnd: number; // 0 = miễn phí, chỉ dùng demo ở giai đoạn này
  visibility: CourseVisibility;
  modules: CourseModule[];
}

interface CourseModule {
  id: string;
  title: string;
  order: number;
  lessons: LessonSummary[];
}

interface LessonSummary {
  id: string;
  slug: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  isPreview: boolean;
}

interface LessonBlock {
  id: string;
  type: LessonBlockType;
  order: number;
  data: Record<string, unknown>; // khi hiện thực nên chuyển thành discriminated union
}

interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  supportedLanguages: ProgrammingLanguage[];
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  samples: Array<{ input: string; output: string; explanation?: string }>;
}

interface Submission {
  id: string;
  problemId: string;
  userId: string;
  language: ProgrammingLanguage;
  status: SubmissionStatus;
  sourceCode: string;
  isDemo: boolean;
  submittedAt: string;
  runtimeMs?: number;
  memoryKb?: number;
  score?: number;
}
```

Quan trọng: các model chỉ để hỗ trợ UI, không xem frontend là nguồn quyền truy cập hợp lệ khi có backend thật. Không lưu password, JWT thật, khóa API trong localStorage.

### 9.3. Mock repositories/services

Đặt abstraction trước màn hình:

- `courseService`: list, getBySlug, createDraft, updateMetadata, updateOutline.
- `lessonService`: get, saveBlocks, markComplete, getProgress.
- `problemService`: list, getBySlug, getSampleSubmissions.
- `submissionService`: listSeeded, getById; `run/submit` trả `notConnected` trong UI phase.
- `classroomService`: list, detail, assignments seed.
- `commerceService`: course access preview; không xử lý giao dịch.

Toàn bộ mocks và adapters riêng biệt dưới `src/lib/mock`/`src/services`, không nhúng một dataset khác nhau vào từng component. Local persistence phải an toàn khi SSR/hydration; có version key và cơ chế reset.

---

## 10. THIẾT KẾ COMPONENT & THƯ MỤC DỰ ÁN

Đây là cấu trúc tham khảo; có thể thích nghi nhưng phải tách biệt route, feature, dữ liệu và component.

```text
web_lap_trinh/
├── README.md
├── package.json
├── public/
│   └── ... (brand, course thumbnails, illustrations)
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   ├── (auth)/
│   │   ├── hoc/
│   │   ├── giang-vien/
│   │   ├── quan-tri/
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/            (primitive components)
│   │   ├── layout/        (public/app/sidebar/topbar)
│   │   ├── course/
│   │   ├── lesson/
│   │   ├── coding/
│   │   ├── teacher/
│   │   └── charts/
│   ├── features/          (page-specific state and logic)
│   ├── config/            (brand, navigation, public config)
│   ├── data/              (typed mock fixtures)
│   ├── hooks/
│   ├── lib/               (helpers, mock persistence)
│   ├── services/          (adapter interfaces and mocks)
│   └── types/
├── docs/
│   ├── UI_DECISIONS.md
│   └── UI_IMPLEMENTATION_STATUS.md
└── ...
```

**Reusable components ưu tiên:** `PublicHeader`, `PublicFooter`, `AppSidebar`, `RoleSwitcher`, `CourseCard`, `CourseFilterBar`, `DifficultyBadge`, `LearningProgress`, `LessonOutline`, `LessonBlockRenderer`, `QuizBlock`, `DPVisualizer`, `ProblemStatement`, `CodeEditor`, `LanguageSelector`, `SubmissionStatus`, `TestcaseResult`, `EmptyState`, `ConfirmDialog`, `Toast`, `CourseOutlineEditor`, `LessonBlockEditor`, `DataTable`.

Không hardcode URLs rải rác; dùng route helpers/typed constants. Các UI text lặp nhiều nên có `messages/vi.ts` hoặc giải pháp tương đương để sẵn sàng dịch sang tiếng Anh.

---

## 11. CHI TIẾT UX KHÔNG ĐƯỢC BỎ QUA

1. **Đọc bài lâu:** nội dung body line-height thoáng, heading rõ, max-width đọc khoảng 760–850px, code block không phá layout, mục lục tiện sử dụng.
2. **Code:** font mono, phím Tab, copy, reset có xác nhận, code không mất khi đổi route vô tình hoặc đổi ngôn ngữ; editor resize khi cần.
3. **Quyền học:** màn học thử, lesson có quyền/chưa có quyền rõ ràng; demo entitlement không là security.
4. **Trạng thái lỗi:** empty list có CTA, 404 có route recovery; validation hiện ngay cạnh input; toast không thay thế nội dung quan trọng.
5. **Accessibility:** semantic HTML, label, keyboard navigation, visible focus, skip to content, headings hợp lý, contrast AA, modal focus trap, không dùng màu làm ý nghĩa duy nhất.
6. **Mobile:** không buộc người dùng xem code desktop; ít nhất có mode xem bài/đọc lý thuyết thuận tiện; editor mobile có thao tác được dù trải nghiệm phức tạp ưu tiên desktop.
7. **Data consistency:** course title/slugs/progress/preview/learner dashboard lấy cùng seed nguồn; bảng số liệu được tính từ dữ liệu có thật trong app demo.
8. **Polish:** loading skeleton, dropdown/accordion animation vừa phải, hover, active, disabled; dark mode có contrast tương đương.
9. **Privacy by design:** không vô tình hiển thị giáo viên note cho learner, không hiển thị học sinh thật, không có đường dẫn/khóa API trong client.
10. **Minh bạch demo:** không claim AI/chấm code/thanh toán/auth hoạt động thật; dùng nhãn “Dữ liệu minh họa”, “Chạy thử demo” đúng ngữ cảnh.

---

## 12. KẾ HOẠCH TRIỂN KHAI THEO ĐỢT

### Milestone A — Design system & app shell

- Next.js + TS strict + Tailwind, fonts, palette, light/dark.
- Navbar public, sidebars app và role switcher.
- Model types, data fixtures, mock services/persistence.
- Landing page hoàn chỉnh, login demo, 404.
- Đảm bảo lint/typecheck/build pass.

### Milestone B — Learning experience (P0)

- Catalog và course detail.
- Learner dashboard + enrolled courses.
- Lesson player đa loại block, quiz, ghi chú/hoàn thành, visualizer DP.
- Luồng từ landing → học thử → lesson hoàn chỉnh.

### Milestone C — Coding practice (P0)

- Problem bank, Coding Lab multi-language.
- Code drafts persist; custom input UI; sample submission và kết quả chấm demo.
- Điều hướng bài tập → nộp demo → sample result → thử lại.

### Milestone D — Teaching Studio (P0)

- Teacher dashboard/course list, course outline builder.
- Lesson block editor, preview learner vs teacher, mock CRUD.
- Kiểm tra tác vụ thêm/sửa/xóa/sắp xếp và lưu local.

### Milestone E — Secondary areas (P1)

- Learning paths, progress analytics, notes.
- Problem builder, classroom, teacher submissions.
- Admin dashboard và users.

### Milestone F — Extended demos (P2)

- Contests, teacher research, checkout preview.
- Admin content, orders, settings, UI polishing.

**Cách vận hành:** Mỗi milestone tạo một checkpoint rõ ràng, có screenshot/demo và ghi `docs/UI_IMPLEMENTATION_STATUS.md` với routes đạt, interactions đạt, issues còn lại. Nếu đang làm theo một lượt lệnh duy nhất, phải ưu tiên hoàn thiện milestone A–D trước, không tạo P1/P2 rỗng chỉ để đánh dấu xong.

---

## 13. NGHIỆM THU / ACCEPTANCE CRITERIA

### 13.1. Chất lượng kỹ thuật

- [ ] `pnpm install` hoặc lệnh package manager đã chọn hoạt động theo README.
- [ ] `pnpm dev` chạy ứng dụng local, không lỗi ở những route đã công bố hoàn thành.
- [ ] `pnpm lint` sạch lỗi; `pnpm tsc --noEmit` (hoặc lệnh typecheck tương đương) sạch lỗi.
- [ ] `pnpm build` thành công.
- [ ] Không có lỗi hydration hoặc import client-only editor trên server.
- [ ] Không có secrets/credentials; không thêm backend SDK khi chưa cần.
- [ ] Không fake thành công từ judge, thanh toán, auth.

### 13.2. Chất lượng giao diện

- [ ] Có nhận diện và spacing nhất quán ở marketing, learner, teacher, admin.
- [ ] Responsive tối thiểu tại 390px, 768px, 1280px và 1920px.
- [ ] Có dark/light, state hover/focus/disabled/loading/empty/error phù hợp.
- [ ] Tiếng Việt tự nhiên, chính tả chính xác, không lorem ipsum/emoji trang trí.
- [ ] Các bảng lớn không phá bố cục mobile.
- [ ] Dễ khám phá, dễ vào bài học, dễ quay lại khóa học.

### 13.3. Luồng P0 phải demo được

- [ ] Người xem từ trang chủ tìm khóa, mở chi tiết, xem bài học mẫu.
- [ ] Học viên mở lesson, trả lời quiz, lưu ghi chú, đánh dấu hoàn thành, thấy cập nhật tiến độ.
- [ ] Widget DP biểu diễn đúng bước chuyển trạng thái.
- [ ] Học viên lọc bài tập, mở coding lab, chuyển 4 ngôn ngữ, lưu code, xem thông báo judge chưa kết nối và duyệt kết quả mẫu.
- [ ] Giảng viên sửa course, thêm module/bài, biên soạn lesson blocks, xem trước khác nhau giữa learner/teacher và refresh vẫn còn dữ liệu.
- [ ] Chuyển persona và reset demo hoạt động đúng.

### 13.4. Tiêu chuẩn báo cáo của Antigravity sau mỗi milestone

Báo cáo ngắn, có chứng cứ:

1. Screens/routes đã hoàn thành (đường dẫn).
2. Các hành vi có thể click để kiểm thử.
3. Các chức năng chỉ là mock / chưa kết nối thật.
4. Lệnh đã chạy và kết quả lint/typecheck/build.
5. Việc còn lại trong milestone tiếp theo.

---

## 14. NGUYÊN TẮC TRIỂN KHAI VÀ QUẢN LÝ SOURCE

- **Chỉ dùng repo** `https://github.com/tbao4151/web_lap_trinh`; không đưa sản phẩm sang repo khác.
- Ưu tiên commit nhỏ, có nội dung rõ ràng; không force push, không xóa lịch sử.
- Các file tài liệu thuộc `docs/`; giữ README có hướng dẫn chạy, tình trạng mock/real rõ ràng.
- Không tự thiết kế database, worker judge, thanh toán, AI integration rồi đưa vào production trong đợt UI.
- Tất cả kết nối thật về sau đi qua services/contracts, không gọi trực tiếp từ components.
- Thiết kế sạch để sau này có thể tích hợp Supabase/PostgreSQL, judge worker riêng, file storage, payment gateway mà không cần vẽ lại UI.
- Không chuyển tài liệu Drive thành schema chuẩn. Drive chỉ là nguồn tham khảo nhập liệu trong tương lai.
- Không dùng hình ảnh/tài liệu có bản quyền chưa có quyền khai thác; hình minh họa có thể tự làm bằng CSS/SVG hoặc hình đủ quyền sử dụng.
- Không xuất bản thông tin lớp/học sinh thật trong repo công khai.

---

## 15. LỆNH NGẮN ĐỂ DÁN VÀO ANTIGRAVITY

Sau khi tải/đặt file này tại root repository, dùng nguyên văn prompt sau:

> Bạn là senior frontend engineer và product designer chịu trách nhiệm xây giao diện nền tảng EdTech trong repository hiện tại `tbao4151/web_lap_trinh`. Trước khi code đọc `AGENTS.md`, `docs/AGENT_SKILLS_SETUP.md`, `.agents/skills/edtech-ui-standards/SKILL.md`; xác nhận các skill ngoài đã được cài đúng đường dẫn. Dùng `ui-ux-pro-max` cho design tokens, `frontend-design` để hoàn thiện visual, `vercel-react-best-practices` cho React/Next.js, và `web-design-guidelines` để audit sau mỗi milestone. Hãy đọc kỹ và tuân thủ tuyệt đối file `ANTIGRAVITY_UI_BRIEF.md` ở root, coi đó là PRD + UI/UX specification chính thức. Repo ban đầu trống. Hãy thiết lập Next.js App Router, TypeScript strict, Tailwind CSS và design system chuẩn, sau đó triển khai **Milestone A → B → C → D** theo thứ tự, dùng mock data typed và tương tác thật. Ưu tiên chất lượng, tính nhất quán, responsive và khả năng mở rộng; không làm landing page đơn thuần, không tạo quá nhiều trang rỗng. Đảm bảo các luồng học thử, learner lesson, coding lab demo, course builder, lesson editor hoạt động. Không làm backend/auth/judge/payment thật; không báo chấm code thành công khi không có judge. Chạy lint, typecheck, build; ghi các quyết định chưa rõ vào `docs/UI_DECISIONS.md`, trạng thái công việc vào `docs/UI_IMPLEMENTATION_STATUS.md` và cập nhật README. Nếu cần chia nhiều đợt, hoàn thành milestone A và B thật tốt rồi tiếp tục C và D, báo rõ các phần còn lại. Giữ toàn bộ code trong repository này.

---

**Kết luận:** Thiết kế một nền tảng **học — thực hành — giảng dạy — kinh doanh khóa học** có thể mở rộng, với trải nghiệm giáo dục cốt lõi đứng trước tính năng thương mại. Trang web phục vụ học viên, đồng thời là không gian nghiên cứu và biên soạn nội dung của giáo viên. Bản UI đầu tiên cần đủ thực tế để kiểm thử toàn bộ trải nghiệm, nhưng không được gây hiểu lầm rằng các dịch vụ backend đã được kết nối.

---

## 16. AGENT SKILLS VÀ HƯỚNG DẪN CÀI ĐẶT (BỔ SUNG PHIÊN BẢN 1.1)

Bộ thiết kế giai đoạn UI được bổ sung các skill chuyên biệt từ GitHub; Antigravity hỗ trợ chuẩn `.agents/skills/<ten-skill>/SKILL.md` trong workspace.

**Các file hướng dẫn đã được thêm vào repository chính:**

- [AGENTS.md](https://github.com/tbao4151/web_lap_trinh/blob/main/AGENTS.md): Quy định ưu tiên và định nghĩa hoàn thành.
- [docs/AGENT_SKILLS_SETUP.md](https://github.com/tbao4151/web_lap_trinh/blob/main/docs/AGENT_SKILLS_SETUP.md): Nguồn skill, cách cài trên Windows, quy trình audit và checklist.
- [.agents/skills/edtech-ui-standards/SKILL.md](https://github.com/tbao4151/web_lap_trinh/blob/main/.agents/skills/edtech-ui-standards/SKILL.md): Skill EdTech UI được viết riêng cho dự án.

**Bốn skill ngoài nên cài có chủ đích** (không sao chép toàn bộ GitHub repo):

1. [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — design system, layout, typography và tiêu chuẩn giao diện.
2. [Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) — bản sắc và chất lượng thẩm mỹ.
3. [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/vercel-react-best-practices) — hiệu năng và cấu trúc code React/Next.js.
4. [Vercel Web Design Guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) — kiểm tra accessibility/UX sau khi triển khai.

**Lệnh gợi ý cho terminal Antigravity tại thư mục dự án:**

```powershell
npx ui-ux-pro-max-cli init --ai antigravity
npx skills add anthropics/skills --skill frontend-design
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --skill web-design-guidelines
```

Với lệnh `npx skills add`, chọn cài trong **project** và đảm bảo skill nằm dưới `.agents/skills/`, không cài global. Đọc/kiểm tra `SKILL.md`, scripts và license trước khi thực thi. Các kho GitHub có thể được cập nhật, do đó cần review diff trước khi nâng cấp. Cài một lần mỗi skill; nếu đã dùng `tbao4151/ui-ux-skill` làm nguồn cho UI/UX Pro Max thì không cài thêm bản trùng tên.

**Trình tự:** UI/UX Pro Max lên định hướng → Frontend Design tinh chỉnh màn hình → Vercel React Best Practices trong lúc code → Web Design Guidelines audit cuối mỗi milestone. Skill `edtech-ui-standards` áp dụng xuyên suốt. Không skill bên ngoài nào được ghi đè các ràng buộc sản phẩm, phạm vi mock-only, hoặc yêu cầu bảo mật trong tài liệu này.
