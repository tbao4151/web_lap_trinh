import type {
  AppRole,
  Difficulty,
  Domain,
  LearningGoal,
  ProgrammingLanguage,
  SubmissionStatus,
} from '@/types';

export const BRAND_CONFIG = {
  name: 'AlgoAcademy',
  shortName: 'AA',
  tagline: 'Nền tảng học lập trình, thuật toán và công nghệ thông tin đa trình độ',
  description:
    'Học lý thuyết trực quan, thực hành code trong trình duyệt, theo dõi bản đồ năng lực theo từng kỹ năng và biên soạn học liệu chuẩn sư phạm.',
  demoNotice:
    'Bản trình diễn giao diện (UI Demo) — Sử dụng dữ liệu minh họa và bộ nhớ trình duyệt. Chưa kết nối máy chấm code, thanh toán hoặc xác thực máy chủ.',
  version: '1.1.0-ui-demo',
  storageKey: 'algoacademy_demo_state_v1',
  themeStorageKey: 'algoacademy_theme_v1',
  contactEmailDemo: 'lienhe-demo@algoacademy.vn',
} as const;

export const ROUTES = {
  home: '/',
  courses: '/khoa-hoc',
  courseDetail: (slug: string) => `/khoa-hoc/${slug}`,
  learningPaths: '/lo-trinh',
  learningPathDetail: (slug: string) => `/lo-trinh/${slug}`,
  publicProblems: '/bai-tap',
  about: '/gioi-thieu',
  login: '/dang-nhap',
  register: '/dang-ky',
  checkout: (courseSlug: string) => `/thanh-toan/${courseSlug}`,

  // Learner studio
  learnerDashboard: '/hoc',
  learnerCourses: '/hoc/khoa-hoc',
  lessonPlayer: (courseSlug: string, lessonSlug: string) =>
    `/hoc/khoa-hoc/${courseSlug}/bai/${lessonSlug}`,
  practiceBank: '/hoc/bai-tap',
  codingLab: (slug: string) => `/hoc/bai-tap/${slug}`,
  submissionDetail: (id: string) => `/hoc/bai-nop/${id}`,
  learnerProgress: '/hoc/tien-do',
  learnerNotes: '/hoc/ghi-chu',
  learnerPaths: '/hoc/lo-trinh',
  contests: '/hoc/cuoc-thi',
  contestDetail: (slug: string) => `/hoc/cuoc-thi/${slug}`,
  learnerAccount: '/hoc/tai-khoan',

  // Teacher studio
  teacherDashboard: '/giang-vien',
  teacherCourses: '/giang-vien/khoa-hoc',
  courseBuilder: (id: string) => `/giang-vien/khoa-hoc/${id}/bien-soan`,
  lessonEditor: (id: string) => `/giang-vien/bai-hoc/${id}/soan-thao`,
  teacherProblemBank: '/giang-vien/ngan-hang-bai-tap',
  problemEditor: (id: string) => `/giang-vien/bai-tap/${id}/bien-soan`,
  classrooms: '/giang-vien/lop-hoc',
  classroomDetail: (id: string) => `/giang-vien/lop-hoc/${id}`,
  teacherSubmissions: '/giang-vien/bai-nop',
  teacherResearch: '/giang-vien/nghien-cuu',

  // Admin console
  adminDashboard: '/quan-tri',
  adminUsers: '/quan-tri/nguoi-dung',
  adminContent: '/quan-tri/noi-dung',
  adminOrders: '/quan-tri/don-hang',
  adminSettings: '/quan-tri/cau-hinh',
} as const;

