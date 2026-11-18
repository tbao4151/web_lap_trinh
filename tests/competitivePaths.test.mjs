import test from 'node:test';
import assert from 'node:assert/strict';

import { SEED_COURSES } from '../src/data/courses-seed.ts';
import { SEED_PROBLEMS } from '../src/data/problems-seed.ts';
import {
  COMPETITIVE_GOAL_META,
  COMPETITIVE_LEARNING_PATHS,
  resolveCompetitiveLearningPath,
} from '../src/data/competitive-paths.ts';

const coursesBySlug = new Map(SEED_COURSES.map((course) => [course.slug, course]));
const problemsBySlug = new Map(SEED_PROBLEMS.map((problem) => [problem.slug, problem]));

test('four distinct paths cover beginner, school HSG, advanced HSG and OI/ICPC preparation', () => {
  assert.equal(COMPETITIVE_LEARNING_PATHS.length, 4);
  assert.equal(new Set(COMPETITIVE_LEARNING_PATHS.map((path) => path.slug)).size, 4);
  assert.equal(new Set(COMPETITIVE_LEARNING_PATHS.map((path) => path.id)).size, 4);
  assert.equal(new Set(COMPETITIVE_LEARNING_PATHS.map((path) => path.goal)).size, 4);
  assert.deepEqual(
    COMPETITIVE_LEARNING_PATHS.map((path) => path.goal),
    ['zero-to-hero', 'high-school', 'competitive', 'career-cs']
  );
  for (const path of COMPETITIVE_LEARNING_PATHS) {
    assert.ok(COMPETITIVE_GOAL_META[path.goal]?.label);
    assert.ok(path.nodes.length > 0);
    assert.deepEqual(path.nodes.map((node) => node.order), path.nodes.map((_, i) => i + 1));
    assert.equal(new Set(path.nodes.map((node) => node.id)).size, path.nodes.length);
  }
});

test('every path references existing competitive courses and existing problems', () => {
  for (const path of COMPETITIVE_LEARNING_PATHS) {
    for (const node of path.nodes) {
      const course = coursesBySlug.get(node.courseSlug);
      assert.ok(course, `Missing course ${node.courseSlug} in ${path.slug}`);
      assert.ok(
        ['lap-trinh', 'thuat-toan-hsg'].includes(course.domainId),
        `Off-scope domain ${course.domainId} in ${path.slug}`
      );
      assert.ok(
        course.languages.some((lang) => lang === 'cpp' || lang === 'python'),
        `Off-scope language for ${node.courseSlug}`
      );
      for (const slug of node.recommendedProblemSlugs) {
        const problem = problemsBySlug.get(slug);
        assert.ok(problem, `Missing problem ${slug} in ${path.slug}`);
        assert.ok(
          problem.supportedLanguages.some((lang) => lang === 'cpp' || lang === 'python'),
          `Problem ${slug} has no competitive language`
        );
      }
    }
  }
});

test('old public path slugs resolve to the new curriculum without exposing old titles', () => {
  const school = resolveCompetitiveLearningPath('tin-hoc-pho-thong-toan-dien');
  const advanced = resolveCompetitiveLearningPath('nen-tang-ky-su-phan-mem');
  assert.equal(school?.slug, 'hsg-truong-huyen-cpp-python');
  assert.equal(advanced?.slug, 'du-bi-oi-icpc-nang-cao');
  assert.ok(advanced?.subtitle.includes('chưa'));
  assert.equal(resolveCompetitiveLearningPath('du-bi-oi-icpc-nang-cao')?.id, 'path-career');
  assert.equal(resolveCompetitiveLearningPath('missing'), undefined);
});

test('new paths have no unrelated Git, SQL, Java, C-only stages', () => {
  const text = COMPETITIVE_LEARNING_PATHS
    .flatMap((path) => [path.title, path.subtitle, ...path.nodes.map((node) => node.title)])
    .join(' ');
  assert.doesNotMatch(text, /\b(?:Git|SQL|Java|C17)\b/i);
});
