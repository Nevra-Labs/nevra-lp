import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../responsive.css'

const PARTNER_LOGOS = [
  { name: 'Plaid', src: '/logos/plaid_logo.svg' },
  { name: 'Alchemy', src: '/logos/alchemy_logo.svg' },
  { name: 'Helius', src: '/logos/helius_logo.svg' },
  { name: 'FairScale', src: '/logos/fairscale_logo.svg' },
]

const FAQS = [
  {
    question: 'How is my credit score calculated?',
    answer: 'Your score blends your onchain history — wallet age, repayment behavior, protocol activity — with offchain signals from your linked bank account. Both sides count, so a thin file on one can be carried by the other.',
  },
  {
    question: 'Do I really borrow more than I post?',
    answer: 'Yes. That is the whole point. Instead of locking 150% collateral to borrow 100, your score qualifies you for a credit line where the collateral you post is a fraction of what you can draw.',
  },
  {
    question: 'What do you do with my bank data?',
    answer: 'We read balances and cash-flow history to score you — nothing else. Bank access is read-only, handled through Plaid, and we never see your credentials. Your keys stay yours; we never take custody of your wallet.',
  },
  {
    question: 'What happens if I miss a payment?',
    answer: 'Your rate and available credit adjust before anything drastic happens. Missed payments lower your Nevra score first; liquidation of posted collateral is the last resort, not the first.',
  },
  {
    question: 'When can I get access?',
    answer: 'We are onboarding in cohorts. Apply now, finish verification, and you will be scored and placed in the next cohort — early applicants get priority.',
  },
]

const STEPS = [
  {
    title: 'Connect your wallet',
    description: 'Link any wallet in one click. No forms, no delays. Your onchain history starts building your profile instantly.',
    image: '/cards/wallet.png',
  },
  {
    title: 'Verify your identity',
    description: 'Complete KYC and link your bank account. We combine your offchain financial data with your onchain history into one real credit score.',
    image: '/cards/score.png',
  },
  {
    title: 'Access your credit line',
    description: 'Post less than you borrow. Your score unlocks a credit line you can draw from anytime, no overcollateral, no waiting.',
    image: '/cards/credit.png',
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
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Fixed fullscreen video */}
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />

      {/* Nav — at root level so zIndex is not trapped in a stacking context */}
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
          <Link to="/apply" style={{
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
          <h1 style={{
            fontWeight: 600,
            fontSize: 'clamp(28px, 3.4vw, 48px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: 16,
            textShadow: '0 1px 6px rgba(0,0,0,0.25)',
          }}>
            Consumer loans<br />for crypto-native people.
          </h1>
          <p style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'rgba(238,237,255,0.72)',
            marginBottom: 28,
            textShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}>
            Nevra is real undercollateralized credit for crypto. Connect your wallet, verify your identity, get scored, borrow against it.
          </p>
          <div className="hero-ctas" style={{ display: 'flex', gap: 10 }}>
            <Link to="/apply" style={{
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
            <Link to="/blog" style={{
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

      {/* Built with — logo carousel */}
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

      {/* How it works section */}
      <section className="how-it-works-section" style={{
        position: 'relative',
        zIndex: 15,
        background: '#EEEDFF',
        padding: '120px 52px 140px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(26px, 3.5vw, 42px)',
            letterSpacing: '-0.025em',
            color: '#111',
            marginBottom: 16,
            lineHeight: 1.1,
            textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
          }}>
            How it works
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto' }}>
            From wallet to credit line in three steps.
          </p>
        </div>

        <div className="how-it-works-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          maxWidth: 960,
          margin: '0 auto',
        }}>
          {STEPS.map(step => (
            <div key={step.title} style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)',
              padding: '32px 28px 36px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 400,
            }}>
              <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
                <img src={step.image} alt={step.title} style={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }} />
              </div>
              <h3 style={{
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: '-0.015em',
                color: '#111',
                marginBottom: 10,
                lineHeight: 1.3,
                textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
              }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.48)', lineHeight: 1.7, margin: 0 }}>
                {step.description}
              </p>
            </div>
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
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(26px, 3.5vw, 42px)',
            letterSpacing: '-0.025em',
            color: '#111',
            marginBottom: 16,
            lineHeight: 1.1,
            textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
          }}>
            Questions, answered
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6, maxWidth: 440, margin: '0 auto' }}>
            Everything you need to know before you apply.
          </p>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
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
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.5vw, 42px)',
              letterSpacing: '-0.025em',
              color: '#EEEDFF',
              lineHeight: 1.1,
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
              Stop locking up more than you borrow. Connect a wallet, get scored, and open a real credit line.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/apply" className="focus-ring-light" style={{
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
              <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="focus-ring-light" style={{
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
        className="focus-ring"
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
              ? <Link to={href} style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', fontWeight: 400, textDecoration: 'none' }}>{label}</Link>
              : <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', fontWeight: 400 }}>{label}</a>
            }
          </li>
        ))}
      </ul>
    </div>
  )
}
