import type { GetAccountResult, Provider } from '@wagmi/core'
import { watchAccount } from '@wagmi/core'
import { createEffect, createSignal, onCleanup } from 'solid-js'

// import { useClient } from '../../context'

export const useAccount = () => {
  // const client = useClient()

  // console.log('client -> ', client)

  const [accountResult, setAccountResult] = createSignal<
    GetAccountResult<Provider>
  >({
    address: undefined,
    connector: undefined,
    isConnected: false,
    isReconnecting: false,
    isConnecting: false,
    isDisconnected: true,
    status: 'disconnected',
  })

  // if (client?.isAutoConnect) {
  //   client?.autoConnect()
  // }

  createEffect(() => {
    const unsubscribe = watchAccount((result) => {
      setAccountResult(result)
    })
    onCleanup(() => unsubscribe())
  })

  return accountResult
}
