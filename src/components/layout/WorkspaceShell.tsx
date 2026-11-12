'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code2,
  LayoutDashboard,
  BookOpen,
  TerminalSquare,
  Route,
  BarChart3,
  NotebookPen,
  Trophy,
  UserCog,
  FolderKanban,
  FileCheck2,
  Users,
  FlaskConical,
  ShieldAlert,
  ShoppingBag,
  Settings,
  Menu,
  X,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { BRAND_CONFIG, ROLE_META, ROUTES } from '@/config/brand';
import { useAppState } from '@/providers/AppStateProvider';

interface NavLinkItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const LEARNER_NAV: NavLinkItem[] = [
  { href: ROUTES.learnerDashboard, label: 'Tổng quan học tập', icon: LayoutDashboard },
  { href: ROUTES.learnerCourses, label: 'Khóa đang học', icon: BookOpen },
  { href: ROUTES.practiceBank, label: 'Ngân hàng bài tập', icon: TerminalSquare },
  { href: ROUTES.learnerPaths, label: 'Lộ trình của tôi', icon: Route },
  { href: ROUTES.learnerProgress, label: 'Bản đồ năng lực', icon: BarChart3 },
  { href: ROUTES.learnerNotes, label: 'Sổ tay & Ghi chú', icon: NotebookPen },
  { href: ROUTES.contests, label: 'Cuộc thi thử (Demo)', icon: Trophy },
  { href: ROUTES.learnerAccount, label: 'Hồ sơ & Tùy chỉnh', icon: UserCog },
];

const TEACHER_NAV: NavLinkItem[] = [
  { href: ROUTES.teacherDashboard, label: 'Tổng quan giảng dạy', icon: LayoutDashboard },
  { href: ROUTES.teacherCourses, label: 'Quản lý khóa học', icon: FolderKanban },
  { href: ROUTES.teacherProblemBank, label: 'Ngân hàng đề bài', icon: TerminalSquare },
  { href: ROUTES.classrooms, label: 'Lớp học & Học sinh', icon: Users },
  { href: ROUTES.teacherSubmissions, label: 'Bài nộp học viên', icon: FileCheck2 },
  { href: ROUTES.teacherResearch, label: 'Không gian Nghiên cứu', icon: FlaskConical },
];

const ADMIN_NAV: NavLinkItem[] = [
  { href: ROUTES.adminDashboard, label: 'Tổng quan vận hành', icon: LayoutDashboard },
  { href: ROUTES.adminUsers, label: 'Người dùng & Phân vai', icon: Users },
  { href: ROUTES.adminContent, label: 'Kiểm duyệt nội dung', icon: ShieldAlert },
  { href: ROUTES.adminOrders, label: 'Đơn hàng mẫu (Demo)', icon: ShoppingBag },
  { href: ROUTES.adminSettings, label: 'Cấu hình nền tảng', icon: Settings },
];

export function WorkspaceShell({
  surface,
  title,
  subtitle,
  actions,
  children,
  fullBleed = false,
}: {
  surface: 'learner' | 'teacher' | 'admin';
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  fullBleed?: boolean;
}) {
  const pathname = usePathname();
  const { state } = useAppState();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileDrawerOpen) return;

    mobileCloseButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileDrawerOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = mobileDrawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      mobileMenuButtonRef.current?.focus();
    };
  }, [mobileDrawerOpen]);

  const navItems =
    surface === 'teacher' ? TEACHER_NAV : surface === 'admin' ? ADMIN_NAV : LEARNER_NAV;

  const surfaceBadge =
    surface === 'teacher'
      ? 'Teaching Studio'
      : surface === 'admin'
        ? 'Admin Console'
        : 'Learning Studio';

  return (
    <div className="flex min-h-[calc(100vh-37px)] bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <aside
        aria-label={`Điều hướng ${surfaceBadge}`}
        className={`hidden border-r border-slate-200 bg-white transition-all md:flex md:flex-col dark:border-slate-800 dark:bg-slate-900 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <Link href={ROUTES.home} className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Code2 className="h-5 w-5" aria-hidden="true" />
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <div className="truncate text-base font-bold text-slate-900 dark:text-white">
                  {BRAND_CONFIG.name}
                </div>
                <div className="truncate text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                  {surfaceBadge}
                </div>
              </div>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isRoot =
              item.href === ROUTES.learnerDashboard ||
              item.href === ROUTES.teacherDashboard ||
              item.href === ROUTES.adminDashboard;
            const active = isRoot
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {!collapsed ? <span className="truncate">{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <Link
            href={ROUTES.courses}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Globe className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            {!collapsed ? <span>Trang Học viện công khai</span> : null}
          </Link>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex min-h-16 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 dark:border-slate-800 dark:bg-slate-900/95">
          <div className="flex items-center gap-3">
            <button
              type="button"
              ref={mobileMenuButtonRef}
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Mở menu điều hướng"
              aria-haspopup="dialog"
              aria-expanded={mobileDrawerOpen}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                {title}
              </h1>
              {subtitle ? (
                <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">{subtitle}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {actions}
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs sm:flex dark:border-slate-800 dark:bg-slate-800/70">
              <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {ROLE_META[state.role].personaName}
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {mobileDrawerOpen ? (
          <div
            ref={mobileDrawerRef}
            className="fixed inset-0 z-50 flex md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng di động"
          >
            <div
              className="fixed inset-0 bg-slate-950/60"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative z-10 flex w-72 flex-col bg-white p-4 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                    <Code2 className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {BRAND_CONFIG.name} · {surfaceBadge}
                  </span>
                </div>
                <button
                  type="button"
                  ref={mobileCloseButtonRef}
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Đóng menu"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav className="mt-4 flex-1 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                        active
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
                <Link
                  href={ROUTES.home}
                  onClick={() => setMobileDrawerOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  <span>Về Trang chủ công khai</span>
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <main
          id="main-content"
          className={
            fullBleed
              ? 'flex-1'
              : 'mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8'
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
}
