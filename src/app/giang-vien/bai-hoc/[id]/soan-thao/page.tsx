'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  FileEdit,
  ExternalLink,
  Code2,
  BookOpen,
  AlertCircle,
  HelpCircle,
  TerminalSquare,
  Layers,
  Image as ImageIcon,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { ROUTES } from '@/config/brand';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState } from '@/components/ui/EmptyState';
import { LessonBlockRenderer } from '@/components/lesson/LessonBlockRenderer';
import { useAppState } from '@/providers/AppStateProvider';
import { courseService, lessonService } from '@/services';
import type {
  CalloutBlockData,
  LessonBlock,
  LessonBlockType,
  LessonDetail,
  ProgrammingLanguage,
} from '@/types';

const BLOCK_TYPE_OPTIONS: Array<{
  type: LessonBlockType;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    type: 'richText',
    label: 'Văn bản & Công thức (Rich Text)',
    desc: 'Tiêu đề mục, đoạn văn giải thích, gạch đầu dòng và công thức.',
    icon: BookOpen,
  },
  {
    type: 'code',
    label: 'Khối mã nguồn đa ngôn ngữ (Code)',
    desc: 'Snippet C / C++ / Python / Java kèm độ phức tạp và I/O minh họa.',
    icon: Code2,
  },
  {
    type: 'callout',
    label: 'Hộp lưu ý / Bẫy sai lầm (Callout)',
    desc: 'Nhấn mạnh lưu ý quan trọng, cảnh báo tràn số hoặc mẹo tối ưu.',
    icon: AlertCircle,
  },
  {
    type: 'quiz',
    label: 'Câu hỏi kiểm tra nhanh (Quiz)',
    desc: 'Trắc nghiệm kiểm tra hiểu bài ngay trong luồng đọc lý thuyết.',
    icon: HelpCircle,
  },
  {
    type: 'problemReference',
    label: 'Liên kết bài tập Coding Lab',
    desc: 'Gắn thẻ bài tập thực hành từ ngân hàng đề vào bài học.',
    icon: TerminalSquare,
  },
  {
    type: 'teacherNote',
    label: 'Ghi chú sư phạm (Ẩn với Học viên)',
    desc: 'Mục tiêu giảng dạy, câu hỏi thường gặp và phân bổ thời gian trên lớp.',
    icon: EyeOff,
  },
  {
    type: 'slide',
    label: 'Tóm tắt Slide trình chiếu',
    desc: 'Chuỗi thẻ tóm tắt lý thuyết phục vụ trình chiếu.',
    icon: Layers,
  },
  {
    type: 'image',
    label: 'Sơ đồ trực quan (Diagram)',
    desc: 'Sơ đồ bộ nhớ mảng, DAG Quy hoạch động, Tìm kiếm nhị phân.',
    icon: ImageIcon,
  },
  {
    type: 'interactive',
    label: 'Mô phỏng tương tác (Interactive DP)',
    desc: 'Widget chạy từng bước bảng phương án Quy hoạch động.',
    icon: Sparkles,
  },
  {
    type: 'video',
    label: 'Khung bài giảng Video',
    desc: 'Tóm tắt nội dung video và mốc thời gian.',
    icon: PlayCircle,
  },
];

