import { useConnect, useDisconnect } from 'wagmi'

export function Connect() {
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
            <button key={x.id} onClick={() => connect(x)}>
              {x.name}
              {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  )
}
