'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Plus, FileEdit, ExternalLink } from 'lucide-react';
import { DOMAINS, ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DifficultyBadge, LanguageBadge } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService } from '@/services';
import type { Difficulty, Problem } from '@/types';

export default function TeacherProblemBankPage() {
  const router = useRouter();
  const { state, saveProblem } = useAppState();
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');

  const problems = problemService.list(state, { query, difficulty });

  const handleCreateDraftProblem = () => {
    const nextNum = state.problems.length + 1;
    const code = `P${String(nextNum).padStart(3, '0')}`;
    const slug = `bai-tap-moi-${Date.now().toString().slice(-4)}`;
    const newProb: Problem = {
      id: `prob-${Date.now()}`,
      code,
      slug,
      title: `Bài toán mới ${code}: Kiểm tra điều kiện mảng`,
      domainId: 'thuat-toan-hsg',
      difficulty: 'intermediate',
      goals: ['competitive', 'high-school'],
      tags: ['Mảng 1 chiều', 'Bản nháp'],
      supportedLanguages: ['cpp', 'python', 'c', 'java'],
      timeLimitMs: 1000,
      memoryLimitMb: 256,
      statement:
        'Cho mảng gồm N số nguyên. Hãy tính tổng các phần tử thỏa mãn điều kiện đề bài.',
      inputFormat: 'Dòng 1 gồm số nguyên N. Dòng 2 gồm N số nguyên.',
      outputFormat: 'In ra một số nguyên duy nhất là kết quả.',
      constraints: ['1 <= N <= 10^5', '|A[i]| <= 10^9'],
      samples: [{ input: '4\n1 2 3 4', output: '10', explanation: 'Tổng 4 phần tử là 10.' }],
      hints: ['Sử dụng kiểu dữ liệu 64-bit để tránh tràn số.'],
      starterCode: {
        c: '#include <stdio.h>\nint main() {\n    return 0;\n}',
        cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}',
        python: 'import sys\n\ndef solve():\n    pass\n\nsolve()',
        java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {}\n}',
      },
      testGroups: [
        {
          id: `tg-${Date.now()}-1`,
          name: 'Subtask 1 (50% số điểm)',
          points: 50,
          constraintsNote: 'N <= 1,000',
          testcaseCount: 5,
        },
        {
          id: `tg-${Date.now()}-2`,
          name: 'Subtask 2 (50% số điểm)',
          points: 50,
          constraintsNote: 'N <= 100,000',
          testcaseCount: 5,
        },
      ],
      visibility: 'draft',
    };
    saveProblem(newProb);
    router.push(ROUTES.problemEditor(newProb.id));
  };

  return (
    <WorkspaceShell
      surface="teacher"
      title="Ngân hàng Bài tập & Chuyên đề"
      subtitle="Quản lý đề bài, bộ test mẫu, ràng buộc Subtask và mã nguồn khởi tạo đa ngôn ngữ"
      actions={
        <button
          type="button"
          onClick={handleCreateDraftProblem}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Tạo bài tập mới</span>
        </button>
      }
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="relative min-w-[260px] flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo mã bài (P001..P012), tiêu đề, chủ đề..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty | 'all')}
          aria-label="Lọc theo độ khó"
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        >
          <option value="all">Tất cả độ khó ({state.problems.length})</option>
          <option value="beginner">Mới bắt đầu</option>
          <option value="intermediate">Trung cấp</option>
          <option value="advanced">Nâng cao</option>
          <option value="competition">Thi đấu / HSG</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {problems.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="Không tìm thấy bài tập"
              description="Thử từ khóa khác hoặc tạo bài tập mới."
              actionLabel="Đặt lại bộ lọc"
              onAction={() => {
                setQuery('');
                setDifficulty('all');
              }}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60">
                  <th className="px-4 py-3.5">Mã</th>
                  <th className="px-4 py-3.5">Tên bài & Tags</th>
                  <th className="px-4 py-3.5">Mảng</th>
                  <th className="px-4 py-3.5">Độ khó</th>
                  <th className="px-4 py-3.5">Subtask / Giới hạn</th>
                  <th className="px-4 py-3.5">Ngôn ngữ</th>
                  <th className="px-4 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                {problems.map((p) => {
                  const domain = DOMAINS.find((d) => d.id === p.domainId);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {p.code}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">{p.title}</div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 dark:text-slate-300">
                        {domain?.name ?? p.domainId}
                      </td>
                      <td className="px-4 py-3.5">
                        <DifficultyBadge difficulty={p.difficulty} />
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-600 dark:text-slate-300">
                        {p.testGroups.length} Subtasks • {p.timeLimitMs}ms / {p.memoryLimitMb}MB
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {p.supportedLanguages.map((l) => (
                            <LanguageBadge key={l} language={l} />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={ROUTES.problemEditor(p.id)}
                            className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                          >
                            <FileEdit className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Biên soạn</span>
                          </Link>
                          <Link
                            href={ROUTES.codingLab(p.slug)}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                            title="Mở trong Coding Lab"
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
        )}
      </div>
    </WorkspaceShell>
  );
}
