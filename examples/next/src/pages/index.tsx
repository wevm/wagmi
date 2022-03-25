import * as React from 'react'
import { useAccount } from 'wagmi'
import dynamic from 'next/dynamic'

const Provider = dynamic(() => import('../components/Provider'))
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

const withProvider = (child: React.ReactNode) => () =>
  <Provider>{child}</Provider>

export default withProvider(<Page />)
