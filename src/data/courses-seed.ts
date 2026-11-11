import type { Course, LessonDetail } from '@/types';

export const SEED_COURSES: Course[] = [
  {
    id: 'course-dp',
    slug: 'dp-tu-duy-den-nang-cao',
    title: 'Quy hoạch động từ cơ bản đến nâng cao',
    shortDescription:
      'Xây dựng tư duy thiết kế trạng thái, công thức truy hồi và tối ưu bộ nhớ qua các bài toán kinh điển.',
    description:
      'Khóa học giúp học viên vượt qua rào cản lớn nhất khi học thuật toán: làm sao tự nghĩ ra trạng thái Quy hoạch động (Dynamic Programming) thay vì học thuộc lòng công thức. Mỗi bài học đi kèm bảng mô phỏng từng bước chuyển trạng thái và hệ thống bài tập thực hành trên 4 ngôn ngữ.',
    domainId: 'thuat-toan-hsg',
    level: 'intermediate',
    goals: ['competitive', 'high-school', 'career-cs'],
    languages: ['cpp', 'python', 'java', 'c'],
    tags: ['Quy hoạch động', 'Thuật toán', 'Tối ưu hóa', 'Luyện thi HSG'],
    priceVnd: 750000,
    visibility: 'published',
    estimatedHours: 28,
    updatedAt: '2026-11-05',
    instructorName: 'ThS. Trần Hoàng Nam',
    instructorRole: 'Giảng viên Chuyên Tin & Huấn luyện viên Đội tuyển HSG',
    instructorBio:
      'Hơn 10 năm biên soạn chuyên đề thuật toán và bồi dưỡng học sinh giỏi Tin học cấp tỉnh và quốc gia.',
    prerequisites: [
      'Nắm vững vòng lặp, mảng 1 chiều, mảng 2 chiều và hàm trong ít nhất 1 ngôn ngữ (C/C++/Python/Java).',
      'Hiểu khái niệm độ phức tạp thời gian O(N) và O(N^2).',
    ],
    outcomes: [
      'Phân biệt rõ chiến lược Tham lam (Greedy), Đệ quy có nhớ (Memoization) và Quy hoạch động bảng (Tabulation).',
      'Tự định nghĩa trạng thái dp[...], base case và thứ tự duyệt trạng thái không bị trùng lặp.',
      'Giải quyết trọn vẹn các lớp bài toán: Đổi tiền, Dãy con tăng (LIS), Cái túi 0/1 (Knapsack) và Đường đi trên lưới.',
    ],
    suitableFor: [
      'Học sinh phổ thông ôn thi HSG Tin học cấp trường, tỉnh, quốc gia.',
      'Sinh viên CNTT cần nắm chắc Quy hoạch động cho môn Cấu trúc dữ liệu & Giải thuật.',
    ],
    bannerTone: 'indigo',
    modules: [
      {
        id: 'mod-dp-1',
        title: 'Học phần 1: Bản chất Quy hoạch động & DP một chiều',
        description: 'Làm chủ khái niệm bài toán con gối nhau, cấu trúc con tối ưu và bảng trạng thái 1D.',
        order: 1,
        lessons: [
          {
            id: 'les-dp-intro',
            slug: 'nhap-mon-dp',
            title: 'Nhập môn DP: Bài toán con gối nhau & Cấu trúc con tối ưu',
            order: 1,
            estimatedMinutes: 25,
            isPreview: true,
            primaryType: 'theory',
          },
          {
            id: 'les-dp-coin',
            slug: 'dp-1d-doi-tien',
            title: 'Quy hoạch động một chiều: Bài toán Đổi tiền',
            order: 2,
            estimatedMinutes: 35,
            isPreview: true,
            primaryType: 'interactive',
          },
          {
            id: 'les-dp-lis',
            slug: 'dp-1d-day-con-tang',
            title: 'Dãy con tăng dài nhất (LIS) và cách truy vết nghiệm',
            order: 3,
            estimatedMinutes: 40,
            isPreview: false,
            primaryType: 'practice',
          },
        ],
      },
      {
        id: 'mod-dp-2',
        title: 'Học phần 2: Quy hoạch động hai chiều & Bài toán Cái túi',
        description: 'Mở rộng không gian trạng thái sang bảng 2 chiều và kỹ thuật nén mảng 1 chiều.',
        order: 2,
        lessons: [
          {
            id: 'les-dp-grid',
            slug: 'dp-2d-duong-di-luoi',
            title: 'Quy hoạch động hai chiều trên bảng lưới ô vuông',
            order: 1,
            estimatedMinutes: 35,
            isPreview: false,
            primaryType: 'theory',
          },
          {
            id: 'les-dp-knapsack',
            slug: 'dp-2d-balo',
            title: 'Balo 0/1 (Knapsack) và bài toán chọn tập con tối ưu',
            order: 2,
            estimatedMinutes: 45,
            isPreview: true,
            primaryType: 'interactive',
          },
        ],
      },
    ],
  },
  {
    id: 'course-cpp-zero',
    slug: 'cpp-co-ban',
    title: 'C++ từ con số 0',
    shortDescription:
      'Làm quen lập trình C++ hiện đại từ biến, điều kiện, vòng lặp đến mảng, chuỗi và hàm.',
    description:
      'Khóa học miễn phí thiết kế riêng cho người bắt đầu từ con số 0 hoặc học sinh mới chuyển sang ngôn ngữ C++. Không yêu cầu kiến thức lập trình trước đó, giải thích cặn kẽ cách máy tính lưu trữ và xử lý dữ liệu.',
    domainId: 'lap-trinh',
    level: 'beginner',
    goals: ['zero-to-hero', 'high-school'],
    languages: ['cpp'],
    tags: ['C++20', 'Cơ bản', 'Nhập môn', 'THPT'],
    priceVnd: 0,
    visibility: 'published',
    estimatedHours: 20,
    updatedAt: '2026-11-08',
    instructorName: 'ThS. Trần Hoàng Nam',
    instructorRole: 'Giảng viên Chuyên Tin',
    instructorBio: 'Tác giả bộ tài liệu C++ nền tảng cho học sinh phổ thông và người mới bắt đầu.',
    prerequisites: ['Biết sử dụng máy tính cơ bản, không yêu cầu đã từng học lập trình.'],
    outcomes: [
      'Viết, biên dịch và gỡ lỗi chương trình C++ chuẩn xác.',
      'Sử dụng thành thạo cấu trúc rẽ nhánh, vòng lặp, mảng 1 chiều và chuỗi ký tự.',
      'Hình thành thói quen đặt tên biến, kiểm tra biên và phân tích độ phức tạp bước đầu.',
    ],
    suitableFor: ['Người mới bắt đầu từ số 0.', 'Học sinh THCS/THPT bắt đầu môn Tin học lập trình.'],
    bannerTone: 'teal',
    modules: [
      {
        id: 'mod-cpp-1',
        title: 'Học phần 1: Nhập xuất, Biến và Cấu trúc điều khiển',
        order: 1,
        lessons: [
          {
            id: 'les-cpp-io',
            slug: 'nhap-xuat-va-bien-cpp',
            title: 'Cấu trúc chương trình C++, cin/cout và kiểu dữ liệu',
            order: 1,
            estimatedMinutes: 20,
            isPreview: true,
            primaryType: 'theory',
          },
          {
            id: 'les-cpp-loop',
            slug: 'vong-lap-for-while-cpp',
            title: 'Tư duy vòng lặp for/while và kỹ thuật cộng dồn',
            order: 2,
            estimatedMinutes: 25,
            isPreview: true,
            primaryType: 'practice',
          },
        ],
      },
      {
        id: 'mod-cpp-2',
        title: 'Học phần 2: Mảng một chiều và Chuỗi ký tự',
        order: 2,
        lessons: [
          {
            id: 'les-cpp-array',
            slug: 'mang-mot-chieu',
            title: 'Mảng một chiều và các mẫu duyệt phần tử kinh điển',
            order: 1,
            estimatedMinutes: 30,
            isPreview: true,
            primaryType: 'interactive',
          },
          {
            id: 'les-cpp-string',
            slug: 'chuoi-ky-tu-std-string',
            title: 'Xử lý chuỗi với std::string trong C++',
            order: 2,
            estimatedMinutes: 25,
            isPreview: false,
            primaryType: 'theory',
          },
        ],
      },
    ],
  },
  {
    id: 'course-c-foundation',
    slug: 'c-nen-tang',
    title: 'Lập trình C nền tảng',
    shortDescription:
      'Hiểu sâu bản chất bộ nhớ, địa chỉ, con trỏ, mảng tĩnh và cấp phát động trong ngôn ngữ C.',
    description:
      'Ngôn ngữ C giúp người học nhìn thấy rõ cách chương trình tương tác với bộ nhớ RAM. Khóa học đi từ cú pháp chuẩn C17 đến con trỏ, struct và quản lý bộ nhớ an toàn.',
    domainId: 'lap-trinh',
    level: 'beginner',
    goals: ['zero-to-hero', 'career-cs'],
    languages: ['c'],
    tags: ['Ngôn ngữ C', 'Con trỏ', 'Bộ nhớ', 'Nhập môn Đại học'],
    priceVnd: 0,
    visibility: 'published',
    estimatedHours: 18,
    updatedAt: '2026-10-29',
    instructorName: 'KS. Phạm Quốc Bảo',
    instructorRole: 'Kỹ sư Hệ thống Nhúng & Giảng viên C',
    instructorBio: 'Chuyên gia lập trình hệ thống và giảng dạy môn Nhập môn lập trình bậc đại học.',
    prerequisites: ['Không yêu cầu kinh nghiệm lập trình trước.'],
    outcomes: [
      'Sử dụng thành thạo printf/scanf, kiểu dữ liệu nguyên và dấu chấm động.',
      'Hiểu bản chất địa chỉ ô nhớ, con trỏ và truyền tham chiếu qua địa chỉ.',
      'Tránh các lỗi tràn mảng và rò rỉ bộ nhớ thường gặp.',
    ],
    suitableFor: ['Sinh viên năm nhất CNTT/Kỹ thuật.', 'Người muốn hiểu gốc rễ hoạt động của máy tính.'],
    bannerTone: 'slate',
    modules: [
      {
        id: 'mod-c-1',
        title: 'Học phần 1: Cú pháp C17 và Mảng cơ bản',
        order: 1,
        lessons: [
          {
            id: 'les-c-intro',
            slug: 'nhap-xuat-printf-scanf',
            title: 'Định dạng nhập xuất với printf và scanf an toàn',
            order: 1,
            estimatedMinutes: 20,
            isPreview: true,
            primaryType: 'theory',
          },
          {
            id: 'les-c-pointer',
            slug: 'con-tro-va-bo-nho',
            title: 'Con trỏ và cấp phát bộ nhớ trong C',
            order: 2,
            estimatedMinutes: 35,
            isPreview: true,
            primaryType: 'interactive',
          },
        ],
      },
    ],
  },
  {
    id: 'course-python-app',
    slug: 'python-ung-dung',
    title: 'Python từ cơ bản đến ứng dụng',
    shortDescription:
      'Nắm vững Python 3, cấu trúc dữ liệu list/dict/set, xử lý dữ liệu và giải thuật thực tế.',
    description:
      'Python là ngôn ngữ sáng sủa, hiện đại và nằm trong chương trình Tin học THPT mới cũng như công việc thực tế. Khóa học kết hợp cả hai chiều: giải bài toán thuật toán bằng Python và viết script xử lý dữ liệu sạch sẽ.',
    domainId: 'lap-trinh',
    level: 'intermediate',
    goals: ['high-school', 'zero-to-hero', 'career-cs'],
    languages: ['python'],
    tags: ['Python 3', 'Cấu trúc dữ liệu', 'Tin học THPT', 'Tự động hóa'],
    priceVnd: 590000,
    visibility: 'published',
    estimatedHours: 24,
    updatedAt: '2026-11-01',
    instructorName: 'ThS. Vũ Minh Châu',
    instructorRole: 'Giảng viên Khoa học dữ liệu & Python',
    instructorBio: 'Giảng viên đào tạo Python cho học sinh THPT và sinh viên khối kỹ thuật.',
    prerequisites: ['Biết thao tác máy tính cơ bản; phù hợp cả người mới học lần đầu.'],
    outcomes: [
      'Viết mã Python chuẩn PEP8, tận dụng list comprehension và cấu trúc dữ liệu dựng sẵn.',
      'Giải các bài toán mảng, chuỗi, tần suất bằng dict và set với độ phức tạp tối ưu.',
      'Tổ chức module, đọc/ghi file và xử lý ngoại lệ.',
    ],
    suitableFor: [
      'Học sinh THPT học chương trình Tin học Python.',
      'Sinh viên và người đi làm muốn học Python bài bản.',
    ],
    bannerTone: 'emerald',
    modules: [
      {
        id: 'mod-py-1',
        title: 'Học phần 1: Cốt lõi Python 3 & Cấu trúc dữ liệu',
        order: 1,
        lessons: [
          {
            id: 'les-py-list',
            slug: 'list-tuple-dict-python',
            title: 'Làm chủ List, Tuple, Set và Dictionary trong Python',
            order: 1,
            estimatedMinutes: 30,
            isPreview: true,
            primaryType: 'theory',
          },
          {
            id: 'les-py-algo',
            slug: 'toi-uu-toc-do-python',
            title: 'Kỹ thuật tối ưu tốc độ thực thi khi giải thuật bằng Python',
            order: 2,
            estimatedMinutes: 25,
            isPreview: false,
            primaryType: 'practice',
          },
        ],
      },
    ],
  },
  {
    id: 'course-java-oop',
    slug: 'java-oop',
    title: 'Java và lập trình hướng đối tượng',
    shortDescription:
      'Thiết kế lớp, đóng gói, kế thừa, đa hình, Collections Framework và xử lý ngoại lệ trong Java 21.',
    description:
      'Khóa học tập trung vào tư duy Hướng đối tượng (OOP) thực chất thông qua ngôn ngữ Java: cách chia tách trách nhiệm giữa các lớp, thiết kế interface rõ ràng và sử dụng Java Collections hiệu quả.',
    domainId: 'lap-trinh',
    level: 'intermediate',
    goals: ['career-cs', 'high-school'],
    languages: ['java'],
    tags: ['Java 21', 'OOP', 'Collections', 'Thiết kế phần mềm'],
    priceVnd: 690000,
    visibility: 'published',
    estimatedHours: 26,
    updatedAt: '2026-10-25',
    instructorName: 'KS. Đặng Tuấn Kiệt',
    instructorRole: 'Kỹ sư Phần mềm Senior (Java/Backend)',
    instructorBio: '8 năm phát triển hệ thống phần mềm doanh nghiệp và hướng dẫn sinh viên CNTT.',
    prerequisites: ['Đã biết biến, vòng lặp và hàm ở bất kỳ ngôn ngữ nào (C, C++, Python hoặc Java).'],
    outcomes: [
      'Hiểu và áp dụng đúng 4 tính chất OOP: Đóng gói, Kế thừa, Đa hình, Trừu tượng.',
      'Chọn đúng cấu trúc ArrayList, HashMap, TreeSet theo yêu cầu độ phức tạp.',
      'Viết mã Java sạch, dễ bảo trì và kiểm thử.',
    ],
    suitableFor: ['Sinh viên CNTT học môn Lập trình hướng đối tượng.', 'Người đã biết C/C++ muốn chuyển sang Java.'],
    bannerTone: 'amber',
    modules: [
      {
        id: 'mod-java-1',
        title: 'Học phần 1: Tư duy Class, Object và Collections',
        order: 1,
        lessons: [
          {
            id: 'les-java-class',
            slug: 'class-object-encapsulation',
            title: 'Thiết kế Class, Constructor và tính Đóng gói (Encapsulation)',
            order: 1,
            estimatedMinutes: 30,
            isPreview: true,
            primaryType: 'theory',
          },
          {
            id: 'les-java-collections',
            slug: 'java-collections-framework',
            title: 'ArrayList, HashMap và so sánh hiệu năng trong Java',
            order: 2,
            estimatedMinutes: 35,
            isPreview: false,
            primaryType: 'practice',
          },
        ],
      },
    ],
  },
  {
    id: 'course-hsg-cpp',
    slug: 'thuat-toan-hsg-cpp',
    title: 'Thuật toán C++ luyện thi HSG',
    shortDescription:
      'Chuyên đề Tìm kiếm nhị phân, Mảng cộng dồn, Hai con trỏ, Số học và Đồ thị cho kỳ thi HSG Tin học.',
    description:
      'Hệ thống hóa các kỹ thuật thiết yếu trong kỳ thi Học sinh giỏi Tin học cấp Tỉnh và Quốc gia. Chú trọng phân tích giới hạn đề bài (Subtasks), lựa chọn thuật toán theo ràng buộc N và tránh các bẫy tràn số, quá thời gian.',
    domainId: 'thuat-toan-hsg',
    level: 'competition',
    goals: ['competitive', 'high-school'],
    languages: ['cpp', 'python', 'java'],
    tags: ['Luyện thi HSG', 'Tìm kiếm nhị phân', 'Prefix Sum', 'Số học'],
    priceVnd: 890000,
    visibility: 'published',
    estimatedHours: 36,
    updatedAt: '2026-11-09',
    instructorName: 'ThS. Trần Hoàng Nam',
    instructorRole: 'Giảng viên Chuyên Tin & Huấn luyện viên Đội tuyển HSG',
    instructorBio: 'Huấn luyện viên đội tuyển HSG Tin học với phương pháp phân tích Subtask trực quan.',
    prerequisites: ['Sử dụng thành thạo mảng, hàm và độ phức tạp cơ bản trong C++ hoặc Python.'],
    outcomes: [
      'Nhận diện nhanh dạng bài từ giới hạn N <= 10^5, 10^6 và thiết kế thuật toán O(N log N).',
      'Thành thạo Tìm kiếm nhị phân trên mảng và Tìm kiếm nhị phân trên kết quả.',
      'Vận dụng Prefix Sum 1D/2D và Sàng nguyên tố Eratosthenes không bị tràn bộ nhớ.',
    ],
    suitableFor: ['Học sinh đội tuyển HSG Tin học THCS/THPT.', 'Thí sinh ôn luyện Olympic Tin học Sinh viên.'],
    bannerTone: 'violet',
    modules: [
      {
        id: 'mod-hsg-1',
        title: 'Học phần 1: Mảng cộng dồn, Hai con trỏ và Tìm kiếm nhị phân',
        order: 1,
        lessons: [
          {
            id: 'les-hsg-prefix',
            slug: 'mang-cong-don-prefix-sum',
            title: 'Kỹ thuật Mảng cộng dồn (Prefix Sum) 1 chiều và 2 chiều',
            order: 1,
            estimatedMinutes: 30,
            isPreview: true,
            primaryType: 'theory',
          },
          {
            id: 'les-hsg-bsearch',
            slug: 'tim-kiem-nhi-phan',
            title: 'Tìm kiếm nhị phân trên mảng sắp xếp và trên kết quả',
            order: 2,
            estimatedMinutes: 40,
            isPreview: true,
            primaryType: 'interactive',
          },
        ],
      },
    ],
  },
  {
    id: 'course-git',
    slug: 'git-github-thuc-hanh',
    title: 'Git và GitHub thực hành',
    shortDescription:
      'Quản lý phiên bản mã nguồn, làm việc nhóm với Branch, Pull Request và giải quyết xung đột (Conflict).',
    description:
      'Môn học thuộc lĩnh vực Công nghệ phần mềm, không yêu cầu trình chấm code tự động mà tập trung vào tư duy quản lý lịch sử mã nguồn, quy trình nhánh và cộng tác trên GitHub.',
    domainId: 'cong-nghe-phan-mem',
    level: 'beginner',
    goals: ['career-cs', 'zero-to-hero'],
    languages: ['cpp', 'python', 'java', 'c'],
    tags: ['Git', 'GitHub', 'Làm việc nhóm', 'Kỹ năng phần mềm'],
    priceVnd: 0,
    visibility: 'published',
    estimatedHours: 10,
    updatedAt: '2026-10-20',
    instructorName: 'KS. Đặng Tuấn Kiệt',
    instructorRole: 'Kỹ sư Phần mềm Senior',
    instructorBio: 'Hướng dẫn quy trình Git chuẩn công nghiệp cho sinh viên và lập trình viên mới.',
    prerequisites: ['Biết mở Terminal hoặc Command Prompt cơ bản.'],
    outcomes: [
      'Hiểu mô hình Working Tree, Staging Area và Commit History của Git.',
      'Tạo nhánh, gộp nhánh và xử lý Merge Conflict bình tĩnh, chính xác.',
      'Tạo Pull Request và đọc hiểu lịch sử dự án.',
    ],
    suitableFor: ['Mọi học viên lập trình muốn lưu trữ dự án khoa học.', 'Sinh viên làm bài tập lớn theo nhóm.'],
    bannerTone: 'slate',
    modules: [
      {
        id: 'mod-git-1',
        title: 'Học phần 1: Commit, Branch và Cộng tác trên GitHub',
        order: 1,
        lessons: [
          {
            id: 'les-git-branch',
            slug: 'git-branch-merge',
            title: 'Nhánh (Branch), Gộp nhánh (Merge) và xử lý xung đột',
            order: 1,
            estimatedMinutes: 25,
            isPreview: true,
            primaryType: 'theory',
          },
        ],
      },
    ],
  },
  {
    id: 'course-sql',
    slug: 'sql-nen-tang',
    title: 'SQL cơ bản và Tư duy Truy vấn dữ liệu',
    shortDescription:
      'Thiết kế bảng quan hệ, truy vấn SELECT, JOIN, GROUP BY và tối ưu chỉ mục cơ bản.',
    description:
      'Khóa học thuộc nhóm CNTT mở rộng giúp học viên nắm vững ngôn ngữ truy vấn có cấu trúc SQL, hiểu cách tổ chức dữ liệu không dư thừa và viết truy vấn thống kê chính xác.',
    domainId: 'cntt-mo-rong',
    level: 'beginner',
    goals: ['career-cs', 'high-school'],
    languages: ['python', 'java'],
    tags: ['SQL', 'Cơ sở dữ liệu', 'Truy vấn', 'Data'],
    priceVnd: 450000,
    visibility: 'published',
    estimatedHours: 16,
    updatedAt: '2026-10-18',
    instructorName: 'ThS. Vũ Minh Châu',
    instructorRole: 'Giảng viên Khoa học dữ liệu',
    instructorBio: 'Chuyên gia phân tích dữ liệu và thiết kế cơ sở dữ liệu quan hệ.',
    prerequisites: ['Không yêu cầu biết ngôn ngữ lập trình trước đó.'],
    outcomes: [
      'Hiểu mô hình bảng, khóa chính (Primary Key) và khóa ngoại (Foreign Key).',
      'Viết truy vấn lọc, kết nối nhiều bảng (INNER/LEFT JOIN) và gom nhóm GROUP BY / HAVING.',
    ],
    suitableFor: ['Học sinh THPT phần Tin học ứng dụng.', 'Sinh viên CNTT và người làm dữ liệu.'],
    bannerTone: 'emerald',
    modules: [
      {
        id: 'mod-sql-1',
        title: 'Học phần 1: Truy vấn SELECT, JOIN và Gom nhóm dữ liệu',
        order: 1,
        lessons: [
          {
            id: 'les-sql-select',
            slug: 'truy-van-select-join-co-ban',
            title: 'Thứ tự thực thi câu lệnh SQL: từ FROM, JOIN đến GROUP BY',
            order: 1,
            estimatedMinutes: 30,
            isPreview: true,
            primaryType: 'theory',
          },
        ],
      },
    ],
  },
];

