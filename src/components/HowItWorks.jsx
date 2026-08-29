import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ScoreSurface, CreditLineSurface, SourcesSurface, VerifySurface } from './surfaces'

/* apxlending.com's "How it works?" block, measured at 1440x900:
   a 408px copy column beside an 834px panel, 20px apart, the copy column
   stacking heading and accordion 78px apart. Each step is a 1px #EFEFEF rule
   with a progress line that fills over 10s before advancing to the next.

   Theirs swaps a screenshot of the app per step. Ours swaps the live surface
   that step actually produces: what we read, the score it resolves to, and
   the line that score opens. */

const STEPS = [
  {
    title: 'Connect your payroll wallet',
    body: 'Link the wallet your USDC or USDT salary arrives in. Read-only and non-custodial: we never hold your keys.',
    Surface: SourcesSurface,
  },
  {
    title: 'Clear KYC and AML checks',
    body: 'Verify your identity once and pass sanctions screening. No line is opened before those checks clear, and you only do it the first time.',
    Surface: VerifySurface,
  },
  {
    title: 'Get scored on recurring inflows',
    body: 'We read steady payroll, its amount, frequency and consistency, and resolve it into one underwritable number. No FICO file.',
    Surface: ScoreSurface,
  },
  {
    title: 'Draw and repay from payday',
    body: 'Your score sets your limit and rate. Draw against it anytime and settle from your next onchain paycheck.',
    Surface: CreditLineSurface,
  },
]

const DWELL_MS = 9000

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  // Paused until the block is on screen, so the first step isn't already
  // spent by the time anyone scrolls to it.
  const [running, setRunning] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.3 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!running) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setActive(i => (i + 1) % STEPS.length), DWELL_MS)
    return () => clearTimeout(t)
  }, [active, running])

  const ActiveSurface = STEPS[active].Surface

  return (
    <section id="how-it-works" className="section">
      <div className="shell">
        <div className="how-wrapper" ref={wrapRef}>
          <div className="how-content">
            <h2 className="display-sm">How it works?</h2>

            <div className="how-accordion">
              {STEPS.map((step, i) => (
                <div key={step.title} className={`how-item ${i === active ? 'is-open' : ''}`}>
                  <div className="how-rule">
                    <div
                      className="how-rule-fill"
                      style={{
                        width: i === active && running ? '100%' : '0%',
                        transitionDuration: i === active && running ? `${DWELL_MS}ms` : '0ms',
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    className="how-item-title focus-ring"
                    aria-expanded={i === active}
                    onClick={() => setActive(i)}
                  >
                    {step.title}
                  </button>

                  <div className="how-item-body">
                    <div className="how-item-body-inner">
                      <p className="how-item-text">{step.body}</p>
                      <Link to="/apply" className="btn btn-primary focus-ring-light how-item-cta">
                        Apply now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="how-panel">
            {/* Keyed so the surface remounts and replays its reveal per step. */}
            <div className="how-panel-inner" key={active}>
              <ActiveSurface />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
