import { wagmiClient } from '../../client'
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
  const handleChange = async () => callback(await fetchBalance(args))
  const unsubscribe = wagmiClient.subscribe(
    ({ connector, provider }) => [connector, provider],
    handleChange,
  )
  return unsubscribe
}
