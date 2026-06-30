import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { supabase } from '../lib/supabase'
import '../responsive.css'

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID
const PRIVY_CLIENT_ID = import.meta.env.VITE_PRIVY_CLIENT_ID
const PRIVY_ENABLED =
  PRIVY_APP_ID &&
  PRIVY_APP_ID !== 'your-privy-app-id-here' &&
  PRIVY_CLIENT_ID &&
  PRIVY_CLIENT_ID !== 'your-privy-client-id-here'

const QUESTIONS = [
  {
    id: 'country',
    question: 'Are you based in the United States?',
    options: ['Yes', 'No'],
  },
  {
    id: 'crypto_holdings',
    question: 'What best describes your crypto portfolio?',
    options: ['Under $10k', '$10k – $50k', '$50k – $200k', 'Over $200k'],
  },
  {
    id: 'loan_purpose',
    question: 'What would you use a credit line for?',
    options: ['Living expenses', 'Business / startup', 'Investments', 'Other'],
  },
  {
    id: 'collateral',
    question: 'Are you comfortable borrowing without posting collateral?',
    options: ["Yes, that's the appeal", "I'd prefer some collateral option", 'Not sure yet'],
  },
  {
    id: 'timeline',
    question: 'How soon would you want access?',
    options: ['ASAP', 'Within 3 months', 'Just exploring for now'],
  },
]

// Hero-style button shared style
const heroBtn = {
  background: '#EEEDFF',
  color: '#333',
  fontSize: 14,
  fontWeight: 500,
  padding: '11px 20px',
  borderRadius: 10,
  lineHeight: 1,
  border: '1px solid rgba(0,0,0,0.13)',
  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
  cursor: 'pointer',
  transition: 'box-shadow 0.15s, background 0.15s',
}

export default function Apply() {
  const privy = PRIVY_ENABLED
    ? usePrivy()
    : { authenticated: false, user: null, login: () => alert('Set VITE_PRIVY_APP_ID and VITE_PRIVY_CLIENT_ID in .env') }
  const { authenticated, user, login } = privy

  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [phase, setPhase] = useState('landing') // landing | questionnaire | done

  // Once authenticated, check if user already answered
  useEffect(() => {
    if (!authenticated || !user || !supabase) return
    supabase
      .from('applications')
      .select('id')
      .eq('privy_user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setPhase('done')
        else if (phase === 'landing') setPhase('questionnaire')
      })
  }, [authenticated, user])

  const handleLogin = async () => {
    await login()
    // phase transition handled by the useEffect above
  }

  const handleOption = async (questionId, option) => {
    const next = { ...answers, [questionId]: option }
    setAnswers(next)

    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1)
      setAnimKey(k => k + 1)
    } else {
      // Last question — save to Supabase
      if (supabase && user) {
        await supabase.from('applications').upsert({
          privy_user_id: user.id,
          email: user.email?.address ?? null,
          ...next,
          [questionId]: option,
        }, { onConflict: 'privy_user_id' })
      }
      setPhase('done')
      setAnimKey(k => k + 1)
    }
  }

  const currentQuestion = QUESTIONS[step]

  return (
    <div style={{
      background: '#EEEDFF',
      minHeight: '100vh',
      fontFamily: "'Inter', system-ui, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Nav */}
      <header className="blog-nav" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 32px',
        flexShrink: 0,
      }}>
        <Link to="/">
          <img src="/logo.png" alt="Nevra" style={{ width: 24, height: 24, display: 'block' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link to="/blog" style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.01em' }}>
            Blog
          </Link>
          <a href="/pdf/whitepaper.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 500, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.01em' }}>
            Whitepaper
          </a>
        </div>
      </header>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '14vh',
        gap: 28,
      }}>

        {phase === 'landing' && (
          <div key="landing" className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <h1 style={{
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: '-0.03em',
              color: '#111',
              margin: 0,
              textAlign: 'center',
              textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
            }}>
              Apply for the closed beta
            </h1>
            <button
              onClick={handleLogin}
              style={heroBtn}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.18)'; e.currentTarget.style.background = '#e8e7f8' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = heroBtn.boxShadow; e.currentTarget.style.background = heroBtn.background }}
            >
              Apply now
            </button>
          </div>
        )}

        {phase === 'questionnaire' && currentQuestion && (
          <div
            key={`q-${animKey}`}
            className="fade-up"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              width: '100%',
              maxWidth: 420,
              padding: '0 24px',
            }}
          >
            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 6 }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: i <= step ? '#111' : 'rgba(0,0,0,0.18)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>

            <h2 style={{
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.025em',
              color: '#111',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.35,
              textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
            }}>
              {currentQuestion.question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => handleOption(currentQuestion.id, opt)}
                  className="fade-up"
                  style={{
                    ...heroBtn,
                    padding: '13px 20px',
                    textAlign: 'left',
                    width: '100%',
                    animationDelay: `${i * 0.06}s`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.18)'; e.currentTarget.style.background = '#e8e7f8' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = heroBtn.boxShadow; e.currentTarget.style.background = heroBtn.background }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div key="done" className="fade-up" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: '-0.03em',
              color: '#111',
              margin: 0,
              textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
            }}>
              You're on the list.
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', margin: 0 }}>
              We'll reach out when your spot opens up.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
