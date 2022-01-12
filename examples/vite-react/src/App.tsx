import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from './components'

export const App = () => {
  const [{ data: accountData }] = useAccount()

  if (accountData?.address)
    return (
      <>
        <Account />
        <NetworkSwitcher />
      </>
    )

  return <Connect />
}
