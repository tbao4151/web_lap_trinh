import assert from 'node:assert/strict';
import test from 'node:test';

import {
  isCompetitiveCourse,
  isCompetitiveProgrammingLanguage,
  selectCompetitiveCourses,
} from '../src/utils/competitiveCourses.ts';

const makeCourse = (slug, domainId, languages, goals = ['competitive']) => ({
  id: slug,
  slug,
  domainId,
  languages,
  goals,
  title: slug,
  modules: [],
});

test('only C++ and Python are languages for the public competitive catalogue', () => {
  assert.equal(isCompetitiveProgrammingLanguage('cpp'), true);
  assert.equal(isCompetitiveProgrammingLanguage('python'), true);
  assert.equal(isCompetitiveProgrammingLanguage('c'), false);
  assert.equal(isCompetitiveProgrammingLanguage('java'), false);
});

test('exclude C-only, Java-only, Git/SQL courses even if their metadata mentions C++', () => {
  assert.equal(isCompetitiveCourse(makeCourse('cpp', 'lap-trinh', ['cpp'])), true);
  assert.equal(isCompetitiveCourse(makeCourse('dp', 'thuat-toan-hsg', ['c', 'cpp'])), true);
  assert.equal(isCompetitiveCourse(makeCourse('c', 'lap-trinh', ['c'])), false);
  assert.equal(isCompetitiveCourse(makeCourse('java', 'lap-trinh', ['java'])), false);
  assert.equal(isCompetitiveCourse(makeCourse('git', 'cong-nghe-phan-mem', ['cpp', 'python'])), false);
  assert.equal(isCompetitiveCourse(makeCourse('sql', 'cntt-mo-rong', ['python'])), false);
});

test('returns copies with C++/Python and no career goal without mutating old demo seeds', () => {
  const input = [
    makeCourse('dp', 'thuat-toan-hsg', ['java', 'cpp', 'c', 'python'], ['career-cs', 'competitive']),
    makeCourse('python', 'lap-trinh', ['python'], ['zero-to-hero']),
    makeCourse('git', 'cong-nghe-phan-mem', ['cpp', 'python']),
  ];
  const output = selectCompetitiveCourses(input);
  assert.deepEqual(output.map((c) => c.slug), ['dp', 'python']);
  assert.deepEqual(output[0].languages, ['cpp', 'python']);
  assert.deepEqual(output[0].goals, ['competitive']);
  assert.deepEqual(input[0].languages, ['java', 'cpp', 'c', 'python']);
  assert.deepEqual(input[0].goals, ['career-cs', 'competitive']);
  assert.notStrictEqual(output[0], input[0]);
});
