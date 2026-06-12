# advant-webflow

Custom JavaScript for the Advant website, built with TypeScript and bundled as IIFE scripts for Webflow.

## Overview

The Advant website runs on Webflow. This repo contains all custom behaviour that goes beyond what Webflow supports natively — page-specific scripts, shared utilities, and the release pipeline that makes them available to the live site.

**Two parallel layers:**

| Layer | Responsibility |
|---|---|
| This repo | Custom JS/TS logic, tests, CI/CD |
| Webflow Designer + MCP | Site structure, CMS, components, styles |

## Architecture

Each page gets its own entry point, built as an IIFE (Immediately Invoked Function Expression) so it runs as a plain `<script>` embed in Webflow without a module loader.

```
src/
  global/index.ts     # Loaded on every page
  pages/case.ts       # Case page interactions
  utils/cms.ts        # Shared utilities (unit tested)
build.js              # esbuild script → dist/*.js (IIFE format)
vite.config.ts        # Vitest test runner config only
```

> Vite/Rollup 4 cannot produce IIFE format with multiple entry points, so esbuild handles building while Vite is retained as the Vitest test runner.

## Getting Started

```bash
npm install
npm run build     # type-check + build to dist/
npm test          # run unit tests
```

## Development

Add new page scripts under `src/pages/`. Register the entry point in `build.js`:

```js
await esbuild.build({
  entryPoints: ['src/pages/your-page.ts'],
  outfile: 'dist/your-page.js',
  format: 'iife',
  bundle: true,
})
```

Scripts target Webflow elements via `data-*` attributes set in the Designer — never by class name, which Webflow can regenerate.

| Attribute | Element |
|---|---|
| `data-case-name` | Case title (H1 fallback source) |
| `data-case-hero-heading` | Hero H1 |
| `data-results-btn` | "See results" anchor in hero |
| `data-tag-link` | Tag pill anchor |
| `data-tag-slug` | Tag slug on tag pill anchor |

## Releasing

Tag a commit and push — GitHub Actions runs tests, builds, and attaches the `dist/*.js` files to a GitHub Release. jsDelivr serves them automatically:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Scripts are then available at:
```
https://cdn.jsdelivr.net/gh/Advant-Digital/advant-webflow@v1.0.0/dist/case.js
```

Add this URL as a `<script>` tag in the Webflow page's custom code settings.

## CMS Structure

The Webflow CMS is designed around the Case content type with 11 collections. Full specification:
[`docs/superpowers/specs/2026-06-12-webflow-cms-case-structure-design.md`](docs/superpowers/specs/2026-06-12-webflow-cms-case-structure-design.md)
