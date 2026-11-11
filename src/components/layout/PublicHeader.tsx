'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code2,
  Menu,
  X,
  ArrowRight,
  Compass,
  Route,
  TerminalSquare,
  BookOpen,
  LayoutDashboard,
} from 'lucide-react';
import { BRAND_CONFIG, ROLE_META, ROUTES } from '@/config/brand';
import { useAppState } from '@/providers/AppStateProvider';

export function PublicHeader() {
  const pathname = usePathname();
  const { state } = useAppState();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: ROUTES.courses, label: 'Khám phá khóa học', icon: Compass },
    { href: ROUTES.learningPaths, label: 'Lộ trình kỹ năng', icon: Route },
    { href: ROUTES.publicProblems, label: 'Bài tập mẫu', icon: TerminalSquare },
    { href: ROUTES.about, label: 'Phương pháp & Sứ mệnh', icon: BookOpen },
  ];

  const workspaceHref =
    state.role === 'teacher'
      ? ROUTES.teacherDashboard
      : state.role === 'admin'
        ? ROUTES.adminDashboard
        : ROUTES.learnerDashboard;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            href={ROUTES.home}
            className="flex items-center gap-2.5 text-slate-900 dark:text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <Code2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">{BRAND_CONFIG.name}</span>
              <span className="ml-2 hidden rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-slate-600 sm:inline-block dark:bg-slate-800 dark:text-slate-300">
                EdTech Studio
              </span>
            </div>
          </Link>

          <nav aria-label="Điều hướng chính" className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={ROUTES.login}
            className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {state.role === 'guest' ? 'Đăng nhập Demo' : ROLE_META[state.role].badgeText}
          </Link>

          <Link
            href={workspaceHref}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            <span>
              {state.role === 'teacher'
                ? 'Vào Teaching Studio'
                : state.role === 'admin'
                  ? 'Vào Quản trị'
                  : 'Bắt đầu học'}
            </span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Mở menu điều hướng"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 pt-3 pb-5 md:hidden dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <Link
              href={ROUTES.login}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Chuyển vai trò / Đăng nhập Demo
            </Link>
            <Link
              href={workspaceHref}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Vào không gian học tập
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
