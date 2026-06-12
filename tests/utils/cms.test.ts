import { describe, it, expect } from 'vitest'
import { getRelatedCases, type CaseRef } from '../../src/utils/cms'

describe('getRelatedCases', () => {
  const cases: CaseRef[] = [
    { slug: 'case-a', category: 'strategy' },
    { slug: 'case-b', category: 'strategy' },
    { slug: 'case-c', category: 'strategy' },
    { slug: 'case-d', category: 'design' },
  ]

  it('returns manually selected cases up to 3', () => {
    const result = getRelatedCases(['case-a', 'case-b', 'case-c'], 'case-d', 'strategy', cases)
    expect(result).toEqual(['case-a', 'case-b', 'case-c'])
  })

  it('excludes current case from manual selection', () => {
    const result = getRelatedCases(['case-a', 'case-b'], 'case-a', 'strategy', cases)
    expect(result).not.toContain('case-a')
  })

  it('auto-fills remaining slots from same category', () => {
    const result = getRelatedCases(['case-a'], 'case-d', 'strategy', cases)
    expect(result).toHaveLength(3)
    expect(result[0]).toBe('case-a')
  })

  it('does not include current case in auto-fill', () => {
    const result = getRelatedCases([], 'case-a', 'strategy', cases)
    expect(result).not.toContain('case-a')
  })

  it('returns fewer than 3 when category has insufficient cases', () => {
    const result = getRelatedCases([], 'case-d', 'design', cases)
    expect(result).toHaveLength(0)
  })
})
