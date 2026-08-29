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

      <main className="page-main shell" style={{ paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: 'calc(var(--gap-section) / 2)' }}>
        {/* Header. Single-colour heading at the site's h2 scale, like every
            other section title on the page. */}
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <h1 className="display-sm enter-up">Notes on credit and collateral</h1>
          <p className="lede enter-up enter-delay-1" style={{ marginTop: 14 }}>
            What we are reading, building, and arguing about while we underwrite payroll onchain.
          </p>
        </div>

        {/* Article grid */}
        <ul className="blog-grid" style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '48px 20px',
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
                  aspectRatio: i === 0 ? '32 / 9' : '16 / 10',
                  borderRadius: 'var(--r)',
                  overflow: 'hidden',
                  marginBottom: 20,
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
                  <span style={{ fontSize: 13, color: 'var(--ink)' }}>{article.category}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-30)' }}>·</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-45)' }}>{article.date}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-30)' }}>·</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-45)' }}>{article.readTime}</span>
                </div>

                <h2 className="blog-card-title" style={{
                  fontWeight: 400,
                  fontSize: i === 0 ? 28 : 24,
                  letterSpacing: '-0.008em',
                  lineHeight: 1.3,
                  margin: '0 0 10px',
                  color: 'var(--ink)',
                }}>
                  {article.title}
                </h2>

                <p style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: 'var(--ink-60)',
                  margin: 0,
                  maxWidth: '62ch',
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
