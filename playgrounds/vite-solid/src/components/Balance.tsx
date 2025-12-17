import { useBalance, useConnection } from '@wagmi/solid'
import { optimism } from '@wagmi/solid/chains'
import { formatEther } from 'viem'

export function Balance() {
  const connection = useConnection()

  const default_ = useBalance(() => ({
    address: connection().address,
  }))
  const account_ = useBalance(() => ({
    address: connection().address,
  }))
  const optimism_ = useBalance(() => ({
    address: connection().address,
    chainId: optimism.id,
  }))

  return (
    <div>
      <h2>Balance</h2>

      <div>
        Balance (Default Chain):{' '}
        {!!default_?.data?.value && formatEther(default_.data.value)}
      </div>
      <div>
        Balance (Connection Chain):{' '}
        {!!account_?.data?.value && formatEther(account_.data.value)}
      </div>
      <div>
        Balance (Optimism Chain):{' '}
        {!!optimism_?.data?.value && formatEther(optimism_.data.value)}
      </div>
    </div>
  )
}
