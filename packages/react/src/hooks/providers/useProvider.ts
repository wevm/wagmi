import type { GetProviderArgs, Provider } from '@wagmi/core'
import { getProvider, watchProvider } from '@wagmi/core'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

export type UseProviderArgs = Partial<GetProviderArgs>

export function useProvider<TProvider extends Provider>({
  chainId,
}: UseProviderArgs = {}) {
  return useSyncExternalStoreWithSelector(
    (cb) => watchProvider<TProvider>({ chainId }, cb),
    () => getProvider<TProvider>({ chainId }),
    () => getProvider<TProvider>({ chainId }),
    (x) => x,
    (a, b) => a.network.chainId === b.network.chainId,
  )
}
