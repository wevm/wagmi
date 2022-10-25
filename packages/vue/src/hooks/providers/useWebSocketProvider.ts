import {
  GetWebSocketProviderArgs,
  GetWebSocketProviderResult,
  WebSocketProvider,
  getWebSocketProvider,
  watchWebSocketProvider,
} from '@wagmi/core'
import { onScopeDispose, ref } from 'vue-demi'
// import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

export type UseWebSocketProviderArgs = Partial<GetWebSocketProviderArgs>

export function useWebSocketProvider<
  TWebSocketProvider extends WebSocketProvider,
>({ chainId }: UseWebSocketProviderArgs = {}) {
  const webSocketProvider = ref(
    getWebSocketProvider<TWebSocketProvider>({
      chainId,
    }) as GetWebSocketProviderResult,
  )
  const unsubscribe = watchWebSocketProvider<TWebSocketProvider>(
    { chainId },
    (w: GetWebSocketProviderResult) => {
      if (w?.network.chainId === getWebSocketProvider({ chainId })) {
        webSocketProvider.value = w
      }
    },
  )
  onScopeDispose(() => {
    unsubscribe()
  })

  return webSocketProvider
}
