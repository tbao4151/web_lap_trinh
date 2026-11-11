'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Search, Edit3, Eye } from 'lucide-react';
import { DOMAINS, formatVnd, ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DifficultyBadge, LanguageBadges } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import type { CourseVisibility } from '@/types';

export default function TeacherCourseListPage() {
  const router = useRouter();
  const { state, createCourseDraft } = useAppState();
  const [query, setQuery] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<'all' | CourseVisibility>('all');
  const [newTitle, setNewTitle] = useState('');

  const filtered = state.courses.filter((course) => {
    if (visibilityFilter !== 'all' && course.visibility !== visibilityFilter) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      if (!course.title.toLowerCase().includes(q) && !course.slug.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = createCourseDraft(newTitle.trim(), DOMAINS[0].id);
    setNewTitle('');
    router.push(ROUTES.courseBuilder(created.slug));
  };

  return (
    <WorkspaceShell
      surface="teacher"
      title="Quản lý Khóa học & Học liệu"
      subtitle="Tạo bản nháp khóa học mới, quản lý trạng thái xuất bản và mở Course Outline Builder."
    >
      {/* Create & Filter Bar */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <form
          onSubmit={handleCreate}
          className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Nhập tên khóa học mới để tạo bản nháp..."
            aria-label="Tên khóa học mới"
            className="min-w-[220px] flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Tạo khóa nháp</span>
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm khóa học..."
              aria-label="Tìm kiếm khóa học"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-xs dark:bg-slate-800">
            {(
              [
                { id: 'all', label: 'Tất cả' },
                { id: 'published', label: 'Đã xuất bản' },
                { id: 'draft', label: 'Bản nháp' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setVisibilityFilter(t.id)}
                className={`rounded-lg px-2.5 py-1 font-semibold cursor-pointer ${
                  visibilityFilter === t.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <EmptyState
            title="Không có khóa học nào khớp bộ lọc"
            description="Hãy thử đổi bộ lọc trạng thái hoặc tạo một khóa học nháp mới."
          />
        ) : (
          filtered.map((course) => {
            const lessonCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const firstLesson = course.modules[0]?.lessons[0];

            return (
              <div
                key={course.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                        course.visibility === 'published'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {course.visibility === 'published' ? 'Đã xuất bản' : 'Bản nháp (Draft)'}
                    </span>
                    <DifficultyBadge level={course.level} />
                    <LanguageBadges languages={course.languages} compact />
                    <span className="font-mono text-xs text-slate-500">
                      Slug: /{course.slug}
                    </span>
                  </div>

                  <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                    {course.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                    {course.shortDescription}
                  </p>
                  <div className="mt-2 text-xs text-slate-500">
                    {course.modules.length} học phần · {lessonCount} bài học · Giá Demo:{' '}
                    {formatVnd(course.priceVnd)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={ROUTES.courseDetail(course.slug)}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Xem trang công khai</span>
                  </Link>

                  {firstLesson ? (
                    <Link
                      href={ROUTES.lessonEditor(firstLesson.slug)}
                      className="inline-flex items-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      <span>Soạn bài học đầu</span>
                    </Link>
                  ) : null}

                  <Link
                    href={ROUTES.courseBuilder(course.slug)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                  >
                    <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Biên soạn Đề cương</span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </WorkspaceShell>
  );
}
