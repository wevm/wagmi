import { Buffer } from 'buffer'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React from 'react'
import {
  WagmiProvider,
  cookieToInitialState,
  deserialize,
  serialize,
} from 'wagmi'

import { Link } from '../lib/Link.tsx'
import {
  type PageContext,
  PageContextProvider,
} from '../lib/usePageContext.tsx'
import { config } from '../lib/wagmi.ts'
import './App.css'

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

type AppProps = {
  children: React.ReactNode
  pageContext: PageContext
}

export function App(props: AppProps) {
  const { children, pageContext } = props
  const initialState = cookieToInitialState(
    config,
    pageContext?.headers?.cookie,
  )
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <WagmiProvider config={config} initialState={initialState}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link className="navitem" href="/">
                index
              </Link>
              <Link className="navitem" href="/about">
                about
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