export const DOMAINS: Domain[] = [
  {
    id: 'lap-trinh',
    slug: 'lap-trinh',
    name: 'Lập trình cốt lõi',
    description: 'Tư duy lập trình, cú pháp, quản lý bộ nhớ và hướng đối tượng với C, C++, Python, Java.',
    iconName: 'Code2',
    requiresCodeEditor: true,
  },
  {
    id: 'thuat-toan-hsg',
    slug: 'thuat-toan-hsg',
    name: 'Thuật toán & Luyện thi HSG',
    description: 'Cấu trúc dữ liệu, quy hoạch động, đồ thị, tìm kiếm nhị phân và chiến thuật thi học sinh giỏi.',
    iconName: 'Cpu',
    requiresCodeEditor: true,
  },
  {
    id: 'cong-nghe-phan-mem',
    slug: 'cong-nghe-phan-mem',
    name: 'Công nghệ phần mềm',
    description: 'Git/GitHub, quy trình làm việc nhóm, kiểm thử và tổ chức mã nguồn thực tế.',
    iconName: 'GitBranch',
    requiresCodeEditor: false,
  },
  {
    id: 'cntt-mo-rong',
    slug: 'cntt-mo-rong',
    name: 'CNTT & Cơ sở dữ liệu',
    description: 'SQL, thiết kế cơ sở dữ liệu, hệ điều hành, mạng máy tính và kiến thức nền tảng.',
    iconName: 'Database',
    requiresCodeEditor: false,
  },
];

export const LANGUAGE_META: Record<
  ProgrammingLanguage,
  { label: string; shortLabel: string; versionLabel: string; fileExt: string }
> = {
  c: {
    label: 'C (GCC C17)',
    shortLabel: 'C',
    versionLabel: 'GCC 13.2 -std=c17',
    fileExt: 'main.c',
  },
  cpp: {
    label: 'C++ (G++ C++20)',
    shortLabel: 'C++',
    versionLabel: 'G++ 13.2 -std=c++20',
    fileExt: 'solution.cpp',
  },
  python: {
    label: 'Python 3',
    shortLabel: 'Python',
    versionLabel: 'Python 3.12',
    fileExt: 'solution.py',
  },
  java: {
    label: 'Java (OpenJDK 21)',
    shortLabel: 'Java',
    versionLabel: 'OpenJDK 21 LTS',
    fileExt: 'Main.java',
  },
};

export const DIFFICULTY_META: Record<
  Difficulty,
  { label: string; description: string; badgeClass: string }
