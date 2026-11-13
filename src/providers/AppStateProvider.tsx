'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BRAND_CONFIG } from '@/config/brand';
import { buildCompleteLessonsMap } from '@/data/courses-seed';
import { createInitialDemoState } from '@/data/seed';
import { readCodeDraft, writeCodeDraft, removeCodeDraft } from '@/utils/codeDrafts';
import type {
  AppRole,
  Course,
  DemoAppState,
  LearnerNote,
  LearningGoal,
  LessonBlock,
  LessonDetail,
  Problem,
  ProgrammingLanguage,
} from '@/types';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: 'info' | 'success' | 'warning' | 'error';
}

interface AppStateContextValue {
  state: DemoAppState;
  isHydrated: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toasts: ToastItem[];
  showToast: (
    title: string,
    description?: string,
    variant?: 'info' | 'success' | 'warning' | 'error'
  ) => void;
  dismissToast: (id: string) => void;

  // F01: Role & Goal switching
  setRole: (role: AppRole) => void;
  setActiveGoal: (goal: LearningGoal) => void;

  // F03/F04: Course enrollment & lesson completion
  enrollCourseDemo: (courseSlug: string) => void;
  toggleLessonComplete: (lessonSlug: string) => void;
  toggleBookmarkLesson: (lessonSlug: string) => void;

  // F05: Notes CRUD
  saveNote: (params: {
    id?: string;
    courseSlug: string;
    lessonSlug: string;
    lessonTitle: string;
    content: string;
    isBookmarked?: boolean;
    tags?: string[];
  }) => void;
  deleteNote: (noteId: string) => void;

  // F06: Quiz answer persistence
  saveQuizAnswer: (blockId: string, optionId: string) => void;
  resetQuizAnswer: (blockId: string) => void;

  // F09: Code editor drafts per problem + language
  getCodeDraft: (problemSlug: string, language: ProgrammingLanguage, fallback: string) => string;
  saveCodeDraft: (problemSlug: string, language: ProgrammingLanguage, code: string) => void;
  resetCodeDraft: (problemSlug: string, language: ProgrammingLanguage) => void;

  // F11: Teacher course builder CRUD
  updateCourse: (updatedCourse: Course) => void;
  createCourseDraft: (title: string, domainId: string) => Course;

  // F12: Teacher lesson block editor CRUD
  saveLessonDetail: (updatedLesson: LessonDetail) => void;
  updateLessonBlocks: (lessonSlug: string, blocks: LessonBlock[]) => void;

  // P1/P2 Teacher & Admin actions
  saveProblem: (problem: Problem) => void;
  convertResearchToLessonDraft: (researchId: string) => LessonDetail | undefined;
  updateUserRoleDemo: (userId: string, roles: AppRole[]) => void;
  toggleUserStatusDemo: (userId: string) => void;

