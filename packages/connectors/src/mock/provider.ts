import { default as EventEmitter } from 'eventemitter3'
import { UserRejectedRequestError, getAddress } from 'viem'

import { WalletClient } from '../types'

export type MockProviderOptions = {
  chainId: number
  flags?: {
    isAuthorized?: boolean
    failConnect?: boolean
    failSwitchChain?: boolean
    noSwitchChain?: boolean
  }
  walletClient: WalletClient
}

type Events = {
  accountsChanged(accounts: string[]): void
  chainChanged(chainId: number | string): void
  disconnect(): void
}
type Event = keyof Events

export class MockProvider {
  events = new EventEmitter<Events>()

  chainId: number
  #options: MockProviderOptions
  #walletClient?: WalletClient

  constructor(options: MockProviderOptions) {
    this.chainId = options.chainId
    this.#options = options
  }

  async enable() {
    if (this.#options.flags?.failConnect)
      throw new UserRejectedRequestError(new Error('Failed to connect.'))
    if (!this.#walletClient) this.#walletClient = this.#options.walletClient
    const address = this.#walletClient.account.address
    this.events.emit('accountsChanged', [address])
    return [address]
  }

  async disconnect() {
    this.events.emit('disconnect')
    this.#walletClient = undefined
  }

  async getAccounts() {
    const address = this.#walletClient?.account.address
    if (!address) return []
    return [getAddress(address)]
  }

  getWalletClient(): WalletClient {
    const walletClient = this.#walletClient
    if (!walletClient) throw new Error('walletClient not found')
    return walletClient
  }

  async switchChain(chainId: number) {
    if (this.#options.flags?.failSwitchChain)
      throw new UserRejectedRequestError(new Error('Failed to switch chain.'))
    this.#options.chainId = chainId
    this.chainId = chainId
    this.events.emit('chainChanged', chainId)
  }

  async switchWalletClient(walletClient: WalletClient) {
    const address = walletClient.account.address
    this.#walletClient = walletClient
    this.events.emit('accountsChanged', [address])
  }

  async watchAsset(_asset: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }) {
    return true
  }

  async request({ method, params }: any) {
    return this.#walletClient?.transport.request({ method, params })
  }

  on(event: Event, listener: (...args: any[]) => void) {
    this.events.on(event, listener)
    return this
  }

  removeListener(event: Event, listener: (...args: any[]) => void) {
    this.events.removeListener(event, listener)
    return this
  }

  toJSON() {
    return '<MockProvider>'
  }
}
