/* @refresh reload */

import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { Buffer } from 'buffer'
import { render } from 'solid-js/web'

import './index.css'

// `@coinbase-wallet/sdk` uses `Buffer`
globalThis.Buffer = Buffer

import { App } from './App.tsx'
import { config } from './wagmi.ts'

const queryClient = new QueryClient()

const root = document.getElementById('root')

render(
  () => (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  ),
  root!,
)
