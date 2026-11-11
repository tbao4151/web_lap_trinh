# Bộ Agent Skills cho Gemini Antigravity — AlgoAcademy

**Repo đích:** `tbao4151/web_lap_trinh`. **Mục tiêu:** thiết kế UI/UX của nền tảng học tập đa lĩnh vực, không cài đặt backend thật.

## 1. Các nguồn đã chọn

| Skill | Nguồn chính thức | Vai trò trong quy trình |
| --- | --- | --- |
| `ui-ux-pro-max` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | Nghiên cứu hướng nghệ thuật, layout, token, palette, typography, component guidelines |
| `frontend-design` | https://github.com/anthropics/skills/tree/main/skills/frontend-design | Tạo dấu ấn giao diện, hoàn thiện visual hierarchy, tránh UI chung chung |
| `vercel-react-best-practices` | https://github.com/vercel-labs/agent-skills/tree/main/skills/vercel-react-best-practices | Code React/Next.js chuẩn, performance, bundle và client rendering |
| `web-design-guidelines` | https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines | Rà soát UX, accessibility, input, responsive, keyboard navigation |
| `edtech-ui-standards` | `.agents/skills/edtech-ui-standards/SKILL.md` | Ràng buộc trải nghiệm riêng cho sản phẩm giáo dục và coding lab |

**Chỉ dùng 4 skill bên ngoài + 1 skill riêng**, không cài hàng chục bộ có mục tiêu trùng nhau.

**Đường dẫn chuẩn của Antigravity:** `<repo>/.agents/skills/<skill-name>/SKILL.md`. Các skill ở đây áp dụng cho riêng repo và có thể commit vào Git. Tham khảo https://antigravity.google/docs/skills

## 2. Cài đặt từ terminal Antigravity trên Windows 11

Chạy tại thư mục gốc `web_lap_trinh` (cần Node.js và npm). Đọc mã nguồn hoặc manifest của skill trước khi cấp quyền thực thi scripts hoặc truy cập file.

```powershell
# 0. Kiểm tra môi trường
node --version
npm --version
py -3 --version

# 1. UI/UX Pro Max (CLI chuyên biệt có hỗ trợ Antigravity)
npx ui-ux-pro-max-cli init --ai antigravity

# 2. Frontend Design từ Anthropic
npx skills add anthropics/skills --skill frontend-design

# 3. Hai skill chọn lọc từ Vercel
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --skill web-design-guidelines
```

Đối với `npx skills add`, chọn **project scope** và agent phù hợp khi CLI hỏi. Không dùng global để tránh tác động project khác. Kiểm tra rằng mỗi skill có `SKILL.md` trong `.agents/skills/`. Nếu CLI cài sai vị trí, di chuyển đúng **thư mục skill** sang đường dẫn chuẩn hoặc dùng phương án sao chép thủ công từ nguồn đã kiểm tra.

UI/UX Pro Max sử dụng Python 3 cho công cụ tìm kiếm thiết kế. Nếu Windows không hỗ trợ lệnh `py -3`, dùng `python --version` để kiểm tra. Có thể tham khảo thêm README của repo gốc. Không bắt Antigravity cài các công cụ hệ thống bằng quyền admin.

Nếu muốn dùng kho `https://github.com/tbao4151/ui-ux-skill` đã có, hãy xác định version và nguồn gốc trước. Tránh cài hai bản `ui-ux-pro-max` cùng tên gây xung đột.

## 3. Thứ tự kích hoạt và trách nhiệm

| Giai đoạn | Skill cần ưu tiên | Việc phải tạo ra |
| --- | --- | --- |
| Discovery / Design tokens | `ui-ux-pro-max` + `edtech-ui-standards` | Hệ token, bảng màu, typography, spacing, nguyên tắc UI theo vai trò |
| High-fidelity screen | `frontend-design` + `edtech-ui-standards` | Trang chủ, khóa học, lesson, coding lab, teacher studio có thẩm mỹ thống nhất |
| Implement | `vercel-react-best-practices` | Cấu trúc route, component, state mock, SSR/client boundary, tối ưu render |
| Audit trước nghiệm thu | `web-design-guidelines` + `edtech-ui-standards` | Danh sách lỗi file:line, sửa lỗi, kiểm thử responsive, keyboard, contrast |

