'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  BookOpen,
  Users,
  FileCheck2,
  Edit3,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { DOMAINS, ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { DifficultyBadge, SubmissionStatusBadge } from '@/components/ui/Badges';
import { useAppState } from '@/providers/AppStateProvider';

export default function TeacherDashboardPage() {
  const router = useRouter();
  const { state, createCourseDraft } = useAppState();
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState(DOMAINS[0].id);
  const [showCreateBox, setShowCreateBox] = useState(false);

  const publishedCount = state.courses.filter((c) => c.visibility === 'published').length;
  const draftCount = state.courses.filter((c) => c.visibility === 'draft').length;
  const totalLessonsCount = Object.keys(state.lessonsBySlug).length;

  const handleQuickCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = createCourseDraft(newTitle.trim(), newDomain);
    setNewTitle('');
    setShowCreateBox(false);
    router.push(ROUTES.courseBuilder(created.slug));
  };

  return (
    <WorkspaceShell
      surface="teacher"
      title="Teaching Studio — Bảng điều khiển Giảng viên"
      subtitle="Biên soạn cấu trúc khóa học, thiết kế bài giảng dạng Block, quản lý lớp học và nghiên cứu thuật toán."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCreateBox((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 cursor-pointer"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Tạo khóa học mới</span>
          </button>
          <Link
            href={ROUTES.lessonEditor('dp-1d-doi-tien')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Layers className="h-4 w-4 text-teal-600" aria-hidden="true" />
            <span>Soạn bài mẫu DP Đổi tiền</span>
          </Link>
        </div>
      }
    >
      {/* Quick Create Course Modal/Drawer Box */}
      {showCreateBox ? (
        <form
          onSubmit={handleQuickCreateCourse}
          className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 dark:border-indigo-900 dark:bg-indigo-950/40"
        >
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Khởi tạo Bản nháp Khóa học mới
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-12">
            <div className="sm:col-span-6">
              <label htmlFor="quick-course-title" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tên khóa học
              </label>
              <input
                id="quick-course-title"
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ví dụ: Đồ thị và Cây khung nhỏ nhất (Kruskal, Prim)"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="quick-course-domain" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Lĩnh vực
              </label>
              <select
                id="quick-course-domain"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2 sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer"
              >
                Tạo & Biên soạn
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {/* Metrics Derived from Real State */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500">Tổng số khóa học</div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {state.courses.length}
          </div>
          <div className="mt-1 text-xs text-teal-700 dark:text-teal-400">
            Đã xuất bản: {publishedCount} · Bản nháp: {draftCount}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500">Bài học & Ngân hàng đề</div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {totalLessonsCount} bài · {state.problems.length} đề
          </div>
          <Link
            href={ROUTES.teacherProblemBank}
            className="mt-1 inline-block text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Quản lý ngân hàng đề →
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500">Lớp học đang phụ trách</div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {state.classrooms.length} lớp
          </div>
          <Link
            href={ROUTES.classrooms}
            className="mt-1 inline-block text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Xem danh sách học sinh →
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-medium text-slate-500">Ghi chép Nghiên cứu</div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
            {state.researchNotes.length} chuyên đề
          </div>
          <Link
            href={ROUTES.teacherResearch}
            className="mt-1 inline-block text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Mở Không gian nghiên cứu →
          </Link>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href={ROUTES.courseBuilder('dp-tu-duy-den-nang-cao')}
          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Biên soạn Đề cương Khóa DP
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Thêm/sửa học phần, bài học và xuất bản thử
            </p>
          </div>
        </Link>

        <Link
          href={ROUTES.lessonEditor('dp-1d-doi-tien')}
          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="rounded-xl bg-teal-50 p-2.5 text-teal-600 dark:bg-teal-950 dark:text-teal-300">
            <Edit3 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Trình soạn thảo Block Bài học
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Sửa các khối nội dung và xem thử Học viên / Giảng viên
            </p>
          </div>
        </Link>

        <Link
          href={ROUTES.problemEditor('doi-tien-it-nhat')}
          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
            <FileCheck2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Biên tập Đề bài & Subtasks
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Chỉnh sửa đề bài P009, ví dụ mẫu và nhóm test
            </p>
          </div>
        </Link>

        <Link
          href={ROUTES.classroomDetail('cls-hsg-11')}
          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            <Users className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Lớp Đội tuyển HSG Khối 11
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Theo dõi bài giao và tiến độ học sinh
            </p>
          </div>
        </Link>
      </div>

      {/* Course Authoring Table & Recent Submissions */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Tiến độ biên soạn các khóa học
              </h2>
              <Link
                href={ROUTES.teacherCourses}
                className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Quản lý tất cả →
              </Link>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500 dark:border-slate-800">
                    <th className="pb-2.5">Khóa học</th>
                    <th className="pb-2.5">Trình độ</th>
                    <th className="pb-2.5">Trạng thái</th>
                    <th className="pb-2.5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {state.courses.slice(0, 6).map((course) => (
                    <tr key={course.id}>
                      <td className="py-3 pr-2">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {course.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {course.modules.length} học phần · Cập nhật {course.updatedAt}
                        </div>
                      </td>
                      <td className="py-3 pr-2">
                        <DifficultyBadge level={course.level} />
                      </td>
                      <td className="py-3 pr-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                            course.visibility === 'published'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {course.visibility === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </span>
                      </td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <Link
                          href={ROUTES.courseBuilder(course.slug)}
                          className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300"
                        >
                          <span>Biên soạn</span>
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Student Submissions */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Bài nộp gần đây từ lớp học
              </h2>
              <Link
                href={ROUTES.teacherSubmissions}
                className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Tất cả ({state.submissions.length}) →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {state.submissions.slice(0, 5).map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800"
                >
                  <div className="min-w-0">
                    <div className="truncate text-xs font-bold text-slate-900 dark:text-white">
                      {sub.userName} · {sub.problemTitle}
                    </div>
                    <div className="mt-0.5 text-[11px] text-slate-500">
                      {sub.submittedAt} · Điểm: {sub.score}/{sub.maxScore}
                    </div>
                  </div>
                  <Link href={ROUTES.submissionDetail(sub.id)} className="shrink-0">
                    <SubmissionStatusBadge status={sub.status} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}
