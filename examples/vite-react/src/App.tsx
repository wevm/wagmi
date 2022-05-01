import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from './components'

export function App() {
  const { data } = useAccount()

  return (
    <>
      <Connect />

      {data && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}
