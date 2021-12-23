import { MockProvider } from 'ethereum-waffle'
import type Ganache from 'ganache-core'

import { hexValue, normalizeChainId } from '../utils'
import { defaultChains } from '../constants'
import { BaseConnector, Chain } from '../connectors'
import {
  AddChainError,
  ChainNotConfiguredError,
  SwitchChainError,
  UserRejectedRequestError,
} from '../connectors/errors'

type MockProviderOptions = {
  ganacheOptions: Ganache.IProviderOptions
}

export class MockConnector extends BaseConnector {
  private _chains: Chain[]
  private _options: MockProviderOptions
  private _provider?: MockProvider

  constructor(
    config: { chains: Chain[]; options: MockProviderOptions } = {
      chains: defaultChains,
      options: { ganacheOptions: {} },
    },
  ) {
    super()
    this._options = config.options
    this._chains = config.chains
  }

  get chains() {
    return this._chains
  }

  get name() {
    return 'Mock'
  }

  get provider() {
    return this._provider
  }

  get ready() {
    return true
  }

  async connect() {
    // Use new provider instance for every connect
    this._provider = new MockProvider(this._options)

    this._provider.on('accountsChanged', this.onAccountsChanged)
    this._provider.on('chainChanged', this.onChainChanged)
    this._provider.on('disconnect', this.onDisconnect)

    const accounts = this._provider.getWallets()
    const account = await accounts[0].getAddress()
    const chainId = normalizeChainId(this._provider.network.chainId)
    return { account, chainId, provider: this._provider }
  }

  async disconnect() {
    if (!this._provider) return

    this._provider.removeListener('accountsChanged', this.onAccountsChanged)
    this._provider.removeListener('chainChanged', this.onChainChanged)
    this._provider.removeListener('disconnect', this.onDisconnect)
  }

  async getChainId() {
    if (!this._provider) this._provider = new MockProvider(this._options)
    const chainId = normalizeChainId(this._provider.network.chainId)
    return chainId
  }

  async isAuthorized() {
    try {
      if (!this._provider) this._provider = new MockProvider(this._options)
      const accounts = this._provider.getWallets()
      const account = accounts[0].getAddress()

      return !!account
    } catch {
      return false
    }
  }

  async switchChain(chainId: number) {
    if (!this._provider) this._provider = new MockProvider(this._options)
    if (!this._provider.provider?.request) return
    const id = hexValue(chainId)

    try {
      await this._provider.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
    } catch (error) {
      // Indicates chain is not added to MetaMask
      if ((<ProviderRpcError>error).code === 4902) {
        try {
          const chain = this._chains.find((x) => x.id === chainId)
          if (!chain) throw new ChainNotConfiguredError()
          await this._provider.provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: id,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: chain.rpcUrls,
                blockExplorerUrls: chain.blockExplorers?.map((x) => x.url),
              },
            ],
          })
        } catch (addError) {
          throw new AddChainError()
        }
      } else if ((<ProviderRpcError>error).code === 4001) {
        throw new UserRejectedRequestError()
      } else {
        throw new SwitchChainError()
      }
    }
  }

  private onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: accounts[0] })
  }

  private onChainChanged = (chainId: number | string) => {
    this.emit('change', { chainId: normalizeChainId(chainId) })
  }

  private onDisconnect = () => {
    this.emit('disconnect')
  }
}
