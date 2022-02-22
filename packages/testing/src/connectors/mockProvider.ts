import { default as EventEmitter } from 'eventemitter3'
import { ethers } from 'ethers'
import { UserRejectedRequestError } from 'wagmi-core'
import { getAddress } from 'ethers/lib/utils'

export type MockProviderOptions = {
  flags?: {
    failConnect?: boolean
    failSign?: boolean
  }
  privateKey: string
  network: number | string
}

type Events = {
  accountsChanged(accounts: string[]): void
  chainChanged(chainId: number | string): void
  disconnect(): void
}
type Event = keyof Events

export class MockProvider extends ethers.providers.BaseProvider {
  events = new EventEmitter<Events>()

  #options: MockProviderOptions
  #wallet?: ethers.Wallet

  constructor(options: MockProviderOptions) {
    super(options.network)
    this.#options = options
  }

  async enable() {
    if (this.#options.flags?.failConnect) throw new UserRejectedRequestError()
    if (!this.#wallet)
      this.#wallet = new ethers.Wallet(this.#options.privateKey)
    const address = await this.#wallet.getAddress()
    this.events.emit('accountsChanged', [address])
    return [address]
  }

  async disconnect() {
    this.events.emit('disconnect')
    this.#wallet = undefined
  }

  async getAccounts() {
    const address = await this.#wallet?.getAddress()
    if (!address) return []
    return [getAddress(address)]
  }

  getSigner() {
    const signer = this.#wallet
    if (!signer) throw new Error('Signer not found')
    return signer
  }

  async switchChain(chainId: number) {
    this.#options.network = chainId
    this.network.chainId = chainId
    this.events.emit('chainChanged', chainId)
  }

  async watchAsset(_asset: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }) {
    true
  }

  on(event: Event, listener: ethers.providers.Listener) {
    this.events.on(event, listener)
    return this
  }
  once(event: Event, listener: ethers.providers.Listener) {
    this.events.once(event, listener)
    return this
  }
  removeListener(event: Event, listener: ethers.providers.Listener) {
    this.events.removeListener(event, listener)
    return this
  }
  off(event: Event, listener: ethers.providers.Listener) {
    this.events.off(event, listener)
    return this
  }
}
