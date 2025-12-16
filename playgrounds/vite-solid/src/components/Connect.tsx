import { useChainId, useConnect, useConnectors } from '@wagmi/solid'

export function Connect() {
  const chainId = useChainId(() => ({}))
  const connect = useConnect(() => ({}))
  const connectors = useConnectors(() => ({}))

  return (
    <div>
      <h2>Connect</h2>
      {connectors().map((connector) => (
        <button
          onClick={async () => {
            connect
              .mutateAsync({
                connector,
                chainId: chainId(),
              })
              .then(console.log)
              // biome-ignore lint/suspicious/noConsole: allow
              .catch(console.error)
          }}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{connect.status}</div>
      <div>{connect.error?.message}</div>
    </div>
  )
}
