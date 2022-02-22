import { wagmiClient } from '../client'
import { AccountReturnData, getAccount } from './getAccount'

export function watchAccount(callback: (account: AccountReturnData) => void) {
  const handleChange = () => callback(getAccount())
  const unsubscribe = wagmiClient.subscribe(
    (store) => [store.data?.account, store.connector],
    handleChange,
  )
  return unsubscribe
}
