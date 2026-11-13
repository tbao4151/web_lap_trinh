import type { ProgrammingLanguage } from '@/types';

type CodeDraftMap = Record<string, string>;

const draftKey = (problemSlug: string, language: ProgrammingLanguage): string =>
  `${problemSlug}::${language}`;

// An empty string is a deliberate saved draft and must not fall back to starter code.
export function readCodeDraft(
  drafts: CodeDraftMap,
  problemSlug: string,
  language: ProgrammingLanguage,
  fallback: string
): string {
  return drafts[draftKey(problemSlug, language)] ?? fallback;
}

export function writeCodeDraft(
  drafts: CodeDraftMap,
  problemSlug: string,
  language: ProgrammingLanguage,
  code: string
): CodeDraftMap {
  return { ...drafts, [draftKey(problemSlug, language)]: code };
}

export function removeCodeDraft(
  drafts: CodeDraftMap,
  problemSlug: string,
  language: ProgrammingLanguage
): CodeDraftMap {
  const next = { ...drafts };
  delete next[draftKey(problemSlug, language)];
  return next;
}
