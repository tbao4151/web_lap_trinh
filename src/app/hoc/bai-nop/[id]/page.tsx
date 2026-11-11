'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Cpu,
  RotateCcw,
  Terminal,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  LANGUAGE_META,
  ROUTES,
  SUBMISSION_STATUS_META,
} from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { SubmissionStatusBadge, DemoBadge } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { submissionService } from '@/services';

export default function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { state } = useAppState();

  const submission = submissionService.getById(state, id);

  if (!submission) {
    return (
      <WorkspaceShell
        surface="learner"
        title="Không tìm thấy bản ghi bài nộp"
        subtitle="Bản ghi bài nộp mẫu không tồn tại."
      >
        <EmptyState
          title="Không tìm thấy bài nộp"
          description="Hãy chọn một bài nộp từ Ngân hàng bài tập hoặc danh sách bài nộp mẫu."
          actionLabel="Về Ngân hàng bài tập"
          actionHref={ROUTES.practiceBank}
        />
      </WorkspaceShell>
    );
  }

  const statusMeta = SUBMISSION_STATUS_META[submission.status];

  return (
    <WorkspaceShell
      surface="learner"
      title={`Kết quả chấm mẫu #${submission.id}`}
      subtitle={`Bài tập: ${submission.problemTitle} · Người nộp: ${submission.userName}`}
      actions={
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.practiceBank}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Ngân hàng bài tập</span>
          </Link>
          <Link
            href={ROUTES.codingLab(submission.problemSlug)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Thử lại trong Coding Lab</span>
          </Link>
        </div>
      }
    >
      {/* Quick Switcher between Seeded Submissions to inspect AC / WA / TLE / CE / RE */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
          <DemoBadge text="Dữ liệu Fixture mẫu" />
          <span>Chuyển nhanh giữa các trạng thái chấm mẫu (AC, WA, TLE, CE, RE):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {state.submissions.map((item) => (
            <Link
              key={item.id}
              href={ROUTES.submissionDetail(item.id)}
              className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold transition ${
                item.id === submission.id
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              {item.status} ({LANGUAGE_META[item.language].shortLabel})
            </Link>
          ))}
        </div>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Trạng thái tổng kết (Demo)
          </div>
          <div className="mt-2">
            <SubmissionStatusBadge status={submission.status} />
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            {statusMeta.description}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Điểm Subtasks
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {submission.score} / {submission.maxScore}
          </div>
          <div className="mt-1 text-xs text-slate-500">Thang điểm chuẩn IOI</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Ngôn ngữ & Thời điểm
          </div>
          <div className="mt-2 font-mono text-base font-bold text-slate-900 dark:text-white">
            {LANGUAGE_META[submission.language].label}
          </div>
          <div className="mt-1 text-xs text-slate-500">{submission.submittedAt}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Tài nguyên tiêu thụ (Mẫu)
          </div>
          <div className="mt-2 flex items-center gap-3 font-mono text-sm font-bold text-slate-900 dark:text-white">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              {submission.runtimeMs !== undefined ? `${submission.runtimeMs} ms` : '—'}
            </span>
            <span className="inline-flex items-center gap-1">
              <Cpu className="h-4 w-4 text-teal-600" aria-hidden="true" />
              {submission.memoryKb !== undefined ? `${submission.memoryKb} KB` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Compiler Error Output if CE */}
      {submission.compilerMessage ? (
        <section
          aria-label="Thông báo lỗi trình biên dịch"
          className="mt-6 rounded-2xl border border-rose-300 bg-rose-50/70 p-5 dark:border-rose-900 dark:bg-rose-950/40"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-rose-900 dark:text-rose-200">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>Thông báo từ Trình biên dịch (Compiler Output mẫu)</span>
          </div>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-xs text-rose-300">
            {submission.compilerMessage}
          </pre>
        </section>
      ) : null}

      {/* Test Groups Breakdown */}
      {submission.testGroupResults.length > 0 ? (
        <section aria-label="Chi tiết các nhóm test" className="mt-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Chi tiết kết quả theo từng Subtask ({submission.testGroupResults.length} nhóm test)
          </h2>
          <div className="mt-3 space-y-3">
            {submission.testGroupResults.map((group) => {
              const Icon =
                group.status === 'AC'
                  ? CheckCircle2
                  : group.status === 'TLE'
                    ? AlertTriangle
                    : XCircle;
              return (
                <div
                  key={group.groupId}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-5 w-5 ${
                          group.status === 'AC'
                            ? 'text-emerald-600'
                            : group.status === 'TLE'
                              ? 'text-amber-600'
                              : 'text-rose-600'
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {group.groupName}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Vượt qua {group.passedCount}/{group.totalCount} test cases · Thời gian:{' '}
                          {group.runtimeMs} ms · Bộ nhớ: {group.memoryKb} KB
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <SubmissionStatusBadge status={group.status} />
                      <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                        {group.score} / {group.maxScore} điểm
                      </span>
                    </div>
                  </div>

                  {group.sampleNote ? (
                    <div className="mt-3 rounded-xl bg-slate-50 px-4 py-2.5 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                      <strong>Nhận xét Subtask:</strong> {group.sampleNote}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Submitted Source Code */}
      <section aria-label="Mã nguồn đã nộp" className="mt-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Mã nguồn trong bản ghi mẫu
        </h2>
        <pre className="mt-3 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs leading-relaxed text-slate-100 sm:text-sm">
          <code>{submission.sourceCode}</code>
        </pre>
      </section>
    </WorkspaceShell>
  );
}
