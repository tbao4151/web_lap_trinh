'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  BookOpen,
  TerminalSquare,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import { DOMAINS, ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DifficultyBadge, LanguageBadge, VerdictBadge } from '@/components/ui/Badges';
import { SEED_SKILL_COMPETENCIES } from '@/data/ecosystem-seed';
import { useAppState } from '@/providers/AppStateProvider';
import type { SkillCompetency } from '@/types';

const STATUS_META: Record<
  SkillCompetency['status'],
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  mastered: {
    label: 'Đã nắm vững',
    badgeClass:
      'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  'in-progress': {
    label: 'Đang rèn luyện',
    badgeClass:
      'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    icon: Clock,
  },
  'needs-review': {
    label: 'Cần củng cố ngay',
    badgeClass:
      'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    icon: AlertTriangle,
  },
};

export default function LearnerProgressPage() {
  const { state } = useAppState();
  const [statusFilter, setStatusFilter] = useState<SkillCompetency['status'] | 'all'>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');

  const skills = SEED_SKILL_COMPETENCIES.filter((sk) => {
    if (statusFilter !== 'all' && sk.status !== statusFilter) return false;
    if (domainFilter !== 'all' && sk.domainId !== domainFilter) return false;
    return true;
  });

  const masteredCount = SEED_SKILL_COMPETENCIES.filter((s) => s.status === 'mastered').length;
  const inProgressCount = SEED_SKILL_COMPETENCIES.filter((s) => s.status === 'in-progress').length;
  const needsReviewCount = SEED_SKILL_COMPETENCIES.filter(
    (s) => s.status === 'needs-review'
  ).length;

  return (
    <WorkspaceShell
      surface="learner"
      title="Bản đồ Năng lực & Tiến độ Học tập"
      subtitle="Đánh giá chi tiết theo từng chủ đề kỹ thuật, ngôn ngữ và lịch sử bài nộp thực hành"
    >
      {/* Multi-axis Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500">Kỹ năng đã nắm vững</div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {masteredCount} / {SEED_SKILL_COMPETENCIES.length}
          </div>
          <p className="mt-1 text-xs text-slate-500">Chủ đề hoàn thành cả lý thuyết và bài tập</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500">Kỹ năng cần củng cố</div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-amber-600 dark:text-amber-400">
            {needsReviewCount} chủ đề
          </div>
          <p className="mt-1 text-xs text-slate-500">Có lỗi TLE/WA/CE cần ôn lại lý thuyết</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500">Bài học đã hoàn thành</div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {state.completedLessonSlugs.length} bài
          </div>
          <p className="mt-1 text-xs text-slate-500">Lưu đồng bộ trên trình duyệt</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-500">Bài tập đã giải đúng (AC)</div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-teal-600 dark:text-teal-400">
            {state.solvedProblemSlugs.length} / {state.problems.length}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Đang thử sức thêm {state.attemptedProblemSlugs.length} bài
          </p>
        </div>
      </div>

      {/* Competency Matrix Filter */}
      <section className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Ma trận Năng lực theo Kỹ năng & Ngôn ngữ
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Không quy đổi năng lực lập trình thành một con số % chung chung — mỗi kỹ năng gắn với
              bài học và bài tập cụ thể.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              aria-label="Lọc theo mảng kiến thức"
              className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="all">Tất cả mảng kiến thức</option>
              {DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as SkillCompetency['status'] | 'all')
              }
              aria-label="Lọc theo trạng thái năng lực"
              className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="all">Tất cả trạng thái ({SEED_SKILL_COMPETENCIES.length})</option>
              <option value="needs-review">Cần củng cố ({needsReviewCount})</option>
              <option value="in-progress">Đang rèn luyện ({inProgressCount})</option>
              <option value="mastered">Đã nắm vững ({masteredCount})</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {skills.map((skill) => {
            const meta = STATUS_META[skill.status];
            const StatusIcon = meta.icon;
            const domain = DOMAINS.find((d) => d.id === skill.domainId);
            return (
              <article
                key={skill.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-xs font-bold ${meta.badgeClass}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{meta.label}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {skill.language ? <LanguageBadge language={skill.language} /> : null}
                      <DifficultyBadge difficulty={skill.level} />
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {skill.skillName}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Mảng: {domain?.name ?? skill.domainId}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-slate-200/80 bg-white p-3 text-xs dark:border-slate-800 dark:bg-slate-900">
                    <div>
                      <span className="text-slate-500">Lý thuyết:</span>{' '}
                      <strong className="font-mono text-slate-900 dark:text-white">
                        {skill.completedLessonsCount}/{skill.totalLessonsCount} bài
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Thực hành AC:</span>{' '}
                      <strong className="font-mono text-slate-900 dark:text-white">
                        {skill.solvedProblemsCount}/{skill.totalProblemsCount} bài
                      </strong>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Nhận xét & Lỗ hổng:</strong>{' '}
                    {skill.actionableGap}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200/70 pt-3 dark:border-slate-800">
                  {skill.recommendedCourseSlug && skill.recommendedLessonSlug ? (
                    <Link
                      href={ROUTES.lessonPlayer(
                        skill.recommendedCourseSlug,
                        skill.recommendedLessonSlug
                      )}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
                      <span>Ôn bài học</span>
                    </Link>
                  ) : null}
                  {skill.recommendedProblemSlug ? (
                    <Link
                      href={ROUTES.codingLab(skill.recommendedProblemSlug)}
                      className="inline-flex items-center gap-1 rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                    >
                      <TerminalSquare className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Luyện bài tập</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Recent Submissions History */}
      <section className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Nhật ký Bài nộp Mẫu gần đây
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase dark:border-slate-800">
                <th className="py-3 pr-4">Thời gian</th>
                <th className="px-4 py-3">Bài tập</th>
                <th className="px-4 py-3">Ngôn ngữ</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Điểm Subtask</th>
                <th className="py-3 pl-4 text-right">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {state.submissions.map((sub) => (
                <tr key={sub.id}>
                  <td className="py-3 pr-4 font-mono text-xs text-slate-500">
                    {sub.submittedAt}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                    <Link
                      href={ROUTES.codingLab(sub.problemSlug)}
                      className="hover:text-indigo-600"
                    >
                      {sub.problemTitle}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <LanguageBadge language={sub.language} />
                  </td>
                  <td className="px-4 py-3">
                    <VerdictBadge status={sub.status} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs font-bold">
                    {sub.score} / {sub.maxScore}
                  </td>
                  <td className="py-3 pl-4 text-right">
                    <Link
                      href={ROUTES.submissionDetail(sub.id)}
                      className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Xem báo cáo →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </WorkspaceShell>
  );
}
