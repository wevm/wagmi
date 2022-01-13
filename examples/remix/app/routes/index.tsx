import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'

export default function Index() {
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
