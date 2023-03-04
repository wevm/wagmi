import type { GetAccountResult, Provider } from '@wagmi/core'
import { getAccount, watchAccount } from '@wagmi/core'
import { createEffect, createSignal, onCleanup } from 'solid-js'

export type UseAccountConfig = {
  /** Function to invoke when connected */
  onConnect?({
    address,
    connector,
    isReconnected,
  }: {
    address?: GetAccountResult['address']
    connector?: GetAccountResult['connector']
    isReconnected: boolean
  }): void
  /** Function to invoke when disconnected */
  onDisconnect?(): void
}

export const useAccount = (props?: UseAccountConfig) => {
  const [account, setAccount] = createSignal<GetAccountResult<Provider>>(
    getAccount(),
  )

  createEffect(() => {
    const unsubscribe = watchAccount((result) => {
      const prevStatus = account().status

      setAccount(result)

      if (
        props?.onConnect &&
        prevStatus !== 'connected' &&
        result.status === 'connected'
      ) {
        props.onConnect({
          address: account()?.address,
          connector: account()?.connector,
          isReconnected: prevStatus === 'reconnecting',
        })
      }

      if (
        props?.onDisconnect &&
        prevStatus === 'connected' &&
        result.status === 'disconnected'
      ) {
        props.onDisconnect()
      }
    })
    onCleanup(unsubscribe)
  })

  return account
}
