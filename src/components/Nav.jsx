import { Link } from 'react-router-dom'

export default function Nav({ dark = false }) {
  const fg = dark ? '#111' : 'rgba(255,255,255,0.85)'
  const applyBg = dark ? '#111' : '#EEEDFF'
  const applyColor = dark ? '#EEEDFF' : '#111'
  const logoFilter = dark ? 'none' : 'invert(1)'

  return (
    <header className="blog-nav" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '22px 32px',
    }}>
      <Link to="/">
        <img
          src="/logo.png"
          alt="Nevra"
          style={{ width: 24, height: 24, display: 'block', filter: logoFilter }}
        />
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link to="/blog" style={{ fontSize: 14, fontWeight: 500, color: fg, letterSpacing: '0.01em' }}>
          Blog
        </Link>
        <a href="#" style={{
          background: applyBg,
          color: applyColor,
          fontSize: 14,
          fontWeight: 500,
          padding: '9px 18px',
          borderRadius: 999,
          lineHeight: 1,
        }}>
          Apply
        </a>
      </div>
    </header>
  )
}
