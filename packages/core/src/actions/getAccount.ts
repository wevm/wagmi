import { type Address } from 'viem'
import { shallow } from 'zustand/shallow'

import { type Config, type Connector } from '../config.js'

///////////////////////////////////////////////////////////////////////////
// Getter

export type GetAccountReturnType =
  | {
      address: Address
      chainId: number
      connector: Connector
      isConnected: true
      isConnecting: false
      isDisconnected: false
      isReconnecting: false
      status: 'connected'
    }
  | {
      address: Address | undefined
      chainId: number | undefined
      connector: Connector | undefined
      isConnected: boolean
      isConnecting: false
      isDisconnected: false
      isReconnecting: true
      status: 'reconnecting'
    }
  | {
      address: Address | undefined
      chainId: number | undefined
      connector: Connector | undefined
      isConnected: false
      isReconnecting: false
      isConnecting: true
      isDisconnected: false
      status: 'connecting'
    }
  | {
      address: undefined
      chainId: undefined
      connector: undefined
      isConnected: false
      isReconnecting: false
      isConnecting: false
      isDisconnected: true
      status: 'disconnected'
    }

export function getAccount(config: Config): GetAccountReturnType {
  const uid = config.state.current!
  const connection = config.state.connections.get(uid)
  const address = connection?.accounts?.[0]
  const status = config.state.status

  switch (status) {
    case 'connected':
      return {
        address: address!,
        chainId: connection?.chainId!,
        connector: connection?.connector!,
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: false,
        status,
      }
    case 'reconnecting':
      return {
        address,
        chainId: connection?.chainId,
        connector: connection?.connector,
        isConnected: !!address,
        isConnecting: false,
        isDisconnected: false,
        isReconnecting: true,
        status,
      }
    case 'connecting':
      return {
        address,
        chainId: connection?.chainId,
        connector: connection?.connector,
        isConnected: false,
        isConnecting: true,
        isDisconnected: false,
        isReconnecting: false,
        status,
      }
    case 'disconnected':
      return {
        address: undefined,
        chainId: undefined,
        connector: undefined,
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
        isReconnecting: false,
        status,
      }
  }
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchAccountParameters = {
  onChange(data: GetAccountReturnType): void
  selector?(
    data: Pick<
      GetAccountReturnType,
      'address' | 'chainId' | 'connector' | 'status'
    >,
  ): any
}

export type WatchAccountReturnType = () => void

export function watchAccount(
  config: Config,
  { onChange, selector }: WatchAccountParameters,
): WatchAccountReturnType {
  const handleChange = () => onChange(getAccount(config))
  const unsubscribe = config.subscribe(
    (state) => {
      const connection = state.connections.get(state.current!)
      const data = {
        address: connection?.accounts?.[0],
        chainId: connection?.chainId,
        connector: connection?.connector,
        status: state.status,
      }
      if (selector) return selector(data)
      return data
    },
    handleChange,
    { equalityFn: shallow },
  )
  return unsubscribe
}
