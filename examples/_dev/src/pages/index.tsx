import { Account, Connect, NetworkSwitcher } from '../components'
import { TestComponent } from '../components/TestComponent'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()

  if (!isMounted) return null
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
      <TestComponent />
    </>
  )
}

export default Page
