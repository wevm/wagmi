import { wagmiClient } from '../../client'
import { GetAccountResult, getAccount } from './getAccount'

export type WatchAccountCallback = (account: GetAccountResult) => void

export function watchAccount(callback: WatchAccountCallback) {
  const handleChange = () => callback(getAccount())
  const unsubscribe = wagmiClient.subscribe(
    ({ data, connector }) => [data?.account, connector],
    handleChange,
  )
  return unsubscribe
}
