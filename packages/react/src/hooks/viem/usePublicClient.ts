import type { GetPublicClientArgs, PublicClient } from '@wagmi/core'
import { getPublicClient, watchPublicClient } from '@wagmi/core'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

export type UsePublicClientArgs = Partial<GetPublicClientArgs>

export function usePublicClient<TPublicClient extends PublicClient>({
  chainId,
}: UsePublicClientArgs = {}) {
  return useSyncExternalStoreWithSelector(
    (cb) => watchPublicClient<TPublicClient>({ chainId }, cb),
    () => getPublicClient<TPublicClient>({ chainId }),
    () => getPublicClient<TPublicClient>({ chainId }),
    (x) => x,
    (a, b) => a.chain.id === b.chain.id,
  )
}
