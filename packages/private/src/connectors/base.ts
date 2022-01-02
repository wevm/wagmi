import { default as EventEmitter } from 'eventemitter3'
import { Signer } from 'ethers'

import { defaultChains } from '../constants'
import { Chain } from '../types'

export type Data<Provider = any> = {
  account?: string
  chainId?: number
  provider?: Provider
}

export interface ConnectorEvents<Provider = any> {
  change(data: Data<Provider>): void
  connect(data: Data<Provider>): void
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

  abstract connect(): Promise<Data>
  abstract disconnect(): Promise<void>
  abstract getAccount(): Promise<string>
  abstract getChainId(): Promise<number>
  abstract getProvider(create?: boolean): Provider
  abstract getSigner(): Promise<Signer>
  abstract isAuthorized(): Promise<boolean>
  switchChain?(chainId: number): Promise<void>
  watchAsset?(asset: {
    address: string
    image?: string
    symbol: string
  }): Promise<void>

  protected abstract onAccountsChanged(accounts: string[]): void
  protected abstract onChainChanged(chain: number | string): void
  protected abstract onDisconnect(): void
}
