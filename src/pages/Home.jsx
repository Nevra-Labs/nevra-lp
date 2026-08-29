import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Nav from '../components/Nav'
import LoanCalculator from '../components/LoanCalculator'
import HeroVideo from '../components/HeroVideo'
import HowItWorks from '../components/HowItWorks'
import FeatureCards from '../components/FeatureCards'
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

/* Onchain infrastructure only: the hero path is wallet/payroll, so no Plaid. */
const PARTNER_LOGOS = [
  { name: 'Alchemy', src: '/logos/alchemy_logo.svg' },
  { name: 'Helius', src: '/logos/helius_logo.svg' },
  { name: 'FairScale', src: '/logos/fairscale_logo.svg' },
]

/* Each half of the marquee has to fill the mask exactly for the loop to be
   seamless, so the set repeats until it does. Three logos across a 1400px
   half leaves 470px between them; three repeats brings the pitch to ~155px. */
const MARQUEE_REPEATS = 3
const MARQUEE_LOGOS = Array.from(
  { length: MARQUEE_REPEATS },
  () => PARTNER_LOGOS
).flat()

const FAQS = [
  {
    question: 'How is my payroll score calculated?',
    answer: 'Your score reads recurring USDC and USDT inflows to your connected wallets: frequency, amount, and consistency of payroll. No FICO file and no bank history required.',
  },
  {
    question: 'Do I really borrow more than I post?',
    answer: 'Yes. Your verified payroll qualifies you for a line where the collateral you post is a fraction of what you draw, not 150% of it.',
  },
  {
    question: 'What do I connect?',
    answer: 'The wallets that receive your stablecoin salary. The connection is read-only and non-custodial: we never take your keys or your funds.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'Your rate and available credit adjust first. You repay from your next payday; liquidation of posted collateral is the last resort, not the first.',
  },
  {
    question: 'When can I get access?',
    answer: 'We are onboarding stablecoin earners in cohorts. Connect your payroll wallet, finish verification, and you will be scored and placed in the next cohort.',
  },
]

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (!el) return
    const raf = requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => cancelAnimationFrame(raf)
  }, [hash])

  return (
    <div>
      <Nav />

      {/* ── Announcement + hero ──────────────────────────────────────────
          Dark cinematic NYC hero. The left copy sits on a gradient scrim so
          the skyline never fights the type; the product image carries the
          right column. */}
      <div className="hero-dark">
        <HeroVideo />

        <a href="/#calculator" className="announce">
          <span className="announce-tag">New</span>
          Your paycheck is onchain. Your credit should be too.
          <ArrowRight size={14} strokeWidth={2} />
        </a>

        <section className="hero">
          <div className="hero-grid">
            <div className="hero-stack">
              <p className="hero-badge enter-up enter-delay-1">
                <span className="pill-dot" aria-hidden />
                Credit underwritten on your onchain paycheck
              </p>

              <h1 className="hero-title enter-up enter-delay-2">
                <span style={{ display: 'block' }}>Paid in stablecoins.</span>
                <span style={{ display: 'block', color: 'rgba(255,255,255,0.62)' }}>
                  Cash before payday.
                </span>
              </h1>

              <p className="hero-sub enter-up enter-delay-3">
                Payroll-backed credit from 4.0% APR.
                <br />
                No credit checks, no selling, keys stay yours.
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

            <div className="hero-visual">
              <img
                src="/img/hero-image.png"
                alt="Your onchain paycheck, scored into a credit line you can draw."
                className="hero-visual-img"
              />
            </div>
          </div>
        </section>

        {/* Partner marquee, pinned to the hero's bottom edge. */}
        <div className="hero-logos">
          <div className="logo-mask">
            <div className="logo-track">
              {[0, 1].map(half => (
                <div className="logo-group" key={half} aria-hidden={half === 1}>
                  {MARQUEE_LOGOS.map((logo, i) => (
                    <img
                      key={`${logo.name}-${half}-${i}`}
                      src={logo.src}
                      alt={half === 0 && i < PARTNER_LOGOS.length ? logo.name : ''}
                      className="partner-logo partner-logo-dark"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Calculator ─────────────────────────────────────────────────
          The marketing demo of the product: a real-looking payroll line,
          labelled as a demo so it never reads as a broken dev state. */}
      <LoanCalculator />

      {/* ── Why Nevra ──────────────────────────────────────────────────
          APX's why-section, 1:1: 80px padding on a near-white band, the h2
          and its one-line sub on the left, Apply now pinned right, then the
          card grid 40px below. */}
      <section id="why-nevra" className="section-band">
        <div className="section shell">
          <Reveal>
            <div className="why-head">
              <div className="why-head-text">
                <h2 className="display-sm">Why Nevra?</h2>
                <p className="why-head-sub">
                  One payroll score, a line you can draw on, a rate that falls as you repay,
                  and read-only access to the data behind it.
                </p>
              </div>
              <Link to="/apply" className="btn-apx focus-ring">Apply now</Link>
            </div>
          </Reveal>

          <Reveal delay={100} style={{ marginTop: 40 }}>
            <FeatureCards />
          </Reveal>
        </div>
      </section>

      {/* ── How payroll credit works ─────────────────────────────────── */}
      <HowItWorks />

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="section shell">
        <Reveal style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
          <h2 className="display-sm">Questions, answered.</h2>
        </Reveal>

        <Reveal delay={80} style={{ maxWidth: 720, margin: '0 auto' }}>
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
          ))}
        </Reveal>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 var(--shell-pad) 112px' }}>
        <Reveal>
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
                Your paycheck is collateral enough.{' '}
                <span style={{ display: 'block', color: 'var(--dark-ink-38)' }}>
                  Borrow like it counts.
                </span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--dark-ink-60)', lineHeight: 1.65, maxWidth: 460, margin: '24px auto 36px' }}>
                Connect the wallet your salary lands in, get scored on real income, and open a
                credit line you can draw without selling.
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
      <p className="footer-col-title">{title}</p>
      <ul className="footer-col-list">
        {links.map(({ label, href, internal }) => (
          <li key={label}>
            {internal
              ? <Link to={href} className="footer-link">{label}</Link>
              : <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link">{label}</a>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Large-name footer, the pattern from 21st.dev: brand block and link columns
   on top, then the wordmark set to the full content width to close the page. */
function Footer() {
  return (
    <footer className="footer shell">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/logo.png" alt="Nevra" className="footer-logo" />
          <p className="footer-tagline">
            Real credit for people paid in stablecoins. Your paycheck is the
            underwriting: onchain, non-custodial, yours.
          </p>
          <p className="footer-copy">&copy; Nevra Inc. 2026. All rights reserved.</p>
        </div>

        <div className="footer-cols">
          <FooterCol title="Product" links={[
            { label: 'Apply', href: '/apply', internal: true },
            { label: 'Calculator', href: '/#calculator', internal: true },
            { label: 'How it works', href: '/#how-it-works', internal: true },
            { label: 'Why Nevra', href: '/#why-nevra', internal: true },
          ]} />
          <FooterCol title="Resources" links={[
            { label: 'Whitepaper', href: '/pdf/whitepaper.pdf' },
            { label: 'Blog', href: '/blog', internal: true },
            { label: 'Terms of Service', href: '/pdf/Nevra_Terms_of_Service.pdf' },
            { label: 'Privacy Policy', href: '/pdf/Nevra_Privacy_Policy.pdf' },
          ]} />
          <FooterCol title="Socials" links={[
            { label: 'Twitter', href: 'https://x.com/nevralabs' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nevralabs' },
            { label: 'Telegram', href: 'https://t.me/nevragenesis' },
            { label: 'Discord', href: 'https://discord.gg/6TfjWus8C' },
          ]} />
        </div>
      </div>

      <p className="footer-note">
        Nevra is not a bank. Figures shown on this page are illustrative and do not constitute a
        credit offer.
      </p>

      {/* Decorative: the name is already in the logo above and in the page title. */}
      <div className="footer-wordmark" aria-hidden="true">Nevra</div>
    </footer>
  )
}
