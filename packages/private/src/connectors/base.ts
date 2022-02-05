import { default as EventEmitter } from 'eventemitter3'
import { Signer } from 'ethers'

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

  abstract connect(): Promise<ConnectorData>
  abstract disconnect(): Promise<void>
  abstract getAccount(): Promise<string>
  abstract getChainId(): Promise<number>
  abstract getProvider(create?: boolean): Provider
  abstract getSigner(): Promise<Signer>
  abstract isAuthorized(): Promise<boolean>
  switchChain?(chainId: number): Promise<Chain | undefined>
  watchAsset?(asset: {
    address: string
    image?: string
    symbol: string
  }): Promise<void>

  protected abstract onAccountsChanged(accounts: string[]): void
  protected abstract onChainChanged(chain: number | string): void
  protected abstract onDisconnect(): void

  protected isChainUnsupported(chainId: number) {
    return !this.chains.some((x) => x.id === chainId)
  }
}
