import { Link } from 'react-router-dom'

// Portola-style navbar: flat full-width bar, logo mark far left, quiet text
// links far right, hairline bottom border. The CTA is a text link with an
// arrow glyph, not a pill button.
// `rightExtra` renders extra controls before the Apply link (e.g. Disconnect on /apply).
export default function Nav({ rightExtra = null }) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px 28px',
      background: 'rgba(238,237,255,0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--hairline-soft)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Nevra home">
        <img src="/logo.png" alt="Nevra" style={{ width: 26, height: 26, display: 'block' }} />
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        <Link to="/blog" className="nav-text-links" style={navLink}>
          Blog
        </Link>
        <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="nav-text-links" style={navLink}>
          Whitepaper
        </a>
        {rightExtra}
        <Link to="/apply" className="footer-link focus-ring" style={{
          ...navLink,
          color: 'var(--ink)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
        }}>
          <span aria-hidden style={{ fontSize: 15, lineHeight: 1 }}>↳</span>
          Apply
        </Link>
      </nav>
    </header>
  )
}

const navLink = {
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--ink-60)',
  letterSpacing: '-0.005em',
}
