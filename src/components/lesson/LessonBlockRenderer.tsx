'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Info,
  AlertTriangle,
  OctagonAlert,
  Lightbulb,
  Copy,
  Check,
  PlayCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  TerminalSquare,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  EyeOff,
} from 'lucide-react';
import { LANGUAGE_META, ROUTES } from '@/config/brand';
import { DPVisualizer } from '@/components/lesson/DPVisualizer';
import { useAppState } from '@/providers/AppStateProvider';
import { problemService } from '@/services';
import type {
  CalloutBlockData,
  CodeBlockData,
  ImageBlockData,
  LessonBlock,
  ProgrammingLanguage,
  QuizBlockData,
  SlideBlockData,
} from '@/types';

function CodeBlockView({ data }: { data: CodeBlockData }) {
  const availableLangs = Object.keys(data.snippets) as ProgrammingLanguage[];
  const [selectedLang, setSelectedLang] = useState<ProgrammingLanguage>(
    availableLangs.includes(data.defaultLanguage)
      ? data.defaultLanguage
      : availableLangs[0] ?? 'cpp'
  );
  const [copied, setCopied] = useState(false);

  const code = data.snippets[selectedLang] ?? '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard error
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-slate-100 shadow-xs dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs text-slate-200">{data.title}</span>
          {data.complexityNote ? (
            <span className="hidden rounded bg-indigo-950 px-2 py-0.5 font-mono text-[11px] text-indigo-300 sm:inline-block">
              {data.complexityNote}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1" role="group" aria-label="Ngôn ngữ mã nguồn">
            {availableLangs.map((lang) => (
              <button
                key={lang}
                type="button"
                aria-pressed={selectedLang === lang}
                aria-label={`Ngôn ngữ ${LANGUAGE_META[lang].label}`}
                onClick={() => setSelectedLang(lang)}
                className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium transition cursor-pointer ${
                  selectedLang === lang
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {LANGUAGE_META[lang].shortLabel}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer"
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

      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
        <code>{code}</code>
      </pre>

      {data.sampleInput || data.expectedOutput ? (
        <div className="grid grid-cols-1 gap-3 border-t border-slate-800 bg-slate-900/70 p-4 text-xs sm:grid-cols-2">
          {data.sampleInput ? (
            <div>
              <div className="font-semibold text-slate-400">Input mẫu:</div>
              <pre className="mt-1 rounded-lg bg-slate-950 p-2.5 font-mono text-slate-200">
                {data.sampleInput}
              </pre>
            </div>
          ) : null}
          {data.expectedOutput ? (
            <div>
              <div className="font-semibold text-slate-400">Output mong đợi:</div>
              <pre className="mt-1 rounded-lg bg-slate-950 p-2.5 font-mono text-teal-300">
                {data.expectedOutput}
              </pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function CalloutBlockView({ data }: { data: CalloutBlockData }) {
  const config = {
    info: {
      icon: Info,
      badge: 'Ghi nhớ lý thuyết',
      box: 'border-indigo-200 bg-indigo-50/70 text-slate-800 dark:border-indigo-900/70 dark:bg-indigo-950/40 dark:text-slate-200',
      iconTone: 'text-indigo-600 dark:text-indigo-400',
    },
    warning: {
      icon: AlertTriangle,
      badge: 'Lưu ý quan trọng',
      box: 'border-amber-200 bg-amber-50/70 text-slate-800 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-slate-200',
      iconTone: 'text-amber-600 dark:text-amber-400',
    },
    mistake: {
      icon: OctagonAlert,
      badge: 'Cảnh báo lỗi thường gặp',
      box: 'border-rose-200 bg-rose-50/70 text-slate-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-slate-200',
      iconTone: 'text-rose-600 dark:text-rose-400',
    },
    tip: {
      icon: Lightbulb,
      badge: 'Mẹo tối ưu hóa',
      box: 'border-teal-200 bg-teal-50/70 text-slate-800 dark:border-teal-900/70 dark:bg-teal-950/40 dark:text-slate-200',
      iconTone: 'text-teal-600 dark:text-teal-400',
    },
  }[data.variant];

  const Icon = config.icon;

  return (
    <aside className={`my-6 rounded-2xl border p-5 ${config.box}`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconTone}`} aria-hidden="true" />
        <div>
          <span className="text-xs font-bold tracking-wide uppercase opacity-80">
            {config.badge}
          </span>
          <h4 className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
            {data.title}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed">{data.content}</p>
        </div>
      </div>
    </aside>
  );
}

function DiagramBlockView({ data }: { data: ImageBlockData }) {
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div
        role="img"
        aria-label={data.alt}
        className="flex flex-col items-center justify-center rounded-xl bg-slate-50 p-6 dark:bg-slate-950"
      >
        {data.diagramType === 'dp-dag' ? (
          <svg viewBox="0 0 600 160" className="w-full max-w-xl" aria-hidden="true">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4f46e5" />
              </marker>
            </defs>
            <path
              d="M 110 80 Q 250 15 470 70"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 270 80 Q 370 30 475 75"
              fill="none"
              stroke="#0d9488"
              strokeWidth="3"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 380 80 L 470 80"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrow)"
            />
            {[
              { x: 60, label: 'dp[2]=2', sub: 's - 4' },
              { x: 220, label: 'dp[3]=1', sub: 's - 3 (Tối ưu)' },
              { x: 340, label: 'dp[5]=2', sub: 's - 1' },
              { x: 480, label: 'dp[6]=2', sub: 'min(2+1, 1+1, 2+1)' },
            ].map((node, idx) => (
              <g key={node.label} transform={`translate(${node.x}, 55)`}>
                <rect
                  width="92"
                  height="52"
                  rx="10"
                  fill={idx === 1 ? '#0d9488' : idx === 3 ? '#4f46e5' : '#1e293b'}
                />
                <text
                  x="46"
                  y="24"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
                <text x="46" y="42" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                  {node.sub}
                </text>
              </g>
            ))}
          </svg>
        ) : data.diagramType === 'binary-search' ? (
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            {[2, 5, 8, 14, 20, 27, 35].map((v, idx) => (
              <div
                key={v}
                className={`flex h-14 w-14 flex-col items-center justify-center rounded-xl border ${
                  idx === 3
                    ? 'border-indigo-600 bg-indigo-600 text-white font-bold'
                    : idx < 3
                      ? 'border-teal-500 bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-200'
                      : 'border-slate-300 bg-slate-100 text-slate-400 line-through dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <span className="text-[10px]">idx {idx}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            {[
              { idx: 'a[0]', val: '4', addr: '0x100' },
              { idx: 'a[1]', val: '9', addr: '0x104' },
              { idx: 'a[2]', val: '2', addr: '0x108' },
              { idx: 'a[3]', val: '15', addr: '0x10C' },
              { idx: 'a[4]', val: '7', addr: '0x110' },
            ].map((item) => (
              <div
                key={item.idx}
                className="flex min-w-[84px] flex-col items-center rounded-xl border border-indigo-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
              >
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400">{item.idx}</span>
                <span className="my-1 text-base font-bold text-slate-900 dark:text-white">
                  {item.val}
                </span>
                <span className="text-[10px] text-slate-400">{item.addr}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-center text-xs text-slate-600 dark:text-slate-400">
        {data.caption}
      </figcaption>
    </figure>
  );
}

function SlideBlockView({ data }: { data: SlideBlockData }) {
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const slides = data.slides;
  const activeSlide = slides[idx] ?? slides[0];

  if (!activeSlide) return null;

  return (
    <div
      className={`my-6 rounded-2xl border border-slate-200 bg-slate-900 text-white shadow-md dark:border-slate-800 ${
        expanded ? 'fixed inset-2 z-50 flex flex-col overflow-y-auto p-4 sm:inset-4 sm:p-8' : 'p-4 sm:p-6'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span className="rounded bg-indigo-500/20 px-2 py-0.5 font-mono text-xs text-indigo-300">
            Slide Deck · Trang {idx + 1}/{slides.length}
          </span>
          <h4 className="mt-1 text-xs font-medium text-slate-400">{data.deckTitle}</h4>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? 'Thu nhỏ slide' : 'Mở rộng toàn màn hình'}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 cursor-pointer"
        >
          {expanded ? (
            <>
              <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Thu nhỏ</span>
            </>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Toàn màn hình</span>
            </>
          )}
        </button>
      </div>

      <div className="my-6">
        <h3 className="text-xl font-bold text-white sm:text-2xl">{activeSlide.title}</h3>
        {activeSlide.subtitle ? (
          <p className="mt-1 text-sm text-indigo-300">{activeSlide.subtitle}</p>
        ) : null}
        <ul className="mt-4 space-y-2.5 text-sm text-slate-200">
          {activeSlide.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {activeSlide.highlightFormula ? (
          <div className="mt-5 rounded-xl border border-indigo-500/30 bg-indigo-950/60 px-4 py-3 font-mono text-xs text-indigo-200 sm:text-sm">
            {activeSlide.highlightFormula}
          </div>
        ) : null}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
        <button
          type="button"
          disabled={idx === 0}
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span>Slide trước</span>
        </button>
        <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5">
          {slides.map((_, sIdx) => (
            <button
              key={sIdx}
              type="button"
              onClick={() => setIdx(sIdx)}
              aria-label={`Chuyển tới slide ${sIdx + 1}`}
              aria-current={sIdx === idx ? 'step' : undefined}
              className={`h-2 rounded-full transition cursor-pointer ${
                sIdx === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          disabled={idx >= slides.length - 1}
          onClick={() => setIdx((i) => Math.min(slides.length - 1, i + 1))}
          className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-40 cursor-pointer"
        >
          <span>Slide tiếp</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function QuizBlockView({ blockId, data }: { blockId: string; data: QuizBlockData }) {
  const { state, saveQuizAnswer, resetQuizAnswer } = useAppState();
  const savedOptionId = state.quizAnswers[blockId] ?? '';
  const selectedOption = data.options.find((o) => o.id === savedOptionId);
  const isCorrect = savedOptionId === data.correctOptionId;

  return (
    <section
      aria-label="Câu hỏi kiểm tra khái niệm"
      className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs sm:p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
          <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Kiểm tra nhanh · {data.conceptTag}</span>
        </span>
        {savedOptionId ? (
          <button
            type="button"
            onClick={() => resetQuizAnswer(blockId)}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Làm lại câu hỏi</span>
          </button>
        ) : null}
      </div>

      <h4 className="mt-3 text-base font-bold text-slate-900 dark:text-white">{data.question}</h4>

      <div className="mt-4 space-y-2.5" role="radiogroup" aria-label={data.question}>
        {data.options.map((opt) => {
          const checked = savedOptionId === opt.id;
          let borderClass =
            'border-slate-200 bg-slate-50/70 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-800/50';
          if (checked) {
            borderClass =
              opt.id === data.correctOptionId
                ? 'border-emerald-500 bg-emerald-50/80 dark:border-emerald-600 dark:bg-emerald-950/50'
                : 'border-rose-500 bg-rose-50/80 dark:border-rose-600 dark:bg-rose-950/50';
          }

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={checked}
              onClick={() => saveQuizAnswer(blockId, opt.id)}
              className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition cursor-pointer ${borderClass}`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                  checked
                    ? opt.id === data.correctOptionId
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-400 bg-white dark:bg-slate-900'
                }`}
              >
                {checked ? '✓' : ''}
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-100">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {selectedOption ? (
        <div
          role="status"
          className={`mt-4 flex items-start gap-2.5 rounded-xl border p-4 text-sm ${
            isCorrect
              ? 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/70 dark:bg-emerald-950/50 dark:text-emerald-200'
              : 'border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900/70 dark:bg-rose-950/50 dark:text-rose-200'
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
          )}
          <div>
            <p className="font-bold">
              {isCorrect ? 'Chính xác!' : 'Chưa chính xác — Hãy xem giải thích:'}
            </p>
            <p className="mt-1 text-xs leading-relaxed sm:text-sm">{selectedOption.explanation}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function LessonBlockRenderer({
  block,
  viewMode = 'learner',
}: {
  block: LessonBlock;
  viewMode?: 'learner' | 'teacher';
}) {
  const { state } = useAppState();

  if (block.type === 'teacherNote' && viewMode === 'learner') {
    return null;
  }

  switch (block.type) {
    case 'richText':
      return (
        <div className="my-6 space-y-3">
          {block.data.heading ? (
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              {block.data.heading}
            </h2>
          ) : null}
          {block.data.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-base leading-relaxed text-slate-700 dark:text-slate-300"
            >
              {p}
            </p>
          ))}
          {block.data.bulletPoints && block.data.bulletPoints.length > 0 ? (
            <ul className="ml-5 list-disc space-y-1.5 text-sm text-slate-700 sm:text-base dark:text-slate-300">
              {block.data.bulletPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {block.data.formulaLatex ? (
            <div className="my-4 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 text-center dark:border-indigo-900/60 dark:bg-indigo-950/40">
              <div className="font-mono text-sm font-bold text-indigo-900 sm:text-base dark:text-indigo-200">
                dp[s] = min(dp[s], dp[s - coin] + 1) &nbsp; (với coin &le; s và dp[s - coin] &ne; INF)
              </div>
              {block.data.formulaCaption ? (
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {block.data.formulaCaption}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      );

    case 'code':
      return <CodeBlockView data={block.data} />;

    case 'callout':
      return <CalloutBlockView data={block.data} />;

    case 'image':
      return <DiagramBlockView data={block.data} />;

    case 'slide':
      return <SlideBlockView data={block.data} />;

    case 'video':
      return (
        <div className="my-6 rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-teal-400" aria-hidden="true" />
              <span className="text-sm font-bold">{block.data.title}</span>
            </div>
            <span className="rounded bg-slate-800 px-2.5 py-0.5 font-mono text-xs text-slate-300">
              Thời lượng mẫu: {block.data.durationLabel} · Chưa tích hợp Streaming
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-300">{block.data.summary}</p>
          <div className="mt-4 rounded-xl bg-slate-950 p-3.5">
            <div className="text-xs font-semibold text-slate-400">Đề cương phân đoạn video:</div>
            <ul className="mt-2 space-y-1.5 font-mono text-xs text-slate-300">
              {block.data.transcriptOutline.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    case 'quiz':
      return <QuizBlockView blockId={block.id} data={block.data} />;

    case 'interactive':
      return (
        <div className="my-6">
          <DPVisualizer
            title={block.data.title}
            description={block.data.description}
            presets={block.data.presets}
          />
        </div>
      );

    case 'problemReference': {
      const problem = problemService.getBySlugOrId(state, block.data.problemSlug);
      return (
        <div className="my-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-teal-200 bg-teal-50/70 p-5 dark:border-teal-900/70 dark:bg-teal-950/30">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
              <TerminalSquare className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wide text-teal-800 uppercase dark:text-teal-300">
                Bài tập thực hành gắn liền với bài học
              </span>
              <h4 className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
                {problem ? `${problem.code} — ${problem.title}` : block.data.problemSlug}
              </h4>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                {block.data.promptNote}
              </p>
            </div>
          </div>

          <Link
            href={ROUTES.codingLab(block.data.problemSlug)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-teal-700 sm:text-sm"
          >
            <span>Mở trong Coding Lab</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      );
    }

    case 'teacherNote':
      return (
        <aside className="my-6 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/80 p-5 dark:border-amber-700 dark:bg-amber-950/40">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-200/80 px-2.5 py-0.5 text-xs font-bold text-amber-950 dark:bg-amber-900 dark:text-amber-200">
              <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Ghi chú sư phạm dành riêng cho Giảng viên (Ẩn với Học viên)</span>
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
            Mục tiêu sư phạm: {block.data.pedagogyGoal}
          </p>
          <ul className="mt-2 ml-4 list-disc space-y-1 text-xs text-slate-700 dark:text-slate-300">
            {block.data.commonStudentQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs font-medium text-amber-900 dark:text-amber-300">
            Phân bổ thời gian lớp học: {block.data.classroomTimingNote}
          </p>
        </aside>
      );

    default:
      return null;
  }
}
