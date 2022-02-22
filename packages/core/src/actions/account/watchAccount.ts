import { wagmiClient } from '../../client'
import { AccountResult, getAccount } from './getAccount'

export type WatchAccountCallback = (account: AccountResult) => void

export function watchAccount(callback: WatchAccountCallback) {
  const handleChange = () => callback(getAccount())
  const unsubscribe = wagmiClient.subscribe(
    ({ data, connector }) => [data?.account, connector],
    handleChange,
  )
  return unsubscribe
}
