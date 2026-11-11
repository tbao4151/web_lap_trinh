'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  RotateCcw,
  CheckCircle2,
  Clock,
  CircleDot,
  ArrowUpRight,
  FileCode2,
} from 'lucide-react';
import {
  DIFFICULTY_META,
  DOMAINS,
  LANGUAGE_META,
  ROUTES,
} from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DifficultyBadge, LanguageBadges } from '@/components/ui/Badges';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService } from '@/services';
import type { Difficulty, ProgrammingLanguage } from '@/types';

export default function PracticeBankPage() {
  const { state } = useAppState();

  const [query, setQuery] = useState('');
  const [solveState, setSolveState] = useState<'all' | 'unsolved' | 'attempted' | 'solved'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [domainId, setDomainId] = useState<string>('all');
  const [language, setLanguage] = useState<ProgrammingLanguage | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const p of state.problems) {
      for (const t of p.tags) set.add(t);
    }
    return Array.from(set);
  }, [state.problems]);

  const problems = useMemo(
    () =>
      problemService.list(state, {
        query,
        solveState,
        difficulty,
        domainId,
        language,
        tag: selectedTag,
      }),
    [state, query, solveState, difficulty, domainId, language, selectedTag]
  );

  const solvedSet = new Set(state.solvedProblemSlugs);
  const attemptedSet = new Set(state.attemptedProblemSlugs);

  const handleResetFilters = () => {
    setQuery('');
    setSolveState('all');
    setDifficulty('all');
    setDomainId('all');
    setLanguage('all');
    setSelectedTag('all');
  };

  return (
    <WorkspaceShell
      surface="learner"
      title="Ngân hàng Bài tập Thực hành (Coding Lab)"
      subtitle="Luyện tập 12+ bài toán chuẩn từ Nhập môn đến Quy hoạch động với C, C++, Python và Java."
      actions={
        <Link
          href={ROUTES.submissionDetail('sub-demo-ac-coin')}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <FileCode2 className="h-4 w-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
          <span>Xem kết quả chấm mẫu (AC/WA/TLE/CE)</span>
        </Link>
      }
    >
      {/* Filter Card */}
      <section
        aria-label="Bộ lọc bài tập"
        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-4">
            <label htmlFor="prob-search" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tìm theo mã bài (P001..P012), tên bài, chủ đề
            </label>
            <div className="relative mt-1">
              <Search
                className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="prob-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ví dụ: P009, Đổi tiền, Tìm kiếm nhị phân..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="prob-status" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Trạng thái giải
            </label>
            <select
              id="prob-status"
              value={solveState}
              onChange={(e) =>
                setSolveState(e.target.value as 'all' | 'unsolved' | 'attempted' | 'solved')
              }
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">Tất cả ({state.problems.length})</option>
              <option value="solved">Đã giải ({state.solvedProblemSlugs.length})</option>
              <option value="attempted">Đang làm</option>
              <option value="unsolved">Chưa làm</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="prob-diff" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Độ khó
            </label>
            <select
              id="prob-diff"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty | 'all')}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">Mọi độ khó</option>
              {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((d) => (
                <option key={d} value={d}>
                  {DIFFICULTY_META[d].label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="prob-domain" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Lĩnh vực
            </label>
            <select
              id="prob-domain"
              value={domainId}
              onChange={(e) => setDomainId(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">Mọi lĩnh vực</option>
              {DOMAINS.filter((d) => d.requiresCodeEditor).map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="prob-lang" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Ngôn ngữ hỗ trợ
            </label>
            <select
              id="prob-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage | 'all')}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">Tất cả 4 ngôn ngữ</option>
              {(['c', 'cpp', 'python', 'java'] as ProgrammingLanguage[]).map((lang) => (
                <option key={lang} value={lang}>
                  {LANGUAGE_META[lang].shortLabel}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tag chips */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3.5 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500">Chủ đề:</span>
            <button
              type="button"
              onClick={() => setSelectedTag('all')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Tất cả
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>
      </section>

      {/* Problem Table / Responsive Cards */}
      <section className="mt-6" aria-label="Danh sách bài tập">
        {problems.length === 0 ? (
          <EmptyState
            title="Không tìm thấy bài tập khớp điều kiện lọc"
            description="Hãy thử chọn lại độ khó, trạng thái giải hoặc xóa từ khóa tìm kiếm."
            actionLabel="Đặt lại bộ lọc bài tập"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600 uppercase dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
                    <th className="px-4 py-3.5">Trạng thái</th>
                    <th className="px-4 py-3.5">Mã & Tên bài tập</th>
                    <th className="px-4 py-3.5">Chủ đề / Tags</th>
                    <th className="px-4 py-3.5">Độ khó</th>
                    <th className="px-4 py-3.5">Ngôn ngữ</th>
                    <th className="px-4 py-3.5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {problems.map((problem) => {
                    const isSolved = solvedSet.has(problem.slug);
                    const isAttempted = attemptedSet.has(problem.slug);

                    return (
                      <tr
                        key={problem.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                      >
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {isSolved ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Đã giải</span>
                            </span>
                          ) : isAttempted ? (
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Đang làm</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Chưa làm</span>
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3.5">
                          <Link
                            href={ROUTES.codingLab(problem.slug)}
                            className="font-bold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                          >
                            <span className="mr-2 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                              {problem.code}
                            </span>
                            {problem.title}
                          </Link>
                          <div className="mt-0.5 text-xs text-slate-500">
                            Giới hạn: {problem.timeLimitMs} ms · {problem.memoryLimitMb} MB ·{' '}
                            {problem.testGroups.length} Subtasks
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {problem.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <DifficultyBadge level={problem.difficulty} />
                        </td>

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <LanguageBadges languages={problem.supportedLanguages} compact />
                        </td>

                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <Link
                            href={ROUTES.codingLab(problem.slug)}
                            className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
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
          </div>
        )}
      </section>
    </WorkspaceShell>
  );
}
