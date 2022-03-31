import { useConnect, useDisconnect } from 'wagmi'

import { useIsMounted } from '../hooks'

export function Connect() {
  const isMounted = useIsMounted()
  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <div>
        {activeConnector && (
          <button onClick={() => disconnect()}>
            Disconnect from {activeConnector.name}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== activeConnector?.id)
          .map((x) => (
            <button key={x.name} onClick={() => connect(x)}>
              {isMounted ? x.name : x.id === 'injected' ? x.id : x.name}
              {isConnecting &&
                x.name === pendingConnector?.name &&
                ' (connecting)'}
            </button>
          ))}
      </div>

      <div>{error && error.message}</div>
    </div>
  )
}
