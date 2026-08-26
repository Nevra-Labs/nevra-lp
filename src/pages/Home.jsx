import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ShieldCheck, KeyRound, TrendingUp, Umbrella, ArrowRight } from 'lucide-react'
import Nav from '../components/Nav'
import LoanCalculator from '../components/LoanCalculator'
import { ScoreGauge, CollateralCompare, StepGlyph } from '../components/motion'
import HeroVideo from '../components/HeroVideo'
import ProductBento from '../components/ProductBento'
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

const STACK = [
  {
    name: 'Plaid',
    src: '/logos/plaid_logo.svg',
    role: 'Bank connections',
    detail: 'Read-only access to balances and cash flow. Your credentials go to Plaid, never to us.',
  },
  {
    name: 'Alchemy',
    src: '/logos/alchemy_logo.svg',
    role: 'Onchain data',
    detail: 'Wallet history across chains — positions, repayments, liquidations — read at archive depth.',
  },
  {
    name: 'Helius',
    src: '/logos/helius_logo.svg',
    role: 'Solana infrastructure',
    detail: 'Transaction indexing and settlement for draws and repayments on Solana.',
  },
  {
    name: 'FairScale',
    src: '/logos/fairscale_logo.svg',
    role: 'Scoring models',
    detail: 'The modelling layer that turns two histories into one number you can be lent against.',
  },
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
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (!el) return
    // One frame so the section has laid out before we measure it.
    const raf = requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => cancelAnimationFrame(raf)
  }, [hash])

  return (
    <div>
      <Nav />

      {/* ── Announcement + hero ──────────────────────────────────────────
          apxlending.com's hero, measured: 100vh block, announcement strip on
          top, content stack centred at 12 / 16 / 48px gaps, 48px CTAs, and a
          partner marquee pinned to the bottom edge. Their depth comes from a
          darkened photograph; ours comes from an oversized echo of the score
          arc, so the backdrop is the product rather than stock imagery. */}
      <div className="hero-dark">
        <HeroVideo />

        <a href="/blog/why-crypto-never-solved-credit" className="announce">
          <span className="announce-tag">New</span>
          Why crypto never solved credit
          <ArrowRight size={14} strokeWidth={2} />
        </a>

        <section className="hero">
          <div className="hero-stack">
            <p className="hero-badge enter-up enter-delay-1">
              <span className="pill-dot" aria-hidden />
              No credit checks. Your keys stay yours.
            </p>

            <h1 className="hero-title enter-up enter-delay-2">
              <span style={{ display: 'block' }}>Money when you need it.</span>
              <span style={{ display: 'block', color: 'rgba(255,255,255,0.5)' }}>
                Without selling a thing.
              </span>
            </h1>

            <p className="hero-sub enter-up enter-delay-3">
              Connect your bank and wallets once. Nevra turns your whole financial life into
              one real credit score, and lends against it from 7.25% APR.
            </p>

            <div className="hero-ctas enter-up enter-delay-4">
              <Link to="/apply" className="btn-hero btn-hero-light focus-ring-light">
                Apply now <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="btn-hero btn-hero-glass focus-ring-light">
                Read the whitepaper
              </a>
            </div>
          </div>
        </section>

        {/* Partner marquee, pinned to the hero's bottom edge like APX. */}
        <div className="hero-logos">
          <div className="logo-mask">
            <div className="logo-track">
              {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                <img
                  key={`${logo.name}-${i}`}
                  src={logo.src}
                  alt={i < PARTNER_LOGOS.length ? logo.name : ''}
                  aria-hidden={i >= PARTNER_LOGOS.length}
                  className="partner-logo partner-logo-dark"
                  style={{ height: 24, margin: '0 40px', flexShrink: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Calculator ─────────────────────────────────────────────────
          APX puts its loan calculator immediately below the hero: the
          interactive thing that quotes you is the product demo, so it goes
          first rather than fourth. */}
      <LoanCalculator />

      {/* ── Product showcase ──────────────────────────────────────────
          ui.shadcn.com shows real surfaces from the product in a bento of
          bordered cards rather than describing them. Same idea here: the
          score, the line it opens, the rate it sets, and what we read. */}
      <section className="section shell">
        <Reveal style={{ maxWidth: 780, marginBottom: 48, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 className="display-sm">
            <span style={{ display: 'block' }}>Your whole financial life,</span>
            <span className="dim" style={{ display: 'block' }}>resolved into one score.</span>
          </h2>
          <p className="lede" style={{ marginTop: 22, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Wallet history and bank cash flow, read together. That number sets your limit and
            your rate — and it moves every time you repay.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ProductBento />
        </Reveal>
      </section>

      {/* ── Why Nevra ────────────────────────────────────────────────── */}
      <section className="section shell">
        <div className="split" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 72, alignItems: 'center' }}>
          <Reveal>
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
      <section id="how-it-works" className="section shell">
        <Reveal style={{ maxWidth: 620, marginBottom: 72 }}>
          <h2 className="display-sm">
            From wallet to credit line{' '}
            <span className="dim">in three steps.</span>
          </h2>
        </Reveal>

        <div className="steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56 }}>
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <StepGlyph index={i} />
              <p style={{ margin: '28px 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink-30)' }}>
                {step.number}
              </p>
              <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.25, margin: '0 0 10px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.65, margin: 0 }}>
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Use cases ────────────────────────────────────────────────── */}
      <section id="use-cases" className="section shell">
        <Reveal style={{ maxWidth: 620, marginBottom: 56 }}>
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
                <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.005em', margin: '0 0 8px' }}>
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
          <h2 className="display-sm">
            Boring credit,{' '}
            <span className="dim">done right.</span>
          </h2>
        </Reveal>

        <div className="principles" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 44 }}>
          {PRINCIPLES.map(({ icon: Icon, tag, title, body }, i) => (
            <Reveal key={tag} delay={i * 70}>
              <Icon size={22} strokeWidth={1.6} color="var(--ink)" aria-hidden />
              <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.35, margin: '0 0 8px' }}>
                {title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.6, margin: 0 }}>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Infrastructure ────────────────────────────────────────────
          APX gives its infrastructure a section of its own rather than a
          logo strip. A logo proves nothing until you say what it does. */}
      <section className="section shell">
        <Reveal style={{ maxWidth: 680, marginBottom: 56 }}>
          <h2 className="display-sm">
            <span style={{ display: 'block' }}>Built on infrastructure</span>
            <span className="dim" style={{ display: 'block' }}>banks already trust.</span>
          </h2>
          <p className="lede" style={{ marginTop: 22, maxWidth: 520 }}>
            Nothing about your score is a black box we invented. Here is what reads what.
          </p>
        </Reveal>

        <div className="stack-grid">
          {STACK.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <div className="stack-card">
                <img src={item.src} alt={item.name} className="stack-logo" />
                <p className="stack-role">{item.role}</p>
                <p className="stack-detail">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="section shell">
        <Reveal style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
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
        <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.45 }}>
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
      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 18 }}>{title}</p>
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
