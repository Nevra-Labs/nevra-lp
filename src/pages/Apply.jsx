import { useState, useEffect, useRef } from 'react'
import { usePrivy, useLogin } from '@privy-io/react-auth'
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
  // PRIVY_ENABLED is a build-time constant, so the branch is stable for the
  // life of the app and these hooks always run in the same order.
  const privy = PRIVY_ENABLED
    ? usePrivy()
    : { ready: true, authenticated: false, user: null }
  const { ready, authenticated, user } = privy

  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  // signin is a recovery state, not a landing page: it only appears if the
  // Privy modal was dismissed, so the visitor has a way back in.
  const [phase, setPhase] = useState('loading') // loading | signin | questionnaire | done

  const loginHook = PRIVY_ENABLED
    ? useLogin({ onError: () => setPhase('signin') })
    : { login: () => alert('Set VITE_PRIVY_APP_ID and VITE_PRIVY_CLIENT_ID in .env') }
  const { login } = loginHook

  // Opening the modal is a side effect with no idempotence of its own, so it
  // fires once per mount rather than on every pass of the effect.
  const promptedRef = useRef(false)

  useEffect(() => {
    document.title = 'Apply | Nevra'
    return () => { document.title = 'Nevra | Real credit for crypto-native people' }
  }, [])

  // Apply has one job, so there is nothing to land on: go straight to Privy,
  // then straight to the questions.
  useEffect(() => {
    if (!ready) return
    if (!authenticated) {
      if (!PRIVY_ENABLED) {
        setPhase('signin')
        return
      }
      if (promptedRef.current) return
      promptedRef.current = true
      setPhase('loading')
      login()
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
    setPhase('loading')
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
        const { error } = await supabase.from('applications').upsert({
          privy_user_id: user.id,
          email: user.email?.address ?? null,
          ...next,
          [questionId]: option,
        }, { onConflict: 'privy_user_id' })
        if (error) console.error('Application save failed:', error.message)
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
      <Nav />

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

        {phase === 'signin' && (
          <div key="signin" className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '0 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.6, margin: 0 }}>
              Sign in to pick up your application.
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
              Continue
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