export const SEED_LESSONS_BY_SLUG: Record<string, LessonDetail> = {
  'dp-1d-doi-tien': {
    id: 'les-dp-coin',
    slug: 'dp-1d-doi-tien',
    courseId: 'course-dp',
    courseSlug: 'dp-tu-duy-den-nang-cao',
    moduleId: 'mod-dp-1',
    title: 'Quy hoạch động một chiều: Bài toán Đổi tiền',
    order: 2,
    estimatedMinutes: 35,
    isPreview: true,
    primaryType: 'interactive',
    objectives: [
      'Hiểu vì sao chiến lược Tham lam (chọn mệnh giá lớn nhất trước) thất bại với bộ xu [1, 3, 4] khi cần đổi tổng S = 6.',
      'Xây dựng mảng trạng thái dp[s] là số đồng xu ít nhất để tạo ra tổng s, với trạng thái cơ sở dp[0] = 0.',
      'Nắm vững công thức chuyển trạng thái dp[s] = min(dp[s], dp[s - coin] + 1) và lý do phải kiểm tra dp[s - coin] != INF trước khi cộng 1.',
    ],
    conceptIds: ['concept-dp-1d', 'concept-optimal-substructure'],
    relatedProblemSlugs: ['doi-tien-it-nhat', 'leo-cau-thang', 'balo-0-1'],
    blocks: [
      {
        id: 'blk-dp-coin-1',
        type: 'richText',
        order: 1,
        data: {
          heading: '1. Phát biểu bài toán và phản ví dụ của Tham lam (Greedy)',
          paragraphs: [
            'Cho tập gồm N mệnh giá đồng xu dương c_1, c_2, ..., c_N (mỗi mệnh giá có số lượng không giới hạn) và một số nguyên dương S. Hãy tìm số lượng đồng xu ít nhất để tổng giá trị của chúng đúng bằng S.',
            'Khi mới tiếp cận, nhiều học viên thường áp dụng cách Tham lam: luôn chọn đồng xu có mệnh giá lớn nhất không vượt quá phần tiền còn lại. Tuy nhiên, với bộ mệnh giá [1, 3, 4] và tổng S = 6: cách tham lam sẽ chọn 4 + 1 + 1 (tốn 3 đồng xu), trong khi phương án tối ưu là 3 + 3 (chỉ tốn 2 đồng xu).',
          ],
          bulletPoints: [
            'Trạng thái dp[s]: số lượng đồng xu ít nhất để tạo được tổng đúng bằng s (với 0 <= s <= S).',
            'Trạng thái cơ sở (Base case): dp[0] = 0 (cần 0 đồng xu để tạo tổng bằng 0).',
            'Khởi tạo: dp[s] = INF (vô cùng) với mọi 1 <= s <= S để biểu diễn trạng thái chưa thể tạo được.',
          ],
          formulaLatex: 'dp[s] = \\min_{coin \\le s,\\; dp[s - coin] \\neq \\infty} (dp[s - coin] + 1)',
          formulaCaption: 'Công thức truy hồi quy hoạch động một chiều cho bài toán Đổi tiền',
        },
      },
      {
        id: 'blk-dp-coin-2',
        type: 'callout',
        order: 2,
        data: {
          variant: 'mistake',
          title: 'Sai lầm phổ biến: Cộng 1 trực tiếp vào INF gây tràn số hoặc nhận trạng thái giả',
          content:
            'Nếu bạn khởi tạo INF = INT_MAX trong C/C++ hoặc Java rồi viết trực tiếp min(dp[s], dp[s - coin] + 1) mà không kiểm tra dp[s - coin] != INF, biểu thức dp[s - coin] + 1 sẽ bị tràn số nguyên thành số âm! Ngay cả khi dùng INF = 1e9, bạn vẫn nên kiểm tra rõ điều kiện dp[s - coin] != INF để chỉ chuyển từ những tổng s - coin thực sự đổi được.',
        },
      },
      {
        id: 'blk-dp-coin-3',
        type: 'interactive',
        order: 3,
        data: {
          widgetType: 'dp-coin-change',
          title: 'Mô phỏng từng bước bảng trạng thái Quy hoạch động Đổi tiền',
          description:
            'Sử dụng nút Bước tiếp / Bước lùi hoặc chọn bộ mệnh giá mẫu để quan sát cách bảng dp[0..S] được cập nhật từ trạng thái cơ sở dp[0] = 0.',
          presets: [
            {
              id: 'preset-134-6',
              label: 'Ví dụ chuẩn: Xu [1, 3, 4], Tổng S = 6',
              coins: [1, 3, 4],
              target: 6,
              note: 'Minh họa dp[6] đạt 2 xu (3 + 3) thay vì 3 xu (4 + 1 + 1) của thuật toán tham lam.',
            },
            {
              id: 'preset-25-7',
              label: 'Trạng thái INF: Xu [2, 5], Tổng S = 7',
              coins: [2, 5],
              target: 7,
              note: 'Minh họa các tổng lẻ s = 1, 3 giữ nguyên INF và vì sao không được lấy INF + 1.',
            },
            {
              id: 'preset-125-8',
              label: 'Hệ tiền tệ chuẩn: Xu [1, 2, 5], Tổng S = 8',
              coins: [1, 2, 5],
              target: 8,
              note: 'Minh họa chuỗi truy vết nghiệm từ dp[8] = 3 (5 + 2 + 1).',
            },
          ],
        },
      },
      {
        id: 'blk-dp-coin-4',
        type: 'image',
        order: 4,
        data: {
          diagramType: 'dp-dag',
          alt: 'Sơ đồ cung chuyển trạng thái tới dp[6] từ dp[5], dp[3] và dp[2]',
          caption:
            'Hình 1: Đồ thị có hướng không chu trình (DAG) của các trạng thái con khi tính dp[6] với bộ xu [1, 3, 4]. Trạng thái dp[6] chọn nhánh tốt nhất từ dp[6 - 3] = dp[3] = 1.',
        },
      },
      {
        id: 'blk-dp-coin-5',
        type: 'code',
        order: 5,
        data: {
          title: 'Cài đặt chuẩn bài toán Đổi tiền ít nhất (4 ngôn ngữ)',
          defaultLanguage: 'cpp',
          sampleInput: '3 6\n1 3 4',
          expectedOutput: '2',
          complexityNote: 'Độ phức tạp thời gian: O(N * S) | Độ phức tạp bộ nhớ: O(S)',
          snippets: {
            cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int INF = 1e9;

int main() {
    int n = 3, S = 6;
    vector<int> coins = {1, 3, 4};

    vector<int> dp(S + 1, INF);
    dp[0] = 0; // Base case: tổng 0 cần 0 đồng xu

    for (int s = 1; s <= S; ++s) {
        for (int coin : coins) {
            if (s >= coin && dp[s - coin] != INF) {
                dp[s] = min(dp[s], dp[s - coin] + 1);
            }
        }
    }

    if (dp[S] == INF) cout << -1 << "\\n";
    else cout << dp[S] << "\\n"; // Kết quả: 2 (gồm 3 + 3)
    return 0;
}`,
            c: `#include <stdio.h>

#define INF 1000000000

int main(void) {
    int coins[3] = {1, 3, 4};
    int n = 3, S = 6;
    int dp[7];

    dp[0] = 0;
    for (int s = 1; s <= S; ++s) dp[s] = INF;

    for (int s = 1; s <= S; ++s) {
        for (int i = 0; i < n; ++i) {
            int coin = coins[i];
            if (s >= coin && dp[s - coin] != INF) {
                if (dp[s - coin] + 1 < dp[s]) {
                    dp[s] = dp[s - coin] + 1;
                }
            }
        }
    }

    printf("%d\\n", dp[S] == INF ? -1 : dp[S]);
    return 0;
}`,
            python: `INF = 10**9

def min_coins(coins: list[int], target: int) -> int:
    dp = [INF] * (target + 1)
    dp[0] = 0  # Base case

    for s in range(1, target + 1):
        for coin in coins:
            if s >= coin and dp[s - coin] != INF:
                dp[s] = min(dp[s], dp[s - coin] + 1)

    return -1 if dp[target] == INF else dp[target]

if __name__ == "__main__":
    print(min_coins([1, 3, 4], 6))  # Kết quả: 2`,
            java: `import java.util.Arrays;

public class Main {
    static final int INF = 1_000_000_000;

    public static void main(String[] args) {
        int[] coins = {1, 3, 4};
        int S = 6;
        int[] dp = new int[S + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;

        for (int s = 1; s <= S; s++) {
            for (int coin : coins) {
                if (s >= coin && dp[s - coin] != INF) {
                    dp[s] = Math.min(dp[s], dp[s - coin] + 1);
                }
            }
        }

        System.out.println(dp[S] == INF ? -1 : dp[S]);
    }
}`,
          },
        },
      },
      {
        id: 'blk-dp-coin-6',
        type: 'slide',
        order: 6,
        data: {
          deckTitle: 'Tóm tắt 4 bước thiết kế Quy hoạch động 1 chiều',
          slides: [
            {
              title: 'Bước 1: Định nghĩa trạng thái rõ ràng bằng lời',
              subtitle: 'Đừng vội viết code khi chưa trả lời được dp[i] đại diện cho đại lượng gì',
              bullets: [
                'Trong bài Đổi tiền: dp[s] là số đồng xu tối thiểu để tạo ra đúng tổng s.',
                'Mỗi chỉ số s là một bài toán con hoàn chỉnh, độc lập với cách đạt tới nó.',
              ],
              highlightFormula: 'dp[s] = số xu ít nhất tạo tổng s',
            },
            {
              title: 'Bước 2: Xác định Base Case và Giá trị khởi tạo',
              subtitle: 'Điểm neo để quá trình quy nạp bắt đầu chính xác',
              bullets: [
                'dp[0] = 0 vì tổng bằng 0 không cần đồng xu nào.',
                'Các trạng thái s > 0 khởi tạo bằng INF (chưa tìm được phương án).',
              ],
              highlightFormula: 'dp[0] = 0, dp[1..S] = INF',
            },
            {
              title: 'Bước 3: Chuyển trạng thái an toàn',
              subtitle: 'Thử từng quyết định cuối cùng và kiểm tra điều kiện hợp lệ',
              bullets: [
                'Nếu đồng xu cuối cùng chọn là coin thì trước đó ta cần tạo tổng s - coin.',
                'Chỉ chuyển khi s >= coin và dp[s - coin] != INF.',
              ],
              highlightFormula: 'if (s >= coin && dp[s - coin] != INF) dp[s] = min(dp[s], dp[s - coin] + 1)',
            },
          ],
        },
      },
      {
        id: 'blk-dp-coin-7',
        type: 'video',
        order: 7,
        data: {
          title: 'Video bài giảng minh họa: Phân tích cây quyết định và bảng DP Đổi tiền',
          durationLabel: '14:20',
          summary:
            'Khu vực trình phát video đang ở chế độ mô phỏng giao diện (chưa kết nối dịch vụ streaming). Bạn có thể xem đề cương chi tiết từng phân đoạn bên dưới.',
          transcriptOutline: [
            '00:00 - 03:15: Phản ví dụ [1, 3, 4] với tổng 6 khiến thuật toán Tham lam trả về 3 xu thay vì 2 xu.',
            '03:15 - 08:40: Cách rút gọn cây đệ quy có các nút trùng lặp thành mảng 1 chiều dp[0..S].',
            '08:40 - 14:20: Phân tích lỗi tràn số khi dùng INT_MAX + 1 và cách truy vết các đồng xu đã chọn.',
          ],
        },
      },
      {
        id: 'blk-dp-coin-8',
        type: 'quiz',
        order: 8,
        data: {
          question:
            'Giả sử bộ đồng xu chỉ gồm [2, 4] và cần tính bảng dp[0..5] với khởi tạo INF. Tại bước tính s = 3, giá trị của dp[3] sau khi xét cả hai đồng xu 2 và 4 là bao nhiêu?',
          conceptTag: 'Kiểm tra trạng thái bất khả thi (INF)',
          correctOptionId: 'opt-b',
          options: [
            {
              id: 'opt-a',
              text: 'dp[3] = 2 vì lấy dp[3 - 2] + 1 = dp[1] + 1.',
              explanation:
                'Chưa chính xác. Vì không thể tạo tổng 1 từ các đồng xu chẵn [2, 4], nên dp[1] đang bằng INF. Ta không được lấy INF + 1.',
            },
            {
              id: 'opt-b',
              text: 'dp[3] giữ nguyên là INF vì s = 3 chỉ lùi về được s - 2 = 1 mà dp[1] = INF (và đồng xu 4 thì lớn hơn 3).',
              explanation:
                'Chính xác! Khi xét coin = 2, trạng thái trước đó là dp[1] = INF nên điều kiện dp[s - coin] != INF chặn lại. Khi xét coin = 4 thì s < coin. Do đó dp[3] vẫn là INF.',
            },
            {
              id: 'opt-c',
              text: 'dp[3] = -1 ngay trong quá trình tính vòng lặp.',
              explanation:
                'Chưa chính xác. Trong bảng quy hoạch động ta giữ giá trị INF để thuận tiện dùng hàm min(), và chỉ đổi sang -1 ở bước in kết quả cuối cùng.',
            },
          ],
        },
      },
      {
        id: 'blk-dp-coin-9',
        type: 'problemReference',
        order: 9,
        data: {
          problemSlug: 'doi-tien-it-nhat',
          promptNote:
            'Áp dụng ngay công thức vừa học vào bài tập chuẩn P009 trong Coding Lab (hỗ trợ C, C++, Python, Java).',
        },
      },
      {
        id: 'blk-dp-coin-10',
        type: 'teacherNote',
        order: 10,
        data: {
          pedagogyGoal:
            'Giúp học sinh tự phát hiện lỗi tràn số khi viết dp[s - coin] + 1 trước khi giảng viên đưa ra quy ước INF = 1e9.',
          commonStudentQuestions: [
            'Vì sao không khởi tạo dp[0] = 1? (Cần phân biệt bài toán Đếm số cách đổi tiền và bài toán Tìm số đồng xu ít nhất).',
            'Đổi thứ tự 2 vòng lặp (duyệt coin ở ngoài, duyệt s ở trong) có làm thay đổi kết quả bài tìm min số xu không? (Không đổi với bài tìm min số xu không giới hạn số lượng, nhưng sẽ khác ở bài Đếm số cách tổ hợp vs chỉnh hợp).',
          ],
          classroomTimingNote:
            'Dành 10 phút đầu cho học sinh thử bằng tay với bộ xu [1, 3, 4] và tổng 6 trên bảng trước khi mở DP Visualizer.',
        },
      },
    ],
  },
  'nhap-mon-dp': {
    id: 'les-dp-intro',
    slug: 'nhap-mon-dp',
    courseId: 'course-dp',
    courseSlug: 'dp-tu-duy-den-nang-cao',
    moduleId: 'mod-dp-1',
    title: 'Nhập môn DP: Bài toán con gối nhau & Cấu trúc con tối ưu',
    order: 1,
    estimatedMinutes: 25,
    isPreview: true,
    primaryType: 'theory',
    objectives: [
      'Hiểu hai tính chất cốt lõi của Quy hoạch động: Bài toán con gối nhau (Overlapping Subproblems) và Cấu trúc con tối ưu (Optimal Substructure).',
      'So sánh Đệ quy có nhớ (Top-Down Memoization) và Quy hoạch động lập bảng (Bottom-Up Tabulation).',
    ],
    conceptIds: ['concept-dp-1d'],
    relatedProblemSlugs: ['leo-cau-thang', 'doi-tien-it-nhat'],
    blocks: [
      {
        id: 'blk-dp-intro-1',
        type: 'richText',
        order: 1,
        data: {
          heading: '1. Khi nào một bài toán giải được bằng Quy hoạch động?',
          paragraphs: [
            'Quy hoạch động (Dynamic Programming - DP) là phương pháp giải bài toán bằng cách chia nhỏ thành các bài toán con cùng dạng, lưu lại kết quả của mỗi bài toán con một lần duy nhất trong bảng bộ nhớ để tái sử dụng.',
            'Khác với Chia để trị (như Merge Sort chia mảng thành 2 nửa hoàn toàn rời nhau), trong Quy hoạch động các bài toán con xuất hiện lặp đi lặp lại rất nhiều lần.',
          ],
          bulletPoints: [
            'Bài toán con gối nhau: Khi tính f(n) theo đệ quy thuần túy, f(n-2), f(n-3) bị gọi lại hàng triệu lần.',
            'Cấu trúc con tối ưu: Nghiệm tối ưu của bài toán lớn có thể ghép trực tiếp từ nghiệm tối ưu của các bài toán con.',
          ],
        },
      },
      {
        id: 'blk-dp-intro-2',
        type: 'code',
        order: 2,
        data: {
          title: 'Bài toán Leo cầu thang: từ O(2^N) xuống O(N)',
          defaultLanguage: 'cpp',
          sampleInput: '5',
          expectedOutput: '8',
          complexityNote: 'Độ phức tạp thời gian: O(N) | Bộ nhớ: O(N)',
          snippets: {
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 5;
    vector<long long> dp(n + 1, 0);
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    cout << dp[n] << "\\n";
    return 0;
}`,
            python: `def climb_stairs(n: int) -> int:
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

print(climb_stairs(5))`,
            java: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        long[] dp = new long[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        System.out.println(dp[n]);
    }
}`,
            c: `#include <stdio.h>

int main(void) {
    int n = 5;
    long long dp[6] = {0};
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    printf("%lld\\n", dp[n]);
    return 0;
}`,
          },
        },
      },
      {
        id: 'blk-dp-intro-3',
        type: 'quiz',
        order: 3,
        data: {
          question: 'Điểm khác biệt quan trọng nhất giữa Chia để trị (Divide & Conquer) và Quy hoạch động là gì?',
          conceptTag: 'Bản chất Quy hoạch động',
          correctOptionId: 'opt-2',
          options: [
            {
              id: 'opt-1',
              text: 'Quy hoạch động chỉ dùng được cho bài toán tìm giá trị lớn nhất.',
              explanation: 'Chưa đúng. Quy hoạch động còn giải được bài toán tìm nhỏ nhất, đếm số cách, kiểm tra tính khả thi.',
            },
            {
              id: 'opt-2',
              text: 'Các bài toán con của Quy hoạch động gối lên nhau (trùng lặp) nên cần lưu trữ kết quả để không tính lại.',
              explanation: 'Chính xác! Nhờ lưu kết quả các bài toán con trùng nhau vào bảng, độ phức tạp giảm từ hàm mũ xuống đa thức.',
            },
          ],
        },
      },
      {
        id: 'blk-dp-intro-4',
        type: 'problemReference',
        order: 4,
        data: {
          problemSlug: 'leo-cau-thang',
          promptNote: 'Thực hành bài tập P010: Đếm số cách leo cầu thang để kiểm chứng công thức truy hồi.',
        },
      },
    ],
  },
  'dp-2d-balo': {
    id: 'les-dp-knapsack',
    slug: 'dp-2d-balo',
    courseId: 'course-dp',
    courseSlug: 'dp-tu-duy-den-nang-cao',
    moduleId: 'mod-dp-2',
    title: 'Balo 0/1 (Knapsack) và bài toán chọn tập con tối ưu',
    order: 2,
    estimatedMinutes: 45,
    isPreview: true,
    primaryType: 'interactive',
    objectives: [
      'Hiểu vì sao trạng thái bài toán Cái túi 0/1 cần 2 thông số: chỉ số đồ vật i và sức chứa còn lại w.',
      'Biết cách tối ưu bộ nhớ từ mảng 2 chiều dp[N+1][W+1] xuống mảng 1 chiều dp[W+1] bằng cách duyệt w giảm dần.',
    ],
    conceptIds: ['concept-dp-2d'],
    relatedProblemSlugs: ['balo-0-1', 'doi-tien-it-nhat'],
    blocks: [
      {
        id: 'blk-knap-1',
        type: 'richText',
        order: 1,
        data: {
          heading: '1. Trạng thái hai chiều của bài toán Balo 0/1',
          paragraphs: [
            'Khác với bài Đổi tiền (mỗi mệnh giá được lấy vô hạn lần), trong bài toán Balo 0/1 mỗi đồ vật thứ i (nặng w_i, giá trị v_i) chỉ được chọn tối đa 1 lần (0: không chọn, 1: chọn).',
            'Gọi dp[i][w] là tổng giá trị lớn nhất đạt được khi xét trong i đồ vật đầu tiên với giới hạn trọng lượng túi không vượt quá w.',
          ],
          formulaLatex: 'dp[i][w] = \\max(dp[i-1][w],\\; dp[i-1][w - w_i] + v_i)',
          formulaCaption: 'Công thức chuyển trạng thái giữa quyết định Không chọn và Chọn đồ vật thứ i',
        },
      },
      {
        id: 'blk-knap-2',
        type: 'callout',
        order: 2,
        data: {
          variant: 'tip',
          title: 'Quy tắc vàng khi nén xuống mảng 1 chiều dp[w]',
          content:
            'Khi rút gọn thành mảng 1 chiều dp[w], vòng lặp trọng lượng w bắt buộc phải duyệt lùi từ W về w_i để đảm bảo dp[w - w_i] vẫn là giá trị của hàng i - 1 (mỗi đồ vật chỉ dùng 1 lần). Nếu duyệt tiến từ w_i lên W, bạn đã biến bài toán thành Cái túi không giới hạn số lượng (Unbounded Knapsack)!',
        },
      },
      {
        id: 'blk-knap-3',
        type: 'problemReference',
        order: 3,
        data: {
          problemSlug: 'balo-0-1',
          promptNote: 'Mở bài tập P011: Bài toán cái túi 0/1 trong Coding Lab để luyện cài đặt.',
        },
      },
    ],
  },
  'mang-mot-chieu': {
    id: 'les-cpp-array',
    slug: 'mang-mot-chieu',
    courseId: 'course-cpp-zero',
    courseSlug: 'cpp-co-ban',
    moduleId: 'mod-cpp-2',
    title: 'Mảng một chiều và các mẫu duyệt phần tử kinh điển',
    order: 1,
    estimatedMinutes: 30,
    isPreview: true,
    primaryType: 'interactive',
    objectives: [
      'Hiểu cách đánh chỉ số mảng từ 0 đến N - 1 trong C/C++, Python và Java.',
      'Viết đúng các mẫu xử lý mảng cơ bản: tính tổng, đếm theo điều kiện và tìm phần tử lớn nhất.',
    ],
    conceptIds: ['concept-arrays'],
    relatedProblemSlugs: ['tong-phan-tu-mang', 'dem-so-chan', 'tim-max'],
    blocks: [
      {
        id: 'blk-arr-1',
        type: 'richText',
        order: 1,
        data: {
          heading: '1. Tổ chức bộ nhớ liên tiếp của mảng một chiều',
          paragraphs: [
            'Mảng (Array / std::vector) lưu trữ các phần tử cùng kiểu dữ liệu trên một vùng nhớ liên tiếp. Nhờ đó, việc truy cập phần tử thứ i (a[i]) luôn chỉ tốn thời gian hằng số O(1).',
            'Lưu ý quan trọng nhất đối với người mới học: mảng có N phần tử sẽ có chỉ số hợp lệ từ 0 đến N - 1. Truy cập a[N] là lỗi vượt biên (Out of Bounds).',
          ],
        },
      },
      {
        id: 'blk-arr-2',
        type: 'image',
        order: 2,
        data: {
          diagramType: 'array-memory',
          alt: 'Sơ đồ ô nhớ liên tiếp của mảng a[0..4] và chỉ số tương ứng',
          caption: 'Hình 1: Các phần tử mảng nằm liền kề trong bộ nhớ và được đánh chỉ số từ 0 đến N - 1.',
        },
      },
      {
        id: 'blk-arr-3',
        type: 'code',
        order: 3,
        data: {
          title: 'Duyệt mảng: Tính tổng và tìm giá trị lớn nhất',
          defaultLanguage: 'cpp',
          sampleInput: '5\n4 9 2 15 7',
          expectedOutput: 'Tong = 37, Max = 15',
          complexityNote: 'Độ phức tạp thời gian: O(N) | Bộ nhớ phụ: O(1)',
          snippets: {
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {4, 9, 2, 15, 7};
    long long sum = 0;
    int maxVal = a[0];

    for (int x : a) {
        sum += x;
        if (x > maxVal) maxVal = x;
    }
    cout << "Tong = " << sum << ", Max = " << maxVal << "\\n";
    return 0;
}`,
            python: `a = [4, 9, 2, 15, 7]
total = sum(a)
max_val = max(a)
print(f"Tong = {total}, Max = {max_val}")`,
          },
        },
      },
      {
        id: 'blk-arr-4',
        type: 'problemReference',
        order: 4,
        data: {
          problemSlug: 'tong-phan-tu-mang',
          promptNote: 'Làm bài tập P002: Tổng phần tử mảng để rèn kỹ năng nhập mảng và kiểu dữ liệu 64-bit.',
        },
      },
    ],
  },
  'con-tro-va-bo-nho': {
    id: 'les-c-pointer',
    slug: 'con-tro-va-bo-nho',
    courseId: 'course-c-foundation',
    courseSlug: 'c-nen-tang',
    moduleId: 'mod-c-1',
    title: 'Con trỏ và cấp phát bộ nhớ trong C',
    order: 2,
    estimatedMinutes: 35,
    isPreview: true,
    primaryType: 'interactive',
    objectives: [
      'Phân biệt toán tử lấy địa chỉ (&) và toán tử giải tham chiếu (*).',
      'Hiểu vì sao hàm hoán đổi swap(int *a, int *b) cần truyền địa chỉ.',
    ],
    conceptIds: ['concept-pointers'],
    relatedProblemSlugs: ['tong-hai-so', 'tim-max'],
    blocks: [
      {
        id: 'blk-ptr-1',
        type: 'richText',
        order: 1,
        data: {
          heading: '1. Con trỏ là biến lưu địa chỉ ô nhớ',
          paragraphs: [
            'Mỗi biến khi khai báo trong C đều được cấp một địa chỉ trong bộ nhớ RAM. Biến con trỏ (pointer) không lưu giá trị thông thường mà lưu địa chỉ của một biến khác.',
          ],
        },
      },
      {
        id: 'blk-ptr-2',
        type: 'code',
        order: 2,
        data: {
          title: 'Truyền tham chiếu bằng con trỏ trong C',
          defaultLanguage: 'c',
          sampleInput: '10 25',
          expectedOutput: '25 10',
          snippets: {
            c: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 25;
    swap(&x, &y);
    printf("%d %d\\n", x, y);
    return 0;
}`,
          },
        },
      },
    ],
  },
  'tim-kiem-nhi-phan': {
    id: 'les-hsg-bsearch',
    slug: 'tim-kiem-nhi-phan',
    courseId: 'course-hsg-cpp',
    courseSlug: 'thuat-toan-hsg-cpp',
    moduleId: 'mod-hsg-1',
    title: 'Tìm kiếm nhị phân trên mảng sắp xếp và trên kết quả',
    order: 2,
    estimatedMinutes: 40,
    isPreview: true,
    primaryType: 'interactive',
    objectives: [
      'Viết vòng lặp Tìm kiếm nhị phân không bị lặp vô hạn ở biên left/right.',
      'Hiểu cách tính mid = left + (right - left) / 2 để tránh tràn số nguyên.',
    ],
    conceptIds: ['concept-binary-search'],
    relatedProblemSlugs: ['tim-kiem-nhi-phan'],
    blocks: [
      {
        id: 'blk-bs-1',
        type: 'richText',
        order: 1,
        data: {
          heading: '1. Thu hẹp nửa không gian tìm kiếm sau mỗi phép so sánh',
          paragraphs: [
            'Khi mảng đã được sắp xếp không giảm, chỉ cần kiểm tra phần tử đứng giữa a[mid] là ta có thể loại bỏ hoàn toàn một nửa mảng không chứa giá trị cần tìm X.',
            'Với N = 1.000.000 phần tử, tìm kiếm tuyến tính cần tối đa 1.000.000 bước, trong khi Tìm kiếm nhị phân chỉ cần tối đa 20 bước (vì 2^20 > 10^6).',
          ],
        },
      },
      {
        id: 'blk-bs-2',
        type: 'image',
        order: 2,
        data: {
          diagramType: 'binary-search',
          alt: 'Sơ đồ thu hẹp đoạn [left, right] qua chỉ số mid trong Tìm kiếm nhị phân',
          caption: 'Hình 1: Mỗi bước thu hẹp một nửa đoạn tìm kiếm [left, right] dựa trên so sánh a[mid] với X.',
        },
      },
      {
        id: 'blk-bs-3',
        type: 'problemReference',
        order: 3,
        data: {
          problemSlug: 'tim-kiem-nhi-phan',
          promptNote: 'Luyện tập ngay bài P006: Tìm kiếm nhị phân cổ điển trong Coding Lab.',
        },
      },
    ],
  },
  'git-branch-merge': {
    id: 'les-git-branch',
    slug: 'git-branch-merge',
    courseId: 'course-git',
    courseSlug: 'git-github-thuc-hanh',
    moduleId: 'mod-git-1',
    title: 'Nhánh (Branch), Gộp nhánh (Merge) và xử lý xung đột',
    order: 1,
    estimatedMinutes: 25,
    isPreview: true,
    primaryType: 'theory',
    objectives: [
      'Hiểu con trỏ nhánh (branch pointer) và HEAD trong Git.',
      'Thực hiện quy trình tạo nhánh tính năng và gộp về nhánh main an toàn.',
    ],
    conceptIds: ['concept-git-branch'],
    relatedProblemSlugs: [],
    blocks: [
      {
        id: 'blk-git-1',
        type: 'richText',
        order: 1,
        data: {
          heading: '1. Vì sao không nên làm việc trực tiếp trên nhánh main?',
          paragraphs: [
            'Trong dự án phần mềm thực tế, nhánh main luôn phải giữ ở trạng thái chạy ổn định. Khi phát triển một tính năng mới hoặc sửa lỗi, ta tách một nhánh riêng (ví dụ: feature/dp-visualizer), kiểm thử hoàn chỉnh rồi mới gộp (merge) trở lại.',
          ],
        },
      },
      {
        id: 'blk-git-2',
        type: 'image',
        order: 2,
        data: {
          diagramType: 'git-graph',
          alt: 'Sơ đồ lịch sử commit tách nhánh feature và merge về main',
          caption: 'Hình 1: Lịch sử commit khi tách nhánh tính năng và hợp nhất qua Pull Request.',
        },
      },
    ],
  },
};

