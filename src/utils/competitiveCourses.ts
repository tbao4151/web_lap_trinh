import type { Course, ProgrammingLanguage } from '@/types';

// Keep legacy demo records intact while curating public competitive courses.
// A non-competitive domain must never enter the public catalogue even if its
// old mock metadata mentions C++ or Python (for example Git and SQL).
const COMPETITIVE_DOMAINS = new Set(['lap-trinh', 'thuat-toan-hsg']);

export function isCompetitiveProgrammingLanguage(language: ProgrammingLanguage): boolean {
  return language === 'cpp' || language === 'python';
}

export function isCompetitiveCourse(
  course: Pick<Course, 'domainId' | 'languages'>
): boolean {
  return (
    COMPETITIVE_DOMAINS.has(course.domainId) &&
    course.languages.some(isCompetitiveProgrammingLanguage)
  );
}

export function selectCompetitiveCourses(courses: readonly Course[]): Course[] {
  return courses.filter(isCompetitiveCourse).map((course) => ({
    ...course,
    languages: course.languages.filter(isCompetitiveProgrammingLanguage),
    goals: course.goals.filter((goal) => goal !== 'career-cs'),
  }));
}
