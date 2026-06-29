import { Link } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import '../responsive.css'

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID
const PRIVY_CLIENT_ID = import.meta.env.VITE_PRIVY_CLIENT_ID
const PRIVY_ENABLED =
  PRIVY_APP_ID &&
  PRIVY_APP_ID !== 'your-privy-app-id-here' &&
  PRIVY_CLIENT_ID &&
  PRIVY_CLIENT_ID !== 'your-privy-client-id-here'

export default function Apply() {
  const privy = PRIVY_ENABLED
    ? usePrivy()
    : { login: () => alert('Set VITE_PRIVY_APP_ID and VITE_PRIVY_CLIENT_ID in .env') }
  const { login } = privy

  return (
    <div style={{
      background: '#EEEDFF',
      minHeight: '100vh',
      fontFamily: "'Inter', system-ui, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Nav */}
      <header className="blog-nav" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 32px',
        flexShrink: 0,
      }}>
        <Link to="/">
          <img src="/logo.png" alt="Nevra" style={{ width: 24, height: 24, display: 'block' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link to="/blog" style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.01em' }}>
            Blog
          </Link>
          <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.01em' }}>
            Whitepaper
          </a>
        </div>
      </header>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '10vh',
        gap: 24,
      }}>
        <h1 style={{
          fontWeight: 700,
          fontSize: 32,
          letterSpacing: '-0.03em',
          color: '#111',
          margin: 0,
          textAlign: 'center',
          textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
        }}>
          Apply for the closed beta
        </h1>

        <button
          onClick={login}
          style={{
            background: '#111',
            color: '#EEEDFF',
            fontSize: 15,
            fontWeight: 600,
            padding: '14px 32px',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '-0.01em',
          }}
        >
          Apply now →
        </button>
      </div>
    </div>
  )
}
