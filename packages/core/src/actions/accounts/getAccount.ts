import { Client, Data, getClient } from '../../client'
import { Provider } from '../../types'

export type GetAccountResult<TProvider extends Provider = Provider> =
  | {
      address: Data<TProvider>['account']
      connector: Client<TProvider>['connector']
      isConnected: true
      isConnecting: false
      isDisconnected: false
      isReconnecting: false
      status: 'connected'
    }
  | {
      address: Data<TProvider>['account']
      connector: Client<TProvider>['connector']
      isConnected: false
      isConnecting: false
      isDisconnected: false
      isReconnecting: true
      status: 'reconnecting'
    }
  | {
      address: undefined
      connector: undefined
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
        address: data?.account,
        connector,
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false,
        status,
      }
    case 'reconnecting':
      return {
        address: data?.account,
        connector,
        isConnected: false,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: true,
        status,
      }
    case 'connecting':
      return {
        address: undefined,
        connector: undefined,
        isConnected: false,
        isConnecting: true,
        isDisconnected: false,
        isReconnecting: false,
        status,
      }
    case 'disconnected':
      return {
        address: undefined,
        connector: undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status,
      }
  }
}
