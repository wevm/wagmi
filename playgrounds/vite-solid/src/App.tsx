import { useAccount } from '@wagmi/solid'
import { createSignal } from 'solid-js'

export function App() {
  const [count, setCount] = createSignal(0)
  const account = useAccount()

  return (
    <div>
      account: {account.address}
      <br />
      chainId: {account.chainId}
      <br />
      status: {account.status}
      <br />
      <button type="button" onClick={() => setCount(count() + 1)}>
        {count()}
      </button>
    </div>
  )
}
