import type { Config, Data } from '../../config'
import { getConfig } from '../../config'
import type { PublicClient } from '../../types'

export type GetAccountResult<
  TPublicClient extends PublicClient = PublicClient,
> =
  | {
      address: NonNullable<Data['account']>
      connector: NonNullable<Config<TPublicClient>['connector']>
      isConnected: true
      isConnecting: false
      isDisconnected: false
      isReconnecting: false
      status: 'connected'
    }
  | {
      address: Data['account']
      connector: Config<TPublicClient>['connector']
      isConnected: boolean
      isConnecting: false
      isDisconnected: false
      isReconnecting: true
      status: 'reconnecting'
    }
  | {
      address: Data['account']
      connector: Config<TPublicClient>['connector']
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
  TPublicClient extends PublicClient,
>(): GetAccountResult<TPublicClient> {
  const { data, connector, status } = getConfig()
  switch (status) {
    case 'connected':
      return {
        address: data?.account as NonNullable<Data['account']>,
        connector: connector as NonNullable<Config<TPublicClient>['connector']>,
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
