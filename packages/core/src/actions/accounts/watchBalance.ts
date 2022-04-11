import { getClient } from '../../client'
import {
  FetchBalanceArgs,
  FetchBalanceResult,
  fetchBalance,
} from './fetchBalance'

export type WatchBalanceCallback = (balance: FetchBalanceResult) => void

export function watchBalance(
  args: FetchBalanceArgs,
  callback: WatchBalanceCallback,
) {
  const client = getClient()
  const handleChange = async () => callback(await fetchBalance(args))
  const unsubscribe = client.subscribe(
    ({ data }) => ({ account: data?.account, chainId: data?.chain?.id }),
    handleChange,
    {
      equalityFn: (selected, previous) =>
        selected.account === previous.account &&
        selected.chainId === previous.chainId,
    },
  )
  return unsubscribe
}
