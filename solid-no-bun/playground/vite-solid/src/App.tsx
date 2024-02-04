import { createAccount, createAccountEffect, createChainId, createConnect, createConnections, createConnectorClient, createDisconnect, createSwitchAccount } from 'solid-wagmi'

function App() {
  createAccountEffect(()=>({
    onConnect(data) {
      console.log('onConnect', data)
    },
    onDisconnect() {
      console.log('onDisconnect')
    },
  }))

  return (
    <>
      <Account />
      <Connect />
      <SwitchAccount />
      <Connections />
      {/* <ConnectorClient /> */}
    </>
  )
}

function Account() {
  const { account } = createAccount()
  const { disconnect } = createDisconnect()

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
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const { chain } = createChainId()
  const { connectors, connect, mutation } = createConnect()

  return (
    <div>
      <h2>Connect</h2>
      {connectors.map((connector) => (
        <button
          onClick={() => connect({ connector, chainId: chain.id })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{mutation.status}</div>
      <div>{mutation.error?.message}</div>
    </div>
  )
}

function SwitchAccount() {
  const { account } = createAccount()
  const { connectors, switchAccount } = createSwitchAccount()

  return (
    <div>
      <h2>Switch Account</h2>

      {connectors.map((connector) => (
        <button
          disabled={account.connector?.uid === connector.uid}
          onClick={() => switchAccount({ connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}

function SwitchChain() {
//TODO

return null
}

function SignMessage() {
//TODO
return null
}

function Connections() {
  const { connections } = createConnections()

  return (
    <div>
      <h2>Connections</h2>

      {connections.map((connection) => (
        <div>
          <div>connector {connection.connector.name}</div>
          <div>accounts: {JSON.stringify(connection.accounts)}</div>
          <div>chainId: {connection.chainId}</div>
        </div>
      ))}
    </div>
  )
}

function Balance() {
// TODO
return null
}

function BlockNumber() {
// TODO
return null
}

function ConnectorClient() {
  const query = createConnectorClient()
  return (
    <div>
      <h2>Connector Client</h2>
      client {query.data?.account?.address} {query.data?.chain?.id}
      {query.error?.message}
    </div>
  )
}

function SendTransaction() {
// TODO
return null
}

function ReadContract() {
// TODO
return null
}

function ReadContracts() {
// TODO
return null
}

function WriteContract() {
// TODO
return null
}

export default App
