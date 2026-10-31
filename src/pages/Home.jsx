import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Check, Plus } from 'lucide-react'
import Nav from '../components/Nav'
import '../responsive.css'

const STEPS = [
  { title: 'Connect your income', text: 'Start with the wallet your stablecoin income arrives in. Read-only access. Your keys stay yours.' },
  { title: 'Let your history speak', text: 'Recurring income, consistency, and wallet activity help us understand the person behind the address.' },
  { title: 'Find your line', text: 'Complete identity verification. If eligible, review your credit offer and its terms before you decide.' },
]

const FAQS = [
  { question: 'Who is Nevra for?', answer: 'Nevra is built for people who earn in stablecoins and want access to consumer credit. We are onboarding a limited early cohort. Availability depends on your location, identity verification, and eligibility.' },
  { question: 'How does Nevra assess my application?', answer: 'We look at onchain activity, including recurring stablecoin income and its consistency, alongside identity verification and compliance checks. Connecting a wallet does not guarantee approval.' },
  { question: 'Do you control my wallet?', answer: 'No. Connecting your wallet gives us read-only access to its public history. We do not ask for your private keys or seed phrase. You review and authorize any transaction separately.' },
  { question: 'What will my rate and limit be?', answer: 'Your offer depends on your individual assessment. Any approved limit, rate, fees, and repayment schedule will be shown before you accept. The product preview on this page is illustrative, not a credit offer.' },
]

