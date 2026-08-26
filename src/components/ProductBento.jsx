import { useEffect, useRef, useState } from 'react'
import { ScoreGauge } from './motion'

/* Product showcase, built on the pattern ui.shadcn.com uses below its hero:
   instead of describing the product, show real surfaces from it in a bento of
   bordered cards. Card chrome follows the same references — hairline border,
   restrained radius, no drop shadows, content doing the work. */

function useReveal(threshold = 0.3) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); o.disconnect() }
    }, { threshold })
    o.observe(el)
    return () => o.disconnect()
  }, [threshold])
  return [ref, shown]
}

/* Credit line with a utilisation bar that fills once seen. */
function CreditLineCard() {
  const [ref, shown] = useReveal()
  return (
    <div ref={ref} className="bento-card">
      <p className="bento-title">Credit line</p>
      <p className="bento-note">Draw any part of it, any time.</p>

      <div className="bento-figure">
        <span className="bento-figure-value">$6,000</span>
        <span className="bento-figure-unit">limit</span>
      </div>

      <div className="bento-bar">
        <div className="bento-bar-fill" style={{ width: shown ? '21%' : '0%' }} />
      </div>
      <div className="bento-row">
        <span>$1,250 drawn</span>
        <span>$4,750 available</span>
      </div>
    </div>
  )
}

/* Repayments: the rate stepping down as the score climbs. */
const RATE_STEPS = [
  { label: 'On signup', score: 690, apr: '10.4%' },
  { label: 'After 3 on-time', score: 718, apr: '8.9%' },
  { label: 'Today', score: 742, apr: '7.25%', now: true },
]

function RateCard() {
  const [ref, shown] = useReveal()
  return (
    <div ref={ref} className="bento-card">
      <p className="bento-title">Your rate</p>
      <p className="bento-note">Every repayment moves it down.</p>

      <ul className="bento-steps">
        {RATE_STEPS.map((s, i) => (
          <li
            key={s.label}
            className={`bento-step ${s.now ? 'is-now' : ''} ${shown ? 'is-shown' : ''}`}
            style={{ transitionDelay: `${i * 110}ms` }}
          >
            <span className="bento-step-dot" aria-hidden />
            <span className="bento-step-label">{s.label}</span>
            <span className="bento-step-score">{s.score}</span>
            <span className="bento-step-apr">{s.apr}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* What Nevra reads, and what it never touches. */
const SOURCES = [
  { name: 'Wallets', detail: '0x4f8a…9e2 + 3 more', on: true },
  { name: 'Bank account', detail: 'Checking ••4821', on: true },
  { name: 'Custody of funds', detail: 'Never taken', on: false },
]

function SourcesCard() {
  const [ref, shown] = useReveal()
  return (
    <div ref={ref} className="bento-card">
      <p className="bento-title">What we read</p>
      <p className="bento-note">Read-only, and never your keys.</p>

      <ul className="bento-sources">
        {SOURCES.map((s, i) => (
          <li
            key={s.name}
            className={`bento-source ${shown ? 'is-shown' : ''}`}
            style={{ transitionDelay: `${i * 110}ms` }}
          >
            <span className={`bento-check ${s.on ? 'is-on' : 'is-off'}`} aria-hidden>
              {s.on ? (
                <svg viewBox="0 0 14 14" width="11" height="11">
                  <path d="M3 7.2 L6 10.2 L11 4.4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 14 14" width="11" height="11">
                  <path d="M4 4 L10 10 M10 4 L4 10" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
              )}
            </span>
            <span className="bento-source-name">{s.name}</span>
            <span className="bento-source-detail">{s.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProductBento() {
  return (
    <div className="bento">
      <div className="bento-card bento-card-wide">
        <p className="bento-title">Nevra score</p>
        <p className="bento-note">Wallet history and bank cash flow, resolved into one number.</p>
        <div className="bento-gauge">
          <ScoreGauge />
        </div>
      </div>

      <CreditLineCard />
      <RateCard />
      <SourcesCard />
    </div>
  )
}
