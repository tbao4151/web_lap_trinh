import type {
  Course,
  DemoAppState,
  Difficulty,
  LearningGoal,
  LessonBlock,
  LessonDetail,
  Problem,
  ProgrammingLanguage,
  Submission,
} from '@/types';

export interface CourseFilterParams {
  query?: string;
  domainId?: string;
  language?: ProgrammingLanguage | 'all';
  level?: Difficulty | 'all';
  goal?: LearningGoal | 'all';
  priceFilter?: 'all' | 'free' | 'paid';
  sortBy?: 'relevance' | 'updated' | 'level';
}

export interface ProblemFilterParams {
  query?: string;
  domainId?: string;
  difficulty?: Difficulty | 'all';
  language?: ProgrammingLanguage | 'all';
  tag?: string;
  solveState?: 'all' | 'unsolved' | 'attempted' | 'solved';
}

const LEVEL_RANK: Record<Difficulty, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  competition: 4,
};

export const courseService = {
  list(state: DemoAppState, params: CourseFilterParams = {}, includeDrafts = false): Course[] {
    const query = (params.query ?? '').trim().toLowerCase();

    const filtered = state.courses.filter((course) => {
      if (!includeDrafts && course.visibility !== 'published') return false;
      if (params.domainId && params.domainId !== 'all' && course.domainId !== params.domainId) {
        return false;
      }
      if (params.language && params.language !== 'all' && !course.languages.includes(params.language)) {
        return false;
      }
      if (params.level && params.level !== 'all' && course.level !== params.level) {
        return false;
      }
      if (params.goal && params.goal !== 'all' && !course.goals.includes(params.goal)) {
        return false;
      }
      if (params.priceFilter === 'free' && course.priceVnd > 0) return false;
      if (params.priceFilter === 'paid' && course.priceVnd === 0) return false;

      if (query) {
        const haystack = [
          course.title,
          course.shortDescription,
          course.description,
          ...course.tags,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const sortBy = params.sortBy ?? 'relevance';
    return [...filtered].sort((a, b) => {
      if (sortBy === 'updated') {
        return b.updatedAt.localeCompare(a.updatedAt);
      }
      if (sortBy === 'level') {
        return LEVEL_RANK[a.level] - LEVEL_RANK[b.level];
      }
      return 0;
    });
  },

  getBySlug(state: DemoAppState, slug: string): Course | undefined {
    return state.courses.find((c) => c.slug === slug);
  },

  getById(state: DemoAppState, id: string): Course | undefined {
    return state.courses.find((c) => c.id === id || c.slug === id);
  },

  getCourseProgress(state: DemoAppState, course: Course): {
    completedCount: number;
    totalCount: number;
    percent: number;
    firstLessonSlug: string;
    nextLessonSlug: string;
  } {
    const allLessons = course.modules.flatMap((m) => m.lessons);
    const totalCount = allLessons.length;
    if (totalCount === 0) {
      return {
        completedCount: 0,
        totalCount: 0,
        percent: 0,
        firstLessonSlug: '',
        nextLessonSlug: '',
      };
    }
    const completedSet = new Set(state.completedLessonSlugs);
    const completedCount = allLessons.filter((l) => completedSet.has(l.slug)).length;
    const percent = Math.round((completedCount / totalCount) * 100);
    const firstUncompleted = allLessons.find((l) => !completedSet.has(l.slug));

    return {
      completedCount,
      totalCount,
      percent,
      firstLessonSlug: allLessons[0].slug,
      nextLessonSlug: (firstUncompleted ?? allLessons[0]).slug,
    };
  },
};

export const lessonService = {
  get(state: DemoAppState, lessonSlug: string): LessonDetail | undefined {
    if (state.lessonsBySlug[lessonSlug]) {
      return state.lessonsBySlug[lessonSlug];
    }
    // Also support lookup by lesson ID for teacher editor
    return Object.values(state.lessonsBySlug).find(
      (l) => l.id === lessonSlug || l.slug === lessonSlug
    );
  },

  getAdjacentLessons(
    course: Course,
    currentLessonSlug: string
  ): { prev?: { slug: string; title: string }; next?: { slug: string; title: string } } {
    const flat = course.modules.flatMap((m) => m.lessons);
    const idx = flat.findIndex((l) => l.slug === currentLessonSlug);
    if (idx === -1) return {};
    return {
      prev: idx > 0 ? { slug: flat[idx - 1].slug, title: flat[idx - 1].title } : undefined,
      next:
        idx < flat.length - 1
          ? { slug: flat[idx + 1].slug, title: flat[idx + 1].title }
          : undefined,
    };
  },

  filterBlocksForRole(blocks: LessonBlock[], viewMode: 'learner' | 'teacher'): LessonBlock[] {
    const sorted = [...blocks].sort((a, b) => a.order - b.order);
    if (viewMode === 'learner') {
      return sorted.filter((b) => b.type !== 'teacherNote');
    }
    return sorted;
  },
};

export const problemService = {
  list(state: DemoAppState, params: ProblemFilterParams = {}): Problem[] {
    const query = (params.query ?? '').trim().toLowerCase();
    const solvedSet = new Set(state.solvedProblemSlugs);
    const attemptedSet = new Set(state.attemptedProblemSlugs);

    return state.problems.filter((problem) => {
      if (params.domainId && params.domainId !== 'all' && problem.domainId !== params.domainId) {
        return false;
      }
      if (
        params.difficulty &&
        params.difficulty !== 'all' &&
        problem.difficulty !== params.difficulty
      ) {
        return false;
      }
      if (
        params.language &&
        params.language !== 'all' &&
        !problem.supportedLanguages.includes(params.language)
      ) {
        return false;
      }
      if (params.tag && params.tag !== 'all' && !problem.tags.includes(params.tag)) {
        return false;
      }
      if (params.solveState && params.solveState !== 'all') {
        const isSolved = solvedSet.has(problem.slug);
        const isAttempted = attemptedSet.has(problem.slug);
        if (params.solveState === 'solved' && !isSolved) return false;
        if (params.solveState === 'attempted' && (!isAttempted || isSolved)) return false;
        if (params.solveState === 'unsolved' && (isSolved || isAttempted)) return false;
      }
      if (query) {
        const haystack = [problem.code, problem.title, problem.statement, ...problem.tags]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  },

  getBySlugOrId(state: DemoAppState, slugOrId: string): Problem | undefined {
    return state.problems.find((p) => p.slug === slugOrId || p.id === slugOrId);
  },

  getSampleSubmissions(state: DemoAppState, problemIdOrSlug: string): Submission[] {
    return state.submissions.filter(
      (s) => s.problemId === problemIdOrSlug || s.problemSlug === problemIdOrSlug
    );
  },
};

export const submissionService = {
  listSeeded(state: DemoAppState): Submission[] {
    return state.submissions;
  },

  getById(state: DemoAppState, id: string): Submission | undefined {
    return state.submissions.find((s) => s.id === id);
  },

  simulateRunOrSubmit(
    state: DemoAppState,
    problemSlug: string
  ): {
    status: 'notConnected';
    message: string;
    sampleSubmissions: Submission[];
  } {
    const sampleSubmissions = problemService.getSampleSubmissions(state, problemSlug);
    return {
      status: 'notConnected',
      message:
        'Bản demo giao diện chưa kết nối hệ thống máy chấm (Judge Worker). Mã nguồn của bạn đã được lưu nháp an toàn trên trình duyệt. Bạn có thể mở các kịch bản kết quả chấm mẫu (AC / WA / TLE / CE) bên dưới để kiểm tra luồng hiển thị test case.',
      sampleSubmissions,
    };
  },
};

export const commerceService = {
  hasCourseEntitlement(state: DemoAppState, course: Course): boolean {
    if (course.priceVnd === 0) return true;
    if (state.role === 'teacher' || state.role === 'admin') return true;
    return state.enrolledCourseSlugs.includes(course.slug);
  },

  canAccessLesson(state: DemoAppState, course: Course, isPreviewLesson: boolean): boolean {
    if (isPreviewLesson) return true;
    return this.hasCourseEntitlement(state, course);
  },
};
