import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import {
  injected,
  ledger,
  metaMask,
  safe,
  walletConnect,
} from 'wagmi/connectors'

const queryClient = new QueryClient()

const projectId = '3fbb6bba6f1de962d911bb5b5c9dba88'

export const config = createConfig({
  chains: [mainnet, optimism, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    ledger({ projectId }),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
