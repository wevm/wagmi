import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { config } from './wagmi.ts'
import { WagmiConfig } from 'wagmi'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig value={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
)
