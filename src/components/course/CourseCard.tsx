import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { DOMAINS, formatVnd, ROUTES } from '@/config/brand';
import { DifficultyBadge, LanguageBadges } from '@/components/ui/Badges';
import type { Course } from '@/types';

const BANNER_STYLES: Record<Course['bannerTone'], string> = {
  indigo: 'from-indigo-600 to-indigo-800 text-white',
  teal: 'from-teal-600 to-emerald-800 text-white',
  slate: 'from-slate-700 to-slate-900 text-white',
  amber: 'from-amber-600 to-orange-800 text-white',
  emerald: 'from-emerald-600 to-teal-800 text-white',
  violet: 'from-violet-600 to-indigo-900 text-white',
};

export function CourseCard({
  course,
  progressPercent,
  isEnrolled = false,
}: {
  course: Course;
  progressPercent?: number;
  isEnrolled?: boolean;
}) {
  const domain = DOMAINS.find((d) => d.id === course.domainId);
  const lessonCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  // Do not advertise a locked lesson as a free preview.
  const firstPreview = course.modules.flatMap((m) => m.lessons).find((l) => l.isPreview);
  const lessonToOpen = isEnrolled ? (course.modules[0]?.lessons[0] ?? firstPreview) : firstPreview;

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white shadow-2xs transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700">
      <div>
        {/* Custom Visual Banner Header */}
        <div
          className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br p-5 ${
            BANNER_STYLES[course.bannerTone]
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-md bg-white/15 px-2.5 py-0.5 text-xs font-medium backdrop-blur-xs">
              {domain?.name ?? 'Chuyên đề'}
            </span>
            <span className="rounded-md bg-slate-950/35 px-2.5 py-0.5 font-mono text-xs font-semibold">
              {course.priceVnd === 0 ? 'Miễn phí' : `${formatVnd(course.priceVnd)} (Demo)`}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight">
            <Link
              href={ROUTES.courseDetail(course.slug)}
              className="hover:underline focus-visible:underline"
            >
              {course.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-white/85">{course.instructorName}</p>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <DifficultyBadge level={course.level} />
            <LanguageBadges languages={course.languages} compact />
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
            {course.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {course.modules.length} học phần · {lessonCount} bài học
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{course.estimatedHours} giờ</span>
            </span>
          </div>

          {typeof progressPercent === 'number' && isEnrolled ? (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 font-medium text-teal-700 dark:text-teal-400">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tiến độ học tập</span>
                </span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
                  {progressPercent}%
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all dark:bg-teal-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-5 py-3.5 dark:border-slate-800/80">
        <Link
          href={ROUTES.courseDetail(course.slug)}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Xem đề cương chi tiết
        </Link>

        {lessonToOpen ? (
          <Link
            href={ROUTES.lessonPlayer(course.slug, lessonToOpen.slug)}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-indigo-600 hover:text-white transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-indigo-600"
          >
            <span>{isEnrolled ? 'Học tiếp' : 'Học thử ngay'}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
