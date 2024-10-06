import {
  useAccount,
  useChainId,
  useConnect,
  useConnections,
  useConnectors,
  useDisconnect,
} from '@wagmi/solid'
import * as R from 'remeda'
import { For, createMemo } from 'solid-js'

export function Connections() {
  const account = useAccount()
  const chainId = useChainId()
  const connect = useConnect()
  const connections = useConnections()
  const connectors = useConnectors()
  const disconnect = useDisconnect()

  const inactiveConnectors = createMemo(() => {
    const activeConnectorUids = new Set<string>([])
    for (const connection of connections) {
      activeConnectorUids.add(connection.connector.uid)
    }
    return R.filter(
      connectors,
      (connector) => !activeConnectorUids.has(connector.uid),
    )
  })

  return (
    <div class="p-4">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <For each={connections}>
            {(connection) => (
              <div>
                <span>{connection.connector.name}</span>
                <button
                  onClick={() =>
                    disconnect.mutate({ connector: connection.connector })
                  }
                  type="button"
                >
                  Disconnect
                </button>
              </div>
            )}
          </For>
          <For each={inactiveConnectors()}>
            {(connector) => (
              <div>
                <span>{connector.name}</span>
                <button
                  onClick={() =>
                    connect.mutate({ connector, chainId: chainId() })
                  }
                  type="button"
                >
                  Connect
                </button>
              </div>
            )}
          </For>
        </div>

        <div style={{ flex: 1 }}>
          <div>
            account: {account.address}
            <br />
            chainId: {account.chainId}
            <br />
            status: {account.status}
          </div>

          <div style={{ display: 'flex' }}>
            {account.status !== 'disconnected' && (
              <button type="button" onClick={() => disconnect.mutate({})}>
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
