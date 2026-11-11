import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Terminal,
  FlaskConical,
  Circle,
} from 'lucide-react';
import {
  DIFFICULTY_META,
  LANGUAGE_META,
  SUBMISSION_STATUS_META,
} from '@/config/brand';
import type {
  Difficulty,
  ProblemSolveState,
  ProgrammingLanguage,
  SubmissionStatus,
} from '@/types';

export function DifficultyBadge({
  level,
  difficulty,
}: {
  level?: Difficulty;
  difficulty?: Difficulty;
}) {
  const resolved = level ?? difficulty ?? 'beginner';
  const meta = DIFFICULTY_META[resolved];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${meta.badgeClass}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export function LanguageBadge({
  language,
  compact = true,
}: {
  language: ProgrammingLanguage;
  compact?: boolean;
}) {
  return (
    <span className="inline-flex items-center rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      {compact ? LANGUAGE_META[language].shortLabel : LANGUAGE_META[language].label}
    </span>
  );
}

export function LanguageBadges({
  languages,
  compact = false,
}: {
  languages: ProgrammingLanguage[];
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {languages.map((lang) => (
        <LanguageBadge key={lang} language={lang} compact={compact} />
      ))}
    </div>
  );
}

export function SubmissionStatusBadge({ status }: { status: SubmissionStatus }) {
  const meta = SUBMISSION_STATUS_META[status];
  const Icon =
    status === 'AC'
      ? CheckCircle2
      : status === 'PENDING'
        ? Clock
        : status === 'TLE' || status === 'MLE'
          ? AlertTriangle
          : status === 'CE'
            ? Terminal
            : XCircle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${meta.badgeClass}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{meta.vietnameseLabel}</span>
    </span>
  );
}

export const VerdictBadge = SubmissionStatusBadge;

export function ProblemSolveBadge({ state }: { state: ProblemSolveState }) {
  if (state === 'solved') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Đã giải (AC)</span>
      </span>
    );
  }
  if (state === 'attempted') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Đang làm nháp</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
      <Circle className="h-3 w-3" aria-hidden="true" />
      <span>Chưa thử</span>
    </span>
  );
}

export function DemoBadge({ text = 'Dữ liệu minh họa Demo' }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
      <FlaskConical className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}
