import { useAccount, useBalance, useConnect } from '@wagmi/solid'
import type { Component } from 'solid-js'
import { Match, Switch, createSignal } from 'solid-js'

const App: Component = () => {
  const [chainId, setChainId] = createSignal(1)

  const connect = useConnect()
  const acc = useAccount()

  // opting to set chainId manually, so it won't update
  // if you change your chain on Metamask. Remove this
  // to make it reactive with Metamask.
  const balance = useBalance({ chainId })

  return (
    <div>
      <Switch>
        <Match when={connect.isLoading}>Loading connect data...</Match>
        <Match when={connect.isError}>Error {connect.error?.message}</Match>
        <Match when={acc().address}>
          <p>{acc().address}</p>
          <button onClick={() => setChainId((id) => (id === 5 ? 1 : 5))}>
            Change chainId
          </button>
        </Match>
        <Match when={!acc().address}>
          <button onClick={() => connect.connect()}>connect to metamask</button>
        </Match>
      </Switch>

      <Switch>
        <Match when={balance.isLoading}>Loading balance data...</Match>
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
