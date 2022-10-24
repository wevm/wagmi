import {
  Connector,
  GetAccountResult,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { onScopeDispose, ref, unref, watch } from 'vue-demi'

import { MaybeRef } from '../../types'

type UseAccountConfig = {
  /** Function to invoke when connected */
  onConnect?({
    address,
    connector,
    isReconnected,
  }: {
    address?: MaybeRef<GetAccountResult['address']>
    connector?: MaybeRef<Connector>
    isReconnected: MaybeRef<boolean>
  }): void
  /** Function to invoke when disconnected */
  onDisconnect?(): void
}

export const useAccount = ({
  onConnect,
  onDisconnect,
}: UseAccountConfig = {}) => {
  const account = ref<GetAccountResult>(getAccount())
  const unsubscribeAccount = watchAccount((acc: GetAccountResult) => {
    account.value = acc
  })
  const previousAccount: Partial<GetAccountResult> & {
    current: GetAccountResult
  } = { current: getAccount() }

  watch(account, () => {
    const plainOnConnect = unref(onConnect)
    const plainOnDisconnect = unref(onDisconnect)
    if (
      !!plainOnConnect &&
      previousAccount.current?.status !== 'connected' &&
      account.value.status === 'connected'
    )
      plainOnConnect({
        address: account.value.address,
        connector: account.value.connector as Connector,
        isReconnected: previousAccount.current?.status === 'reconnecting',
      })

    if (
      !!plainOnDisconnect &&
      previousAccount.current?.status == 'connected' &&
      account.value.status === 'disconnected'
    )
      plainOnDisconnect()
    previousAccount.current = account.value as GetAccountResult
  })
  onScopeDispose(() => {
    unsubscribeAccount()
  })
  return {
    account,
  }
}
