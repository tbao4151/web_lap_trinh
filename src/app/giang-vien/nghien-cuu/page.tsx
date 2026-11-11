'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FlaskConical, Sparkles, FileEdit, CheckCircle2, TerminalSquare } from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService } from '@/services';

export default function TeacherResearchWorkspacePage() {
  const router = useRouter();
  const { state, convertResearchToLessonDraft } = useAppState();

  const handleConvert = (researchId: string) => {
    const draftLesson = convertResearchToLessonDraft(researchId);
    if (draftLesson) {
      router.push(ROUTES.lessonEditor(draftLesson.slug));
    }
  };

  return (
    <WorkspaceShell
      surface="teacher"
      title="Không gian Nghiên cứu Chuyên đề & Sư phạm"
      subtitle="Đối chiếu độ phức tạp các thuật toán, lưu trữ phản ví dụ và chuyển hóa thành bài giảng tương tác"
    >
      <div className="space-y-6">
        {state.researchNotes.map((note) => (
          <article
            key={note.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Chuyên đề: {note.topicTag}</span>
              </span>
              <span className="font-mono text-xs text-slate-400">
                Cập nhật: {note.updatedAt}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
              {note.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {note.summary}
            </p>

            {/* Approaches Comparison Table */}
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 font-bold text-slate-600 uppercase dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    <th className="px-4 py-3">Phương pháp tiếp cận</th>
                    <th className="px-4 py-3">Thời gian</th>
                    <th className="px-4 py-3">Bộ nhớ</th>
                    <th className="px-4 py-3">Phạm vi áp dụng & Lưu ý sư phạm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                  {note.approaches.map((ap) => (
                    <tr key={ap.name}>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {ap.name}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {ap.timeComplexity}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                        {ap.spaceComplexity}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {ap.suitability}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <TerminalSquare className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" />
                  <span>Bài tập gắn kèm:</span>
                </span>
                {note.linkedProblemSlugs.map((slug) => {
                  const p = problemService.getBySlugOrId(state, slug);
                  return (
                    <Link
                      key={slug}
                      href={ROUTES.codingLab(slug)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                    >
                      {p ? `${p.code} — ${p.title}` : slug}
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {note.convertedToLessonDraft ? (
                  <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Đã đồng bộ thành bài giảng</span>
                  </span>
                ) : null}

                <button
                  type="button"
                  onClick={() => handleConvert(note.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Chuyển thành Bản nháp Bài học & Mở Block Editor</span>
                </button>

                {note.linkedLessonId ? (
                  <Link
                    href={ROUTES.lessonEditor(note.linkedLessonId)}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                  >
                    <FileEdit className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Mở bài học gốc</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </WorkspaceShell>
  );
}
