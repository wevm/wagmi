import { normalizeChainId } from '../utils'
import { Chain } from '../types'
import { defaultChains, defaultMnemonic } from '../constants'
import { Connector } from '../connectors'
import { MockProvider, MockProviderOptions } from './mockProvider'

export class MockConnector extends Connector<
  MockProvider,
  MockProviderOptions
> {
  readonly name = 'Mock'
  readonly ready = true

  private _provider: MockProvider

  constructor(
    config: { chains: Chain[]; options: MockProviderOptions } = {
      chains: defaultChains,
      options: {
        mnemonic: defaultMnemonic,
        network: 1,
      },
    },
  ) {
    super(config)
    this._provider = new MockProvider(config.options)
  }

  get provider() {
    return this._provider
  }

  async connect() {
    this._provider.on('accountsChanged', this.onAccountsChanged)
    this._provider.on('chainChanged', this.onChainChanged)
    this._provider.on('disconnect', this.onDisconnect)

    const accounts = await this._provider.enable()
    const account = accounts[0]
    const chainId = normalizeChainId(this._provider._network.chainId)
    const data = { account, chainId, provider: this._provider }
    return data
  }

  async disconnect() {
    await this._provider.disconnect()

    this._provider.removeListener('accountsChanged', this.onAccountsChanged)
    this._provider.removeListener('chainChanged', this.onChainChanged)
    this._provider.removeListener('disconnect', this.onDisconnect)
  }

  async getChainId() {
    const chainId = normalizeChainId(this._provider.network.chainId)
    return chainId
  }

  async isAuthorized() {
    try {
      const account = await this._provider.getAccounts()
      return !!account
    } catch {
      return false
    }
  }

  async watchAsset(_asset: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }) {
    true
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: accounts[0] })
  }

  protected onChainChanged = (chainId: number | string) => {
    this.emit('change', { chainId: normalizeChainId(chainId) })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')
  }
}
