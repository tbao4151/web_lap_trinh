'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, TerminalSquare, ArrowUpRight } from 'lucide-react';
import { DOMAINS, ROUTES } from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { DifficultyBadge, LanguageBadge, ProblemSolveBadge } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService } from '@/services';
import type { Difficulty, ProgrammingLanguage } from '@/types';

export default function PublicProblemBankPage() {
  const { state } = useAppState();
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [language, setLanguage] = useState<ProgrammingLanguage | 'all'>('all');
  const [domainId, setDomainId] = useState<string>('all');

  const problems = problemService.list(state, {
    query,
    difficulty,
    language,
    domainId,
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <PublicHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                <TerminalSquare className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ngân hàng bài tập thuật toán & lập trình</span>
              </span>
              <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                Kho bài tập đa ngôn ngữ (C, C++, Python, Java)
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Mỗi bài tập đều có phân tích Subtask, giới hạn dữ liệu rõ ràng và tích hợp sẵn môi
                trường Coding Lab trong trình duyệt.
              </p>
            </div>
            <Link
              href={ROUTES.practiceBank}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              <span>Mở chế độ Luyện tập Học viên</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Filter bar */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo mã P001, tên bài, chủ đề..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <select
              value={domainId}
              onChange={(e) => setDomainId(e.target.value)}
              aria-label="Lọc theo mảng kiến thức"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="all">Tất cả mảng kiến thức</option>
              {DOMAINS.filter((d) => d.requiresCodeEditor).map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty | 'all')}
              aria-label="Lọc theo độ khó"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="all">Tất cả độ khó</option>
              <option value="beginner">Mới bắt đầu</option>
              <option value="intermediate">Trung cấp</option>
              <option value="advanced">Nâng cao</option>
              <option value="competition">Thi đấu / HSG</option>
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage | 'all')}
              aria-label="Lọc theo ngôn ngữ"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="all">Hỗ trợ mọi ngôn ngữ</option>
              <option value="cpp">C++ (G++ C++20)</option>
              <option value="python">Python 3</option>
              <option value="c">C (GCC C17)</option>
              <option value="java">Java 21</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          {problems.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="Không có bài tập khớp bộ lọc"
                description="Hãy thử xóa từ khóa tìm kiếm hoặc chọn độ khó khác."
                actionLabel="Đặt lại bộ lọc"
                onAction={() => {
                  setQuery('');
                  setDifficulty('all');
                  setLanguage('all');
                  setDomainId('all');
                }}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60">
                    <th className="px-4 py-3.5">Mã</th>
                    <th className="px-4 py-3.5">Tên bài toán & Chủ đề</th>
                    <th className="px-4 py-3.5">Độ khó</th>
                    <th className="px-4 py-3.5">Ngôn ngữ</th>
                    <th className="px-4 py-3.5">Trạng thái (Demo)</th>
                    <th className="px-4 py-3.5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                  {problems.map((prob) => {
                    const solveState = state.solvedProblemSlugs.includes(prob.slug)
                      ? 'solved'
                      : state.attemptedProblemSlugs.includes(prob.slug)
                        ? 'attempted'
                        : 'unsolved';
                    return (
                      <tr
                        key={prob.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                      >
                        <td className="px-4 py-3.5 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {prob.code}
                        </td>
                        <td className="px-4 py-3.5">
                          <Link
                            href={ROUTES.codingLab(prob.slug)}
                            className="font-bold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                          >
                            {prob.title}
                          </Link>
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {prob.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <DifficultyBadge difficulty={prob.difficulty} />
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {prob.supportedLanguages.map((l) => (
                              <LanguageBadge key={l} language={l} />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <ProblemSolveBadge state={solveState} />
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <Link
                            href={ROUTES.codingLab(prob.slug)}
                            className="inline-flex items-center gap-1 rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                          >
                            <span>Mở Coding Lab</span>
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
