import { useAccount } from 'wagmi'

import { Account, Connect } from './components'

export const App = () => {
  const [{ data }] = useAccount()

  if (data?.address) return <Account />

  return <Connect />
}
