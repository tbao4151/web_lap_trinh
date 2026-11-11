'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, Clock, Users, ArrowRight, TerminalSquare } from 'lucide-react';
import { GOAL_META, ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DemoBadge } from '@/components/ui/Badges';
import { SEED_CONTESTS } from '@/data/ecosystem-seed';

export default function LearnerContestsPage() {
  return (
    <WorkspaceShell
      surface="learner"
      title="Cuộc thi & Đấu trường Thuật toán (Demo)"
      subtitle="Rèn luyện tâm lý phòng thi, chiến thuật phân bổ thời gian và chấm điểm từng phần theo thể thức IOI"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {SEED_CONTESTS.map((contest) => (
          <article
            key={contest.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
                    contest.status === 'ongoing'
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                  }`}
                >
                  <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    {contest.status === 'ongoing' ? 'Đang diễn ra (Demo)' : 'Sắp mở đăng ký'}
                  </span>
                </span>
                <DemoBadge text={`Thể thức ${contest.ruleFormat}`} />
              </div>

              <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                {contest.title}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                {contest.description}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-indigo-600" aria-hidden="true" />
                  <span>{contest.durationMinutes} phút</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TerminalSquare className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  <span>{contest.problemSlugs.length} bài thi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                  <span>{contest.registeredCountDemo} thí sinh mẫu</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Nhóm mục tiêu: <strong>{GOAL_META[contest.targetGoal].label}</strong> • Bắt đầu:{' '}
                <span className="font-mono">{contest.startTime}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
              <Link
                href={ROUTES.contestDetail(contest.slug)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                <span>Vào phòng thi & Xem bảng điểm IOI</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </WorkspaceShell>
  );
}
