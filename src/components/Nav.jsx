import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Minimal navbar: no bottom rule, no frame. It floats transparent over the
// hero and only fades in a blurred white backing once the page scrolls, so
// nothing draws a line across the layout.
// `rightExtra` renders extra controls before the Apply button (e.g. Disconnect on /apply).
export default function Nav({ rightExtra = null }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      padding: '0 24px',
      background: scrolled ? 'rgba(255,255,255,0.78)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
    }}>
      <div style={{
        maxWidth: 'var(--shell)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 0',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Nevra home">
          <img src="/logo.png" alt="Nevra" style={{ width: 26, height: 26, display: 'block' }} />
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link to="/blog" className="nav-text-links" style={navLink}>Blog</Link>
          <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="nav-text-links" style={navLink}>
            Whitepaper
          </a>
          {rightExtra}
          <Link to="/apply" className="btn btn-primary focus-ring" style={{ fontSize: 14, padding: '10px 18px' }}>
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
