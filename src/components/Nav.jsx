import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'For builders', to: '/#for-builders' },
  { label: 'Journal', to: '/blog' },
]

export default function Nav({ rightExtra = null }) {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const toggle = useRef(null)

  function followLink(to) {
    setOpen(false)
    if (pathname !== '/' || !to.includes('#')) return
    document.getElementById(to.split('#')[1])?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    })
  }

  useEffect(() => { setOpen(false) }, [pathname, hash])

  useEffect(() => {
    if (!open) return
    const dismiss = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [open])

  return (
    <>
      {pathname === '/' && <a href="#main-content" className="site-skip">Skip to content</a>}
      <header className="site-header">
        <div className="site-nav">
          <Link to="/" className="site-brand" aria-label="Nevra home"><img src="/logo.png" alt="" width="29" height="29" /><span>Nevra</span></Link>
          <nav className="site-desktop-links" aria-label="Main navigation">{LINKS.map(link => <Link key={link.to} to={link.to} onClick={() => followLink(link.to)}>{link.label}</Link>)}</nav>
          <div className="site-nav-actions">{rightExtra}<Link to="/apply" className="lp-button site-nav-cta">Get early access <ArrowRight size={14} /></Link><button ref={toggle} className="site-menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
        </div>
        <nav id="mobile-navigation" className="site-mobile-links" aria-label="Mobile navigation" hidden={!open}>{LINKS.map(link => <Link key={link.to} to={link.to} onClick={() => followLink(link.to)}>{link.label}<ArrowRight size={15} /></Link>)}</nav>
      </header>
    </>
  )
}
