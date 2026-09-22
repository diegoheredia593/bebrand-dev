// Shared between the API routes (server) and the conversational form
// (client) so the "dedicated column" question ids never drift out of sync
// between what the wizard sends and what the API extracts onto its own
// queryable columns.
export const DEDICATED_ANSWER_KEYS = [
  'projectTypes',
  'mainGoal',
  'budgetRange',
  'timeline',
  'preferredContactMethod',
] as const;

export type DedicatedAnswerKey = (typeof DEDICATED_ANSWER_KEYS)[number];

export type LeadAnswerValue = string | string[];
export type LeadAnswers = Record<string, LeadAnswerValue>;

export function generatePublicId(): string {
  return crypto.randomUUID();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function toColumnValue(value: LeadAnswerValue | undefined): string | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value.join(', ') : value;
}
