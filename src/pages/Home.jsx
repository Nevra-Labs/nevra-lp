import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ShieldCheck, KeyRound, TrendingUp, Umbrella, Wallet, ScanFace, Gauge, Home as HomeIcon, Briefcase, ChartLine, Sparkles } from 'lucide-react'
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
    title: 'Connect your wallet',
    description: 'Link any wallet in one click. No forms, no delays. Your onchain history starts building your profile instantly.',
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
    Icon: HomeIcon,
  },
  {
    tag: 'BUSINESS',
    title: 'Start something',
    description: 'Fund your company or side project while your portfolio keeps working.',
    Icon: Briefcase,
  },
  {
    tag: 'INVESTING',
    title: 'Stay in the market',
    description: 'Seize opportunities without triggering a taxable sale.',
    Icon: ChartLine,
  },
  {
    tag: 'MILESTONES',
    title: 'Big moments',
    description: 'Finance a car, a move, or a wedding at a rate your score earned.',
    Icon: Sparkles,
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
        background: 'var(--surface)',
        border: '1px solid var(--hairline)',
        borderRadius: 8,
        boxShadow: '0 24px 48px -24px rgba(13,37,61,0.18), 0 2px 6px rgba(13,37,61,0.05)',
        padding: '22px 24px 20px',
        maxWidth: 380,
        margin: '0 auto',
      }}>
        <div style={{ ...row, alignItems: 'center', marginBottom: 22 }}>
          <span className="eyebrow" style={{ color: 'var(--ink-45)', fontSize: 11 }}>Nevra score</span>
          <span className="eyebrow" style={{
            color: 'var(--ink-60)',
            fontSize: 10,
            border: '1px solid var(--hairline)',
            borderRadius: 99,
            padding: '4px 9px',
          }}>
            Active
          </span>
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
            <p className="eyebrow enter-up" style={{ color: 'var(--ink)', marginBottom: 26 }}>
              [ Consumer credit protocol ]
            </p>
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

      {/* Problem */}
      <section className="problem-section" style={{
        background: 'var(--dark)',
        padding: '0 32px',
        overflow: 'hidden',
      }}>
        <div style={{ ...frameDark, padding: '120px 24px 104px' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 20 }}>
            <p className="eyebrow" style={{ color: 'var(--dark-ink-60)', marginBottom: 24 }}>/ The problem</p>
            <h2 style={{
              fontWeight: 300,
              fontSize: 'clamp(30px, 3.8vw, 50px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: 0,
            }}>
              <span style={{ display: 'block', color: 'var(--dark-ink)' }}>Your wallet can't vouch for you.</span>
              <span style={{ display: 'block', color: 'var(--dark-ink-38)' }}>Lenders can't read it.</span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <svg
              viewBox="0 0 1000 380"
              style={{ display: 'block', width: '100%', maxWidth: 880, margin: '0 auto' }}
              role="img"
              aria-label="Diagram: onchain history and lender capital exist as two disconnected pools with no credit score between them"
            >
              {(() => {
                const line = 'rgba(201,198,240,0.35)'
                const lineSoft = 'rgba(201,198,240,0.18)'
                const accent = '#c9c6f0'
                return (
                  <g fill="none" strokeWidth="1.2">
                    {/* Left cylinder: onchain history */}
                    <ellipse cx="120" cy="190" rx="42" ry="110" stroke={lineSoft} />
                    <ellipse cx="155" cy="190" rx="42" ry="110" stroke={lineSoft} />
                    <ellipse cx="190" cy="190" rx="42" ry="110" stroke={line} />
                    <path d="M120 80 H235 M120 300 H235" stroke={lineSoft} />
                    <ellipse cx="235" cy="190" rx="42" ry="110" stroke={accent} strokeOpacity="0.7" strokeDasharray="3 6" fill="rgba(201,198,240,0.04)" />

                    {/* Right cylinder: lender capital, with liquidity dots */}
                    <ellipse cx="880" cy="190" rx="42" ry="110" stroke={lineSoft} />
                    <path d="M765 80 H880 M765 300 H880" stroke={lineSoft} />
                    <ellipse cx="765" cy="190" rx="42" ry="110" stroke={accent} strokeOpacity="0.7" strokeDasharray="3 6" fill="rgba(201,198,240,0.04)" />
                    <g fill={accent}>
                      <circle cx="775" cy="140" r="3" opacity="0.85" />
                      <circle cx="800" cy="180" r="2.5" opacity="0.5" />
                      <circle cx="762" cy="225" r="3.5" opacity="0.9" />
                      <circle cx="820" cy="240" r="2.5" opacity="0.6" />
                      <circle cx="845" cy="160" r="3" opacity="0.75" />
                      <circle cx="838" cy="205" r="2" opacity="0.45" />
                      <circle cx="790" cy="265" r="2" opacity="0.55" />
                      <circle cx="862" cy="130" r="2" opacity="0.4" />
                    </g>

                    {/* Broken link */}
                    <path d="M280 190 H375" stroke={line} />
                    <path d="M625 190 H720" stroke={line} />
                    <path d="M410 190 H590" stroke={line} strokeDasharray="10 12" />
                    <circle cx="392" cy="190" r="9" stroke={accent} strokeOpacity="0.8" />
                    <path d="M387.5 185.5 l9 9 M396.5 185.5 l-9 9" stroke={accent} strokeOpacity="0.8" />
                    <circle cx="608" cy="190" r="9" stroke={accent} strokeOpacity="0.8" />
                    <path d="M603.5 185.5 l9 9 M612.5 185.5 l-9 9" stroke={accent} strokeOpacity="0.8" />

                    {/* Labels */}
                    <g fontFamily="'IBM Plex Mono', monospace" fontSize="14" fill="rgba(238,237,255,0.55)" textAnchor="middle" stroke="none">
                      <text x="178" y="340">YOUR ONCHAIN HISTORY</text>
                      <text x="822" y="340">LENDER CAPITAL</text>
                      <text x="500" y="235" fill="rgba(238,237,255,0.8)">NO SHARED CREDIT SCORE</text>
                    </g>
                  </g>
                )
              })()}
            </svg>
          </Reveal>

          <Reveal delay={200} style={{ textAlign: 'center', marginTop: 36 }}>
            <p style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: 'var(--dark-ink-60)',
              maxWidth: 480,
              margin: '0 auto',
            }}>
              Years of onchain behavior, invisible to every lender. So everyone gets the same deal: lock up more than you borrow. Nevra is the score in between.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works-section" style={{ padding: '0 32px' }}>
        <div style={frame}>
          <Reveal className="pad-cell" style={{ padding: '88px 56px 56px' }}>
            <p className="eyebrow" style={{ color: 'var(--ink)', marginBottom: 22 }}>/ How it works</p>
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

      {/* Use cases — Stripe-style feature cards with placeholder art */}
      <section className="usecases-section" style={{
        borderTop: '1px solid var(--hairline-soft)',
        background: 'var(--paper-soft)',
        padding: '0 32px',
      }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '96px 0 104px' }}>
          <Reveal style={{ marginBottom: 56 }}>
            <p className="eyebrow" style={{ color: 'var(--ink)', marginBottom: 22 }}>/ Use cases</p>
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
          </Reveal>

          <div className="usecases-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}>
            {USE_CASES.map(({ tag, title, description, Icon }, i) => (
              <Reveal key={tag} delay={i * 70}>
                <div className="usecase-card" style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,55,112,0.08)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Placeholder image area */}
                  <div aria-hidden style={{
                    aspectRatio: '3 / 2',
                    background: 'linear-gradient(135deg, #F6F9FC 0%, #EAEFF5 60%, #E3E8EE 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid var(--hairline-soft)',
                  }}>
                    <Icon size={30} strokeWidth={1.4} color="var(--ink-30)" />
                  </div>
                  <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    <p className="eyebrow" style={{ fontSize: 10, color: 'var(--ink-45)', margin: 0 }}>[ {tag} ]</p>
                    <h3 style={{ fontWeight: 500, fontSize: 18, letterSpacing: '-0.015em', lineHeight: 1.3, margin: 0 }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: 14.5, color: 'var(--ink-60)', lineHeight: 1.55, margin: 0 }}>
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
            <p className="eyebrow" style={{ color: 'var(--ink)', marginBottom: 22 }}>/ What you get</p>
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
            <p className="eyebrow" style={{ color: 'var(--ink)', marginBottom: 22 }}>/ FAQ</p>
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
            <p className="eyebrow" style={{ color: 'var(--dark-ink-60)', marginBottom: 26 }}>[ Early access ]</p>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                <img src="/logo.png" alt="" style={{ width: 20, height: 20 }} />
                <span style={{ fontSize: 15, fontWeight: 600 }}>Nevra</span>
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
