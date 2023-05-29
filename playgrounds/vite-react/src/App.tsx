import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useConnections,
  useDisconnect,
  useSwitchAccount,
} from 'wagmi'
import { optimism } from 'wagmi/chains'

function App() {
  return (
    <>
      <Account />
      <Connect />
      <SwitchAccount />
      <Connections />
      <Balance />
      <BlockNumber />
    </>
  )
}

function Account() {
  const account = useAccount()
  const { disconnect } = useDisconnect()

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

      {account.status === 'connected' && (
        <button type='button' onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const { connectors, connect, status, error } = useConnect()

  return (
    <div>
      <h2>Connect</h2>
      {connectors.map((connector) => (
        <button
          id={connector.uid}
          key={connector.uid}
          onClick={async () => await connect({ connector })}
          type='button'
        >
          {connector.name}
        </button>
      ))}
      <div>{status}</div>
      <div>{error?.message}</div>
    </div>
  )
}

function SwitchAccount() {
  const account = useAccount()
  const { connectors, switchAccount } = useSwitchAccount()

  return (
    <div>
      <h2>Switch Account</h2>

      {connectors.map((connector) => (
        <button
          disabled={account.connector?.uid === connector.uid}
          id={connector.uid}
          key={connector.uid}
          onClick={async () => await switchAccount({ connector })}
          type='button'
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}

function Connections() {
  const connections = useConnections()

  return (
    <div>
      <h2>Connections</h2>

      {connections.map((connection) => (
        <div id={connection.connector.uid} key={connection.connector.uid}>
          <div>connector {connection.connector.name}</div>
          <div>accounts: {JSON.stringify(connection.accounts)}</div>
          <div>chainId: {connection.chainId}</div>
        </div>
      ))}
    </div>
  )
}

function Balance() {
  const { address, chainId } = useAccount()

  const { data: default_ } = useBalance({ address, watch: true })
  const { data: account_ } = useBalance({
    address,
    chainId,
    watch: true,
  })
  const { data: optimism_ } = useBalance({
    address,
    chainId: optimism.id,
    watch: true,
  })

  return (
    <div>
      <h2>Balance</h2>

      <div>Balance (Default Chain): {default_?.formatted}</div>
      <div>Balance (Account Chain): {account_?.formatted}</div>
      <div>Balance (Optimism Chain): {optimism_?.formatted}</div>
    </div>
  )
}

function BlockNumber() {
  const { chainId } = useAccount()

  const { data: default_ } = useBlockNumber({ watch: true })
  const { data: account_ } = useBlockNumber({
    chainId,
    watch: true,
  })
  const { data: optimism_ } = useBlockNumber({
    chainId: optimism.id,
    watch: true,
  })

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {default_?.toString()}</div>
      <div>Block Number (Account Chain): {account_?.toString()}</div>
      <div>Block Number (Optimism): {optimism_?.toString()}</div>
    </div>
  )
}

export default App
