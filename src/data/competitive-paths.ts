import type { LearningGoal, LearningPath } from '@/types';

// Competitive curriculum uses real, existing Demo courses and problem slugs.
// The original multi-discipline SEED_LEARNING_PATHS remains untouched for
// compatibility with older demo records and unrelated screens.
export const COMPETITIVE_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-zero',
    slug: 'bat-dau-tu-con-so-0',
    title: 'Nhập môn lập trình thi đấu với C++ hoặc Python',
    subtitle: 'Từ đọc đề, nhập xuất, điều kiện, vòng lặp đến mảng, chuỗi và những bài toán đầu tiên.',
    goal: 'zero-to-hero',
    estimatedWeeks: 8,
    targetAudience: 'Người mới học lập trình, học sinh THCS/THPT bắt đầu luyện bài toán.',
    outcomes: [
      'Viết chương trình nhập xuất đúng định dạng bằng C++ hoặc Python.',
      'Tự phân tích bài toán cơ bản và thử các trường hợp biên.',
      'Bắt đầu đánh giá độ phức tạp, luyện tập mảng, chuỗi và số học.',
    ],
    nodes: [
      {
        id: 'node-z-1',
        order: 1,
        title: 'Nền tảng C++ cho giải thuật',
        description: 'Cấu trúc chương trình, nhập xuất, kiểu số 64-bit, vòng lặp và mảng.',
        courseSlug: 'cpp-co-ban',
        recommendedProblemSlugs: ['tong-hai-so', 'tong-phan-tu-mang', 'dem-so-chan', 'tim-max'],
        milestoneSkill: 'Tự viết và kiểm thử lời giải các bài toán nhập môn.',
      },
      {
        id: 'node-z-2',
        order: 2,
        title: 'Lựa chọn Python để luyện cùng dạng bài',
        description: 'List, dict, set, xử lý đầu vào và đánh giá hiệu năng trong Python 3.',
        courseSlug: 'python-ung-dung',
        recommendedProblemSlugs: ['tong-hai-so', 'dem-so-chan', 'so-nguyen-to'],
        milestoneSkill: 'Viết lời giải Python đúng và hiểu điểm khác biệt về hiệu năng.',
      },
      {
        id: 'node-z-3',
        order: 3,
        title: 'Bước đầu tư duy thuật toán',
        description: 'Từ mảng cơ bản tiến tới mảng cộng dồn và tìm kiếm nhị phân.',
        courseSlug: 'thuat-toan-hsg-cpp',
        recommendedProblemSlugs: ['prefix-sum', 'tim-kiem-nhi-phan'],
        milestoneSkill: 'Nhận biết khi nào cần chuyển từ duyệt tuần tự sang tiền xử lý hoặc tìm kiếm.',
      },
    ],
  },
  {
    id: 'path-highschool',
    slug: 'hsg-truong-huyen-cpp-python',
    title: 'HSG Tin học cấp trường/huyện: thuật toán nền tảng',
    subtitle: 'Rèn tư duy giải bài, phân tích giới hạn, số học, tiền xử lý và tìm kiếm.',
    goal: 'high-school',
    estimatedWeeks: 10,
    targetAudience: 'Học sinh đã biết C++ hoặc Python, đang luyện thi HSG Tin học cấp trường/huyện.',
    outcomes: [
      'Ước lượng độ phức tạp từ ràng buộc của đề bài.',
      'Sử dụng mảng cộng dồn, tìm kiếm nhị phân và kỹ thuật xử lý mảng.',
      'Làm quen bài có nhiều nhóm test và trình bày lời giải có kiểm chứng.',
    ],
    nodes: [
      {
        id: 'node-hs-1',
        order: 1,
        title: 'Củng cố nền tảng lập trình',
        description: 'Ôn vòng lặp, mảng, chuỗi và xử lý dữ liệu với C++.',
        courseSlug: 'cpp-co-ban',
        recommendedProblemSlugs: ['tong-phan-tu-mang', 'tim-max', 'so-nguyen-to'],
        milestoneSkill: 'Đọc đề và cài đặt giải pháp cơ bản ít lỗi.',
      },
      {
        id: 'node-hs-2',
        order: 2,
        title: 'Mảng cộng dồn và tìm kiếm nhị phân',
        description: 'Giảm thời gian cho truy vấn đoạn và bài tìm kiếm có tính đơn điệu.',
        courseSlug: 'thuat-toan-hsg-cpp',
        recommendedProblemSlugs: ['prefix-sum', 'tim-kiem-nhi-phan'],
        milestoneSkill: 'Phân biệt bài duyệt O(N), tiền xử lý O(N) và truy vấn O(1)/O(log N).',
      },
      {
        id: 'node-hs-3',
        order: 3,
        title: 'Giải bài bằng Python có kiểm soát hiệu năng',
        description: 'Thử triển khai cùng thuật toán với Python và so sánh giới hạn thời gian.',
        courseSlug: 'python-ung-dung',
        recommendedProblemSlugs: ['dem-so-chan', 'tim-max', 'so-nguyen-to'],
        milestoneSkill: 'Chọn cấu trúc dữ liệu phù hợp, không chỉ dịch cú pháp từ C++.',
      },
    ],
  },
  {
    id: 'path-hsg',
    slug: 'on-luyen-hsg-tin-hoc',
    title: 'HSG tỉnh/quốc gia: cấu trúc dữ liệu và quy hoạch động',
    subtitle: 'Tập trung kỹ thuật giải thuật và subtasks đã có học liệu Demo; chuyên đề nâng cao tiếp tục bổ sung.',
    goal: 'competitive',
    estimatedWeeks: 14,
    targetAudience: 'Học sinh đội tuyển HSG Tin học và người đã chắc nền tảng giải thuật.',
    outcomes: [
      'Phân tích giới hạn dữ liệu, tối ưu truy vấn mảng và tìm kiếm.',
      'Thiết lập trạng thái DP, truy hồi và thứ tự duyệt đúng.',
      'Luyện Đổi tiền, Dãy con tăng, Balo 0/1 và Đường đi trên lưới.',
    ],
    nodes: [
      {
        id: 'node-hsg-1',
        order: 1,
        title: 'Tiền xử lý mảng và tìm kiếm',
        description: 'Kỹ thuật mảng cộng dồn và Binary Search on Answer.',
        courseSlug: 'thuat-toan-hsg-cpp',
        recommendedProblemSlugs: ['prefix-sum', 'tim-kiem-nhi-phan', 'so-nguyen-to'],
        milestoneSkill: 'Nhận dạng tính đơn điệu và suy luận độ phức tạp.',
      },
      {
        id: 'node-hsg-2',
        order: 2,
        title: 'Quy hoạch động một chiều',
        description: 'Trạng thái, base case, chuyển trạng thái và cách xử lý INF.',
        courseSlug: 'dp-tu-duy-den-nang-cao',
        recommendedProblemSlugs: ['leo-cau-thang', 'doi-tien-it-nhat', 'day-con-tang'],
        milestoneSkill: 'Tự chứng minh công thức truy hồi và kiểm thử góc cạnh.',
      },
      {
        id: 'node-hsg-3',
        order: 3,
        title: 'DP hai chiều và tối ưu bộ nhớ',
        description: 'Balo 0/1, đường đi trên lưới và phân tích giới hạn bộ nhớ.',
        courseSlug: 'dp-tu-duy-den-nang-cao',
        recommendedProblemSlugs: ['balo-0-1', 'duong-di-tren-bang'],
        milestoneSkill: 'Nhận diện thứ tự cập nhật và tối ưu không gian từ 2D xuống 1D khi phù hợp.',
      },
    ],
  },
  {
    id: 'path-career',
    slug: 'du-bi-oi-icpc-nang-cao',
    title: 'Dự bị Olympic Tin học và ICPC (chưa đủ học liệu nâng cao)',
    subtitle: 'Ôn nền tảng giải thuật bằng C++/Python qua bài đang có; cây, đồ thị nâng cao và contest thật sẽ triển khai sau.',
    // Persisted demo activeGoal uses this legacy key. Display metadata below
    // overrides its old "software career" meaning without migrating localStorage.
    goal: 'career-cs',
    estimatedWeeks: 16,
    targetAudience: 'Người muốn chuẩn bị dài hạn cho Olympic Tin học hoặc ICPC, đã nắm chắc thuật toán cơ bản.',
    outcomes: [
      'Củng cố thuật toán nền tảng trước khi học chuyên đề thi đấu nâng cao.',
      'Phân tích subtasks và độ phức tạp của lời giải C++/Python.',
      'Nhận biết phần kiến thức còn thiếu: đồ thị nâng cao, cấu trúc dữ liệu, chiến thuật thi; hiện chưa có đủ nội dung.',
    ],
    nodes: [
      {
        id: 'node-cs-1',
        order: 1,
        title: 'Ôn kỹ thuật giải bài dưới áp lực giới hạn',
        description: 'Prefix Sum, tìm kiếm nhị phân và cách khai thác ràng buộc đề bài.',
        courseSlug: 'thuat-toan-hsg-cpp',
        recommendedProblemSlugs: ['prefix-sum', 'tim-kiem-nhi-phan'],
        milestoneSkill: 'Lựa chọn kỹ thuật tiền xử lý và tìm kiếm thích hợp.',
      },
      {
        id: 'node-cs-2',
        order: 2,
        title: 'Tăng cường tư duy quy hoạch động',
        description: 'DP 1D/2D, LIS và Balo; học liệu và đề luyện hiện là Demo.',
        courseSlug: 'dp-tu-duy-den-nang-cao',
        recommendedProblemSlugs: ['day-con-tang', 'balo-0-1', 'duong-di-tren-bang'],
        milestoneSkill: 'Tự thiết kế trạng thái và phân tích những trường hợp dẫn tới WA/TLE.',
      },
    ],
  },
];

