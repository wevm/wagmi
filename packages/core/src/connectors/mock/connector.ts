import { getAddress } from 'ethers/lib/utils'

import { allChains } from '../../constants'
import { Chain } from '../../types'
import { normalizeChainId } from '../../utils'
import { Connector } from '../base'
import { MockProvider, MockProviderOptions } from './provider'

export class MockConnector extends Connector<
  MockProvider,
  MockProviderOptions
> {
  readonly id = 'mock'
  readonly name = 'Mock'
  readonly ready = true

  #provider?: MockProvider

  constructor(config: { chains?: Chain[]; options: MockProviderOptions }) {
    super(config)
  }

  async connect() {
    const provider = await this.getProvider()
    provider.on('accountsChanged', this.onAccountsChanged)
    provider.on('chainChanged', this.onChainChanged)
    provider.on('disconnect', this.onDisconnect)

    this.emit('message', { type: 'connecting' })

    const accounts = await provider.enable()
    const account = getAddress(accounts[0])
    const id = normalizeChainId(provider._network.chainId)
    const unsupported = this.isChainUnsupported(id)
    const data = { account, chain: { id, unsupported }, provider }

    if (!this.options.flags?.noSwitchChain) this.switchChain = this.#switchChain

    return data
  }

  async disconnect() {
    const provider = await this.getProvider()
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
  }

  async getAccount() {
    const provider = await this.getProvider()
    const accounts = await provider.getAccounts()
    const account = accounts[0]
    if (!account) throw new Error('Failed to get account')
    // return checksum address
    return getAddress(account)
  }

  async getChainId() {
    const provider = await this.getProvider()
    return normalizeChainId(provider.network.chainId)
  }

  async getProvider() {
    if (!this.#provider) this.#provider = new MockProvider(this.options)
    return this.#provider
  }

  async getSigner() {
    const provider = await this.getProvider()
    return provider.getSigner()
  }

  async isAuthorized() {
    try {
      const provider = await this.getProvider()
      const account = await provider.getAccounts()
      return this.options.flags?.isAuthorized ?? !!account
    } catch {
      return false
    }
  }

  async #switchChain(chainId: number) {
    const provider = await this.getProvider()
    await provider.switchChain(chainId)
    const chains = [...this.chains, ...allChains]
    return (
      chains.find((x) => x.id === chainId) ?? {
        id: chainId,
        name: `Chain ${chainId}`,
        network: `${chainId}`,
        rpcUrls: { default: '' },
      }
    )
  }

  async watchAsset(asset: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }) {
    const provider = await this.getProvider()
    return await provider.watchAsset(asset)
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0]) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')
  }

  toJSON() {
    return '<MockConnector>'
  }
}
