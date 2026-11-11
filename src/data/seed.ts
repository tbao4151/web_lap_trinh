import { BRAND_CONFIG } from '@/config/brand';
import type { DemoAppState } from '@/types';
import { buildCompleteLessonsMap, SEED_COURSES } from './courses-seed';
import {
  SEED_CLASSROOMS,
  SEED_CONTESTS,
  SEED_LEARNING_PATHS,
  SEED_NOTES,
  SEED_ORDERS,
  SEED_RESEARCH_NOTES,
  SEED_SKILL_COMPETENCIES,
  SEED_USERS,
} from './ecosystem-seed';
import { SEED_PROBLEMS, SEED_SUBMISSIONS } from './problems-seed';

export {
  SEED_COURSES,
  SEED_PROBLEMS,
  SEED_SUBMISSIONS,
  SEED_LEARNING_PATHS,
  SEED_SKILL_COMPETENCIES,
  SEED_NOTES,
  SEED_CLASSROOMS,
  SEED_CONTESTS,
  SEED_RESEARCH_NOTES,
  SEED_USERS,
  SEED_ORDERS,
};

export function createInitialDemoState(): DemoAppState {
  const courses = structuredClone(SEED_COURSES);
  const lessonsBySlug = buildCompleteLessonsMap(courses);

  return {
    version: BRAND_CONFIG.version,
    role: 'learner',
    activeGoal: 'competitive',
    enrolledCourseSlugs: [
      'dp-tu-duy-den-nang-cao',
      'cpp-co-ban',
      'thuat-toan-hsg-cpp',
      'git-github-thuc-hanh',
    ],
    completedLessonSlugs: [
      'nhap-mon-dp',
      'nhap-xuat-va-bien-cpp',
      'vong-lap-for-while-cpp',
      'mang-mot-chieu',
      'mang-cong-don-prefix-sum',
      'git-branch-merge',
    ],
    bookmarkedLessonSlugs: ['dp-1d-doi-tien', 'tim-kiem-nhi-phan'],
    quizAnswers: {},
    notes: structuredClone(SEED_NOTES),
    codeDrafts: {},
    solvedProblemSlugs: ['tong-hai-so', 'tong-phan-tu-mang', 'dem-so-chan', 'doi-tien-it-nhat'],
    attemptedProblemSlugs: ['tim-kiem-nhi-phan', 'balo-0-1'],
    courses,
    lessonsBySlug,
    problems: structuredClone(SEED_PROBLEMS),
    submissions: structuredClone(SEED_SUBMISSIONS),
    classrooms: structuredClone(SEED_CLASSROOMS),
    researchNotes: structuredClone(SEED_RESEARCH_NOTES),
    users: structuredClone(SEED_USERS),
    orders: structuredClone(SEED_ORDERS),
  };
}
