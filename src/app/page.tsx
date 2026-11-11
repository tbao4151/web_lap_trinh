'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Play,
  Sparkles,
  CheckCircle2,
  TerminalSquare,
  SlidersHorizontal,
} from 'lucide-react';
import {
  BRAND_CONFIG,
  DOMAINS,
  GOAL_META,
  LANGUAGE_META,
  ROUTES,
} from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { CourseCard } from '@/components/course/CourseCard';
import { DPVisualizer } from '@/components/lesson/DPVisualizer';
import { DemoBadge } from '@/components/ui/Badges';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService } from '@/services';
import type { LearningGoal, ProgrammingLanguage } from '@/types';

const HERO_SNIPPETS: Record<ProgrammingLanguage, string> = {
  cpp: `// Quy hoạch động 1 chiều: Đổi tiền ít nhất (C++20)
vector<int> dp(S + 1, INF);
dp[0] = 0;
for (int s = 1; s <= S; ++s) {
    for (int coin : coins) {
        if (s >= coin && dp[s - coin] != INF) {
            dp[s] = min(dp[s], dp[s - coin] + 1);
        }
    }
}`,
  python: `# Quy hoạch động 1 chiều: Đổi tiền ít nhất (Python 3)
dp = [INF] * (S + 1)
dp[0] = 0
for s in range(1, S + 1):
    for coin in coins:
        if s >= coin and dp[s - coin] != INF:
            dp[s] = min(dp[s], dp[s - coin] + 1)`,
  java: `// Quy hoạch động 1 chiều: Đổi tiền ít nhất (Java 21)
int[] dp = new int[S + 1];
Arrays.fill(dp, INF);
dp[0] = 0;
for (int s = 1; s <= S; s++) {
    for (int coin : coins) {
        if (s >= coin && dp[s - coin] != INF) {
            dp[s] = Math.min(dp[s], dp[s - coin] + 1);
        }
    }
}`,
  c: `/* Quy hoạch động 1 chiều: Đổi tiền ít nhất (C17) */
dp[0] = 0;
for (int s = 1; s <= S; ++s) {
    for (int i = 0; i < n; ++i) {
        int c = coins[i];
        if (s >= c && dp[s - c] != INF && dp[s - c] + 1 < dp[s]) {
            dp[s] = dp[s - c] + 1;
        }
    }
}`,
};

