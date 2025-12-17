import { useConnection, useDisconnect, useEnsName } from '@wagmi/solid'
import { Show } from 'solid-js'

export function Connection() {
  const connection = useConnection()
  const disconnect = useDisconnect()
  const ensName = useEnsName(() => ({
    address: connection().address,
  }))

  return (
    <div>
      <h2>Connection</h2>

      <div>
        account: {connection().address} {ensName.data}
        <br />
        chainId: {connection().chainId}
        <br />
        status: {connection().status}
      </div>

      <Show when={connection().status !== 'disconnected'}>
        <button
          type="button"
          onClick={() => {
            console.log('disconnect clicked')
            disconnect.mutate()
          }}
        >
          Disconnect
        </button>
      </Show>
    </div>
  )
}
