import { useAccount } from 'wagmi'

import {
  Account,
  Connect,
  NetworkSwitcher,
  SendTransaction,
  SignMessage,
} from './components'

export const App = () => {
  const [{ data: accountData }] = useAccount()

  if (accountData?.address)
    return (
      <main style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Account />
        <NetworkSwitcher />
        <SendTransaction />
        <SignMessage />
      </main>
    )

  return (
    <main>
      <Connect />
    </main>
  )
}
