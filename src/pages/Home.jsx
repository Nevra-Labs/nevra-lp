import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ShieldCheck, KeyRound, TrendingUp, Umbrella, Wallet, ScanFace, Gauge } from 'lucide-react'
import Nav from '../components/Nav'
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

const STEPS = [
  {
    number: '01',
    title: 'Connect your wallets',
    description: 'Link as many wallets as you want in one click. No forms, no delays. Your combined onchain history across every account starts building your profile instantly.',
  },
  {
    number: '02',
    title: 'Verify your identity',
    description: 'Complete KYC and link your bank account. We combine your offchain financial data with your onchain history into one real credit score.',
  },
  {
    number: '03',
    title: 'Access your credit line',
    description: 'Post less than you borrow. Your score unlocks a credit line you can draw from anytime, no overcollateral, no waiting.',
  },
]

const PRINCIPLES = [
  { tag: 'READ-ONLY', title: 'Bank data stays private' },
  { tag: 'NON-CUSTODIAL', title: 'Your keys, your wallet' },
  { tag: 'LIVE SCORE', title: 'Rates improve as you repay' },
  { tag: 'SOFT LANDINGS', title: 'Liquidation is the last step' },
]

const USE_CASES = [
  {
    tag: 'EVERYDAY',
    title: 'Living expenses',
    description: 'Cover rent and day-to-day spending without selling your stack.',
    drawn: 1450,
    posted: 600,
    caption: 'rent covered',
  },
  {
    tag: 'BUSINESS',
    title: 'Start something',
    description: 'Fund your company or side project while your portfolio keeps working.',
    drawn: 12000,
    posted: 5000,
    caption: 'company funded',
  },
  {
    tag: 'INVESTING',
    title: 'Stay in the market',
    description: 'Seize opportunities without triggering a taxable sale.',
    drawn: 3200,
    posted: 1400,
    caption: '0 tokens sold',
  },
  {
    tag: 'MILESTONES',
    title: 'Big moments',
    description: 'Finance a car, a move, or a wedding at a rate your score earned.',
    drawn: 8000,
    posted: 3500,
    caption: 'keys in hand',
  },
]

// Stripe-style pill buttons: tight padding, full radius, weight 400.
const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  fontWeight: 400,
  lineHeight: 1,
  padding: '12px 22px',
  borderRadius: 99,
  letterSpacing: '0.01em',
}

// Portola-style structural frame: side rails at content width.
const frame = {
  maxWidth: 1160,
  margin: '0 auto',
  borderLeft: '1px solid var(--hairline-soft)',
  borderRight: '1px solid var(--hairline-soft)',
}

const frameDark = {
  maxWidth: 1160,
  margin: '0 auto',
  borderLeft: '1px solid var(--dark-hairline)',
  borderRight: '1px solid var(--dark-hairline)',
}

const STEP_ICONS = [Wallet, ScanFace, Gauge]

function StepIcon({ index }) {
  const Icon = STEP_ICONS[index]
  return <Icon size={26} strokeWidth={1.6} color="var(--ink)" aria-hidden />
}

const PRINCIPLE_ICONS = [ShieldCheck, KeyRound, TrendingUp, Umbrella]

function PrincipleIcon({ index }) {
  const Icon = PRINCIPLE_ICONS[index]
  return (
    <span aria-hidden style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 48,
      height: 48,
      borderRadius: 12,
      background: 'var(--surface)',
      border: '1px solid var(--hairline-soft)',
      boxShadow: '0 2px 8px -2px rgba(13,37,61,0.08)',
    }}>
      <Icon size={22} strokeWidth={1.6} color="var(--ink)" />
    </span>
  )
}

