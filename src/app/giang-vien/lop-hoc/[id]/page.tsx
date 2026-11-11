'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, ClipboardCheck, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService } from '@/services';

export default function TeacherClassroomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { state } = useAppState();

  const classroom = state.classrooms.find((c) => c.id === id || c.code === id);

  if (!classroom) {
    return (
      <WorkspaceShell
        surface="teacher"
        title="Không tìm thấy lớp học"
        subtitle="Mã lớp học không tồn tại."
      >
        <EmptyState
          title="Lớp học không tồn tại"
          description="Vui lòng quay lại danh sách lớp học."
          actionLabel="Về danh sách lớp học"
          actionHref={ROUTES.classrooms}
        />
      </WorkspaceShell>
    );
  }

  return (
    <WorkspaceShell
      surface="teacher"
      title={classroom.name}
      subtitle={`${classroom.gradeOrCohort} • Lịch học: ${classroom.scheduleLabel}`}
      actions={
        <Link
          href={ROUTES.classrooms}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Danh sách lớp</span>
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Roster */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <Users className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              <span>Danh sách học sinh ({classroom.students.length})</span>
            </h2>
            <span className="font-mono text-xs font-semibold text-slate-500">
              Mã lớp: {classroom.code}
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase dark:border-slate-800">
                  <th className="py-3 pr-3">Mã HS</th>
                  <th className="px-3 py-3">Họ và tên</th>
                  <th className="px-3 py-3">Bài học</th>
                  <th className="px-3 py-3">Bài AC</th>
                  <th className="px-3 py-3">Bài giao</th>
                  <th className="py-3 pl-3 text-right">Hoạt động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                {classroom.students.map((st) => (
                  <tr key={st.id}>
                    <td className="py-3 pr-3 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {st.studentCode}
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-900 dark:text-white">
                      {st.name}
                    </td>
                    <td className="px-3 py-3 font-mono text-xs">{st.completedLessons} bài</td>
                    <td className="px-3 py-3 font-mono text-xs font-bold text-teal-600">
                      {st.solvedProblems} bài
                    </td>
                    <td className="px-3 py-3">
                      {st.assignmentStatus === 'submitted' ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          <span>Đã nộp đủ</span>
                        </span>
                      ) : st.assignmentStatus === 'in-progress' ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          <span>Đang làm</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                          <span>Cần nhắc hạn</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 pl-3 text-right text-xs text-slate-500">
                      {st.lastActiveAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Assignments */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <ClipboardCheck className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span>Bài tập & Chuyên đề đã giao ({classroom.assignments.length})</span>
          </h2>

          <div className="mt-4 space-y-4">
            {classroom.assignments.map((asg) => (
              <div
                key={asg.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Hạn nộp: {asg.dueAt}</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    Đã nộp: {asg.submittedCount}/{asg.totalStudents}
                  </span>
                </div>
                <h3 className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">
                  {asg.title}
                </h3>

                {asg.problemSlugs.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {asg.problemSlugs.map((slug) => {
                      const p = problemService.getBySlugOrId(state, slug);
                      return (
                        <Link
                          key={slug}
                          href={ROUTES.codingLab(slug)}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        >
                          {p ? `${p.code} — ${p.title}` : slug}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </WorkspaceShell>
  );
}
