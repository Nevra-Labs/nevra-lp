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

/* ── The Nevra score gauge ─────────────────────────────────────────────────
   A dial, not a diagram. The earlier version pulled dots along two feeder
   curves into a haloed, gradient-filled arc, which is the house style of
   every generative-AI product shot; it said "data flowing" without saying
   anything true. What is true is the reading, so this is the reading: one
   flat track, one solid arc that draws to it once, the number, and what it
   opens. The viewBox crops to the dial now that the side chips are gone.
   Arc: centre (360, 190), r = 130, half length pi*130 = 408. The end
   marker sits at (360 + 130*cos(pi*(1-f)), 190 - 130*sin(pi*(1-f))). */
const ARC_LEN = 408
const SCORE = 78
const SCORE_MAX = 100
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
        viewBox="180 0 360 268"
        role="img"
        aria-labelledby="gauge-title gauge-desc"
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <title id="gauge-title">Nevra score gauge reading 78 out of 100</title>
        <desc id="gauge-desc">
          An onchain payroll score of 78 out of 100, which opens a $2,730 credit line.
        </desc>

        <path
          d="M 230 190 A 130 130 0 0 1 490 190"
          fill="none"
          stroke="var(--hairline)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          className="draw-arc"
          style={{ '--len': ARC_LEN, '--end': ARC_LEN * (1 - FRACTION), '--delay': '0.15s' }}
          d="M 230 190 A 130 130 0 0 1 490 190"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Marker at the end of the value arc. The arc already carries the
            reading, so a needle would only duplicate it and cross the label. */}
        <g className="pop" style={{ '--delay': '1.05s' }}>
          <circle cx="460" cy="107" r="9" fill="var(--surface)" />
          <circle cx="460" cy="107" r="5.5" fill="var(--ink)" />
        </g>

        {/* Readout, centred in the dial. */}
        <text x="360" y="172" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="68" fontWeight="600" letterSpacing="-0.02em" fill="var(--ink)">
          {score}
        </text>
        <text x="360" y="198" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="14" fill="var(--ink-45)">
          Nevra score
        </text>

        {/* What the reading opens. */}
        <g className="pop" style={{ '--delay': '0.9s' }}>
          <rect x="252" y="222" width="216" height="38" rx="12" fill="var(--ink)" />
          <text x="360" y="246" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="14" fontWeight="500" fill="var(--surface)">
            $2,730 credit line
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

        {/* Typical lender: 25% of the track. */}
        <text x="0" y="30" fontFamily="var(--font-sans)" fontSize="15" fontWeight="500" fill="var(--ink-45)">
          Typical overcollateralized
        </text>
        <rect x="0" y="52" width="520" height="56" rx="14" fill="var(--paper-soft)" />
        <rect className="bar-grow" style={{ '--delay': '0.1s' }} x="0" y="52" width="130" height="56" rx="14" fill="var(--ink-30)" />
        <text className="pop" style={{ '--delay': '0.7s' }} x="544" y="88" fontFamily="var(--font-sans)" fontSize="22" fontWeight="600" fill="var(--ink-45)">
          ${other.toLocaleString('en-US')}
        </text>

        {/* Nevra: the full track. */}
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

/* ── Hero backdrop ─────────────────────────────────────────────────────────
   APX fills its hero with a darkened photograph; this does the same job with
   an oversized echo of the score arc, so the depth comes from the product
   rather than from stock imagery. Pure decoration: aria-hidden, no reflow. */
export function HeroBackdrop() {
  return (
    <svg
      className="hero-backdrop"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hb-glow" cx="50%" cy="76%" r="52%">
          <stop offset="0%" stopColor="#FFD9A8" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#FFD9A8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hb-top" cx="50%" cy="0%" r="62%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hb-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.02" />
          <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
        </linearGradient>
        <pattern id="hb-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#FFFFFF" fillOpacity="0.05" />
        </pattern>
        {/* Fades the dot field out before it reaches the headline. */}
        <radialGradient id="hb-dotmask" cx="50%" cy="92%" r="58%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <mask id="hb-mask">
          <rect width="1440" height="900" fill="url(#hb-dotmask)" />
        </mask>
      </defs>

      <rect width="1440" height="900" fill="url(#hb-top)" />
      <rect width="1440" height="900" fill="url(#hb-dots)" mask="url(#hb-mask)" />
      <rect width="1440" height="900" fill="url(#hb-glow)" />

      {/* Three concentric arcs, the outermost faintest, echoing the gauge. */}
      <g fill="none" strokeLinecap="round">
        <path d="M 300 1080 A 420 420 0 0 1 1140 1080" stroke="url(#hb-arc)" strokeWidth="1.5" />
        <path d="M 180 1080 A 540 540 0 0 1 1260 1080" stroke="#FFFFFF" strokeOpacity="0.05" strokeWidth="1.5" />
        <path d="M 60 1080 A 660 660 0 0 1 1380 1080" stroke="#FFFFFF" strokeOpacity="0.03" strokeWidth="1.5" />
      </g>
    </svg>
  )
}
