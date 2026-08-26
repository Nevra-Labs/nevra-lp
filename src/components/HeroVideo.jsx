import { useEffect, useRef, useState } from 'react'
import { HeroBackdrop } from './motion'

/* Hero background video, same treatment as apxlending.com: autoplay, looped,
   muted, object-fit cover behind a darkening scrim.

   The file is NOT in the repo — drop a licensed clip at `public/hero.mp4` and
   it takes over automatically. Until then (and whenever the file 404s, the
   codec is unsupported, or the viewer asks for reduced motion) HeroBackdrop
   renders instead, so the hero is never empty. */
export default function HeroVideo({ src = '/hero.mp4' }) {
  const ref = useRef(null)
  const [usable, setUsable] = useState(true)

  useEffect(() => {
    // Reduced-motion viewers get the static backdrop, never a looping clip.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setUsable(false)
      return
    }
    const el = ref.current
    if (!el) return
    const fail = () => setUsable(false)
    el.addEventListener('error', fail)
    // A missing file resolves as a media error on the <source>, not the
    // <video>, so listen on both.
    const source = el.querySelector('source')
    source?.addEventListener('error', fail)
    return () => {
      el.removeEventListener('error', fail)
      source?.removeEventListener('error', fail)
    }
  }, [])

  if (!usable) return <HeroBackdrop />

  return (
    <>
      {/* Backdrop stays mounted underneath: it is the poster frame while the
          video buffers, and the floor if the video never paints. */}
      <HeroBackdrop />
      <video
        ref={ref}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="hero-scrim" aria-hidden="true" />
    </>
  )
}
