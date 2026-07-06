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

// Glassy button style
const glassBtn = {
  background: 'rgba(255,255,255,0.45)',
  color: '#1a1a1a',
  fontSize: 14,
  fontWeight: 500,
  padding: '13px 20px',
  borderRadius: 12,
  lineHeight: 1,
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  cursor: 'pointer',
  transition: 'box-shadow 0.15s, background 0.15s',
  textAlign: 'left',
  width: '100%',
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
                background: 'rgba(0,0,0,0.25)',
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>
        )}

        {phase === 'landing' && (
          <div key="landing" className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <h1 style={{
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              margin: 0,
              textAlign: 'center',
              textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)',
            }}>
              Apply for the closed beta
            </h1>
            <button
              onClick={handleLogin}
              style={{ ...glassBtn, width: 'auto', textAlign: 'center', padding: '11px 24px' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.65)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.11), inset 0 1px 0 rgba(255,255,255,0.9)' }}
              onMouseLeave={e => { e.currentTarget.style.background = glassBtn.background; e.currentTarget.style.boxShadow = glassBtn.boxShadow }}
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
              color: 'var(--ink)',
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
                  style={{ ...glassBtn, animationDelay: `${i * 0.06}s` }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.65)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.11), inset 0 1px 0 rgba(255,255,255,0.9)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = glassBtn.background; e.currentTarget.style.boxShadow = glassBtn.boxShadow }}
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
              color: 'var(--ink)',
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
