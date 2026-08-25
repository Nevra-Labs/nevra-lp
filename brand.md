# Brand — Nevra

_Status: active. Live reference at `/design` (`src/pages/DesignSystem.jsx`). Tokens live in
`:root` in `src/index.css`; the reference page mirrors them, so edit both together._

Minimal system distilled from avon.xyz, altitude.xyz, apxlending.com and archlending.com.
The shared rules across all four: white canvas, near-black ink, **no structural rails or
frames**, one tight grotesque at large sizes with negative tracking, mono uppercase
micro-labels, 12–16px radii, near-black button fills.

## Palette (CSS variables in `src/index.css`)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Site background |
| `--paper-soft` | `#FAFAFA` | Chart tracks, pill backgrounds |
| `--surface` | `#FFFFFF` | Cards |
| `--ink` | `#0E0F12` | Text and primary buttons — near-black, never pure black |
| `--ink-60/-45/-30` | ink at 60/45/28% | Body copy, mono labels, disclaimers |
| `--hairline` | `#EAEAEA` | Card borders and FAQ rules **only** |
| `--link` | `#0051FF` | Focus rings and inline links, nothing else |
| `--dark` | `#0E0F12` | The inset CTA block |

## Typography

- **One family: Inter Tight.** No serif, no italic display, no second typeface.
- Display 72px / 500 / -0.038em; section headings 46px / 500 / -0.032em.
- Second headline line is `--ink-45`, not a different font.
- **Mono (labels):** IBM Plex Mono, uppercase, 11px, 0.13em tracking (`.eyebrow`).

## Layout

- **No frames.** No side rails, no full-width section rules, no shared cell dividers.
  Sections are separated by `--gap-section` (112px) of white space.
- Content sits in `.shell` (1120px, centered).
- Navbar is transparent over the hero and fades in a blurred white backing on scroll.
  It has no bottom border.

## Buttons

Radius 12px, padding 14px 22px, weight 500. `.btn-primary` is a near-black fill;
`.btn-outline` is a hairline outline. Never pills.

## Motion

Inline animated SVGs in `src/components/motion.jsx`, styled by `src/motion.css`:
stroke-drawing (`stroke-dasharray`/`dashoffset`), SMIL `animateMotion` for dots riding a
path, staggered `--delay` per element. Everything is gated on a `.play` class added when
the graphic scrolls into view, and every animation has a `prefers-reduced-motion` fallback
that shows the finished state.

## Voice

Plain-English, confident, no hype. "Post less than you borrow." Credit is boring on
purpose — clear rules, honest data. Never "revolutionary," never exclamation marks.
