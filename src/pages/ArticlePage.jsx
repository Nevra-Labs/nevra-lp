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
      <div style={{ background: 'var(--paper)', minHeight: '100vh', color: 'var(--ink)' }}>
        <Nav />
        <main style={{ maxWidth: 720, margin: '0 auto', padding: '128px 32px' }}>
          <p>Article not found.</p>
          <Link to="/blog">← Back to blog</Link>
        </main>
      </div>
    )
  }

  const variantIndex = Math.max(0, articles.findIndex(a => a.id === article.id))

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', color: 'var(--ink)' }}>
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <Nav />

      <main className="page-main" style={{ maxWidth: 720, margin: '0 auto', padding: '110px 32px 120px' }}>
        <Link to="/blog" className="enter-up focus-ring" style={{
          fontSize: 13,
          fontWeight: 400,
          color: 'var(--ink-60)',
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

        {/* Title */}
        <h1 className="enter-up enter-delay-2" style={{
          fontWeight: 300,
          fontSize: 'clamp(30px, 4.6vw, 46px)',
          letterSpacing: '-0.025em',
          lineHeight: 1.08,
          marginBottom: 22,
        }}>
          {article.title}
        </h1>

        {/* Excerpt / lede */}
        <p className="enter-up enter-delay-3" style={{
          fontSize: 18,
          lineHeight: 1.6,
          color: 'var(--ink-60)',
          margin: '0 0 40px',
          fontWeight: 300,
        }}>
          {article.excerpt}
        </p>

        {/* Cover */}
        <div className="enter-cover enter-delay-3" style={{
          width: '100%',
          aspectRatio: '16 / 8',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 56,
          border: '1px solid var(--hairline)',
          boxShadow: '0 1px 3px rgba(0,55,112,0.08)',
        }}>
          <BlogCover variant={variantIndex} featured />
        </div>

        {/* Body */}
        <div className="article-prose enter-up enter-delay-4" style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--ink)' }}>
          <ArticleBody content={article.content} />
        </div>

        {/* Footer CTA */}
        <div className="enter-up" style={{
          marginTop: 80,
          padding: '40px 36px',
          borderRadius: 12,
          background: '#0D1738',
          color: 'var(--dark-ink)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}>
          <p className="eyebrow" style={{
            color: 'var(--dark-ink-60)',
            margin: 0,
          }}>
            [ Ready to apply? ]
          </p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 28px)',
            fontWeight: 300,
            letterSpacing: '-0.025em',
            margin: 0,
            lineHeight: 1.2,
          }}>
            <span style={{ color: 'var(--dark-ink)' }}>Verify once, connect your accounts, </span>
            <span style={{ color: 'var(--dark-ink-38)' }}>and open a real credit line.</span>
          </h2>
          <div style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
            <Link to="/apply" className="btn-hover focus-ring-light" style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--dark-ink)',
              color: 'var(--ink)',
              fontSize: 15,
              fontWeight: 400,
              letterSpacing: '0.01em',
              padding: '12px 22px',
              borderRadius: 99,
              lineHeight: 1,
            }}>
              Apply now →
            </Link>
            <Link to="/blog" className="btn-hover focus-ring-light" style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              color: 'var(--dark-ink)',
              fontSize: 15,
              fontWeight: 400,
              letterSpacing: '0.01em',
              padding: '12px 22px',
              borderRadius: 99,
              lineHeight: 1,
              border: '1px solid var(--dark-hairline)',
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
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: '-0.02em',
          marginTop: 44,
          marginBottom: 16,
          color: 'var(--ink)',
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
