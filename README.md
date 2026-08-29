# Portfolio

A case-study-led portfolio site built with [Astro](https://astro.build). Static, fast, and content-driven from JSON — no CMS.

Live: https://endsinentropy.github.io/portfolio/

## Stack

- **Astro** (static output) — pages in `src/pages/`
- **Content collections** — case studies live as JSON in `src/content/case-studies/`, validated against a schema in `src/content/config.ts`
- Plain CSS design system in `src/styles/global.css` — no framework
- Fonts: Space Grotesk (display/UI), Fraunces (body/editorial text), IBM Plex Mono (labels, figure numbers, technical annotations), loaded from Google Fonts

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Editing content

### Site-wide text

- `src/data/site.json` — your name, title, hero statement, email, social links, nav
- `src/data/profile.json` — profile page bio, focus areas, experience timeline, portrait

### Adding a case study

Every case study is one JSON file in `src/content/case-studies/`. Copy an existing one (e.g. `northwind-checkout.json`) as a starting point, rename the file (the filename becomes the URL slug — `my-project.json` → `/work/my-project/`), and fill in the fields.

Top-level fields:

| Field | Purpose |
|---|---|
| `title`, `subtitle` | Headline and one-line strapline |
| `client`, `role`, `year`, `timeline`, `team` | The spec-sheet row at the top of the page |
| `tags` | Short labels shown on cards and the case study header |
| `summary` | 1–2 sentences used on index cards |
| `coverImage` | `{ "src": "/images/case-studies/slug/cover.jpg", "alt": "..." }` — omit `src` to get an on-brand technical placeholder graphic instead of a broken image |
| `metrics` | Headline impact numbers shown near the top (`{ "value": "+34%", "label": "..." }`) |
| `featured` | `true` to show it in the homepage "Selected work" list |
| `sample` | `true` shows a "Sample content" tag — set to `false` (or remove) once you replace placeholder text |
| `order` | Sort order across the site (lower = earlier) |
| `sections` | The body of the case study — see below |

### Section blocks

`sections` is an array of typed blocks, rendered in order. Mix and match freely:

- `text` — `{ "type": "text", "eyebrow": "Context", "heading": "...", "body": ["paragraph one", "paragraph two"] }`
- `image` — `{ "type": "image", "figure": "01", "full": false, "image": { "src": "...", "alt": "...", "caption": "..." } }` — omit `src` for a placeholder; set `full: true` for an edge-to-edge image
- `gallery` — multiple images in a row: `{ "type": "gallery", "figure": "02", "heading": "Exploration", "images": [{ "alt": "..." }, ...] }`
- `quote` — `{ "type": "quote", "text": "...", "attribution": "..." }`
- `stats` — a highlighted metrics row: `{ "type": "stats", "heading": "...", "items": [{ "value": "94%", "label": "..." }] }`
- `sidebyside` — a before/after or compare block: `{ "type": "sidebyside", "left": { "heading": "Before", "body": [...] }, "right": { "heading": "After", "body": [...] } }`

If a JSON file doesn't match the schema, `npm run build` (or `npm run dev`) will fail with a validation error pointing at the exact field — this is intentional, it catches typos before they ship.

### Adding real images

Drop image files into `public/images/case-studies/<slug>/` and reference them from JSON as `/images/case-studies/<slug>/filename.jpg` (the `/portfolio/` base path is added automatically). Until you add a `src`, every image slot renders a technical-drawing-style placeholder (hatched fill, corner registration marks, figure number) that's designed to look intentional, not broken.

## Deployment

Pushing to `main` (or the working branch configured in `.github/workflows/deploy.yml`) builds the site and publishes it to GitHub Pages automatically via GitHub Actions. No manual deploy step needed.

If Pages isn't live yet, enable it once in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
