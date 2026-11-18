import type { ProgrammingLanguage } from '@/types';

// Public competitive-programming workflows support only C++ and Python.
// Keep the broader legacy type until old demo records have been migrated.
export const COMPETITIVE_LANGUAGES = ['cpp', 'python'] as const satisfies readonly ProgrammingLanguage[];

export function isCompetitiveLanguage(language: ProgrammingLanguage): boolean {
  return COMPETITIVE_LANGUAGES.some((supported) => supported === language);
}

export function getCompetitiveLanguages(
  supportedLanguages: readonly ProgrammingLanguage[]
): ProgrammingLanguage[] {
  return COMPETITIVE_LANGUAGES.filter((language) => supportedLanguages.includes(language));
}
