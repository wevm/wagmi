import { useAccount, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { data: ensNameData } = useEnsName({ address })

  return (
    <div>
      {ensNameData ?? address}
      {ensNameData ? ` (${address})` : null}
    </div>
  )
}
