import { default as EventEmitter } from 'eventemitter3'
import { Signer, providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'

import { UserRejectedRequestError } from '../../errors'

export type MockProviderOptions = {
  flags?: {
    isAuthorized?: boolean
    failConnect?: boolean
    failSwitchChain?: boolean
    noSwitchChain?: boolean
  }
  network?: number | string
  signer: Signer
}

type Events = {
  accountsChanged(accounts: string[]): void
  chainChanged(chainId: number | string): void
  disconnect(): void
}
type Event = keyof Events

export class MockProvider extends providers.BaseProvider {
  events = new EventEmitter<Events>()

  #options: MockProviderOptions
  #signer?: Signer

  constructor(options: MockProviderOptions) {
    super(options.network ?? 1)
    this.#options = options
  }

  async enable() {
    if (this.#options.flags?.failConnect)
      throw new UserRejectedRequestError(new Error('Failed to connect'))
    if (!this.#signer) this.#signer = this.#options.signer
    const address = await this.#signer.getAddress()
    this.events.emit('accountsChanged', [address])
    return [address]
  }

  async disconnect() {
    this.events.emit('disconnect')
    this.#signer = undefined
  }

  async getAccounts() {
    const address = await this.#signer?.getAddress()
    if (!address) return []
    return [getAddress(address)]
  }

  getSigner() {
    const signer = this.#signer
    if (!signer) throw new Error('Signer not found')
    return signer
  }

  async switchChain(chainId: number) {
    if (this.#options.flags?.failSwitchChain)
      throw new UserRejectedRequestError(new Error('Failed to switch chain'))
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
    return true
  }

  on(event: Event, listener: providers.Listener) {
    this.events.on(event, listener)
    return this
  }
  once(event: Event, listener: providers.Listener) {
    this.events.once(event, listener)
    return this
  }
  removeListener(event: Event, listener: providers.Listener) {
    this.events.removeListener(event, listener)
    return this
  }
  off(event: Event, listener: providers.Listener) {
    this.events.off(event, listener)
    return this
  }

  toJSON() {
    return '<MockProvider>'
  }
}
