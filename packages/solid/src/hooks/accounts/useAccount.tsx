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

  const [previousStatus, setPreviousStatus] =
    createSignal<GetAccountResult['status']>()

  createEffect(() => {
    const unsubscribe = watchAccount((result) => {
      const prevAccount = account()

      setAccount(result)

      if (props?.onConnect && previousStatus() !== "connected" && result.status === 'connected') {
        props.onConnect({
          address: account()?.address,
          connector: account()?.connector,
          isReconnected: previousStatus() === 'reconnecting',
        })
      }

      setPreviousStatus(prevAccount.status)

      if (props?.onDisconnect && previousStatus() === "connected" && result.status === 'disconnected') {
        props.onDisconnect()
      }
    })
    onCleanup(unsubscribe)
  })

  return account
}