export function buildCompleteLessonsMap(courses: Course[]): Record<string, LessonDetail> {
  const map: Record<string, LessonDetail> = { ...SEED_LESSONS_BY_SLUG };

  for (const course of courses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (!map[lesson.slug]) {
          map[lesson.slug] = {
            ...lesson,
            courseId: course.id,
            courseSlug: course.slug,
            moduleId: mod.id,
            objectives: [
              `Nắm vững lý thuyết trọng tâm của bài "${lesson.title}".`,
              'Phân tích ví dụ minh họa và áp dụng vào bài tập thực hành liên quan.',
            ],
            conceptIds: ['concept-general'],
            relatedProblemSlugs: ['tong-hai-so', 'tong-phan-tu-mang', 'doi-tien-it-nhat'],
            blocks: [
              {
                id: `${lesson.id}-blk-1`,
                type: 'richText',
                order: 1,
                data: {
                  heading: `1. Nội dung trọng tâm: ${lesson.title}`,
                  paragraphs: [
                    `Bài học thuộc học phần "${mod.title}" trong khóa "${course.title}". Nội dung được thiết kế giúp học viên hiểu bản chất trước khi bắt tay vào viết mã nguồn.`,
                    'Hãy đọc kỹ phần phân tích bên dưới, thử trả lời câu hỏi kiểm tra nhanh và ghi chú lại các điểm quan trọng vào sổ tay học tập bên phải.',
                  ],
                  bulletPoints: [
                    'Xác định rõ đầu vào (Input), đầu ra (Output) và điều kiện biên của bài toán.',
                    'Kiểm tra độ phức tạp thời gian và bộ nhớ trước khi cài đặt.',
                  ],
                },
              },
              {
                id: `${lesson.id}-blk-2`,
                type: 'callout',
                order: 2,
                data: {
                  variant: 'info',
                  title: 'Gợi ý tự học hiệu quả',
                  content:
                    'Bạn có thể bật Chế độ Tập trung (Focus Mode) ở thanh công cụ phía trên để ẩn các thanh bên khi cần đọc sâu lý thuyết.',
                },
              },
              {
                id: `${lesson.id}-blk-3`,
                type: 'quiz',
                order: 3,
                data: {
                  question: `Khi áp dụng kiến thức bài "${lesson.title}", bước nào nên thực hiện đầu tiên trước khi gõ code?`,
                  conceptTag: 'Phương pháp giải quyết vấn đề',
                  correctOptionId: 'opt-1',
                  options: [
                    {
                      id: 'opt-1',
                      text: 'Phân tích giới hạn dữ liệu, kiểm tra ví dụ nhỏ bằng tay và xác định trường hợp biên.',
                      explanation:
                        'Chính xác! Việc chạy thử ví dụ nhỏ bằng tay giúp phát hiện sớm lỗi logic trước khi viết mã.',
                    },
                    {
                      id: 'opt-2',
                      text: 'Viết code ngay lập tức rồi sửa dần theo cảm tính.',
                      explanation: 'Chưa tối ưu. Không phân tích ràng buộc dễ dẫn tới chọn sai thuật toán hoặc tràn kiểu dữ liệu.',
                    },
                  ],
                },
              },
              {
                id: `${lesson.id}-blk-4`,
                type: 'problemReference',
                order: 4,
                data: {
                  problemSlug: 'tong-phan-tu-mang',
                  promptNote: 'Chuyển sang phòng thực hành Coding Lab để rèn luyện kỹ năng cài đặt.',
                },
              },
            ],
          };
        }
      }
    }
  }

  return map;
}
