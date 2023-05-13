import { optimism } from 'viem/chains'
import { useAccount, useBlockNumber, useConnect, useDisconnect } from 'wagmi'

function App() {
  return (
    <>
      <MyComponent />
      <BlockNumber />
    </>
  )
}

function MyComponent() {
  const account = useAccount()
  const { connectors, connect, status } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      {
        <>
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
        </>
      }

      <div>
        <div>Connect</div>
        {connectors.map((connector) => (
          <button
            disabled={account.connector?.uid === connector.uid}
            id={connector.uid}
            key={connector.uid}
            onClick={async () => await connect({ connector })}
            type='button'
          >
            {connector.name}
          </button>
        ))}
        {status}
      </div>
    </>
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
    <>
      <div>Block Number (Default Chain): {default_?.toString()}</div>
      <div>Block Number (Current Chain): {current_?.toString()}</div>
      <div>Block Number (Optimism): {optimism_?.toString()}</div>
    </>
  )
}
export default App
