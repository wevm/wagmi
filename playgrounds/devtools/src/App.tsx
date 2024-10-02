import {
  useAccount,
  useChainId,
  useConnect,
  useConnections,
  useConnectors,
  useDisconnect,
} from '@wagmi/solid'
import { For } from 'solid-js'

export function App() {
  return (
    <>
      <Account />
      <Connect />
      {/* <SwitchAccount /> */}
      {/* <SwitchChain /> */}
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
            onClick={() => connect.mutate({ connector, chainId })}
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
