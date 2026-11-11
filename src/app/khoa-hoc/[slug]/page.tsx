'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Lock,
  Unlock,
  Play,
  GraduationCap,
  ShieldCheck,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';
import {
  DOMAINS,
  formatVnd,
  GOAL_META,
  ROUTES,
} from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { DifficultyBadge, LanguageBadges, DemoBadge } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { commerceService, courseService } from '@/services';

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { state, enrollCourseDemo } = useAppState();

  const course = courseService.getBySlug(state, slug);

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col">
        <PublicHeader />
        <main id="main-content" className="mx-auto max-w-4xl flex-1 px-4 py-16">
          <EmptyState
            title="Không tìm thấy khóa học này"
            description="Khóa học bạn yêu cầu không tồn tại hoặc đã thay đổi đường dẫn."
            actionLabel="Quay lại danh mục khóa học"
            actionHref={ROUTES.courses}
          />
        </main>
        <PublicFooter />
      </div>
    );
  }

  const domain = DOMAINS.find((d) => d.id === course.domainId);
  const progress = courseService.getCourseProgress(state, course);
  const isEnrolled = state.enrolledCourseSlugs.includes(course.slug);
  const hasEntitlement = commerceService.hasCourseEntitlement(state, course);
  const completedSet = new Set(state.completedLessonSlugs);

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main id="main-content" className="flex-1">
        {/* Course Hero */}
        <section className="border-b border-slate-200 bg-white py-10 sm:py-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Link
              href={ROUTES.courses}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Quay lại Danh mục khóa học</span>
            </Link>

            <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
                    {domain?.name}
                  </span>
                  <DifficultyBadge level={course.level} />
                  <LanguageBadges languages={course.languages} />
                  <DemoBadge text="Học liệu mẫu tương tác" />
                </div>

                <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                  {course.title}
                </h1>

                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {course.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                    <span>
                      {course.modules.length} học phần · {progress.totalCount} bài học
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                    <span>Thời lượng ước tính: {course.estimatedHours} giờ</span>
                  </span>
                  <span>Cập nhật: {course.updatedAt}</span>
                </div>

                {/* Phân biệt rõ Trình độ vs Mục tiêu */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Mục tiêu đầu ra phù hợp:
                  </span>
                  {course.goals.map((g) => (
                    <span
                      key={g}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {GOAL_META[g].label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action & Entitlement Card */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                      Quyền truy cập học liệu
                    </span>
                    <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                      {course.priceVnd === 0
                        ? 'Miễn phí 100%'
                        : `${formatVnd(course.priceVnd)} (Demo)`}
                    </span>
                  </div>

                  {isEnrolled || hasEntitlement ? (
                    <div className="mt-3 rounded-xl border border-teal-200 bg-teal-50/80 p-3 text-xs text-teal-900 dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-200">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Đã mở khóa trong phiên Demo</span>
                        <span>
                          {progress.completedCount}/{progress.totalCount} bài ({progress.percent}%)
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-teal-200/70 dark:bg-teal-900">
                        <div
                          className="h-full rounded-full bg-teal-600 dark:bg-teal-400"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                      Các bài có nhãn <strong>Học thử (Preview)</strong> mở sẵn cho mọi vai trò. Bạn có thể bấm nút bên dưới để kích hoạt quyền học toàn khóa ở chế độ Demo (không thu phí).
                    </p>
                  )}

                  <div className="mt-5 flex flex-col gap-2.5">
                    {progress.nextLessonSlug ? (
                      <Link
                        href={ROUTES.lessonPlayer(course.slug, progress.nextLessonSlug)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                      >
                        <Play className="h-4 w-4" aria-hidden="true" />
                        <span>
                          {isEnrolled ? 'Tiếp tục bài đang học' : 'Vào học thử bài mở sẵn'}
                        </span>
                      </Link>
                    ) : null}

                    {!isEnrolled ? (
                      <button
                        type="button"
                        onClick={() => enrollCourseDemo(course.slug)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-300 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:bg-slate-900 dark:text-indigo-300 cursor-pointer"
                      >
                        <Unlock className="h-4 w-4" aria-hidden="true" />
                        <span>Kích hoạt quyền học toàn khóa (Demo)</span>
                      </button>
                    ) : null}

                    {course.priceVnd > 0 ? (
                      <Link
                        href={ROUTES.checkout(course.slug)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Xem giao diện Checkout Preview (Không thanh toán thật)</span>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Body: Outcomes, Outline & Instructor */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              {/* Outcomes */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Năng lực đạt được sau khóa học
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {course.outcomes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Module -> Lesson Outline */}
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Đề cương chi tiết ({course.modules.length} học phần)
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Click vào từng bài học để mở Lesson Player
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {course.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/60">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {mod.title}
                        </h3>
                        {mod.description ? (
                          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                            {mod.description}
                          </p>
                        ) : null}
                      </div>

                      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                        {mod.lessons.map((lesson) => {
                          const isCompleted = completedSet.has(lesson.slug);
                          const canOpen = commerceService.canAccessLesson(
                            state,
                            course,
                            lesson.isPreview
                          );

                          return (
                            <li
                              key={lesson.id}
                              className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                            >
                              <div className="flex items-center gap-3">
                                {isCompleted ? (
                                  <CheckCircle2
                                    className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                                    aria-label="Đã hoàn thành"
                                  />
                                ) : canOpen ? (
                                  <Play
                                    className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Lock
                                    className="h-4 w-4 shrink-0 text-slate-400"
                                    aria-label="Cần kích hoạt khóa học"
                                  />
                                )}
                                <div>
                                  <Link
                                    href={ROUTES.lessonPlayer(course.slug, lesson.slug)}
                                    className="text-sm font-semibold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                                  >
                                    {lesson.title}
                                  </Link>
                                  <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                                    <span>{lesson.estimatedMinutes} phút</span>
                                    <span>·</span>
                                    <span>
                                      {lesson.primaryType === 'interactive'
                                        ? 'Có mô phỏng thuật toán'
                                        : lesson.primaryType === 'practice'
                                          ? 'Kèm bài tập code'
                                          : 'Lý thuyết & Quiz'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {lesson.isPreview ? (
                                  <span className="rounded-md bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:bg-teal-950/70 dark:text-teal-300">
                                    Học thử mở sẵn
                                  </span>
                                ) : null}
                                <Link
                                  href={ROUTES.lessonPlayer(course.slug, lesson.slug)}
                                  className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-indigo-600 hover:text-white dark:border-slate-700 dark:text-slate-200"
                                >
                                  {canOpen ? 'Vào bài học' : 'Xem trạng thái quyền'}
                                </Link>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Prerequisites, Suitable For & Instructor */}
            <div className="space-y-6 lg:col-span-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Yêu cầu đầu vào
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {course.prerequisites.map((req) => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                  Đối tượng phù hợp
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {course.suitableFor.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      Giảng viên phụ trách (Hồ sơ mẫu)
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {course.instructorName}
                    </h3>
                  </div>
                </div>
                <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {course.instructorRole}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {course.instructorBio}
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>Không hiển thị số liệu đánh giá quảng cáo giả lập.</span>
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
