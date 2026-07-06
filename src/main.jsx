import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import './index.css'
import App from './App.jsx'

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID
const PRIVY_CLIENT_ID = import.meta.env.VITE_PRIVY_CLIENT_ID
const hasValidPrivyId =
  PRIVY_APP_ID &&
  PRIVY_APP_ID !== 'your-privy-app-id-here' &&
  PRIVY_CLIENT_ID &&
  PRIVY_CLIENT_ID !== 'your-privy-client-id-here'

const tree = hasValidPrivyId ? (
  <PrivyProvider
    appId={PRIVY_APP_ID}
    clientId={PRIVY_CLIENT_ID}
    config={{
      appearance: {
        theme: 'light',
        accentColor: '#533AFD',
        logo: '/logo.png',
      },
      loginMethods: ['email'],
      embeddedWallets: {
        ethereum: {
          createOnLogin: 'users-without-wallets',
        },
      },
    }}
  >
    <App />
  </PrivyProvider>
) : (
  <App />
)

createRoot(document.getElementById('root')).render(
  <StrictMode>{tree}</StrictMode>
)
