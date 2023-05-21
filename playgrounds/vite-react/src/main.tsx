import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { config } from './wagmi.ts'
import { WagmiConfig } from 'wagmi'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig value={config}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </WagmiConfig>
  </React.StrictMode>,
)
