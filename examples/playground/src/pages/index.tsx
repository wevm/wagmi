import * as React from 'react'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()

  if (!isMounted) return null
  return (
    <>
      <Connect />
      <Account />

      <h4>Switch Network</h4>
      <NetworkSwitcher />
    </>
  )
}

export default Page
