import * as React from 'react'
import { useAccount } from 'wagmi'

import {
  Account,
  Connect,
  NetworkSwitcher,
  SignMessage,
  Transaction,
} from '../components'

const Page = () => {
  const [{ data: accountData }] = useAccount()

  if (accountData?.address)
    return (
      <main>
        <Account />
        <NetworkSwitcher />
        <Transaction />
        <SignMessage />
      </main>
    )

  return (
    <main>
      <Connect />
    </main>
  )
}

export default Page
