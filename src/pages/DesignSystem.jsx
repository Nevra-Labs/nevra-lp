import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import '../design-system.css'

const SECTIONS = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'color', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'radius', label: 'Radius & spacing' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'surfaces', label: 'Surfaces' },
  { id: 'forms', label: 'Forms' },
  { id: 'voice', label: 'Voice' },
]

const INK = [
  { name: 'Ink', token: '--ink', hex: '#0E0F12', use: 'Headings, primary buttons, active states' },
  { name: 'Ink hover', token: '--ds-ink-2', hex: '#2A2C31', use: 'Primary button hover' },
  { name: 'Ink 60', token: '--ink-60', hex: 'rgba(14,15,18,.60)', use: 'Paragraphs and descriptions' },
  { name: 'Ink 45', token: '--ink-45', hex: 'rgba(14,15,18,.45)', use: 'Mono labels, second headline line' },
  { name: 'Ink 30', token: '--ink-30', hex: 'rgba(14,15,18,.28)', use: 'Placeholders, units, disclaimers' },
]

const SURFACE = [
  { name: 'Paper', token: '--paper', hex: '#FFFFFF', use: 'Page and card background' },
  { name: 'Paper soft', token: '--paper-soft', hex: '#FAFAFA', use: 'Chart tracks, pill backgrounds' },
  { name: 'Sunk', token: '--ds-sunk', hex: '#F5F5F5', use: 'Neutral badges' },
  { name: 'Hairline', token: '--hairline', hex: '#EAEAEA', use: 'Card borders and FAQ rules only' },
  { name: 'Hairline soft', token: '--hairline-soft', hex: '#F1F1F1', use: 'The lightest card border' },
  { name: 'Dark', token: '--dark', hex: '#0E0F12', use: 'The inset CTA block' },
]

const ACCENT = [
  { name: 'Link', token: '--link', hex: '#0051FF', use: 'Keyboard focus rings and inline links. Nothing else.' },
  { name: 'Link tint', token: '--ds-blue-tint', hex: '#E5EEFF', use: 'Informational badges' },
  { name: 'Positive', token: '--pill-dot', hex: '#16A34A', use: 'The status dot in the hero pill' },
]

const TYPE = [
  { cls: 'ds-h1', sample: 'Consumer credit for crypto-native people', spec: 'Display / 72px\n500 · 1.02 · -0.038em' },
  { cls: 'ds-h2', sample: 'From wallet to credit line', spec: 'Section / 46px\n500 · 1.06 · -0.032em' },
  { cls: 'ds-h3', sample: 'Post less than you borrow', spec: 'H3 / 32px\n500 · 1.2' },
  { cls: 'ds-h4', sample: 'Built for borrowers', spec: 'H4 / 24px\n500 · 1.3' },
  { cls: 'ds-h5', sample: 'Apply in minutes', spec: 'H5 / 18px\n500 · 1.3' },
  { cls: 'ds-body-lg', sample: 'Your score blends onchain history with offchain signals from your linked bank account.', spec: 'Body large / 16px\n400 · 1.5' },
  { cls: 'ds-body-sm', sample: 'Bank access is read-only and handled through Plaid. We never see your credentials.', spec: 'Body small / 14px\n400 · 1.5' },
  { cls: 'ds-caption', sample: 'FINTRAC registered · Illustrative figures', spec: 'Caption / 12px\n500 · 1.35' },
]

const RADII = [
  { label: '8px', token: '--r-sm', value: '8px', use: 'Focus rings, inline chips' },
  { label: '12px', token: '--r', value: '12px', use: 'Buttons and inputs' },
  { label: '16px', token: '--r-lg', value: '16px', use: 'Cards' },
  { label: '24px', token: '--r-xl', value: '24px', use: 'The inset CTA block' },
  { label: '999px', token: '--r-pill', value: '999px', use: 'Badges only' },
]

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 88]

