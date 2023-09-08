import { type Address } from 'viem'

import { type Config, type Connector } from '../createConfig.js'

export type GetAccountReturnType =
  | {
      address: Address
      addresses: readonly [Address, ...Address[]]
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
      addresses: readonly Address[] | undefined
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
      addresses: readonly Address[] | undefined
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
      addresses: undefined
      chainId: undefined
      connector: undefined
      isConnected: false
      isReconnecting: false
      isConnecting: false
      isDisconnected: true
      status: 'disconnected'
    }

/** https://alpha.wagmi.sh/core/api/actions/getAccount */
export function getAccount(config: Config): GetAccountReturnType {
  const uid = config.state.current!
  const connection = config.state.connections.get(uid)
  const addresses = connection?.accounts
  const address = addresses?.[0]
  const status = config.state.status

  switch (status) {
    case 'connected':
      return {
        address: address!,
        addresses: addresses!,
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
        addresses,
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
        addresses,
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
        addresses: undefined,
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
