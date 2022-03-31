import * as React from 'react'

import { Account, Connect, NetworkSwitcher } from '../components'

function Page() {
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
    </>
  )
}

export default Page
