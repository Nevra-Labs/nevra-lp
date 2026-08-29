import { useEffect, useRef, useState } from 'react'
import { ScoreGauge } from './motion'

/* Live product surfaces, with no card chrome of their own.
   APX drops a screenshot of its app into every feature card and into the How
   it works panel. We have no app to screenshot yet, so these stand in: real
   markup, animated on reveal, sized to whatever container hosts them. Titles
   and descriptions belong to the host card, never to the surface. */

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

/* The score arc, with its two inputs feeding in. */
export function ScoreSurface() {
  return (
    <div className="surface surface-gauge">
      <ScoreGauge />
    </div>
  )
}

/* Credit line with a utilisation bar that fills once seen. */
export function CreditLineSurface() {
  const [ref, shown] = useReveal()
  return (
    <div ref={ref} className="surface">
      <div className="bento-figure">
        <span className="bento-figure-value">$2,730</span>
        <span className="bento-figure-unit">limit</span>
      </div>
      <div className="bento-bar">
        <div className="bento-bar-fill" style={{ width: shown ? '31%' : '0%' }} />
      </div>
      <div className="bento-row">
        <span>$850 drawn</span>
        <span>$1,880 available</span>
      </div>
    </div>
  )
}

/* Repayments: the rate stepping down as the score climbs. */
const RATE_STEPS = [
  { label: 'On signup', score: 42, apr: '8.6%' },
  { label: 'After 3 on-time', score: 61, apr: '7.1%' },
  { label: 'Today', score: 78, apr: '5.8%', now: true },
]

export function RateSurface() {
  const [ref, shown] = useReveal()
  return (
    <ul ref={ref} className="surface bento-steps">
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
  )
}

/* Compliance gate. A line is not opened until identity and screening clear,
   so the step gets its own surface rather than a footnote on another one. */
const CHECKS = [
  { name: 'Identity verified', detail: 'Government ID · KYC', done: true },
  { name: 'Sanctions and PEP screening', detail: 'AML · cleared', done: true },
  { name: 'Credit line opened', detail: 'Unlocked on approval', done: false },
]

export function VerifySurface() {
  const [ref, shown] = useReveal()
  return (
    <ul ref={ref} className="surface bento-sources">
      {CHECKS.map((c, i) => (
        <li
          key={c.name}
          className={`bento-source ${shown ? 'is-shown' : ''}`}
          style={{ transitionDelay: `${i * 110}ms` }}
        >
          <span className={`bento-check ${c.done ? 'is-on' : 'is-pending'}`} aria-hidden>
            {c.done ? (
              <svg viewBox="0 0 14 14" width="11" height="11">
                <path d="M3 7.2 L6 10.2 L11 4.4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 14 14" width="11" height="11">
                <circle cx="7" cy="7" r="3" fill="currentColor" />
              </svg>
            )}
          </span>
          <span className="bento-source-name">{c.name}</span>
          <span className="bento-source-detail">{c.detail}</span>
        </li>
      ))}
    </ul>
  )
}

/* What Nevra reads, and what it never touches. */
const SOURCES = [
  { name: 'Payroll wallet', detail: '0x4f8a…9e2', on: true },
  { name: 'USDC salary', detail: 'Recurring · verified', on: true },
  { name: 'Custody of funds', detail: 'Never taken', on: false },
]

export function SourcesSurface() {
  const [ref, shown] = useReveal()
  return (
    <ul ref={ref} className="surface bento-sources">
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
  )
}