> = {
  beginner: {
    label: 'Mới bắt đầu',
    description: 'Không yêu cầu nền tảng trước, giải thích từng khái niệm từ gốc.',
    badgeClass:
      'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  },
  intermediate: {
    label: 'Trung cấp',
    description: 'Đã nắm cú pháp cơ bản, rèn luyện cấu trúc dữ liệu và giải quyết bài toán.',
    badgeClass:
      'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
  },
  advanced: {
    label: 'Nâng cao',
    description: 'Tối ưu độ phức tạp, thiết kế trạng thái và xử lý các ràng buộc lớn.',
    badgeClass:
      'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  },
  competition: {
    label: 'Thi đấu / HSG',
    description: 'Chuyên đề bồi dưỡng học sinh giỏi cấp tỉnh, quốc gia và lập trình thi đấu.',
    badgeClass:
      'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
  },
};

export const GOAL_META: Record<
  LearningGoal,
  { label: string; subtitle: string; targetNote: string }
> = {
  'zero-to-hero': {
    label: 'Mới bắt đầu từ số 0',
    subtitle: 'Làm quen tư duy lập trình và viết chương trình đầu tiên',
    targetNote: 'Dành cho người chưa từng học code hoặc muốn xây lại gốc vững chắc.',
  },
  'high-school': {
    label: 'Học phổ thông & Ôn thi',
    subtitle: 'Bám sát chương trình Tin học THPT và kiểm tra định kỳ',
    targetNote: 'Dành cho học sinh THCS/THPT cần nắm chắc bài trên lớp và thực hành chuẩn.',
  },
  competitive: {
    label: 'Luyện thi HSG & Thuật toán',
    subtitle: 'Chuyên sâu cấu trúc dữ liệu, quy hoạch động, đồ thị',
    targetNote: 'Dành cho đội tuyển HSG Tin học và người yêu thích lập trình thi đấu.',
  },
  'career-cs': {
    label: 'Tự học nâng cao & Kỹ năng CNTT',
    subtitle: 'OOP, SQL, Git/GitHub và nền tảng Khoa học máy tính',
    targetNote: 'Dành cho sinh viên CNTT và người tự học muốn làm dự án thực tế.',
  },
};

export const ROLE_META: Record<
  AppRole,
  { label: string; personaName: string; badgeText: string; defaultRoute: string; summary: string }
> = {
  guest: {
    label: 'Khách tham quan (Guest)',
    personaName: 'Khách chưa đăng nhập',
    badgeText: 'Khách',
    defaultRoute: ROUTES.home,
    summary: 'Khám phá học viện, tìm kiếm khóa học và trải nghiệm bài học mở thử.',
  },
  learner: {
    label: 'Học viên (Learner)',
    personaName: 'Nguyễn Minh Khôi (Lớp 11 Tin)',
    badgeText: 'Học viên Demo',
    defaultRoute: ROUTES.learnerDashboard,
    summary: 'Học lý thuyết tương tác, luyện bài tập 4 ngôn ngữ, lưu ghi chú và theo dõi năng lực.',
  },
  teacher: {
    label: 'Giảng viên (Teacher)',
    personaName: 'ThS. Trần Hoàng Nam',
    badgeText: 'Giảng viên Demo',
    defaultRoute: ROUTES.teacherDashboard,
    summary: 'Soạn khóa học, biên tập bài học dạng block, quản lý lớp học và nghiên cứu thuật toán.',
  },
  admin: {
    label: 'Quản trị viên (Admin)',
    personaName: 'Lê Thu Hà (Vận hành)',
    badgeText: 'Quản trị Demo',
    defaultRoute: ROUTES.adminDashboard,
    summary: 'Giám sát người dùng, kiểm duyệt nội dung, đối soát đơn mẫu và cấu hình hệ thống.',
  },
};

export const SUBMISSION_STATUS_META: Record<
  SubmissionStatus,
  { code: SubmissionStatus; label: string; vietnameseLabel: string; badgeClass: string; description: string }
> = {
  AC: {
    code: 'AC',
    label: 'Accepted',
    vietnameseLabel: 'Đúng toàn bộ (AC)',
    badgeClass:
      'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
    description: 'Mã nguồn vượt qua tất cả các bộ test mẫu trong kịch bản mô phỏng.',
  },
  WA: {
    code: 'WA',
    label: 'Wrong Answer',
    vietnameseLabel: 'Kết quả chưa khớp (WA)',
    badgeClass:
      'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
    description: 'Kết quả đầu ra khác đáp án chuẩn ở một hoặc nhiều trường hợp biên.',
  },
  TLE: {
    code: 'TLE',
    label: 'Time Limit Exceeded',
    vietnameseLabel: 'Quá giới hạn thời gian (TLE)',
    badgeClass:
      'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
    description: 'Thuật toán chạy vượt thời gian cho phép trên tập dữ liệu lớn.',
  },
  MLE: {
    code: 'MLE',
    label: 'Memory Limit Exceeded',
    vietnameseLabel: 'Vượt giới hạn bộ nhớ (MLE)',
    badgeClass:
      'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
    description: 'Chương trình cấp phát bộ nhớ vượt mức quy định của bài toán.',
  },
  RE: {
    code: 'RE',
    label: 'Runtime Error',
    vietnameseLabel: 'Lỗi khi thực thi (RE)',
    badgeClass:
      'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
    description: 'Chương trình dừng bất thường (truy cập ngoài mảng, chia cho 0, tràn ngăn xếp).',
  },
  CE: {
    code: 'CE',
    label: 'Compilation Error',
    vietnameseLabel: 'Lỗi biên dịch (CE)',
    badgeClass:
      'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
    description: 'Mã nguồn không biên dịch được do sai cú pháp hoặc thiếu thư viện.',
  },
  PENDING: {
    code: 'PENDING',
    label: 'Pending',
    vietnameseLabel: 'Đang chờ chấm mẫu',
    badgeClass:
      'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    description: 'Bài nộp đang nằm trong hàng đợi mô phỏng.',
  },
};

export function formatVnd(amount: number): string {
  if (amount <= 0) return 'Miễn phí';
  return `${amount.toLocaleString('vi-VN')} đ`;
}
