import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { articles } from '../data/articles'

export default function ArticlePage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === id)

  if (!article) {
    return (
      <div style={{ background: '#EEEDFF', minHeight: '100vh', color: '#111' }}>
        <Nav dark />
        <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 32px' }}>
          <p>Article not found.</p>
          <Link to="/blog">← Back to blog</Link>
        </main>
      </div>
    )
  }

  const paragraphs = article.content.split('\n\n')

  return (
    <div style={{ background: '#EEEDFF', minHeight: '100vh', color: '#111' }}>
      <Nav dark />

      <main style={{ maxWidth: 680, margin: '0 auto', padding: '48px 32px 120px' }}>
        <Link to="/blog" style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'rgba(0,0,0,0.4)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 40,
        }}>
          ← Blog
        </Link>

        <h1 style={{
          fontWeight: 700,
          fontSize: 'clamp(26px, 4vw, 40px)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', gap: 6, marginBottom: 56, color: 'rgba(0,0,0,0.4)', fontSize: 13 }}>
          <span style={{ fontWeight: 500 }}>{article.category}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <div style={{ fontSize: 16, lineHeight: 1.75, color: '#1a1a1a' }}>
          {paragraphs.map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} style={{
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: '-0.015em',
                  marginTop: 48,
                  marginBottom: 16,
                }}>
                  {block.replace('## ', '')}
                </h2>
              )
            }
            if (block.startsWith('**') && block.endsWith('**')) {
              return (
                <p key={i} style={{ marginBottom: 16 }}>
                  <strong>{block.slice(2, -2)}</strong>
                </p>
              )
            }
            // Handle inline bold
            const parts = block.split(/(\*\*[^*]+\*\*)/)
            return (
              <p key={i} style={{ marginBottom: 20 }}>
                {parts.map((part, j) =>
                  part.startsWith('**') && part.endsWith('**')
                    ? <strong key={j}>{part.slice(2, -2)}</strong>
                    : part
                )}
              </p>
            )
          })}
        </div>
      </main>
    </div>
  )
}