function ScoreCard() {
  const mono = { fontFamily: 'var(--font-mono)' }
  const row = { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }
  return (
    <div aria-hidden style={{ width: '100%' }}>
      <div style={{
        position: 'relative',
        background: 'var(--surface)',
        border: '1px solid var(--hairline)',
        borderRadius: 8,
        boxShadow: '0 24px 48px -24px rgba(13,37,61,0.18), 0 2px 6px rgba(13,37,61,0.05)',
        padding: '22px 24px 20px',
        maxWidth: 380,
        margin: '0 auto',
      }}>
        {/* Floating draw notification overlapping the score card */}
        <div style={{
          position: 'absolute',
          top: -24,
          right: -20,
          zIndex: 1,
          background: 'var(--surface)',
          border: '1px solid var(--hairline)',
          borderRadius: 10,
          boxShadow: '0 12px 28px -12px rgba(13,37,61,0.25), 0 2px 6px rgba(13,37,61,0.06)',
          padding: '11px 15px',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, color: '#0E8345', margin: 0, letterSpacing: '-0.01em' }}>
            +$4,000 USDC drawn
          </p>
          <p style={{ fontSize: 11.5, color: 'var(--ink-45)', margin: '3px 0 0' }}>
            against just $1,500 posted
          </p>
        </div>
        <div style={{ ...row, alignItems: 'center', marginBottom: 22 }}>
          <span className="eyebrow" style={{ color: 'var(--ink-45)', fontSize: 11 }}>Nevra score</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 20 }}>
          <span style={{ ...mono, fontSize: 58, fontWeight: 500, lineHeight: 0.9, color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            742
          </span>
          <span style={{ ...mono, fontSize: 12, color: 'var(--ink-45)', paddingBottom: 4 }}>/ 850</span>
          <span style={{ ...mono, fontSize: 12, color: 'var(--ink-60)', marginLeft: 'auto', paddingBottom: 4 }}>▲ 12 this month</span>
        </div>

        <div style={{ borderTop: '1px solid var(--hairline-soft)', paddingTop: 16, marginBottom: 16 }}>
          <div style={{ ...row, marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--ink-60)' }}>Credit line</span>
            <span style={{ ...mono, fontSize: 13, color: 'var(--ink)' }}>$6,000</span>
          </div>
          <div style={{ ...row, marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--ink-60)' }}>Drawn</span>
            <span style={{ ...mono, fontSize: 13, color: 'var(--ink)' }}>$1,250</span>
          </div>
          <div style={{ height: 4, borderRadius: 99, background: 'rgba(13,37,61,0.08)', overflow: 'hidden' }}>
            <div style={{ width: '21%', height: '100%', borderRadius: 99, background: 'var(--ink)' }} />
          </div>
          <div style={{ ...row, marginTop: 8 }}>
            <span style={{ ...mono, fontSize: 11, color: 'var(--ink-45)' }}>21% utilized</span>
            <span style={{ ...mono, fontSize: 11, color: 'var(--ink-45)' }}>$4,750 available</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--hairline-soft)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[
            ['Wallet', '0x4f8a…9e2'],
            ['Bank', 'Checking ••4821'],
          ].map(([label, value]) => (
            <div key={label} style={{ ...row, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-60)' }}>{label}</span>
              <span style={{ ...mono, fontSize: 12, color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                {value}
                <svg width="13" height="13" viewBox="0 0 13 13">
                  <circle cx="6.5" cy="6.5" r="6" fill="rgba(13,37,61,0.1)" />
                  <path d="M4 6.7 l1.8 1.8 L9.2 4.9" stroke="var(--ink)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          ))}
        </div>

        <p className="eyebrow" style={{ marginTop: 18, fontSize: 9, color: 'var(--ink-30)', textAlign: 'right' }}>
          Illustrative
        </p>
      </div>
    </div>
  )
}

// Comparison viz scale: $4,400 max so the $4,000 bar stops short of the edge.
const VIZ_MAX = 4400
const VIZ_COLLATERAL = 1500

function useInView(threshold = 0.45) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

function CountUp({ to, active, delay = 0, duration = 1100 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
    let raf
    let start
    const tick = t => {
      if (start === undefined) start = t
      const elapsed = t - start - delay
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to, delay, duration])

  return <>${value.toLocaleString('en-US')}</>
}

function ComparisonViz() {
  const [ref, active] = useInView()
  const pct = v => `${((v / VIZ_MAX) * 100).toFixed(2)}%`
  const mono = { fontFamily: 'var(--font-mono)' }

  const rows = [
    {
      tag: 'EVERYWHERE ELSE',
      amount: 1000,
      delayMs: 150,
      amountColor: 'rgba(238,237,255,0.6)',
      fill: {
        background: 'repeating-linear-gradient(-45deg, rgba(201,198,240,0.28) 0 6px, rgba(201,198,240,0.12) 6px 12px)',
      },
    },
    {
      tag: 'WITH NEVRA',
      amount: 4000,
      delayMs: 550,
      shimmer: true,
      amountColor: '#EEEDFF',
      fill: {
        background: 'linear-gradient(90deg, var(--accent) 0%, #8B7BFF 100%)',
        boxShadow: '0 0 28px rgba(107,95,255,0.35)',
      },
    },
  ]

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Comparison: with $1,500 posted as collateral, overcollateralized lenders let you borrow about $1,000. With Nevra you can draw up to $4,000."
      style={{ maxWidth: 720, margin: '0 auto' }}
    >
      <p className="eyebrow" style={{ fontSize: 10, color: 'rgba(238,237,255,0.5)', marginBottom: 24 }}>
        [ WHAT YOU CAN BORROW ]
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {rows.map(({ tag, amount, delayMs, shimmer, amountColor, fill }) => (
          <div key={tag}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span className="eyebrow" style={{ fontSize: 10, color: 'rgba(238,237,255,0.5)' }}>[ {tag} ]</span>
              <span style={{ ...mono, fontSize: 'clamp(20px, 2.4vw, 26px)', fontWeight: 500, letterSpacing: '-0.02em', color: amountColor }}>
                <CountUp to={amount} active={active} delay={delayMs + 150} />
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                height: 40,
                borderRadius: 7,
                background: 'rgba(238,237,255,0.05)',
                border: '1px solid rgba(238,237,255,0.1)',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: active ? pct(amount) : '0%',
                  borderRadius: 7,
                  overflow: 'hidden',
                  transition: `width 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
                  ...fill,
                }}>
                  {shimmer && <span className="bar-shimmer" aria-hidden />}
                </div>
              </div>
              {/* Dashed reference line at the $1,500 collateral mark */}
              <span aria-hidden style={{
                position: 'absolute',
                top: -7,
                bottom: -7,
                left: pct(VIZ_COLLATERAL),
                borderLeft: '1px dashed rgba(238,237,255,0.4)',
                opacity: active ? 1 : 0,
                transition: 'opacity 0.5s ease 1.5s',
              }} />
            </div>
          </div>
        ))}
      </div>

      <div aria-hidden style={{
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        marginTop: 22,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.5s ease 1.6s',
      }}>
        <span style={{ width: 18, borderTop: '1px dashed rgba(238,237,255,0.4)' }} />
        <span style={{ ...mono, fontSize: 11, color: 'rgba(238,237,255,0.5)' }}>the $1,500 you posted</span>
      </div>
    </div>
  )
}

function UseCaseCard({ tag, title, description, drawn, posted, caption, index, active }) {
  const mono = { fontFamily: 'var(--font-mono)' }
  // Per-card scale: the drawn bar nearly fills the track, posted stays proportional,
  // so each card shows its own leverage ratio at a glance.
  const max = drawn * 1.12
  const pct = v => `${((v / max) * 100).toFixed(2)}%`
  const baseDelay = index * 110
  const bars = [
    {
      label: 'POSTED',
      amount: posted,
      delayMs: baseDelay + 150,
      amountColor: 'rgba(238,237,255,0.6)',
      fill: {
        background: 'repeating-linear-gradient(-45deg, rgba(201,198,240,0.28) 0 6px, rgba(201,198,240,0.12) 6px 12px)',
      },
    },
    {
      label: 'DRAWN',
      amount: drawn,
      delayMs: baseDelay + 450,
      shimmer: true,
      amountColor: '#EEEDFF',
      fill: {
        background: 'linear-gradient(90deg, var(--accent) 0%, #8B7BFF 100%)',
        boxShadow: '0 0 20px rgba(107,95,255,0.35)',
      },
    },
  ]

  return (
    <div className="usecase-card" style={{
      position: 'relative',
      height: '100%',
      background: 'var(--dark)',
      border: '1px solid rgba(238,237,255,0.1)',
      borderRadius: 14,
      padding: '26px 26px 28px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Ambient indigo glow, same family as the CTA band */}
      <span aria-hidden className="usecase-glow" style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(115% 80% at 88% 0%, rgba(107,95,255,0.2) 0%, transparent 58%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
        <span className="eyebrow" style={{ fontSize: 10, color: 'rgba(238,237,255,0.5)' }}>[ {tag} ]</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
          <span aria-hidden style={{ width: 6, height: 6, borderRadius: 99, background: '#57E39A', boxShadow: '0 0 8px #57E39A' }} />
          <span style={{ ...mono, fontSize: 11, color: 'rgba(238,237,255,0.55)', letterSpacing: '0.01em' }}>{caption}</span>
        </span>
      </div>

      <h3 style={{ position: 'relative', fontWeight: 500, fontSize: 18, letterSpacing: '-0.015em', color: '#fff', lineHeight: 1.3, margin: '0 0 8px' }}>
        {title}
      </h3>
      <p style={{ position: 'relative', fontSize: 14, color: 'rgba(238,237,255,0.6)', lineHeight: 1.6, margin: 0 }}>
        {description}
      </p>

      {/* Mini posted-vs-drawn viz, same language as the collateral comparison */}
      <div
        role="img"
        aria-label={`With $${posted.toLocaleString('en-US')} posted you draw $${drawn.toLocaleString('en-US')}.`}
        style={{ position: 'relative', marginTop: 'auto', paddingTop: 26, display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        {bars.map(({ label, amount, delayMs, shimmer, amountColor, fill }) => (
          <div key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
              <span className="eyebrow" style={{ fontSize: 9, color: 'rgba(238,237,255,0.45)' }}>[ {label} ]</span>
              <span style={{ ...mono, fontSize: 15, fontWeight: 500, letterSpacing: '-0.02em', color: amountColor }}>
                <CountUp to={amount} active={active} delay={delayMs + 150} duration={900} />
              </span>
            </div>
            <div style={{
              position: 'relative',
              height: 18,
              borderRadius: 5,
              background: 'rgba(238,237,255,0.05)',
              border: '1px solid rgba(238,237,255,0.1)',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: active ? pct(amount) : '0%',
                borderRadius: 5,
                overflow: 'hidden',
                transition: `width 1s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
                ...fill,
              }}>
                {shimmer && <span className="bar-shimmer" aria-hidden />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UseCaseGrid() {
  const [ref, active] = useInView(0.2)
  return (
    <div ref={ref} className="usecases-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 28,
    }}>
      {USE_CASES.map((uc, i) => (
        <Reveal key={uc.tag} delay={i * 70}>
          <UseCaseCard {...uc} index={i} active={active} />
        </Reveal>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', background: 'var(--paper)', color: 'var(--ink)' }}>
      <Nav />

      {/* Hero — top padding equals nav height so the frame rails meet the nav's bottom border */}
      <section style={{ padding: '57px 32px 0', minHeight: 'calc(100svh - 118px)', display: 'flex', flexDirection: 'column' }}>
        <div className="hero-grid" style={{
          ...frame,
          flex: 1,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          alignItems: 'stretch',
        }}>
          <div className="hero-copy-cell" style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 className="enter-up enter-delay-1" style={{
              fontWeight: 300,
              fontSize: 'clamp(38px, 3.9vw, 56px)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              marginBottom: 26,
            }}>
              <span style={{ display: 'block' }}>Consumer loans for</span>
              <span style={{ display: 'block', color: 'var(--ink-45)' }}>crypto-native people.</span>
            </h1>
            <p className="enter-up enter-delay-2" style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: 'var(--ink-60)',
              maxWidth: 480,
              marginBottom: 36,
            }}>
              Verify your identity, connect your bank and wallet, and get one real credit score from your entire financial life. Then borrow against it.
            </p>
            <div className="hero-ctas enter-up enter-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn-hover focus-ring" style={{
                ...btnBase,
                background: 'var(--accent)',
                color: '#fff',
              }}>
                Apply now →
              </Link>
              <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="btn-hover focus-ring" style={{
                ...btnBase,
                background: 'transparent',
                color: 'var(--ink)',
                border: '1px solid var(--hairline)',
              }}>
                Read the whitepaper
              </a>
            </div>
          </div>

          <div className="hero-card cell-divider enter-up enter-delay-3" style={{
            borderLeft: '1px solid var(--hairline-soft)',
            padding: '72px 48px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <ScoreCard />
          </div>
        </div>

        {/* Meta strip: three bordered cells under the hero */}
        <div className="hero-meta" style={{
          ...frame,
          width: '100%',
          borderTop: '1px solid var(--hairline-soft)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {[
            ['One score', 'Onchain + bank history'],
            ['Undercollateralized', 'Post less than you draw'],
            ['Non-custodial', 'Your keys stay yours'],
          ].map(([label, sub], i) => (
            <div key={label} className={i > 0 ? 'cell-divider' : ''} style={{
              padding: '22px 56px 26px',
              borderLeft: i > 0 ? '1px solid var(--hairline-soft)' : 'none',
            }}>
              <p className="eyebrow" style={{ fontSize: 11, color: 'var(--ink)', marginBottom: 6 }}>{label}</p>
              <p style={{ fontSize: 13, color: 'var(--ink-45)', lineHeight: 1.5 }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Built with — compact logo band inside the frame rails, Stripe-style */}
      <section className="built-with-section" style={{
        borderTop: '1px solid var(--hairline-soft)',
        borderBottom: '1px solid var(--hairline-soft)',
        padding: '0 32px',
      }}>
        <div style={{ ...frame, padding: '26px 0' }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0, bottom: 0, width: 72, zIndex: 2, background: 'linear-gradient(to right, var(--paper), transparent)' }} />
            <div aria-hidden style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0, bottom: 0, width: 72, zIndex: 2, background: 'linear-gradient(to left, var(--paper), transparent)' }} />
            <div className="logo-track">
              {[0, 1].map(half => (
                <div key={half} aria-hidden={half === 1} className="logo-track-half" style={{ display: 'flex', alignItems: 'center', gap: 88, paddingRight: 88 }}>
                  {Array.from({ length: 6 }).flatMap((_, rep) =>
                    PARTNER_LOGOS.map(logo => (
                      <img
                        key={`${rep}-${logo.name}`}
                        className="partner-logo"
                        src={logo.src}
                        alt={half === 0 && rep === 0 ? logo.name : ''}
                        style={{
                          height: 22,
                          width: 'auto',
                          objectFit: 'contain',
                          flexShrink: 0,
                          userSelect: 'none',
                          filter: 'brightness(0)',
                          opacity: 0.45,
                        }}
                      />
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Nevra — animated collateral comparison */}
      <section className="problem-section" style={{
        background: '#0D1738',
        padding: '0 32px',
        overflow: 'hidden',
      }}>
        <div style={{ ...frameDark, padding: '120px 24px 104px' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{
              fontWeight: 300,
              fontSize: 'clamp(30px, 3.8vw, 50px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: 0,
            }}>
              <span style={{ display: 'block', color: 'var(--dark-ink)' }}>Same $1,500 in collateral.</span>
              <span style={{ display: 'block', color: 'var(--dark-ink-38)' }}>Very different loan.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <ComparisonViz />
          </Reveal>

          <Reveal delay={200} style={{ textAlign: 'center', marginTop: 56 }}>
            <p style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: 'var(--dark-ink-60)',
              maxWidth: 480,
              margin: '0 auto',
            }}>
              Overcollateralized lending gives everyone the same deal: lock up more than you take out. Your Nevra score reads your wallet and bank history, so your collateral goes further.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works-section" style={{ padding: '0 32px' }}>
        <div style={frame}>
          <Reveal className="pad-cell" style={{ padding: '88px 56px 56px' }}>
            <h2 style={{
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: 0,
            }}>
              <span style={{ display: 'block' }}>From wallet to credit line</span>
              <span style={{ display: 'block', color: 'var(--ink-30)' }}>in three steps.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="how-it-works-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid var(--hairline-soft)',
            }}>
              {STEPS.map((step, i) => (
                <div key={step.title} className={`step-cell ${i > 0 ? 'cell-divider' : ''}`} style={{
                  padding: '40px 40px 56px',
                  borderLeft: i > 0 ? '1px solid var(--hairline-soft)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
                    <span className="eyebrow" style={{ color: 'var(--ink-45)' }}>[ {step.number} ]</span>
                    <StepIcon index={i} />
                  </div>
                  <h3 style={{ fontWeight: 500, fontSize: 17, letterSpacing: '-0.015em', marginBottom: 10, lineHeight: 1.3 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.7, margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Use cases — dark animated draw-receipt cards on the soft band */}
      <section className="usecases-section" style={{
        borderTop: '1px solid var(--hairline-soft)',
        background: 'var(--paper-soft)',
        padding: '0 32px',
      }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '96px 0 104px' }}>
          <Reveal className="usecases-header" style={{
            marginBottom: 56,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
          }}>
            <h2 style={{
              fontWeight: 300,
              fontSize: 'clamp(30px, 3.6vw, 48px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: 0,
            }}>
              <span style={{ display: 'block' }}>Real money,</span>
              <span style={{ display: 'block', color: 'var(--ink-30)' }}>for real life.</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.7, maxWidth: 340, margin: 0 }}>
              Draw USDC against your score and put it to work. No selling, no taxable event, no waiting.
            </p>
          </Reveal>

          <UseCaseGrid />
        </div>
      </section>

      {/* Principles */}
      <section className="principles-section" style={{
        borderTop: '1px solid var(--hairline-soft)',
        padding: '0 32px',
      }}>
        <div className="split-grid" style={{
          ...frame,
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          alignItems: 'stretch',
        }}>
          <Reveal className="pad-cell" style={{ padding: '88px 56px' }}>
            <h2 style={{
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.12,
              marginBottom: 20,
            }}>
              Boring credit,{' '}
              <span style={{ color: 'var(--ink-30)' }}>done right.</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.7, maxWidth: 340 }}>
              Clear rules. Honest data. Nothing you have to babysit.
            </p>
          </Reveal>

          <div className="principles-grid cell-divider" style={{
            borderLeft: '1px solid var(--hairline-soft)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.tag} delay={i * 70} className={i % 2 === 1 ? 'cell-divider' : ''} style={{
                display: 'flex',
                borderLeft: i % 2 === 1 ? '1px solid var(--hairline-soft)' : 'none',
                borderTop: i > 1 ? '1px solid var(--hairline-soft)' : 'none',
              }}>
                <div style={{ flex: 1, padding: '44px 32px 44px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
                  <PrincipleIcon index={i} />
                  <div>
                    <p className="eyebrow" style={{ fontSize: 10, color: 'var(--ink-45)', marginBottom: 10 }}>[ {p.tag} ]</p>
                    <h3 style={{ fontWeight: 500, fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1.3, margin: 0 }}>
                      {p.title}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" style={{
        borderTop: '1px solid var(--hairline-soft)',
        padding: '0 32px',
      }}>
        <div className="split-grid" style={{
          ...frame,
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          alignItems: 'stretch',
        }}>
          <Reveal className="pad-cell" style={{ padding: '88px 56px' }}>
            <h2 style={{
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              Frequently asked{' '}
              <span style={{ color: 'var(--ink-30)' }}>questions.</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.7, maxWidth: 360 }}>
              Everything you need to know before you apply. More detail lives in the whitepaper.
            </p>
          </Reveal>

          <Reveal delay={100} className="cell-divider pad-cell" style={{
            borderLeft: '1px solid var(--hairline-soft)',
            padding: '56px 56px 72px',
          }}>
            <div style={{ borderTop: '1px solid var(--hairline)' }}>
              {FAQS.map((faq, i) => (
                <FaqItem key={faq.question} faq={faq} index={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{
        background: 'var(--dark)',
        padding: '0 32px',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 90% at 50% 115%, rgba(107,95,255,0.16) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ ...frameDark, position: 'relative', padding: '120px 24px' }}>
          <Reveal>
            <h2 style={{
              fontWeight: 300,
              fontSize: 'clamp(30px, 3.8vw, 50px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              <span style={{ display: 'block', color: 'var(--dark-ink)' }}>Your history is your collateral.</span>
              <span style={{ display: 'block', color: 'var(--dark-ink-38)' }}>Borrow like it counts.</span>
            </h2>
            <p style={{
              fontSize: 15,
              color: 'var(--dark-ink-60)',
              lineHeight: 1.65,
              maxWidth: 440,
              margin: '0 auto 36px',
            }}>
              Stop locking up more than you borrow. Verify once, link your accounts, and open a credit line backed by your real score.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn-hover focus-ring-light" style={{
                ...btnBase,
                background: 'var(--dark-ink)',
                color: 'var(--ink)',
              }}>
                Apply now →
              </Link>
              <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="btn-hover focus-ring-light" style={{
                ...btnBase,
                background: 'transparent',
                color: 'var(--dark-ink)',
                border: '1px solid var(--dark-hairline)',
              }}>
                Read the whitepaper
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-root" style={{
        borderTop: '1px solid var(--hairline-soft)',
        padding: '0 32px',
        overflow: 'hidden',
      }}>
        <div className="footer-frame" style={{ ...frame, padding: '72px 56px 0' }}>
          <div className="footer-inner" style={{ display: 'flex', gap: 64, marginBottom: 72 }}>
            <div style={{ minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                <img src="/logo.png" alt="Nevra" style={{ width: 22, height: 22 }} />
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-45)', lineHeight: 1.6 }}>
                ©Nevra Inc. 2026<br />All rights reserved.
              </p>
            </div>
            <div className="footer-cols" style={{ display: 'flex', gap: 64, flex: 1, justifyContent: 'flex-end' }}>
              <FooterCol title="Product" links={[
                { label: 'Apply', href: '/apply', internal: true },
                { label: 'Whitepaper', href: '/pdf/whitepaper.pdf' },
                { label: 'Blog', href: '/blog', internal: true },
              ]} />
              <FooterCol title="Socials" links={[
                { label: 'Twitter', href: 'https://x.com/nevralabs' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nevralabs' },
                { label: 'Telegram', href: 'https://t.me/nevragenesis' },
                { label: 'Discord', href: 'https://discord.gg/XYfzRs9PM' },
              ]} />
              <FooterCol title="Legal" links={[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookie Policy', href: '#' },
              ]} />
            </div>
          </div>
        </div>
        <div className="footer-wordmark" style={{
          fontSize: 'clamp(80px, 14vw, 190px)',
          fontWeight: 600,
          letterSpacing: '-0.045em',
          color: 'rgba(13,37,61,0.07)',
          lineHeight: 0.82,
          textAlign: 'center',
          userSelect: 'none',
        }}>
          Nevra
        </div>
      </footer>
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
          padding: '22px 4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1.45 }}>
          {faq.question}
        </span>
        <span aria-hidden style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 17,
          fontWeight: 400,
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
          transition: 'grid-template-rows 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p style={{ padding: '0 40px 24px 4px', fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.7, margin: 0 }}>
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
      <p className="eyebrow" style={{ fontSize: 11, marginBottom: 18, color: 'var(--ink-45)' }}>{title}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {links.map(({ label, href, internal }) => (
          <li key={label}>
            {internal
              ? <Link to={href} className="footer-link" style={{ fontSize: 13.5, color: 'var(--ink-60)', fontWeight: 400, textDecoration: 'none' }}>{label}</Link>
              : <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 13.5, color: 'var(--ink-60)', fontWeight: 400 }}>{label}</a>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}
