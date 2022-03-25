import * as React from 'react'
import { useConnect } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()

  const { connectors, connectAsync } = useConnect()

  React.useEffect(() => {
    ;(async () => {
      connectAsync(connectors[0])

      connectors[0].on('connecting', async () => {
        const provider = await connectors[0].getProvider()
        console.log('test2', provider)
      })
    })()
  }, [connectAsync, connectors])

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
