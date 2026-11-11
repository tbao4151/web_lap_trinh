# Lộ trình triển khai: Vercel trước, VPS sau

**Dự án:** AlgoAcademy — `tbao4151/web_lap_trinh`  
**Cập nhật:** 12/11/2026  
**Trạng thái:** Kế hoạch kiến trúc. Chưa deploy và chưa kết nối tài khoản Vercel/VPS.

## 1. Hiện trạng đã kiểm chứng trên GitHub

- Frontend Next.js App Router + TypeScript + Tailwind, giao diện nhiều vai trò.
- Dữ liệu học tập, bài tập và hồ sơ phần lớn là mock seed và localStorage của trình duyệt.
- RoleSwitcherBar là điều khiển **demo**, không phải xác thực/phân quyền phía server.
- Bấm chạy/nộp code chưa sử dụng compiler/judge thật.
- Flow thanh toán chỉ mô phỏng, không phát sinh giao dịch.
- `.github/workflows/frontend-quality.yml` chạy typecheck, lint, build sau khi có push/PR; CI không triển khai website.
- `package.json` hiện khai báo **Next.js 15.1.7**. Không được mở bản này công khai như production trước khi cập nhật dependency bảo mật và kiểm chứng build.

## 2. Chiến lược hai giai đoạn

### Giai đoạn A — Vercel (sau khi kiểm thử/khắc phục lỗ hổng)

Vercel chỉ là host web Next.js và các API phù hợp runtime serverless. Không lưu trạng thái quan trọng ở filesystem/function memory; không dùng hàm Next.js làm máy chấm mã nguồn không tin cậy.

- Kết nối GitHub repo và thiết lập preview deployments cho nhánh riêng/PR khi được chủ sở hữu cho phép.
- Sau khi CI xanh và mã đã được review mới xét deploy production.
- Database: PostgreSQL đặt ở dịch vụ độc lập để sau này có thể kết nối từ VPS.
- Storage: object storage dùng abstraction, có chính sách upload và kiểm soát quyền; không lưu file người dùng vào source repo hoặc filesystem của function.
- Auth: xác thực tại server/API, authorization theo role/ownership, chống bypass từ client; role switcher demo chỉ xuất hiện trong môi trường demo.
- Judge: dịch vụ riêng với sandbox/container cô lập, queue, giới hạn CPU/RAM/time/network. Không chạy source code người học trên Vercel Functions.
- Config môi trường qua biến: tách `local`, `preview`, `production`; mọi secret lưu tại công cụ quản lý secrets, không commit `.env` thật.

### Giai đoạn B — VPS (khi cần chủ động hạ tầng)

- Chạy ứng dụng Next.js trong container hoặc Node process, reverse proxy Nginx/Caddy và HTTPS.
- Backend, queue, Judge Worker và dịch vụ khác chạy theo container/network được giới hạn.
- Di chuyển bằng quy trình kiểm thử và migration DB tương thích, không đổi business logic chỉ để thay hosting.
- PostgreSQL có thể giữ ở managed service hoặc chuyển sang VPS bằng backup/restore có diễn tập trước.
- Sử dụng object storage bền vững, backup dữ liệu và chiến lược rollback.
- Quản lý observability: log, metrics, error tracking, cảnh báo và quản lý phiên bản.

## 3. Chống vendor lock-in

Các lớp nên tách thành:

```text
Next.js UI / API
      |
Application Services (auth, courses, learning, submissions, billing)
      |
Ports / adapters
  - SQL/PostgreSQL and migrations
  - Object storage
  - Background queue
  - Judge worker API
  - Payment provider / notification provider
```

Trong lần chuyển host, thay adapter và cấu hình triển khai khi cần, không viết lại giáo trình, service, layout hoặc data model.

## 4. Quy tắc triển khai theo milestone

1. **Bắt buộc trước preview public:** nâng dependencies Next/React lên bản đã vá, cập nhật lockfile và chạy typecheck/lint/build; kiểm tra báo cáo security advisories hiện hành.
2. **Frontend quality:** xây CI, sửa lỗi compile, lỗi điều hướng, loading/error/empty, responsiveness và accessibility. Tránh trang placeholder.
3. **Model/data chuẩn:** schema cho Course/Module/Lesson/Block/Problem/Submission/Learner/Classroom/Enrollment, migration versioned; không dùng localStorage làm nguồn dữ liệu thật.
4. **Auth + quyền truy cập:** thực thi trên server và DB; học viên không được xem teacher notes, hidden tests, private answer keys hoặc private courses qua API.
5. **Learning content:** lưu bài giảng và tiến độ trên DB; quản lý draft/published/revision.
6. **Judge service:** queue + sandbox + rate limit, chống lạm dụng. Phân biệt compile error/wrong answer/TLE/MLE/RE và tính điểm theo subtask.
7. **Commerce:** xác minh webhook server-side, idempotency, kiểm soát quyền truy cập, hoàn tiền và nhật ký audit.
8. **Vercel deployment:** preview -> nghiệm thu -> production có phê duyệt; không tự mua gói/dịch vụ hoặc cấu hình tên miền.
9. **Chuyển VPS:** image reproducible, môi trường bảo mật, backup/restore, thử nghiệm rollback rồi mới cắt DNS.

## 5. Điều kiện chặn production

Không deploy sản phẩm thật nếu còn bất kỳ vấn đề sau:
- Framework/runtime có lỗ hổng critical/high chưa khắc phục.
- CI build/typecheck/lint chưa xanh hoặc chưa kiểm tra.
- Chức năng vai trò chỉ kiểm soát phía client.
- Secrets trong source code hoặc trong frontend bundle.
- Sử dụng localStorage để quản lý đơn hàng, thanh toán, tiến độ thật hay dữ liệu cá nhân nhạy cảm.
- Judge chạy code không tin cậy cùng process với web/API/database.
- Không có sao lưu dữ liệu, kiểm tra webhook hoặc hạn chế truy cập.
- Demo tự nhận là thực thi/chấm bài/thanh toán thật.

## 6. Cách kiểm tra CI hiện tại

Sau khi push, mở GitHub → Actions → `Frontend quality checks`. Workflow thực hiện:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

CI chạy trên runner GitHub. Do môi trường hiện tại chưa có quyền clone/npm network để test, **đừng coi việc tạo workflow là bằng chứng build đã thành công**; chỉ kết quả run thật trên GitHub Actions mới xác nhận điều đó.

## 7. Ghi chú bảo mật ngày 12/11/2026

Tham chiếu thông báo Next.js tháng 10/2026: các phiên bản Next 15 trước **15.5.28** nằm trong nhóm ảnh hưởng của một số lỗi nghiêm trọng. Vì vậy không giữ `15.1.7` cho deployment. Xác nhận phiên bản khuyến nghị **mới nhất tại thời điểm thực sự cập nhật** và nâng đồng bộ Next.js/React/ESLint config/lockfile, sau đó kiểm thử tương thích. Nếu nâng đến Next.js 16, nhớ chuyển script `next lint` sang ESLint CLI (lệnh `next lint` bị gỡ từ Next.js 16).

Nguồn tham khảo:
- https://nextjs.org/blog/nextjs-security-update-october-14-2026
- https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-148/
- https://nextjs.org/docs/app/guides/upgrading/version-16
- https://vercel.com/docs/deployments
- https://vercel.com/docs/git/vercel-for-github

**Không tự động triển khai production, mua dịch vụ hoặc gắn domain** trong lịch tự động. Giai đoạn hiện tại là chuẩn hóa code, kiểm thử và dần hoàn thiện tính năng.
