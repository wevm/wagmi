import { useAccount, useBalance, useConnect } from '@wagmi/solid'
import type { Component } from 'solid-js'
import { Match, Switch, createEffect, createSignal } from 'solid-js'

const App: Component = () => {
  const [chainId, setChainId] = createSignal(1)

  const { connect } = useConnect()
  const acc = useAccount()

  // opting to set chainId manually, so it won't update
  // if you change your chain on Metamask. Remove this
  // to make it reactive with Metamask.
  const balance = useBalance({ chainId })

  createEffect(() => {
    console.log('balance -> ', balance)
  })

  return (
    <div>
      <button onClick={() => connect()}>connect to metamask</button>
      <button onClick={() => setChainId((id) => (id === 5 ? 1 : 5))}>
        Change chainId
      </button>
      <p>{acc().address}</p>

      <Switch>
        <Match when={balance.isLoading}>Loading...</Match>
        <Match when={balance.isError}>Error {balance.error?.message}</Match>
        <Match when={balance.isSuccess}>
          <p>
            {balance.data?.formatted} {balance.data?.symbol}
          </p>
        </Match>
      </Switch>
    </div>
  )
}

export default App
