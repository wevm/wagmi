import { useAccount, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <p>
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
    </p>
  )
}
