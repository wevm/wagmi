import { Account, Connect, NetworkSwitcher } from '../components'
import { useHelloFoundryCounter } from '../generated'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()

  if (!isMounted) return null
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
    </>
  )
}

export default Page
