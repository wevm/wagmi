import './index.css'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { config } from './wagmi.ts'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { WagmiConfig, deserialize, serialize } from 'wagmi'

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
  storage: window.localStorage,
  deserialize,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig value={config}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </PersistQueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
