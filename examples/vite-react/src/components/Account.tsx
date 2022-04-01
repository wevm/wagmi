import { useAccount } from 'wagmi'

export function Account() {
  const { data } = useAccount({ ens: { name: true } })

  if (!data) return null

  return (
    <div>
      {data.ens?.name ?? data.address}
      {data.ens?.name ? ` (${data.address})` : null}
    </div>
  )
}
