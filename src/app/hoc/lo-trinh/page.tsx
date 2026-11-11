'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Compass, ArrowRight, BookOpen, Code2 } from 'lucide-react';
import { GOAL_META, ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { SEED_LEARNING_PATHS } from '@/data/ecosystem-seed';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService } from '@/services';
import type { LearningGoal } from '@/types';

export default function LearnerPathsPage() {
  const { state, setActiveGoal } = useAppState();
  const activePath =
    SEED_LEARNING_PATHS.find((p) => p.goal === state.activeGoal) ?? SEED_LEARNING_PATHS[0];

  return (
    <WorkspaceShell
      surface="learner"
      title="Lộ trình Học tập Cá nhân hóa"
      subtitle="Đồng bộ các chặng khóa học và bài tập theo mục tiêu hiện tại của bạn"
    >
      {/* Goal Switcher */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
          <Compass className="h-4 w-4" aria-hidden="true" />
          <span>Mục tiêu học tập đang kích hoạt</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(GOAL_META) as LearningGoal[]).map((goal) => {
            const active = state.activeGoal === goal;
            return (
              <button
                key={goal}
                type="button"
                onClick={() => setActiveGoal(goal)}
                className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                  active
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs dark:border-indigo-500 dark:bg-indigo-950/40'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {GOAL_META[goal].label}
                    </span>
                    {active ? (
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-indigo-600"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    {GOAL_META[goal].subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Path Detail */}
      <section className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              Lộ trình khuyến nghị cho mục tiêu {GOAL_META[activePath.goal].label}
            </span>
            <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {activePath.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-300">
              {activePath.subtitle}
            </p>
          </div>
          <Link
            href={ROUTES.learningPathDetail(activePath.slug)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
          >
            <span>Xem trang tổng quan lộ trình</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-5 space-y-4">
          {activePath.nodes.map((node) => {
            const course = courseService.getBySlug(state, node.courseSlug);
            const progress = course ? courseService.getCourseProgress(state, course) : null;

            return (
              <div
                key={node.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/60"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-indigo-600 px-2.5 py-1 font-mono text-xs font-bold text-white">
                      Chặng {node.order}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {node.title}
                    </h3>
                  </div>
                  {progress ? (
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      Hoàn thành {progress.completedCount}/{progress.totalCount} bài học (
                      {progress.percent}%)
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                  {node.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-3 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1 font-medium">
                      <BookOpen className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
                      <span>Khóa học: {course?.title ?? node.courseSlug}</span>
                    </span>
                    {node.recommendedProblemSlugs.length > 0 ? (
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Code2 className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                        <span>{node.recommendedProblemSlugs.length} bài thực hành Coding Lab</span>
                      </span>
                    ) : null}
                  </div>

                  {course && progress?.nextLessonSlug ? (
                    <Link
                      href={ROUTES.lessonPlayer(course.slug, progress.nextLessonSlug)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                    >
                      <span>Học tiếp chặng này</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </WorkspaceShell>
  );
}
