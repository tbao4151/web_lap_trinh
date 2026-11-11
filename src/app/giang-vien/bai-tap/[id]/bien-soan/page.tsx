'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, ExternalLink } from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService } from '@/services';
import type { Difficulty, Problem, ProgrammingLanguage } from '@/types';

export default function TeacherProblemEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { state, saveProblem } = useAppState();

  const source = problemService.getBySlugOrId(state, id);
  const [draft, setDraft] = useState<Problem | undefined>(source);
  const [activeStarterLang, setActiveStarterLang] = useState<ProgrammingLanguage>('cpp');

  useEffect(() => {
    if (source && (!draft || draft.id !== source.id)) {
      setDraft(source);
    }
  }, [source, draft]);

  if (!draft) {
    return (
      <WorkspaceShell
        surface="teacher"
        title="Không tìm thấy bài tập"
        subtitle="Mã bài tập không tồn tại trong Ngân hàng đề."
      >
        <EmptyState
          title="Không tìm thấy bài tập cần biên soạn"
          description="Vui lòng quay lại Ngân hàng bài tập để chọn lại."
          actionLabel="Về Ngân hàng bài tập"
          actionHref={ROUTES.teacherProblemBank}
        />
      </WorkspaceShell>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveProblem(draft);
  };

  return (
    <WorkspaceShell
      surface="teacher"
      title={`Biên soạn đề: ${draft.code} — ${draft.title}`}
      subtitle={`Giới hạn: ${draft.timeLimitMs}ms / ${draft.memoryLimitMb}MB • ${draft.testGroups.length} Subtasks`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={ROUTES.teacherProblemBank}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Ngân hàng đề</span>
          </Link>
          <Link
            href={ROUTES.codingLab(draft.slug)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <span>Kiểm thử trong Coding Lab</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lưu đề bài</span>
          </button>
        </div>
      }
    >
      <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-12">
        {/* Left: Statement, Format, Samples */}
        <div className="space-y-6 lg:col-span-7">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              1. Phát biểu bài toán & Định dạng vào/ra
            </h2>

            <div className="mt-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Mã bài
                  </label>
                  <input
                    type="text"
                    value={draft.code}
                    onChange={(e) => setDraft({ ...draft, code: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-sm font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Tiêu đề bài toán
                  </label>
                  <input
                    type="text"
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Nội dung đề bài (Statement)
                </label>
                <textarea
                  rows={5}
                  value={draft.statement}
                  onChange={(e) => setDraft({ ...draft, statement: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Định dạng dữ liệu vào (Input)
                  </label>
                  <textarea
                    rows={3}
                    value={draft.inputFormat}
                    onChange={(e) => setDraft({ ...draft, inputFormat: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Định dạng kết quả ra (Output)
                  </label>
                  <textarea
                    rows={3}
                    value={draft.outputFormat}
                    onChange={(e) => setDraft({ ...draft, outputFormat: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Samples */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                2. Bộ ví dụ mẫu (Sample I/O)
              </h2>
              <button
                type="button"
                onClick={() =>
                  setDraft({
                    ...draft,
                    samples: [
                      ...draft.samples,
                      { input: '3\n1 2 3', output: '6', explanation: 'Giải thích ví dụ mới' },
                    ],
                  })
                }
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Thêm ví dụ</span>
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {draft.samples.map((sp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Ví dụ #{idx + 1}
                    </span>
                    {draft.samples.length > 1 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            samples: draft.samples.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Xóa
                      </button>
                    ) : null}
                  </div>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500">
                        Sample Input
                      </label>
                      <textarea
                        rows={3}
                        value={sp.input}
                        onChange={(e) => {
                          const next = [...draft.samples];
                          next[idx] = { ...sp, input: e.target.value };
                          setDraft({ ...draft, samples: next });
                        }}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500">
                        Sample Output
                      </label>
                      <textarea
                        rows={3}
                        value={sp.output}
                        onChange={(e) => {
                          const next = [...draft.samples];
                          next[idx] = { ...sp, output: e.target.value };
                          setDraft({ ...draft, samples: next });
                        }}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Starter Code */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                3. Mã nguồn khởi tạo (Starter Code)
              </h2>
              <div className="flex gap-1">
                {(['cpp', 'python', 'c', 'java'] as ProgrammingLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveStarterLang(lang)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold uppercase ${
                      activeStarterLang === lang
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={8}
              value={draft.starterCode[activeStarterLang]}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  starterCode: {
                    ...draft.starterCode,
                    [activeStarterLang]: e.target.value,
                  },
                })
              }
              className="mt-3 w-full rounded-xl border border-slate-300 bg-slate-950 p-3.5 font-mono text-xs text-slate-100 dark:border-slate-700"
            />
          </section>
        </div>

        {/* Right: Limits, Constraints, Subtasks */}
        <div className="space-y-6 lg:col-span-5">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Giới hạn Thực thi & Độ khó
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Độ khó
                </label>
                <select
                  value={draft.difficulty}
                  onChange={(e) =>
                    setDraft({ ...draft, difficulty: e.target.value as Difficulty })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="beginner">Mới bắt đầu</option>
                  <option value="intermediate">Trung cấp</option>
                  <option value="advanced">Nâng cao</option>
                  <option value="competition">Thi đấu / HSG</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Giới hạn thời gian (ms)
                  </label>
                  <input
                    type="number"
                    value={draft.timeLimitMs}
                    onChange={(e) =>
                      setDraft({ ...draft, timeLimitMs: Number(e.target.value) || 1000 })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Giới hạn bộ nhớ (MB)
                  </label>
                  <input
                    type="number"
                    value={draft.memoryLimitMb}
                    onChange={(e) =>
                      setDraft({ ...draft, memoryLimitMb: Number(e.target.value) || 256 })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Ràng buộc dữ liệu (mỗi dòng 1 ràng buộc)
                </label>
                <textarea
                  rows={3}
                  value={draft.constraints.join('\n')}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      constraints: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Cấu hình Subtask chấm điểm ({draft.testGroups.length})
              </h2>
              <button
                type="button"
                onClick={() =>
                  setDraft({
                    ...draft,
                    testGroups: [
                      ...draft.testGroups,
                      {
                        id: `tg-${Date.now()}`,
                        name: `Subtask ${draft.testGroups.length + 1}`,
                        points: 20,
                        constraintsNote: 'N <= 10^5',
                        testcaseCount: 5,
                      },
                    ],
                  })
                }
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Thêm Subtask</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {draft.testGroups.map((tg, idx) => (
                <div
                  key={tg.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={tg.name}
                      onChange={(e) => {
                        const next = [...draft.testGroups];
                        next[idx] = { ...tg, name: e.target.value };
                        setDraft({ ...draft, testGroups: next });
                      }}
                      className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold dark:border-slate-700 dark:bg-slate-900"
                    />
                    {draft.testGroups.length > 1 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            testGroups: draft.testGroups.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500">Điểm số</span>
                      <input
                        type="number"
                        value={tg.points}
                        onChange={(e) => {
                          const next = [...draft.testGroups];
                          next[idx] = { ...tg, points: Number(e.target.value) || 0 };
                          setDraft({ ...draft, testGroups: next });
                        }}
                        className="mt-0.5 w-full rounded-lg border border-slate-300 bg-white px-2 py-1 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500">Ràng buộc</span>
                      <input
                        type="text"
                        value={tg.constraintsNote}
                        onChange={(e) => {
                          const next = [...draft.testGroups];
                          next[idx] = { ...tg, constraintsNote: e.target.value };
                          setDraft({ ...draft, testGroups: next });
                        }}
                        className="mt-0.5 w-full rounded-lg border border-slate-300 bg-white px-2 py-1 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </form>
    </WorkspaceShell>
  );
}
