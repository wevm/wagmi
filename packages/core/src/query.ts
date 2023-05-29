import {
  QueryClient as QueryClient_,
  type QueryClientConfig,
} from '@tanstack/query-core'

const defaultOptions = {
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 60 * 60 * 24, // 24 hours
      networkMode: 'offlineFirst',
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: { networkMode: 'offlineFirst' },
  },
} satisfies QueryClientConfig

export type QueryClientParameters = QueryClientConfig
export type QueryClient = typeof QueryClient_

export function createQueryClient(
  config: QueryClientParameters | undefined = defaultOptions,
) {
  return new QueryClient_(config)
}
