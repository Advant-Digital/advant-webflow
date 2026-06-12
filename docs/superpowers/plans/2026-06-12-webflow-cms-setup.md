# Webflow Site and CMS Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the Advant Webflow site, set up the brand colour design tokens, and build all 11 CMS collections with correct fields and references as defined in the case structure spec.

**Architecture:** All 11 collections are created in two passes — first all collection shells (so reference targets exist), then all fields are added in dependency order (static fields first, reference fields last). Collections are standalone, nested, or junction as defined in the spec. Reference fields can only be created after their target collection exists.

**Tech Stack:** Webflow MCP (`data_cms_tool`, `variable_tool`, `data_sites_tool`)

---

## Dependency order

Reference fields require their target collection to exist first. Build order:

1. Create all collection shells (names only)
2. Add fields to support collections (Tags, Category, Coworkers, Awards)
3. Add static fields to nested collections
4. Add Case → nested reference fields (Hero Media, Insights, etc. → Case)
5. Add Case Awards reference fields (→ Awards, → Case)
6. Add static fields to Case
7. Add reference/multi-reference fields to Case (→ Tags, Category, Coworkers, Case)

---

### Task 1: Connect to Webflow site

**Files:** none

- [ ] **Step 1: Create a new Webflow site manually**

Go to [app.webflow.com](https://app.webflow.com) → New Site → Blank Site → name it `advant`. This cannot be done via MCP.

- [ ] **Step 2: Get the site ID via MCP**

Use `data_sites_tool` to list sites and find the newly created site. Note the `site_id` — every subsequent task requires it.

Expected: a site object with fields including `id`, `displayName: "advant"`.

- [ ] **Step 3: Note the site ID**

Record the `site_id` in a local scratch note. It will be referenced as `SITE_ID` throughout this plan.

---

### Task 2: Set up brand colour variables

**Files:** none

These become CSS custom properties used throughout the site. Create one variable collection containing all six brand colours.

- [ ] **Step 1: Create variable collection**

Use `variable_tool > create_variable_collection`:
```
name: "Brand Colors"
```
Note the returned `variable_collection_id` as `COLOR_COLLECTION_ID`.

- [ ] **Step 2: Create colour variables**

Use `variable_tool > create_color_variable` once per colour:

| name | static_value |
|---|---|
| Lime | #D6F277 |
| Lilac | #C49BF5 |
| Pink | #F7D9E3 |
| Ink | #111111 |
| Sand | #EFEAE4 |
| Paper | #FFFFFF |

Each call: `{ name, variable_collection_id: COLOR_COLLECTION_ID, value: { static_value: "<hex>" } }`

- [ ] **Step 3: Verify**

Use `variable_tool > get_variables` filtered by `COLOR_COLLECTION_ID`. Expected: 6 colour variables returned.

---

### Task 3: Create all collection shells

Create the 11 collections with names only — no fields yet. Note each returned `collection_id`.

- [ ] **Step 1: Create standalone collections**

Use `data_cms_tool > create_collection` four times:

```
{ name: "Tags",       site_id: SITE_ID }  → TAGS_ID
{ name: "Category",   site_id: SITE_ID }  → CATEGORY_ID
{ name: "Coworkers",  site_id: SITE_ID }  → COWORKERS_ID
{ name: "Awards",     site_id: SITE_ID }  → AWARDS_ID
```

- [ ] **Step 2: Create main Case collection**

```
{ name: "Case", site_id: SITE_ID }  → CASE_ID
```

- [ ] **Step 3: Create nested collections**

```
{ name: "Hero Media",     site_id: SITE_ID }  → HERO_MEDIA_ID
{ name: "Insights",       site_id: SITE_ID }  → INSIGHTS_ID
{ name: "Key Numbers",    site_id: SITE_ID }  → KEY_NUMBERS_ID
{ name: "Result Cards",   site_id: SITE_ID }  → RESULT_CARDS_ID
{ name: "Process Steps",  site_id: SITE_ID }  → PROCESS_STEPS_ID
{ name: "Case Awards",    site_id: SITE_ID }  → CASE_AWARDS_ID
```

- [ ] **Step 4: Verify**

Use `data_cms_tool > get_collection_list` with `SITE_ID`. Expected: 11 collections returned.

---

### Task 4: Add fields to Tags and Category

- [ ] **Step 1: Tags — Name field**

Use `data_cms_tool > create_collection_static_field`:
```
collection_id: TAGS_ID
data: { displayName: "Name", type: "PlainText", isRequired: true }
```

- [ ] **Step 2: Category — Name field**

```
collection_id: CATEGORY_ID
data: { displayName: "Name", type: "PlainText", isRequired: true }
```

- [ ] **Step 3: Commit progress note**

```bash
git commit --allow-empty -m "chore: Tags and Category collections complete"
```

---

### Task 5: Add fields to Coworkers

- [ ] **Step 1: Name**

```
collection_id: COWORKERS_ID
data: { displayName: "Name", type: "PlainText", isRequired: true }
```

- [ ] **Step 2: Photo**

```
data: { displayName: "Photo", type: "ImageRef", isRequired: false }
```

- [ ] **Step 3: Email**

```
data: { displayName: "Email", type: "PlainText", isRequired: false }
```

- [ ] **Step 4: Phone**

```
data: { displayName: "Phone", type: "PlainText", isRequired: false }
```

---

### Task 6: Add fields to Awards

- [ ] **Step 1: Badge Text**

```
collection_id: AWARDS_ID
data: { displayName: "Badge Text", type: "PlainText", isRequired: false }
```

- [ ] **Step 2: Title**

```
data: { displayName: "Title", type: "PlainText", isRequired: true }
```

---

### Task 7: Add fields to Hero Media

- [ ] **Step 1: Sort Order**

```
collection_id: HERO_MEDIA_ID
data: { displayName: "Sort Order", type: "Number", isRequired: true }
```

- [ ] **Step 2: Media Type (option field)**

Use `data_cms_tool > create_collection_option_field`:
```
collection_id: HERO_MEDIA_ID
data: {
  displayName: "Media Type",
  isRequired: true,
  choices: [
    { name: "Image" },
    { name: "Video" }
  ]
}
```

- [ ] **Step 3: Image**

```
data: { displayName: "Image", type: "ImageRef", isRequired: false }
```

- [ ] **Step 4: Video URL**

```
data: { displayName: "Video URL", type: "PlainText", isRequired: false }
```

- [ ] **Step 5: Video Thumbnail**

```
data: { displayName: "Video Thumbnail", type: "ImageRef", isRequired: false }
```

---

### Task 8: Add fields to Insights

- [ ] **Step 1: Sort Order**

```
collection_id: INSIGHTS_ID
data: { displayName: "Sort Order", type: "Number", isRequired: true }
```

- [ ] **Step 2: Tag**

```
data: { displayName: "Tag", type: "PlainText", isRequired: false }
```

- [ ] **Step 3: Heading**

```
data: { displayName: "Heading", type: "PlainText", isRequired: true }
```

- [ ] **Step 4: Text**

```
data: { displayName: "Text", type: "PlainText", isRequired: false }
```

- [ ] **Step 5: Icon**

```
data: { displayName: "Icon", type: "ImageRef", isRequired: false }
```

- [ ] **Step 6: Icon Background Color (option)**

```
data: {
  displayName: "Icon Background Color",
  choices: [
    { name: "Pink" },
    { name: "Lime" },
    { name: "Lilac" }
  ]
}
```

---

### Task 9: Add fields to Key Numbers

- [ ] **Step 1: Number**

```
collection_id: KEY_NUMBERS_ID
data: { displayName: "Number", type: "PlainText", isRequired: true }
```

- [ ] **Step 2: Label**

```
data: { displayName: "Label", type: "PlainText", isRequired: false }
```

- [ ] **Step 3: Sort Order**

```
data: { displayName: "Sort Order", type: "Number", isRequired: true }
```

---

### Task 10: Add fields to Result Cards

- [ ] **Step 1: Heading**

```
collection_id: RESULT_CARDS_ID
data: { displayName: "Heading", type: "PlainText", isRequired: true }
```

- [ ] **Step 2: Text**

```
data: { displayName: "Text", type: "PlainText", isRequired: false }
```

- [ ] **Step 3: Sort Order**

```
data: { displayName: "Sort Order", type: "Number", isRequired: true }
```

---

### Task 11: Add fields to Process Steps

- [ ] **Step 1: Sort Order**

```
collection_id: PROCESS_STEPS_ID
data: { displayName: "Sort Order", type: "Number", isRequired: true }
```

Note: Sort Order is 0-based. Display number = Sort Order + 1 (handled in the template).

- [ ] **Step 2: Heading**

```
data: { displayName: "Heading", type: "PlainText", isRequired: true }
```

- [ ] **Step 3: Text**

```
data: { displayName: "Text", type: "PlainText", isRequired: false }
```

---

### Task 12: Add fields to Case Awards

- [ ] **Step 1: Nomination Text**

```
collection_id: CASE_AWARDS_ID
data: { displayName: "Nomination Text", type: "PlainText", isRequired: false }
```

- [ ] **Step 2: Sort Order**

```
data: { displayName: "Sort Order", type: "Number", isRequired: true }
```

---

### Task 13: Add Case reference fields to nested collections

Each nested collection needs a reference back to Case. Use `data_cms_tool > create_collection_reference_field` for each.

- [ ] **Step 1: Hero Media → Case**

```
collection_id: HERO_MEDIA_ID
data: { displayName: "Case", collectionId: CASE_ID, isRequired: true }
```

- [ ] **Step 2: Insights → Case**

```
collection_id: INSIGHTS_ID
data: { displayName: "Case", collectionId: CASE_ID, isRequired: true }
```

- [ ] **Step 3: Key Numbers → Case**

```
collection_id: KEY_NUMBERS_ID
data: { displayName: "Case", collectionId: CASE_ID, isRequired: true }
```

- [ ] **Step 4: Result Cards → Case**

```
collection_id: RESULT_CARDS_ID
data: { displayName: "Case", collectionId: CASE_ID, isRequired: true }
```

- [ ] **Step 5: Process Steps → Case**

```
collection_id: PROCESS_STEPS_ID
data: { displayName: "Case", collectionId: CASE_ID, isRequired: true }
```

---

### Task 14: Add reference fields to Case Awards

- [ ] **Step 1: Case Awards → Awards**

```
collection_id: CASE_AWARDS_ID
data: { displayName: "Award", collectionId: AWARDS_ID, isRequired: true }
```

- [ ] **Step 2: Case Awards → Case**

```
collection_id: CASE_AWARDS_ID
data: { displayName: "Case", collectionId: CASE_ID, isRequired: true }
```

---

### Task 15: Add static fields to Case

Add all non-reference fields to the Case collection.

- [ ] **Step 1: Hero Heading**

```
collection_id: CASE_ID
data: { displayName: "Hero Heading", type: "PlainText", isRequired: false }
```

- [ ] **Step 2: Preamble**

```
data: { displayName: "Preamble", type: "PlainText", isRequired: false }
```

- [ ] **Step 3: Sticker Text**

```
data: { displayName: "Sticker Text", type: "PlainText", isRequired: false }
```

- [ ] **Step 4: Sticker Color (option)**

```
data: {
  displayName: "Sticker Color",
  choices: [
    { name: "Lime" },
    { name: "Lilac" },
    { name: "Pink" },
    { name: "Sand" }
  ]
}
```

- [ ] **Step 5: Meta fields (8 fields — repeat for Meta 1–4)**

For each number N in 1, 2, 3, 4:
```
data: { displayName: "Meta N Label", type: "PlainText", isRequired: false }
data: { displayName: "Meta N Value", type: "PlainText", isRequired: false }
```

- [ ] **Step 6: Challenge section**

```
data: { displayName: "Challenge Pre-heading",  type: "PlainText",  isRequired: false }
data: { displayName: "Challenge Heading",       type: "PlainText",  isRequired: false }
data: { displayName: "Challenge Body",          type: "RichText",   isRequired: false }
```

- [ ] **Step 7: Strategic Insight section**

```
data: { displayName: "Strategic Insight Pre-heading", type: "PlainText", isRequired: false }
data: { displayName: "Strategic Insight Quote",        type: "PlainText", isRequired: false }
data: { displayName: "Strategic Insight From",         type: "PlainText", isRequired: false }
data: { displayName: "Strategic Insight To",           type: "PlainText", isRequired: false }
```

- [ ] **Step 8: Creative Solution section**

```
data: { displayName: "Creative Solution Pre-heading", type: "PlainText", isRequired: false }
data: { displayName: "Creative Solution Heading",      type: "PlainText", isRequired: false }
data: { displayName: "Creative Solution Body",         type: "RichText",  isRequired: false }
```

- [ ] **Step 9: Gallery**

```
data: { displayName: "Gallery", type: "MultiImage", isRequired: false }
```

- [ ] **Step 10: Effect section**

```
data: { displayName: "Effect Pre-heading", type: "PlainText", isRequired: false }
data: { displayName: "Effect Heading",     type: "PlainText", isRequired: false }
data: { displayName: "Effect Body",        type: "PlainText", isRequired: false }
```

- [ ] **Step 11: Expert section**

```
data: { displayName: "Expert Pre-heading", type: "PlainText", isRequired: false }
data: { displayName: "Expert Heading",     type: "PlainText", isRequired: false }
data: { displayName: "Expert Body",        type: "RichText",  isRequired: false }
data: { displayName: "Lead Role",          type: "PlainText", isRequired: false }
```

---

### Task 16: Add reference fields to Case

- [ ] **Step 1: Tags (multi-reference)**

Use `data_cms_tool > create_collection_reference_field`:
```
collection_id: CASE_ID
data: {
  displayName: "Tags",
  collectionId: TAGS_ID,
  allowMultiple: true,
  isRequired: false
}
```

- [ ] **Step 2: Category (single reference)**

```
data: { displayName: "Category", collectionId: CATEGORY_ID, isRequired: false }
```

- [ ] **Step 3: Lead / Coworker (single reference)**

```
data: { displayName: "Lead", collectionId: COWORKERS_ID, isRequired: false }
```

- [ ] **Step 4: Related Cases (multi-reference to Case itself)**

```
data: {
  displayName: "Related Cases",
  collectionId: CASE_ID,
  allowMultiple: true,
  isRequired: false
}
```

---

### Task 17: Set required DOM IDs in Webflow Designer

The case page script (`case.ts`) checks for `document.getElementById('results')` to decide whether to show the "See results" button. This ID must be set on the Effect section element in the Webflow Designer.

- [ ] **Step 1: Open the case Collection Page in Webflow Designer**

Navigate to Pages → Case (Collection Page template).

- [ ] **Step 2: Set ID on the Effect section**

Select the Effect/Results section element → in the Settings panel → ID field → enter `results` (no `#`).

- [ ] **Step 3: Verify**

In Preview mode, the "See results" button in the hero should be visible when the Effect section exists on the page.

---

### Task 18: Verify complete CMS structure

- [ ] **Step 1: Check all collections**

Use `data_cms_tool > get_collection_list` with `SITE_ID`. Expected: 11 collections.

- [ ] **Step 2: Spot-check Case fields**

Use `data_cms_tool > get_collection_details` with `CASE_ID`. Verify the following fields exist:
- Hero Heading, Preamble, Sticker Text, Sticker Color
- Meta 1–4 Label/Value (8 fields)
- Challenge Pre-heading/Heading/Body
- Strategic Insight Pre-heading/Quote/From/To
- Creative Solution Pre-heading/Heading/Body
- Gallery (MultiImage)
- Effect Pre-heading/Heading/Body
- Expert Pre-heading/Heading/Body, Lead Role
- Tags (multi-ref), Category (ref), Lead (ref), Related Cases (multi-ref)

Expected: ~32 fields on the Case collection plus the auto-generated Name/Slug/Created On fields.

- [ ] **Step 3: Spot-check a nested collection**

Use `data_cms_tool > get_collection_details` with `INSIGHTS_ID`. Verify: Sort Order, Tag, Heading, Text, Icon, Icon Background Color, Case (reference).

- [ ] **Step 4: Commit**

```bash
git commit --allow-empty -m "chore: Webflow CMS structure complete — 11 collections, DOM IDs set"
```
