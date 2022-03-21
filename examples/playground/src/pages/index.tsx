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

// import { useProvider } from 'wagmi'
//
// const Page = () => {
//   const provider = useProvider()
//   console.log({ provider })
//   return provider._network.name
// }

export default Page
