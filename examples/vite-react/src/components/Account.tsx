import { useAccount } from 'wagmi'

export function Account() {
  const { data, disconnect } = useAccount({ ens: true })

  if (!data) return <div>No account connected</div>

  return (
    <div>
      <div>
        <button onClick={() => disconnect()}>
          Disconnect from {data?.connector?.name}
        </button>
      </div>

      <div>
        {data?.ens?.name ?? data?.address}
        {data?.ens ? ` (${data?.address})` : null}
      </div>

      {data?.ens?.avatar && (
        <img src={data.ens.avatar} style={{ height: 40, width: 40 }} />
      )}
    </div>
  )
}
