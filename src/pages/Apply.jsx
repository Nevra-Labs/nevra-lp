import { Link } from 'react-router-dom'
import '../responsive.css'

export default function Apply() {
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

      {/* Centered modal */}
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
          <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', lineHeight: 1.6, marginBottom: 36 }}>
            We're onboarding a small group of early users. Leave your details and we'll be in touch.
          </p>

          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input
              type="text"
              placeholder="Full name"
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email address"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Wallet address (optional)"
              style={inputStyle}
            />
            <button type="submit" style={{
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
            }}>
              Request access →
            </button>
          </form>
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
