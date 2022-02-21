import { wagmiClient } from '../client'
import { AccountReturnData, getAccount } from './getAccount'

export function watchAccount(callback: (account: AccountReturnData) => void) {
  const handleChange = () => callback(getAccount())
  wagmiClient.on('stateChanged', handleChange)
  return () => {
    wagmiClient.off('stateChanged', handleChange)
  }
}
