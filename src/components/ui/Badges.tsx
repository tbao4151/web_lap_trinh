import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Terminal,
  FlaskConical,
} from 'lucide-react';
import {
  DIFFICULTY_META,
  LANGUAGE_META,
  SUBMISSION_STATUS_META,
} from '@/config/brand';
import type {
  Difficulty,
  ProgrammingLanguage,
  SubmissionStatus,
} from '@/types';

export function DifficultyBadge({ level }: { level: Difficulty }) {
  const meta = DIFFICULTY_META[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${meta.badgeClass}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {meta.label}
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
        <span
          key={lang}
          className="inline-flex items-center rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {compact ? LANGUAGE_META[lang].shortLabel : LANGUAGE_META[lang].label}
        </span>
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

export function DemoBadge({ text = 'Dữ liệu minh họa Demo' }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-800 dark:border-teal-800/80 dark:bg-teal-950/60 dark:text-teal-300">
      <FlaskConical className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}
