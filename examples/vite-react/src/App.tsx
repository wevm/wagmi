import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher, SignMessage } from './components'

export const App = () => {
  const [{ data: accountData }] = useAccount()

  if (accountData?.address)
    return (
      <main>
        <Account />
        <NetworkSwitcher />
        <SignMessage />
      </main>
    )

  return (
    <main>
      <Connect />
    </main>
  )
}
