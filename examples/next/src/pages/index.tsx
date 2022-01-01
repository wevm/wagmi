import * as React from 'react'
import { useAccount } from 'wagmi'

import {
  Account,
  Connect,
  NetworkSwitcher,
  SendTransaction,
  SignMessage,
} from '../components'

const Page = () => {
  const [{ data: accountData }] = useAccount()

  if (accountData?.address)
    return (
      <main>
        <Account />
        <NetworkSwitcher />
        <SendTransaction />
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