**Quy tắc tránh xung đột:** `ANTIGRAVITY_UI_BRIEF.md` > `AGENTS.md` và `edtech-ui-standards` cho yêu cầu sản phẩm; skill ngoài chỉ cung cấp gợi ý về cách thực hiện. Không để skill ngoài đổi nội dung, mục tiêu, tech stack, phạm vi frontend hoặc khởi tạo backend.

## 4. Quy chuẩn thiết kế đặc thù

- Chọn một hệ token cố định; tránh mỗi trang một palette hay font khác nhau.
- Cảm giác chuyên nghiệp, rõ ràng như một EdTech + SaaS dành cho người học; tránh landing page quá nhiều gradient, hiệu ứng làm giảm khả năng đọc.
- Mobile-first ở nội dung học tập; editor ưu tiên desktop nhưng phải có fallback mobile hợp lý.
- Mặc định tiếng Việt; chừa chỗ cho tiêu đề dài, ví dụ code dài, công thức và Unicode.
- Học viên mới, học viên phổ thông, HSG là lộ trình theo mục tiêu/khả năng, **không phải ba giao diện khác nhau**.
- Mức độ năng lực phải theo kỹ năng/ngôn ngữ; không gắn một nhãn giỏi/yếu cố định cho tài khoản.
- Với coding lab: code editor, đề bài, input/output, test cases, kết quả chấm mock phải phân biệt rõ; không tạo kết quả chạy code giả như thật.
- Người biên soạn cần editor dạng blocks với preview student/teacher và nội dung gợi ý cho giáo viên được phân quyền.
- Mỗi route P0 cần tương tác dùng được, các trạng thái focus, loading, empty, error, validation; không có nút chết.
- Thống nhất dark/light, responsive, affordance và feedback. Hạn chế animation không cần thiết; tôn trọng prefers-reduced-motion.

## 5. Prompt sử dụng sau khi đã cài skill

> Hãy đọc `ANTIGRAVITY_UI_BRIEF.md`, `AGENTS.md`, `docs/AGENT_SKILLS_SETUP.md` và skill riêng `edtech-ui-standards` trước khi code. Ở giai đoạn xây design system, sử dụng `ui-ux-pro-max` để đề xuất tokens và `frontend-design` để cải thiện visual identity, nhưng phải giữ đúng sản phẩm AlgoAcademy. Khi triển khai Next.js, áp dụng `vercel-react-best-practices`. Sau mỗi milestone, chạy audit với `web-design-guidelines`, sửa các lỗi quan trọng và ghi báo cáo kiểm thử. Không xây backend thật. Trình bày cách UI hỗ trợ học lý thuyết, chạy demo code, luyện tập, quản lý học sinh, soạn khóa học và giới thiệu khóa học trả phí.

## 6. Checklist nghiệm thu

- [ ] Có design tokens, shared components và không gian rõ ràng cho 4 persona: visitor, learner, teacher/researcher, admin.
- [ ] Homepage public và trang khám phá khóa học không giống dashboard nội bộ.
- [ ] Lesson hỗ trợ các blocks khác nhau, bảng/markdown/code dài không tràn khung.
- [ ] Coding Lab có 4 ngôn ngữ mẫu, tabs điều hướng được, trạng thái judge mock được ghi rõ.
- [ ] Course Builder tạo/sửa/sắp xếp nội dung với mock-state.
- [ ] Có empty/loading/error, form errors, disabled states khi cần.
- [ ] Dark/light; kiểm tra desktop, tablet, mobile; accessibility keyboard và focus.
- [ ] Chạy lint, typecheck, build; báo cáo còn thiếu và ảnh chụp màn hình từng nhóm trang.
- [ ] Skill ngoài được cài đúng `.agents/skills` và không chứa thay đổi bất ngờ trong repo.
- [ ] Không rò rỉ API keys, tài liệu học sinh thật hay bí mật vào GitHub public.

## Lưu ý an toàn và bản quyền

Agent skills là hướng dẫn và có thể chứa scripts, reference, hoặc liên kết đến nội dung cập nhật từ xa; cần đọc và kiểm tra trước khi sử dụng. Không chạy tự động bất kỳ lệnh cài đặt hay script nào không rõ nguồn. Không sao chép toàn bộ repo của bên thứ ba vào repo thương mại nếu chưa xem license, các license riêng ở từng skill và nghĩa vụ ghi công. Cập nhật skill có chủ đích và commit riêng để có thể kiểm tra diff.
