import type {
  GetWebSocketPublicClientArgs,
  WebSocketPublicClient,
} from '@wagmi/core'
import {
  getWebSocketPublicClient,
  watchWebSocketPublicClient,
} from '@wagmi/core'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

export type UseWebSocketPublicClientArgs = Partial<GetWebSocketPublicClientArgs>

export function useWebSocketPublicClient<
  TWebSocketPublicClient extends WebSocketPublicClient,
>({ chainId }: UseWebSocketPublicClientArgs = {}) {
  return useSyncExternalStoreWithSelector(
    (cb) => watchWebSocketPublicClient<TWebSocketPublicClient>({ chainId }, cb),
    () => getWebSocketPublicClient<TWebSocketPublicClient>({ chainId }),
    () => getWebSocketPublicClient<TWebSocketPublicClient>({ chainId }),
    (x) => x,
    (a, b) => a?.chain.id === b?.chain.id,
  )
}
