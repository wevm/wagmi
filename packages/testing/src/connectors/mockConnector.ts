import { getAddress } from 'ethers/lib/utils'
import {
  Chain,
  Connector,
  allChains,
  defaultChains,
  normalizeChainId,
} from 'wagmi-private'

import { wallets } from '../constants'
import { MockProvider, MockProviderOptions } from './mockProvider'

export class MockConnector extends Connector<
  MockProvider,
  MockProviderOptions
> {
  readonly id = 'mock'
  readonly name = 'Mock'
  readonly ready = true

  private _provider?: MockProvider

  constructor(
    config: { chains: Chain[]; options: MockProviderOptions } = {
      chains: defaultChains,
      options: {
        network: 1,
        privateKey: wallets.ethers1.privateKey,
      },
    },
  ) {
    super(config)
  }

  async connect() {
    const provider = this.getProvider()
    provider.on('accountsChanged', this.onAccountsChanged)
    provider.on('chainChanged', this.onChainChanged)
    provider.on('disconnect', this.onDisconnect)

    const accounts = await provider.enable()
    const account = getAddress(accounts[0])
    const id = normalizeChainId(provider._network.chainId)
    const unsupported = this.isChainUnsupported(id)
    const data = { account, chain: { id, unsupported }, provider }
    return data
  }

  async disconnect() {
    const provider = this.getProvider()
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
  }

  async getAccount() {
    const provider = this.getProvider()
    const accounts = await provider.getAccounts()
    const account = accounts[0]
    if (!account) throw new Error('Failed to get account')
    // return checksum address
    return getAddress(account)
  }

  async getChainId() {
    const provider = this.getProvider()
    const chainId = normalizeChainId(provider.network.chainId)
    return chainId
  }

  getProvider() {
    if (!this._provider) this._provider = new MockProvider(this.options)
    return this._provider
  }

  async getSigner() {
    const provider = this.getProvider()
    const signer = provider.getSigner()
    return signer
  }

  async isAuthorized() {
    try {
      const provider = this.getProvider()
      const account = await provider.getAccounts()
      return !!account
    } catch {
      return false
    }
  }

  async switchChain(chainId: number) {
    const provider = this.getProvider()
    await provider.switchChain(chainId)
    const chains = [...this.chains, ...allChains]
    return chains.find((x) => x.id === chainId)
  }

  async watchAsset(asset: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }) {
    const provider = this.getProvider()
    await provider.watchAsset(asset)
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
}
