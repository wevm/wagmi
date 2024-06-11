import type { Address, Chain } from 'viem'

import type { Config, Connector } from '../createConfig.js'

export type GetAccountReturnType<
  config extends Config = Config,
  ///
  chain = Config extends config ? Chain : config['chains'][number],
> =
  | {
      address: Address
      addresses: readonly [Address, ...Address[]]
      chain: chain | undefined
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
      chain: chain | undefined
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
      chain: chain | undefined
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
      chain: undefined
      chainId: undefined
      connector: undefined
      isConnected: false
      isReconnecting: false
      isConnecting: false
      isDisconnected: true
      status: 'disconnected'
    }

/** https://wagmi.sh/core/api/actions/getAccount */
export function getAccount<config extends Config>(
  config: config,
): GetAccountReturnType<config> {
  const uid = config.state.current!
  const connection = config.state.connections.get(uid)
  const addresses = connection?.accounts
  const address = addresses?.[0]
  const chain = config.chains.find(
    (chain) => chain.id === connection?.chainId,
  ) as GetAccountReturnType<config>['chain']
  const status = config.state.status

  switch (status) {
    case 'connected':
      return {
        address: address!,
        addresses: addresses!,
        chain,
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
        chain,
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
        chain,
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
        chain: undefined,
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
