'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Eye,
  Lock,
  Maximize2,
  Minimize2,
  NotebookPen,
  Play,
  Target,
  TerminalSquare,
  Unlock,
} from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { LessonBlockRenderer } from '@/components/lesson/LessonBlockRenderer';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import {
  commerceService,
  courseService,
  lessonService,
  problemService,
} from '@/services';

export default function LessonPlayerPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = use(params);
  const {
    state,
    toggleLessonComplete,
    toggleBookmarkLesson,
    saveNote,
    enrollCourseDemo,
  } = useAppState();

  const [focusMode, setFocusMode] = useState(false);
  const [teacherPreviewMode, setTeacherPreviewMode] = useState<'learner' | 'teacher'>('learner');
  const [noteDraft, setNoteDraft] = useState('');

  const course = courseService.getBySlug(state, courseSlug);
  const lesson = lessonService.get(state, lessonSlug);

  const existingNote = state.notes.find((n) => n.lessonSlug === lessonSlug);

  useEffect(() => {
    setNoteDraft(existingNote?.content ?? '');
  }, [existingNote?.content, lessonSlug]);

  if (!course || !lesson) {
    return (
      <main id="main-content" className="mx-auto max-w-4xl px-4 py-16">
        <EmptyState
          title="Không tìm thấy bài học này"
          description="Bài học bạn truy cập không tồn tại trong khóa học hiện tại."
          actionLabel="Quay lại Danh mục khóa học"
          actionHref={ROUTES.courses}
        />
      </main>
    );
  }

  const progress = courseService.getCourseProgress(state, course);
  const isCompleted = state.completedLessonSlugs.includes(lesson.slug);
  const isBookmarked = state.bookmarkedLessonSlugs.includes(lesson.slug);
  const canAccess = commerceService.canAccessLesson(state, course, lesson.isPreview);
  const adjacent = lessonService.getAdjacentLessons(course, lesson.slug);

  const effectiveViewMode: 'learner' | 'teacher' =
    state.role === 'teacher' ? teacherPreviewMode : 'learner';

  const visibleBlocks = lessonService.filterBlocksForRole(
    lesson.blocks,
    effectiveViewMode
  );

  const relatedProblems = lesson.relatedProblemSlugs
    .map((slug) => problemService.getBySlugOrId(state, slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteDraft.trim()) return;
    saveNote({
      id: existingNote?.id,
      courseSlug: course.slug,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      content: noteDraft.trim(),
      isBookmarked: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sticky Lesson Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.courseDetail(course.slug)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Đề cương khóa học</span>
            </Link>

            <div className="hidden sm:block">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {course.title}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {lesson.title}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Progress pill */}
            <div className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 md:flex dark:bg-slate-800 dark:text-slate-300">
              <span>
                Tiến độ khóa: {progress.completedCount}/{progress.totalCount} ({progress.percent}%)
              </span>
            </div>

            {state.role === 'teacher' ? (
              <div className="flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 p-1 text-xs dark:border-amber-800 dark:bg-amber-950/60">
                <button
                  type="button"
                  onClick={() => setTeacherPreviewMode('learner')}
                  className={`rounded px-2 py-1 font-semibold cursor-pointer ${
                    teacherPreviewMode === 'learner'
                      ? 'bg-indigo-600 text-white'
                      : 'text-amber-900 dark:text-amber-200'
                  }`}
                >
                  Góc nhìn Học viên
                </button>
                <button
                  type="button"
                  onClick={() => setTeacherPreviewMode('teacher')}
                  className={`rounded px-2 py-1 font-semibold cursor-pointer ${
                    teacherPreviewMode === 'teacher'
                      ? 'bg-amber-600 text-white'
                      : 'text-amber-900 dark:text-amber-200'
                  }`}
                >
                  Hiện Ghi chú GV
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => toggleBookmarkLesson(lesson.slug)}
              aria-pressed={isBookmarked}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                isBookmarked
                  ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-700 dark:bg-amber-950/70 dark:text-amber-200'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{isBookmarked ? 'Đã lưu' : 'Đánh dấu'}</span>
            </button>

            <button
              type="button"
              onClick={() => setFocusMode((v) => !v)}
              aria-pressed={focusMode}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
            >
              {focusMode ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Thoát Tập trung</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Chế độ Tập trung</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleLessonComplete(lesson.slug)}
              aria-pressed={isCompleted}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3-Column Lesson Studio Layout */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Outline Sidebar (hidden in Focus Mode) */}
          {!focusMode ? (
            <aside
              aria-label="Mục lục khóa học"
              className="lg:col-span-3"
            >
              <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    Mục lục khóa học
                  </h2>
                  <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                    {progress.percent}%
                  </span>
                </div>

                <div className="mt-3 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  {course.modules.map((mod) => (
                    <div key={mod.id}>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {mod.title}
                      </div>
                      <ul className="mt-1.5 space-y-1">
                        {mod.lessons.map((item) => {
                          const active = item.slug === lesson.slug;
                          const done = state.completedLessonSlugs.includes(item.slug);
                          return (
                            <li key={item.id}>
                              <Link
                                href={ROUTES.lessonPlayer(course.slug, item.slug)}
                                className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition ${
                                  active
                                    ? 'bg-indigo-600 text-white font-semibold'
                                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`}
                              >
                                <span className="truncate">{item.title}</span>
                                {done ? (
                                  <CheckCircle2
                                    className={`h-3.5 w-3.5 shrink-0 ${
                                      active ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'
                                    }`}
                                    aria-label="Đã hoàn thành"
                                  />
                                ) : !item.isPreview && !commerceService.hasCourseEntitlement(state, course) ? (
                                  <Lock className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
                                ) : (
                                  <Play className="h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          ) : null}

          {/* Center Reading & Interactive Column */}
          <main
            id="main-content"
            className={
              focusMode
                ? 'mx-auto w-full max-w-[820px] lg:col-span-12'
                : 'lg:col-span-6'
            }
          >
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              {/* Lesson Metadata Header */}
              <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {lesson.isPreview ? (
                    <span className="rounded-md bg-teal-50 px-2.5 py-0.5 font-semibold text-teal-800 dark:bg-teal-950/70 dark:text-teal-300">
                      Bài học mở thử miễn phí
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Thời lượng đọc & tương tác: {lesson.estimatedMinutes} phút</span>
                  </span>
                  {state.role === 'teacher' ? (
                    <Link
                      href={ROUTES.lessonEditor(lesson.slug)}
                      className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2.5 py-0.5 font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Mở trong Trình soạn thảo Block</span>
                    </Link>
                  ) : null}
                </div>

                <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                  {lesson.title}
                </h1>

                {/* Learning Objectives Box */}
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-wide text-indigo-700 uppercase dark:text-indigo-300">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    <span>Mục tiêu cần nắm vững sau bài học</span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-700 sm:text-sm dark:text-slate-300">
                    {lesson.objectives.map((obj) => (
                      <li key={obj} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Entitlement Check or Lesson Blocks */}
              {!canAccess ? (
                <div className="my-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-6 text-center dark:border-amber-900/60 dark:bg-amber-950/30">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    <Lock className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                    Bài học này thuộc phần chuyên sâu của khóa học
                  </h2>
                  <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-600 dark:text-slate-300">
                    Trong bản Demo giao diện, bạn có thể bấm nút bên dưới để kích hoạt ngay quyền truy cập khóa học (lưu trên trình duyệt, không phát sinh thanh toán).
                  </p>
                  <button
                    type="button"
                    onClick={() => enrollCourseDemo(course.slug)}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer"
                  >
                    <Unlock className="h-4 w-4" aria-hidden="true" />
                    <span>Kích hoạt quyền học khóa này (Demo)</span>
                  </button>
                </div>
              ) : (
                <div>
                  {visibleBlocks.map((block) => (
                    <LessonBlockRenderer
                      key={block.id}
                      block={block}
                      viewMode={effectiveViewMode}
                    />
                  ))}
                </div>
              )}

              {/* Lesson Footer: Mark Complete & Prev/Next Navigation */}
              <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {adjacent.prev ? (
                    <Link
                      href={ROUTES.lessonPlayer(course.slug, adjacent.prev.slug)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      <span>Bài trước: {adjacent.prev.title}</span>
                    </Link>
                  ) : (
                    <span />
                  )}

                  {adjacent.next ? (
                    <Link
                      href={ROUTES.lessonPlayer(course.slug, adjacent.next.slug)}
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
                    >
                      <span>Bài tiếp: {adjacent.next.title}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <Link
                      href={ROUTES.courseDetail(course.slug)}
                      className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-teal-700"
                    >
                      <span>Hoàn tất học phần · Về trang khóa học</span>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          </main>

          {/* Right Notes & Related Practice Sidebar (hidden in Focus Mode) */}
          {!focusMode ? (
            <aside aria-label="Ghi chú cá nhân và bài tập liên quan" className="lg:col-span-3">
              <div className="sticky top-20 space-y-5">
                {/* Personal Notes Box */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <NotebookPen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                      <span>Ghi chú bài học (Lưu trình duyệt)</span>
                    </div>
                    <Link
                      href={ROUTES.learnerNotes}
                      className="text-[11px] font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Sổ tay →
                    </Link>
                  </div>

                  <form onSubmit={handleSaveNote} className="mt-3">
                    <label htmlFor="lesson-note-textarea" className="sr-only">
                      Nội dung ghi chú cho bài học
                    </label>
                    <textarea
                      id="lesson-note-textarea"
                      rows={5}
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      placeholder="Ghi lại công thức truy hồi, điều kiện biên hoặc câu hỏi cần ôn lại..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs leading-relaxed text-slate-900 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="mt-2.5 w-full rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
                    >
                      Lưu ghi chú vào Sổ tay
                    </button>
                  </form>
                </div>

                {/* Related Coding Problems */}
                {relatedProblems.length > 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <TerminalSquare className="h-4 w-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                      <span>Bài tập luyện code liên quan</span>
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {relatedProblems.map((prob) => (
                        <li
                          key={prob.id}
                          className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50"
                        >
                          <div className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                            {prob.code}
                          </div>
                          <Link
                            href={ROUTES.codingLab(prob.slug)}
                            className="mt-0.5 block text-xs font-semibold text-slate-900 hover:text-indigo-600 dark:text-white"
                          >
                            {prob.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
