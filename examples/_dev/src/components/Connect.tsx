import * as React from 'react'
import { useConnect } from 'wagmi'

import { useIsMounted } from '../hooks'

export const Connect = () => {
  const isMounted = useIsMounted()
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    isReconnecting,
    pendingConnector,
  } = useConnect()

  return (
    <div>
      <div>
        {connectors.map((x) => (
          <button
            disabled={
              !x.ready || isReconnecting || activeConnector?.id === x.id
            }
            key={x.name}
            onClick={() => connect(x)}
          >
            {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && ' (unsupported)'}
            {isConnecting && x.id === pendingConnector?.id && '…'}
          </button>
        ))}
      </div>

      <div>{error && error.message}</div>
    </div>
  )
}
