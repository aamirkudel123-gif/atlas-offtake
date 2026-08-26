# Atlas Offtake

Marketing site for Atlas Offtake — strategic procurement and structured offtake
for critical industrial commodities.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
No animation or UI libraries: the motion and the network visualisation are hand
built so the runtime stays small.

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## Design system

Everything lives in `src/app/globals.css` as Tailwind v4 theme tokens.

### Colour

The palette is built around the two logo colours, sampled from the supplied
logo file rather than eyeballed:

| Token | Value | Use |
| --- | --- | --- |
| `navy` | `#0f2a62` | Logo navy. Used as a ground once, on the governance band. |
| `copper` | `#d5771c` | Logo copper. Accent on dark grounds only. |
| `copper-deep` | `#a85a10` | Same hue, darkened to clear 4.5:1 on the light grounds. |
| `ink` / `charcoal` / `graphite` | near-black → graphite | Primary dark grounds |
| `paper` / `paper-sunk` | warm off-white | Light grounds |
| `stone` / `mist` / `chalk` | greys | Text on dark |

The brand colours are accents, not backgrounds. Navy appears as a full ground
exactly once per page flow (the compliance band) so it reads as deliberate.

### Type

- **Instrument Serif** — display only, headings.
- **Inter** — interface and body.
- **IBM Plex Mono** — eyebrows, indices, data labels, map labels.

Sizes are `clamp()` utilities (`type-display`, `type-h1` … `type-eyebrow`) so
there are no per-breakpoint font-size overrides anywhere in the components.

> **Note:** the font variables are set on `<html>`, not `<body>`. The theme
> tokens that reference them (`--font-display` etc.) are defined on `:root`, and
> a custom property whose `var()` target is not defined on the same element
> computes to the guaranteed-invalid value. Moving them to `<body>` silently
> breaks every font on the site.

> **Note:** the display line-heights are deliberately tighter than the font's
> em box. Instrument Serif measures ascent 0.993em + descent 0.309em = 1.302em,
> so at `line-height: 0.96` the half-leading is negative and glyphs render
> *outside* their own line box — by up to 0.093em for descenders. That is fine
> until something clips to the box. The per-word reveal mask in
> `.word-reveal > span` therefore uses `overflow: clip` with
> `overflow-clip-margin: 0.2em` rather than plain `overflow: hidden`; the clip
> margin widens the clip region without affecting layout, so `g`, `j`, `p`, `q`
> and `y` keep their tails. If that mask is ever changed back to
> `overflow: hidden`, every descender in every animated heading gets sheared
> off. The resting transform (`calc(105% + 0.14em)`) is sized to clear the
> widened clip region — reducing it makes words peek out below the line.

### Grid

One container, one set of anchors, site-wide:

- `container-atlas` — `max-width: 1440px`, fluid gutter that resolves to exactly
  80px at ≥1440px, giving a 1280px content column.
- `grid-atlas` — 12 columns sharing the container's anchors.
- `section-y` — the standard vertical rhythm.

Section openers use `SectionHeader`, which hangs the eyebrow in columns 1–3 and
starts the heading at column 4. Using it everywhere is what keeps headings,
copy and imagery aligned across pages.

## The inquiry form

`POST /api/inquiry` validates the submission and forwards it as JSON to
whatever endpoint is configured:

```bash
INQUIRY_WEBHOOK_URL=https://your-provider.example/hook
```

Any endpoint that accepts a JSON body works — a transactional email provider, a
CRM intake, a Slack or Teams incoming webhook, or a form service.

If the variable is **not** set the route returns `503` and the form shows the
direct inbox address instead. This is deliberate: an inquiry is never silently
accepted and dropped.

The route also validates server-side (required fields, email shape, length
caps) and drops honeypot submissions.

## The supply network map

`src/lib/world-path.ts` is generated, not hand-written:

```bash
node scripts/gen-world.mjs
```

It converts Natural Earth 110m land geometry (public domain, via the
`world-atlas` package) into a single simplified equirectangular SVG path.
`world-atlas` and `topojson-client` are **devDependencies only** — the runtime
ships the path string and nothing else.

Corridor animation is pure CSS (`stroke-dashoffset` over a normalised
`pathLength`), so there is no animation library and no JS running per frame.

The map represents commercial sourcing relationships. It deliberately does not
imply Atlas owns any of the infrastructure shown — see `NETWORK_DISCLAIMER` in
`src/lib/content.ts`, which is rendered next to the map and in the footer.

## Content

All copy lives in `src/lib/content.ts`. It is carried over from the previous
site and re-edited for hierarchy and tone. No statistics, offices, clients,
transactions, certifications, owned assets or ESG claims have been introduced.

Framework references (OECD, LME, EITI, UN Global Compact, ISO 37001) are worded
as "informed by" and carry an explicit disclaimer that they do not indicate
certification, membership or affiliation.

## Accessibility

Verified, not assumed:

- Every text node passes WCAG AA contrast on all eight pages.
- One `<h1>` per page, no heading-level jumps.
- Skip link is the first tab stop; mobile menu traps focus and closes on Escape.
- All motion is removed under `prefers-reduced-motion`.
- Scroll reveals are restored via `<noscript>` so the page is not blank without JS.
- No horizontal overflow at 1920, 1440, 1280, 1024, 768, 430 or 390px.

## Images

Photography is from Unsplash (Unsplash License — free for commercial use, no
attribution required). Source IDs are recorded in `IMAGE-CREDITS.md` so any
image can be re-sourced at a different size or swapped for client-owned
photography.

Full-bleed images are stored at 3200–3400px so they stay sharp on a 2× desktop
display. `next/image` serves AVIF/WebP at the size each slot actually needs —
`sizes` is declared in px rather than `vw` wherever the container is capped, as
a `vw` fraction there makes the browser pick a candidate that is too small.

## Outstanding — needs client input

1. **Privacy, Legal and AML Policy pages.** The previous site links to
   `/privacy`, `/legal` and `/aml-policy`; all three return 404. Rather than
   invent legal or AML copy, those links are omitted from the footer. Add the
   documents and re-populate `LEGAL_NAV` in `src/lib/content.ts`.
2. **Inquiry delivery.** Set `INQUIRY_WEBHOOK_URL` before launch.
3. **Reversed logo lockup.** The sticky header and mobile menu sit on dark
   grounds, where the navy wordmark would be illegible, so they use a reversed
   lockup (`public/atlas-logo-reversed.png`): identical letterforms, "ATLAS"
   in off-white, "OFFTAKE" in the unchanged brand copper. The original
   full-colour logo is used at size in the footer. If the client prefers a
   different reversed treatment, replace that one file.
4. **Photography.** The imagery is licensed stock chosen to match the business.
   Client-owned photography of actual cargoes, terminals or material would be
   stronger; the slots and aspect ratios are ready for it.
