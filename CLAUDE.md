# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Webflow site for Advant (peter@advant.se). TypeScript + esbuild for custom scripts; Webflow Designer + MCP for site structure and CMS.

## Commands

```
npm install          # Install dependencies
npm run build        # Type-check (tsc) and build IIFE bundles to dist/
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run dev          # Vite dev server
```

## Releasing

Tag a commit with a version and push:
```
git tag v1.0.0
git push origin v1.0.0
```
GitHub Actions builds and attaches `dist/*.js` to the release. jsDelivr serves them at:
`https://cdn.jsdelivr.net/gh/<owner>/advant-webflow@<version>/dist/<page>.js`

## Architecture

Two parallel layers:

**1. This repo (TypeScript + esbuild)**
- `src/global/index.ts` — loaded on every page
- `src/pages/case.ts` — case page logic only
- `src/utils/cms.ts` — pure utility functions (unit tested)
- Built as IIFEs via esbuild (`build.js`); one JS file per entry point
- Vitest used for tests (via `vite.config.ts` test config)
- Note: Vite/Rollup 4 cannot produce IIFE format with multiple entry points — esbuild handles building, Vite handles testing only

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
