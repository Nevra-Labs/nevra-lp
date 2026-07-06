import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
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
    options: ['Under $10k', '$10k to $50k', '$50k to $200k', 'Over $200k'],
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

// Stripe-style option card: white surface, hairline border, level-1 shadow.
const optionBtn = {
  background: 'var(--surface)',
  color: 'var(--ink)',
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 400,
  padding: '14px 18px',
  borderRadius: 10,
  lineHeight: 1.3,
  border: '1px solid var(--hairline)',
  boxShadow: '0 1px 3px rgba(0,55,112,0.08)',
  cursor: 'pointer',
  transition: 'box-shadow 0.15s, border-color 0.15s',
  textAlign: 'left',
  width: '100%',
}

const optionBtnHover = {
  borderColor: 'var(--accent)',
  boxShadow: '0 8px 24px rgba(0,55,112,0.08), 0 2px 6px rgba(0,55,112,0.04)',
}

export default function Apply() {
  const privy = PRIVY_ENABLED
    ? usePrivy()
    : { ready: true, authenticated: false, user: null, login: () => alert('Set VITE_PRIVY_APP_ID and VITE_PRIVY_CLIENT_ID in .env'), logout: () => {} }
  const { ready, authenticated, user, login, logout } = privy

  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | landing | questionnaire | done

  // Once Privy is ready, show landing or check existing submission
  useEffect(() => {
    if (!ready) return
    if (!authenticated) {
      setPhase('landing')
      return
    }
    if (!supabase || !user) {
      setPhase('questionnaire')
      return
    }
    supabase
      .from('applications')
      .select('id')
      .eq('privy_user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        setPhase(data ? 'done' : 'questionnaire')
      })
  }, [ready, authenticated, user])

  const handleLogin = async () => {
    await login()
  }

  const handleOption = async (questionId, option) => {
    const next = { ...answers, [questionId]: option }
    setAnswers(next)

    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1)
      setAnimKey(k => k + 1)
    } else {
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
      background: 'var(--paper)',
      minHeight: '100vh',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Nav rightExtra={authenticated ? (
        <button
          onClick={logout}
          className="fade-in"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'rgba(0,0,0,0.35)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 12px',
            letterSpacing: '0.01em',
            transition: 'color 0.15s',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(0,0,0,0.7)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.35)'}
        >
          Disconnect
        </button>
      ) : null} />

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

        {phase === 'loading' && (
          <div className="fade-in" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--ink-30)',
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
        )}

        {phase === 'landing' && (
          <div key="landing" className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '0 24px', textAlign: 'center' }}>
            <p className="eyebrow" style={{ color: 'var(--ink-45)', margin: 0 }}>[ Closed beta ]</p>
            <h1 style={{
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 44px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color: 'var(--ink)',
              margin: 0,
            }}>
              Apply for the closed beta
            </h1>
            <p style={{ fontSize: 16, color: 'var(--ink-60)', lineHeight: 1.6, maxWidth: 400, margin: '0 0 12px' }}>
              A few quick questions, then you're in line for the next cohort.
            </p>
            <button
              onClick={handleLogin}
              className="btn-hover focus-ring"
              style={{
                background: 'var(--accent)',
                color: '#fff',
                fontFamily: 'inherit',
                fontSize: 15,
                fontWeight: 400,
                padding: '12px 24px',
                borderRadius: 99,
                lineHeight: 1,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Apply now →
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
                  background: i <= step ? 'var(--accent)' : 'var(--hairline)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>

            <h2 style={{
              fontWeight: 300,
              fontSize: 26,
              letterSpacing: '-0.02em',
              color: 'var(--ink)',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.3,
            }}>
              {currentQuestion.question}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => handleOption(currentQuestion.id, opt)}
                  className="fade-up focus-ring"
                  style={{ ...optionBtn, animationDelay: `${i * 0.06}s` }}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, optionBtnHover)}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hairline)'; e.currentTarget.style.boxShadow = optionBtn.boxShadow }}
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
              fontWeight: 300,
              fontSize: 34,
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              margin: 0,
            }}>
              You're on the list.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-60)', margin: 0 }}>
              We'll reach out when your spot opens up.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
