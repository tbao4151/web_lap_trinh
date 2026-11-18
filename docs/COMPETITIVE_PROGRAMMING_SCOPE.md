# AlgoAcademy — Phạm vi sản phẩm lập trình thi đấu C++ & Python

**Quyết định của chủ dự án:** 18/11/2026. **Trạng thái:** Phạm vi mục tiêu mới; UI cũ chưa được chuyển đổi toàn bộ.

## 1. Mục tiêu duy nhất

AlgoAcademy là nền tảng học và luyện **lập trình thi đấu (competitive programming)**, chỉ hỗ trợ **C++ và Python** trong curriculum, trình soạn thảo, bài tập, submission, testcases, bộ lọc và báo cáo. **C++ là ngôn ngữ trọng tâm** cho HSG Tin học, Olympic Tin học và ICPC; **Python** hỗ trợ lộ trình tương ứng với giải thích giới hạn về hiệu năng/thời gian. Bắt đầu từ người chưa biết lập trình, đi tới học sinh giỏi và người thi đấu chuyên sâu.

Các môn lập trình C, Java; lập trình web, Git/GitHub, SQL chuyên ngành, mạng, bảo mật, AI và các mảng CNTT tổng quát **không nằm trong phạm vi AlgoAcademy** và sẽ được thực hiện trên website khác. Chỉ đưa kiến thức phụ trợ vào nếu thực sự cần thiết để giải bài lập trình thi đấu; không tạo khóa học độc lập ngoài phạm vi.

## 2. Nhóm học viên và vai trò

- **Học viên:** nhập môn C++/Python, luyện thuật toán, HSG trường/huyện/tỉnh, HSG quốc gia/Olympic Tin học, đội tuyển và ICPC; phân loại theo kỹ năng, không gán một mức trình độ duy nhất cho cả tài khoản.
- **Giảng viên/huấn luyện viên:** soạn bài giảng, tạo bài tập với testcases/subtasks, tổ chức lớp/đội tuyển, giao bài, xem tiến độ và phân tích bài nộp.
- **Quản trị:** quản lý nội dung, vai trò và vận hành an toàn. Quyền thật phải được kiểm tra trên server; Role Switcher cũ chỉ dùng ở chế độ Demo.
- Khách truy cập: khám phá lộ trình, bài giảng/bài tập mở và thi thử theo quy định quyền truy cập.

## 3. Lộ trình học tập và ngân hàng kiến thức

1. Nền tảng C++/Python phục vụ contest: I/O nhanh, kiểu dữ liệu, vòng lặp, hàm, mảng, chuỗi, STL/collections, xử lý lỗi, test, độ phức tạp thời gian và bộ nhớ.
2. Thuật toán cơ sở: sorting, searching, prefix sums, difference array, two pointers, sliding window, binary search on answer, greedy, recursion/backtracking, bit operations.
3. Cấu trúc dữ liệu và thuật toán cốt lõi: stack, queue, hash, heap, set/map, DSU, cây, đồ thị BFS/DFS, shortest paths, minimum spanning tree, dynamic programming, number theory, combinatorics.
4. Nâng cao: Fenwick/segment tree, LCA, binary lifting, tree DP, bitmask DP, string algorithms (KMP, Z, trie), SCC, network flow, advanced graph algorithms, geometry, optimization.
5. Luyện thi: đề HSG chính thống/đề tổng hợp có nguồn, bài theo chủ đề & độ khó, contest có giới hạn thời gian, scoreboard, subtasks/partial scoring và phân tích lời giải.

**Mỗi bài** nên có đề bài, ràng buộc, ví dụ, chủ đề, độ khó, gợi ý tăng dần, lời giải và độ phức tạp (ẩn/hiện theo quyền), starter code C++/Python, sample và hidden tests; phân biệt kiến thức lý thuyết với kết quả chấm thật.

## 4. Thứ tự phát triển kỹ thuật

1. Ưu tiên an toàn: kiểm tra PR mở, đặc biệt PR #43 về `learner_profiles`/RLS; không merge khi chưa có PostgreSQL và JWT/PostgREST verification trong môi trường cô lập. Kiểm toán và xử lý quyền EXECUTE của `public.rls_auto_enable()` với kiểm chứng event trigger.
2. Backend phiên bản hóa theo lát cắt nhỏ: profiles/roles, topics/skills, courses/modules/lessons, problems/testcases/subtasks, enrollments/progress/notes, submissions, classrooms/assignments, contests/leaderboards. Tất cả bảng public phải có RLS, foreign keys, indexes, constraints, policies tối thiểu.
3. Supabase Auth SSR, session và phân quyền server-side. Tách Demo mock/localStorage khỏi dữ liệu thật; không quảng cáo chức năng giả như thật.
4. Chuyển đổi UI/seed/taxonomy/bộ lọc sang **chỉ C++ và Python** qua các PR nhỏ có test. Không xóa ồ ạt C/Java khi còn tham chiếu khiến TypeScript/runtime lỗi; chuyển dữ liệu và UI từng phần, cập nhật test và tài liệu cùng lúc.
5. Coding Lab thật cần Judge Worker cách ly với giới hạn CPU/RAM/thời gian/mạng, queue, hidden tests và verdict AC/WA/TLE/MLE/RE/CE. Không chạy mã học viên trong Next.js/Vercel Functions.
6. Vercel chỉ phục vụ Next.js; PostgreSQL/Supabase và Judge Worker độc lập, portable sang Docker/VPS. Secrets qua environment variables, `.env.example` không chứa khóa thật. Không tự bật hạ tầng có phí, sửa production hoặc thanh toán.

## 5. Tiêu chí cho các lượt triển khai tự động

- Mỗi lượt kiểm tra `main` SHA, branches, PR/CI và tài liệu, không dựa vào lịch sử trò chuyện. Nếu source UI không còn thực chất, dừng và báo `chờ source UI từ Gemini`.
- Mỗi lượt ưu tiên 1–2 thay đổi nhỏ đã được kiểm chứng; tập trung backend an toàn và workflow lập trình thi đấu C++/Python.
- Kiểm tra upstream ngay trước thao tác ghi; tránh xung đột với Gemini và lịch khác; dùng branch riêng và PR, không force push.
- Chạy lint/typecheck/build/tests khi công cụ cho phép, ghi rõ điều chưa chạy; không sửa production hoặc chi phí khi chưa được phép.

## 6. Tính tương thích với tài liệu cũ

`ANTIGRAVITY_UI_BRIEF.md`, `docs/UI_IMPLEMENTATION_STATUS.md` và `docs/UI_DECISIONS.md` là **tư liệu lịch sử của bản UI Demo đa lĩnh vực**. Khi mâu thuẫn về **phạm vi sản phẩm và ngôn ngữ**, **tài liệu này là quyết định mới nhất và được ưu tiên**. Không tự coi những milestone UI cũ là backend đã hoàn thành.

**Tình trạng tại thời điểm chốt:** UI Next.js có 32 routes và dữ liệu giả lập; bản thật chưa có Auth/Judge/CRUD đầy đủ. Mục tiêu mới không có nghĩa mã nguồn hiện tại đã được chuyển đổi.
