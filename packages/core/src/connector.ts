import type { Chain } from '@wagmi/chains'
import {
  type Address,
  type ProviderConnectInfo,
  type ProviderMessage,
} from 'viem'

import { Emitter } from './emitter.js'
import { type Storage } from './storage.js'
import { type Prettify } from './types.js'

export type ConnectorEventMap = {
  change: { accounts?: readonly Address[]; chainId?: number }
  connect: { accounts: readonly Address[]; chainId: number }
  disconnect: never
  error: { error: Error }
  message: { type: string; data?: unknown }
}

export type CreateConnectorFn<
  TProvider = unknown,
  TProperties = unknown,
> = (config: {
  chains: readonly Chain[]
  emitter: Emitter<ConnectorEventMap>
  storage?: Storage | null
}) => Prettify<
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
    getProvider(parameters?: { chainId?: number }): Promise<TProvider>
    isAuthorized(): Promise<boolean>
    switchChain?(parameters: { chainId: number }): Promise<Chain>

    onAccountsChanged(accounts: string[]): void
    onChainChanged(chainId: string): void
    onConnect(connectInfo: ProviderConnectInfo): void
    onDisconnect(error?: Error): void
    onMessage?(message: ProviderMessage): void
  } & TProperties
>

export function createConnector<TProvider, TProperties>(
  fn: CreateConnectorFn<TProvider, TProperties>,
) {
  return fn
}
