import {
  reactive,
  toRefs,
  getCurrentScope,
  onScopeDispose,
  watchEffect,
} from 'vue-demi'
import { getClient, getAccount, watchAccount } from '@wagmi/core'

import type { GetAccountResult } from '@wagmi/core'

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

export function useAccount({ onConnect, onDisconnect }: UseAccountConfig = {}) {
  const client = getClient()

  const initialState = getAccount()
  let account = reactive(initialState)

  const unwatch = watchAccount((data) => {
    account = Object.assign(account, data)
  })

  if (getCurrentScope()) onScopeDispose(() => unwatch())

  if (!!onConnect || !!onDisconnect) {
    watchEffect((onInvalidate) => {
      const unsubscribe = client.subscribe(
        (state) => ({
          address: state.data?.account,
          connector: state.connector,
          status: state.status,
        }),
        (curr, prev) => {
          if (
            !!onConnect &&
            prev.status !== 'connected' &&
            curr.status === 'connected'
          )
            onConnect({
              address: curr.address,
              connector: curr.connector,
              isReconnected: prev.status === 'reconnecting',
            })

          if (
            !!onDisconnect &&
            prev.status === 'connected' &&
            curr.status === 'disconnected'
          )
            onDisconnect()
        },
      )

      onInvalidate(unsubscribe)
    })
  }

  return toRefs(account)
}
