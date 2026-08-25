import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Arch-style navbar (archlending.com): 64px fixed bar, logo left, centered
// section links, and a right cluster of text link + outline button + filled
// dark button. Transparent over the hero, solid white once the page scrolls.
//
// Measured off Arch: 36px control height, 8px 16px padding, 8px radius,
// 14px/500 labels, 16px gap between the right-hand controls.
//
// `rightExtra` renders extra controls before the Apply button (e.g. Disconnect on /apply).

const SECTION_LINKS = [
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Calculator', id: 'calculator' },
  { label: 'Use cases', id: 'use-cases' },
]

export default function Nav({ rightExtra = null }) {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // In-page anchors: scroll directly when already on the landing page,
  // otherwise route home and let Home's hash effect finish the jump. Doing it
  // by hand keeps Lenis's smooth scrolling from fighting native hash jumps.
  const goToSection = (e, id) => {
    e.preventDefault()
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px',
      background: scrolled ? 'var(--paper)' : 'transparent',
      transition: 'background 150ms ease',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 'var(--shell)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Nevra home">
          <img src="/logo.png" alt="Nevra" style={{ width: 26, height: 26, display: 'block' }} />
        </Link>

        <nav className="nav-center nav-text-links" style={{ display: 'flex', alignItems: 'center' }}>
          {SECTION_LINKS.map(({ label, id }) => (
            <a key={id} href={`/#${id}`} onClick={e => goToSection(e, id)} className="nav-item focus-ring">
              {label}
            </a>
          ))}
          <Link to="/blog" className="nav-item focus-ring">Blog</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/apply" className="nav-item nav-item-quiet nav-text-links focus-ring">Sign in</Link>
          {rightExtra}
          <a
            href="/pdf/whitepaper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn nav-btn-outline focus-ring"
          >
            Whitepaper
          </a>
          <Link to="/apply" className="nav-btn nav-btn-solid focus-ring">Apply now</Link>
        </div>
      </div>
    </header>
  )
}
