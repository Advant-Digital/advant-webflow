# Design Spec: Advant Webflow — CMS Case Structure

**Date:** 2026-06-12
**Authors:** Peter Larsson, Joacim Lundin
**Status:** Approved

---

## Overview

Advant's new website is built in Webflow with a TypeScript + Vite codebase alongside it for custom behaviour. This spec covers the CMS structure for the Case section — the first and primary content type. The site will grow into a full-scale web project; this spec is scoped to the case architecture only.

Reference mockup: `docs/vard-ar-bast-case.html`
Reference design doc: `docs/Advant-Webflow-case-mall.docx`

---

## Architecture

Two parallel layers:

**Layer 1 — Local TypeScript + Vite codebase** (this repo)
- Scripts organised by page under `src/pages/`
- Built and released via GitHub, served from jsDelivr CDN
- Webflow embeds a `<script>` tag in the page head pointing to the CDN URL

**Layer 2 — Webflow site**
- CMS-driven Collection Page template for cases
- Global Components for nav, footer, and end-CTA
- Global Swatches for the colour system
- Structural changes made via Webflow MCP from Claude Code where possible

### Naming conventions
All CMS collection names, field names, HTML classes, and IDs must be in **English**.

---

## Design System

### Colour tokens (Global Swatches)

| Name | Hex | Usage |
|---|---|---|
| Lime | #D6F277 | Accent, stickers, key numbers, icon circles |
| Lilac | #C49BF5 | Tags, strategic insight band, icon circles |
| Pink | #F7D9E3 | Navigation, soft accent |
| Ink | #111111 | Text, buttons, Effect section background |
| Sand | #EFEAE4 | Quiet backgrounds, cards |
| Paper | #FFFFFF | Page background, cards |

### Typography
- Font: Inter
- Headlines: heavy weight, tight letter-spacing, `clamp()` for responsive sizing
- Border radius: ~6px for cards, 0 for full-bleed image blocks — controlled centrally via classes

---

## CMS Collections

### Collections overview

| Collection | Type | Purpose |
|---|---|---|
| Case | Main | One post per case |
| Tags | Standalone | Reusable filterable tags |
| Category | Standalone | Drives related cases filter |
| Coworkers | Standalone | Advant team members |
| Awards | Standalone | Reusable awards |
| Hero Media | Nested | Slideshow items per case |
| Insights | Nested | Challenge insight cards per case |
| Key Numbers | Nested | Stats per case |
| Result Cards | Nested | Result descriptions per case |
| Case Awards | Junction | Award + case-specific nomination text |
| Process Steps | Nested | Process steps per case |

---

### Case (main collection)

| Field | Type | Notes |
|---|---|---|
| Name | Plain text | Case name. Generates slug/URL. |
| Hero Heading | Plain text | Optional. Falls back to Name via JS if empty. |
| Hero Preamble | Plain text (long) | Lead text below hero headline. |
| Hero Sticker Text | Plain text | Circular sticker overlay on hero media. Hidden if empty. |
| Hero Sticker Color | Option (Lime / Lilac / Pink / Sand) | Hidden if empty. |
| Tags | Multi-reference → Tags | Clickable filterable pills. |
| Client | Plain text | e.g. "Region Värmland" |
| Mission | Plain text | |
| Industry | Plain text | |
| Awards Summary | Plain text | Short awards line, e.g. "Guldvargen Gold 2019". Labels hardcoded in template. |
| Challenge Pre-heading | Plain text | |
| Challenge Heading | Plain text | |
| Challenge Body | Rich text | |
| Strategic Insight Pre-heading | Plain text | |
| Strategic Insight Quote | Plain text | Large headline on lilac band. |
| Strategic Insight From | Plain text | e.g. "From 'healthcare needs people'…" |
| Strategic Insight To | Plain text | e.g. "…to 'could this be me?'" |
| Creative Solution Pre-heading | Plain text | |
| Creative Solution Heading | Plain text | |
| Creative Solution Body | Rich text | |
| Creative Solution Gallery | Multi-image | Auto-layout via CSS Grid. Variable number of images. |
| Effect Pre-heading | Plain text | |
| Effect Heading | Plain text | |
| Effect Body | Plain text (long) | Intro line for the dark stats block. |
| Expert Pre-heading | Plain text | |
| Expert Heading | Plain text | |
| Expert Body | Rich text | |
| Expert Lead | Reference → Coworkers | The Advant team member who led the case. |
| Expert Lead Role | Plain text | Case-specific role, e.g. "Strategist & project lead". |
| Related Cases | Multi-reference → Case | Up to 3. Auto-filled by JS if fewer than 3 selected. |
| Category | Reference → Case Category | Drives auto related cases filter. Collection named "Case Category" to avoid slug conflict with Velos theme. |

