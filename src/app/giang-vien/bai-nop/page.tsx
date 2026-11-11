'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { LanguageBadge, VerdictBadge } from '@/components/ui/Badges';
import { useAppState } from '@/providers/AppStateProvider';
import type { SubmissionStatus } from '@/types';

export default function TeacherSubmissionsPage() {
  const { state } = useAppState();
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all');

  const submissions = state.submissions.filter((s) =>
    statusFilter === 'all' ? true : s.status === statusFilter
  );

  return (
    <WorkspaceShell
      surface="teacher"
      title="Nhật ký Bài nộp Học viên (Demo)"
      subtitle="Theo dõi kết quả chấm mẫu theo Subtask để phát hiện các lỗi tràn số, TLE hoặc CE phổ biến trên lớp"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap gap-2">
          {(['all', 'AC', 'WA', 'TLE', 'CE'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {st === 'all' ? `Tất cả (${state.submissions.length})` : st}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500">
          Dữ liệu bài nộp mẫu phục vụ kiểm tra giao diện chấm Subtask
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60">
                <th className="px-4 py-3.5">Mã nộp</th>
                <th className="px-4 py-3.5">Học viên</th>
                <th className="px-4 py-3.5">Bài toán</th>
                <th className="px-4 py-3.5">Ngôn ngữ</th>
                <th className="px-4 py-3.5">Kết quả</th>
                <th className="px-4 py-3.5">Điểm số</th>
                <th className="px-4 py-3.5">Thời gian nộp</th>
                <th className="px-4 py-3.5 text-right">Báo cáo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{sub.id}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-900 dark:text-white">
                    {sub.userName}
                  </td>
                  <td className="px-4 py-3.5">
                    <Link
                      href={ROUTES.codingLab(sub.problemSlug)}
                      className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {sub.problemTitle}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5">
                    <LanguageBadge language={sub.language} />
                  </td>
                  <td className="px-4 py-3.5">
                    <VerdictBadge status={sub.status} />
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs font-bold">
                    {sub.score} / {sub.maxScore}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">
                    {sub.submittedAt}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Link
                      href={ROUTES.submissionDetail(sub.id)}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                    >
                      <span>Xem code & Subtask</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WorkspaceShell>
  );
}
