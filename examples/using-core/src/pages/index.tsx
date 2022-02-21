import * as React from 'react'
import { getAccount, watchAccount } from '@wagmi/core'

import { Account, Connect, NetworkSwitcher } from '../components'

const Page = () => {
  const [accountData, setAccountData] = React.useState(getAccount)
  React.useEffect(() => {
    const unwatch = watchAccount(setAccountData)
    return unwatch
  }, [])

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
