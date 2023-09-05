'use client'

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { Inter } from 'next/font/google'
import { WagmiProvider, deserialize, serialize } from 'wagmi'
import { config } from '../wagmi'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
  key: 'next.cache',
  serialize,
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  deserialize,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider value={config}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </PersistQueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
