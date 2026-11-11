'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass } from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { CourseCard } from '@/components/course/CourseCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService } from '@/services';

export default function LearnerCoursesPage() {
  const { state } = useAppState();
  const [tab, setTab] = useState<'enrolled' | 'all'>('enrolled');

  const enrolledCourses = state.courses.filter((c) =>
    state.enrolledCourseSlugs.includes(c.slug)
  );
  const displayedCourses = tab === 'enrolled' ? enrolledCourses : state.courses;

  return (
    <WorkspaceShell
      surface="learner"
      title="Khóa học của tôi"
      subtitle="Theo dõi tiến độ hoàn thành từng học phần và học tiếp bài đang mở."
      actions={
        <Link
          href={ROUTES.courses}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <Compass className="h-4 w-4" aria-hidden="true" />
          <span>Khám phá thêm khóa học</span>
        </Link>
      }
    >
      <div className="mb-6 flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setTab('enrolled')}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${
            tab === 'enrolled'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          Đang theo học ({enrolledCourses.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('all')}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${
            tab === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300'
          }`}
        >
          Toàn bộ danh mục ({state.courses.length})
        </button>
      </div>

      {displayedCourses.length === 0 ? (
        <EmptyState
          title="Chưa có khóa học nào trong danh sách đang học"
          description="Bạn có thể chọn bất kỳ khóa học nào trong Danh mục để kích hoạt quyền học Demo."
          actionLabel="Xem toàn bộ danh mục"
          onAction={() => setTab('all')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedCourses.map((course) => {
            const progress = courseService.getCourseProgress(state, course);
            const isEnrolled = state.enrolledCourseSlugs.includes(course.slug);
            return (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={isEnrolled}
                progressPercent={progress.percent}
              />
            );
          })}
        </div>
      )}
    </WorkspaceShell>
  );
}
