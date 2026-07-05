import { Link } from 'react-router-dom'

// Cofounder-style navbar: logo mark at the far left edge, controls at the far
// right — a translucent link group pill plus a distinct Apply CTA.
// `rightExtra` renders extra controls before the Apply button (e.g. Disconnect on /apply).
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
      padding: '16px 28px',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Nevra home">
        <img src="/logo.png" alt="Nevra" style={{ width: 28, height: 28, display: 'block' }} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <nav className="nav-text-links-group" style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 99,
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(22,21,29,0.08)',
          boxShadow: '0 4px 16px -8px rgba(22,21,29,0.12)',
          padding: 4,
        }}>
          <Link to="/blog" className="nav-text-links" style={navLink}>
            Blog
          </Link>
          <span aria-hidden style={{ width: 1, height: 16, background: 'rgba(22,21,29,0.1)' }} />
          <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="nav-text-links" style={navLink}>
            Whitepaper
          </a>
        </nav>

        {rightExtra}

        <Link to="/apply" className="btn-hover focus-ring" style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--ink)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
          padding: '12px 22px',
          borderRadius: 99,
          lineHeight: 1,
          letterSpacing: '0.01em',
          boxShadow: '0 4px 16px -8px rgba(22,21,29,0.4)',
        }}>
          Apply
        </Link>
      </div>
    </header>
  )
}

const navLink = {
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--ink-60)',
  padding: '8px 16px',
  borderRadius: 99,
  letterSpacing: '-0.005em',
}
