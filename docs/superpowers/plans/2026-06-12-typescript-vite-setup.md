# TypeScript + Vite Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the local TypeScript + Vite codebase that provides custom JS for the Advant Webflow site, with a GitHub Actions release pipeline that serves built scripts via jsDelivr CDN.

**Architecture:** Each page gets its own Vite entry point built as an IIFE. Built scripts are released via GitHub tags and served from `cdn.jsdelivr.net/gh/<owner>/advant-webflow@<version>/dist/<page>.js`. The Webflow site embeds `<script>` tags pointing to those CDN URLs. Scripts target Webflow elements via `data-*` attributes (not class names, which Webflow can regenerate).

**Tech Stack:** TypeScript 5, Vite 5, Vitest 1, GitHub Actions, jsDelivr CDN

---

### Task 1: Initialize project

**Files:**
- Create: `package.json`
- Create: `.gitignore`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "advant-webflow",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "vitest": "^1.5.0"
  }
}
```

- [ ] **Step 2: Create .gitignore**

```
node_modules/
dist/
.DS_Store
*.local
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, no errors, `package-lock.json` generated.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: initialize npm project"
```

---

### Task 2: Configure TypeScript and Vite

**Files:**
- Create: `tsconfig.json`
- Create: `vite.config.ts`

- [ ] **Step 1: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  },
  "include": ["src", "tests"]
}
```

- [ ] **Step 2: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        global: resolve(__dirname, 'src/global/index.ts'),
        case: resolve(__dirname, 'src/pages/case.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        format: 'iife',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 3: Verify TypeScript resolves**

Run: `npx tsc --version`
Expected: `Version 5.x.x`

- [ ] **Step 4: Commit**

```bash
git add tsconfig.json vite.config.ts
git commit -m "chore: configure TypeScript and Vite"
```

---

### Task 3: Create source entry points

**Files:**
- Create: `src/global/index.ts`
- Create: `src/pages/case.ts`

- [ ] **Step 1: Create src/global/index.ts**

```typescript
// Loaded on every page of the Advant Webflow site.
export {}
```

- [ ] **Step 2: Create src/pages/case.ts placeholder**

```typescript
// Case page — loaded only on /case/* pages.
export {}
```

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: `dist/global.js` and `dist/case.js` created with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/
git commit -m "chore: add source entry points"
```

---

### Task 4: Related cases utility (TDD)

**Files:**
- Create: `src/utils/cms.ts`
- Create: `tests/utils/cms.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/utils/cms.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module '../../src/utils/cms'`

- [ ] **Step 3: Write minimal implementation**

Create `src/utils/cms.ts`:

```typescript
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — 5 tests pass, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add src/utils/cms.ts tests/utils/cms.test.ts
git commit -m "feat: add getRelatedCases utility with tests"
```

---

### Task 5: Case page script

**Files:**
- Modify: `src/pages/case.ts`

Scripts target elements via `data-*` attributes. These attributes must be manually added to the corresponding elements in Webflow Designer. Required attributes:
- `data-case-name` — the case title element (used as H1 fallback)
- `data-case-hero-heading` — the hero H1 element
- `data-results-btn` — the "See results" anchor button in the hero
- `data-tag-link` + `data-tag-slug` — tag pill anchor elements

- [ ] **Step 1: Write case.ts**

```typescript
function initHeroHeading(): void {
  const heading = document.querySelector<HTMLElement>('[data-case-hero-heading]')
  if (!heading || heading.textContent?.trim()) return
  const name = document.querySelector<HTMLElement>('[data-case-name]')
  if (name?.textContent) heading.textContent = name.textContent
}

function initResultsButton(): void {
  const btn = document.querySelector<HTMLElement>('[data-results-btn]')
  if (!btn) return
  btn.style.display = document.getElementById('results') ? '' : 'none'
}

function initTagLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-tag-link]').forEach(tag => {
    const slug = tag.dataset.tagSlug
    if (slug) tag.href = `/cases?tag=${encodeURIComponent(slug)}`
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroHeading()
  initResultsButton()
  initTagLinks()
})
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: `dist/case.js` updated, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/case.ts
git commit -m "feat: case page script — hero fallback, results button, tag links"
```

---

### Task 6: GitHub Actions release pipeline

**Files:**
- Create: `.github/workflows/release.yml`

On every version tag push (`v*`), this workflow runs tests, builds scripts, and attaches them to a GitHub Release. jsDelivr then serves them at:
`https://cdn.jsdelivr.net/gh/<owner>/advant-webflow@<version>/dist/<page>.js`

Replace `<owner>` with the GitHub username or org that owns this repo.

- [ ] **Step 1: Create .github/workflows/release.yml**

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: softprops/action-gh-release@v2
        with:
          files: dist/*.js
```

- [ ] **Step 2: Commit**

```bash
git add .github/
git commit -m "ci: add GitHub Actions release pipeline"
```

---

### Task 7: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Replace CLAUDE.md with the following**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Webflow site for Advant (peter@advant.se). TypeScript + Vite for custom scripts; Webflow Designer + MCP for site structure and CMS.

## Commands

\`\`\`
npm install          # Install dependencies
npm run build        # Type-check and build to dist/
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run dev          # Vite dev server
\`\`\`

## Releasing

Tag a commit with a version and push:
\`\`\`
git tag v1.0.0
git push origin v1.0.0
\`\`\`
GitHub Actions builds and attaches `dist/*.js` to the release. jsDelivr serves them at:
`https://cdn.jsdelivr.net/gh/<owner>/advant-webflow@<version>/dist/<page>.js`

## Architecture

Two parallel layers:

**1. This repo (TypeScript + Vite)**
- `src/global/index.ts` — loaded on every page
- `src/pages/case.ts` — case page logic only
- `src/utils/cms.ts` — pure utility functions (unit tested)
- Built as IIFEs, one JS file per entry point

**2. Webflow site**
- CMS-driven Collection Page for cases
- Global Components: nav, footer, end-CTA band
- Colour system via Global Swatches
- Structural changes made via Webflow MCP where possible

## Custom attributes

Scripts target Webflow elements via `data-*` attributes added in Webflow Designer:

| Attribute | Element |
|---|---|
| `data-case-name` | Case title (used as H1 fallback) |
| `data-case-hero-heading` | Hero H1 |
| `data-results-btn` | "See results" anchor button in hero |
| `data-tag-link` | Tag pill anchor |
| `data-tag-slug` | Tag slug value on tag pill anchor |

## CMS structure

Full specification: `docs/superpowers/specs/2026-06-12-webflow-cms-case-structure-design.md`
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with commands and architecture"
```
