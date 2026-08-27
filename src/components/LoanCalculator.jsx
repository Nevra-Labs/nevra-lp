import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Percent, Wallet, ChevronDown, ArrowRight } from 'lucide-react'

// Settlement tokens. Both are dollar-pegged, so there is no FX rate to apply:
// the same line, settled in whichever token the borrower wants.
const TOKENS = [
  { code: 'USDC', tint: '#2775CA' },
  { code: 'USDT', tint: '#009393' },
]

// Nevra score band. Below FLOOR there is no line yet; the hero gauge sits at
// 742, which is also where the slider starts so the section opens on a real
// number instead of zero.
const SCORE_MIN = 300
const SCORE_MAX = 850
const SCORE_FLOOR = 550
const SCORE_START = 742

/* Everything the score decides, in one place.
   Credit grows faster at the top of the band, so the curve is mildly convex;
   APR and the collateral requirement fall off linearly. */
function quote(score) {
  if (score < SCORE_FLOOR) {
    return { eligible: false, line: 0, apr: null, collateralPct: null }
  }
  const t = (score - SCORE_FLOOR) / (SCORE_MAX - SCORE_FLOOR)
  return {
    eligible: true,
    line: Math.round((1000 + Math.pow(t, 1.6) * 24000) / 100) * 100,
    apr: 13.5 - t * 7,
    collateralPct: Math.round((1 - t) * 50),
  }
}

/* Token pill: circular mark + code + chevron, opens a small menu. */
function TokenSelect({ selected, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = e => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex', verticalAlign: 'middle' }}>
      <button
        type="button"
        className="calc-token focus-ring"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Change settlement token, currently ${selected.code}`}
        onClick={() => setOpen(v => !v)}
      >
        <span className="calc-mark" style={{ background: selected.tint }} aria-hidden="true">$</span>
        <span className="calc-token-code">{selected.code}</span>
        <ChevronDown size={18} strokeWidth={1.8} style={{ color: 'var(--ink-30)', flexShrink: 0 }} />
      </button>

      {open && (
        <div className="calc-menu fade-up" role="listbox">
          {TOKENS.map(opt => (
            <button
              key={opt.code}
              type="button"
              role="option"
              aria-selected={opt.code === selected.code}
              className="calc-menu-item"
              onClick={() => { onSelect(opt); setOpen(false) }}
            >
              <span className="calc-mark" style={{ background: opt.tint }} aria-hidden="true">$</span>
              <span style={{ fontWeight: opt.code === selected.code ? 600 : 400 }}>{opt.code}</span>
            </button>
          ))}
        </div>
      )}
    </span>
  )
}

/* SCORE reads as a token for rhythm with the token pill, but there is
   nothing to choose — it is a span, has no chevron, and does not react. */
function ScoreToken() {
  return (
    <span className="calc-token calc-token-static">
      <span className="calc-mark calc-mark-score" aria-hidden="true">
        <svg viewBox="0 0 24 24" style={{ width: '72%', height: '72%', display: 'block' }}>
          <path d="M 4.5 16.5 A 7.5 7.5 0 0 1 19.5 16.5" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1.9" fill="#FFFFFF" />
        </svg>
      </span>
      <span className="calc-token-code">SCORE</span>
    </span>
  )
}

/* Labelled slider row: caption, big value, unit, track. */
function SliderRow({ label, display, unit, min = 0, max, step, value, onChange, ariaLabel, disabled, note }) {
  return (
    <div className="calc-slider-row">
      <p className="calc-slider-label">{label}</p>
      <div className="calc-slider-readout">
        <span className="calc-slider-value">{display}</span>
        <span className="calc-slider-unit">{unit}</span>
      </div>
      <input
        type="range"
        className="calc-range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
      />
      {note && <p className="calc-slider-note">{note}</p>}
    </div>
  )
}

export default function LoanCalculator() {
  const [token, setToken] = useState(TOKENS[0])
  const [score, setScore] = useState(SCORE_START)
  // How much of the available line the visitor wants to draw, 0–1. Kept as a
  // ratio so moving the score rescales the draw instead of resetting it.
  const [drawRatio, setDrawRatio] = useState(1)

  const { eligible, line, apr, collateralPct } = quote(score)
  const maxBorrow = line
  const borrow = maxBorrow * drawRatio

  const money = n => '$' + n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const terms = [
    { icon: Clock, label: 'Duration up to', value: '12 months' },
    { icon: Percent, label: 'Loan APR', value: eligible ? `${apr.toFixed(2)}%` : '—' },
    {
      icon: Wallet,
      label: 'Collateral required',
      value: !eligible ? '—' : collateralPct === 0 ? 'None' : `${collateralPct}% of draw`,
    },
  ]

  return (
    <section id="calculator" className="calc-section" aria-labelledby="calc-heading">
      <div className="calc-headline-band">
        <h2 id="calc-heading" className="calc-headline">
          How much{' '}
          <TokenSelect selected={token} onSelect={setToken} />{' '}
          will your <ScoreToken />{' '}
          <em className="calc-headline-em">unlock?</em>
        </h2>
      </div>

      {/* APX anchors this section with a saturated gradient panel and floats the
          quote card on it. Same structure, monochrome: a soft grey panel gives
          the section an edge, and the Loan Overview card lifts off it on a
          shadow instead of a colour change. */}
      <div className="calc-panel">
        <div className="calc-body">
          <div className="calc-sliders">
            <SliderRow
              label="Your onchain credit score"
              display={score}
              unit="SCORE"
              min={SCORE_MIN}
              max={SCORE_MAX}
              step={1}
              value={score}
              onChange={setScore}
              ariaLabel="Your Nevra credit score"
              note={eligible
                ? 'Every repayment moves this. Your rate and collateral follow it down.'
                : `Not scored for credit yet. A score of ${SCORE_FLOOR} opens your first line.`}
            />
            <SliderRow
              label="Amount you can borrow"
              display={money(borrow)}
              unit={token.code}
              max={maxBorrow || 1}
              step={(maxBorrow || 1) / 500}
              value={borrow}
              disabled={!eligible}
              onChange={amount => setDrawRatio(maxBorrow ? amount / maxBorrow : 0)}
              ariaLabel={`Amount to borrow in ${token.code}`}
            />
          </div>

          <div className="calc-overview">
            <p className="calc-overview-title">Loan Overview</p>
            <dl className="calc-terms">
              {terms.map(({ icon: Icon, label, value }) => (
                <div key={label} className="calc-term">
                  <dt>
                    <Icon size={16} strokeWidth={1.6} />
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <Link to="/apply" className="calc-cta btn-hover focus-ring-light">
              Start my loan
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <p className="calc-fineprint">
              Illustrative. Your rate and line are set after verification.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
