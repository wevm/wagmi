import { default as EventEmitter } from 'eventemitter3'
import { ethers } from 'ethers'
import { UserRejectedRequestError } from 'wagmi-private'
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

  private _options: MockProviderOptions
  private _wallet?: ethers.Wallet

  constructor(options: MockProviderOptions) {
    super(options.network)
    this._options = options
  }

  async enable() {
    if (this._options.flags?.failConnect) throw new UserRejectedRequestError()
    if (!this._wallet)
      this._wallet = new ethers.Wallet(this._options.privateKey)
    const address = await this._wallet.getAddress()
    this.events.emit('accountsChanged', [address])
    return [address]
  }

  async disconnect() {
    this.events.emit('disconnect')
    this._wallet = undefined
  }

  async getAccounts() {
    const address = await this._wallet?.getAddress()
    if (!address) return []
    return [getAddress(address)]
  }

  getSigner() {
    const signer = this._wallet
    if (!signer) throw new Error('Signer not found')
    return signer
  }

  async switchChain(chainId: number) {
    this._options.network = chainId
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
