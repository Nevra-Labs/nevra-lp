import { Link } from 'react-router-dom'

// Portola-style navbar: flat full-width bar with a hairline bottom border,
// content constrained to the same 1160px frame as the page sections so the
// logo and links align with the structural rails.
// `rightExtra` renders extra controls before the Apply link (e.g. Disconnect on /apply).
export default function Nav({ rightExtra = null }) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      padding: '0 32px',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div style={{
        maxWidth: 1160,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 0',
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
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
          }}>
            <span aria-hidden style={{ fontSize: 15, lineHeight: 1 }}>↳</span>
            Apply
          </Link>
        </nav>
      </div>
    </header>
  )
}

const navLink = {
  fontSize: 14,
  fontWeight: 400,
  color: 'var(--ink-60)',
  letterSpacing: '-0.005em',
}
