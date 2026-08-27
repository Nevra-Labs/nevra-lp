import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Home from './pages/Home'
import Blog from './pages/Blog'
import ArticlePage from './pages/ArticlePage'
import Apply from './pages/Apply'
import NotFound from './pages/NotFound'
import DesignSystem from './pages/DesignSystem'

// Lenis smooth scrolling (odyssey.finance-style inertia). Skipped entirely for
// prefers-reduced-motion users, who get native scrolling.
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    let raf
    const loop = time => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
  return null
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollToTop />
      {/* The gutter APX floats its whole site in, painted over the page so it
          survives scrolling. Purely decorative — the page itself is .screen. */}
      <div className="screen-frame" aria-hidden />

      <div className="screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticlePage />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/design" element={<DesignSystem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
