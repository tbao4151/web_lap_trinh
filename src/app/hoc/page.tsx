'use client';

import React from 'react';
import Link from 'next/link';
import {
  Play,
  BookOpen,
  TerminalSquare,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { GOAL_META, ROLE_META, ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DifficultyBadge, DemoBadge } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { SEED_LEARNING_PATHS, SEED_SKILL_COMPETENCIES } from '@/data/seed';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService } from '@/services';
import type { LearningGoal } from '@/types';

const ACTIVITY_DAYS = [
  { date: '29/10', count: 2 },
  { date: '30/10', count: 1 },
  { date: '31/10', count: 0 },
  { date: '01/11', count: 3 },
  { date: '02/11', count: 4 },
  { date: '03/11', count: 1 },
  { date: '04/11', count: 2 },
  { date: '05/11', count: 0 },
  { date: '06/11', count: 2 },
  { date: '07/11', count: 3 },
  { date: '08/11', count: 2 },
  { date: '09/11', count: 4 },
  { date: '10/11', count: 3 },
  { date: '11/11', count: 5 },
];

export default function LearnerDashboardPage() {
  const { state, setActiveGoal } = useAppState();

  const enrolledCourses = state.courses.filter((c) =>
    state.enrolledCourseSlugs.includes(c.slug)
  );
  const primaryCourse = enrolledCourses[0] ?? state.courses[0];
  const primaryProgress = primaryCourse
    ? courseService.getCourseProgress(state, primaryCourse)
    : null;

  const activePath =
    SEED_LEARNING_PATHS.find((p) => p.goal === state.activeGoal) ?? SEED_LEARNING_PATHS[0];

  const skillGaps = SEED_SKILL_COMPETENCIES.filter((s) => s.status !== 'mastered');
  const recommendedProblems = state.problems.slice(0, 4);

  return (
    <WorkspaceShell
      surface="learner"
      title={`Xin chào, ${ROLE_META.learner.personaName}`}
      subtitle="Theo dõi bài đang học dở, lộ trình theo mục tiêu và kỹ năng cần củng cố."
      actions={
        <Link
          href={ROUTES.practiceBank}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
        >
          <TerminalSquare className="h-4 w-4" aria-hidden="true" />
          <span>Luyện tập Coding Lab</span>
        </Link>
      }
    >
      {/* Top Stats Derived from Real Seed State */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Khóa đang theo học
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {enrolledCourses.length}
          </div>
          <div className="mt-1 text-xs text-teal-700 dark:text-teal-400">
            Trên tổng số {state.courses.length} khóa
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Bài học đã hoàn thành
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {state.completedLessonSlugs.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">Đồng bộ trực tiếp từ Lesson Player</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Bài tập đã giải (AC mẫu)
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {state.solvedProblemSlugs.length} / {state.problems.length}
          </div>
          <div className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
            Đang làm dở: {state.attemptedProblemSlugs.length} bài
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Ghi chú & Đánh dấu
          </div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {state.notes.length}
          </div>
          <Link
            href={ROUTES.learnerNotes}
            className="mt-1 inline-block text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Mở Sổ tay ôn tập →
          </Link>
        </div>
      </div>

      {/* Continue Learning Hero Card */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {enrolledCourses.length === 0 ? (
            <EmptyState
              title="Bạn chưa đăng ký khóa học nào"
              description="Khám phá danh mục khóa học miễn phí và khóa học thử nghiệm để bắt đầu hành trình học tập."
              actionLabel="Mở Danh mục khóa học"
              actionHref={ROUTES.courses}
            />
          ) : (
            <div className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-2xs dark:border-indigo-900/60 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tiếp tục từ bài đang học</span>
                </span>
                <span className="font-mono text-xs font-semibold text-teal-700 dark:text-teal-400">
                  Hoàn thành {primaryProgress?.completedCount}/{primaryProgress?.totalCount} bài (
                  {primaryProgress?.percent}%)
                </span>
              </div>

              <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                {primaryCourse.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {primaryCourse.shortDescription}
              </p>

              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all dark:bg-teal-400"
                  style={{ width: `${primaryProgress?.percent ?? 0}%` }}
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={ROUTES.lessonPlayer(
                      primaryCourse.slug,
                      primaryProgress?.nextLessonSlug || 'dp-1d-doi-tien'
                    )}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    <span>Học tiếp bài kế tiếp</span>
                  </Link>

                  <Link
                    href={ROUTES.lessonPlayer('dp-tu-duy-den-nang-cao', 'dp-1d-doi-tien')}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <span>Vào thẳng bài mẫu DP Đổi tiền</span>
                  </Link>
                </div>

                <Link
                  href={ROUTES.learnerCourses}
                  className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Xem tất cả {enrolledCourses.length} khóa đang học →
                </Link>
              </div>
            </div>
          )}

          {/* Actionable Skill Gaps */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Kỹ năng cần củng cố (Gợi ý theo từng năng lực)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Hệ thống phân tích từng chủ đề và ngôn ngữ riêng biệt, không đánh giá chung một điểm số mơ hồ.
                </p>
              </div>
              <Link
                href={ROUTES.learnerProgress}
                className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Mở Bản đồ năng lực đầy đủ →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {skillGaps.map((skill) => (
                <div
                  key={skill.id}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-800/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {skill.skillName}
                      </span>
                      <DifficultyBadge level={skill.level} />
                      <span
                        className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                          skill.status === 'needs-review'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                        }`}
                      >
                        {skill.status === 'needs-review' ? 'Cần ôn tập ngay' : 'Đang rèn luyện'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      <AlertCircle
                        className="mr-1 inline h-3.5 w-3.5 text-amber-600 dark:text-amber-400"
                        aria-hidden="true"
                      />
                      {skill.actionableGap}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {skill.recommendedCourseSlug && skill.recommendedLessonSlug ? (
                      <Link
                        href={ROUTES.lessonPlayer(
                          skill.recommendedCourseSlug,
                          skill.recommendedLessonSlug
                        )}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      >
                        Ôn lý thuyết
                      </Link>
                    ) : null}
                    {skill.recommendedProblemSlug ? (
                      <Link
                        href={ROUTES.codingLab(skill.recommendedProblemSlug)}
                        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                      >
                        Giải bài tập
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Goal Switcher, Active Roadmap & Demo Activity Chart */}
        <div className="space-y-6 lg:col-span-4">
          {/* Active Goal Roadmap */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Lộ trình theo mục tiêu
              </h2>
              <Link
                href={ROUTES.learnerPaths}
                className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Chi tiết →
              </Link>
            </div>

            <div className="mt-3">
              <label
                htmlFor="dashboard-goal-select"
                className="block text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                Đổi mục tiêu ưu tiên (không làm mất tiến độ cũ):
              </label>
              <select
                id="dashboard-goal-select"
                value={state.activeGoal}
                onChange={(e) => setActiveGoal(e.target.value as LearningGoal)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {(Object.keys(GOAL_META) as LearningGoal[]).map((g) => (
                  <option key={g} value={g}>
                    {GOAL_META[g].label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 space-y-3">
              {activePath.nodes.map((node) => (
                <div
                  key={node.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      Chặng {node.order}
                    </span>
                    <Link
                      href={ROUTES.courseDetail(node.courseSlug)}
                      className="font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                    >
                      Mở khóa học →
                    </Link>
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                    {node.title}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    Đầu ra: {node.milestoneSkill}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Activity Heatmap / Bar Chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Nhịp độ học 14 ngày
                </h2>
              </div>
              <DemoBadge text="Biểu đồ minh họa" />
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Số bài học hoàn thành và bài tập đã luyện theo dữ liệu mẫu.
            </p>

            <div className="mt-4 grid grid-cols-7 gap-2">
              {ACTIVITY_DAYS.map((day) => {
                const tone =
                  day.count === 0
                    ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                    : day.count <= 2
                      ? 'bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-300'
                      : 'bg-teal-600 text-white';

                return (
                  <div
                    key={day.date}
                    className={`flex flex-col items-center justify-center rounded-lg p-2 font-mono text-[11px] ${tone}`}
                  >
                    <span className="font-bold">{day.count}</span>
                    <span className="text-[9px] opacity-80">{day.date}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Practice Problems */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Bài tập gợi ý hôm nay
              </h2>
              <Link
                href={ROUTES.practiceBank}
                className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Tất cả ({state.problems.length}) →
              </Link>
            </div>
            <ul className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
              {recommendedProblems.map((prob) => {
                const solved = state.solvedProblemSlugs.includes(prob.slug);
                return (
                  <li key={prob.id} className="flex items-center justify-between gap-2 py-2.5">
                    <div className="min-w-0">
                      <Link
                        href={ROUTES.codingLab(prob.slug)}
                        className="truncate text-xs font-semibold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                      >
                        <span className="font-mono text-indigo-600 dark:text-indigo-400">
                          {prob.code}
                        </span>{' '}
                        · {prob.title}
                      </Link>
                    </div>
                    {solved ? (
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                        aria-label="Đã giải"
                      />
                    ) : (
                      <Link
                        href={ROUTES.codingLab(prob.slug)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
                      >
                        <span>Làm bài</span>
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
