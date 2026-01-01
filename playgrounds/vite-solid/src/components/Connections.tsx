import { useConnections } from '@wagmi/solid'
import { For } from 'solid-js'
import { stringify } from 'viem'

export function Connections() {
  const connections = useConnections()

  return (
    <div>
      <h2>Connections</h2>

      <For each={connections()}>
        {(connection) => (
          <div>
            <div>connector {connection.connector.name}</div>
            <div>accounts: {stringify(connection.accounts)}</div>
            <div>chainId: {connection.chainId}</div>
          </div>
        )}
      </For>
    </div>
  )
}
