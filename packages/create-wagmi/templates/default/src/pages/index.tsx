import * as React from 'react'
import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

function Page() {
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()

  if (!isMounted) return null
  return (
    <>
      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}

export default Page
