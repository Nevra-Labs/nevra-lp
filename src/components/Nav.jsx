import { Link } from 'react-router-dom'

// Floating pill navbar, shared by every page.
// `rightExtra` renders extra controls before the Apply button (e.g. Disconnect on /apply).
export default function Nav({ rightExtra = null }) {
  return (
    <header style={{
      position: 'fixed',
      top: 16,
      left: 0,
      right: 0,
      zIndex: 20,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 16px',
      pointerEvents: 'none',
    }}>
      <nav style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        width: '100%',
        maxWidth: 680,
        padding: '10px 10px 10px 18px',
        borderRadius: 99,
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(22,21,29,0.08)',
        boxShadow: '0 8px 24px -12px rgba(22,21,29,0.18), 0 1px 2px rgba(22,21,29,0.04)',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Nevra home">
          <img src="/logo.png" alt="Nevra" style={{ width: 26, height: 26, display: 'block' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Link to="/blog" className="nav-text-links" style={navLink}>
            Blog
          </Link>
          <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="nav-text-links" style={navLink}>
            Whitepaper
          </a>
          {rightExtra}
          <Link to="/apply" className="btn-hover focus-ring" style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--ink)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            padding: '10px 18px',
            borderRadius: 99,
            lineHeight: 1,
            letterSpacing: '0.01em',
            marginLeft: 8,
          }}>
            Apply
          </Link>
        </div>
      </nav>
    </header>
  )
}

const navLink = {
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--ink-60)',
  padding: '8px 12px',
  borderRadius: 99,
  letterSpacing: '-0.005em',
}
