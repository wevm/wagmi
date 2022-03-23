import * as React from 'react'

import { useClient } from '../../context'

export function useWebSocketProvider() {
  const [, forceUpdate] = React.useReducer((c) => c + 1, 0)
  const client = useClient()

  React.useEffect(() => {
    const unsubscribe = client.subscribe(
      (state) => state.webSocketProvider,
      forceUpdate,
    )
    return unsubscribe
  }, [client])

  return client.webSocketProvider
}
