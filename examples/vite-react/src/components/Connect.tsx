import { useConnect } from 'wagmi'

export function Connect() {
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect()

  return (
    <div>
      <div>
        {connectors.map((x) => (
          <button disabled={!x.ready} key={x.name} onClick={() => connect(x)}>
            {x.name}
            {!x.ready && ' (unsupported)'}
            {isConnecting && x.name === pendingConnector?.name && '…'}
          </button>
        ))}
      </div>

      <div>{error && error.message}</div>
    </div>
  )
}
