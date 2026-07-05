import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <header className="blog-nav" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 32px',
      borderBottom: '1px solid var(--hairline-soft)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Nevra home">
        <img src="/logo.png" alt="Nevra" style={{ width: 26, height: 26, display: 'block' }} />
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <Link to="/blog" className="nav-text-links eyebrow" style={{ color: 'var(--ink-60)' }}>
          Blog
        </Link>
        <Link to="/apply" className="btn-hover focus-ring" style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--ink)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 500,
          padding: '11px 20px',
          borderRadius: 8,
          lineHeight: 1,
          letterSpacing: '0.01em',
        }}>
          Apply
        </Link>
      </div>
    </header>
  )
}
