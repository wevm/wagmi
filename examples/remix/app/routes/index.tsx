import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

export default function Index() {
  const isMounted = useIsMounted()
  const { data } = useAccount()

  return (
    <>
      <Connect />

      {isMounted && data?.address && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}
