'use client';

import React from 'react';
import { GOAL_META } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { useAppState } from '@/providers/AppStateProvider';
import type { AppRole } from '@/types';

export default function AdminUsersPage() {
  const { state, updateUserRoleDemo, toggleUserStatusDemo } = useAppState();

  const toggleRole = (userId: string, currentRoles: AppRole[], targetRole: AppRole) => {
    const exists = currentRoles.includes(targetRole);
    const nextRoles: AppRole[] = exists
      ? currentRoles.filter((r) => r !== targetRole)
      : [...currentRoles, targetRole];
    if (nextRoles.length === 0) return;
    updateUserRoleDemo(userId, nextRoles);
  };

  return (
    <WorkspaceShell
      surface="admin"
      title="Quản lý Người dùng & Phân vai (Demo)"
      subtitle="Bật/tắt vai trò Học viên, Giảng viên, Quản trị viên và trạng thái tài khoản mẫu"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60">
                <th className="px-4 py-3.5">Người dùng</th>
                <th className="px-4 py-3.5">Mục tiêu chính</th>
                <th className="px-4 py-3.5">Phân vai (Click để bật/tắt)</th>
                <th className="px-4 py-3.5">Ngày tham gia</th>
                <th className="px-4 py-3.5">Trạng thái</th>
                <th className="px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
              {state.users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {user.displayName}
                    </div>
                    <div className="text-xs text-slate-500">{user.emailDemo}</div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-600 dark:text-slate-300">
                    {GOAL_META[user.primaryGoal].label}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {(['learner', 'teacher', 'admin'] as AppRole[]).map((r) => {
                        const active = user.roles.includes(r);
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => toggleRole(user.id, user.roles, r)}
                            className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-colors ${
                              active
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">
                    {user.joinedAt}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-bold ${
                        user.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : user.status === 'invited'
                            ? 'bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                            : 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {user.status === 'active'
                        ? 'Đang hoạt động'
                        : user.status === 'invited'
                          ? 'Đã mời'
                          : 'Tạm khóa'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => toggleUserStatusDemo(user.id)}
                      className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                    >
                      {user.status === 'active' ? 'Tạm khóa Demo' : 'Kích hoạt lại'}
                    </button>
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