const VOICE = [
  ['Post less than you borrow.', 'Unlock the revolutionary power of your assets!'],
  ['Your rate adjusts before anything drastic happens.', 'Liquidation-proof, guaranteed.'],
  ['Bank access is read-only.', 'Bank-grade military-level security.'],
  ['Credit is boring on purpose.', 'A paradigm shift in decentralized finance.'],
]

function SwatchGrid({ items }) {
  return (
    <div className="ds-swatches">
      {items.map(s => (
        <div key={s.token} className="ds-swatch">
          <div
            className="ds-swatch-chip"
            style={{ background: s.hex }}
          />
          <div className="ds-swatch-meta">
            <strong>{s.name}</strong>
            <code>{s.hex}</code>
            <span className="ds-swatch-use">{s.use}</span>
            <code className="ds-token-code" style={{ display: 'block', marginTop: 6 }}>{s.token}</code>
          </div>
        </div>
      ))}
    </div>
  )
}

function Section({ id, title, blurb, children }) {
  return (
    <section id={id} className="ds-section">
      <div className="ds-section-head">
        <h2 className="ds-h3">{title}</h2>
        {blurb && <p>{blurb}</p>}
      </div>
      {children}
    </section>
  )
}

export default function DesignSystem() {
  useEffect(() => {
    document.title = 'Nevra | Design system'
  }, [])

  return (
    <div className="ds">
      <header className="ds-masthead">
        <div className="ds-masthead-inner">
          <p className="ds-kicker">Nevra / Design system</p>
          <h1 className="ds-h1">One system for everything Nevra.</h1>
          <p className="ds-lede">
            Inter Tight on white, near-black ink, no frames and no second typeface. Distilled from
            avon.xyz, altitude.xyz, apxlending.com and archlending.com. These tokens mirror
            <code style={{ fontFamily: 'var(--ds-mono)', fontSize: 15 }}> :root </code>
            in <code style={{ fontFamily: 'var(--ds-mono)', fontSize: 15 }}>index.css</code>, so the
            site and this page move together.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <Link to="/" className="ds-btn ds-btn-primary">
              Back to site <ArrowRight size={15} strokeWidth={1.8} />
            </Link>
            <a href="/pdf/whitepaper.pdf" className="ds-btn ds-btn-secondary">Whitepaper</a>
          </div>
        </div>
      </header>

      <div className="ds-shell">
        <nav className="ds-side" aria-label="Design system sections">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`}>{s.label}</a>
          ))}
        </nav>

        <main>
          <Section
            id="foundations"
            title="Foundations"
            blurb="Four rules carry the whole system. When a decision is not covered below, pick the option that follows these."
          >
            <div className="ds-grid-2">
              {[
                ['Space separates, not lines', 'There are no rails, frames or section rules. A 112px band of white is the divider. The only borders left on the site close a card or a FAQ row.'],
                ['One typeface', 'Inter Tight does every job. No serif, no italic display, no second family. Hierarchy comes from size, weight and grey.'],
                ['Near-black, never pure', '#0E0F12 reads softer than #000 against white and keeps the dark CTA block from vibrating. Colour never carries meaning on its own.'],
                ['One radius scale', '12px buttons, 16px cards, 24px on the inset CTA block. Pills are for badges only. Nothing is square.'],
              ].map(([h, p]) => (
                <div key={h} className="ds-card">
                  <h4>{h}</h4>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="color" title="Color" blurb="Three ramps. Ink for text, surface for structure, accent for action.">
            <p className="ds-caption" style={{ marginBottom: 14 }}>INK</p>
            <SwatchGrid items={INK} />
            <p className="ds-caption" style={{ margin: '32px 0 14px' }}>SURFACE &amp; LINE</p>
            <SwatchGrid items={SURFACE} />
            <p className="ds-caption" style={{ margin: '32px 0 14px' }}>ACCENT</p>
            <SwatchGrid items={ACCENT} />
          </Section>

          <Section
            id="typography"
            title="Typography"
            blurb="Inter Tight for everything, IBM Plex Mono for labels and data. Headings stay at weight 400 — the tight face already carries the authority, and bolding it makes the page shout."
          >
            {TYPE.map(t => (
              <div key={t.cls} className="ds-type-row">
                <span className={t.cls}>{t.sample}</span>
                <span className="ds-spec">{t.spec}</span>
              </div>
            ))}
            <div className="ds-type-row">
              <span style={{ fontFamily: 'var(--ds-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ds-muted)' }}>
                / Loan overview
              </span>
              <span className="ds-spec">{'Mono label / 12px\n500 · 0.14em · uppercase'}</span>
            </div>
          </Section>

          <Section id="radius" title="Radius & spacing" blurb="A 4px base grid. Radii round to 12px unless there is a reason not to.">
            <div className="ds-scale">
              {RADII.map(r => (
                <div key={r.token} className="ds-scale-item">
                  <div className="ds-scale-box" style={{ borderRadius: r.value }} />
                  <p className="ds-caption">{r.label}</p>
                  <code className="ds-token-code">{r.token}</code>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <p className="ds-caption" style={{ marginBottom: 16 }}>SPACING SCALE</p>
              {SPACING.map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                  <div className="ds-bar" style={{ width: n, marginBottom: 0 }} />
                  <code className="ds-token-code">{n}px</code>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="buttons"
            title="Buttons"
            blurb="Black is primary and there is exactly one per view. Outline is the everyday secondary. The blue fill is for regulated or legal actions where the black button would read as marketing."
          >
            <div className="ds-specimen">
              <button className="ds-btn ds-btn-primary">Apply now <ArrowRight size={15} strokeWidth={1.8} /></button>
              <button className="ds-btn ds-btn-secondary">Log in</button>
              <button className="ds-btn ds-btn-secondary">Accept terms <Check size={15} strokeWidth={1.8} /></button>
              <button className="ds-btn ds-btn-ghost">Cancel</button>
            </div>
            <p className="ds-caption">
              12px radius · 10px 18px padding · 14px / 400 · icon 15px at 1.8 stroke, always trailing
            </p>
          </Section>

          <Section id="surfaces" title="Surfaces & badges" blurb="Cards are white on white, separated by a hairline. Shadows are for things that float, and almost nothing floats.">
            <div className="ds-grid-2" style={{ marginBottom: 20 }}>
              <div className="ds-card">
                <h4>Loan overview</h4>
                <p>Duration up to 12 months, APR from 7.25%, LTV up to 60%.</p>
              </div>
              <div className="ds-card">
                <h4>Nevra score</h4>
                <p>Onchain history and bank cash flow, resolved into one number.</p>
              </div>
            </div>
            <div className="ds-specimen">
              <span className="ds-badge">Neutral</span>
              <span className="ds-badge ds-badge-accent">Regulated</span>
              <span className="ds-badge ds-badge-dark">New</span>
            </div>
          </Section>

          <Section id="forms" title="Forms" blurb="Labels above the field, always visible. Focus turns the border black — the blue ring is reserved for keyboard focus.">
            <div className="ds-specimen">
              <div className="ds-field">
                <label htmlFor="ds-email">Email</label>
                <input id="ds-email" type="email" placeholder="you@company.com" />
              </div>
              <div className="ds-field">
                <label htmlFor="ds-amount">Amount</label>
                <input id="ds-amount" type="text" placeholder="$25,000" />
              </div>
            </div>
          </Section>

          <Section id="voice" title="Voice" blurb="Plain English, confident, no hype. If a sentence would embarrass a compliance officer, rewrite it.">
            <div className="ds-voice">
              <div className="ds-voice-row">
                <div className="ds-voice-cell ds-caption">WRITE THIS</div>
                <div className="ds-voice-cell ds-caption">NOT THIS</div>
              </div>
              {VOICE.map(([yes, no]) => (
                <div key={yes} className="ds-voice-row">
                  <div className="ds-voice-cell ds-voice-yes">{yes}</div>
                  <div className="ds-voice-cell ds-voice-no">{no}</div>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  )
}
