import {
  Connector,
  GetAccountResult,
  getAccount,
  watchAccount,
} from '@wagmi/core'
import { onScopeDispose, ref, watch } from 'vue-demi'

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
    if (
      !!onConnect &&
      previousAccount.current?.status !== 'connected' &&
      account.value.status === 'connected'
    )
      onConnect({
        address: account.value.address,
        connector: account.value.connector as Connector,
        isReconnected: previousAccount.current?.status === 'reconnecting',
      })

    if (
      !!onDisconnect &&
      previousAccount.current?.status == 'connected' &&
      account.value.status === 'disconnected'
    )
      onDisconnect()
    previousAccount.current = account.value as GetAccountResult
  })
  onScopeDispose(() => {
    unsubscribeAccount()
  })
  return {
    account,
  }
}
