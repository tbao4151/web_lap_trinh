'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  BookOpen,
  TerminalSquare,
  FileEdit,
  CheckCircle2,
  Mail,
  Send,
  Layers,
} from 'lucide-react';
import { BRAND_CONFIG, DOMAINS, ROUTES } from '@/config/brand';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { useAppState } from '@/providers/AppStateProvider';

export default function AboutPage() {
  const { showToast } = useAppState();
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContactDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;
    showToast(
      'Đã ghi nhận phản hồi Demo',
      'Trong bản UI Demo, tin nhắn được kiểm tra hợp lệ ngay trên trình duyệt (chưa gửi email thật).',
      'success'
    );
    setSenderName('');
    setSenderEmail('');
    setMessage('');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <PublicHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Triết lý Sư phạm & Kiến trúc Học tập</span>
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {BRAND_CONFIG.name} — Học bản chất, trực quan hóa tư duy và thực hành chuẩn mực
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Chúng tôi thiết kế {BRAND_CONFIG.name} để giải quyết khoảng cách giữa việc &ldquo;đọc công thức
            trên giấy&rdquo; và &ldquo;viết được chương trình chạy đúng mọi trường hợp biên&rdquo;. Mọi bài học đều
            kết hợp lý thuyết có cấu trúc, mô phỏng từng bước và bài tập chia nhỏ theo Subtask.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950">
              <BookOpen className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              <h2 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                1. Lý thuyết Tương tác (Block-based)
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Bài học được chia thành các khối kiến thức rõ ràng: phân tích phản ví dụ, mô phỏng
                bảng phương án Quy hoạch động, hộp cảnh báo lỗi tràn số và câu hỏi kiểm tra tức thì.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950">
              <TerminalSquare className="h-6 w-6 text-teal-600" aria-hidden="true" />
              <h2 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                2. Thực hành Đa ngôn ngữ theo Subtask
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Hỗ trợ C, C++, Python và Java. Học viên từ số 0 có thể lấy điểm Subtask 1 bằng cách
                duyệt cơ bản trước khi tối ưu thuật toán cho Subtask 2, 3.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950">
              <FileEdit className="h-6 w-6 text-amber-600" aria-hidden="true" />
              <h2 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                3. Teaching Studio cho Giảng viên
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Giảng viên có không gian nghiên cứu chuyên đề, chuyển đổi ghi chép thành bản nháp
                bài giảng và đính kèm ghi chú sư phạm ẩn với học viên.
              </p>
            </div>
          </div>
        </section>

        {/* Multi-domain taxonomy */}
        <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
            <Layers className="h-4 w-4" aria-hidden="true" />
            <span>Kiến trúc Mở rộng Đa Mảng Kiến thức</span>
          </div>
          <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            Không giới hạn ở một ngôn ngữ hay một kỳ thi duy nhất
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {DOMAINS.map((d) => (
              <div
                key={d.id}
                className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{d.name}</h3>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {d.requiresCodeEditor ? 'Tích hợp Coding Lab' : 'Lý thuyết & Dự án'}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300">{d.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Demo */}
        <section className="mt-8 grid gap-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 lg:grid-cols-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Liên hệ & Hợp tác Đào tạo (Demo)
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
              Dành cho giáo viên Tin học, câu lạc bộ lập trình hoặc học viên muốn đóng góp ý kiến về
              cấu trúc học liệu.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                <span>Email minh họa: {BRAND_CONFIG.contactEmailDemo}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <span>Phiên bản hệ thống: {BRAND_CONFIG.version}</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href={ROUTES.courses}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                <span>Khám phá danh mục khóa học</span>
              </Link>
            </div>
          </div>

          <form onSubmit={handleContactDemo} className="space-y-4 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Họ và tên
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Nhập họ tên của bạn..."
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Email liên hệ
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="ban@school.edu.vn"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-msg"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Nội dung trao đổi
              </label>
              <textarea
                id="contact-msg"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Góp ý về khóa học hoặc yêu cầu mở lớp học thử..."
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Gửi phản hồi minh họa</span>
            </button>
          </form>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
