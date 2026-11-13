import test from 'node:test';
import assert from 'node:assert/strict';
import { readCodeDraft, writeCodeDraft, removeCodeDraft } from '../src/utils/codeDrafts.ts';

test('empty saved code does not revert to the starter fallback', () => {
  const saved = writeCodeDraft({}, 'coin-change', 'cpp', '');
  assert.equal(readCodeDraft(saved, 'coin-change', 'cpp', 'starter'), '');
  assert.equal(readCodeDraft(saved, 'coin-change', 'python', 'starter'), 'starter');
});

test('drafts stay separate for each problem and programming language', () => {
  const initial = {};
  const cpp = writeCodeDraft(initial, 'coin-change', 'cpp', 'C++ code');
  const python = writeCodeDraft(cpp, 'coin-change', 'python', 'Python code');
  const other = writeCodeDraft(python, 'other-problem', 'cpp', 'Other code');
  assert.deepEqual(initial, {});
  assert.deepEqual(cpp, { 'coin-change::cpp': 'C++ code' });
  assert.equal(readCodeDraft(other, 'coin-change', 'cpp', '?'), 'C++ code');
  assert.equal(readCodeDraft(other, 'coin-change', 'python', '?'), 'Python code');
  assert.equal(readCodeDraft(other, 'other-problem', 'cpp', '?'), 'Other code');
});

test('reset deletes only the selected problem-language draft without mutating state', () => {
  const saved = {
    'coin-change::cpp': 'C++ code',
    'coin-change::python': 'Python code',
    'other-problem::cpp': 'Other code',
  };
  const cleared = removeCodeDraft(saved, 'coin-change', 'cpp');
  assert.deepEqual(saved, {
    'coin-change::cpp': 'C++ code',
    'coin-change::python': 'Python code',
    'other-problem::cpp': 'Other code',
  });
  assert.deepEqual(cleared, {
    'coin-change::python': 'Python code',
    'other-problem::cpp': 'Other code',
  });
  assert.equal(readCodeDraft(cleared, 'coin-change', 'cpp', 'starter'), 'starter');
});
