import { useAccount } from '@wagmi/solid'

export function App() {
  const account = useAccount()
  return (
    <div>
      account: {account.address}
      <br />
      chainId: {account.chainId}
      <br />
      status: {account.status}
    </div>
  )
}
