'use client';

import React from 'react';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { useAppState } from '@/providers/AppStateProvider';

export function ToastRegion() {
  const { toasts, dismissToast } = useAppState();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Thông báo hệ thống"
      className="fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((toast) => {
        const Icon =
          toast.variant === 'success'
            ? CheckCircle2
            : toast.variant === 'warning'
              ? AlertTriangle
              : toast.variant === 'error'
                ? XCircle
                : Info;

        const toneClass =
          toast.variant === 'success'
            ? 'border-emerald-200 bg-white text-slate-900 dark:border-emerald-800 dark:bg-slate-900 dark:text-slate-100'
            : toast.variant === 'warning'
              ? 'border-amber-200 bg-white text-slate-900 dark:border-amber-800 dark:bg-slate-900 dark:text-slate-100'
              : toast.variant === 'error'
                ? 'border-rose-200 bg-white text-slate-900 dark:border-rose-800 dark:bg-slate-900 dark:text-slate-100'
                : 'border-indigo-200 bg-white text-slate-900 dark:border-indigo-800 dark:bg-slate-900 dark:text-slate-100';

        const iconColor =
          toast.variant === 'success'
            ? 'text-emerald-600 dark:text-emerald-400'
            : toast.variant === 'warning'
              ? 'text-amber-600 dark:text-amber-400'
              : toast.variant === 'error'
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-indigo-600 dark:text-indigo-400';

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg ${toneClass}`}
          >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {toast.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Đóng thông báo"
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
