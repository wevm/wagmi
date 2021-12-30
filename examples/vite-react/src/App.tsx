import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from './components'

const Page = () => {
  const [{ data: accountData }] = useAccount()

  if (accountData?.address)
    return (
      <main>
        <Account />
        <NetworkSwitcher />
      </main>
    )

  return (
    <main>
      <Connect />
    </main>
  )
}

export default Page
