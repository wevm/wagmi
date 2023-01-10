import type { GetWebSocketProviderArgs, WebSocketProvider } from '@wagmi/core'
import { getWebSocketProvider, watchWebSocketProvider } from '@wagmi/core'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

export type UseWebSocketProviderArgs = Partial<GetWebSocketProviderArgs>

export function useWebSocketProvider<
  TWebSocketProvider extends WebSocketProvider,
>({ chainId }: UseWebSocketProviderArgs = {}) {
  return useSyncExternalStoreWithSelector(
    (cb) => watchWebSocketProvider<TWebSocketProvider>({ chainId }, cb),
    () => getWebSocketProvider<TWebSocketProvider>({ chainId }),
    () => getWebSocketProvider<TWebSocketProvider>({ chainId }),
    (x) => x,
    (a, b) => a?.network.chainId === b?.network.chainId,
  )
}
