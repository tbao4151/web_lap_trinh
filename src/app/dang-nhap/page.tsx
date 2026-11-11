'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserCheck,
  GraduationCap,
  BookOpenCheck,
  ShieldCheck,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
} from 'lucide-react';
import { ROLE_META, ROUTES } from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { useAppState } from '@/providers/AppStateProvider';
import type { AppRole } from '@/types';

const PERSONAS: Array<{
  role: AppRole;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
}> = [
  {
    role: 'learner',
    icon: GraduationCap,
    highlights: [
      'Truy cập Dashboard học viên, lộ trình và khóa đang học',
      'Trải nghiệm Lesson Player tương tác, làm quiz, ghi chú và DP Visualizer',
      'Luyện tập trong Coding Lab 4 ngôn ngữ (C, C++, Python, Java)',
    ],
  },
  {
    role: 'teacher',
    icon: BookOpenCheck,
    highlights: [
      'Quản lý danh sách khóa học, thêm/sửa học phần và bài học (Course Builder)',
      'Biên tập bài học dạng Block và chuyển đổi chế độ Xem thử Học viên / Giảng viên',
      'Quản lý ngân hàng đề, lớp học, bài giao và không gian nghiên cứu',
    ],
  },
  {
    role: 'admin',
    icon: ShieldCheck,
    highlights: [
      'Xem bức tranh tổng quan vận hành nền tảng và người dùng mẫu',
      'Thử nghiệm phân vai, kiểm duyệt nội dung và tra cứu đơn hàng mẫu',
      'Quản lý cấu hình danh mục và thương hiệu (Demo)',
    ],
  },
  {
    role: 'guest',
    icon: UserCheck,
    highlights: [
      'Khám phá danh mục khóa học, lọc theo ngôn ngữ, trình độ và mục tiêu',
      'Xem chi tiết khóa học và mở các bài học có nhãn Học thử miễn phí',
    ],
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { state, setRole, showToast } = useAppState();
  const [selectedRole, setSelectedRole] = useState<AppRole>(state.role);
  const [demoEmail, setDemoEmail] = useState('minhkhoi.demo@algoacademy.vn');
  const [emailError, setEmailError] = useState('');

  const handleContinuePersona = (role: AppRole) => {
    setRole(role);
    router.push(ROLE_META[role].defaultRoute);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoEmail.trim() || !demoEmail.includes('@')) {
      setEmailError('Vui lòng nhập địa chỉ email hợp lệ (ví dụ: hocvien@algoacademy.vn).');
      return;
    }
    setEmailError('');
    setRole(selectedRole);
    showToast(
      `Đã kích hoạt phiên trình diễn (${ROLE_META[selectedRole].badgeText})`,
      'Bản Demo không yêu cầu mật khẩu hay xác thực máy chủ.',
      'success'
    );
    router.push(ROLE_META[selectedRole].defaultRoute);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />

      <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
            <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Trải nghiệm đa vai trò minh bạch — Không yêu cầu mật khẩu thật</span>
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Chọn Persona để khám phá nền tảng
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base dark:text-slate-300">
            Trong giai đoạn triển khai UI, bạn có thể chuyển đổi tức thì giữa 4 vai trò bên dưới để kiểm thử trọn vẹn luồng Học tập, Luyện code, Giảng dạy và Quản trị.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PERSONAS.map(({ role, icon: Icon, highlights }) => {
            const meta = ROLE_META[role];
            const isCurrent = state.role === role;
            return (
              <div
                key={role}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20 dark:border-indigo-400 dark:bg-indigo-950/30'
                    : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900 dark:text-white">
                          {meta.label}
                        </h2>
                        <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                          Tài khoản mẫu: {meta.personaName}
                        </p>
                      </div>
                    </div>
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Đang bật</span>
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{meta.summary}</p>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleContinuePersona(role)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer"
                  >
                    <span>Vào với vai trò {meta.badgeText}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form đăng nhập mô phỏng có kiểm tra hợp lệ (Validation) */}
        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Hoặc kiểm thử Form đăng nhập Demo (Có kiểm tra hợp lệ)
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Biểu mẫu này chỉ kiểm tra định dạng phía giao diện và chuyển sang vai trò bạn chọn; không thu thập mật khẩu thật.
          </p>

          <form onSubmit={handleFormSubmit} noValidate className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="demo-email"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Email tài khoản Demo
              </label>
              <input
                id="demo-email"
                type="email"
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? 'demo-email-error' : undefined}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {emailError ? (
                <p id="demo-email-error" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                  {emailError}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="demo-role-select"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Vai trò sau khi đăng nhập
              </label>
              <select
                id="demo-role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as AppRole)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="learner">Học viên (Learner)</option>
                <option value="teacher">Giảng viên (Teacher)</option>
                <option value="admin">Quản trị viên (Admin)</option>
                <option value="guest">Khách tham quan (Guest)</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Link
                href={ROUTES.register}
                className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Chưa có tài khoản? Mở trang Đăng ký Demo →
              </Link>
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 cursor-pointer"
              >
                Đăng nhập Demo
              </button>
            </div>
          </form>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
