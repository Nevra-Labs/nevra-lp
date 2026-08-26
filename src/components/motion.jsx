import { useEffect, useRef, useState } from 'react'
import '../motion.css'

/* Adds `.play` to the wrapper the first time it scrolls into view, so the
   stroke-draw animations start when they are actually visible. */
function usePlay(threshold = 0.35) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, playing]
}

/* Counts to `to` once `active` flips, honouring reduced-motion. */
function useCountUp(to, active, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to)
      return
    }
    let raf
    const start = performance.now()
    const tick = now => {
      const t = Math.min(1, (now - start) / duration)
      // Ease-out cubic, matched to the arc draw so they land together.
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, active, duration])

  return value
}

/* ── Hero: the Nevra score gauge ───────────────────────────────────────────
   A semicircular arc that draws to 742/850 while two feeder curves pull a dot
   in from the wallet chip and the bank chip. Arc geometry: centre (360, 250),
   r = 150, so the半 length is π·150 ≈ 471. */
const ARC_LEN = 471
const SCORE = 742
const SCORE_MAX = 850
const FRACTION = SCORE / SCORE_MAX

export function ScoreGauge({ tone = 'light' }) {
  const [ref, playing] = usePlay(0.3)
  const score = useCountUp(SCORE, playing)

  return (
    <div
      ref={ref}
      className={`${playing ? 'play' : ''} ${tone === 'dark' ? 'viz-dark' : ''}`}
      style={{ width: '100%' }}
    >
      <svg
        viewBox="0 0 720 330"
        role="img"
        aria-labelledby="gauge-title gauge-desc"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <title id="gauge-title">Nevra score gauge reading 742 out of 850</title>
        <desc id="gauge-desc">
          A wallet and a bank account feed into a single credit score of 742, which opens a
          $6,000 credit line.
        </desc>

        <defs>
          <radialGradient id="gauge-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.09" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gauge-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="1" />
          </linearGradient>
          {/* Feeder curves double as motion paths for the travelling dots. */}
          <path id="feed-left" d="M 96 96 C 186 96, 250 140, 300 206" />
          <path id="feed-right" d="M 624 96 C 534 96, 470 140, 420 206" />
        </defs>

        <circle className="halo" cx="360" cy="250" r="168" fill="url(#gauge-halo)" />

        {/* Feeder curves */}
        <use href="#feed-left" fill="none" stroke="var(--hairline)" strokeWidth="1.5" />
        <use href="#feed-right" fill="none" stroke="var(--hairline)" strokeWidth="1.5" />
        <use
          href="#feed-left"
          className="draw"
          style={{ '--len': 260, '--delay': '0.15s' }}
          fill="none"
          stroke="var(--ink-30)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <use
          href="#feed-right"
          className="draw"
          style={{ '--len': 260, '--delay': '0.28s' }}
          fill="none"
          stroke="var(--ink-30)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Dots riding the feeder curves — SMIL keeps them independent of React. */}
        <circle r="4" fill="var(--ink)">
          <animateMotion dur="2.6s" begin="1.1s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1">
            <mpath href="#feed-left" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.8;1" dur="2.6s" begin="1.1s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="var(--ink)">
          <animateMotion dur="2.6s" begin="1.7s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1">
            <mpath href="#feed-right" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.8;1" dur="2.6s" begin="1.7s" repeatCount="indefinite" />
        </circle>

        {/* Source chips */}
        <g className="pop" style={{ '--delay': '0.05s' }}>
          <rect x="24" y="74" width="144" height="44" rx="12" fill="var(--surface)" stroke="var(--hairline)" />
          <circle cx="48" cy="96" r="4" fill="var(--ink-30)" />
          <text x="64" y="101" fontFamily="var(--font-sans)" fontSize="14" fontWeight="500" fill="var(--ink-60)">Wallets</text>
        </g>
        <g className="pop" style={{ '--delay': '0.18s' }}>
          <rect x="552" y="74" width="144" height="44" rx="12" fill="var(--surface)" stroke="var(--hairline)" />
          <circle cx="576" cy="96" r="4" fill="var(--ink-30)" />
          <text x="592" y="101" fontFamily="var(--font-sans)" fontSize="14" fontWeight="500" fill="var(--ink-60)">Bank</text>
        </g>

        {/* Gauge track + drawn value arc */}
        <path d="M 210 250 A 150 150 0 0 1 510 250" fill="none" stroke="var(--hairline)" strokeWidth="10" strokeLinecap="round" />
        <path
          className="draw-arc"
          style={{ '--len': ARC_LEN, '--end': ARC_LEN * (1 - FRACTION), '--delay': '0.25s' }}
          d="M 210 250 A 150 150 0 0 1 510 250"
          fill="none"
          stroke="url(#gauge-arc)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Marker at the end of the value arc. The arc already carries the
            reading, so a needle would only duplicate it and cross the label. */}
        <g className="pop" style={{ '--delay': '1.35s' }}>
          <circle cx="498" cy="192" r="9" fill="var(--surface)" />
          <circle cx="498" cy="192" r="5.5" fill="var(--ink)" />
        </g>

        {/* Readout, centred in the dial. */}
        <text x="360" y="228" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="76" fontWeight="700" letterSpacing="-0.015em" fill="var(--ink)">
          {score}
        </text>
        <text x="360" y="254" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="15" fill="var(--ink-45)">
          Nevra score
        </text>

        {/* Outcome chip under the dial */}
        <g className="pop" style={{ '--delay': '1.15s' }}>
          <rect x="252" y="286" width="216" height="40" rx="12" fill="var(--ink)" />
          <text x="360" y="311" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="15" fontWeight="600" fill="var(--surface)">
            $6,000 credit line
          </text>
        </g>
      </svg>
    </div>
  )
}

