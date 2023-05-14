import { optimism } from 'viem/chains'
import { useAccount, useBlockNumber, useConnect, useDisconnect } from 'wagmi'

function App() {
  return (
    <>
      <Account />
      <Connect />
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

      <button type='button' onClick={() => disconnect()}>
        Disconnect
      </button>
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

function BlockNumber() {
  const { chainId } = useAccount()

  const { data: default_ } = useBlockNumber({ watch: true })
  const { data: current_ } = useBlockNumber({
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
      <div>Block Number (Current Chain): {current_?.toString()}</div>
      <div>Block Number (Optimism): {optimism_?.toString()}</div>
    </div>
  )
}

export default App
