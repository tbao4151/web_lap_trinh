'use client';

import React, { useMemo, useState } from 'react';
import {
  Search,
  RotateCcw,
  LayoutGrid,
  List,
  BookOpen,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import {
  DIFFICULTY_META,
  DOMAINS,
  formatVnd,
  GOAL_META,
  LANGUAGE_META,
  ROUTES,
} from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { CourseCard } from '@/components/course/CourseCard';
import { DifficultyBadge, LanguageBadges } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService } from '@/services';
import type { Difficulty, LearningGoal, ProgrammingLanguage } from '@/types';

export default function CourseCatalogPage() {
  const { state } = useAppState();

  const [query, setQuery] = useState('');
  const [domainId, setDomainId] = useState<string>('all');
  const [language, setLanguage] = useState<ProgrammingLanguage | 'all'>('all');
  const [level, setLevel] = useState<Difficulty | 'all'>('all');
  const [goal, setGoal] = useState<LearningGoal | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'updated' | 'level'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const courses = useMemo(
    () =>
      courseService.list(state, {
        query,
        domainId,
        language,
        level,
        goal,
        priceFilter,
        sortBy,
      }),
    [state, query, domainId, language, level, goal, priceFilter, sortBy]
  );

  const hasActiveFilters =
    query.trim() !== '' ||
    domainId !== 'all' ||
    language !== 'all' ||
    level !== 'all' ||
    goal !== 'all' ||
    priceFilter !== 'all';

  const handleClearFilters = () => {
    setQuery('');
    setDomainId('all');
    setLanguage('all');
    setLevel('all');
    setGoal('all');
    setPriceFilter('all');
    setSortBy('relevance');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
          <div>
            <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
              Online Academy · Danh mục học liệu
            </span>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              Khám phá Khóa học Đa trình độ
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Lọc theo lĩnh vực, ngôn ngữ lập trình, trình độ kiến thức và mục tiêu học tập độc lập.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Hiển thị {courses.length} khóa học
            </span>
            <div
              className="inline-flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900"
              role="group"
              aria-label="Chế độ xem danh sách"
            >
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                aria-label="Xem dạng lưới"
                className={`rounded-md p-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
                aria-label="Xem dạng hàng ngang"
                className={`rounded-md p-1.5 cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                <List className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <section
          aria-label="Bộ lọc khóa học"
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            <div className="md:col-span-4">
              <label htmlFor="course-search" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tìm kiếm theo tên, chủ đề, từ khóa
              </label>
              <div className="relative mt-1">
                <Search
                  className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="course-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ví dụ: Quy hoạch động, C++, SQL, Git..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="filter-domain" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Lĩnh vực
              </label>
              <select
                id="filter-domain"
                value={domainId}
                onChange={(e) => setDomainId(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">Tất cả lĩnh vực</option>
                {DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="filter-lang" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Ngôn ngữ
              </label>
              <select
                id="filter-lang"
                value={language}
                onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage | 'all')}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">Mọi ngôn ngữ</option>
                {(['c', 'cpp', 'python', 'java'] as ProgrammingLanguage[]).map((lang) => (
                  <option key={lang} value={lang}>
                    {LANGUAGE_META[lang].shortLabel}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="filter-level" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Trình độ
              </label>
              <select
                id="filter-level"
                value={level}
                onChange={(e) => setLevel(e.target.value as Difficulty | 'all')}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="all">Mọi trình độ</option>
                {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((lv) => (
                  <option key={lv} value={lv}>
                    {DIFFICULTY_META[lv].label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="filter-sort" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Sắp xếp
              </label>
              <select
                id="filter-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'updated' | 'level')}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="relevance">Độ phù hợp</option>
                <option value="updated">Mới cập nhật</option>
                <option value="level">Trình độ tăng dần</option>
              </select>
            </div>
          </div>

          {/* Goal & Price quick chips */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3.5 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Mục tiêu:
              </span>
              <button
                type="button"
                onClick={() => setGoal('all')}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                  goal === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Tất cả
              </button>
              {(Object.keys(GOAL_META) as LearningGoal[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                    goal === g
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {GOAL_META[g].label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 text-xs dark:bg-slate-800">
                {(
                  [
                    { id: 'all', label: 'Tất cả' },
                    { id: 'free', label: 'Miễn phí' },
                    { id: 'paid', label: 'Khóa trả phí (Demo)' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPriceFilter(item.id)}
                    className={`rounded-md px-2.5 py-1 font-medium cursor-pointer ${
                      priceFilter === item.id
                        ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-300 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Xóa bộ lọc</span>
                </button>
              ) : null}
            </div>
          </div>
        </section>

        {/* Course Grid or List */}
        <section className="mt-8" aria-label="Kết quả khóa học">
          {courses.length === 0 ? (
            <EmptyState
              title="Không tìm thấy khóa học khớp với bộ lọc hiện tại"
              description="Hãy thử mở rộng điều kiện ngôn ngữ, trình độ hoặc bấm đặt lại bộ lọc để xem toàn bộ danh mục học liệu."
              actionLabel="Đặt lại toàn bộ bộ lọc"
              onAction={handleClearFilters}
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => {
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
          ) : (
            <div className="space-y-4">
              {courses.map((course) => {
                const lessonCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                const firstPreview =
                  course.modules.flatMap((m) => m.lessons).find((l) => l.isPreview) ??
                  course.modules[0]?.lessons[0];

                return (
                  <article
                    key={course.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <DifficultyBadge level={course.level} />
                        <LanguageBadges languages={course.languages} compact />
                        <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {course.priceVnd === 0
                            ? 'Miễn phí'
                            : `${formatVnd(course.priceVnd)} (Demo)`}
                        </span>
                      </div>
                      <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                        <Link
                          href={ROUTES.courseDetail(course.slug)}
                          className="hover:underline"
                        >
                          {course.title}
                        </Link>
                      </h2>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {course.shortDescription}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{lessonCount} bài học</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{course.estimatedHours} giờ</span>
                        </span>
                        <span>Giảng viên: {course.instructorName}</span>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                      <Link
                        href={ROUTES.courseDetail(course.slug)}
                        className="rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                      >
                        Chi tiết
                      </Link>
                      {firstPreview ? (
                        <Link
                          href={ROUTES.lessonPlayer(course.slug, firstPreview.slug)}
                          className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                        >
                          <span>Học thử</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
