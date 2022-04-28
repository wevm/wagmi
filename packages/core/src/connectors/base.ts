import { default as EventEmitter } from 'eventemitter3'
import { Signer } from 'ethers/lib/ethers'

import { defaultChains } from '../constants'
import { Chain } from '../types'

export type ConnectorData<Provider = any> = {
  account?: string
  chain?: { id: number; unsupported: boolean }
  provider?: Provider
}

export interface ConnectorEvents<Provider = any> {
  change(data: ConnectorData<Provider>): void
  connect(data: ConnectorData<Provider>): void
  message({ type, data }: { type: string; data?: unknown }): void
  disconnect(): void
  error(error: Error): void
}

export abstract class Connector<
  Provider = any,
  Options = any,
> extends EventEmitter<ConnectorEvents<Provider>> {
  /** Unique connector id */
  abstract readonly id: string
  /** Connector name */
  abstract readonly name: string
  /** Chains connector supports */
  readonly chains: Chain[]
  /** Options to use with connector */
  readonly options: Options
  /** Whether connector is usable */
  abstract readonly ready: boolean

  constructor({
    chains = defaultChains,
    options,
  }: {
    chains?: Chain[]
    options: Options
  }) {
    super()
    this.chains = chains
    this.options = options
  }

  abstract connect(): Promise<Required<ConnectorData>>
  abstract disconnect(): Promise<void>
  abstract getAccount(): Promise<string>
  abstract getChainId(): Promise<number>
  abstract getProvider(create?: boolean): Promise<Provider>
  abstract getSigner(): Promise<Signer>
  abstract isAuthorized(): Promise<boolean>
  switchChain?(chainId: number): Promise<Chain>
  watchAsset?(asset: {
    address: string
    image?: string
    symbol: string
  }): Promise<boolean>

  protected abstract onAccountsChanged(accounts: string[]): void
  protected abstract onChainChanged(chain: number | string): void
  protected abstract onDisconnect(error: Error): void

  protected getBlockExplorerUrls(chain: Chain) {
    const blockExplorer = chain.blockExplorers?.default
    if (Array.isArray(blockExplorer)) return blockExplorer.map((x) => x.url)
    if (blockExplorer?.url) return [blockExplorer.url]
    return []
  }

  protected isChainUnsupported(chainId: number) {
    return !this.chains.some((x) => x.id === chainId)
  }
}