export default function HomePage() {
  const { state, setActiveGoal } = useAppState();
  const [heroLang, setHeroLang] = useState<ProgrammingLanguage>('cpp');

  const featuredCourses = courseService.list(state).slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Section with Live Product Preview */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white py-14 sm:py-20 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="flex flex-wrap items-center gap-2">
                  <DemoBadge text="Không gian học tập & thực hành đa trình độ" />
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-0.5 font-mono text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    C · C++ · Python · Java · SQL · Git
                  </span>
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15] dark:text-white">
                  Hiểu bản chất thuật toán qua trực quan hóa và thực hành đa ngôn ngữ
                </h1>

                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                  {BRAND_CONFIG.name} kết nối bài giảng tương tác từng bước, phòng thực hành Coding Lab 4 ngôn ngữ và không gian biên soạn dành cho giáo viên — thiết kế cho người mới bắt đầu từ số 0, học sinh phổ thông, đội tuyển HSG và người tự học CNTT.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={ROUTES.courses}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
                  >
                    <span>Khám phá khóa học</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href={ROUTES.lessonPlayer('dp-tu-duy-den-nang-cao', 'dp-1d-doi-tien')}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  >
                    <Play className="h-4 w-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                    <span>Trải nghiệm bài học mẫu (DP Đổi tiền)</span>
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  <div>
                    <div className="font-mono text-base font-bold text-slate-900 dark:text-white">
                      4 trụ cột
                    </div>
                    <div>Học tập · Luyện code · Giảng dạy · Học viện</div>
                  </div>
                  <div>
                    <div className="font-mono text-base font-bold text-slate-900 dark:text-white">
                      {state.courses.length} khóa mẫu
                    </div>
                    <div>Từ Nhập môn C/C++ đến Quy hoạch động, SQL, Git</div>
                  </div>
                  <div>
                    <div className="font-mono text-base font-bold text-slate-900 dark:text-white">
                      {state.problems.length} bài tập seed
                    </div>
                    <div>Có đầy đủ sample code C, C++, Python, Java</div>
                  </div>
                </div>
              </div>

              {/* Custom Interactive Studio Window Preview */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-xl dark:border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-500/80" aria-hidden="true" />
                      <span className="h-3 w-3 rounded-full bg-amber-500/80" aria-hidden="true" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
                      <span className="ml-2 font-mono text-xs text-slate-400">
                        Coding Lab & Lesson Preview (Tương tác trực tiếp)
                      </span>
                    </div>

                    <div className="flex items-center gap-1" role="tablist" aria-label="Chọn ngôn ngữ xem thử">
                      {(['cpp', 'python', 'java', 'c'] as ProgrammingLanguage[]).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          role="tab"
                          aria-selected={heroLang === lang}
                          onClick={() => setHeroLang(lang)}
                          className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium transition cursor-pointer ${
                            heroLang === lang
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {LANGUAGE_META[lang].shortLabel}
                        </button>
                      ))}
                    </div>
                  </div>

                  <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-xs leading-relaxed text-indigo-100">
                    <code>{HERO_SNIPPETS[heroLang]}</code>
                  </pre>

                  <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Trạng thái bảng DP với xu [1, 3, 4], tổng S = 6:</span>
                      <span className="font-mono text-teal-300">dp[6] = 2 (chọn 3 + 3)</span>
                    </div>
                    <div className="mt-2.5 grid grid-cols-7 gap-1.5 text-center font-mono text-xs">
                      {[
                        { s: 0, v: '0', note: 'Base' },
                        { s: 1, v: '1', note: '+1' },
                        { s: 2, v: '2', note: '+1' },
                        { s: 3, v: '1', note: '+3' },
                        { s: 4, v: '1', note: '+4' },
                        { s: 5, v: '2', note: '+4' },
                        { s: 6, v: '2', note: '+3' },
                      ].map((cell) => (
                        <div
                          key={cell.s}
                          className={`rounded-lg border p-2 ${
                            cell.s === 6
                              ? 'border-teal-500 bg-teal-950/80 text-teal-200'
                              : 'border-slate-800 bg-slate-950 text-slate-300'
                          }`}
                        >
                          <div className="text-[10px] text-slate-400">dp[{cell.s}]</div>
                          <div className="mt-0.5 text-sm font-bold">{cell.v}</div>
                          <div className="text-[10px] text-slate-400">{cell.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Phân biệt Mục tiêu (Goal) khác với Trình độ (Level) & Ngôn ngữ */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
              Cá nhân hóa đa chiều
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              Chọn mục tiêu học tập của bạn — Không ép cố định một trình độ trọn đời
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-300">
              Tại {BRAND_CONFIG.name}, <strong>mục tiêu học tập</strong> (học phổ thông, thi HSG, hay đi làm) tách biệt hoàn toàn với <strong>trình độ năng lực từng môn</strong>. Một học viên có thể ở mức Nâng cao trong C++ nhưng ở mức Mới bắt đầu khi học Java hoặc SQL.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(GOAL_META) as LearningGoal[]).map((goalKey) => {
              const meta = GOAL_META[goalKey];
              const isSelected = state.activeGoal === goalKey;
              return (
                <div
                  key={goalKey}
                  className={`flex flex-col justify-between rounded-2xl border p-5 transition ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 dark:border-indigo-400 dark:bg-indigo-950/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        Mục tiêu
                      </span>
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          <span>Đang chọn</span>
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                      {meta.label}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      {meta.subtitle}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {meta.targetNote}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 pt-3.5 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveGoal(goalKey)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 cursor-pointer"
                    >
                      {isSelected ? 'Đang áp dụng cho Dashboard' : 'Chọn làm mục tiêu ưu tiên'}
                    </button>
                    <Link
                      href={`${ROUTES.courses}?goal=${goalKey}`}
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      Xem khóa →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Ba giá trị cốt lõi (3 USP) & 4 Lĩnh vực */}
        <section className="border-y border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  1. Học lý thuyết đa khối dễ hiểu
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Bài học cấu trúc theo từng khối (văn bản chuẩn, công thức toán, cảnh báo lỗi thường gặp, slide tóm tắt và câu hỏi kiểm tra tức thì) thay vì file PDF tĩnh.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
                  <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  2. Trực quan hóa từng bước thuật toán
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Quan sát trực tiếp bảng trạng thái Quy hoạch động, sơ đồ ô nhớ con trỏ và quá trình thu hẹp đoạn tìm kiếm nhị phân bằng nút tiến/lùi từng bước.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white">
                  <TerminalSquare className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  3. Luyện code 4 ngôn ngữ & Theo dõi kỹ năng
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Chuyển đổi linh hoạt giữa C, C++, Python, Java trong Coding Lab, lưu nháp tự động và xem phân tích chi tiết từng Subtask (AC, WA, TLE, CE).
                </p>
              </div>
            </div>

            {/* 4 Domains */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DOMAINS.map((domain) => (
                <Link
                  key={domain.id}
                  href={`${ROUTES.courses}?domain=${domain.id}`}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {domain.name}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {domain.requiresCodeEditor ? 'Có Coding Lab' : 'Học liệu tương tác'}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {domain.description}
                    </p>
                  </div>
                  <span className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Lọc khóa thuộc lĩnh vực này →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Interactive Lesson Preview right on Homepage (Section 6.1 item 6) */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-teal-700 uppercase dark:text-teal-400">
                Trải nghiệm trực tiếp ngay tại Trang chủ
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                Bài học tương tác mẫu: Quy hoạch động Đổi tiền
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Bấm <strong>Bước tiếp</strong> hoặc đổi bộ mệnh giá xu bên dưới để kiểm tra cách bảng trạng thái <code>dp[s]</code> hoạt động thực tế.
              </p>
            </div>
            <Link
              href={ROUTES.lessonPlayer('dp-tu-duy-den-nang-cao', 'dp-1d-doi-tien')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 sm:text-sm"
            >
              <span>Mở toàn bộ bài học trong Lesson Player</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <DPVisualizer />
        </section>

        {/* 5. Featured Courses from Seed Dataset */}
        <section className="border-t border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  Danh mục đào tạo
                </span>
                <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                  Các khóa học tiêu biểu trên hệ thống
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Mọi khóa học đều có bài học mở thử miễn phí và phân tách rõ trình độ với mục tiêu đầu ra.
                </p>
              </div>
              <Link
                href={ROUTES.courses}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <span>Xem tất cả {state.courses.length} khóa học</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course) => {
                const progress = courseService.getCourseProgress(state, course);
                const isEnrolled = state.enrolledCourseSlugs.includes(course.slug);
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={isEnrolled}
                    progressPercent={progress.percent}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Cách học hoạt động (3 bước) + FAQ minh bạch */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                Chu trình khép kín
              </span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                Cách học tập và giảng dạy hoạt động trên {BRAND_CONFIG.name}
              </h2>
              <ol className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-mono text-sm font-bold text-white">
                    1
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Đọc lý thuyết trực quan & Mô phỏng trạng thái
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Tương tác với bảng quy hoạch động, trả lời câu hỏi kiểm tra khái niệm và ghi chú ngay bên cạnh bài giảng.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 font-mono text-sm font-bold text-white">
                    2
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Thực hành trong Coding Lab đa ngôn ngữ
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Viết mã C, C++, Python hoặc Java ngay trên trình duyệt, đối chiếu các bộ test mẫu và phân tích độ phức tạp theo Subtask.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-mono text-sm font-bold text-white dark:bg-slate-700">
                    3
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Theo dõi bản đồ năng lực & Biên soạn học liệu
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Học viên biết chính xác kỹ năng nào cần ôn lại; giảng viên có Teaching Studio để biên tập bài học dạng Block và quản lý lớp.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Câu hỏi thường gặp (FAQ & Phạm vi Bản Demo UI)
                </h2>
                <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
                  <div className="py-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      1. Tôi chưa biết gì về lập trình thì nên chọn ngôn ngữ nào trước?
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                      Bạn có thể bắt đầu với khóa <strong>C++ từ con số 0</strong>, <strong>Lập trình C nền tảng</strong> hoặc <strong>Python từ cơ bản đến ứng dụng</strong>. Hệ thống tách biệt trình độ với ngôn ngữ nên bạn có thể học từng bước mà không bị áp lực.
                    </p>
                  </div>
                  <div className="py-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      2. Nền tảng có chỉ dành riêng cho luyện thi HSG C++ không?
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                      Không. Bồi dưỡng HSG và Quy hoạch động là một thế mạnh chuyên sâu, nhưng nền tảng phục vụ đầy đủ 4 nhóm: người bắt đầu từ số 0, học sinh phổ thông, thí sinh HSG và người học CNTT mở rộng (Java OOP, SQL, Git/GitHub).
                    </p>
                  </div>
                  <div className="py-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      3. Bản trình diễn giao diện (UI Demo) hiện tại lưu dữ liệu như thế nào?
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                      Ở giai đoạn UI hiện tại, mọi thao tác (chuyển vai trò Guest/Learner/Teacher/Admin, đánh dấu hoàn thành bài học, lưu ghi chú, lưu nháp code, thêm/sửa khóa học và bài giảng) đều hoạt động thật trên bộ nhớ trình duyệt (localStorage) và có nút <strong>Reset Demo</strong> trên thanh công cụ đầu trang.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
