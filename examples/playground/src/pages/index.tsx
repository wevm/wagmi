import * as React from 'react'
import { useAccount } from 'wagmi'

import { Account, Connect } from '../components'

const Page = () => {
  const { data: accountData } = useAccount()

  if (accountData?.address)
    return (
      <>
        <Account />
      </>
    )

  return <Connect />
}

export default Page
