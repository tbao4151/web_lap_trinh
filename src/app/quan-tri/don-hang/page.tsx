'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { ROUTES, formatVnd } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DemoBadge } from '@/components/ui/Badges';
import { useAppState } from '@/providers/AppStateProvider';

export default function AdminOrdersPage() {
  const { state } = useAppState();

  return (
    <WorkspaceShell
      surface="admin"
      title="Nhật ký Kích hoạt Khóa học (Demo Orders)"
      subtitle="Danh sách bản ghi mở khóa quyền học thử trong môi trường UI Demo — không phát sinh giao dịch tiền thật"
    >
      <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          <span>
            Mọi bản ghi dưới đây là dữ liệu minh họa cho luồng cấp quyền truy cập học liệu
            (Entitlement Preview).
          </span>
        </div>
        <DemoBadge text="Không thu tiền thật" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60">
                <th className="px-4 py-3.5">Mã chứng từ Demo</th>
                <th className="px-4 py-3.5">Học viên</th>
                <th className="px-4 py-3.5">Khóa học</th>
                <th className="px-4 py-3.5">Giá niêm yết minh họa</th>
                <th className="px-4 py-3.5">Trạng thái</th>
                <th className="px-4 py-3.5">Thời gian</th>
                <th className="px-4 py-3.5 text-right">Luồng mở khóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {state.orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {ord.orderCode}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-slate-900 dark:text-white">
                    {ord.userName}
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                    {ord.courseTitle}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs font-bold">
                    {formatVnd(ord.amountVnd)}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${
                        ord.status === 'demo-unlocked'
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}
                    >
                      {ord.status === 'demo-unlocked'
                        ? 'Đã mở khóa Demo'
                        : 'Đang chờ kích hoạt Demo'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">
                    {ord.createdAt}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Link
                      href={ROUTES.checkout(ord.courseSlug)}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                    >
                      <span>Xem trang kích hoạt</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WorkspaceShell>
  );
}
