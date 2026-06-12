export interface CaseRef {
  slug: string
  category: string
}

export function getRelatedCases(
  manual: string[],
  currentSlug: string,
  category: string,
  all: CaseRef[]
): string[] {
  const selected = manual.filter(slug => slug !== currentSlug).slice(0, 3)
  if (selected.length >= 3) return selected

  const autoFill = all
    .filter(c => c.category === category && c.slug !== currentSlug && !selected.includes(c.slug))
    .map(c => c.slug)

  return [...selected, ...autoFill].slice(0, 3)
}
