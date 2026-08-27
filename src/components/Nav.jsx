import { Link, useLocation, useNavigate } from 'react-router-dom'

// Arch-style navbar (archlending.com): 64px fixed bar, logo left, centered
// section links, and a right cluster of text link + outline button + filled
// dark button. Solid white throughout — like APX, the bar sits above the dark
// hero rather than floating over it.
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
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
    <header className="nav-bar">
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
