import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import StepArt from '../components/StepArt'
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
    title: 'Connect your wallet',
    description: 'Link any wallet in one click. No forms, no delays. Your onchain history starts building your profile instantly.',
  },
  {
    title: 'Verify your identity',
    description: 'Complete KYC and link your bank account. We combine your offchain financial data with your onchain history into one real credit score.',
  },
  {
    title: 'Access your credit line',
    description: 'Post less than you borrow. Your score unlocks a credit line you can draw from anytime, no overcollateral, no waiting.',
  },
]

export default function Home() {
  const [navDark, setNavDark] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavDark(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinkColor = navDark ? '#111' : 'rgba(255,255,255,0.85)'
  const logoFilter = navDark ? 'none' : 'invert(1)'
  const applyBg = navDark ? '#111' : '#EEEDFF'
  const applyColor = navDark ? '#EEEDFF' : '#333'

  return (
    <div style={{ fontFamily: "'Onest', 'Inter', system-ui, sans-serif" }}>
      {/* Fixed fullscreen video */}
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />

      {/* Nav lives at root level so zIndex is not trapped in a stacking context */}
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 32px',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: navDark ? 'rgba(238,237,255,0.92)' : 'transparent',
        backdropFilter: navDark ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: navDark ? 'blur(16px)' : 'none',
        borderBottom: navDark ? '1px solid rgba(0,0,0,0.09)' : '1px solid transparent',
      }}>
        <Link to="/">
          <img src="/logo.png" alt="Nevra" style={{ width: 24, height: 24, display: 'block', filter: logoFilter, transition: 'filter 0.3s ease' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link to="/blog" className="nav-text-links" style={{ fontSize: 14, fontWeight: 500, color: navLinkColor, letterSpacing: '0.01em', transition: 'color 0.3s ease' }}>
            Blog
          </Link>
          <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="nav-text-links" style={{ fontSize: 14, fontWeight: 500, color: navLinkColor, letterSpacing: '0.01em', transition: 'color 0.3s ease' }}>
            Whitepaper
          </a>
          <Link to="/apply" className={`btn-hover focus-ring ${navDark ? 'key-dark' : 'key-light'}`} style={{
            background: applyBg,
            color: applyColor,
            fontSize: 14,
            fontWeight: 500,
            padding: '9px 18px',
            borderRadius: 10,
            lineHeight: 1,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}>
            Apply
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <section style={{ position: 'relative', minHeight: '100vh', zIndex: 5 }}>
        <div className="hero-copy" style={{
          position: 'absolute',
          top: '36%',
          transform: 'translateY(-50%)',
          left: '10%',
          maxWidth: 560,
          color: '#EEEDFF',
        }}>
          <h1 className="enter-up" style={{
            fontWeight: 500,
            fontSize: 'clamp(32px, 4.2vw, 58px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            textShadow: '0 1px 6px rgba(0,0,0,0.25)',
          }}>
            Consumer loans<br />for crypto-native people.
          </h1>
          <p className="enter-up enter-delay-2" style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'rgba(238,237,255,0.72)',
            marginBottom: 28,
            textShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}>
            Verify your identity, connect your bank and wallet, and get one real credit score from your entire financial life. Then borrow against it.
          </p>
          <div className="hero-ctas enter-up enter-delay-3" style={{ display: 'flex', gap: 10 }}>
            <Link to="/apply" className="btn-hover focus-ring-light key-light" style={{
              background: '#EEEDFF',
              color: '#333',
              fontSize: 14,
              fontWeight: 500,
              padding: '11px 20px',
              borderRadius: 10,
              lineHeight: 1,
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            }}>
              Apply Now →
            </Link>
            <Link to="/blog" className="btn-hover focus-ring-light" style={{
              background: 'rgba(255,255,255,0.14)',
              color: '#EEEDFF',
              fontSize: 14,
              fontWeight: 500,
              padding: '11px 20px',
              borderRadius: 10,
              lineHeight: 1,
              border: '1px solid rgba(255,255,255,0.22)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}>
              Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Built with logo carousel */}
      <section className="built-with-section" style={{
        position: 'relative',
        zIndex: 15,
        background: '#EEEDFF',
        padding: '56px 0',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>
        <p style={{
          textAlign: 'center',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(0,0,0,0.35)',
          marginBottom: 36,
        }}>
          Built with
        </p>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ pointerEvents: 'none', position: 'absolute', left: 0, top: 0, bottom: 0, width: 96, zIndex: 2, background: 'linear-gradient(to right, #EEEDFF, transparent)' }} />
          <div aria-hidden style={{ pointerEvents: 'none', position: 'absolute', right: 0, top: 0, bottom: 0, width: 96, zIndex: 2, background: 'linear-gradient(to left, #EEEDFF, transparent)' }} />
          <div className="logo-track">
            {[0, 1].map(half => (
              <div key={half} aria-hidden={half === 1} className="logo-track-half" style={{ display: 'flex', alignItems: 'center', gap: 72, paddingRight: 72 }}>
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
                        opacity: 0.32,
                      }}
                    />
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section className="problem-section" style={{
        position: 'relative',
        zIndex: 15,
        background: 'radial-gradient(120% 130% at 50% 0%, #17123a 0%, #0c0a24 55%, #070614 100%)',
        padding: '120px 32px 110px',
        overflow: 'hidden',
      }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{
            fontWeight: 500,
            fontSize: 'clamp(30px, 4vw, 52px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.12,
            margin: 0,
          }}>
            <span style={{ display: 'block', color: '#EEEDFF' }}>Your wallet can't vouch for you.</span>
            <span style={{ display: 'block', color: 'rgba(238,237,255,0.38)' }}>Lenders can't read it.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <svg
            viewBox="0 0 1000 380"
            style={{ display: 'block', width: '100%', maxWidth: 900, margin: '0 auto' }}
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
                  <g fontFamily="inherit" fontSize="15" fill="rgba(238,237,255,0.55)" textAnchor="middle" stroke="none">
                    <text x="178" y="340">Your onchain history</text>
                    <text x="822" y="340">Lender capital</text>
                    <text x="500" y="235" fill="rgba(238,237,255,0.8)">No shared credit score</text>
                  </g>
                </g>
              )
            })()}
          </svg>
        </Reveal>

        <Reveal delay={200} style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: 'rgba(238,237,255,0.6)',
            maxWidth: 480,
            margin: '0 auto',
          }}>
            Years of onchain behavior, invisible to every lender. So everyone gets the same deal: lock up more than you borrow. Nevra is the score in between.
          </p>
        </Reveal>
      </section>

      {/* How it works section */}
      <section className="how-it-works-section" style={{
        position: 'relative',
        zIndex: 15,
        background: '#EEEDFF',
        padding: '120px 52px 140px',
      }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{
            fontWeight: 500,
            fontSize: 'clamp(28px, 3.6vw, 46px)',
            letterSpacing: '-0.02em',
            color: '#111',
            marginBottom: 16,
            lineHeight: 1.08,
          }}>
            How it works
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto' }}>
            From wallet to credit line in three steps.
          </p>
        </Reveal>

        <div className="how-it-works-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          maxWidth: 960,
          margin: '0 auto',
        }}>
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 90} style={{ display: 'flex' }}>
            <div style={{
              flex: 1,
              background: '#fff',
              borderRadius: 16,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)',
              padding: '32px 28px 36px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 400,
            }}>
              <div style={{ height: 170, borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
                <StepArt variant={i} />
              </div>
              <h3 style={{
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: '-0.015em',
                color: '#111',
                marginBottom: 10,
                lineHeight: 1.3,
              }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.48)', lineHeight: 1.7, margin: 0 }}>
                {step.description}
              </p>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ section */}
      <section className="faq-section" style={{
        position: 'relative',
        zIndex: 15,
        background: '#EEEDFF',
        padding: '0 52px 140px',
      }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{
            fontWeight: 500,
            fontSize: 'clamp(28px, 3.6vw, 46px)',
            letterSpacing: '-0.02em',
            color: '#111',
            marginBottom: 16,
            lineHeight: 1.08,
          }}>
            Questions, answered
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto' }}>
            Everything you need to know before you apply.
          </p>
        </Reveal>

        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 60}>
              <FaqItem faq={faq} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-section" style={{
        position: 'relative',
        zIndex: 15,
        background: '#EEEDFF',
        padding: '0 52px 140px',
      }}>
        <Reveal>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          background: '#111',
          borderRadius: 24,
          padding: '80px 32px',
          textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div aria-hidden style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% -20%, rgba(238,237,255,0.18) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <h2 style={{
              fontWeight: 500,
              fontSize: 'clamp(28px, 3.6vw, 46px)',
              letterSpacing: '-0.02em',
              color: '#EEEDFF',
              lineHeight: 1.08,
              marginBottom: 16,
            }}>
              Your history is your collateral.
            </h2>
            <p style={{
              fontSize: 15,
              color: 'rgba(238,237,255,0.6)',
              lineHeight: 1.6,
              maxWidth: 460,
              margin: '0 auto 32px',
            }}>
              Stop locking up more than you borrow. Verify once, link your accounts, and open a credit line backed by your real score.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/apply" className="btn-hover focus-ring-light key-light" style={{
                background: '#EEEDFF',
                color: '#333',
                fontSize: 14,
                fontWeight: 500,
                padding: '13px 24px',
                borderRadius: 10,
                lineHeight: 1,
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}>
                Apply Now →
              </Link>
              <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="btn-hover focus-ring-light" style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#EEEDFF',
                fontSize: 14,
                fontWeight: 500,
                padding: '13px 24px',
                borderRadius: 10,
                lineHeight: 1,
                border: '1px solid rgba(255,255,255,0.18)',
              }}>
                Read the whitepaper
              </a>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="footer-root" style={{
        position: 'relative',
        zIndex: 15,
        background: '#EEEDFF',
        color: '#111',
        padding: '64px 52px 0',
        overflow: 'hidden',
      }}>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: 52 }}>
          <div className="footer-inner" style={{ display: 'flex', gap: 64, marginBottom: 64 }}>
            <div style={{ minWidth: 200 }}>
              <div style={{ marginBottom: 12 }}>
                <img src="/logo.png" alt="" style={{ width: 22, height: 22 }} />
              </div>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.5 }}>
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
          fontSize: 'clamp(80px, 14vw, 180px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'rgba(0,0,0,0.08)',
          lineHeight: 0.85,
          marginLeft: '-0.03em',
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
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
      overflow: 'hidden',
    }}>
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
          padding: '20px 24px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', color: '#111', lineHeight: 1.4 }}>
          {faq.question}
        </span>
        <span aria-hidden style={{
          fontSize: 18,
          fontWeight: 400,
          color: 'rgba(0,0,0,0.4)',
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
          <p style={{ padding: '0 24px 22px', fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, margin: 0 }}>
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
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: '#111' }}>{title}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map(({ label, href, internal }) => (
          <li key={label}>
            {internal
              ? <Link to={href} className="footer-link" style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', fontWeight: 400, textDecoration: 'none' }}>{label}</Link>
              : <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', fontWeight: 400 }}>{label}</a>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}
