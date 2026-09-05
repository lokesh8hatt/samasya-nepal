type Scorable = {
  scale: string | null;
  source: string | null;
  description: string;
};

function hasQuantifiedScale(scale: string | null): boolean {
  if (!scale) return false;
  return !/impact not quantified/i.test(scale);
}

function hasCitedSource(source: string | null): boolean {
  if (!source) return false;
  return source.trim().toLowerCase() !== "general knowledge";
}

/**
 * Heuristic 0-100 score: rewards a quantified scale, a real citation,
 * and a description detailed enough to picture a product against.
 * Transparent by design — see /about for the exact formula.
 */
export function getImpactScore(problem: Scorable): number {
  let score = 45;
  if (hasQuantifiedScale(problem.scale)) score += 25;
  if (hasCitedSource(problem.source)) score += 20;
  score += Math.min(10, Math.floor(problem.description.length / 45));
  return Math.min(100, score);
}

export function sortByImpactScore<T extends Scorable>(problems: T[]): T[] {
  return [...problems].sort(
    (a, b) => getImpactScore(b) - getImpactScore(a)
  );
}
