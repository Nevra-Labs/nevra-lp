import { useState } from 'react'
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
  const privy = PRIVY_ENABLED ? usePrivy() : { ready: true, authenticated: false, user: null, login: () => alert('Set VITE_PRIVY_APP_ID and VITE_PRIVY_CLIENT_ID in .env to enable wallet connect'), logout: () => {} }
  const { ready, authenticated, user, login, logout } = privy
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const walletAddress = user?.wallet?.address ?? ''

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: send to backend
    setSubmitted(true)
  }

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

      {/* Centered card */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px 80px',
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 20,
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)',
          padding: '48px 44px 44px',
          width: '100%',
          maxWidth: 440,
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <h2 style={{ fontWeight: 700, fontSize: 22, color: '#111', marginBottom: 12, letterSpacing: '-0.02em' }}>
                You're on the list.
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 }}>
                We'll reach out when your spot opens up.
              </p>
            </div>
          ) : (
            <>
              <h1 style={{
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: '-0.02em',
                color: '#111',
                marginBottom: 8,
                lineHeight: 1.2,
                textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
              }}>
                Apply for the closed beta
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6, marginBottom: 32 }}>
                We're onboarding a small group of early users. Sign in with your email to get started.
              </p>

              {!authenticated ? (
                /* Step 1 — connect wallet */
                <button
                  onClick={login}
                  disabled={!ready}
                  style={{
                    width: '100%',
                    background: '#111',
                    color: '#EEEDFF',
                    fontSize: 15,
                    fontWeight: 600,
                    padding: '14px 0',
                    borderRadius: 10,
                    border: 'none',
                    cursor: ready ? 'pointer' : 'not-allowed',
                    opacity: ready ? 1 : 0.5,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Continue with email →
                </button>
              ) : (
                /* Step 2 — fill in details */
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Wallet badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#f5f4ff',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 10,
                    padding: '10px 14px',
                  }}>
                    <span style={{ fontSize: 13, color: '#111', fontWeight: 500, fontFamily: 'monospace' }}>
                      {walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : user?.email?.address ?? 'Connected'}
                    </span>
                    <button
                      type="button"
                      onClick={logout}
                      style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      Disconnect
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={inputStyle}
                  />

                  <button
                    type="submit"
                    style={{
                      marginTop: 8,
                      background: '#111',
                      color: '#EEEDFF',
                      fontSize: 15,
                      fontWeight: 600,
                      padding: '14px 0',
                      borderRadius: 10,
                      border: 'none',
                      cursor: 'pointer',
                      width: '100%',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Request access →
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  fontSize: 14,
  border: '1px solid rgba(0,0,0,0.12)',
  borderRadius: 10,
  outline: 'none',
  fontFamily: 'inherit',
  color: '#111',
  background: '#fafafa',
}
