import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { articles } from '../data/articles'
import '../responsive.css'

const COVER_COLORS = [
  'linear-gradient(135deg, #c9c6f0 0%, #a8a4e0 100%)',
  'linear-gradient(135deg, #b8d4f0 0%, #8fb8e8 100%)',
  'linear-gradient(135deg, #d0c6f0 0%, #b0a0e0 100%)',
]

export default function Blog() {
  return (
    <div style={{ background: '#EEEDFF', minHeight: '100vh', color: '#111' }}>
      <Nav dark />

      <main className="page-main" style={{ maxWidth: 760, margin: '0 auto', padding: '48px 32px 120px' }}>
        <h1 style={{
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 42px)',
          letterSpacing: '-0.025em',
          marginBottom: 8,
        }}>
          Blog
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(0,0,0,0.45)', marginBottom: 56 }}>
          Insights, updates, and education from the Nevra team.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {articles.map((article, i) => (
            <li key={article.id}>
              <Link to={`/blog/${article.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', marginBottom: 56 }}>
                {/* Cover block */}
                <div className="card-cover" style={{
                  width: '100%',
                  aspectRatio: '16 / 7',
                  borderRadius: 12,
                  background: COVER_COLORS[i % COVER_COLORS.length],
                  marginBottom: 20,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '20px 24px',
                }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    Nevra
                  </span>
                </div>

                {/* Meta */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  color: 'rgba(0,0,0,0.45)',
                  marginBottom: 10,
                }}>
                  <span style={{ fontWeight: 500 }}>{article.category}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontWeight: 700,
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  margin: '0 0 10px',
                }}>
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'rgba(0,0,0,0.55)',
                  margin: 0,
                  maxWidth: 620,
                }}>
                  {article.excerpt}
                </p>
              </Link>

              {i < articles.length - 1 && (
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', marginBottom: 56 }} />
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
