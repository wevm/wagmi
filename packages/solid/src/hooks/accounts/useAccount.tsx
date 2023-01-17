import type { GetAccountResult, Provider } from '@wagmi/core'
import { watchAccount } from '@wagmi/core'
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
  const [account, setAccount] = createSignal<GetAccountResult<Provider>>({
    address: undefined,
    connector: undefined,
    isConnected: false,
    isReconnecting: false,
    isConnecting: false,
    isDisconnected: true,
    status: 'disconnected',
  })

  const [previousAccount, setPreviousAccount] =
    createSignal<GetAccountResult<Provider>>()

  createEffect(() => {
    const unsubscribe = watchAccount((result) => {
      setAccount(result)
    })
    onCleanup(() => unsubscribe())
  })

  createEffect(() => {
    if (
      !!props?.onConnect &&
      (previousAccount()?.status !== 'connected' ||
        previousAccount()?.status === undefined) &&
      account().status === 'connected'
    ) {
      props.onConnect({
        address: account().address,
        connector: account().connector,
        isReconnected:
          previousAccount()?.status === 'reconnecting' ||
          previousAccount()?.status === undefined,
      })
    }

    if (
      !!props?.onDisconnect &&
      previousAccount()?.status === 'connected' &&
      account()?.status === 'disconnected'
    )
      props.onDisconnect()
  })

  setPreviousAccount(account)

  return account
}
