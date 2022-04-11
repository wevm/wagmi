import { WebSocketProvider } from '@ethersproject/providers'
import { GetWebSocketProviderArgs, getWebSocketProvider } from '@wagmi/core'
import * as React from 'react'

import { useClient } from '../../context'
import { useForceUpdate } from '../utils'

export type UseWebSocketProviderArgs = Partial<GetWebSocketProviderArgs>

export function useWebSocketProvider<
  TWebSocketProvider extends WebSocketProvider,
>({ chainId }: UseWebSocketProviderArgs = {}) {
  const forceUpdate = useForceUpdate()
  const client = useClient()
  const webSocketProvider = React.useRef(
    getWebSocketProvider<TWebSocketProvider>({ chainId }),
  )

  React.useEffect(() => {
    const unsubscribe = client.subscribe(
      (state) => state.webSocketProvider,
      () => {
        webSocketProvider.current = getWebSocketProvider({ chainId })
        forceUpdate()
      },
    )
    return unsubscribe
  }, [chainId, client, forceUpdate])

  return webSocketProvider.current
}