function createDefaultBlock(type: LessonBlockType, order: number): LessonBlock {
  const id = `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  switch (type) {
    case 'richText':
      return {
        id,
        type: 'richText',
        order,
        data: {
          heading: 'Tiêu đề phần lý thuyết mới',
          paragraphs: [
            'Nhập nội dung giải thích khái niệm hoặc phân tích tư duy thuật toán tại đây.',
          ],
          bulletPoints: ['Ý chính thứ nhất cần ghi nhớ', 'Ý chính thứ hai về điều kiện biên'],
        },
      };
    case 'code':
      return {
        id,
        type: 'code',
        order,
        data: {
          title: 'Cài đặt mẫu đa ngôn ngữ',
          defaultLanguage: 'cpp',
          complexityNote: 'Time: O(N) | Space: O(N)',
          snippets: {
            cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello AlgoAcademy\\n";\n    return 0;\n}',
            python: 'def solve():\n    print("Hello AlgoAcademy")\n\nsolve()',
          },
          sampleInput: '5\n1 2 3 4 5',
          expectedOutput: '15',
        },
      };
    case 'callout':
      return {
        id,
        type: 'callout',
        order,
        data: {
          variant: 'mistake',
          title: 'Lỗi sai thường gặp khi cài đặt',
          content: 'Kiểm tra kỹ kiểu dữ liệu 64-bit (long long) khi tổng vượt quá 2 * 10^9.',
        },
      };
    case 'quiz':
      return {
        id,
        type: 'quiz',
        order,
        data: {
          question: 'Độ phức tạp thời gian của thuật toán vừa phân tích là bao nhiêu?',
          conceptTag: 'Phân tích độ phức tạp',
          correctOptionId: 'opt-b',
          options: [
            {
              id: 'opt-a',
              text: 'O(N^2)',
              explanation: 'Chưa chính xác vì mỗi phần tử chỉ được duyệt qua một số hằng số lần.',
            },
            {
              id: 'opt-b',
              text: 'O(N log N)',
              explanation: 'Chính xác! Bước sắp xếp chiếm O(N log N) và bước duyệt tuyến tính chiếm O(N).',
            },
            {
              id: 'opt-c',
              text: 'O(2^N)',
              explanation: 'Không phải vét cạn đệ quy.',
            },
          ],
        },
      };
    case 'problemReference':
      return {
        id,
        type: 'problemReference',
        order,
        data: {
          problemSlug: 'doi-tien-it-xu-nhat',
          promptNote: 'Áp dụng ngay công thức vừa học để giải bài toán này trong Coding Lab.',
        },
      };
    case 'teacherNote':
      return {
        id,
        type: 'teacherNote',
        order,
        data: {
          pedagogyGoal: 'Giúp học viên tự phát hiện phản ví dụ của thuật toán Tham lam trước khi dạy Quy hoạch động.',
          commonStudentQuestions: [
            'Tại sao khởi tạo mảng bằng INF mà không dùng INT_MAX?',
          ],
          classroomTimingNote: 'Dành 10 phút đầu cho học viên thử nghiệm trên bảng.',
        },
      };
    case 'slide':
      return {
        id,
        type: 'slide',
        order,
        data: {
          deckTitle: 'Tóm tắt 3 bước thiết kế thuật toán',
          slides: [
            {
              title: 'Bước 1: Xác định trạng thái',
              subtitle: 'Định nghĩa ý nghĩa của dp[i]',
              bullets: ['Trạng thái cần đủ thông tin để chuyển tiếp', 'Số trạng thái quyết định bộ nhớ'],
            },
            {
              title: 'Bước 2: Công thức chuyển trạng thái',
              subtitle: 'Liên hệ bài toán lớn với bài toán con',
              bullets: ['Xét các lựa chọn tại bước cuối', 'Khởi tạo cơ sở rõ ràng'],
            },
          ],
        },
      };
    case 'image':
      return {
        id,
        type: 'image',
        order,
        data: {
          caption: 'Sơ đồ minh họa cấu trúc dữ liệu và chuyển trạng thái',
          alt: 'Sơ đồ thuật toán',
          diagramType: 'dp-dag',
        },
      };
    case 'interactive':
      return {
        id,
        type: 'interactive',
        order,
        data: {
          widgetType: 'dp-coin-change',
          title: 'Mô phỏng bảng phương án Đổi tiền (DP Visualizer)',
          description: 'Chạy từng bước để quan sát cách cập nhật dp[s].',
          presets: [
            {
              id: 'preset-custom',
              label: 'Phản ví dụ tham lam {1, 3, 4}, S = 6',
              coins: [1, 3, 4],
              target: 6,
              note: 'Tham lam chọn 4+1+1 (3 xu), tối ưu chọn 3+3 (2 xu).',
            },
          ],
        },
      };
    case 'video':
      return {
        id,
        type: 'video',
        order,
        data: {
          title: 'Video phân tích trực quan trên bảng',
          durationLabel: '12:30',
          summary: 'Giảng viên trình bày từng bước xây dựng công thức và sửa lỗi tràn số.',
          transcriptOutline: [
            '00:00 — Đặt vấn đề và phân tích giới hạn',
            '04:30 — Xây dựng công thức truy hồi',
            '09:15 — Cài đặt mẫu C++ và Python',
          ],
        },
      };
  }
}

export default function LessonBlockEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { state, saveLessonDetail, showToast } = useAppState();

  const sourceLesson = lessonService.get(state, id);
  const [draft, setDraft] = useState<LessonDetail | undefined>(sourceLesson);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(
    sourceLesson?.blocks[0]?.id ?? null
  );
  const [workspaceTab, setWorkspaceTab] = useState<'edit' | 'preview-learner' | 'preview-teacher'>(
    'edit'
  );
  const [deleteBlockTarget, setDeleteBlockTarget] = useState<string | null>(null);

  useEffect(() => {
    if (sourceLesson && (!draft || draft.id !== sourceLesson.id)) {
      setDraft(sourceLesson);
      setActiveBlockId(sourceLesson.blocks[0]?.id ?? null);
    }
  }, [sourceLesson, draft]);

  if (!draft) {
    return (
      <WorkspaceShell
        surface="teacher"
        title="Không tìm thấy bài học"
        subtitle="Mã bài học không tồn tại trong bộ dữ liệu hiện tại."
      >
        <EmptyState
          title="Không tìm thấy bài học cần soạn thảo"
          description="Vui lòng quay lại danh sách khóa học để chọn bài học."
          actionLabel="Về danh sách khóa học"
          actionHref={ROUTES.teacherCourses}
        />
      </WorkspaceShell>
    );
  }

  const parentCourse = courseService.getBySlug(state, draft.courseSlug);
  const activeBlock = draft.blocks.find((b) => b.id === activeBlockId) ?? draft.blocks[0];

  const handleSave = () => {
    saveLessonDetail(draft);
  };

  const handleAddBlock = (type: LessonBlockType) => {
    const newBlock = createDefaultBlock(type, draft.blocks.length + 1);
    setDraft({
      ...draft,
      blocks: [...draft.blocks, newBlock],
    });
    setActiveBlockId(newBlock.id);
    setWorkspaceTab('edit');
    showToast('Đã thêm khối nội dung mới', `Loại khối: ${type}`, 'info');
  };

  const handleMoveBlock = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= draft.blocks.length) return;
    const nextBlocks = [...draft.blocks];
    const [moved] = nextBlocks.splice(index, 1);
    nextBlocks.splice(nextIndex, 0, moved);
    const reordered = nextBlocks.map((b, idx) => ({ ...b, order: idx + 1 }));
    setDraft({ ...draft, blocks: reordered });
  };

  const handleDuplicateBlock = (block: LessonBlock, index: number) => {
    const cloned: LessonBlock = JSON.parse(JSON.stringify(block));
    cloned.id = `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const nextBlocks = [...draft.blocks];
    nextBlocks.splice(index + 1, 0, cloned);
    const reordered = nextBlocks.map((b, idx) => ({ ...b, order: idx + 1 }));
    setDraft({ ...draft, blocks: reordered });
    setActiveBlockId(cloned.id);
    showToast('Đã nhân bản khối nội dung', undefined, 'info');
  };

  const handleConfirmDeleteBlock = () => {
    if (!deleteBlockTarget) return;
    const filtered = draft.blocks
      .filter((b) => b.id !== deleteBlockTarget)
      .map((b, idx) => ({ ...b, order: idx + 1 }));
    setDraft({ ...draft, blocks: filtered });
    if (activeBlockId === deleteBlockTarget) {
      setActiveBlockId(filtered[0]?.id ?? null);
    }
    setDeleteBlockTarget(null);
    showToast('Đã xóa khối nội dung', undefined, 'info');
  };

  const updateActiveBlock = (updater: (block: LessonBlock) => LessonBlock) => {
    if (!activeBlock) return;
    setDraft({
      ...draft,
      blocks: draft.blocks.map((b) => (b.id === activeBlock.id ? updater(b) : b)),
    });
  };

  return (
    <WorkspaceShell
      surface="teacher"
      title={`Soạn thảo: ${draft.title}`}
      subtitle={`Khóa học: ${parentCourse?.title ?? draft.courseSlug} • ${draft.blocks.length} khối nội dung`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          {parentCourse ? (
            <Link
              href={ROUTES.courseBuilder(parentCourse.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cấu trúc khóa học</span>
            </Link>
          ) : null}
          <Link
            href={ROUTES.lessonPlayer(draft.courseSlug, draft.slug)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <span>Mở trang học viên</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700"
          >
            <Save className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lưu bài học</span>
          </button>
        </div>
      }
    >
      {/* Top mode switcher: Edit vs Preview Learner vs Preview Teacher */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setWorkspaceTab('edit')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
              workspaceTab === 'edit'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <FileEdit className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Soạn thảo khối (Block Editor)</span>
          </button>
          <button
            type="button"
            onClick={() => setWorkspaceTab('preview-learner')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
              workspaceTab === 'preview-learner'
                ? 'bg-teal-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Xem trước như Học viên (Ẩn ghi chú GV)</span>
          </button>
          <button
            type="button"
            onClick={() => setWorkspaceTab('preview-teacher')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
              workspaceTab === 'preview-teacher'
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Xem trước như Giảng viên (Hiện ghi chú sư phạm)</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          Nhấn &ldquo;Lưu bài học&rdquo; để đồng bộ sang màn hình Học viên ngay lập tức.
        </span>
      </div>

      {workspaceTab !== 'edit' ? (
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                {workspaceTab === 'preview-learner'
                  ? 'Chế độ xem trước của Học viên (Learner View)'
                  : 'Chế độ xem trước của Giảng viên (Teacher View)'}
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {draft.title}
              </h2>
            </div>
            <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {draft.estimatedMinutes} phút đọc
            </span>
          </div>

          {draft.objectives.length > 0 ? (
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Mục tiêu bài học
              </div>
              <ul className="mt-2 ml-4 list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {draft.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            {lessonService
              .filterBlocksForRole(
                draft.blocks,
                workspaceTab === 'preview-learner' ? 'learner' : 'teacher'
              )
              .map((block) => (
                <LessonBlockRenderer
                  key={block.id}
                  block={block}
                  viewMode={workspaceTab === 'preview-learner' ? 'learner' : 'teacher'}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left column: Lesson metadata + Block list + Add block palette */}
          <div className="space-y-6 lg:col-span-5">
            {/* Lesson Metadata */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Thông tin bài học
              </h2>
              <div className="mt-3 space-y-3">
                <div>
                  <label
                    htmlFor="lesson-title-input"
                    className="block text-xs font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Tiêu đề bài học
                  </label>
                  <input
                    id="lesson-title-input"
                    type="text"
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="lesson-minutes-input"
                      className="block text-xs font-semibold text-slate-600 dark:text-slate-300"
                    >
                      Thời lượng (phút)
                    </label>
                    <input
                      id="lesson-minutes-input"
                      type="number"
                      min={5}
                      max={180}
                      value={draft.estimatedMinutes}
                      onChange={(e) =>
                        setDraft({ ...draft, estimatedMinutes: Number(e.target.value) || 20 })
                      }
                      className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={draft.isPreview}
                        onChange={(e) => setDraft({ ...draft, isPreview: e.target.checked })}
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                      />
                      <span>Cho phép Học thử</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lesson-objectives-input"
                    className="block text-xs font-semibold text-slate-600 dark:text-slate-300"
                  >
                    Mục tiêu bài học (mỗi dòng 1 mục tiêu)
                  </label>
                  <textarea
                    id="lesson-objectives-input"
                    rows={3}
                    value={draft.objectives.join('\n')}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        objectives: e.target.value
                          .split('\n')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>
            </section>

            {/* Block Outline List */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Danh sách khối nội dung ({draft.blocks.length})
                </h2>
                <span className="text-xs text-slate-500">Chọn khối để chỉnh sửa</span>
              </div>

              <div className="mt-3 space-y-2">
                {draft.blocks.map((block, index) => {
                  const isSelected = activeBlock?.id === block.id;
                  const meta = BLOCK_TYPE_OPTIONS.find((o) => o.type === block.type);
                  return (
                    <div
                      key={block.id}
                      className={`flex items-center justify-between gap-2 rounded-xl border p-3 transition-colors ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 dark:border-indigo-500 dark:bg-indigo-950/40'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveBlockId(block.id)}
                        className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-200 font-mono text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate text-xs font-bold text-slate-900 dark:text-white">
                              {meta?.label ?? block.type}
                            </span>
                            {block.type === 'teacherNote' ? (
                              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                                Ẩn với HV
                              </span>
                            ) : null}
                          </div>
                          <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                            {block.type === 'richText'
                              ? block.data.heading || block.data.paragraphs[0]
                              : block.type === 'code'
                                ? block.data.title
                                : block.type === 'callout'
                                  ? block.data.title
                                  : block.type === 'quiz'
                                    ? block.data.question
                                    : block.type === 'problemReference'
                                      ? `Bài tập: ${block.data.problemSlug}`
                                      : block.type === 'teacherNote'
                                        ? block.data.pedagogyGoal
                                        : block.id}
                          </p>
                        </div>
                      </button>

                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveBlock(index, -1)}
                          disabled={index === 0}
                          className="rounded-lg p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30 dark:hover:bg-slate-800"
                          title="Chuyển lên"
                        >
                          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveBlock(index, 1)}
                          disabled={index === draft.blocks.length - 1}
                          className="rounded-lg p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-30 dark:hover:bg-slate-800"
                          title="Chuyển xuống"
                        >
                          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateBlock(block, index)}
                          className="rounded-lg p-1 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                          title="Nhân bản khối"
                        >
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteBlockTarget(block.id)}
                          className="rounded-lg p-1 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                          title="Xóa khối"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Add new block palette */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Thêm khối nội dung mới (Block Palette)
              </h2>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {BLOCK_TYPE_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => handleAddBlock(item.type)}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-200 p-2.5 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/30"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-300">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          + {item.label}
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right column: Active Block Inspector + Live Single-Block Preview */}
          <div className="space-y-6 lg:col-span-7">
            {activeBlock ? (
              <>
                <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                        Chỉnh sửa chi tiết khối #{activeBlock.order} ({activeBlock.type})
                      </span>
                      <h3 className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
                        {BLOCK_TYPE_OPTIONS.find((o) => o.type === activeBlock.type)?.label}
                      </h3>
                    </div>
                  </div>

                  {/* Dynamic Form based on activeBlock.type */}
                  <div className="mt-5 space-y-4">
                    {activeBlock.type === 'richText' ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Tiêu đề mục (Heading)
                          </label>
                          <input
                            type="text"
                            value={activeBlock.data.heading ?? ''}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'richText'
                                  ? { ...b, data: { ...b.data, heading: e.target.value } }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Các đoạn văn (mỗi đoạn cách nhau bằng dòng xuống hàng)
                          </label>
                          <textarea
                            rows={5}
                            value={activeBlock.data.paragraphs.join('\n')}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'richText'
                                  ? {
                                      ...b,
                                      data: {
                                        ...b.data,
                                        paragraphs: e.target.value.split('\n').filter(Boolean),
                                      },
                                    }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Danh sách gạch đầu dòng (mỗi dòng 1 ý)
                          </label>
                          <textarea
                            rows={3}
                            value={(activeBlock.data.bulletPoints ?? []).join('\n')}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'richText'
                                  ? {
                                      ...b,
                                      data: {
                                        ...b.data,
                                        bulletPoints: e.target.value.split('\n').filter(Boolean),
                                      },
                                    }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                      </>
                    ) : null}

                    {activeBlock.type === 'code' ? (
                      <>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Tiêu đề khối Code
                            </label>
                            <input
                              type="text"
                              value={activeBlock.data.title}
                              onChange={(e) =>
                                updateActiveBlock((b) =>
                                  b.type === 'code'
                                    ? { ...b, data: { ...b.data, title: e.target.value } }
                                    : b
                                )
                              }
                              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Ghi chú độ phức tạp
                            </label>
                            <input
                              type="text"
                              value={activeBlock.data.complexityNote ?? ''}
                              onChange={(e) =>
                                updateActiveBlock((b) =>
                                  b.type === 'code'
                                    ? { ...b, data: { ...b.data, complexityNote: e.target.value } }
                                    : b
                                )
                              }
                              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                          </div>
                        </div>

                        {(['cpp', 'python', 'c', 'java'] as ProgrammingLanguage[]).map((lang) => (
                          <div key={lang}>
                            <label className="block text-xs font-semibold text-slate-700 uppercase dark:text-slate-300">
                              Mã nguồn ({lang})
                            </label>
                            <textarea
                              rows={5}
                              value={activeBlock.data.snippets[lang] ?? ''}
                              onChange={(e) =>
                                updateActiveBlock((b) => {
                                  if (b.type !== 'code') return b;
                                  const nextSnippets = { ...b.data.snippets };
                                  if (e.target.value.trim()) {
                                    nextSnippets[lang] = e.target.value;
                                  } else {
                                    delete nextSnippets[lang];
                                  }
                                  return {
                                    ...b,
                                    data: { ...b.data, snippets: nextSnippets },
                                  };
                                })
                              }
                              placeholder={`Nhập code mẫu ${lang.toUpperCase()} (để trống nếu không dùng)...`}
                              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-950 p-3 font-mono text-xs text-slate-100 dark:border-slate-700"
                            />
                          </div>
                        ))}
                      </>
                    ) : null}

                    {activeBlock.type === 'callout' ? (
                      <>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                               Phân loại hộp lưu ý
                            </label>
                            <select
                              value={activeBlock.data.variant}
                              onChange={(e) =>
                                updateActiveBlock((b) =>
                                  b.type === 'callout'
                                    ? {
                                        ...b,
                                        data: {
                                          ...b.data,
                                          variant: e.target.value as CalloutBlockData['variant'],
                                        },
                                      }
                                    : b
                                )
                              }
                              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            >
                              <option value="info">Thông tin (Info)</option>
                              <option value="tip">Mẹo tối ưu (Tip)</option>
                              <option value="warning">Cảnh báo (Warning)</option>
                              <option value="mistake">Bẫy sai lầm phổ biến (Mistake)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Tiêu đề hộp lưu ý
                            </label>
                            <input
                              type="text"
                              value={activeBlock.data.title}
                              onChange={(e) =>
                                updateActiveBlock((b) =>
                                  b.type === 'callout'
                                    ? { ...b, data: { ...b.data, title: e.target.value } }
                                    : b
                                )
                              }
                              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Nội dung chi tiết
                          </label>
                          <textarea
                            rows={4}
                            value={activeBlock.data.content}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'callout'
                                  ? { ...b, data: { ...b.data, content: e.target.value } }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                      </>
                    ) : null}

                    {activeBlock.type === 'quiz' ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Câu hỏi trắc nghiệm
                          </label>
                          <input
                            type="text"
                            value={activeBlock.data.question}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'quiz'
                                  ? { ...b, data: { ...b.data, question: e.target.value } }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Các phương án lựa chọn (chọn 1 đáp án đúng)
                          </div>
                          {activeBlock.data.options.map((opt, optIdx) => (
                            <div
                              key={opt.id}
                              className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="quiz-correct"
                                  checked={activeBlock.data.correctOptionId === opt.id}
                                  onChange={() =>
                                    updateActiveBlock((b) =>
                                      b.type === 'quiz'
                                        ? { ...b, data: { ...b.data, correctOptionId: opt.id } }
                                        : b
                                    )
                                  }
                                />
                                <input
                                  type="text"
                                  value={opt.text}
                                  onChange={(e) =>
                                    updateActiveBlock((b) => {
                                      if (b.type !== 'quiz') return b;
                                      const nextOpts = [...b.data.options];
                                      nextOpts[optIdx] = { ...opt, text: e.target.value };
                                      return { ...b, data: { ...b.data, options: nextOpts } };
                                    })
                                  }
                                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                              </div>
                              <input
                                type="text"
                                value={opt.explanation}
                                onChange={(e) =>
                                  updateActiveBlock((b) => {
                                    if (b.type !== 'quiz') return b;
                                    const nextOpts = [...b.data.options];
                                    nextOpts[optIdx] = { ...opt, explanation: e.target.value };
                                    return { ...b, data: { ...b.data, options: nextOpts } };
                                  })
                                }
                                placeholder="Giải thích vì sao đúng/sai..."
                                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}

                    {activeBlock.type === 'problemReference' ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Chọn bài tập từ Ngân hàng đề
                          </label>
                          <select
                            value={activeBlock.data.problemSlug}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'problemReference'
                                  ? { ...b, data: { ...b.data, problemSlug: e.target.value } }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          >
                            {state.problems.map((p) => (
                              <option key={p.id} value={p.slug}>
                                {p.code} — {p.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Lời nhắc định hướng cho học viên
                          </label>
                          <textarea
                            rows={3}
                            value={activeBlock.data.promptNote}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'problemReference'
                                  ? { ...b, data: { ...b.data, promptNote: e.target.value } }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                      </>
                    ) : null}

                    {activeBlock.type === 'teacherNote' ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Mục tiêu sư phạm của phần này (Ẩn với Học viên)
                          </label>
                          <textarea
                            rows={3}
                            value={activeBlock.data.pedagogyGoal}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'teacherNote'
                                  ? { ...b, data: { ...b.data, pedagogyGoal: e.target.value } }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Câu hỏi học viên thường thắc mắc (mỗi dòng 1 câu)
                          </label>
                          <textarea
                            rows={3}
                            value={activeBlock.data.commonStudentQuestions.join('\n')}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'teacherNote'
                                  ? {
                                      ...b,
                                      data: {
                                        ...b.data,
                                        commonStudentQuestions: e.target.value
                                          .split('\n')
                                          .filter(Boolean),
                                      },
                                    }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Ghi chú phân bổ thời gian trên lớp
                          </label>
                          <input
                            type="text"
                            value={activeBlock.data.classroomTimingNote}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'teacherNote'
                                  ? {
                                      ...b,
                                      data: { ...b.data, classroomTimingNote: e.target.value },
                                    }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                      </>
                    ) : null}

                    {activeBlock.type === 'image' ? (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Loại sơ đồ kỹ thuật
                          </label>
                          <select
                            value={activeBlock.data.diagramType}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'image'
                                  ? {
                                      ...b,
                                      data: {
                                        ...b.data,
                                        diagramType: e.target.value as
                                          | 'array-memory'
                                          | 'dp-dag'
                                          | 'binary-search'
                                          | 'git-graph',
                                      },
                                    }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          >
                            <option value="dp-dag">Đồ thị chuyển trạng thái DAG (Quy hoạch động)</option>
                            <option value="array-memory">Bố cục ô nhớ Mảng & Con trỏ</option>
                            <option value="binary-search">Không gian Tìm kiếm nhị phân</option>
                            <option value="git-graph">Nhánh Git & Lịch sử Commit</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Chú thích hình ảnh (Caption)
                          </label>
                          <input
                            type="text"
                            value={activeBlock.data.caption}
                            onChange={(e) =>
                              updateActiveBlock((b) =>
                                b.type === 'image'
                                  ? { ...b, data: { ...b.data, caption: e.target.value } }
                                  : b
                              )
                            }
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                      </>
                    ) : null}

                    {activeBlock.type === 'slide' ||
                    activeBlock.type === 'video' ||
                    activeBlock.type === 'interactive' ? (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                        Khối tương tác / đa phương tiện này đã được cấu hình sẵn dữ liệu chuẩn. Xem
                        trực tiếp kết quả hiển thị ở khung <strong>Xem trước khối</strong> ngay bên
                        dưới.
                      </div>
                    ) : null}
                  </div>
                </section>

                {/* Live Single-Block Preview */}
                <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Xem trước trực tiếp khối đang chọn
                  </div>
                  <LessonBlockRenderer block={activeBlock} viewMode="teacher" />
                </section>
              </>
            ) : null}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteBlockTarget)}
        title="Xóa khối nội dung này?"
        description="Khối nội dung sẽ bị xóa khỏi bài học hiện tại."
        confirmLabel="Xóa khối"
        variant="danger"
        onCancel={() => setDeleteBlockTarget(null)}
        onConfirm={handleConfirmDeleteBlock}
      />
    </WorkspaceShell>
  );
}
