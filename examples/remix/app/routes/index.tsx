import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

export default function Index() {
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()

  return (
    <>
      <Connect />

      {isMounted && isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}
