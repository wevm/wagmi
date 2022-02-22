import { wagmiClient } from '../client'
import { AccountReturnData, getAccount } from './getAccount'

export function watchAccount(callback: (account: AccountReturnData) => void) {
  const handleChange = () => callback(getAccount())
  const unsubscribe = wagmiClient.subscribe(
    ({ data, connector }) => [data?.account, connector],
    handleChange,
  )
  return unsubscribe
}
