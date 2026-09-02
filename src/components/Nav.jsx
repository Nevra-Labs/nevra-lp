import { Link, useLocation, useNavigate } from 'react-router-dom'

/* Measured off apxlending.com's .header-new: a 56px bar on the frame's own
   grey, inset 24px on the left and 8px on the right so the primary button
   hugs the gutter. Logo left, everything else right: four 14px text links in
   12px-radius hit areas (4px apart), then 32px, then the black primary pill.
   APX runs a secondary next to it; we have one destination, so one button. */

const SECTION_LINKS = [
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Calculator', id: 'calculator' },
  { label: 'Why Nevra', id: 'why-nevra' },
]

export default function Nav({ rightExtra = null }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
      <Link to="/" className="nav-brand" aria-label="Nevra home">
        <img src="/logo.png" alt="Nevra" />
      </Link>

      <div className="nav-right">
        <nav className="nav-links nav-text-links">
          {SECTION_LINKS.map(({ label, id }) => (
            <a key={id} href={`/#${id}`} onClick={e => goToSection(e, id)} className="nav-item focus-ring">
              {label}
            </a>
          ))}
          <Link to="/blog" className="nav-item focus-ring">Blog</Link>
        </nav>

        <div className="nav-actions">
          {rightExtra}
          <Link to="/apply" className="nav-btn nav-btn-solid focus-ring">Apply now</Link>
        </div>
      </div>
    </header>
  )
}
