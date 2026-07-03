const VARIANTS = [
  {
    bg: 'radial-gradient(120% 140% at 20% 20%, #2a2660 0%, #0f0d2b 60%, #050416 100%)',
    accent: '#c9c6f0',
    accentSoft: 'rgba(201, 198, 240, 0.35)',
  },
  {
    bg: 'radial-gradient(120% 140% at 80% 20%, #1a3564 0%, #0c1a3a 60%, #060d1f 100%)',
    accent: '#b8d4f0',
    accentSoft: 'rgba(184, 212, 240, 0.35)',
  },
  {
    bg: 'radial-gradient(120% 140% at 30% 80%, #322a5f 0%, #17123a 60%, #080615 100%)',
    accent: '#d0c6f0',
    accentSoft: 'rgba(208, 198, 240, 0.35)',
  },
]

export default function BlogCover({ variant = 0, featured = false }) {
  const v = VARIANTS[variant % VARIANTS.length]

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: v.bg,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Soft grain */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 55%)',
      }} />

      {/* Orbital geometry — the Nevra "credit orbit" motif */}
      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        aria-hidden
      >
        <defs>
          <radialGradient id={`glow-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={v.accent} stopOpacity="0.5" />
            <stop offset="55%" stopColor={v.accent} stopOpacity="0.08" />
            <stop offset="100%" stopColor={v.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`arc-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={v.accent} stopOpacity="0" />
            <stop offset="50%" stopColor={v.accent} stopOpacity="0.9" />
            <stop offset="100%" stopColor={v.accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Central glow */}
        <circle cx="500" cy="200" r="180" fill={`url(#glow-${variant})`} />

        {/* Outer orbit */}
        <ellipse
          cx="500"
          cy="200"
          rx="260"
          ry="140"
          fill="none"
          stroke={v.accentSoft}
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        {/* Middle orbit */}
        <ellipse
          cx="500"
          cy="200"
          rx="180"
          ry="95"
          fill="none"
          stroke={v.accentSoft}
          strokeWidth="1.2"
        />
        {/* Inner orbit — glowing accent arc */}
        <ellipse
          cx="500"
          cy="200"
          rx="120"
          ry="60"
          fill="none"
          stroke={`url(#arc-${variant})`}
          strokeWidth="1.5"
        />

        {/* Orbit nodes */}
        <circle cx="760" cy="200" r="3" fill={v.accent} opacity="0.9" />
        <circle cx="500" cy="60" r="2.5" fill={v.accent} opacity="0.7" />
        <circle cx="240" cy="200" r="2" fill={v.accent} opacity="0.5" />
        <circle cx="620" cy="290" r="2.5" fill={v.accent} opacity="0.8" />

        {/* Core token */}
        <circle cx="500" cy="200" r="16" fill={v.accent} opacity="0.95" />
        <circle cx="500" cy="200" r="24" fill="none" stroke={v.accent} strokeOpacity="0.4" strokeWidth="1" />

        {/* Grid dots — bottom left corner */}
        {featured && Array.from({ length: 4 }).flatMap((_, r) =>
          Array.from({ length: 6 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={40 + c * 24}
              cy={280 + r * 24}
              r="1.2"
              fill={v.accent}
              opacity={0.15 + (3 - r) * 0.04}
            />
          ))
        )}
      </svg>

      {/* Wordmark */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 24,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)',
      }}>
        Nevra
      </div>
    </div>
  )
}
