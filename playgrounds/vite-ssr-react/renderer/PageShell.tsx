import { Buffer } from 'buffer'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React from 'react'
import { WagmiProvider, deserialize, serialize } from 'wagmi'

import { Link } from './Link'
import './PageShell.css'
import type { PageContext } from './types'
import { PageContextProvider } from './usePageContext'
import { config } from './wagmi.ts'

// `@coinbase-wallet/sdk` uses `Buffer`
globalThis.Buffer = Buffer

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: { networkMode: 'offlineFirst' },
  },
})

const persister = createSyncStoragePersister({
  key: 'vite-react.cache',
  serialize,
  storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
  deserialize,
})

type PageShellProps = {
  children: React.ReactNode
  pageContext: PageContext
}

export function PageShell(props: PageShellProps) {
  const { children, pageContext } = props
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <WagmiProvider value={config}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link className="navitem" href="/">
                Home
              </Link>
              <Link className="navitem" href="/about">
                About
              </Link>
            </div>

            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </PersistQueryClientProvider>
        </WagmiProvider>
      </PageContextProvider>
    </React.StrictMode>
  )
}
