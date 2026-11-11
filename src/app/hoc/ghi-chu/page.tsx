'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  Plus,
  Trash2,
  Edit3,
  Search,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import type { LearnerNote } from '@/types';

export default function LearnerNotesPage() {
  const { state, saveNote, deleteNote, toggleBookmarkLesson } = useAppState();
  const [query, setQuery] = useState('');
  const [editingNote, setEditingNote] = useState<LearnerNote | null>(null);
  const [newContent, setNewContent] = useState('');
  const [selectedLessonSlug, setSelectedLessonSlug] = useState('dp-1d-doi-tien');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const allLessons = Object.values(state.lessonsBySlug);

  const filteredNotes = state.notes.filter((n) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      n.lessonTitle.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleSaveNewOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    if (editingNote) {
      saveNote({
        id: editingNote.id,
        courseSlug: editingNote.courseSlug,
        lessonSlug: editingNote.lessonSlug,
        lessonTitle: editingNote.lessonTitle,
        content: newContent.trim(),
        isBookmarked: editingNote.isBookmarked,
        tags: editingNote.tags,
      });
      setEditingNote(null);
      setNewContent('');
      return;
    }

    const targetLesson = state.lessonsBySlug[selectedLessonSlug] ?? allLessons[0];
    if (!targetLesson) return;

    saveNote({
      courseSlug: targetLesson.courseSlug,
      lessonSlug: targetLesson.slug,
      lessonTitle: targetLesson.title,
      content: newContent.trim(),
      isBookmarked: true,
      tags: ['Sổ tay cá nhân'],
    });
    setNewContent('');
  };

  return (
    <WorkspaceShell
      surface="learner"
      title="Sổ tay Ghi chú & Đánh dấu bài học"
      subtitle="Lưu trữ công thức, bẫy sai lầm thường gặp và các bài học cần ôn tập lại"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left column: Note editor + Bookmarked lessons */}
        <div className="space-y-6 lg:col-span-5">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingNote ? `Chỉnh sửa ghi chú: ${editingNote.lessonTitle}` : 'Tạo ghi chú học tập mới'}
            </h2>

            <form onSubmit={handleSaveNewOrEdit} className="mt-3 space-y-3">
              {!editingNote ? (
                <div>
                  <label
                    htmlFor="note-lesson-select"
                    className="block text-xs font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Gắn với bài học
                  </label>
                  <select
                    id="note-lesson-select"
                    value={selectedLessonSlug}
                    onChange={(e) => setSelectedLessonSlug(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {allLessons.map((les) => (
                      <option key={les.slug} value={les.slug}>
                        {les.title}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="note-content-textarea"
                  className="block text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Nội dung ghi chú (công thức, lưu ý tràn số, độ phức tạp...)
                </label>
                <textarea
                  id="note-content-textarea"
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Ví dụ: Luôn kiểm tra dp[s - coin] != INF trước khi cộng 1..."
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{editingNote ? 'Cập nhật ghi chú' : 'Lưu vào sổ tay'}</span>
                </button>
                {editingNote ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNote(null);
                      setNewContent('');
                    }}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
                  >
                    Hủy
                  </button>
                ) : null}
              </div>
            </form>
          </section>

          {/* Bookmarked Lessons */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Bài học đã đánh dấu ({state.bookmarkedLessonSlugs.length})
              </h2>
              <Bookmark className="h-4 w-4 text-indigo-600" aria-hidden="true" />
            </div>

            {state.bookmarkedLessonSlugs.length === 0 ? (
              <p className="mt-3 text-xs text-slate-500">
                Bạn chưa đánh dấu bài học nào. Nhấn nút &ldquo;Đánh dấu&rdquo; trong khi đọc bài học để lưu vào
                đây.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {state.bookmarkedLessonSlugs.map((slug) => {
                  const les = state.lessonsBySlug[slug];
                  if (!les) return null;
                  return (
                    <li
                      key={slug}
                      className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
                    >
                      <div className="min-w-0">
                        <Link
                          href={ROUTES.lessonPlayer(les.courseSlug, les.slug)}
                          className="block truncate text-xs font-bold text-slate-900 hover:text-indigo-600 dark:text-white"
                        >
                          {les.title}
                        </Link>
                        <span className="text-[11px] text-slate-500">
                          {les.estimatedMinutes} phút đọc
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleBookmarkLesson(slug)}
                        className="shrink-0 rounded-lg px-2 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400"
                      >
                        Bỏ dấu
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        {/* Right column: Notes list */}
        <div className="space-y-4 lg:col-span-7">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm trong sổ tay ghi chú..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-xs text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {filteredNotes.length === 0 ? (
            <EmptyState
              title="Chưa có ghi chú nào khớp tìm kiếm"
              description="Hãy thêm ghi chú mới ở khung bên trái hoặc xóa bộ lọc tìm kiếm."
              actionLabel="Xóa từ khóa"
              onAction={() => setQuery('')}
            />
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Link
                        href={ROUTES.lessonPlayer(note.courseSlug, note.lessonSlug)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        <BookOpen className="h-4 w-4" aria-hidden="true" />
                        <span>{note.lessonTitle}</span>
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </Link>
                      <div className="mt-0.5 text-[11px] text-slate-400">
                        Cập nhật: {note.updatedAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNote(note);
                          setNewContent(note.content);
                        }}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Chỉnh sửa ghi chú"
                      >
                        <Edit3 className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(note.id)}
                        className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50 dark:text-rose-400"
                        title="Xóa ghi chú"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {note.content}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTargetId)}
        title="Xóa ghi chú này khỏi sổ tay?"
        description="Ghi chú sẽ bị xóa khỏi bộ nhớ phiên trình duyệt hiện tại."
        confirmLabel="Xóa ghi chú"
        variant="danger"
        onCancel={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteNote(deleteTargetId);
          setDeleteTargetId(null);
        }}
      />
    </WorkspaceShell>
  );
}