---

### Tags

| Field | Type |
|---|---|
| Name | Plain text |

Clicking a tag on a case page navigates to the case listing filtered by that tag via URL parameter.

---

### Category

| Field | Type |
|---|---|
| Name | Plain text |

One category per case. Used to auto-fill Related Cases when fewer than 3 are manually selected.

---

### Coworkers

| Field | Type |
|---|---|
| Name | Plain text |
| Photo | Image |
| Email | Plain text |
| Phone | Plain text |

---

### Awards

| Field | Type |
|---|---|
| Badge Text | Plain text | e.g. "GOLD 2019" |
| Title | Plain text | e.g. "Gold in Guldvargen 2019" |

Awards are reusable across cases. Case-specific nomination text lives in the Case Awards junction collection.

---

### Hero Media (nested)

Supports a mixed image/video slideshow. Editor controls order via Sort Order.

| Field | Type | Notes |
|---|---|---|
| Sort Order | Number | |
| Media Type | Option (Image / Video) | |
| Image | Image | Used when type = Image |
| Video URL | Plain text | Vimeo URL or ID |
| Video Thumbnail | Image | Preview image shown before video plays |
| Case | Reference → Case | |

---

### Insights (nested)

Challenge insight cards. 0–5 per case. Case-specific, never shared.

| Field | Type |
|---|---|
| Sort Order | Number |
| Tag | Plain text |
| Heading | Plain text |
| Text | Plain text (long) |
| Icon | Image |
| Icon Background Color | Option (Pink / Lime / Lilac) |
| Case | Reference → Case |

---

### Key Numbers (nested)

Large stat figures in the Effect section.

| Field | Type | Notes |
|---|---|---|
| Number | Plain text | e.g. "3.8%" |
| Label | Plain text | Explanatory text below the number |
| Sort Order | Number | |
| Case | Reference → Case | |

---

### Result Cards (nested)

Text cards in the Effect section describing qualitative results.

| Field | Type |
|---|---|
| Heading | Plain text |
| Text | Plain text (long) |
| Sort Order | Number |
| Case | Reference → Case |

---

### Case Awards (junction)

Connects a reusable Award to a Case with a case-specific nomination text.

| Field | Type |
|---|---|
| Award | Reference → Awards |
| Nomination Text | Plain text (long) |
| Sort Order | Number |
| Case | Reference → Case |

---

### Process Steps (nested)

| Field | Type | Notes |
|---|---|---|
| Sort Order | Number (0-based) | Display number = Sort Order + 1 |
| Heading | Plain text | |
| Text | Plain text (long) | |
| Case | Reference → Case | |

---

## Reusable Components (Webflow Designer)

These sections must be built as Webflow Components (symbols) so styling updates propagate site-wide:

- **Nav** — sticky, pink background, logo + links + CTA button
- **Footer** — global
- **End CTA band** — lime background, editable headline and button text
- **Pre-heading / Heading / Body block** — used in Challenge, Creative Solution, and Expert sections
- **Strategic Insight band** — lilac background
- **Gallery** — auto-layout CSS Grid

---

## Key Implementation Notes (case.ts)

- **Hero Heading fallback** — if `Hero Heading` field is empty, render `Name` as the H1
- **"See results" button** — auto-shown in hero only if the `#results` section exists in the DOM; hidden otherwise
- **Related Cases auto-fill** — show manually selected cases first; fill remaining slots up to 3 with cases from the same Category, excluding current case and already-shown cases
- **Tag filtering** — clicking a tag passes the tag slug as a URL parameter to the case listing page
- **Gallery layout** — CSS Grid with `auto-fit` to handle variable image counts gracefully
- **Conditional visibility** — Sticker, Meta fields, Award badge, and other optional fields hidden when empty (handled in Webflow Designer via Conditional Visibility)
- **Scroll offset** — `#results` section needs `scroll-margin-top` to account for sticky nav height
- **Accessibility** — alt-text on all image fields, visible keyboard focus, respect `prefers-reduced-motion`
