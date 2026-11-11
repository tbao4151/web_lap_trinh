'use client';

import React from 'react';
import Link from 'next/link';
import { FileEdit, ExternalLink } from 'lucide-react';
import { DOMAINS, ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DifficultyBadge } from '@/components/ui/Badges';
import { useAppState } from '@/providers/AppStateProvider';
import type { CourseVisibility } from '@/types';

export default function AdminContentModerationPage() {
  const { state, updateCourse } = useAppState();

  const handleToggleVisibility = (courseId: string, nextVis: CourseVisibility) => {
    const target = state.courses.find((c) => c.id === courseId);
    if (!target) return;
    updateCourse({ ...target, visibility: nextVis });
  };

  return (
    <WorkspaceShell
      surface="admin"
      title="Kiểm duyệt Nội dung & Học liệu"
      subtitle="Quản lý trạng thái xuất bản (Published / Draft / Archived) của các khóa học trên toàn hệ thống"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60">
                <th className="px-4 py-3.5">Khóa học</th>
                <th className="px-4 py-3.5">Mảng kiến thức</th>
                <th className="px-4 py-3.5">Giảng viên</th>
                <th className="px-4 py-3.5">Cấp độ</th>
                <th className="px-4 py-3.5">Trạng thái hiển thị</th>
                <th className="px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {state.courses.map((course) => {
                const domain = DOMAINS.find((d) => d.id === course.domainId);
                return (
                  <tr key={course.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {course.title}
                      </div>
                      <div className="font-mono text-xs text-slate-500">/{course.slug}</div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 dark:text-slate-300">
                      {domain?.name ?? course.domainId}
                    </td>
                    <td className="px-4 py-3.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                      {course.instructorName}
                    </td>
                    <td className="px-4 py-3.5">
                      <DifficultyBadge difficulty={course.level} />
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={course.visibility}
                        onChange={(e) =>
                          handleToggleVisibility(
                            course.id,
                            e.target.value as CourseVisibility
                          )
                        }
                        aria-label={`Đổi trạng thái xuất bản cho ${course.title}`}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                      >
                        <option value="published">Đang công khai (Published)</option>
                        <option value="draft">Bản nháp (Draft)</option>
                        <option value="archived">Lưu trữ (Archived)</option>
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={ROUTES.courseBuilder(course.id)}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                        >
                          <FileEdit className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Biên soạn</span>
                        </Link>
                        <Link
                          href={ROUTES.courseDetail(course.slug)}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                          title="Xem trang công khai"
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </WorkspaceShell>
  );
}
