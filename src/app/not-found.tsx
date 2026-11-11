import React from 'react';
import Link from 'next/link';
import { Compass, Home, TerminalSquare } from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main
        id="main-content"
        className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center"
      >
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-mono text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300">
          HTTP 404 · Không tìm thấy đường dẫn
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Trang hoặc học liệu bạn tìm không tồn tại
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Đường dẫn có thể đã thay đổi hoặc bài học chưa được khởi tạo trong bộ dữ liệu mẫu. Bạn có thể quay về trang chủ hoặc khám phá danh mục khóa học bên dưới.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={ROUTES.home}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Về Trang chủ</span>
          </Link>
          <Link
            href={ROUTES.courses}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            <span>Khám phá khóa học</span>
          </Link>
          <Link
            href={ROUTES.practiceBank}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <TerminalSquare className="h-4 w-4" aria-hidden="true" />
            <span>Ngân hàng bài tập</span>
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
