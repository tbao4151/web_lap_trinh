'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Unlock,
} from 'lucide-react';
import { ROUTES, formatVnd } from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppState } from '@/providers/AppStateProvider';
import { commerceService, courseService } from '@/services';

export default function CheckoutPreviewPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = use(params);
  const router = useRouter();
  const { state, enrollCourseDemo } = useAppState();

  const course = courseService.getBySlug(state, courseSlug);

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <PublicHeader />
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
          <EmptyState
            title="Không tìm thấy khóa học"
            description="Khóa học bạn muốn mở quyền truy cập không tồn tại."
            actionLabel="Về danh mục khóa học"
            actionHref={ROUTES.courses}
          />
        </main>
        <PublicFooter />
      </div>
    );
  }

  const isUnlocked = commerceService.hasCourseEntitlement(state, course);
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const firstLessonSlug = course.modules[0]?.lessons[0]?.slug ?? '';

  const handleUnlockDemo = () => {
    enrollCourseDemo(course.slug);
    if (firstLessonSlug) {
      router.push(ROUTES.lessonPlayer(course.slug, firstLessonSlug));
    } else {
      router.push(ROUTES.courseDetail(course.slug));
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <PublicHeader />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6">
        <Link
          href={ROUTES.courseDetail(course.slug)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Quay lại chi tiết khóa học</span>
        </Link>

        <div className="mt-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50/90 p-4 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
            <div>
              <strong className="font-bold">
                Màn hình Xem trước Luồng Kích hoạt Khóa học (Không thu phí thật):
              </strong>{' '}
              Đây là bản trình diễn giao diện (UI Demo). Hệ thống tuyệt đối không yêu cầu nhập thẻ
              ngân hàng, không tạo mã QR thanh toán thật và không phát sinh giao dịch tài chính. Bạn
              có thể nhấn nút bên dưới để mở khóa toàn bộ bài học ngay trong phiên trình duyệt này.
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-12">
            <div className="space-y-4 md:col-span-7">
              <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                Thông tin học liệu mở khóa
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                {course.title}
              </h1>
              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                {course.shortDescription}
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Quyền lợi học tập bao gồm:
                </div>
                <ul className="mt-2.5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <span>
                      Truy cập toàn bộ {course.modules.length} học phần ({totalLessons} bài giảng
                      tương tác)
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <span>
                      Thực hành code trực tiếp và lưu nháp theo từng ngôn ngữ ({course.languages.join(', ').toUpperCase()})
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    <span>Đồng bộ ghi chú cá nhân và bản đồ kỹ năng</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 md:col-span-5 dark:border-indigo-900/60 dark:bg-indigo-950/30">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">
                  Học phí niêm yết minh họa
                </div>
                <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900 dark:text-white">
                  {formatVnd(course.priceVnd)}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  <span>Miễn phí 100% trong chế độ UI Demo</span>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                {isUnlocked ? (
                  <Link
                    href={
                      firstLessonSlug
                        ? ROUTES.lessonPlayer(course.slug, firstLessonSlug)
                        : ROUTES.courseDetail(course.slug)
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    <span>Khóa học đã mở — Vào học ngay</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleUnlockDemo}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                  >
                    <Unlock className="h-4 w-4" aria-hidden="true" />
                    <span>Kích hoạt quyền Học thử Demo ngay</span>
                  </button>
                )}
                <p className="text-center text-[11px] text-slate-500">
                  Trạng thái mở khóa được lưu trong <code>localStorage</code> của trình duyệt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
