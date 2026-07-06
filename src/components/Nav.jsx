import { Link } from 'react-router-dom'

// Odyssey-style navbar structure on the light Stripe palette: logo + wordmark
// on the left; text links, a hairline divider, circular social icon buttons
// (Telegram, Discord) and a filled pill CTA on the right. Total height stays
// 57px (9px padding + 38px controls + 1px border) so the hero's frame rails
// still meet the nav's bottom border.
// `rightExtra` renders extra controls before the divider (e.g. Disconnect on /apply).
export default function Nav({ rightExtra = null }) {
  return (
    <header className="nav-root" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      padding: '0 32px',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="nav-frame" style={{
        maxWidth: 1160,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '9px 24px',
      }}>
        <Link to="/" className="focus-ring" style={{ display: 'flex', alignItems: 'center', gap: 10 }} aria-label="Nevra home">
          <img src="/logo.png" alt="" style={{ width: 26, height: 26, display: 'block' }} />
          <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)' }}>Nevra</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="nav-text-links" style={{ display: 'flex', alignItems: 'center', gap: 26, marginRight: 14 }}>
            <Link to="/blog" className="footer-link focus-ring" style={navLink}>
              Blog
            </Link>
            <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="footer-link focus-ring" style={navLink}>
              Whitepaper
            </a>
          </div>

          {rightExtra}

          <span className="nav-text-links" aria-hidden style={{
            width: 1,
            height: 20,
            background: 'var(--hairline)',
            marginRight: 2,
          }} />

          <a
            href="https://t.me/nevragenesis"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn focus-ring"
            aria-label="Nevra on Telegram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M9.04 16.9l-.38 3.76c.55 0 .79-.24 1.08-.52l2.6-2.49 5.38 3.94c.99.55 1.7.26 1.95-.91l3.53-16.56c.32-1.45-.53-2.02-1.49-1.66L1.4 9.48c-1.42.55-1.4 1.34-.24 1.7l5.31 1.66L18.8 5.07c.58-.38 1.11-.17.67.21L9.04 16.9z" />
            </svg>
          </a>
          <a
            href="https://discord.gg/XYfzRs9PM"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn focus-ring"
            aria-label="Nevra on Discord"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>

          <Link to="/apply" className="btn-hover focus-ring" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 38,
            padding: '0 20px',
            borderRadius: 99,
            background: 'var(--accent)',
            color: '#fff',
            fontSize: 14.5,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.01em',
            marginLeft: 2,
          }}>
            Apply
          </Link>
        </nav>
      </div>
    </header>
  )
}

const navLink = {
  fontSize: 15,
  fontWeight: 400,
  color: 'var(--ink)',
  letterSpacing: '-0.005em',
}
