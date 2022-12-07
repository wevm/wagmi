import { getAddress } from 'ethers/lib/utils.js'

import type { Chain } from '../../chains'
import { normalizeChainId } from '../../utils'
import type { ConnectorData } from '../base'
import { Connector } from '../base'
import type { MockProviderOptions } from './provider'
import { MockProvider } from './provider'

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

  async connect({ chainId }: { chainId?: number } = {}) {
    const provider = await this.getProvider({ chainId })
    provider.on('accountsChanged', this.onAccountsChanged)
    provider.on('chainChanged', this.onChainChanged)
    provider.on('disconnect', this.onDisconnect)

    this.emit('message', { type: 'connecting' })

    const accounts = await provider.enable()
    const account = getAddress(accounts[0] as string)
    const id = normalizeChainId(provider._network.chainId)
    const unsupported = this.isChainUnsupported(id)
    const data = { account, chain: { id, unsupported }, provider }

    if (!this.options.flags?.noSwitchChain) this.switchChain = this.#switchChain

    return new Promise<Required<ConnectorData>>((res) =>
      setTimeout(() => res(data), 100),
    )
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

  async getProvider({ chainId }: { chainId?: number } = {}) {
    if (!this.#provider || chainId)
      this.#provider = new MockProvider({ ...this.options, chainId })
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
    return (
      this.chains.find((x) => x.id === chainId) ?? {
        id: chainId,
        name: `Chain ${chainId}`,
        network: `${chainId}`,
        nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
        rpcUrls: { default: { http: [''] } },
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
    return provider.watchAsset(asset)
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0] as string) })
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
