import { useConnect } from 'wagmi'

export const App = () => {
  const { data, connector, connectors, connect, isConnecting, error } =
    useConnect({
      onConnect(data) {
        console.log('connected!!', data)
      },
    })

  console.log(data?.account)

  return (
    <div>
      <div>
        {data?.account}
        {connectors.map((x) => (
          <button disabled={!x.ready} key={x.name} onClick={() => connect(x)}>
            {x.name}
            {!x.ready && ' (unsupported)'}
            {isConnecting && x.id === connector?.id && '…'}
          </button>
        ))}
      </div>
      <div>{error && (error?.message ?? 'Failed to connect')}</div>
    </div>
  )
}
