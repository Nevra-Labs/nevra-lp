import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { articles } from '../data/articles'
import BlogCover from '../components/BlogCover'
import '../responsive.css'

export default function Blog() {
  useEffect(() => {
    document.title = 'Blog | Nevra'
    return () => { document.title = 'Nevra | Real credit for crypto-native people' }
  }, [])

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', color: 'var(--ink)' }}>
      <Nav />

      <main className="page-main" style={{ maxWidth: 960, margin: '0 auto', padding: '128px 32px 140px' }}>
        {/* Header */}
        <div style={{ marginBottom: 72, maxWidth: 640 }}>
          <h1 className="enter-up" style={{
            fontWeight: 300,
            fontSize: 'clamp(34px, 4.4vw, 54px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.06,
            marginBottom: 22,
          }}>
            <span style={{ display: 'block' }}>Notes on credit, collateral,</span>
            <span style={{ display: 'block', color: 'var(--ink-45)' }}>and the crypto economy.</span>
          </h1>
          <p className="enter-up enter-delay-1" style={{
            fontSize: 16,
            color: 'var(--ink-60)',
            lineHeight: 1.65,
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
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 24,
                  border: '1px solid var(--hairline)',
                  boxShadow: '0 1px 3px rgba(0,55,112,0.08)',
                }}>
                  {article.cover ? (
                    <img
                      src={article.cover}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <BlogCover variant={i % 3} featured={i === 0} />
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 14,
                }}>
                  <span className="eyebrow" style={{
                    display: 'inline-block',
                    fontSize: 10,
                    color: 'var(--ink-60)',
                    border: '1px solid var(--hairline)',
                    padding: '5px 10px',
                    borderRadius: 99,
                  }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--ink-45)' }}>{article.date}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-30)' }}>·</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-45)' }}>{article.readTime}</span>
                </div>

                <h2 className="blog-card-title" style={{
                  fontWeight: 500,
                  fontSize: i === 0 ? 'clamp(24px, 3vw, 32px)' : 'clamp(19px, 2vw, 22px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  margin: '0 0 12px',
                  color: 'var(--ink)',
                }}>
                  {article.title}
                </h2>

                <p style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'var(--ink-60)',
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
