import { useAccount, useConnect, useProvider } from '@wagmi/solid'
import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'

const App: Component = () => {
  const { connect } = useConnect()
  const acc = useAccount()

  const [chainId, setChainId] = createSignal(1)

  const prov = useProvider({ chainId })

  createEffect(() => {
    console.log('provider -> ', prov())
  })

  return (
    <div>
      <button onClick={() => connect()}>connect to metamask</button>
      <button onClick={() => setChainId((id) => (id === 5 ? 1 : 5))}>
        Change chainId
      </button>
      <p>{acc().address}</p>
    </div>
  )
}

export default App
