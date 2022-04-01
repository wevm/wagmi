import * as React from 'react'
import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

function Page() {
  const isMounted = useIsMounted()
  const { data } = useAccount()

  return (
    <>
      <Connect />

      {isMounted && data && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}

export default Page
