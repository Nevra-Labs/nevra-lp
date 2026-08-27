# Brand — Nevra

_Status: active. Live reference at `/design` (`src/pages/DesignSystem.jsx`). Tokens live in
`:root` in `src/index.css`; the reference page mirrors them, so edit both together._

Minimal system distilled from avon.xyz, altitude.xyz, apxlending.com and archlending.com,
with type weights from traderepublic.com. White canvas, near-black ink, **no structural
rails or frames**, **no mono eyebrow labels**, one tight grotesque set heavy at large
sizes, 12–16px radii, near-black button fills.

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

Weights and tracking follow traderepublic.com: a heavy display, tight leading,
and tracking at roughly zero. The weight carries the headline, not the tracking.

- **One family: Inter Tight.** No serif, no italic display, no second typeface.
- Display: 700, up to 80px, 0.98 leading, -0.005em. Section headings: 700, up
  to 52px.
- Interface text (buttons, nav, card titles) sits at **600**, not 400/500.
- Second headline line is `--ink-45`, not a different font.
- **No mono eyebrow labels on the landing page.** `/ THE PROBLEM`-style
  kickers above headings are gone: the headline names the section. `.eyebrow`
  survives only where the label is real metadata (Blog category, `[ 404 ]`).

## Layout

- **No frames.** No side rails, no full-width section rules, no shared cell dividers.
- `--gap-section` (112px) is the space **between** two sections. `.section` pays half of
  it at each edge, so adjacent sections add up to 112px rather than doubling to 224px.
- Content sits in `.shell` (1120px, centered).
- Navbar is a solid white 64px bar with no bottom border. Like APX, it sits above the
  dark hero rather than floating over it.

## Depth

APX buys its consumer warmth with saturated blue gradient panels. Nevra stays
monochrome and buys it with recessed grey and one degree of lift instead:

| Token | Value | Use |
|---|---|---|
| `--panel` | `#F6F6F7` | Recessed fields: the calculator panel, full-bleed tint bands |
| `--lift` | shallow | Every `.card`, `.bento-card`, `.stack-card` |
| `--lift-lg` | deeper | The one card that floats on a panel (calculator's Loan Overview) |

- `.section-band` is a full-bleed `--panel` tint. APX alternates white and near-white
  down the page so a long run of sections doesn't read as one flat sheet. Put it on a
  bare `<section>` with `.shell` inside; the landing page uses it once, on How it works.
- Only one thing lifts per panel. Cards on white take `--lift`; a card sitting **on** a
  panel takes `--lift-lg` so the separation reads.

## Hero

Proportions measured off apxlending.com at 1440x900 and matched exactly:

| | Value |
|---|---|
| Dark block | one viewport tall (`100svh`) |
| Announcement strip | 55px, below the 64px navbar |
| badge → headline | 12px |
| headline → sub-copy | 16px |
| sub-copy → CTAs | 48px |
| CTA height / radius | 48px / 12px |
| Partner marquee | pinned to the bottom edge |

Badge is a soft rectangle (`--r-sm`), not a pill. Primary CTA is a white fill; secondary
is glass — `rgba(255,255,255,.10)` on a `rgba(255,255,255,.45)` border.

Three things are deliberately ours rather than theirs, so the page reads consumer and
ships no third-party assets:

- **No photograph.** APX darkens a city at dusk. The backdrop here is `HeroBackdrop` —
  an oversized echo of the score arc over a warm dark (`#17181C`), with a dot field and a
  hand-built vignette standing in for the depth a photo would give.
- **The visual is the product.** The score gauge gets its own section below the hero
  rather than competing with the headline.
- **Plain-English copy.** APX leads on regulator language; this leads on what the
  borrower gets.

Graphics that appear on dark get `.viz-dark`, which remaps `--ink`, `--surface` and
`--hairline` on the wrapper instead of branching every fill. Anything drawn on `--ink`
must take its contrasting colour from `--surface`, never a hardcoded `#FFFFFF`.

## Calculator

Structure mirrors APX's: centred question, then the interactive quote. The question
carries two inline pills (settlement token, SCORE) and is capped at 40px — the largest
size that keeps it on one line inside the shell. Balancing it across two lines orphans
"unlock?" and opens gaps around the pills, so it does not wrap by design at desktop.
Pills are `vertical-align: middle` so the selectable one and the static one share an
optical centre. The body sits on a `--panel` field with the Loan Overview card lifted
off it.

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
