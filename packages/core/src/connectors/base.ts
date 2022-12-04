import type { Address } from 'abitype'
import { default as EventEmitter } from 'eventemitter3'

import type { Chain } from '../chains'
import { goerli, mainnet } from '../chains'

export type ConnectorData<Provider = any> = {
  account?: Address
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
  Signer = any,
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
  abstract getSigner(config?: { chainId?: number }): Promise<Signer>
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
}
