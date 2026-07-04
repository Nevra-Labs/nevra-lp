const PALETTES = [
  { bg: 'radial-gradient(130% 150% at 25% 20%, #2a2660 0%, #0f0d2b 60%, #050416 100%)', accent: '#c9c6f0' },
  { bg: 'radial-gradient(130% 150% at 75% 20%, #1a3564 0%, #0c1a3a 60%, #060d1f 100%)', accent: '#b8d4f0' },
  { bg: 'radial-gradient(130% 150% at 30% 85%, #322a5f 0%, #17123a 60%, #080615 100%)', accent: '#d0c6f0' },
]

/* Wallet: card silhouette inside a dashed orbit */
function WalletGlyph({ a }) {
  return (
    <g>
      <ellipse cx="200" cy="105" rx="150" ry="72" fill="none" stroke={a} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 5" />
      <rect x="145" y="72" width="110" height="70" rx="10" fill={a} fillOpacity="0.08" stroke={a} strokeOpacity="0.85" strokeWidth="1.5" />
      <path d="M145 94h110" stroke={a} strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="158" y="106" width="26" height="18" rx="4" fill={a} fillOpacity="0.35" stroke={a} strokeOpacity="0.6" strokeWidth="1" />
      <circle cx="238" cy="126" r="3" fill={a} fillOpacity="0.9" />
      <circle cx="226" cy="126" r="3" fill={a} fillOpacity="0.5" />
      <circle cx="350" cy="105" r="3" fill={a} opacity="0.9" />
      <circle cx="63" cy="128" r="2" fill={a} opacity="0.5" />
    </g>
  )
}

/* Score: gauge built from orbital arcs with a needle node */
function ScoreGlyph({ a }) {
  return (
    <g>
      <path d="M110 138 A90 90 0 0 1 290 138" fill="none" stroke={a} strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="2 6" />
      <path d="M130 138 A70 70 0 0 1 270 138" fill="none" stroke={a} strokeOpacity="0.5" strokeWidth="1.5" />
      <path d="M130 138 A70 70 0 0 1 235 77" fill="none" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="235" cy="77" r="5" fill={a} />
      <circle cx="235" cy="77" r="10" fill="none" stroke={a} strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="200" cy="138" r="4" fill={a} fillOpacity="0.9" />
      <path d="M200 138 L227 88" stroke={a} strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="106" cy="112" r="2" fill={a} opacity="0.5" />
      <circle cx="298" cy="118" r="2.5" fill={a} opacity="0.7" />
    </g>
  )
}

/* Credit: central token with orbit ring and satellite nodes */
function CreditGlyph({ a }) {
  return (
    <g>
      <ellipse cx="200" cy="105" rx="140" ry="66" fill="none" stroke={a} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 5" />
      <ellipse cx="200" cy="105" rx="92" ry="42" fill="none" stroke={a} strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="200" cy="105" r="24" fill={a} fillOpacity="0.14" stroke={a} strokeWidth="1.5" />
      <path d="M200 92v26M193 98.5h10.5a5.5 5.5 0 0 1 0 11H196a5 5 0 0 0 0 10h11" fill="none" stroke={a} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="292" cy="105" r="3.5" fill={a} opacity="0.9" />
      <circle cx="108" cy="105" r="2.5" fill={a} opacity="0.55" />
      <circle cx="252" cy="140" r="2.5" fill={a} opacity="0.75" />
      <circle cx="160" cy="66" r="2" fill={a} opacity="0.6" />
    </g>
  )
}

const GLYPHS = [WalletGlyph, ScoreGlyph, CreditGlyph]

export default function StepArt({ variant = 0 }) {
  const p = PALETTES[variant % PALETTES.length]
  const Glyph = GLYPHS[variant % GLYPHS.length]

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: p.bg,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg
        viewBox="0 0 400 210"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        aria-hidden
      >
        <defs>
          <radialGradient id={`step-glow-${variant}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={p.accent} stopOpacity="0.4" />
            <stop offset="60%" stopColor={p.accent} stopOpacity="0.06" />
            <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="105" r="130" fill={`url(#step-glow-${variant})`} />
        <Glyph a={p.accent} />
      </svg>
    </div>
  )
}
