import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ShieldCheck, KeyRound, TrendingUp, Umbrella, ArrowRight } from 'lucide-react'
import Nav from '../components/Nav'
import LoanCalculator from '../components/LoanCalculator'
import { ScoreGauge, CollateralCompare, StepGlyph } from '../components/motion'
import '../responsive.css'

function Reveal({ children, delay = 0, className = '', style }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

const PARTNER_LOGOS = [
  { name: 'Plaid', src: '/logos/plaid_logo.svg' },
  { name: 'Alchemy', src: '/logos/alchemy_logo.svg' },
  { name: 'Helius', src: '/logos/helius_logo.svg' },
  { name: 'FairScale', src: '/logos/fairscale_logo.svg' },
]

const STEPS = [
  {
    number: '01',
    title: 'Connect your wallets',
    description: 'Link as many wallets as you want in one click. Your combined onchain history starts building your profile instantly.',
  },
  {
    number: '02',
    title: 'Verify your identity',
    description: 'Complete KYC and link your bank. We combine your offchain financial data with your onchain history into one score.',
  },
  {
    number: '03',
    title: 'Access your credit line',
    description: 'Post less than you borrow. Your score unlocks a credit line you can draw from anytime, no overcollateral, no waiting.',
  },
]

const PRINCIPLES = [
  { icon: ShieldCheck, tag: 'READ-ONLY', title: 'Bank data stays private', body: 'We read balances and cash flow to score you. Nothing else, and never your credentials.' },
  { icon: KeyRound, tag: 'NON-CUSTODIAL', title: 'Your keys, your wallet', body: 'Nevra never takes custody. Your wallet stays yours the entire time.' },
  { icon: TrendingUp, tag: 'LIVE SCORE', title: 'Rates improve as you repay', body: 'Every repayment moves your score, and your score sets your rate.' },
  { icon: Umbrella, tag: 'SOFT LANDINGS', title: 'Liquidation is the last step', body: 'Your rate and limit adjust first. Selling your collateral is never the opening move.' },
]

const USE_CASES = [
  { tag: 'EVERYDAY', title: 'Living expenses', description: 'Cover rent and day-to-day spending without selling your stack.' },
  { tag: 'BUSINESS', title: 'Start something', description: 'Fund your company or side project while your portfolio keeps working.' },
  { tag: 'INVESTING', title: 'Stay in the market', description: 'Seize opportunities without triggering a taxable sale.' },
  { tag: 'MILESTONES', title: 'Big moments', description: 'Finance a car, a move, or a wedding at a rate your score earned.' },
]

const FAQS = [
  {
    question: 'How is my credit score calculated?',
    answer: 'Your score blends your onchain history (wallet age, repayment behavior, protocol activity) with offchain signals from your linked bank account. Both sides count, so a thin file on one can be carried by the other.',
  },
  {
    question: 'Do I really borrow more than I post?',
    answer: 'Yes. That is the whole point. Instead of locking 150% collateral to borrow 100, your score qualifies you for a credit line where the collateral you post is a fraction of what you can draw.',
  },
  {
    question: 'What do you do with my bank data?',
    answer: 'We read balances and cash-flow history to score you, nothing else. Bank access is read-only, handled through Plaid, and we never see your credentials. Your keys stay yours; we never take custody of your wallet.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'Your rate and available credit adjust before anything drastic happens. Missed payments lower your Nevra score first; liquidation of posted collateral is the last resort, not the first.',
  },
  {
    question: 'When can I get access?',
    answer: 'We are onboarding in cohorts. Apply now, finish verification, and you will be scored and placed in the next cohort. Early applicants get priority.',
  },
]

export default function Home() {
  return (
    <div>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────
          Centered, no rails. Badge, two-tone headline, lede, two buttons,
          then the animated score gauge. */}
      <section className="hero" style={{ padding: '148px 24px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p className="pill enter-up enter-delay-1">
            <span className="pill-dot" aria-hidden />
            Undercollateralized credit, from 7.25% APR
          </p>

          <h1 className="display enter-up enter-delay-2" style={{ margin: '28px 0 0' }}>
            <span style={{ display: 'block' }}>Consumer credit for</span>
            <span className="dim" style={{ display: 'block' }}>crypto-native people.</span>
          </h1>

          <p className="lede enter-up enter-delay-3" style={{ maxWidth: 560, margin: '26px auto 0', fontSize: 18 }}>
            Verify once, connect your bank and wallets, and get one real credit score from your
            entire financial life. Then borrow against it.
          </p>

          <div className="enter-up enter-delay-4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 34 }}>
            <Link to="/apply" className="btn btn-primary focus-ring">
              Apply now <ArrowRight size={16} strokeWidth={2} />
            </Link>
            <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline focus-ring">
              Read the whitepaper
            </a>
          </div>
        </div>

        <div className="hero-viz enter-up enter-delay-5" style={{ maxWidth: 760, margin: '56px auto 0' }}>
          <ScoreGauge />
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────────────────── */}
      <section style={{ padding: '104px 0 0' }}>
        <p className="eyebrow" style={{ textAlign: 'center', marginBottom: 32 }}>Built with</p>
        <div className="logo-mask">
          <div className="logo-track">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <img
                key={`${logo.name}-${i}`}
                src={logo.src}
                alt={i < PARTNER_LOGOS.length ? logo.name : ''}
                aria-hidden={i >= PARTNER_LOGOS.length}
                className="partner-logo"
                style={{ height: 26, opacity: 0.4, margin: '0 44px', flexShrink: 0 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Nevra ────────────────────────────────────────────────── */}
      <section className="section shell">
        <div className="split" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 72, alignItems: 'center' }}>
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 20 }}>The problem</p>
            <h2 className="display-sm">
              Same collateral.{' '}
              <span className="dim">Very different loan.</span>
            </h2>
            <p className="lede" style={{ marginTop: 22, maxWidth: 400 }}>
              Overcollateralized lending gives everyone the same deal: lock up more than you take
              out. Your Nevra score reads your wallet and bank history, so your collateral goes
              further.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <CollateralCompare />
          </Reveal>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="section shell">
        <Reveal style={{ maxWidth: 620, marginBottom: 72 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>How it works</p>
          <h2 className="display-sm">
            From wallet to credit line{' '}
            <span className="dim">in three steps.</span>
          </h2>
        </Reveal>

        <div className="steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56 }}>
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <StepGlyph index={i} />
              <p className="eyebrow" style={{ margin: '28px 0 12px' }}>{step.number}</p>
              <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 10px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.65, margin: 0 }}>
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Calculator ───────────────────────────────────────────────── */}
      <LoanCalculator />

      {/* ── Use cases ────────────────────────────────────────────────── */}
      <section className="section shell">
        <Reveal style={{ maxWidth: 620, marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Use cases</p>
          <h2 className="display-sm">
            Real money,{' '}
            <span className="dim">for real life.</span>
          </h2>
          <p className="lede" style={{ marginTop: 22, maxWidth: 430 }}>
            Draw USDC against your score and put it to work. No selling, no taxable event, no
            waiting.
          </p>
        </Reveal>

        <div className="usecases" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {USE_CASES.map((uc, i) => (
            <Reveal key={uc.tag} delay={i * 70}>
              <div className="card usecase-card" style={{ height: '100%' }}>
                <p className="eyebrow" style={{ fontSize: 10, marginBottom: 40 }}>{uc.tag}</p>
                <h3 style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.015em', margin: '0 0 8px' }}>
                  {uc.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.6, margin: 0 }}>
                  {uc.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────────────────── */}
      <section className="section shell">
        <Reveal style={{ maxWidth: 620, marginBottom: 56 }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Principles</p>
          <h2 className="display-sm">
            Boring credit,{' '}
            <span className="dim">done right.</span>
          </h2>
        </Reveal>

        <div className="principles" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 44 }}>
          {PRINCIPLES.map(({ icon: Icon, tag, title, body }, i) => (
            <Reveal key={tag} delay={i * 70}>
              <Icon size={22} strokeWidth={1.6} color="var(--ink)" aria-hidden />
              <p className="eyebrow" style={{ fontSize: 10, margin: '22px 0 10px' }}>{tag}</p>
              <h3 style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.35, margin: '0 0 8px' }}>
                {title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.6, margin: 0 }}>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="section shell">
        <Reveal style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>FAQ</p>
          <h2 className="display-sm">
            Frequently asked{' '}
            <span className="dim">questions.</span>
          </h2>
        </Reveal>

        <Reveal delay={80} style={{ maxWidth: 720, margin: '0 auto' }}>
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
          ))}
        </Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────
          Inset rounded dark block rather than a full-bleed band, so the white
          canvas still frames it. */}
      <section style={{ padding: '0 24px 112px' }}>
        <Reveal style={{ maxWidth: 'var(--shell)', margin: '0 auto' }}>
          <div className="cta-block" style={{
            background: 'var(--dark)',
            borderRadius: 'var(--r-xl)',
            padding: '104px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div aria-hidden style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 60% 80% at 50% 120%, rgba(255,255,255,0.14) 0%, transparent 62%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative' }}>
              <h2 className="display-sm" style={{ color: 'var(--dark-ink)' }}>
                Your history is your collateral.{' '}
                <span style={{ display: 'block', color: 'var(--dark-ink-38)' }}>
                  Borrow like it counts.
                </span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--dark-ink-60)', lineHeight: 1.65, maxWidth: 440, margin: '24px auto 36px' }}>
                Stop locking up more than you borrow. Verify once, link your accounts, and open a
                credit line backed by your real score.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/apply" className="btn btn-light focus-ring-light">
                  Apply now <ArrowRight size={16} strokeWidth={2} />
                </Link>
                <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-onDark focus-ring-light">
                  Read the whitepaper
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  const contentId = `faq-answer-${index}`

  return (
    <div style={{ borderBottom: '1px solid var(--hairline)' }}>
      <button
        type="button"
        className="focus-ring faq-toggle"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '24px 4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
          color: 'var(--ink)',
          transition: 'color 0.2s ease',
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.45 }}>
          {faq.question}
        </span>
        <span aria-hidden style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 18,
          color: 'var(--ink-45)',
          lineHeight: 1,
          flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          +
        </span>
      </button>
      <div
        id={contentId}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.7, padding: '0 4px 26px', maxWidth: 620, margin: 0 }}>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="eyebrow" style={{ fontSize: 10, marginBottom: 18 }}>{title}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {links.map(({ label, href, internal }) => (
          <li key={label}>
            {internal
              ? <Link to={href} className="footer-link" style={footerLink}>{label}</Link>
              : <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link" style={footerLink}>{label}</a>}
          </li>
        ))}
      </ul>
    </div>
  )
}

