import { WebSocketProvider } from '@ethersproject/providers'
import * as React from 'react'

import { useClient } from '../../context'
import { useForceUpdate } from '../utils'

export function useWebSocketProvider<
  TWebSocketProvider extends WebSocketProvider,
>() {
  const forceUpdate = useForceUpdate()
  const client = useClient<any, TWebSocketProvider>()

  React.useEffect(() => {
    const unsubscribe = client.subscribe(
      (state) => state.webSocketProvider,
      forceUpdate,
    )
    return unsubscribe
  }, [client, forceUpdate])

  return client.webSocketProvider
}
