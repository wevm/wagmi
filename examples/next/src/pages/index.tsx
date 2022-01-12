import * as React from 'react'
import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'

const Page = () => {
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

export default Page
