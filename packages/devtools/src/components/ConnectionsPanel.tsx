/** @jsxImportSource solid-js */
import {
  useAccount,
  useChainId,
  useConnect,
  useConnections,
  useConnectors,
  useDisconnect,
} from '@wagmi/solid'
import { pipe } from 'remeda'
import { For, createSignal } from 'solid-js'

import { and, hover, not, on } from '../css.js'

export function ConnectionsPanel() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <button
        onClick={() => setCount((count) => count + 1)}
        style={pipe(
          {
            transition: 'transform 75ms',
          },
          on('&:active', {
            transform: 'scale(0.9)',
          }),
          on(and(hover, not('&:active')), {
            transform: 'scale(0.8)',
          }),
        )}
      >
        count is {count()}
      </button>

      <Account />
      <Connect />
      <Connections />
    </>
  )
}

function Account() {
  const account = useAccount()
  const disconnect = useDisconnect()

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account.address}
        <br />
        chainId: {account.chainId}
        <br />
        status: {account.status}
      </div>

      {account.status !== 'disconnected' && (
        <button type="button" onClick={() => disconnect.mutate({})}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const chainId = useChainId()
  const connect = useConnect()
  const connectors = useConnectors()

  return (
    <div>
      <h2>Connect</h2>
      <For each={connectors}>
        {(connector) => (
          <button
            onClick={() => connect.mutate({ connector, chainId: chainId() })}
            type="button"
          >
            {connector.name}
          </button>
        )}
      </For>
      <div>{connect.status}</div>
      <div>{connect.error?.message}</div>
    </div>
  )
}

function Connections() {
  const connections = useConnections()

  return (
    <div>
      <h2>Connections</h2>

      <For each={connections}>
        {(connection) => (
          <div>
            <div>connector {connection.connector.name}</div>
            <div>accounts: {JSON.stringify(connection.accounts)}</div>
            <div>chainId: {connection.chainId}</div>
          </div>
        )}
      </For>
    </div>
  )
}
