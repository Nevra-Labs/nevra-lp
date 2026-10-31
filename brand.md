# Nevra

## Direction

A company building consumer credit for people paid in stablecoins.
Calm, clear, and human. Natural is a reference for restraint and
product storytelling, not a template to reproduce or a reason to claim AI features.

The homepage lives in `src/pages/Home.jsx`, with its styles and the shared navigation
in `src/landing.css`. `src/index.css` retains the legacy components used by the blog,
application, and roadmap. The new landing uses the `lp-` prefix; shared navigation
uses `site-`. There is no viewport frame or JavaScript scroll interception.

## Color and type

- White canvas, near-black text, muted olive-grey secondary text.
- Pale mineral backgrounds for product illustrations. Sage is a quiet accent,
  not a primary action color.
- Inter for the landing and navigation, with regular Inter Tight for the single-word
  hero. Close tracking and generous whitespace. No heavy lending-style headings.
- Plain section labels. Mono numbers only where they explain the product steps.
- Primary actions are compact near-black pills. Text links use a small arrow.
- Hairlines separate steps, FAQ entries, and footer content. No boxed page frame.

## Story

1. Credit. A single-word headline, “For people paid in stablecoins.”, and one
   “Get early access” action. Left aligned on white, with no supporting illustration.
2. An interactive, explicitly illustrative walkthrough: connect, understand, access.
3. Why onchain income deserves context beyond a traditional credit file.
4. A quiet invitation to wallets and neobanks, still serving consumer borrowers.
5. Honest answers about eligibility, verification, rates, and wallet access.

No hero orbit, decorative gradients, status badges, serial numbers, footnotes,
secondary action, stock skyline, autoplay video, partner carousel, or borrowed
brand assets. Do not replace removed decoration with generic AI imagery.

## Voice and claims

Short, plain English. No hype, no em dashes, no invented funding, partners, users,
AI capabilities, rates, or approval guarantees. State that credit is subject to
verification and approval. Preview graphics never perform a real wallet connection
or assessment and must say so. Offer terms belong in the individual application,
not in an illustrative landing-page calculator.

## Behavior

Native scrolling, visible keyboard focus, reduced-motion support, keyboard-operated
product tabs, native FAQ disclosure, and mobile navigation with Escape dismissal.
Preserve the blog, roadmap, legal PDFs, whitepaper, and production application auth.
When Privy is not configured, the preview must disclose that applications are disabled
and offer contact rather than simulate approval or leave a dead sign-in button.
