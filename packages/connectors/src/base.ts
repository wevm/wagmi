import { default as EventEmitter } from 'eventemitter3'
import type { Address } from 'viem'
import type { Chain } from 'viem/chains'
import { goerli, mainnet } from 'viem/chains'

import { Storage, WalletClient } from './types'

export type ConnectorData = {
  account?: Address
  chain?: { id: number; unsupported: boolean }
}

export interface ConnectorEvents {
  change(data: ConnectorData): void
  connect(data: ConnectorData): void
  message({ type, data }: { type: string; data?: unknown }): void
  disconnect(): void
  error(error: Error): void
}

export abstract class Connector<
  Provider = any,
  Options = any,
> extends EventEmitter<ConnectorEvents> {
  /** Unique connector id */
  abstract readonly id: string
  /** Connector name */
  abstract readonly name: string
  /** Chains connector supports */
  readonly chains: Chain[]
  /** Options to use with connector */
  readonly options: Options
  /** Connector storage. */
  protected storage?: Storage
  /** Whether connector is usable */
  abstract readonly ready: boolean

  constructor({
    chains = [mainnet, goerli],
    options,
  }: {
    chains?: Chain[]
    options: Options
  }) {
    super()
    this.chains = chains
    this.options = options
  }

  abstract connect(config?: {
    chainId?: number
  }): Promise<Required<ConnectorData>>
  abstract disconnect(): Promise<void>
  abstract getAccount(): Promise<Address>
  abstract getChainId(): Promise<number>
  abstract getProvider(config?: { chainId?: number }): Promise<Provider>
  abstract getWalletClient(config?: { chainId?: number }): Promise<WalletClient>
  abstract isAuthorized(): Promise<boolean>
  switchChain?(chainId: number): Promise<Chain>
  watchAsset?(asset: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }): Promise<boolean>

  protected abstract onAccountsChanged(accounts: Address[]): void
  protected abstract onChainChanged(chain: number | string): void
  protected abstract onDisconnect(error: Error): void

  protected getBlockExplorerUrls(chain: Chain) {
    const { default: blockExplorer, ...blockExplorers } =
      chain.blockExplorers ?? {}
    if (blockExplorer)
      return [
        blockExplorer.url,
        ...Object.values(blockExplorers).map((x) => x.url),
      ]
  }

  protected isChainUnsupported(chainId: number) {
    return !this.chains.some((x) => x.id === chainId)
  }

  setStorage(storage: Storage) {
    this.storage = storage
  }
}
