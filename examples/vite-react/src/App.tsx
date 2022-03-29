import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from './components'

export function App() {
  const { data: accountData } = useAccount()

  if (accountData)
    return (
      <>
        <Account />
        <NetworkSwitcher />
      </>
    )

  return <Connect />
}
