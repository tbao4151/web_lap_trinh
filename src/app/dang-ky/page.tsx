'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { GOAL_META, ROUTES } from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { useAppState } from '@/providers/AppStateProvider';
import type { AppRole, LearningGoal } from '@/types';

export default function RegisterDemoPage() {
  const router = useRouter();
  const { setRole, setActiveGoal, showToast } = useAppState();

  const [fullName, setFullName] = useState('Nguyễn Minh Khôi');
  const [email, setEmail] = useState('hocvien.moi@algoacademy.vn');
  const [selectedRole, setSelectedRole] = useState<AppRole>('learner');
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>('competitive');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !email.includes('@')) {
      setErrorMsg('Vui lòng nhập đầy đủ họ tên và địa chỉ email hợp lệ.');
      return;
    }
    setErrorMsg('');
    setRole(selectedRole);
    setActiveGoal(selectedGoal);
    showToast(
      `Chào mừng ${fullName} đến với bản Demo!`,
      'Tài khoản mô phỏng đã được kích hoạt trên trình duyệt.',
      'success'
    );
    router.push(selectedRole === 'teacher' ? ROUTES.teacherDashboard : ROUTES.learnerDashboard);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <PublicHeader />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <UserPlus className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                Khởi tạo Hồ sơ Trải nghiệm (UI Demo)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thiết lập mục tiêu học tập và vai trò để cá nhân hóa dữ liệu mẫu
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
            <div>
              <strong>Lưu ý minh bạch:</strong> Biểu mẫu này mô phỏng luồng đăng ký và cá nhân hóa
              lộ trình đầu vào (Onboarding). Hệ thống không thu thập mật khẩu thật hay gửi dữ liệu
              lên máy chủ.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            {errorMsg ? (
              <div
                role="alert"
                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300"
              >
                {errorMsg}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="reg-fullname"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Họ và tên hiển thị
                </label>
                <input
                  id="reg-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Email minh họa
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                1. Chọn vai trò bạn muốn trải nghiệm
              </span>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('learner')}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    selectedRole === 'learner'
                      ? 'border-indigo-600 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/40'
                      : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Học viên (Learner)
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Học lý thuyết, chạy mô phỏng DP, giải bài trong Coding Lab.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('teacher')}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    selectedRole === 'teacher'
                      ? 'border-indigo-600 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/40'
                      : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Giảng viên (Teacher)
                  </div>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Biên soạn khóa học, chỉnh sửa Block bài giảng và quản lý lớp.
                  </p>
                </button>
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                2. Chọn mục tiêu học tập trọng tâm
              </span>
              <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                {(Object.keys(GOAL_META) as LearningGoal[]).map((goal) => {
                  const active = selectedGoal === goal;
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setSelectedGoal(goal)}
                      className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition-colors ${
                        active
                          ? 'border-indigo-600 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/40'
                          : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950'
                      }`}
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          active ? 'text-indigo-600' : 'text-slate-300 dark:text-slate-700'
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {GOAL_META[goal].label}
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {GOAL_META[goal].subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-indigo-700"
            >
              <span>Bắt đầu trải nghiệm ngay</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-500 dark:border-slate-800">
            Đã có sẵn hồ sơ mẫu?{' '}
            <Link
              href={ROUTES.login}
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Chuyển sang trang Đăng nhập nhanh Demo
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
