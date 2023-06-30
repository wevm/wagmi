import {
  type Address,
  type Chain,
  type Client,
  type ProviderConnectInfo,
  type ProviderMessage,
} from 'viem'

import { Emitter } from './emitter.js'
import { type Storage } from './storage.js'
import { type Evaluate } from './types/utils.js'

export type ConnectorEventMap = {
  change: { accounts?: readonly Address[]; chainId?: number }
  connect: { accounts: readonly Address[]; chainId: number }
  disconnect: never
  error: { error: Error }
  message: { type: string; data?: unknown }
}

export type CreateConnectorFn<
  provider = unknown,
  properties extends Record<string, unknown> = {},
  storageItem extends Record<string, unknown> = {},
> = (config: {
  chains: readonly [Chain, ...Chain[]]
  emitter: Emitter<ConnectorEventMap>
  storage?: Storage<storageItem> | null
}) => Evaluate<
  {
    readonly id: string
    readonly name: string

    setup?(): Promise<void>
    connect(parameters?: { chainId?: number | undefined }): Promise<{
      accounts: readonly Address[]
      chainId: number
    }>
    disconnect(): Promise<void>
    getAccounts(): Promise<readonly Address[]>
    getChainId(): Promise<number>
    getProvider(parameters?: {
      chainId?: number | undefined
    }): Promise<provider>
    getClient?(parameters?: {
      chainId?: number | undefined
    }): Promise<Client>
    isAuthorized(): Promise<boolean>
    switchChain?(parameters: { chainId: number }): Promise<Chain>

    onAccountsChanged(accounts: string[]): void
    onChainChanged(chainId: string): void
    onConnect?(connectInfo: ProviderConnectInfo): void
    onDisconnect(error?: Error): void
    onMessage?(message: ProviderMessage): void
  } & properties
>

export function createConnector<
  provider,
  properties extends Record<string, unknown> = {},
  storageItem extends Record<string, unknown> = {},
>(fn: CreateConnectorFn<provider, properties, storageItem>) {
  return fn
}
