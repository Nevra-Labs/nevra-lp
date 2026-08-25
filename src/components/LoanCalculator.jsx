import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Percent, Contrast, ChevronDown, ArrowRight } from 'lucide-react'

// Illustrative spot prices in USD. The calculator is a marketing estimate, not a
// quote, so these are static constants rather than a live feed.
const ASSETS = [
  { code: 'BTC', name: 'Bitcoin', price: 95000, max: 5,   step: 0.01, mark: '₿', bg: '#F7931A' },
  { code: 'ETH', name: 'Ethereum', price: 3200, max: 120, step: 0.1,  mark: 'Ξ', bg: '#627EEA' },
  { code: 'SOL', name: 'Solana',  price: 185,  max: 2000, step: 1,    mark: '◎', bg: '#14F195' },
]

// Rates against USD, same illustrative-constant rule as ASSETS.
const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1,    flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', rate: 0.92, flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', rate: 0.79, flag: '🇬🇧' },
]

const LTV = 0.6

const TERMS = [
  { icon: Clock,    label: 'Duration up to',    value: '12 months' },
  { icon: Percent,  label: 'Loan APR',          value: '7.25%' },
  { icon: Contrast, label: 'Loan-To-Value (LTV)', value: 'Up to 60%' },
]

/* Round pill token: circular mark + code + chevron, opens a small menu. */
function TokenSelect({ options, selected, onSelect, renderMark }) {
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
    <span ref={ref} style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle' }}>
      <button
        type="button"
        className="calc-token focus-ring"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Change ${selected.code}`}
        onClick={() => setOpen(v => !v)}
      >
        {renderMark(selected)}
        <span className="calc-token-code">{selected.code}</span>
        <ChevronDown size={18} strokeWidth={1.8} style={{ color: 'var(--ink-30)', flexShrink: 0 }} />
      </button>

      {open && (
        <div className="calc-menu fade-up" role="listbox">
          {options.map(opt => (
            <button
              key={opt.code}
              type="button"
              role="option"
              aria-selected={opt.code === selected.code}
              className="calc-menu-item"
              onClick={() => { onSelect(opt); setOpen(false) }}
            >
              {renderMark(opt)}
              <span style={{ fontWeight: opt.code === selected.code ? 500 : 400 }}>{opt.code}</span>
            </button>
          ))}
        </div>
      )}
    </span>
  )
}

function AssetMark({ bg, mark }) {
  return (
    <span className="calc-mark" style={{ background: bg, color: '#FFFFFF' }} aria-hidden="true">
      {mark}
    </span>
  )
}

function FlagMark({ flag }) {
  return <span className="calc-mark calc-mark-flag" aria-hidden="true">{flag}</span>
}

/* Labelled slider row: caption, big value, unit, track. */
function SliderRow({ label, display, unit, max, step, value, onChange, ariaLabel }) {
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
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
      />
    </div>
  )
}

export default function LoanCalculator() {
  const [asset, setAsset] = useState(ASSETS[0])
  const [currency, setCurrency] = useState(CURRENCIES[0])
  const [collateral, setCollateral] = useState(0)

  // Switching asset keeps the slider inside the new asset's range.
  const handleAsset = next => {
    setAsset(next)
    setCollateral(c => Math.min(c, next.max))
  }

  const maxBorrow = asset.max * asset.price * LTV * currency.rate
  const borrow = collateral * asset.price * LTV * currency.rate

  // Dragging the borrow slider back-solves the collateral it would take.
  const handleBorrow = amount => {
    setCollateral(amount / (asset.price * LTV * currency.rate))
  }

  const collateralText = collateral === 0
    ? '0'
    : collateral.toLocaleString('en-US', { maximumFractionDigits: asset.step < 1 ? 2 : 0 })

  const borrowText = currency.symbol + borrow.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <section id="calculator" className="calc-section" aria-labelledby="calc-heading">
      <div className="calc-headline-band">
        <h2 id="calc-heading" className="calc-headline">
          How much{' '}
          <TokenSelect
            options={CURRENCIES}
            selected={currency}
            onSelect={setCurrency}
            renderMark={c => <FlagMark flag={c.flag} />}
          />{' '}
          will your{' '}
          <TokenSelect
            options={ASSETS}
            selected={asset}
            onSelect={handleAsset}
            renderMark={a => <AssetMark bg={a.bg} mark={a.mark} />}
          />{' '}
          <em className="calc-headline-em">unlock?</em>
        </h2>
      </div>

      <div className="calc-body">
        <div className="calc-sliders">
          <SliderRow
            label="Collateral you can post"
            display={collateralText}
            unit={asset.code}
            max={asset.max}
            step={asset.step}
            value={collateral}
            onChange={setCollateral}
            ariaLabel={`Collateral to post in ${asset.code}`}
          />
          <SliderRow
            label="Amount you can borrow"
            display={borrowText}
            unit={currency.code}
            max={maxBorrow}
            step={maxBorrow / 500}
            value={borrow}
            onChange={handleBorrow}
            ariaLabel={`Amount to borrow in ${currency.code}`}
          />
        </div>

        <div className="calc-overview">
          <p className="calc-overview-title">Loan Overview</p>
          <dl className="calc-terms">
            {TERMS.map(({ icon: Icon, label, value }) => (
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
        </div>
      </div>
    </section>
  )
}
