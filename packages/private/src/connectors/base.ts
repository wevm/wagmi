import { default as EventEmitter } from 'eventemitter3'

import { ConnectorError } from './errors'

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: AddEthereumChainParameter['rpcUrls']
  blockExplorers?: { name: string; url: string }[]
  testnet?: boolean
}

export type Data<Provider = any> = {
  account?: string
  chainId?: number
  provider?: Provider
}

export interface ConnectorEvents<Provider = any> {
  change(data: Data<Provider>): void
  connect(data: Data<Provider>): void
  disconnect(): void
  error(error: ConnectorError): void
}

export abstract class Connector<
  Provider = any,
  Options = any,
> extends EventEmitter<ConnectorEvents<Provider>> {
  /** Connector name */
  abstract readonly name: string
  /** Chains connector supports */
  readonly chains: Chain[]
  /** Options to use with connector */
  readonly options: Options
  /** Provider associated with connector */
  abstract readonly provider?: Provider
  /** Whether connector is usable */
  abstract readonly ready: boolean

  constructor(config: { chains: Chain[]; options: Options }) {
    super()
    this.chains = config.chains
    this.options = config.options
  }

  abstract connect(): Promise<Data>
  abstract disconnect(): Promise<void>
  abstract getChainId(): Promise<number>
  abstract isAuthorized(): Promise<boolean>
  switchChain?(chainId: number): Promise<void>

  protected abstract onAccountsChanged(accounts: string[]): void
  protected abstract onChainChanged(chain: number | string): void
  protected abstract onDisconnect(): void
}
