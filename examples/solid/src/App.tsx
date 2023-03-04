import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useProvider,
  useSignMessage,
  useSigner,
  useSwitchNetwork,
} from '@wagmi/solid'
import type { Component } from 'solid-js'
import { Match, Switch, createEffect, createSignal } from 'solid-js'

const App: Component = () => {
  const [chainId, setChainId] = createSignal(5)

  const { disconnect } = useDisconnect()
  const { connectData, connect } = useConnect({ chainId })
  const acc = useAccount({
    onConnect: (data) => console.log('on connect with data ', data),
    onDisconnect: () => console.log('calling onDisconnect'),
  })

  const provider = useProvider({ chainId })
  const signer = useSigner({ chainId })
  const balance = useBalance({ chainId })
  const { switchNetwork, switchNetworkData, pendingChainId } =
    useSwitchNetwork()

  const signData = useSignMessage()

  createEffect(() => console.log('provider: ', provider()))
  createEffect(() => console.log('signer: ', signer))
  createEffect(() => console.log('balance: ', balance))
  createEffect(() =>
    console.log(
      'switchNetworkData: ',
      switchNetworkData,
      pendingChainId,
      switchNetworkData.variables,
    ),
  )

  return (
    <div>
      <Switch>
        <Match when={connectData.isPending}>Loading connect data...</Match>
        <Match when={connectData.isError}>
          Error {connectData.error?.message}
        </Match>

        <Match when={acc().address}>
          <p>Address</p>
          <p>{acc().address}</p>
          <p>ChainId</p>
          <p>{chainId()}</p>

          <button onClick={() => setChainId((id) => (id === 5 ? 1 : 5))}>
            Change chainId {}
          </button>
          <button
            onClick={() => signData.signMessage({ message: () => 'asd' })}
          >
            Sign data
          </button>
          <button onClick={() => switchNetwork(chainId)}>switch chain</button>
          <button onClick={() => disconnect()}>Disconnect</button>
        </Match>

        <Match when={!acc().address}>
          <button onClick={() => connect({ chainId })}>
            connect to metamask
          </button>
        </Match>
      </Switch>

      <Switch>
        <Match when={balance.isLoading}>Loading balance data...</Match>
        <Match when={balance.isError}>Error {balance.error?.message}</Match>
        <Match when={balance.isSuccess}>
          <p>Your balance</p>
          <p>
            {balance.data?.formatted} {balance.data?.symbol}
          </p>
        </Match>
      </Switch>
    </div>
  )
}

export default App
