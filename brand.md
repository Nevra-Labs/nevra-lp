# Brand — Nevra

_Status: active_

Professional fintech direction set July 2026. References: 3jane.xyz (technical credibility: mono labels, bracketed micro-copy, dashboard mocks), tryportola.com (institutional restraint: two-tone headlines, hairline grids, thin-line diagrams), cofounder.co (artistic direction: light warm paper, generous air).

## Palette (CSS variables in `src/index.css`)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F6F5F1` | Site background (warm bone) |
| `--surface` | `#FFFFFF` | Cards, elevated panels |
| `--ink` | `#16151D` | Text, primary buttons |
| `--ink-60/-45/-30` | ink at 60/45/30% | Body copy, captions, faint headings |
| `--accent` | `#4433EE` | Electric indigo: eyebrows, serif accents, data highlights |
| `--accent-light` | `#A9A1FF` | Accent on dark backgrounds |
| `--dark` | `#131120` | Full-bleed dark sections (problem, CTA) |
| `--hairline/-soft` | ink at 12/8% | Borders, dividers — hairlines, never heavy |

## Typography

- **Sans (UI, headings):** Onest — headings weight 500, letter-spacing -0.025em, two-tone (second line `--ink-30`)
- **Mono (labels, data):** IBM Plex Mono — eyebrows `/ SECTION` or `[ LABEL ]`, uppercase, 0.14em tracking (`.eyebrow` class)
- **Serif accent:** Instrument Serif italic (`.serif-accent`) — one emphasized word per headline, in accent color, sparingly

## Motifs

- Two-tone headlines: strong first line, `--ink-30` second line
- Mono eyebrows in accent color above every section heading
- Thin-line SVG diagrams (1.2px strokes, dashed accents) instead of raster art
- Hairline-bordered grids with shared internal borders (Portola-style)
- Dashboard mock cards with mono data, marked "ILLUSTRATIVE"
- Giant faint footer wordmark

## Voice

Plain-English, confident, no hype. "Post less than you borrow." Credit is boring on purpose — clear rules, honest data. Never "revolutionary," never exclamation marks.
