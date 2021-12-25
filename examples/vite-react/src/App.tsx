import { useAccount } from 'wagmi'

import { Account, Connect } from './components'

export const App = () => {
  const [{ address }] = useAccount()

  if (address) return <Account />

  return <Connect />
}
