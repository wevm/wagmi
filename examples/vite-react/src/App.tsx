import { useAccount, useConnect } from 'wagmi'

export const App = () => {
  // const result = useEnsLookup({
  //   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  // })
  // console.log(result)
  // return result.data ?? null
  const account = useAccount()
  // console.log('lol')

  const connect = useConnect()
  const connect2 = useConnect()

  if (connect.isConnecting) {
    return <div>connecting...</div>
  }

  if (account.data?.address)
    return (
      <div>
        <div>{account.data.address}</div>
        <button onClick={account.disconnect}>disconnect</button>
      </div>
    )

  return (
    <div>
      {account.data?.address}
      <div>
        <h3>connect 1</h3>
        <div>
          {connect.connectors.map((x) => (
            <button
              disabled={!x.ready || connect.isConnecting}
              key={x.name}
              onClick={() => connect.connect(x)}
            >
              {x.name}
              {connect.isConnecting && x.id === connect.connector?.id && '…'}
            </button>
          ))}
        </div>
        <div>
          {connect.error && (connect.error?.message ?? 'Failed to connect')}
        </div>
      </div>

      <div>
        <h3>connect 2</h3>
        <div>
          {connect2.connectors.map((x) => (
            <button
              disabled={!x.ready || connect2.isConnecting}
              key={x.name}
              onClick={() => connect2.connect(x)}
            >
              {x.name}
              {connect2.isConnecting && x.id === connect2.connector?.id && '…'}
            </button>
          ))}
        </div>
        <div>
          {connect2.error && (connect2.error?.message ?? 'Failed to connect')}
        </div>
      </div>
    </div>
  )
}
