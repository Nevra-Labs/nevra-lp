import { useState } from 'react'
import { Link } from 'react-router-dom'

/* apxlending.com's calculator card, measured: 560x350, #FBFBFB, 16px radius,
   24px padding, 16px between rows. Theirs takes a collateral amount; ours
   takes the onchain payroll score, because that is what underwrites the line.
   Score runs 0-100 and the line tops out at $3,500. Illustrative, not a quote. */

const MAX_LINE = 3500

function quote(score) {
  const line = Math.round((MAX_LINE * score) / 100 / 10) * 10
  const apr = 12 - (8 * score) / 100
  const term = score >= 70 ? 'Up to 6 mo' : score >= 40 ? 'Up to 3 mo' : 'Up to 6 wks'
  return { line, apr, term }
}

export default function LoanCalculator() {
  const [score, setScore] = useState(78)
  const { line, apr, term } = quote(score)

  return (
    <section id="calculator" className="calc-section" aria-labelledby="calc-heading">
      <div className="calc-headline-band">
        <p className="calc-eyebrow">Loan calculator</p>
        <h2 id="calc-heading" className="calc-headline">
          See what your payroll unlocks
        </h2>
      </div>

      <div className="calc-panel">
        <div className="calc-card">
          <div className="calc-field">
            <div className="calc-field-head">
              <label htmlFor="calc-score" className="calc-field-label">My onchain score</label>
              <span className="calc-field-hint">0 to 100</span>
            </div>

            <div className="calc-input">
              <span className="calc-input-value">
                {score}
                <span className="calc-input-unit">/ 100</span>
              </span>
              <input
                id="calc-score"
                type="range"
                min="0"
                max="100"
                step="1"
                value={score}
                onChange={e => setScore(Number(e.target.value))}
                className="calc-range focus-ring"
                aria-label="Onchain payroll score"
              />
            </div>
          </div>

          <div className="calc-output">
            <p className="calc-output-title">I can borrow up to</p>
            <div className="calc-output-row">
              <div className="calc-output-box">
                <p className="calc-output-label">Credit line</p>
                <p className="calc-output-value">${line.toLocaleString('en-US')}</p>
              </div>
              <div className="calc-output-box">
                <p className="calc-output-label">Term</p>
                <p className="calc-output-value">{term}</p>
              </div>
              <div className="calc-output-box">
                <p className="calc-output-label">Rate from</p>
                <p className="calc-output-value">{apr.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <Link to="/apply" className="calc-cta focus-ring">Apply now</Link>
        </div>
      </div>
    </section>
  )
}
