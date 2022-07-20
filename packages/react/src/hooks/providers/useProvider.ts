import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'
import {
  GetProviderArgs,
  Provider,
  getProvider,
  watchProvider,
} from '@wagmi/core'

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
