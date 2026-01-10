import { useBlockNumber } from '@wagmi/solid'
import { optimism } from '@wagmi/solid/chains'

export function BlockNumber() {
  const default_ = useBlockNumber(() => ({ watch: true }))
  const account_ = useBlockNumber(() => ({ watch: true }))
  const optimism_ = useBlockNumber(() => ({
    chainId: optimism.id,
    watch: true,
  }))

  return (
    <div>
      <h2>Block Number</h2>

      <div>Block Number (Default Chain): {default_.data?.toString()}</div>
      <div>Block Number (Connection Chain): {account_.data?.toString()}</div>
      <div>Block Number (Optimism): {optimism_.data?.toString()}</div>
    </div>
  )
}
