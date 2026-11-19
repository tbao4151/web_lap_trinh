# Judge Worker — hợp đồng cách ly và kiểm thử (thiết kế, chưa triển khai)

**Phạm vi:** AlgoAcademy chỉ chấm bài lập trình thi đấu **C++ và Python**. Đây là tài liệu thiết kế và tiêu chí nghiệm thu, **không** phải bằng chứng đã có máy chấm thật.

## Ranh giới tin cậy

- **Next.js trên Vercel:** xác thực phiên, kiểm tra quyền server-side, kiểm tra kích thước/định dạng request, lưu submission ở trạng thái `queued` qua backend được bảo vệ. Không gọi `eval`, `exec`, `spawn`, compiler hay runtime để chạy mã học viên.
- **Hàng đợi:** chứa submission ID và tham chiếu phiên bản bài/testcase, không chứa secret; cơ chế claim nguyên tử, retry có giới hạn, idempotency key, trạng thái `queued → running → finished/failed`. Chỉ worker service identity mới được cập nhật verdict. Không tin user-supplied verdict, score, test output hay owner ID.
- **Judge Worker ngoài Vercel:** chỉ nhận job đã xác thực từ queue, lấy testcases từ kho riêng bằng quyền tối thiểu; mỗi lần chấm tạo sandbox/container dùng một lần. Tách quyền compile và run; không dùng Docker socket đặc quyền trong container chứa mã học viên.
- **Sandbox:** non-root, read-only root filesystem, thư mục tạm có quota, cấm privileged, không mount host filesystem/secrets, không truy cập mạng, hạn chế syscall/capabilities, giới hạn số process/file descriptors, CPU, RAM, disk, output và wall-clock. Giới hạn phải áp dụng từ host/cgroup; timeout ở ứng dụng không thay thế cách ly hệ điều hành.
- **Dữ liệu:** hidden tests không được trả cho client; log chấm phải loại bỏ secret và giới hạn dung lượng. Chỉ trả verdict, điểm/subtask được phép hiển thị và chẩn đoán đã lọc.

## Ngôn ngữ và verdict

| Ngôn ngữ | Compile/run | Lưu ý |
| --- | --- | --- |
| C++ | Compiler phiên bản được pin, chuẩn contest được công bố; binary chạy trong sandbox riêng | Giới hạn CPU/RAM theo bài |
| Python | Interpreter phiên bản được pin, chạy trong sandbox riêng | Có thể dùng hệ số thời gian theo ngôn ngữ được công bố trước; không tùy tiện nới RAM |

Verdict tối thiểu: **AC, WA, TLE, MLE, RE, CE**. Thứ tự ưu tiên khi nhiều lỗi cùng xảy ra phải được quy định nhất quán; compile error không chạy test. IOI cho phép partial score theo subtask; ICPC tính accepted/penalty theo luật cuộc thi. Kết quả Demo phải luôn có nhãn Demo, không được hiển thị như kết quả thực.

## Tiêu chí nghiệm thu trước khi bật chấm thật

1. Test mã độc hại vô hại về mặt dữ liệu: vòng lặp vô hạn → TLE; cấp phát vượt quota → MLE; crash → RE; lỗi cú pháp → CE; sai output → WA; đúng output → AC.
2. Test chặn network egress, đọc file host, truy cập environment secret, fork bomb, ghi file quá quota và output vô hạn. Tất cả phải bị cô lập/giới hạn mà không làm ảnh hưởng host hoặc submission khác.
3. Test đồng thời nhiều submissions, duplicate delivery, worker crash/restart, timeout và race condition; một job không thể bị chấm hoặc ghi điểm trái phép.
4. Test hai học viên A/B: A không xem được hidden tests hoặc submissions riêng của B; teacher/admin được truy cập đúng phạm vi quyền; quyền phải được thực thi trên server và bằng RLS thích hợp.
5. Test chấm cùng testcase trên C++/Python, công bố rõ giới hạn thời gian riêng từng ngôn ngữ; kiểm tra tính lặp lại và tài nguyên đo được.
6. Test migration/rollback và quy trình vận hành trên Docker/VPS thử nghiệm trước production; cấu hình trong `.env.example` chỉ chứa tên biến và placeholder, không chứa khóa thật.

**Release gate:** Không tạo worker có phí, không kết nối Supabase production, không merge vào `main` (vì kích hoạt Vercel production) nếu chưa được phê duyệt. Triển khai sau này theo PR nhỏ, có CI và review độc lập.
