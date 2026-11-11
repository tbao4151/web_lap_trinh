'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Calendar, ClipboardCheck, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { useAppState } from '@/providers/AppStateProvider';

export default function TeacherClassroomsPage() {
  const { state } = useAppState();

  return (
    <WorkspaceShell
      surface="teacher"
      title="Quản lý Lớp học & Đội tuyển"
      subtitle="Theo dõi chuyên cần, bài tập giao về nhà và tiến độ thực hành của từng học sinh"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {state.classrooms.map((cls) => (
          <article
            key={cls.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 font-mono text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  Mã lớp: {cls.code}
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Hoàn thành TB: {cls.averageCompletionPercent}%
                </span>
              </div>

              <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                {cls.name}
              </h2>
              <p className="mt-1 text-xs text-slate-500">{cls.gradeOrCohort}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                  <span>
                    <strong>{cls.students.length}</strong> học viên
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-teal-600" aria-hidden="true" />
                  <span>
                    <strong>{cls.assignments.length}</strong> đợt giao bài
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-slate-500">
                  <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Lịch học: {cls.scheduleLabel}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
              <Link
                href={ROUTES.classroomDetail(cls.id)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                <span>Mở sổ theo dõi lớp học</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </WorkspaceShell>
  );
}
