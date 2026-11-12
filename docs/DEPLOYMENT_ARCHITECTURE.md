# Kiến trúc triển khai AlgoAcademy: Vercel trước, VPS sau

> Trạng thái: tài liệu thiết kế, **chưa triển khai**. Frontend hiện dùng mock data và localStorage. Không coi dữ liệu demo là dữ liệu sản xuất.

## Phân chia dịch vụ

| Thành phần | Giai đoạn Vercel | Giai đoạn VPS |
| --- | --- | --- |
| Next.js App Router: UI, SSR, API nhẹ | Vercel | Container Node.js |
| PostgreSQL, migration, backup | PostgreSQL managed **bên ngoài** Vercel | PostgreSQL managed hoặc container/VM riêng có backup |
| File học liệu | Object storage S3-compatible bên ngoài | S3-compatible hoặc MinIO độc lập |
| Auth và phân quyền | Xác minh phiên và quyền **trên server**; không tin role switcher demo | Giữ cùng logic, khóa ký và session |
| Judge Worker chạy mã không tin cậy | **Dịch vụ/container cô lập bên ngoài Vercel** | Worker riêng, sandbox cô lập; không chạy trong process Next.js |
| Hàng đợi chấm bài | Queue managed ngoài Next.js | Redis/queue worker riêng |
| Tác vụ nền dài hạn | Worker/queue riêng | Worker/queue riêng |

Vercel phù hợp hosting Next.js và request ngắn; không dùng serverless function để biên dịch/chạy code học viên, giữ job dài hạn, hoặc lưu file bền vững trên local filesystem. Không dựa vào API đặc thù Vercel trong domain services khi có thể dùng adapter độc lập.

## Nguyên tắc trước khi thêm backend

1. Định nghĩa interface cho `CourseRepository`, `EnrollmentRepository`, `ObjectStorage`, `JudgeClient` và triển khai adapter riêng. Mock adapter vẫn được gắn nhãn demo.
2. Migrations PostgreSQL có version, chạy bằng tác vụ triển khai có kiểm soát; không tự chạy migration ở mỗi request/serverless cold start.
3. Cấu hình qua environment variables; chỉ commit `.env.example` chứa tên biến và giá trị giả an toàn, không commit token, URL có mật khẩu hay khóa thật. Không dùng `NEXT_PUBLIC_` cho secrets.
4. Mọi API ghi dữ liệu cần authn, authz theo đối tượng (khóa học, lớp học, bài nộp), validation đầu vào, giới hạn kích thước/rate limit và kiểm tra CSRF theo mô hình session.
5. Worker chấm code dùng sandbox giới hạn CPU, RAM, thời gian, process, filesystem và network; không mount secret hay Docker socket. Kết quả chỉ được chấp nhận từ worker được xác thực.
6. Upload dùng signed URL ngắn hạn, kiểm tra loại/kích thước file, quyền truy cập và quét nội dung nếu cần.
7. Có health checks, logging không chứa PII/secrets, backup/restore test và rollback plan trước khi tiếp nhận dữ liệu thật.

## Trình tự triển khai đề xuất

- **Hiện tại:** duy trì UI demo; chạy `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build` và kiểm tra dependency vulnerabilities trước khi preview.
- **Preview Vercel:** chỉ dùng dữ liệu mẫu; cấu hình biến môi trường không nhạy cảm; không tạo production deployment khi chưa được cho phép.
- **Backend thử nghiệm:** thiết kế schema/migration và auth server-side; staging PostgreSQL + storage ngoài; dữ liệu giả; Judge Worker vẫn tách biệt.
- **Production (cần phê duyệt riêng):** bảo mật, phân quyền, migration, backup, giám sát, chính sách dữ liệu, kiểm thử tải và chi phí.
- **Chuyển VPS:** containerize Next.js + worker riêng, reverse proxy TLS, PostgreSQL/storage có backup; giữ nguyên env contract, migration và service adapters.

Không có hạ tầng, tên miền, thanh toán hay dữ liệu người dùng thật nào được kích hoạt bởi tài liệu này.
