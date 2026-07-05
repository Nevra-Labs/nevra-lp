import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import BlogCover from '../components/BlogCover'
import { articles } from '../data/articles'
import '../responsive.css'

export default function ArticlePage() {
  const { id } = useParams()
  const article = articles.find(a => a.id === id)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max <= 0 ? 0 : Math.min(100, (doc.scrollTop / max) * 100))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!article) {
    return (
      <div style={{ background: 'var(--paper)', minHeight: '100vh', color: '#111' }}>
        <Nav dark />
        <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 32px' }}>
          <p>Article not found.</p>
          <Link to="/blog">← Back to blog</Link>
        </main>
      </div>
    )
  }

  const variantIndex = Math.max(0, articles.findIndex(a => a.id === article.id))

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', color: '#111' }}>
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <Nav dark />

      <main className="page-main" style={{ maxWidth: 720, margin: '0 auto', padding: '32px 32px 120px' }}>
        <Link to="/blog" className="enter-up focus-ring" style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'rgba(0,0,0,0.5)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 32,
        }}>
          <span aria-hidden>←</span> Back to blog
        </Link>

        {/* Meta */}
        <div className="enter-up enter-delay-1" style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
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
          <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>{article.date}</span>
          <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.3)' }}>·</span>
          <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>{article.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="enter-up enter-delay-2" style={{
          fontWeight: 500,
          fontSize: 'clamp(30px, 5vw, 48px)',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          marginBottom: 22,
        }}>
          {article.title}
        </h1>

        {/* Excerpt / lede */}
        <p className="enter-up enter-delay-3" style={{
          fontSize: 18,
          lineHeight: 1.55,
          color: 'rgba(0,0,0,0.6)',
          margin: '0 0 40px',
          fontWeight: 400,
        }}>
          {article.excerpt}
        </p>

        {/* Cover */}
        <div className="enter-cover enter-delay-3" style={{
          width: '100%',
          aspectRatio: '16 / 8',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 56,
          boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <BlogCover variant={variantIndex} featured />
        </div>

        {/* Body */}
        <div className="article-prose enter-up enter-delay-4" style={{ fontSize: 17, lineHeight: 1.75, color: '#1a1a1a' }}>
          <ArticleBody content={article.content} />
        </div>

        {/* Footer CTA */}
        <div className="enter-up" style={{
          marginTop: 80,
          padding: '32px 28px',
          borderRadius: 16,
          background: '#111',
          color: 'var(--paper)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <p style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(238,237,255,0.5)',
            margin: 0,
          }}>
            Ready to apply?
          </p>
          <h2 style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.25,
          }}>
            Verify once, connect your accounts, and open a real credit line.
          </h2>
          <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn-hover focus-ring-light key-light" style={{
              background: 'var(--paper)',
              color: '#333',
              fontSize: 14,
              fontWeight: 500,
              padding: '11px 20px',
              borderRadius: 10,
              lineHeight: 1,
              border: '1px solid rgba(255,255,255,0.3)',
            }}>
              Apply Now →
            </Link>
            <Link to="/blog" className="btn-hover focus-ring-light" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'var(--paper)',
              fontSize: 14,
              fontWeight: 500,
              padding: '11px 20px',
              borderRadius: 10,
              lineHeight: 1,
              border: '1px solid rgba(255,255,255,0.18)',
            }}>
              More articles
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  )
}

function ArticleBody({ content }) {
  const blocks = content.trim().split(/\n\n+/)
  const out = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]

    if (block.startsWith('## ')) {
      out.push(
        <h2 key={i} style={{
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: '-0.015em',
          marginTop: 44,
          marginBottom: 16,
          color: '#0a0a0a',
        }}>
          {block.replace('## ', '')}
        </h2>
      )
      i++
      continue
    }

    // Unordered list — collect all consecutive `- ` blocks (each item may be its own block)
    if (/^-\s/.test(block)) {
      const items = []
      while (i < blocks.length && /^-\s/.test(blocks[i])) {
        blocks[i].split(/\n/).forEach(line => {
          const m = line.match(/^-\s+(.*)$/)
          if (m) items.push(m[1])
        })
        i++
      }
      out.push(
        <ul key={`ul-${i}`}>
          {items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
        </ul>
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(block)) {
      const items = []
      while (i < blocks.length && /^\d+\.\s/.test(blocks[i])) {
        blocks[i].split(/\n/).forEach(line => {
          const m = line.match(/^\d+\.\s+(.*)$/)
          if (m) items.push(m[1])
        })
        i++
      }
      out.push(
        <ol key={`ol-${i}`}>
          {items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
        </ol>
      )
      continue
    }

    out.push(<p key={i}>{renderInline(block)}</p>)
    i++
  }
  return out
}
