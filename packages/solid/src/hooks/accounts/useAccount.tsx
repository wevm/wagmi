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
      setAccount(result)
    })
    onCleanup(unsubscribe)
  })

  createEffect(() => {
    if (
      !!props?.onDisconnect &&
      previousStatus() === 'connected' &&
      account()?.status === 'disconnected'
    )
      props.onDisconnect()
  })

  createEffect(() => {
    if (
      !!props?.onConnect &&
      previousStatus() === undefined &&
      account()?.status === 'connected'
    ) {
      props.onConnect({
        address: account()?.address,
        connector: account()?.connector,
        isReconnected: true,
      })
      setPreviousStatus(account().status)
    }
  })

  return account
}