export const COMPETITIVE_GOAL_META: Record<
  LearningGoal,
  { label: string; subtitle: string; targetNote: string }
> = {
  'zero-to-hero': {
    label: 'Nhập môn C++/Python',
    subtitle: 'Bắt đầu từ bài toán đầu tiên',
    targetNote: 'Dành cho người chưa biết lập trình hoặc cần luyện lại kiến thức nền.',
  },
  'high-school': {
    label: 'HSG trường/huyện',
    subtitle: 'Củng cố tư duy giải thuật cơ bản',
    targetNote: 'Dành cho học sinh ôn thi HSG trường/huyện và mới luyện thuật toán.',
  },
  competitive: {
    label: 'HSG tỉnh/quốc gia',
    subtitle: 'Kỹ thuật giải thuật và quy hoạch động',
    targetNote: 'Dành cho học sinh đã có nền tảng và muốn giải đề khó hơn.',
  },
  'career-cs': {
    label: 'Dự bị OI/ICPC',
    subtitle: 'Nền tảng thi đấu nâng cao (Demo)',
    targetNote: 'Chưa có đủ nội dung OI/ICPC nâng cao hoặc hệ thống chấm bài thật.',
  },
};

// Keep historic public URLs reachable, but do not expose unrelated curricula.
const LEGACY_PATH_SLUGS: Record<string, string> = {
  'tin-hoc-pho-thong-toan-dien': 'hsg-truong-huyen-cpp-python',
  'nen-tang-ky-su-phan-mem': 'du-bi-oi-icpc-nang-cao',
};

export function resolveCompetitiveLearningPath(slug: string): LearningPath | undefined {
  const effectiveSlug = LEGACY_PATH_SLUGS[slug] ?? slug;
  return COMPETITIVE_LEARNING_PATHS.find((path) => path.slug === effectiveSlug);
}
