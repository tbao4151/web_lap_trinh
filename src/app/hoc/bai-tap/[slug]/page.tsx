'use client';

import React, { use, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Play,
  Send,
  Save,
  RotateCcw,
  Copy,
  Check,
  Clock,
  Cpu,
  Lightbulb,
  FlaskConical,
  ExternalLink,
  Columns2,
} from 'lucide-react';
import { LANGUAGE_META, ROUTES } from '@/config/brand';
import {
  DifficultyBadge,
  SubmissionStatusBadge,
  DemoBadge,
} from '@/components/ui/Badges';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService, submissionService } from '@/services';
import type { ProgrammingLanguage } from '@/types';

export default function CodingLabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const {
    state,
    getCodeDraft,
    saveCodeDraft,
    resetCodeDraft,
    showToast,
  } = useAppState();

  const problem = problemService.getBySlugOrId(state, slug);

  const [language, setLanguage] = useState<ProgrammingLanguage>('cpp');
  const [code, setCode] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const initializedInputForProblem = useRef<string | null>(null);
  const feedbackScopeRef = useRef<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyRequestRef = useRef(0);
  const [mobileTab, setMobileTab] = useState<'statement' | 'code' | 'result'>('statement');
  const [leftTab, setLeftTab] = useState<'statement' | 'hints' | 'submissions'>('statement');
  const [wideEditor, setWideEditor] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [judgeNotice, setJudgeNotice] = useState<{
    actionType: 'run' | 'submit';
    message: string;
  } | null>(null);

  useEffect(() => () => {
    copyRequestRef.current += 1;
    if (copyTimeoutRef.current !== null) clearTimeout(copyTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!problem) return;
    // Some exercises support only a subset of languages. Never display an
    // unsupported language or load an unrelated starter template.
    if (!problem.supportedLanguages.includes(language)) {
      setLanguage(problem.supportedLanguages[0]);
      return;
    }
    const starter = problem.starterCode[language] ?? '';
    const loaded = getCodeDraft(problem.slug, language, starter);
    setCode(loaded);
    // Updating a draft changes getCodeDraft's identity. Only changing the
    // problem/language should clear feedback; saving or simulating must not
    // erase the just-created demo result on the next effect run.
    const feedbackScope = `${problem.slug}::${language}`;
    if (feedbackScopeRef.current !== feedbackScope) {
      feedbackScopeRef.current = feedbackScope;
      copyRequestRef.current += 1;
      if (copyTimeoutRef.current !== null) {
        clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = null;
      }
      setCopied(false);
      setJudgeNotice(null);
    }
  }, [problem, language, getCodeDraft]);

  useEffect(() => {
    if (!problem || initializedInputForProblem.current === problem.slug) return;
    // Initialize once per problem, not whenever the input is empty. An empty
    // stdin is valid and must remain editable for manual test scenarios.
    initializedInputForProblem.current = problem.slug;
    setCustomInput(problem.samples[0]?.input ?? '');
  }, [problem]);

  if (!problem) {
    return (
      <main id="main-content" className="mx-auto max-w-4xl px-4 py-16">
        <EmptyState
          title="Không tìm thấy bài tập này"
          description="Mã bài tập hoặc đường dẫn không tồn tại trong Ngân hàng đề."
          actionLabel="Quay lại Ngân hàng bài tập"
          actionHref={ROUTES.practiceBank}
        />
      </main>
    );
  }

  // Only display demo submissions belonging to the current problem. Showing
  // unrelated seed records misrepresents the result and confuses learners.
  const displaySubmissions = problemService.getSampleSubmissions(state, problem.slug);

  const lineCount = Math.max(12, code.split('\n').length);

  const clearCopyFeedback = () => {
    copyRequestRef.current += 1;
    if (copyTimeoutRef.current !== null) {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }
    setCopied(false);
  };

  const handleLanguageSwitch = (nextLang: ProgrammingLanguage) => {
    if (nextLang === language || !problem.supportedLanguages.includes(nextLang)) return;
    // Save current language draft automatically before switching so no work is ever lost
    saveCodeDraft(problem.slug, language, code);
    clearCopyFeedback();
    setJudgeNotice(null);
    setLanguage(nextLang);
    showToast(
      `Đã chuyển sang ${LANGUAGE_META[nextLang].label}`,
      'Bản nháp của ngôn ngữ trước đã được lưu riêng tự động.',
      'info'
    );
  };

  const handleCodeChange = (nextCode: string) => {
    setCode(nextCode);
    clearCopyFeedback();
    setJudgeNotice(null);
    saveCodeDraft(problem.slug, language, nextCode);
  };

  const handleManualSave = () => {
    saveCodeDraft(problem.slug, language, code);
    showToast(
      'Đã lưu nháp mã nguồn',
      `Lưu riêng cho bài ${problem.code} (${LANGUAGE_META[language].shortLabel}).`,
      'success'
    );
  };

  const handleResetConfirm = () => {
    resetCodeDraft(problem.slug, language);
    setCode(problem.starterCode[language] ?? '');
    clearCopyFeedback();
    setJudgeNotice(null);
    setConfirmResetOpen(false);
    showToast('Đã khôi phục mã nguồn mẫu ban đầu', undefined, 'info');
  };

  const handleSimulateJudge = (actionType: 'run' | 'submit') => {
    saveCodeDraft(problem.slug, language, code);
    const sim = submissionService.simulateRunOrSubmit(state, problem.slug);
    setJudgeNotice({
      actionType,
      message: sim.message,
    });
    setMobileTab('result');
    showToast(
      actionType === 'run'
        ? 'Chạy thử ở chế độ Mô phỏng Giao diện'
        : 'Nộp bài ở chế độ Mô phỏng Giao diện',
      'Bản demo chưa biên dịch code thật. Xem chi tiết ở khung Kết quả bên dưới.',
      'warning'
    );
  };

  const handleCopyCode = async () => {
    clearCopyFeedback();
    const request = copyRequestRef.current;
    try {
      await navigator.clipboard.writeText(code);
      // Ignore an older clipboard response after another copy, edit or reset.
      if (request !== copyRequestRef.current) return;
      setCopied(true);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch {
      if (request !== copyRequestRef.current) return;
      clearCopyFeedback();
      showToast(
        'Không thể sao chép mã nguồn',
        'Trình duyệt chưa cấp quyền clipboard. Hãy chọn và sao chép mã thủ công.',
        'warning'
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 dark:bg-slate-950">
      {/* Top IDE Bar */}
      <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.practiceBank}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Ngân hàng bài tập</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-50 px-2 py-0.5 font-mono text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {problem.code}
            </span>
            <h1 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
              {problem.title}
            </h1>
            <div className="hidden sm:block">
              <DifficultyBadge level={problem.difficulty} />
            </div>
          </div>
        </div>

        {/* Language Selector & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
            {problem.supportedLanguages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageSwitch(lang)}
                aria-pressed={language === lang}
                aria-label={`Ngôn ngữ ${LANGUAGE_META[lang].label}`}
                className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition cursor-pointer ${
                  language === lang
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {LANGUAGE_META[lang].shortLabel}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setWideEditor((v) => !v)}
            className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 lg:inline-flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
            title="Thay đổi tỷ lệ khung Đề bài / Trình soạn thảo"
          >
            <Columns2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{wideEditor ? 'Chia 50/50' : 'Mở rộng Editor'}</span>
          </button>

          <button
            type="button"
            onClick={handleManualSave}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lưu nháp</span>
          </button>

          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Đặt lại</span>
          </button>

          <button
            type="button"
            onClick={() => handleSimulateJudge('run')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Chạy thử (Demo)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSimulateJudge('submit')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Nộp bài (Demo)</span>
          </button>
        </div>
      </header>

      {/* Mobile View Switcher Tabs */}
      <div
        className="flex border-b border-slate-200 bg-white px-4 lg:hidden dark:border-slate-800 dark:bg-slate-900"
        role="group"
        aria-label="Chuyển vùng làm việc trên di động"
      >
        {(
          [
            { id: 'statement', label: '1. Đề bài & Gợi ý' },
            { id: 'code', label: '2. Soạn Code' },
            { id: 'result', label: '3. Input & Kết quả mẫu' },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={mobileTab === t.id}
            onClick={() => setMobileTab(t.id)}
            className={`flex-1 border-b-2 py-2.5 text-xs font-bold transition cursor-pointer ${
              mobileTab === t.id
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Split Workspace */}
      <main id="main-content" className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row gap-4 p-4">
        {/* Left Pane: Problem Statement, Hints & Sample Submissions */}
        <section
          aria-label="Nội dung đề bài"
          className={`${
            mobileTab === 'statement' ? 'block' : 'hidden lg:block'
          } ${
            wideEditor ? 'lg:w-5/12' : 'lg:w-6/12'
          } flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900`}
        >
          {/* Subtabs inside Problem Pane */}
          <div className="flex items-center justify-between border-b border-slate-200 px-5 pt-3 dark:border-slate-800">
            <div className="flex items-center gap-4" role="group" aria-label="Chọn nội dung đề bài">
              {(
                [
                  { id: 'statement', label: 'Đề bài & Ví dụ' },
                  { id: 'hints', label: `Gợi ý từng bước (${problem.hints.length})` },
                  { id: 'submissions', label: `Kết quả chấm mẫu (${displaySubmissions.length})` },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={leftTab === tab.id}
                  onClick={() => setLeftTab(tab.id)}
                  className={`border-b-2 pb-3 text-xs font-bold transition cursor-pointer ${
                    leftTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-3 pb-3 font-mono text-xs text-slate-500 sm:flex">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {problem.timeLimitMs} ms
              </span>
              <span className="inline-flex items-center gap-1">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                {problem.memoryLimitMb} MB
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
            {leftTab === 'statement' ? (
              <>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {problem.code} — {problem.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">
                    {problem.statement}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                    <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                      Định dạng Đầu vào (Input)
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">
                      {problem.inputFormat}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                    <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                      Định dạng Đầu ra (Output)
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-700 whitespace-pre-line dark:text-slate-300">
                      {problem.outputFormat}
                    </p>
                  </div>
                </div>

                {/* Constraints & Subtasks */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Ràng buộc dữ liệu & Phân điểm Subtasks
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {problem.constraints.map((c) => (
                      <li
                        key={c}
                        className="rounded-lg border border-indigo-200 bg-indigo-50/70 px-3 py-1 font-mono text-xs font-semibold text-indigo-900 dark:border-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 space-y-2">
                    {problem.testGroups.map((tg) => (
                      <div
                        key={tg.id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 px-3.5 py-2 text-xs dark:border-slate-800"
                      >
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {tg.name}
                          </span>
                          <span className="ml-2 font-mono text-slate-500">
                            ({tg.constraintsNote})
                          </span>
                        </div>
                        <span className="font-mono font-bold text-teal-700 dark:text-teal-400">
                          {tg.points} điểm · {tg.testcaseCount} test
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Tests */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Ví dụ minh họa (Sample Tests)
                  </h3>
                  {problem.samples.map((sample, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
                        <span>Ví dụ #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomInput(sample.input);
                            // On mobile the input panel is a separate view.
                            setMobileTab('result');
                            showToast(
                              `Đã nạp Input Ví dụ #${idx + 1} vào ô Custom Input`,
                              undefined,
                              'info'
                            );
                          }}
                          className="text-indigo-600 hover:underline dark:text-indigo-400 cursor-pointer"
                        >
                          Nạp vào Custom Input →
                        </button>
                      </div>
                      <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 dark:divide-slate-800">
                        <div className="p-3">
                          <div className="text-[11px] font-semibold text-slate-400 uppercase">
                            Input
                          </div>
                          <pre className="mt-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                            {sample.input}
                          </pre>
                        </div>
                        <div className="p-3">
                          <div className="text-[11px] font-semibold text-slate-400 uppercase">
                            Output
                          </div>
                          <pre className="mt-1 font-mono text-xs font-bold text-teal-700 dark:text-teal-300">
                            {sample.output}
                          </pre>
                        </div>
                      </div>
                      {sample.explanation ? (
                        <div className="border-t border-slate-200 bg-slate-50/60 px-4 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-400">
                          <strong>Giải thích:</strong> {sample.explanation}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </>
            ) : leftTab === 'hints' ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                  Hãy tự suy nghĩ ít nhất 10 phút trước khi mở gợi ý từng mức để rèn luyện tư duy thiết kế thuật toán.
                </div>
                {problem.hints.map((hint, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      <Lightbulb className="h-4 w-4" aria-hidden="true" />
                      <span>Gợi ý phân tích #{idx + 1}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-700 dark:text-slate-200">{hint}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Các bản ghi chấm mẫu (Seeded Submissions) dưới đây minh họa đầy đủ các trạng thái chấm (AC, WA, TLE, CE, RE) để kiểm thử giao diện.
                </p>
                {displaySubmissions.length === 0 && (
                  <p role="status" className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    Chưa có bản ghi chấm mẫu cho bài tập này. Chế độ demo không tạo kết quả chấm thật.
                  </p>
                )}
                {displaySubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3.5 dark:border-slate-800"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <SubmissionStatusBadge status={sub.status} />
                        <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {LANGUAGE_META[sub.language].shortLabel}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          Điểm: {sub.score}/{sub.maxScore}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {sub.problemTitle} · Nộp lúc {sub.submittedAt}
                      </div>
                    </div>
                    <Link
                      href={ROUTES.submissionDetail(sub.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      <span>Xem chi tiết test</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right Pane: Code Editor (Top) + Custom Input / Demo Judge Result (Bottom) */}
        <section
          aria-label="Trình soạn thảo mã nguồn và kết quả"
          className={`${
            mobileTab === 'code' || mobileTab === 'result' ? 'flex' : 'hidden lg:flex'
          } ${
            wideEditor ? 'lg:w-7/12' : 'lg:w-6/12'
          } flex-col gap-4`}
        >
          {/* Code Editor Window */}
          <div
            className={`${
              mobileTab === 'result' ? 'hidden lg:flex' : 'flex'
            } flex-1 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-md`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-indigo-300">
                  {LANGUAGE_META[language].fileExt}
                </span>
                <span className="text-slate-500">·</span>
                <span className="font-mono text-slate-400">
                  {LANGUAGE_META[language].versionLabel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-teal-400">Tự động lưu nháp theo ngôn ngữ</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative flex min-h-[320px] flex-1 font-mono text-xs sm:text-sm">
              {/* Line Numbers Gutter */}
              <div
                aria-hidden="true"
                className="select-none border-r border-slate-800 bg-slate-900/60 px-3 py-4 text-right text-slate-500"
              >
                {Array.from({ length: lineCount }).map((_, idx) => (
                  <div key={idx} className="leading-6">
                    {idx + 1}
                  </div>
                ))}
              </div>

              <p id="code-editor-keyboard-help" className="sr-only">Nhấn Tab để thụt đầu dòng; nhấn Shift cộng Tab để chuyển tiêu điểm về điều khiển trước đó.</p>
              <label htmlFor="code-editor-textarea" className="sr-only">
                Soạn thảo mã nguồn {LANGUAGE_META[language].label}
              </label>
              <textarea
                id="code-editor-textarea"
                value={code}
                onChange={(e) => handleCodeChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Tab' && !e.shiftKey) {
                    e.preventDefault();
                    const start = e.currentTarget.selectionStart;
                    const end = e.currentTarget.selectionEnd;
                    const updated = code.substring(0, start) + '    ' + code.substring(end);
                    handleCodeChange(updated);
                    // Restore the caret after React updates the controlled textarea.
                    const editor = e.currentTarget;
                    const nextCaret = start + 4;
                    requestAnimationFrame(() => {
                      if (editor.isConnected) {
                        editor.setSelectionRange(nextCaret, nextCaret);
                      }
                    });
                  }
                }}
                spellCheck={false}
                aria-describedby="code-editor-keyboard-help"
                className="w-full flex-1 resize-none bg-slate-950 p-4 font-mono leading-6 text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Bottom Console: Custom Input & Transparent Demo Judge Status */}
          <div
            className={`${
              mobileTab === 'code' ? 'hidden lg:block' : 'block'
            } rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Custom Input & Bảng điều khiển Chấm thử (Demo)
                </span>
                <DemoBadge text="Không biên dịch thực trên Server" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateJudge('run')}
                  className="rounded-lg bg-teal-600 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-700 cursor-pointer"
                >
                  Chạy thử Input này
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="md:col-span-5">
                <label
                  htmlFor="custom-input-box"
                  className="block text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  Dữ liệu đầu vào tùy chỉnh (stdin):
                </label>
                <textarea
                  id="custom-input-box"
                  rows={4}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="md:col-span-7">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Trạng thái máy chấm & Kịch bản chấm mẫu:
                </div>

                {judgeNotice ? (
                  <div className="mt-1 rounded-xl border border-amber-300 bg-amber-50/90 p-3 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
                    <div className="flex items-center gap-1.5 font-bold">
                      <FlaskConical className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        {judgeNotice.actionType === 'run'
                          ? 'Thông báo Chạy thử (Chế độ UI Demo)'
                          : 'Thông báo Nộp bài (Chế độ UI Demo)'}
                      </span>
                    </div>
                    <p className="mt-1 leading-relaxed">{judgeNotice.message}</p>
                  </div>
                ) : (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Bấm <strong>Chạy thử (Demo)</strong> hoặc <strong>Nộp bài (Demo)</strong>, hoặc chọn trực tiếp một kịch bản kết quả mẫu bên dưới để kiểm tra màn hình chi tiết Subtask:
                  </p>
                )}

                {displaySubmissions.length === 0 ? (
                  <p className="mt-2.5 rounded-lg border border-dashed border-slate-300 p-3 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300" role="status">
                    Bài tập này chưa có bản ghi chấm mẫu. Hệ thống chưa kết nối máy chấm thật nên chưa thể hiển thị kết quả chạy hoặc nộp bài.
                  </p>
                ) : (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {displaySubmissions.map((sub) => (
                    <Link
                      key={sub.id}
                      href={ROUTES.submissionDetail(sub.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <SubmissionStatusBadge status={sub.status} />
                      <span className="font-mono text-[11px]">
                        ({LANGUAGE_META[sub.language].shortLabel}) →
                      </span>
                    </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <ConfirmDialog
        open={confirmResetOpen}
        title="Đặt lại mã nguồn về mẫu khởi đầu?"
        description={`Bản nháp hiện tại của ngôn ngữ ${LANGUAGE_META[language].label} trong bài ${problem.code} sẽ được thay thế bằng đoạn code khởi tạo mặc định.`}
        confirmLabel="Đặt lại code mẫu"
        cancelLabel="Hủy"
        variant="danger"
        onConfirm={handleResetConfirm}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  );
}