  // F15: Reset demo state
  resetDemoData: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoAppState>(() => createInitialDemoState());
  const [isHydrated, setIsHydrated] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (
      title: string,
      description?: string,
      variant: 'info' | 'success' | 'warning' | 'error' = 'info'
    ) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-3), { id, title, description, variant }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(BRAND_CONFIG.themeStorageKey);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeState(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      }

      const rawState = window.localStorage.getItem(BRAND_CONFIG.storageKey);
      if (rawState) {
        const parsed = JSON.parse(rawState) as DemoAppState;
        if (parsed && parsed.version === BRAND_CONFIG.version) {
          setState(parsed);
        }
      }
    } catch {
      // Fallback to seed state if localStorage is unavailable or corrupted
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist state changes after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(BRAND_CONFIG.storageKey, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in demo mode
    }
  }, [state, isHydrated]);

  const setTheme = useCallback((nextTheme: 'light' | 'dark') => {
    setThemeState(nextTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      try {
        window.localStorage.setItem(BRAND_CONFIG.themeStorageKey, nextTheme);
      } catch {
        // Ignore
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const setRole = useCallback(
    (role: AppRole) => {
      setState((prev) => ({ ...prev, role }));
      const roleLabels: Record<AppRole, string> = {
        guest: 'Khách tham quan (Guest)',
        learner: 'Học viên (Learner)',
        teacher: 'Giảng viên (Teacher)',
        admin: 'Quản trị viên (Admin)',
      };
      showToast(
        `Đã chuyển sang góc nhìn: ${roleLabels[role]}`,
        'Đây là công tắc chuyển vai trò dành riêng cho bản Demo UI.',
        'info'
      );
    },
    [showToast]
  );

  const setActiveGoal = useCallback(
    (activeGoal: LearningGoal) => {
      setState((prev) => ({ ...prev, activeGoal }));
      showToast('Đã cập nhật mục tiêu học tập', 'Gợi ý lộ trình đã được đồng bộ theo mục tiêu mới.', 'success');
    },
    [showToast]
  );

  const enrollCourseDemo = useCallback(
    (courseSlug: string) => {
      setState((prev) => {
        if (prev.enrolledCourseSlugs.includes(courseSlug)) return prev;
        return {
          ...prev,
          enrolledCourseSlugs: [...prev.enrolledCourseSlugs, courseSlug],
        };
      });
      showToast(
        'Đã kích hoạt quyền học thử / đăng ký Demo',
        'Khóa học đã được thêm vào danh sách "Khóa đang học" trong phiên trình duyệt này.',
        'success'
      );
    },
    [showToast]
  );

  const toggleLessonComplete = useCallback(
    (lessonSlug: string) => {
      setState((prev) => {
        const exists = prev.completedLessonSlugs.includes(lessonSlug);
        const completedLessonSlugs = exists
          ? prev.completedLessonSlugs.filter((s) => s !== lessonSlug)
          : [...prev.completedLessonSlugs, lessonSlug];
        return { ...prev, completedLessonSlugs };
      });
    },
    []
  );

  const toggleBookmarkLesson = useCallback((lessonSlug: string) => {
    setState((prev) => {
      const exists = prev.bookmarkedLessonSlugs.includes(lessonSlug);
      const bookmarkedLessonSlugs = exists
        ? prev.bookmarkedLessonSlugs.filter((s) => s !== lessonSlug)
        : [...prev.bookmarkedLessonSlugs, lessonSlug];
      return { ...prev, bookmarkedLessonSlugs };
    });
  }, []);

  const saveNote = useCallback(
    (params: {
      id?: string;
      courseSlug: string;
      lessonSlug: string;
      lessonTitle: string;
      content: string;
      isBookmarked?: boolean;
      tags?: string[];
    }) => {
      const nowLabel = new Date().toISOString().slice(0, 16).replace('T', ' ');
      setState((prev) => {
        const existingIdx = params.id
          ? prev.notes.findIndex((n) => n.id === params.id)
          : prev.notes.findIndex((n) => n.lessonSlug === params.lessonSlug);

        if (existingIdx >= 0) {
          const updated: LearnerNote = {
            ...prev.notes[existingIdx],
            content: params.content,
            isBookmarked: params.isBookmarked ?? prev.notes[existingIdx].isBookmarked,
            tags: params.tags ?? prev.notes[existingIdx].tags,
            updatedAt: nowLabel,
          };
          const nextNotes = [...prev.notes];
          nextNotes[existingIdx] = updated;
          return { ...prev, notes: nextNotes };
        }

        const newNote: LearnerNote = {
          id: `note-${Date.now()}`,
          courseSlug: params.courseSlug,
          lessonSlug: params.lessonSlug,
          lessonTitle: params.lessonTitle,
          content: params.content,
          isBookmarked: params.isBookmarked ?? true,
          updatedAt: nowLabel,
          tags: params.tags ?? ['Ghi chú bài học'],
        };
        return { ...prev, notes: [newNote, ...prev.notes] };
      });
      showToast('Đã lưu ghi chú học tập', 'Ghi chú được đồng bộ tại Sổ tay (/hoc/ghi-chu).', 'success');
    },
    [showToast]
  );

  const deleteNote = useCallback(
    (noteId: string) => {
      setState((prev) => ({
        ...prev,
        notes: prev.notes.filter((n) => n.id !== noteId),
      }));
      showToast('Đã xóa ghi chú', undefined, 'info');
    },
    [showToast]
  );

  const saveQuizAnswer = useCallback((blockId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [blockId]: optionId },
    }));
  }, []);

  const resetQuizAnswer = useCallback((blockId: string) => {
    setState((prev) => {
      const next = { ...prev.quizAnswers };
      delete next[blockId];
      return { ...prev, quizAnswers: next };
    });
  }, []);

  const getCodeDraft = useCallback(
    (problemSlug: string, language: ProgrammingLanguage, fallback: string) =>
      readCodeDraft(state.codeDrafts, problemSlug, language, fallback),
    [state.codeDrafts]
  );

  const saveCodeDraft = useCallback(
    (problemSlug: string, language: ProgrammingLanguage, code: string) => {
      setState((prev) => {
        const attemptedProblemSlugs = prev.attemptedProblemSlugs.includes(problemSlug)
          ? prev.attemptedProblemSlugs
          : [...prev.attemptedProblemSlugs, problemSlug];
        return {
          ...prev,
          attemptedProblemSlugs,
          codeDrafts: writeCodeDraft(prev.codeDrafts, problemSlug, language, code),
        };
      });
    },
    []
  );

  const resetCodeDraft = useCallback((problemSlug: string, language: ProgrammingLanguage) => {
    setState((prev) => ({
      ...prev,
      codeDrafts: removeCodeDraft(prev.codeDrafts, problemSlug, language),
    }));
  }, []);

  const updateCourse = useCallback(
    (updatedCourse: Course) => {
      setState((prev) => {
        const exists = prev.courses.some((c) => c.id === updatedCourse.id);
        const courses = exists
          ? prev.courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
          : [updatedCourse, ...prev.courses];

        const mergedLessons = { ...prev.lessonsBySlug };
        const fallbackMap = buildCompleteLessonsMap([updatedCourse]);
        for (const [slug, detail] of Object.entries(fallbackMap)) {
          if (!mergedLessons[slug]) {
            mergedLessons[slug] = detail;
          } else {
            // Sync lesson summary changes (title, estimatedMinutes, isPreview)
            const summary = updatedCourse.modules
              .flatMap((m) => m.lessons)
              .find((l) => l.slug === slug);
            if (summary) {
              mergedLessons[slug] = {
                ...mergedLessons[slug],
                title: summary.title,
                estimatedMinutes: summary.estimatedMinutes,
                isPreview: summary.isPreview,
                order: summary.order,
              };
            }
          }
        }
        return { ...prev, courses, lessonsBySlug: mergedLessons };
      });
      showToast('Đã lưu cấu trúc khóa học', 'Dữ liệu đã được cập nhật vào bộ nhớ trình duyệt.', 'success');
    },
    [showToast]
  );

  const createCourseDraft = useCallback(
    (title: string, domainId: string): Course => {
      const slugBase = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const slug = `${slugBase || 'khoa-hoc-moi'}-${Date.now().toString().slice(-4)}`;
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        slug,
        title,
        shortDescription: 'Bản nháp khóa học mới đang được biên soạn trong Teaching Studio.',
        description:
          'Khóa học đang ở trạng thái Bản nháp (Draft). Giảng viên có thể thêm học phần, bài học và xuất bản thử nghiệm.',
        domainId,
        level: 'beginner',
        goals: ['high-school'],
        languages: ['cpp', 'python'],
        tags: ['Bản nháp', 'Mới tạo'],
        priceVnd: 0,
        visibility: 'draft',
        estimatedHours: 12,
        updatedAt: new Date().toISOString().slice(0, 10),
        instructorName: 'ThS. Trần Hoàng Nam',
        instructorRole: 'Giảng viên Chuyên Tin',
        instructorBio: 'Giảng viên biên soạn trên Teaching Studio.',
        prerequisites: ['Kiến thức máy tính cơ bản.'],
        outcomes: ['Nắm vững lý thuyết và thực hành các bài toán cốt lõi.'],
        suitableFor: ['Học viên muốn học bài bản từ đầu.'],
        bannerTone: 'indigo',
        modules: [
          {
            id: `mod-${Date.now()}`,
            title: 'Học phần 1: Khởi động và Khái niệm nền tảng',
            order: 1,
            lessons: [
              {
                id: `les-${Date.now()}`,
                slug: `bai-mo-dau-${Date.now().toString().slice(-4)}`,
                title: 'Bài 1: Giới thiệu mục tiêu và phương pháp học',
                order: 1,
                estimatedMinutes: 20,
                isPreview: true,
                primaryType: 'theory',
              },
            ],
          },
        ],
      };

      setState((prev) => {
        const courses = [newCourse, ...prev.courses];
        const fallbackLessons = buildCompleteLessonsMap([newCourse]);
        return {
          ...prev,
          courses,
          lessonsBySlug: { ...prev.lessonsBySlug, ...fallbackLessons },
        };
      });
      showToast('Đã tạo khóa học nháp mới', `Khóa "${title}" đã sẵn sàng biên soạn.`, 'success');
      return newCourse;
    },
    [showToast]
  );

  const saveLessonDetail = useCallback(
    (updatedLesson: LessonDetail) => {
      setState((prev) => {
        const courses = prev.courses.map((course) => {
          if (course.slug !== updatedLesson.courseSlug && course.id !== updatedLesson.courseId) {
            return course;
          }
          return {
            ...course,
            modules: course.modules.map((mod) => ({
              ...mod,
              lessons: mod.lessons.map((les) =>
                les.slug === updatedLesson.slug || les.id === updatedLesson.id
                  ? {
                      ...les,
                      title: updatedLesson.title,
                      estimatedMinutes: updatedLesson.estimatedMinutes,
                      isPreview: updatedLesson.isPreview,
                    }
                  : les
              ),
            })),
          };
        });

        return {
          ...prev,
          courses,
          lessonsBySlug: {
            ...prev.lessonsBySlug,
            [updatedLesson.slug]: updatedLesson,
          },
        };
      });
      showToast('Đã lưu nội dung bài học', 'Các khối nội dung (Blocks) đã được cập nhật.', 'success');
    },
    [showToast]
  );

  const updateLessonBlocks = useCallback((lessonSlug: string, blocks: LessonBlock[]) => {
    setState((prev) => {
      const current = prev.lessonsBySlug[lessonSlug];
      if (!current) return prev;
      return {
        ...prev,
        lessonsBySlug: {
          ...prev.lessonsBySlug,
          [lessonSlug]: { ...current, blocks },
        },
      };
    });
  }, []);

  const saveProblem = useCallback(
    (problem: Problem) => {
      setState((prev) => {
        const exists = prev.problems.some((p) => p.id === problem.id);
        const problems = exists
          ? prev.problems.map((p) => (p.id === problem.id ? problem : p))
          : [problem, ...prev.problems];
        return { ...prev, problems };
      });
      showToast('Đã lưu bài tập vào Ngân hàng đề', `Bài "${problem.title}" đã được cập nhật.`, 'success');
    },
    [showToast]
  );

  const convertResearchToLessonDraft = useCallback(
    (researchId: string): LessonDetail | undefined => {
      const note = state.researchNotes.find((r) => r.id === researchId);
      if (!note) return undefined;

      const targetSlug = `nghien-cuu-${researchId}`;
      const draftLesson: LessonDetail = {
        id: `les-res-${researchId}`,
        slug: targetSlug,
        courseId: 'course-dp',
        courseSlug: note.linkedCourseSlug ?? 'dp-tu-duy-den-nang-cao',
        moduleId: 'mod-dp-1',
        title: `[Bản nháp từ Nghiên cứu] ${note.title}`,
        order: 99,
        estimatedMinutes: 35,
        isPreview: true,
        primaryType: 'theory',
        objectives: [
          note.summary,
          ...note.approaches.map((a) => `${a.name}: Thời gian ${a.timeComplexity}, Bộ nhớ ${a.spaceComplexity}`),
        ],
        conceptIds: ['concept-research'],
        relatedProblemSlugs: note.linkedProblemSlugs,
        blocks: [
          {
            id: `blk-res-${Date.now()}-1`,
            type: 'richText',
            order: 1,
            data: {
              heading: note.title,
              paragraphs: [note.summary],
              bulletPoints: note.approaches.map(
                (a) => `${a.name} (${a.timeComplexity}, ${a.spaceComplexity}): ${a.suitability}`
              ),
            },
          },
          {
            id: `blk-res-${Date.now()}-2`,
            type: 'teacherNote',
            order: 2,
            data: {
              pedagogyGoal: 'Bản nháp được sinh tự động từ ghi chép nghiên cứu của giảng viên.',
              commonStudentQuestions: ['Khi nào cần chuyển từ thuật toán O(N^2) sang O(N log N)?'],
              classroomTimingNote: 'So sánh trực tiếp các cách giải trên bảng.',
            },
          },
        ],
      };

      setState((prev) => ({
        ...prev,
        researchNotes: prev.researchNotes.map((r) =>
          r.id === researchId ? { ...r, convertedToLessonDraft: true } : r
        ),
        lessonsBySlug: {
          ...prev.lessonsBySlug,
          [targetSlug]: draftLesson,
        },
      }));

      showToast(
        'Đã chuyển ghi chép nghiên cứu thành Bản nháp bài học',
        'Bạn có thể mở trình soạn thảo Block để tinh chỉnh thêm.',
        'success'
      );
      return draftLesson;
    },
    [state.researchNotes, showToast]
  );

  const updateUserRoleDemo = useCallback(
    (userId: string, roles: AppRole[]) => {
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) => (u.id === userId ? { ...u, roles } : u)),
      }));
      showToast('Đã cập nhật phân vai người dùng (Demo)', 'Thay đổi có hiệu lực trong phiên trình duyệt.', 'info');
    },
    [showToast]
  );

  const toggleUserStatusDemo = useCallback(
    (userId: string) => {
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.id === userId
            ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
            : u
        ),
      }));
      showToast('Đã đổi trạng thái tài khoản mẫu', undefined, 'info');
    },
    [showToast]
  );

  const resetDemoData = useCallback(() => {
    const fresh = createInitialDemoState();
    setState(fresh);
    try {
      window.localStorage.setItem(BRAND_CONFIG.storageKey, JSON.stringify(fresh));
    } catch {
      // Ignore
    }
    showToast(
      'Đã khôi phục dữ liệu mẫu ban đầu',
      'Toàn bộ khóa học, tiến độ, ghi chú và bản nháp code đã trở về trạng thái gốc.',
      'success'
    );
  }, [showToast]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      state,
      isHydrated,
      theme,
      toggleTheme,
      setTheme,
      toasts,
      showToast,
      dismissToast,
      setRole,
      setActiveGoal,
      enrollCourseDemo,
      toggleLessonComplete,
      toggleBookmarkLesson,
      saveNote,
      deleteNote,
      saveQuizAnswer,
      resetQuizAnswer,
      getCodeDraft,
      saveCodeDraft,
      resetCodeDraft,
      updateCourse,
      createCourseDraft,
      saveLessonDetail,
      updateLessonBlocks,
      saveProblem,
      convertResearchToLessonDraft,
      updateUserRoleDemo,
      toggleUserStatusDemo,
      resetDemoData,
    }),
    [
      state,
      isHydrated,
      theme,
      toggleTheme,
      setTheme,
      toasts,
      showToast,
      dismissToast,
      setRole,
      setActiveGoal,
      enrollCourseDemo,
      toggleLessonComplete,
      toggleBookmarkLesson,
      saveNote,
      deleteNote,
      saveQuizAnswer,
      resetQuizAnswer,
      getCodeDraft,
      saveCodeDraft,
      resetCodeDraft,
      updateCourse,
      createCourseDraft,
      saveLessonDetail,
      updateLessonBlocks,
      saveProblem,
      convertResearchToLessonDraft,
      updateUserRoleDemo,
      toggleUserStatusDemo,
      resetDemoData,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}
