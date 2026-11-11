'use client';

import React from 'react';
import Link from 'next/link';
import { Users, BookOpen, TerminalSquare, ShieldCheck, ArrowRight, Receipt } from 'lucide-react';
import { DOMAINS, ROUTES, formatVnd } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { useAppState } from '@/providers/AppStateProvider';

export default function AdminDashboardPage() {
  const { state } = useAppState();

  const publishedCourses = state.courses.filter((c) => c.visibility === 'published').length;
  const draftCourses = state.courses.filter((c) => c.visibility === 'draft').length;

  return (
    <WorkspaceShell
      surface="admin"
      title="Trung tâm Quản trị Hệ thống (Admin Console)"
      subtitle="Tổng quan người dùng mẫu, kiểm duyệt học liệu, đơn hàng minh họa và cấu hình đa mảng kiến thức"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Tài khoản mẫu</span>
            <Users className="h-4 w-4 text-indigo-600" aria-hidden="true" />
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900 dark:text-white">
            {state.users.length}
          </div>
          <p className="mt-1 text-xs text-slate-500">Học viên, Giảng viên & Quản trị</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Khóa học trên hệ thống</span>
            <BookOpen className="h-4 w-4 text-teal-600" aria-hidden="true" />
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900 dark:text-white">
            {publishedCourses} công khai / {draftCourses} nháp
          </div>
          <p className="mt-1 text-xs text-slate-500">Trải rộng trên {DOMAINS.length} mảng kiến thức</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Ngân hàng bài tập</span>
            <TerminalSquare className="h-4 w-4 text-amber-600" aria-hidden="true" />
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900 dark:text-white">
            {state.problems.length} bài toán
          </div>
          <p className="mt-1 text-xs text-slate-500">{state.submissions.length} bản ghi chấm mẫu</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Đơn mở khóa Demo</span>
            <Receipt className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="mt-2 font-mono text-2xl font-extrabold text-slate-900 dark:text-white">
            {state.orders.length} giao dịch mẫu
          </div>
          <p className="mt-1 text-xs text-slate-500">Không thu tiền thật</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Quản lý Người dùng & Phân vai
            </h2>
            <Link
              href={ROUTES.adminUsers}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              <span>Mở danh sách</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 space-y-2.5">
            {state.users.slice(0, 4).map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-950"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{u.displayName}</div>
                  <div className="text-slate-500">{u.emailDemo}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  {u.roles.map((r) => (
                    <span
                      key={r}
                      className="rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Các phân hệ Quản trị Mở rộng
            </h2>
            <ShieldCheck className="h-4 w-4 text-teal-600" aria-hidden="true" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href="/quan-tri/noi-dung"
              className="rounded-xl border border-slate-200 p-4 hover:border-indigo-400 dark:border-slate-800"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Kiểm duyệt Nội dung & Học liệu
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Duyệt trạng thái xuất bản của {state.courses.length} khóa học và {state.problems.length} bài tập.
              </p>
            </Link>
            <Link
              href="/quan-tri/don-hang"
              className="rounded-xl border border-slate-200 p-4 hover:border-indigo-400 dark:border-slate-800"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Đơn hàng Mở khóa Demo
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Tra cứu lịch sử kích hoạt quyền học thử ({formatVnd(750000)} minh họa).
              </p>
            </Link>
            <Link
              href="/quan-tri/cau-hinh"
              className="rounded-xl border border-slate-200 p-4 hover:border-indigo-400 sm:col-span-2 dark:border-slate-800"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Cấu hình Thương hiệu & Kiến trúc Đa Mảng (Multi-Domain Taxonomy)
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Xem cấu hình {DOMAINS.length} mảng kiến thức và thông số hệ thống UI Demo.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </WorkspaceShell>
  );
}