/* ── Collateral comparison ─────────────────────────────────────────────────
   Two bars for the same $1,500 posted. Typical overcollateralized lending
   returns $1,000; Nevra returns $4,000. */
export function CollateralCompare() {
  const [ref, playing] = usePlay(0.4)
  const other = useCountUp(1000, playing, 1100)
  const nevra = useCountUp(4000, playing, 1400)

  return (
    <div ref={ref} className={playing ? 'play' : ''} style={{ width: '100%' }}>
      <svg
        viewBox="0 0 720 292"
        role="img"
        aria-labelledby="cmp-title"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        <title id="cmp-title">
          The same $1,500 posted returns $1,000 from typical overcollateralized lending and
          $4,000 from Nevra
        </title>

        <defs>
          <linearGradient id="glint-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <clipPath id="nevra-clip">
            <rect x="0" y="170" width="520" height="56" rx="14" />
          </clipPath>
        </defs>

        {/* Typical lender — 25% of the track. */}
        <text x="0" y="30" fontFamily="var(--font-sans)" fontSize="15" fontWeight="500" fill="var(--ink-45)">
          Typical overcollateralized
        </text>
        <rect x="0" y="52" width="520" height="56" rx="14" fill="var(--paper-soft)" />
        <rect className="bar-grow" style={{ '--delay': '0.1s' }} x="0" y="52" width="130" height="56" rx="14" fill="var(--ink-30)" />
        <text className="pop" style={{ '--delay': '0.7s' }} x="544" y="88" fontFamily="var(--font-sans)" fontSize="22" fontWeight="600" fill="var(--ink-45)">
          ${other.toLocaleString('en-US')}
        </text>

        {/* Nevra — the full track. */}
        <text x="0" y="148" fontFamily="var(--font-sans)" fontSize="15" fontWeight="600" fill="var(--ink)">
          Nevra
        </text>
        <rect x="0" y="170" width="520" height="56" rx="14" fill="var(--paper-soft)" />
        <rect className="bar-grow" style={{ '--delay': '0.35s' }} x="0" y="170" width="520" height="56" rx="14" fill="var(--ink)" />
        <g clipPath="url(#nevra-clip)">
          <rect className="glint" x="0" y="170" width="90" height="56" fill="url(#glint-grad)" />
        </g>
        <text className="pop" style={{ '--delay': '1s' }} x="544" y="206" fontFamily="var(--font-sans)" fontSize="22" fontWeight="700" fill="var(--ink)">
          ${nevra.toLocaleString('en-US')}
        </text>

        <text x="0" y="272" fontFamily="var(--font-sans)" fontSize="14" fill="var(--ink-45)">
          Same $1,500 posted. Four times the draw.
        </text>
      </svg>
    </div>
  )
}

/* ── Step glyphs ───────────────────────────────────────────────────────────
   Three 64×64 line drawings that draw themselves in sequence. */
const GLYPHS = [
  {
    title: 'Three wallets converging into one profile',
    paths: [
      { d: 'M 10 16 h 18 a 4 4 0 0 1 4 4 v 10 a 4 4 0 0 1 -4 4 h -18 a 4 4 0 0 1 -4 -4 v -10 a 4 4 0 0 1 4 -4 z', len: 70 },
      { d: 'M 32 25 h 14 a 6 6 0 0 1 6 6 v 6', len: 30 },
      { d: 'M 20 40 v 6 a 6 6 0 0 0 6 6 h 20 a 6 6 0 0 0 6 -6 v -3', len: 46 },
      { d: 'M 46 37 a 6 6 0 1 1 0 12 a 6 6 0 1 1 0 -12 z', len: 40 },
    ],
  },
  {
    title: 'An identity document being verified',
    paths: [
      { d: 'M 12 10 h 30 l 10 10 v 34 a 4 4 0 0 1 -4 4 h -36 a 4 4 0 0 1 -4 -4 v -40 a 4 4 0 0 1 4 -4 z', len: 150 },
      { d: 'M 42 10 v 10 h 10', len: 20 },
      { d: 'M 18 30 h 16', len: 16 },
      { d: 'M 18 38 h 22', len: 22 },
      { d: 'M 20 46 l 6 6 l 14 -14', len: 34 },
    ],
  },
  {
    title: 'A credit line being drawn against',
    paths: [
      { d: 'M 8 48 h 48', len: 48 },
      { d: 'M 8 48 L 22 34 L 34 42 L 56 16', len: 62 },
      { d: 'M 44 16 h 12 v 12', len: 24 },
      { d: 'M 8 56 h 30', len: 30 },
    ],
  },
]

export function StepGlyph({ index }) {
  const [ref, playing] = usePlay(0.5)
  const glyph = GLYPHS[index]

  return (
    <span ref={ref} className={playing ? 'play' : ''} style={{ display: 'block', width: 56, height: 56 }}>
      <svg viewBox="0 0 64 64" role="img" aria-label={glyph.title} style={{ width: '100%', height: '100%', display: 'block' }}>
        {glyph.paths.map((p, i) => (
          <path
            key={p.d}
            className="draw"
            style={{ '--len': p.len, '--delay': `${i * 0.16}s` }}
            d={p.d}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </span>
  )
}
