import {
  GetProviderArgs,
  Provider,
  getProvider,
  watchProvider,
} from '@wagmi/core'
import { onScopeDispose, ref } from 'vue-demi'
// import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

export type UseProviderArgs = Partial<GetProviderArgs>

export function useProvider<TProvider extends Provider>({
  chainId,
}: UseProviderArgs = {}) {
  const provider = ref<TProvider>(getProvider({ chainId }))
  const unsubscribe = watchProvider({ chainId }, (p: Provider) => {
    provider.value = p
  })
  onScopeDispose(() => {
    unsubscribe()
  })
  return provider
}
