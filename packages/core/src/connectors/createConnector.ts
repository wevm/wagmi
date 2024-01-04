import {
  type Address,
  type Chain,
  type Client,
  type ProviderConnectInfo,
  type ProviderMessage,
} from 'viem'

import { Emitter } from '../createEmitter.js'
import { type Storage } from '../createStorage.js'
import { type Evaluate } from '../types/utils.js'

export type ConnectorEventMap = {
  change: {
    accounts?: readonly Address[] | undefined
    chainId?: number | undefined
  }
  connect: { accounts: readonly Address[]; chainId: number }
  disconnect: never
  error: { error: Error }
  message: { type: string; data?: unknown | undefined }
}

export type CreateConnectorFn<
  provider = unknown,
  properties extends Record<string, unknown> = {},
  storageItem extends Record<string, unknown> = {},
> = (config: {
  chains: readonly [Chain, ...Chain[]]
  emitter: Emitter<ConnectorEventMap>
  storage?: Evaluate<Storage<storageItem>> | null | undefined
}) => Evaluate<
  {
    readonly icon?: string | undefined
    readonly id: string
    readonly name: string
    readonly type: string

    setup?(): Promise<void>
    connect(
      parameters?:
        | { chainId?: number | undefined; isReconnecting?: boolean | undefined }
        | undefined,
    ): Promise<{
      accounts: readonly Address[]
      chainId: number
    }>
    disconnect(): Promise<void>
    getAccounts(): Promise<readonly Address[]>
    getChainId(): Promise<number>
    getProvider(
      parameters?: { chainId?: number | undefined } | undefined,
    ): Promise<provider>
    getClient?(
      parameters?: { chainId?: number | undefined } | undefined,
    ): Promise<Client>
    isAuthorized(): Promise<boolean>
    switchChain?(parameters: { chainId: number }): Promise<Chain>

    onAccountsChanged(accounts: string[]): void
    onChainChanged(chainId: string): void
    onConnect?(connectInfo: ProviderConnectInfo): void
    onDisconnect(error?: Error | undefined): void
    onMessage?(message: ProviderMessage): void
  } & properties
>

export function createConnector<
  provider,
  properties extends Record<string, unknown> = {},
  storageItem extends Record<string, unknown> = {},
>(createConnectorFn: CreateConnectorFn<provider, properties, storageItem>) {
  return createConnectorFn
}
