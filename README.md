# advant-webflow

Custom JavaScript for the [Advant](https://advant.se) website. TypeScript source, bundled as IIFE scripts and served via jsDelivr CDN to a Webflow-hosted site.

## Architecture

The site runs on Webflow. This repo handles all custom behaviour that goes beyond what Webflow supports natively.

```
src/
  global/index.ts     # Runs on every page
  pages/case.ts       # Case page interactions
  utils/
    hero-slider.ts    # Splide video slider with custom controls
    cms.ts            # Shared CMS utilities (unit tested)
build.js              # esbuild → dist/*.js (IIFE format)
```

Each entry point is compiled to a self-contained IIFE so it loads as a plain `<script>` tag in Webflow with no module loader required.

> esbuild handles the IIFE builds; Vite is kept solely as the Vitest test runner since Rollup 4 cannot produce IIFE format with multiple entry points.

## Setup

```bash
npm install
npm run build   # type-check + bundle to dist/
npm test        # unit tests
```

## Adding a page script

1. Create `src/pages/your-page.ts`
2. Register the entry point in `build.js`:

```js
const entries = {
  global: 'src/global/index.ts',
  case:   'src/pages/case.ts',
  'your-page': 'src/pages/your-page.ts',  // add here
}
```

3. Add the output URL as a `<script>` tag in the Webflow page's custom code settings.

## Webflow integration

Scripts target elements via `data-*` attributes set in Webflow Designer — never by generated class names.

| Attribute | Element |
|---|---|
| `data-hero-slider` | Hero slideshow root |
| `data-video-thumb` | Slide thumbnail overlay |
| `data-video-play-pause` | Play/pause button |
| `data-video-mute` | Mute button |
| `data-video-subtitle` | Subtitle toggle button |
| `data-video-timeline` | Scrubber track |
| `data-video-progress` | Scrubber fill |
| `data-case-name` | Case title (H1 fallback source) |
| `data-case-hero-heading` | Hero H1 |
| `data-results-btn` | "See results" anchor in hero |
| `data-tag-link` | Tag pill anchor |
| `data-tag-slug` | Tag slug on tag pill anchor |

## Releases

Tag a commit and push. GitHub Actions runs tests, builds, and publishes a GitHub Release with the dist files attached. jsDelivr serves them immediately:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The built files are available at:

```
https://cdn.jsdelivr.net/gh/Advant-Digital/advant-webflow@v1.0.0/dist/case.js
https://cdn.jsdelivr.net/gh/Advant-Digital/advant-webflow@v1.0.0/dist/global.js
```

The `cdn` branch always tracks the latest release and can be referenced as `@cdn` instead of a pinned version.
