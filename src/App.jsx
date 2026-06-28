export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Fixed fullscreen video */}
      <video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Hero section */}
      <section style={{ position: 'relative', minHeight: '100vh', zIndex: 5 }}>
        {/* Nav */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 32px',
        }}>
          <a href="#">
            <img
              src="/logo.png"
              alt="Oslo"
              style={{ width: 24, height: 24, display: 'block', filter: 'invert(1)' }}
            />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="#" style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.01em' }}>
              Blog
            </a>
            <a href="#" style={{
              background: '#EEEDFF',
              color: '#111',
              fontSize: 14,
              fontWeight: 500,
              padding: '9px 18px',
              borderRadius: 999,
              lineHeight: 1,
            }}>
              Apply
            </a>
          </div>
        </header>

        {/* Hero copy — shifted right and slightly above center */}
        <div style={{
          position: 'absolute',
          top: '36%',
          transform: 'translateY(-50%)',
          left: '10%',
          maxWidth: 560,
          color: '#EEEDFF',
        }}>
          <h1 style={{
            fontWeight: 600,
            fontSize: 'clamp(28px, 3.4vw, 48px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: 16,
            textShadow: '0 1px 6px rgba(0,0,0,0.25)',
          }}>
            Consumer loans<br />for crypto-native people.
          </h1>
          <p style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'rgba(238,237,255,0.72)',
            marginBottom: 28,
            textShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}>
            Borrow against your portfolio. Repay on your terms,<br />
            no banks, no paperwork, no surprises.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="#" style={{
              background: '#EEEDFF',
              color: '#111',
              fontSize: 14,
              fontWeight: 500,
              padding: '11px 20px',
              borderRadius: 999,
              lineHeight: 1,
            }}>
              Apply Now →
            </a>
            <a href="#" style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#EEEDFF',
              fontSize: 14,
              fontWeight: 500,
              padding: '11px 20px',
              borderRadius: 999,
              lineHeight: 1,
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}>
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 5,
        background: '#EEEDFF',
        color: '#111',
        padding: '64px 52px 0',
        overflow: 'hidden',
      }}>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: 52 }}>
          {/* Top row: brand + columns */}
          <div style={{ display: 'flex', gap: 64, marginBottom: 64 }}>
            {/* Brand */}
            <div style={{ minWidth: 200 }}>
              <div style={{ marginBottom: 12 }}>
                <img src="/logo.png" alt="" style={{ width: 22, height: 22 }} />
              </div>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', lineHeight: 1.5 }}>
                ©Nevra Inc. 2026<br />All rights reserved.
              </p>
            </div>

            {/* Columns */}
            <div style={{ display: 'flex', gap: 64, flex: 1, justifyContent: 'flex-end' }}>
              <FooterCol title="Product" links={[
                { label: 'Apply', href: '#' },
                { label: 'Blog', href: '#' },
              ]} />
              <FooterCol title="Socials" links={[
                { label: 'Twitter', href: 'https://x.com/nevralabs' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nevralabs' },
                { label: 'Telegram', href: 'https://t.me/nevragenesis' },
                { label: 'Discord', href: 'https://discord.gg/XYfzRs9PM' },
              ]} />
              <FooterCol title="Legal" links={[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookie Policy', href: '#' },
              ]} />
            </div>
          </div>
        </div>

        {/* Big wordmark */}
        <div style={{
          fontSize: 'clamp(80px, 14vw, 180px)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'rgba(0,0,0,0.08)',
          lineHeight: 0.85,
          marginLeft: '-0.03em',
          userSelect: 'none',
          paddingBottom: 0,
        }}>
          Nevra
        </div>
      </footer>
    </div>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: '#111' }}>{title}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', fontWeight: 400 }}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
