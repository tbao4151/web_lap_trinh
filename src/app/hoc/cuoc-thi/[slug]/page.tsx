'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Clock, TerminalSquare, ArrowUpRight } from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DifficultyBadge, DemoBadge } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { SEED_CONTESTS } from '@/data/ecosystem-seed';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService } from '@/services';

export default function LearnerContestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { state } = useAppState();

  const contest = SEED_CONTESTS.find((c) => c.slug === slug || c.id === slug);

  if (!contest) {
    return (
      <WorkspaceShell
        surface="learner"
        title="Không tìm thấy cuộc thi"
        subtitle="Cuộc thi không tồn tại."
      >
        <EmptyState
          title="Không tìm thấy kỳ thi"
          description="Vui lòng quay lại danh sách cuộc thi."
          actionLabel="Về danh sách cuộc thi"
          actionHref={ROUTES.contests}
        />
      </WorkspaceShell>
    );
  }

  return (
    <WorkspaceShell
      surface="learner"
      title={contest.title}
      subtitle={`Thể thức ${contest.ruleFormat} • Thời gian làm bài: ${contest.durationMinutes} phút`}
      actions={
        <Link
          href={ROUTES.contests}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Danh sách kỳ thi</span>
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Problem set */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <TerminalSquare className="h-4 w-4 text-teal-600" aria-hidden="true" />
              <span>Danh sách Bài thi ({contest.problemSlugs.length} bài)</span>
            </h2>
            <span className="font-mono text-xs font-bold text-indigo-600">Tối đa 400 điểm</span>
          </div>

          <div className="mt-4 space-y-3">
            {contest.problemSlugs.map((pSlug, idx) => {
              const prob = problemService.getBySlugOrId(state, pSlug);
              return (
                <div
                  key={pSlug}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white dark:bg-white dark:text-slate-900">
                        Bài {String.fromCharCode(65 + idx)}
                      </span>
                      {prob ? <DifficultyBadge difficulty={prob.difficulty} /> : null}
                    </div>
                    <h3 className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">
                      {prob ? `${prob.code} — ${prob.title}` : pSlug}
                    </h3>
                  </div>

                  <Link
                    href={ROUTES.codingLab(pSlug)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                  >
                    <span>Làm bài</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leaderboard */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <Trophy className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <span>Bảng điểm Subtask theo chuẩn IOI (Dữ liệu minh họa)</span>
            </h2>
            <DemoBadge text="Bảng xếp hạng tĩnh Demo" />
          </div>

          {contest.leaderboard.length === 0 ? (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950">
              <Clock className="mx-auto mb-2 h-6 w-6 text-slate-400" aria-hidden="true" />
              Kỳ thi chưa bắt đầu nên bảng xếp hạng đang trống. Bạn vẫn có thể mở từng bài ở cột bên
              trái để luyện tập trước.
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase dark:border-slate-800">
                    <th className="py-3 pr-2">Hạng</th>
                    <th className="px-2 py-3">Thí sinh</th>
                    {contest.problemSlugs.map((s, idx) => (
                      <th key={s} className="px-2 py-3 text-center font-mono">
                        Bài {String.fromCharCode(65 + idx)}
                      </th>
                    ))}
                    <th className="py-3 pl-2 text-right">Tổng điểm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                  {contest.leaderboard.map((row) => (
                    <tr key={row.participantCode}>
                      <td className="py-3 pr-2 font-mono font-bold text-slate-900 dark:text-white">
                        #{row.rank}
                      </td>
                      <td className="px-2 py-3">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {row.displayName}
                        </div>
                        <div className="text-[11px] text-slate-500">{row.schoolOrGroup}</div>
                      </td>
                      {contest.problemSlugs.map((s) => {
                        const cell = row.problemScores[s];
                        return (
                          <td key={s} className="px-2 py-3 text-center font-mono font-bold">
                            {cell ? (
                              <span
                                className={`inline-block rounded px-2 py-0.5 ${
                                  cell.score === 100
                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                    : cell.score > 0
                                      ? 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                }`}
                              >
                                {cell.score}
                              </span>
                            ) : (
                              '—'
                            )}
                          </td>
                        );
                      })}
                      <td className="py-3 pl-2 text-right font-mono text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                        {row.totalScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </WorkspaceShell>
  );
}
