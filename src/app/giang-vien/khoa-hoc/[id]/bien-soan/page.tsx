'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Edit3,
  CheckCircle2,
} from 'lucide-react';
import {
  DIFFICULTY_META,
  DOMAINS,
  GOAL_META,
  LANGUAGE_META,
  ROUTES,
} from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService } from '@/services';
import type {
  Course,
  CourseModule,
  Difficulty,
  LearningGoal,
  LessonSummary,
  ProgrammingLanguage,
} from '@/types';

export default function CourseBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { state, updateCourse } = useAppState();

  const sourceCourse = courseService.getById(state, id);
  const [draft, setDraft] = useState<Course | null>(null);
  const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<
    | { type: 'module'; moduleId: string; title: string }
    | { type: 'lesson'; moduleId: string; lessonId: string; title: string }
    | null
  >(null);

  useEffect(() => {
    if (sourceCourse) {
      setDraft(structuredClone(sourceCourse));
    }
  }, [sourceCourse]);

  if (!sourceCourse || !draft) {
    return (
      <WorkspaceShell
        surface="teacher"
        title="Không tìm thấy khóa học"
        subtitle="Khóa học bạn muốn biên soạn không tồn tại."
      >
        <EmptyState
          title="Không tìm thấy khóa học"
          description="Hãy quay lại Danh sách khóa học để chọn khóa cần biên soạn."
          actionLabel="Về Quản lý khóa học"
          actionHref={ROUTES.teacherCourses}
        />
      </WorkspaceShell>
    );
  }

  const handleSaveDraft = () => {
    updateCourse({
      ...draft,
      updatedAt: new Date().toISOString().slice(0, 10),
    });
  };

  const handleTogglePublish = () => {
    const nextVisibility = draft.visibility === 'published' ? 'draft' : 'published';
    const nextCourse: Course = {
      ...draft,
      visibility: nextVisibility,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setDraft(nextCourse);
    updateCourse(nextCourse);
  };

  const handleAddModule = () => {
    const newMod: CourseModule = {
      id: `mod-${Date.now()}`,
      title: `Học phần ${draft.modules.length + 1}: Chuyên đề mới`,
      description: 'Mô tả tóm tắt nội dung học phần.',
      order: draft.modules.length + 1,
      lessons: [
        {
          id: `les-${Date.now()}`,
          slug: `bai-hoc-${Date.now().toString().slice(-4)}`,
          title: 'Bài học mới: Khái niệm & Ví dụ mẫu',
          order: 1,
          estimatedMinutes: 25,
          isPreview: true,
          primaryType: 'theory',
        },
      ],
    };
    setDraft({
      ...draft,
      modules: [...draft.modules, newMod],
    });
  };

  const handleMoveModule = (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= draft.modules.length) return;
    const nextModules = [...draft.modules];
    const [removed] = nextModules.splice(index, 1);
    nextModules.splice(targetIdx, 0, removed);
    setDraft({
      ...draft,
      modules: nextModules.map((m, idx) => ({ ...m, order: idx + 1 })),
    });
  };

  const handleAddLesson = (moduleId: string) => {
    const suffix = Date.now().toString().slice(-4);
    const newLesson: LessonSummary = {
      id: `les-${Date.now()}`,
      slug: `bai-${suffix}`,
      title: `Bài học mới (${suffix})`,
      order: 1,
      estimatedMinutes: 30,
      isPreview: false,
      primaryType: 'interactive',
    };
    setDraft({
      ...draft,
      modules: draft.modules.map((mod) => {
        if (mod.id !== moduleId) return mod;
        const lessons = [...mod.lessons, { ...newLesson, order: mod.lessons.length + 1 }];
        return { ...mod, lessons };
      }),
    });
  };

  const handleMoveLesson = (moduleId: string, lessonIndex: number, direction: -1 | 1) => {
    setDraft({
      ...draft,
      modules: draft.modules.map((mod) => {
        if (mod.id !== moduleId) return mod;
        const targetIdx = lessonIndex + direction;
        if (targetIdx < 0 || targetIdx >= mod.lessons.length) return mod;
        const nextLessons = [...mod.lessons];
        const [removed] = nextLessons.splice(lessonIndex, 1);
        nextLessons.splice(targetIdx, 0, removed);
        return {
          ...mod,
          lessons: nextLessons.map((l, idx) => ({ ...l, order: idx + 1 })),
        };
      }),
    });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'module') {
      setDraft({
        ...draft,
        modules: draft.modules
          .filter((m) => m.id !== deleteTarget.moduleId)
          .map((m, idx) => ({ ...m, order: idx + 1 })),
      });
    } else {
      setDraft({
        ...draft,
        modules: draft.modules.map((mod) => {
          if (mod.id !== deleteTarget.moduleId) return mod;
          return {
            ...mod,
            lessons: mod.lessons
              .filter((l) => l.id !== deleteTarget.lessonId)
              .map((l, idx) => ({ ...l, order: idx + 1 })),
          };
        }),
      });
    }
    setDeleteTarget(null);
  };

  const toggleLanguage = (lang: ProgrammingLanguage) => {
    const exists = draft.languages.includes(lang);
    if (exists && draft.languages.length === 1) return;
    setDraft({
      ...draft,
      languages: exists
        ? draft.languages.filter((l) => l !== lang)
        : [...draft.languages, lang],
    });
  };

  const toggleGoal = (goal: LearningGoal) => {
    const exists = draft.goals.includes(goal);
    if (exists && draft.goals.length === 1) return;
    setDraft({
      ...draft,
      goals: exists ? draft.goals.filter((g) => g !== goal) : [...draft.goals, goal],
    });
  };

  return (
    <WorkspaceShell
      surface="teacher"
      title={`Course Builder: ${draft.title}`}
      subtitle={`Đường dẫn: /khoa-hoc/${draft.slug} · Trạng thái: ${
        draft.visibility === 'published' ? 'Đã xuất bản' : 'Bản nháp (Draft)'
      }`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={ROUTES.teacherCourses}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Danh sách khóa</span>
          </Link>

          <Link
            href={ROUTES.courseDetail(draft.slug)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Xem trước</span>
          </Link>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lưu cấu trúc (Persist)</span>
          </button>

          <button
            type="button"
            onClick={() => setPublishConfirmOpen(true)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-white cursor-pointer ${
              draft.visibility === 'published'
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>
              {draft.visibility === 'published'
                ? 'Chuyển về Bản nháp'
                : 'Xuất bản Demo'}
            </span>
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Course Metadata Form */}
        <section
          aria-label="Thông tin chung khóa học"
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Thông tin & Phân loại Khóa học
          </h2>

          <div>
            <label htmlFor="cb-title" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tiêu đề khóa học
            </label>
            <input
              id="cb-title"
              type="text"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cb-slug" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Đường dẫn (Slug)
              </label>
              <input
                id="cb-slug"
                type="text"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="cb-price" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Học phí Demo (VNĐ, 0 = Miễn phí)
              </label>
              <input
                id="cb-price"
                type="number"
                min={0}
                step={50000}
                value={draft.priceVnd}
                onChange={(e) =>
                  setDraft({ ...draft, priceVnd: Math.max(0, Number(e.target.value) || 0) })
                }
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cb-domain" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Lĩnh vực
              </label>
              <select
                id="cb-domain"
                value={draft.domainId}
                onChange={(e) => setDraft({ ...draft, domainId: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cb-level" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Trình độ kiến thức
              </label>
              <select
                id="cb-level"
                value={draft.level}
                onChange={(e) => setDraft({ ...draft, level: e.target.value as Difficulty })}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((lv) => (
                  <option key={lv} value={lv}>
                    {DIFFICULTY_META[lv].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Ngôn ngữ lập trình áp dụng
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {(['c', 'cpp', 'python', 'java'] as ProgrammingLanguage[]).map((lang) => {
                const active = draft.languages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold cursor-pointer ${
                      active
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {LANGUAGE_META[lang].shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Mục tiêu học tập (Độc lập với trình độ)
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {(Object.keys(GOAL_META) as LearningGoal[]).map((g) => {
                const active = draft.goals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                      active
                        ? 'border-teal-600 bg-teal-600 text-white'
                        : 'border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {GOAL_META[g].label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="cb-short-desc" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Mô tả ngắn (hiển thị trên thẻ khóa học)
            </label>
            <textarea
              id="cb-short-desc"
              rows={2}
              value={draft.shortDescription}
              onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="cb-desc" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Mô tả chi tiết khóa học
            </label>
            <textarea
              id="cb-desc"
              rows={4}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </section>

        {/* Right Column: Module -> Lesson Outline Builder */}
        <section
          aria-label="Cấu trúc Học phần và Bài học"
          className="space-y-4 lg:col-span-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                2. Đề cương Học phần & Bài học ({draft.modules.length} học phần)
              </h2>
              <p className="text-xs text-slate-500">
                Thêm học phần, sắp xếp thứ tự bài học và mở Trình soạn thảo Block cho từng bài.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddModule}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>Thêm Học phần mới</span>
            </button>
          </div>

          {draft.modules.map((mod, modIdx) => (
            <div
              key={mod.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex flex-1 items-center gap-2">
                  <span className="rounded bg-indigo-50 px-2 py-0.5 font-mono text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    #{modIdx + 1}
                  </span>
                  <input
                    type="text"
                    value={mod.title}
                    aria-label={`Tên học phần ${modIdx + 1}`}
                    onChange={(e) => {
                      const nextTitle = e.target.value;
                      setDraft({
                        ...draft,
                        modules: draft.modules.map((m) =>
                          m.id === mod.id ? { ...m, title: nextTitle } : m
                        ),
                      });
                    }}
                    className="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveModule(modIdx, -1)}
                    disabled={modIdx === 0}
                    aria-label="Chuyển học phần lên trên"
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveModule(modIdx, 1)}
                    disabled={modIdx >= draft.modules.length - 1}
                    aria-label="Chuyển học phần xuống dưới"
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTarget({ type: 'module', moduleId: mod.id, title: mod.title })
                    }
                    aria-label="Xóa học phần"
                    className="rounded-lg border border-rose-200 bg-rose-50 p-1.5 text-rose-600 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Lessons List inside Module */}
              <div className="mt-3 space-y-2.5">
                {mod.lessons.map((lesson, lesIdx) => (
                  <div
                    key={lesson.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="flex min-w-[220px] flex-1 items-center gap-2">
                      <span className="font-mono text-xs text-slate-400">
                        {modIdx + 1}.{lesIdx + 1}
                      </span>
                      <input
                        type="text"
                        value={lesson.title}
                        aria-label="Tiêu đề bài học"
                        onChange={(e) => {
                          const nextTitle = e.target.value;
                          setDraft({
                            ...draft,
                            modules: draft.modules.map((m) =>
                              m.id !== mod.id
                                ? m
                                : {
                                    ...m,
                                    lessons: m.lessons.map((l) =>
                                      l.id === lesson.id ? { ...l, title: nextTitle } : l
                                    ),
                                  }
                            ),
                          });
                        }}
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lesson.isPreview}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setDraft({
                              ...draft,
                              modules: draft.modules.map((m) =>
                                m.id !== mod.id
                                  ? m
                                  : {
                                      ...m,
                                      lessons: m.lessons.map((l) =>
                                        l.id === lesson.id ? { ...l, isPreview: checked } : l
                                      ),
                                    }
                              ),
                            });
                          }}
                          className="rounded border-slate-300 text-indigo-600"
                        />
                        <span>Học thử</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleMoveLesson(mod.id, lesIdx, -1)}
                        disabled={lesIdx === 0}
                        aria-label="Đẩy bài học lên"
                        className="rounded border border-slate-200 bg-white p-1 text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 cursor-pointer"
                      >
                        <ArrowUp className="h-3 w-3" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveLesson(mod.id, lesIdx, 1)}
                        disabled={lesIdx >= mod.lessons.length - 1}
                        aria-label="Đẩy bài học xuống"
                        className="rounded border border-slate-200 bg-white p-1 text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 cursor-pointer"
                      >
                        <ArrowDown className="h-3 w-3" aria-hidden="true" />
                      </button>

                      <Link
                        href={ROUTES.lessonEditor(lesson.slug)}
                        className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                      >
                        <Edit3 className="h-3 w-3" aria-hidden="true" />
                        <span>Soạn Block</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: 'lesson',
                            moduleId: mod.id,
                            lessonId: lesson.id,
                            title: lesson.title,
                          })
                        }
                        aria-label="Xóa bài học"
                        className="rounded border border-rose-200 bg-rose-50 p-1 text-rose-600 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddLesson(mod.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-indigo-300 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Thêm bài học vào học phần này</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* Confirm Publish Dialog */}
      <ConfirmDialog
        open={publishConfirmOpen}
        title={
          draft.visibility === 'published'
            ? 'Chuyển khóa học về trạng thái Bản nháp?'
            : 'Xuất bản khóa học lên Danh mục Demo?'
        }
        description={
          draft.visibility === 'published'
            ? 'Khóa học sẽ được ẩn khỏi danh mục công khai cho tới khi bạn xuất bản lại.'
            : 'Khóa học sẽ xuất hiện ngay trên trang Danh mục khóa học (/khoa-hoc) trong phiên trình duyệt này.'
        }
        confirmLabel="Xác nhận thay đổi"
        onConfirm={handleTogglePublish}
        onCancel={() => setPublishConfirmOpen(false)}
      />

      {/* Confirm Delete Module/Lesson Dialog */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={`Xác nhận xóa "${deleteTarget?.title ?? ''}"?`}
        description="Thao tác này sẽ xóa mục đã chọn khỏi đề cương khóa học hiện tại."
        confirmLabel="Xóa khỏi đề cương"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </WorkspaceShell>
  );
}
