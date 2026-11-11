'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  BookOpen,
  TerminalSquare,
  ArrowRight,
  Target,
} from 'lucide-react';
import { GOAL_META, ROUTES } from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { EmptyState } from '@/components/ui/EmptyState';
import { SEED_LEARNING_PATHS } from '@/data/ecosystem-seed';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService, problemService } from '@/services';

export default function LearningPathDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { state, setActiveGoal } = useAppState();

  const path = SEED_LEARNING_PATHS.find((p) => p.slug === slug);

  if (!path) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <PublicHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
          <EmptyState
            title="Không tìm thấy lộ trình học tập"
            description="Lộ trình bạn truy cập không tồn tại."
            actionLabel="Xem tất cả lộ trình"
            actionHref={ROUTES.learningPaths}
          />
        </main>
        <PublicFooter />
      </div>
    );
  }

  const isCurrentGoal = state.activeGoal === path.goal;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <PublicHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.learningPaths}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Quay lại danh mục lộ trình</span>
        </Link>

        <section className="mt-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              {GOAL_META[path.goal].label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Thời lượng khuyến nghị: {path.estimatedWeeks} tuần</span>
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
            {path.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-300">
            {path.subtitle}
          </p>

          <div className="mt-5 grid gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-950">
            <div>
              <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Đối tượng phù hợp
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                {path.targetAudience}
              </p>
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Chuẩn đầu ra đạt được
              </div>
              <ul className="mt-1 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {path.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-1.5">
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveGoal(path.goal)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              <Target className="h-4 w-4" aria-hidden="true" />
              <span>
                {isCurrentGoal
                  ? 'Đang áp dụng làm lộ trình chính của bạn'
                  : 'Đặt làm lộ trình học tập chính'}
              </span>
            </button>
            <Link
              href={ROUTES.learnerPaths}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <span>Mở trong Không gian Học viên</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Nodes Timeline */}
        <section className="mt-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Các chặng học tập tuần tự ({path.nodes.length} chặng)
          </h2>

          {path.nodes.map((node) => {
            const course = courseService.getBySlug(state, node.courseSlug);
            const progress = course ? courseService.getCourseProgress(state, course) : null;
            return (
              <div
                key={node.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-xs font-bold text-white dark:bg-white dark:text-slate-900">
                    Chặng {node.order}
                  </span>
                  {progress ? (
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      Tiến độ khóa học: {progress.completedCount}/{progress.totalCount} bài (
                      {progress.percent}%)
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                  {node.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {node.description}
                </p>

                <div className="mt-3 rounded-xl bg-emerald-50/70 px-3.5 py-2 text-xs font-medium text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                  <strong>Cột mốc kỹ năng:</strong> {node.milestoneSkill}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {/* Course Link */}
                  {course ? (
                    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase dark:text-indigo-400">
                        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Khóa học trọng tâm</span>
                      </div>
                      <div className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">
                        {course.title}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Link
                          href={ROUTES.courseDetail(course.slug)}
                          className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          Xem đề cương khóa học →
                        </Link>
                      </div>
                    </div>
                  ) : null}

                  {/* Recommended problems */}
                  <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase dark:text-teal-400">
                      <TerminalSquare className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Bài tập thực hành khuyến nghị</span>
                    </div>
                    {node.recommendedProblemSlugs.length > 0 ? (
                      <ul className="mt-2 space-y-1.5">
                        {node.recommendedProblemSlugs.map((pSlug) => {
                          const prob = problemService.getBySlugOrId(state, pSlug);
                          const isSolved = state.solvedProblemSlugs.includes(pSlug);
                          return (
                            <li key={pSlug} className="flex items-center justify-between text-xs">
                              <Link
                                href={ROUTES.codingLab(pSlug)}
                                className="font-medium text-slate-800 hover:text-indigo-600 dark:text-slate-200"
                              >
                                {prob ? `${prob.code} — ${prob.title}` : pSlug}
                              </Link>
                              <span
                                className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                  isSolved
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                }`}
                              >
                                {isSolved ? 'Đã AC' : 'Luyện tập'}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">
                        Chặng này tập trung thực hành dự án & câu hỏi trắc nghiệm trực tiếp trong bài
                        học.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
