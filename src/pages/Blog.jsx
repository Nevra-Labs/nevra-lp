import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { articles } from '../data/articles'

export default function Blog() {
  return (
    <div style={{ background: '#EEEDFF', minHeight: '100vh', color: '#111' }}>
      <Nav dark />

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 32px 120px' }}>
        <h1 style={{
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 42px)',
          letterSpacing: '-0.025em',
          marginBottom: 56,
        }}>
          Blog
        </h1>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {articles.map((article, i) => (
            <li key={article.id}>
              {i > 0 && <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', margin: '0' }} />}
              <Link
                to={`/blog/${article.id}`}
                style={{ display: 'block', padding: '32px 0', textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
                  <h2 style={{ fontWeight: 600, fontSize: 20, letterSpacing: '-0.015em', margin: 0 }}>
                    {article.title}
                  </h2>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)', whiteSpace: 'nowrap' }}>
                    {article.readTime}
                  </span>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(0,0,0,0.55)', margin: '0 0 12px' }}>
                  {article.excerpt}
                </p>
                <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.35)' }}>{article.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
