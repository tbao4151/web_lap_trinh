import test from 'node:test';
import assert from 'node:assert/strict';

import {
  COMPETITIVE_LANGUAGES,
  getCompetitiveLanguages,
  isCompetitiveLanguage,
} from '../src/config/competitiveLanguages.ts';

test('competitive language choices are C++ and Python in priority order', () => {
  assert.deepEqual([...COMPETITIVE_LANGUAGES], ['cpp', 'python']);
});

test('legacy languages are not admitted to competitive workflows', () => {
  assert.equal(isCompetitiveLanguage('cpp'), true);
  assert.equal(isCompetitiveLanguage('python'), true);
  assert.equal(isCompetitiveLanguage('c'), false);
  assert.equal(isCompetitiveLanguage('java'), false);
});

test('filter respects both problem availability and competitive scope', () => {
  assert.deepEqual(getCompetitiveLanguages(['java', 'python', 'cpp', 'c']), ['cpp', 'python']);
  assert.deepEqual(getCompetitiveLanguages(['python']), ['python']);
  assert.deepEqual(getCompetitiveLanguages(['c', 'java']), []);
  assert.deepEqual(getCompetitiveLanguages([]), []);
});
