import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | Nevra'
    return () => { document.title = 'Nevra | Real credit for crypto-native people' }
  }, [])

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', color: 'var(--ink)', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '128px 24px',
        gap: 16,
      }}>
        <p className="eyebrow" style={{ color: 'var(--ink-45)', margin: 0 }}>[ 404 ]</p>
        <h1 style={{
          fontWeight: 300,
          fontSize: 'clamp(32px, 4vw, 44px)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          margin: 0,
        }}>
          This page doesn't exist.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-60)', margin: '0 0 12px' }}>
          The link may be old, or the page may have moved.
        </p>
        <Link to="/" className="btn-hover focus-ring" style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--accent)',
          color: '#fff',
          fontSize: 15,
          fontWeight: 400,
          padding: '12px 22px',
          borderRadius: 99,
          lineHeight: 1,
          letterSpacing: '0.01em',
        }}>
          Back to home →
        </Link>
      </main>
    </div>
  )
}
