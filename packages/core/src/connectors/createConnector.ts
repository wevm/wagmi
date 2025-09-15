import type {
  AddEthereumChainParameter,
  Address,
  Chain,
  Client,
  ProviderConnectInfo,
  ProviderMessage,
} from 'viem'

import type { Transport } from '../createConfig.js'
import type { Emitter } from '../createEmitter.js'
import type { Storage } from '../createStorage.js'
import type { Compute, ExactPartial, StrictOmit } from '../types/utils.js'

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
  properties extends Record<string, unknown> = Record<string, unknown>,
  storageItem extends Record<string, unknown> = Record<string, unknown>,
> = (config: {
  chains: readonly [Chain, ...Chain[]]
  emitter: Emitter<ConnectorEventMap>
  storage?: Compute<Storage<storageItem>> | null | undefined
  transports?: Record<number, Transport> | undefined
}) => Compute<
  {
    readonly icon?: string | undefined
    readonly id: string
    readonly name: string
    readonly rdns?: string | readonly string[] | undefined
    /** @deprecated */
    readonly supportsSimulation?: boolean | undefined
    readonly type: string

    setup?(): Promise<void>
    // TODO(v3): Make `withCapabilities: true` default behavior
    connect<withCapabilities extends boolean = false>(
      parameters?:
        | {
            chainId?: number | undefined
            isReconnecting?: boolean | undefined
            withCapabilities?: withCapabilities | boolean | undefined
          }
        | undefined,
    ): Promise<{
      // TODO(v3): Add `capabilities` (e.g. `readonly { address: Address; capabilities: Record<string, unknown> | undefined }`)
      accounts: withCapabilities extends true
        ? readonly { address: Address; capabilities: Record<string, unknown> }[]
        : readonly Address[]
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
    switchChain?(
      parameters: Compute<{
        addEthereumChainParameter?:
          | ExactPartial<StrictOmit<AddEthereumChainParameter, 'chainId'>>
          | undefined
        chainId: number
      }>,
    ): Promise<Chain>

    onAccountsChanged(accounts: string[]): void
    onChainChanged(chainId: string): void
    onConnect?(connectInfo: ProviderConnectInfo): void
    onDisconnect(error?: Error | undefined): void
    onMessage?(message: ProviderMessage): void
  } & properties
>

export function createConnector<
  provider,
  properties extends Record<string, unknown> = Record<string, unknown>,
  storageItem extends Record<string, unknown> = Record<string, unknown>,
  ///
  createConnectorFn extends CreateConnectorFn<
    provider,
    properties,
    storageItem
  > = CreateConnectorFn<provider, properties, storageItem>,
>(createConnectorFn: createConnectorFn) {
  return createConnectorFn
}
