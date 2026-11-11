'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Route as RouteIcon,
  Clock,
  BookOpen,
  Code2,
  ArrowRight,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { GOAL_META, ROUTES } from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { SEED_LEARNING_PATHS } from '@/data/ecosystem-seed';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService } from '@/services';
import type { LearningGoal } from '@/types';

export default function LearningPathsCatalogPage() {
  const { state, setActiveGoal } = useAppState();
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal | 'all'>('all');

  const filteredPaths = SEED_LEARNING_PATHS.filter((p) =>
    selectedGoal === 'all' ? true : p.goal === selectedGoal
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <PublicHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Lộ trình học có cấu trúc rõ ràng</span>
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Chọn đúng lộ trình theo mục tiêu xuất phát của bạn
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Thay vì học rời rạc từng bài lẻ, mỗi lộ trình kết nối các khóa học lý thuyết, mô phỏng
              trực quan và danh sách bài tập thực hành theo từng cột mốc kỹ năng.
            </p>
          </div>

          {/* Goal Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedGoal('all')}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                selectedGoal === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
              }`}
            >
              Tất cả lộ trình ({SEED_LEARNING_PATHS.length})
            </button>
            {(Object.keys(GOAL_META) as LearningGoal[]).map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => setSelectedGoal(goal)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedGoal === goal
                    ? 'bg-indigo-600 text-white'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                }`}
              >
                {GOAL_META[goal].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredPaths.map((path) => {
            const isCurrentGoal = state.activeGoal === path.goal;
            return (
              <article
                key={path.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      <RouteIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{GOAL_META[path.goal].label}</span>
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Khoảng {path.estimatedWeeks} tuần</span>
                      <span>•</span>
                      <span>{path.nodes.length} chặng</span>
                    </div>
                  </div>

                  <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                    <Link
                      href={ROUTES.learningPathDetail(path.slug)}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {path.title}
                    </Link>
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                    {path.subtitle}
                  </p>

                  {/* Node steps preview */}
                  <div className="mt-5 space-y-2.5">
                    {path.nodes.map((node) => {
                      const course = courseService.getBySlug(state, node.courseSlug);
                      const progress = course
                        ? courseService.getCourseProgress(state, course)
                        : null;
                      return (
                        <div
                          key={node.id}
                          className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/60"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {node.title}
                            </span>
                            {progress ? (
                              <span className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                                {progress.percent}% bài học
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                            {node.description}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <BookOpen className="h-3 w-3 text-indigo-500" aria-hidden="true" />
                              <span>Khóa: {course?.title ?? node.courseSlug}</span>
                            </span>
                            {node.recommendedProblemSlugs.length > 0 ? (
                              <span className="inline-flex items-center gap-1">
                                <Code2 className="h-3 w-3 text-teal-600" aria-hidden="true" />
                                <span>{node.recommendedProblemSlugs.length} bài tập thực hành</span>
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveGoal(path.goal)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
                      isCurrentGoal
                        ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {isCurrentGoal ? 'Đang là mục tiêu của bạn' : 'Chọn làm mục tiêu học tập'}
                    </span>
                  </button>

                  <Link
                    href={ROUTES.learningPathDetail(path.slug)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                  >
                    <span>Xem chi tiết lộ trình</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
