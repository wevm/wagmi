import { useAccount } from 'wagmi'

import {
  Account,
  Connect,
  ContractFunction,
  NetworkSwitcher,
  SignMessage,
  Transaction,
} from './components'

export const App = () => {
  const [{ data: accountData }] = useAccount()

  if (accountData?.address)
    return (
      <main style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Account />
        <NetworkSwitcher />
        <Transaction />
        <SignMessage />
        <ContractFunction />
      </main>
    )

  return (
    <main>
      <Connect />
    </main>
  )
}
