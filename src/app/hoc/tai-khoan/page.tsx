'use client';

import React, { useState } from 'react';
import { RotateCcw, Sun, Moon, User, CheckCircle2 } from 'lucide-react';
import { GOAL_META } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useAppState } from '@/providers/AppStateProvider';
import type { AppRole, LearningGoal } from '@/types';

export default function LearnerAccountPage() {
  const {
    state,
    theme,
    setTheme,
    setRole,
    setActiveGoal,
    resetDemoData,
    showToast,
  } = useAppState();

  const [displayName, setDisplayName] = useState('Nguyễn Minh Khôi (Demo)');
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Đã lưu thiết lập hồ sơ cá nhân', 'Thay đổi được áp dụng trong phiên trình duyệt.', 'success');
  };

  return (
    <WorkspaceShell
      surface="learner"
      title="Thiết lập Tài khoản & Trải nghiệm Demo"
      subtitle="Quản lý giao diện Sáng/Tối, mục tiêu học tập và khôi phục dữ liệu mẫu gốc"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <User className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Hồ sơ Học viên Minh họa
                </h2>
                <p className="text-xs text-slate-500">minhkhoi.demo@algoacademy.vn</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="acc-display-name"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Tên hiển thị
                </label>
                <input
                  id="acc-display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="acc-goal-select"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Mục tiêu học tập chính
                </label>
                <select
                  id="acc-goal-select"
                  value={state.activeGoal}
                  onChange={(e) => setActiveGoal(e.target.value as LearningGoal)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  {(Object.keys(GOAL_META) as LearningGoal[]).map((g) => (
                    <option key={g} value={g}>
                      {GOAL_META[g].label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Lưu hồ sơ</span>
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Giao diện Sáng / Tối (Theme Mode)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Chế độ sáng tối ưu cho đọc lý thuyết dài; chế độ tối dễ chịu khi code ban đêm trong
              Coding Lab.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold ${
                  theme === 'light'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300'
                }`}
              >
                <Sun className="h-4 w-4" aria-hidden="true" />
                <span>Giao diện Sáng (Light)</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold ${
                  theme === 'dark'
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                    : 'border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300'
                }`}
              >
                <Moon className="h-4 w-4" aria-hidden="true" />
                <span>Giao diện Tối (Dark)</span>
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Chuyển nhanh Vai trò Trải nghiệm (Role Switcher)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Bạn có thể chuyển tức thì giữa 4 vai trò để kiểm thử mọi bề mặt của nền tảng.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(['guest', 'learner', 'teacher', 'admin'] as AppRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold uppercase ${
                    state.role === r
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 dark:border-rose-900/50 dark:bg-rose-950/20">
            <h2 className="text-base font-bold text-rose-900 dark:text-rose-200">
              Khôi phục dữ liệu mẫu ban đầu (Reset Demo Data)
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-rose-800 dark:text-rose-300">
              Xóa các thay đổi cục bộ trong <code>localStorage</code> và đưa toàn bộ khóa học, bài
              giảng, ghi chú, code nháp về trạng thái seed gốc.
            </p>
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-rose-700"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Khôi phục trạng thái mẫu gốc</span>
            </button>
          </section>
        </div>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Khôi phục toàn bộ dữ liệu mẫu ban đầu?"
        description="Các bài học tự tạo, ghi chú mới và bản nháp code của bạn trong trình duyệt sẽ trở về dữ liệu mặc định."
        confirmLabel="Khôi phục ngay"
        variant="danger"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetDemoData();
          setConfirmReset(false);
        }}
      />
    </WorkspaceShell>
  );
}
