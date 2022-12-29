import type { Client, Data } from '../../client'
import { getClient } from '../../client'
import type { Provider } from '../../types'

export type GetAccountResult<TProvider extends Provider = Provider> =
  | {
      address: NonNullable<Data<TProvider>['account']>
      connector: NonNullable<Client<TProvider>['connector']>
      isConnected: true
      isConnecting: false
      isDisconnected: false
      isReconnecting: false
      status: 'connected'
    }
  | {
      address: Data<TProvider>['account']
      connector: Client<TProvider>['connector']
      isConnected: boolean
      isConnecting: false
      isDisconnected: false
      isReconnecting: true
      status: 'reconnecting'
    }
  | {
      address: Data<TProvider>['account']
      connector: Client<TProvider>['connector']
      isConnected: false
      isReconnecting: false
      isConnecting: true
      isDisconnected: false
      status: 'connecting'
    }
  | {
      address: undefined
      connector: undefined
      isConnected: false
      isReconnecting: false
      isConnecting: false
      isDisconnected: true
      status: 'disconnected'
    }

export function getAccount<
  TProvider extends Provider,
>(): GetAccountResult<TProvider> {
  const { data, connector, status } = getClient()
  switch (status) {
    case 'connected':
      return {
        address: data?.account as NonNullable<Data<TProvider>['account']>,
        connector: connector as NonNullable<Client<TProvider>['connector']>,
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false,
        status,
      } as const
    case 'reconnecting':
      return {
        address: data?.account,
        connector,
        isConnected: !!data?.account,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: true,
        status,
      } as const
    case 'connecting':
      return {
        address: data?.account,
        connector,
        isConnected: false,
        isConnecting: true,
        isDisconnected: false,
        isReconnecting: false,
        status,
      } as const
    case 'disconnected':
      return {
        address: undefined,
        connector: undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status,
      } as const
  }
}
