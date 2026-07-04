import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { articles } from '../data/articles'
import BlogCover from '../components/BlogCover'
import '../responsive.css'

export default function Blog() {
  return (
    <div style={{ background: '#EEEDFF', minHeight: '100vh', color: '#111' }}>
      <Nav dark />

      <main className="page-main" style={{ maxWidth: 960, margin: '0 auto', padding: '64px 32px 140px' }}>
        {/* Header */}
        <div style={{ marginBottom: 72, maxWidth: 640 }}>
          <p className="enter-up" style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.4)',
            marginBottom: 20,
          }}>
            The Nevra journal
          </p>
          <h1 className="enter-up enter-delay-1" style={{
            fontWeight: 500,
            fontSize: 'clamp(34px, 5vw, 56px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            Notes on credit,<br />collateral, and the crypto economy.
          </h1>
          <p className="enter-up enter-delay-2" style={{
            fontSize: 16,
            color: 'rgba(0,0,0,0.5)',
            lineHeight: 1.6,
            maxWidth: 520,
          }}>
            Deep dives, product updates, and plain-English explainers from the team building undercollateralized credit for crypto.
          </p>
        </div>

        {/* Article grid */}
        <ul className="blog-grid" style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '56px 32px',
        }}>
          {articles.map((article, i) => (
            <li
              key={article.id}
              className={`enter-up enter-delay-${Math.min(i + 3, 5)}`}
              style={i === 0 ? { gridColumn: '1 / -1' } : undefined}
            >
              <Link
                to={`/blog/${article.id}`}
                className="blog-card focus-ring"
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div className="blog-card-cover card-cover" style={{
                  width: '100%',
                  aspectRatio: i === 0 ? '21 / 9' : '16 / 10',
                  borderRadius: 16,
                  overflow: 'hidden',
                  marginBottom: 24,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
                }}>
                  <BlogCover variant={i % 3} featured={i === 0} />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 14,
                }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.7)',
                    background: 'rgba(0,0,0,0.06)',
                    padding: '5px 10px',
                    borderRadius: 999,
                  }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>{article.date}</span>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.3)' }}>·</span>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>{article.readTime}</span>
                </div>

                <h2 className="blog-card-title" style={{
                  fontWeight: 600,
                  fontSize: i === 0 ? 'clamp(24px, 3vw, 32px)' : 'clamp(19px, 2vw, 22px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  margin: '0 0 12px',
                  color: '#111',
                }}>
                  {article.title}
                </h2>

                <p style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'rgba(0,0,0,0.55)',
                  margin: 0,
                }}>
                  {article.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
