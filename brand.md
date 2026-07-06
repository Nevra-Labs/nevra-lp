# Brand — Nevra

_Status: active_

Stripe-inspired system set July 2026. References: stripe.com (white canvas, deep-navy ink, thin display type with negative tracking, indigo reserved for CTAs, pill buttons), tryportola.com (flat navbar aligned to the structural frame, hairline grids, two-tone headlines).

## Palette (CSS variables in `src/index.css`)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Site background (white canvas) |
| `--paper-soft` | `#F6F9FC` | Cool off-white feature bands |
| `--surface` | `#FFFFFF` | Cards, elevated panels |
| `--ink` | `#0D253D` | Text — deep navy, never pure black |
| `--ink-60/-45/-30` | ink at 62/46/32% | Body copy, captions, faint headings |
| `--accent` | `#533AFD` | Indigo — CTAs only, one filled pill per band |
| `--dark` | `#0D253D` | Full-bleed dark sections (problem, CTA) |
| `--hairline` | `#E3E8EE` | Borders, dividers |
| `--hairline-soft` | `#EAEFF5` | Structural frame rails |

## Typography

- **Sans (everything):** Inter — `font-feature-settings: 'ss01'` globally, body weight 300
- **Display:** weight 300 with negative tracking (~-0.026em at hero size); bumping display above 300 kills the editorial air
- **Mono (labels, data):** IBM Plex Mono — eyebrows `/ SECTION` or `[ LABEL ]`, uppercase, 0.14em tracking (`.eyebrow` class)
- Headlines are two-tone (strong line + muted line), no serif, no italic display

## Buttons

Stripe pills: `border-radius: 9999px`, tight padding (12px 22px), label weight 400. The filled indigo pill is the primary CTA; secondary is a hairline outline pill. Never rounded-rectangles.

## Motifs

- Flat Portola-style navbar: full-width hairline bottom border, content constrained to the same 1160px frame as sections, logo mark only (no wordmark), "↳ Apply" text CTA
- Structural frame: content-width side rails, full-width section rules, cells sharing hairline dividers
- Lucide icons (1.6px stroke, ink color) in white rounded tiles
- Dashboard mock cards with mono data, marked "ILLUSTRATIVE"
- Giant faint footer wordmark

## Voice

Plain-English, confident, no hype. "Post less than you borrow." Credit is boring on purpose — clear rules, honest data. Never "revolutionary," never exclamation marks.
