'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FlaskConical,
  Sun,
  Moon,
  RotateCcw,
  UserCheck,
  GraduationCap,
  BookOpenCheck,
  ShieldCheck,
} from 'lucide-react';
import { ROLE_META } from '@/config/brand';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useAppState } from '@/providers/AppStateProvider';
import type { AppRole } from '@/types';

const ROLES: AppRole[] = ['guest', 'learner', 'teacher', 'admin'];

export function RoleSwitcherBar() {
  const router = useRouter();
  const { state, setRole, theme, toggleTheme, resetDemoData } = useAppState();
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleSelectRole = (nextRole: AppRole) => {
    setRole(nextRole);
    router.push(ROLE_META[nextRole].defaultRoute);
  };

  return (
    <>
      <div className="border-b border-indigo-200/80 bg-indigo-950 text-slate-100 text-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-2.5 py-0.5 font-medium text-indigo-200 border border-indigo-400/30">
              <FlaskConical className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />
              <span>Chế độ trình diễn UI (Mock State)</span>
            </span>
            <span className="hidden text-slate-300 lg:inline">
              Đang xem với vai trò:{' '}
              <strong className="font-semibold text-white">
                {ROLE_META[state.role].personaName}
              </strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Chuyển vai trò trình diễn">
            <span className="mr-1 hidden text-slate-400 sm:inline">Chuyển Persona:</span>
            {ROLES.map((roleKey) => {
              const active = state.role === roleKey;
              const Icon =
                roleKey === 'guest'
                  ? UserCheck
                  : roleKey === 'learner'
                    ? GraduationCap
                    : roleKey === 'teacher'
                      ? BookOpenCheck
                      : ShieldCheck;
              const shortText =
                roleKey === 'guest'
                  ? 'Khách'
                  : roleKey === 'learner'
                    ? 'Học viên'
                    : roleKey === 'teacher'
                      ? 'Giảng viên'
                      : 'Quản trị';

              return (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => handleSelectRole(roleKey)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-400'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{shortText}</span>
                </button>
              );
            })}

            <div className="mx-1 h-4 w-px bg-slate-700" aria-hidden="true" />

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              className="inline-flex items-center gap-1 rounded-md bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
                  <span className="hidden sm:inline">Sáng</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-indigo-300" aria-hidden="true" />
                  <span className="hidden sm:inline">Tối</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setConfirmResetOpen(true)}
              className="inline-flex items-center gap-1 rounded-md bg-slate-800/90 px-2.5 py-1 text-xs font-medium text-rose-200 hover:bg-rose-900/60 hover:text-white cursor-pointer"
              title="Khôi phục dữ liệu mẫu ban đầu"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmResetOpen}
        title="Khôi phục dữ liệu mẫu về trạng thái gốc?"
        description="Toàn bộ thay đổi trong trình duyệt (khóa học nháp, các block đã sửa, ghi chú học tập, tiến độ hoàn thành và bản nháp code) sẽ được đặt lại về bộ dữ liệu seed ban đầu."
        confirmLabel="Khôi phục dữ liệu mẫu"
        cancelLabel="Giữ nguyên"
        variant="danger"
        onConfirm={resetDemoData}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </>
  );
}