const footerLink = { fontSize: 13.5, color: 'var(--ink-60)', fontWeight: 400 }

function Footer() {
  return (
    <footer className="shell" style={{ paddingBottom: 56 }}>
      <div className="footer-inner" style={{ display: 'flex', gap: 64, marginBottom: 64 }}>
        <div style={{ minWidth: 200 }}>
          <img src="/logo.png" alt="Nevra" style={{ width: 24, height: 24, marginBottom: 14 }} />
          <p style={{ fontSize: 13, color: 'var(--ink-45)', lineHeight: 1.6 }}>
            ©Nevra Inc. 2026<br />All rights reserved.
          </p>
        </div>
        <div className="footer-cols" style={{ display: 'flex', gap: 64, flex: 1, justifyContent: 'flex-end' }}>
          <FooterCol title="Product" links={[
            { label: 'Apply', href: '/apply', internal: true },
            { label: 'Whitepaper', href: '/pdf/whitepaper.pdf' },
            { label: 'Blog', href: '/blog', internal: true },
            { label: 'Design system', href: '/design', internal: true },
          ]} />
          <FooterCol title="Socials" links={[
            { label: 'Twitter', href: 'https://x.com/nevralabs' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nevralabs' },
            { label: 'Telegram', href: 'https://t.me/nevragenesis' },
            { label: 'Discord', href: 'https://discord.gg/XYfzRs9PM' },
          ]} />
        </div>
      </div>
      <p style={{ fontSize: 12, color: 'var(--ink-30)', lineHeight: 1.6, maxWidth: 640 }}>
        Nevra is not a bank. Figures shown on this page are illustrative and do not constitute a
        credit offer.
      </p>
    </footer>
  )
}
