'use client';

import React from 'react';
import { Settings, Layers, Code2, RotateCcw } from 'lucide-react';
import { BRAND_CONFIG, DOMAINS, LANGUAGE_META } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { useAppState } from '@/providers/AppStateProvider';
import type { ProgrammingLanguage } from '@/types';

export default function AdminSettingsPage() {
  const { resetDemoData } = useAppState();

  return (
    <WorkspaceShell
      surface="admin"
      title="Cấu hình Hệ thống & Kiến trúc Đa Mảng (Taxonomy)"
      subtitle="Thông số định danh thương hiệu, danh mục mảng kiến thức và bộ biên dịch hỗ trợ trong Coding Lab"
      actions={
        <button
          type="button"
          onClick={resetDemoData}
          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Khôi phục dữ liệu mẫu toàn cục</span>
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Settings className="h-4 w-4 text-indigo-600" aria-hidden="true" />
            <span>1. Thông tin Thương hiệu Tập trung (Centralized Brand Config)</span>
          </div>
          <dl className="mt-4 space-y-3 text-xs">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
              <dt className="font-semibold text-slate-500">Tên nền tảng</dt>
              <dd className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">
                {BRAND_CONFIG.name} ({BRAND_CONFIG.shortName})
              </dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
              <dt className="font-semibold text-slate-500">Định vị (Tagline)</dt>
              <dd className="mt-0.5 text-slate-800 dark:text-slate-200">
                {BRAND_CONFIG.tagline}
              </dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
              <dt className="font-semibold text-slate-500">Khóa lưu trữ trình duyệt (localStorage)</dt>
              <dd className="mt-0.5 font-mono text-indigo-600 dark:text-indigo-400">
                {BRAND_CONFIG.storageKey} • Phiên bản: {BRAND_CONFIG.version}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Code2 className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span>2. Ngôn ngữ Lập trình trong Coding Lab</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(Object.keys(LANGUAGE_META) as ProgrammingLanguage[]).map((lang) => {
              const meta = LANGUAGE_META[lang];
              return (
                <div
                  key={lang}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="font-bold text-slate-900 dark:text-white">{meta.label}</div>
                  <div className="mt-1 font-mono text-xs text-slate-500">
                    {meta.versionLabel} • Tệp: {meta.fileExt}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Layers className="h-4 w-4 text-amber-600" aria-hidden="true" />
            <span>3. Cấu trúc Đa Mảng Kiến thức (Domain Taxonomy)</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DOMAINS.map((d) => (
              <div
                key={d.id}
                className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  /{d.slug}
                </div>
                <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                  {d.name}
                </div>
                <p className="mt-1 text-xs text-slate-500">{d.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </WorkspaceShell>
  );
}