function ProductPreview({ step }) {
  return (
    <div className="lp-product-stage">
      <div className="lp-product-window" role="tabpanel" id="income-preview" aria-labelledby={`income-step-${step}`} tabIndex={0}>
        <div className="lp-window-bar"><span><img src="/logo.png" alt="" width="16" height="16" /> Nevra</span><span>Product preview</span></div>
        <div className="lp-product-content" key={step}>
          {step === 0 && <>
            <span className="lp-product-icon">↗</span>
            <h3>Your income starts here.</h3>
            <p>A wallet. A history. A starting point.</p>
            <div className="lp-wallet-row"><span className="lp-wallet-avatar">◎</span><div>Income wallet<small>7xKp…4nVq</small></div><span className="lp-connected"><Check size={12} /> Connected</span></div>
            <div className="lp-preview-note"><Check size={14} /> Read-only connection. No access to funds.</div>
          </>}
          {step === 1 && <>
            <span className="lp-product-eyebrow">THE BIGGER PICTURE</span>
            <h3>More than an address.</h3>
            <p>Your income history, in context.</p>
            <div className="lp-income-chart" aria-label="Illustrative recurring income over six months">
              {[48, 65, 56, 80, 73, 94].map((height, i) => <div key={i}><span style={{ height: `${height}%` }} /><small>{['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}</small></div>)}
            </div>
            <div className="lp-signal-row"><span>Recurring income</span><span><span className="lp-status-dot" /> Identified</span></div>
          </>}
          {step === 2 && <>
            <span className="lp-product-eyebrow">ON YOUR TERMS</span>
            <h3>A line to move forward.</h3>
            <p>Know where you stand before you commit.</p>
            <div className="lp-offer-row"><span>Credit limit</span><span>Personal to you</span></div>
            <div className="lp-offer-row"><span>Rate & repayment</span><span>Upfront, in your offer</span></div>
            <div className="lp-review-label">Review. Then decide.<ArrowRight size={15} /></div>
            <div className="lp-preview-note">Subject to verification and approval.</div>
          </>}
        </div>
      </div>
      <p className="lp-demo-disclaimer">Illustrative product preview. No wallet connection or credit assessment is performed here.</p>
    </div>
  )
}

export default function Home() {
  const { hash } = useLocation()
  const [step, setStep] = useState(0)

  useEffect(() => { document.title = 'Nevra | Credit' }, [])

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1) === 'calculator' ? 'how-it-works' : hash.slice(1)
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    }))
    return () => cancelAnimationFrame(frame)
  }, [hash])

  function handleStepKey(event) {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? STEPS.length - 1
      : (step + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + STEPS.length) % STEPS.length
    setStep(next)
    document.getElementById(`income-step-${next}`)?.focus()
  }

  return (
    <div className="lp">
      <Nav />
      <main id="main-content">
        <section className="lp-hero lp-shell" aria-labelledby="hero-heading">
          <div className="lp-hero-copy">
            <h1 id="hero-heading">Credit</h1>
            <p className="lp-hero-description">For people paid in stablecoins.</p>
            <Link to="/apply" className="lp-button">Get early access</Link>
          </div>
        </section>

        <section id="how-it-works" className="lp-section lp-shell" aria-labelledby="how-heading">
          <div className="lp-section-heading"><span className="lp-kicker">How it works</span><h2 id="how-heading">From income to credit.</h2></div>
          <div className="lp-product-layout">
            <div className="lp-steps" role="tablist" aria-label="Explore how Nevra works" aria-orientation="vertical" onKeyDown={handleStepKey}>
              {STEPS.map((item, i) => (
                <button key={item.title} id={`income-step-${i}`} type="button" role="tab" aria-selected={step === i} aria-controls="income-preview" tabIndex={step === i ? 0 : -1} onClick={() => setStep(i)} className={`lp-step ${step === i ? 'is-active' : ''}`}>
                  <span className="lp-step-number">0{i + 1}</span><span><span className="lp-step-title">{item.title}</span><span className="lp-step-description">{item.text}</span></span><ArrowRight size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
            <ProductPreview step={step} />
          </div>
        </section>

        <section id="why-nevra" className="lp-belief" aria-labelledby="belief-heading">
          <div className="lp-shell lp-belief-layout"><span className="lp-kicker">Why Nevra</span><div><h2 id="belief-heading">Your income should count.</h2><p>A steady onchain paycheck tells a story that a traditional credit file can miss. We’re building Nevra to read that story, and help more people access credit that makes sense for them.</p><Link to="/blog" className="lp-text-link">Our thinking <ArrowRight size={15} /></Link></div></div>
        </section>

        <section id="for-builders" className="lp-builders lp-shell" aria-labelledby="builders-heading">
          <div><span className="lp-kicker">For builders</span><h2 id="builders-heading">Credit for your users.</h2></div>
          <div><p>Building a wallet or neobank? Let’s bring consumer credit to the place your users already call home.</p><a href="mailto:hugo@nevralabs.com?subject=Nevra%20integration" className="lp-text-link">Build with Nevra <ArrowRight size={15} /></a></div>
          <div className="lp-builder-mark" aria-hidden="true"><span>Your app</span><Plus size={18} /><img src="/logo.png" alt="" width="40" height="40" loading="lazy" /></div>
        </section>

        <section className="lp-faq lp-shell" aria-labelledby="faq-heading">
          <div><h2 id="faq-heading">Questions?</h2><a className="lp-text-link" href="mailto:hugo@nevralabs.com">Ask us anything <ArrowRight size={15} /></a></div>
          <div>{FAQS.map(faq => <details className="lp-faq-item" key={faq.question}><summary>{faq.question}<Plus size={17} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section className="lp-final lp-shell"><h2>Credit that starts<br />with your income.</h2><Link to="/apply" className="lp-button">Get early access <ArrowRight size={15} /></Link><p>Subject to eligibility and approval.</p></section>
      </main>
      <footer className="lp-footer lp-shell">
        <div className="lp-footer-top"><Link to="/" className="site-brand" aria-label="Nevra home"><img src="/logo.png" alt="" width="29" height="29" loading="lazy" /><span>Nevra</span></Link><div><Link to="/blog">Journal</Link><Link to="/roadmap">Roadmap</Link><a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer">Whitepaper</a><a href="https://x.com/nevralabs" target="_blank" rel="noopener noreferrer">X ↗</a><a href="mailto:hugo@nevralabs.com">Contact</a></div></div>
        <div className="lp-footer-bottom"><p>© {new Date().getFullYear()} Nevra Inc.</p><p>Nevra is not a bank. Credit is subject to eligibility and approval.</p><div><a href="/pdf/Nevra_Terms_of_Service.pdf" target="_blank" rel="noopener noreferrer">Terms</a><a href="/pdf/Nevra_Privacy_Policy.pdf" target="_blank" rel="noopener noreferrer">Privacy</a></div></div>
        <div className="lp-wordmark" aria-hidden="true">Nevra</div>
      </footer>
    </div>
  )
}
