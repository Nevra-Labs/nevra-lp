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

  useEffect(() => {
    document.title = article ? `${article.title} | Nevra` : 'Article not found | Nevra'
    return () => { document.title = 'Nevra | Real credit for crypto-native people' }
  }, [article])

  if (!article) {
    return (
      <div style={{ background: 'var(--paper)', minHeight: '100vh', color: 'var(--ink)' }}>
        <Nav />
        <main style={{ maxWidth: 720, margin: '0 auto', padding: 'calc(var(--nav-h) + 72px) 32px' }}>
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

      <main className="page-main" style={{ maxWidth: 720, margin: '0 auto', padding: 'calc(var(--nav-h) + 64px) 32px 120px' }}>
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
          <span style={{ fontSize: 13, color: 'var(--ink)' }}>{article.category}</span>
          <span style={{ fontSize: 13, color: 'var(--ink-30)' }}>·</span>
          <span style={{ fontSize: 13, color: 'var(--ink-45)' }}>{article.date}</span>
          <span style={{ fontSize: 13, color: 'var(--ink-30)' }}>·</span>
          <span style={{ fontSize: 13, color: 'var(--ink-45)' }}>{article.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="enter-up enter-delay-2" style={{
          fontWeight: 400,
          fontSize: 'clamp(30px, 3.4vw, 44px)',
          letterSpacing: '-0.012em',
          lineHeight: 1.2,
          marginBottom: 18,
        }}>
          {article.title}
        </h1>

        {/* Excerpt / lede */}
        <p className="enter-up enter-delay-3" style={{
          fontSize: 16,
          lineHeight: 1.5,
          color: 'var(--ink-60)',
          margin: '0 0 40px',
          fontWeight: 400,
        }}>
          {article.excerpt}
        </p>

        {/* Cover */}
        <div className="enter-cover enter-delay-3" style={{
          width: '100%',
          aspectRatio: '16 / 8',
          borderRadius: 'var(--r)',
          overflow: 'hidden',
          marginBottom: 56,
        }}>
          {article.cover ? (
            <img
              src={article.cover}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <BlogCover variant={variantIndex} featured />
          )}
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
          background: 'var(--dark)',
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
            fontWeight: 400,
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

/* Bold, italic and links, in that order so the bold pattern claims its
   asterisks before the italic one sees them. Anything else falls through as
   text: the renderer stays a reader for the subset we actually write in. */
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    // Emphasis recurses: the sign-off is a whole italic paragraph with a link
    // inside it, so the inner text has to be read again rather than printed.
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{renderInline(part.slice(2, -2))}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={i}>{renderInline(part.slice(1, -1))}</em>
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      // Internal hrefs go through the router, so /apply does not reload the
      // app and drop straight back into the Privy handoff cold.
      if (href.startsWith('/')) {
        return <Link key={i} to={href} className="focus-ring">{label}</Link>
      }
      return (
        <a key={i} href={href} className="focus-ring" target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function ArticleBody({ content }) {
  const blocks = content.trim().split(/\n\n+/)
  const out = []
  let i = 0
  while (i < blocks.length) {
    const block = blocks[i]

    if (/^-{3,}$/.test(block.trim())) {
      out.push(
        <hr key={i} style={{
          border: 0,
          borderTop: '1px solid var(--hairline)',
          margin: '44px 0 28px',
        }} />
      )
      i++
      continue
    }

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

    // Unordered list: collect all consecutive `- ` blocks (each item may be its own block)
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
