import React from 'react';
import Link from 'next/link';
import { Code2, FlaskConical } from 'lucide-react';
import { BRAND_CONFIG, ROUTES } from '@/config/brand';

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Code2 className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold">{BRAND_CONFIG.name}</span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed">
              {BRAND_CONFIG.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <FlaskConical className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden="true" />
              <span>{BRAND_CONFIG.demoNotice}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Học viện & Lộ trình</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <Link href={ROUTES.courses} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Danh mục khóa học
                </Link>
              </li>
              <li>
                <Link href={ROUTES.learningPaths} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Lộ trình theo mục tiêu
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.lessonPlayer('dp-tu-duy-den-nang-cao', 'dp-1d-doi-tien')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Bài học mẫu: DP Đổi tiền
                </Link>
              </li>
              <li>
                <Link href={ROUTES.publicProblems} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Ngân hàng bài tập mẫu
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">4 Trụ cột Nền tảng</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <Link href={ROUTES.learnerDashboard} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Learning Studio (Học viên)
                </Link>
              </li>
              <li>
                <Link href={ROUTES.codingLab('doi-tien-it-nhat')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Coding Lab (Thực hành 4 ngôn ngữ)
                </Link>
              </li>
              <li>
                <Link href={ROUTES.teacherDashboard} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Teaching Studio (Giảng viên)
                </Link>
              </li>
              <li>
                <Link href={ROUTES.adminDashboard} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Quản trị hệ thống (Demo)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Thông tin & Chính sách</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li>
                <Link href={ROUTES.about} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Về {BRAND_CONFIG.name}
                </Link>
              </li>
              <li>
                <Link href={ROUTES.login} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Chuyển đổi Persona Demo
                </Link>
              </li>
              <li className="text-xs text-slate-500 dark:text-slate-500">
                Điều khoản & Bảo mật (Placeholder minh họa giai đoạn UI)
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row dark:border-slate-800">
          <p>© 2026 {BRAND_CONFIG.name}. Thiết kế chuẩn EdTech đa trình độ (Phiên bản {BRAND_CONFIG.version}).</p>
          <p>Hỗ trợ ngôn ngữ khởi đầu: C · C++ · Python · Java & các chuyên đề CNTT mở rộng.</p>
        </div>
      </div>
    </footer>
  );
}
