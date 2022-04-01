import { useAccount } from 'wagmi'

export function Account() {
  const { data } = useAccount({ ens: { name: true } })

  return (
    <div>
      {data?.ens?.name ?? data?.address}
      {data?.ens?.name ? ` (${data?.address})` : null}
    </div>
  )
}
