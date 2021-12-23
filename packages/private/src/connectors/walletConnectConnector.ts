import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { IWCEthRpcConnectionOptions } from '@walletconnect/types'

import { normalizeChainId } from '../utils'
import { BaseConnector, Chain } from './base'
import { UserRejectedRequestError } from './errors'

export class WalletConnectConnector extends BaseConnector {
  private _chains: Chain[]
  private _options: IWCEthRpcConnectionOptions
  private _provider?: WalletConnectProvider

  constructor(config: {
    chains: Chain[]
    options: IWCEthRpcConnectionOptions
  }) {
    super()
    this._options = config.options
    this._chains = config.chains
  }

  get chains() {
    return this._chains
  }

  get name() {
    return 'WalletConnect'
  }

  get provider() {
    return this._provider
  }

  get ready() {
    return true
  }

  async connect() {
    try {
      // Use new provider instance for every connect
      this._provider = new WalletConnectProvider(this._options)

      this._provider.on('accountsChanged', this.onAccountsChanged)
      this._provider.on('chainChanged', this.onChainChanged)
      this._provider.on('disconnect', this.onDisconnect)

      const accounts = await this._provider.enable()
      const account = accounts[0]
      const chainId = normalizeChainId(this._provider.chainId)
      return { account, chainId, provider: this._provider }
    } catch (error) {
      if ((<ProviderRpcError>error).message === 'User closed modal')
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    if (!this._provider) return

    this._provider.removeListener('accountsChanged', this.onAccountsChanged)
    this._provider.removeListener('chainChanged', this.onChainChanged)
    this._provider.removeListener('disconnect', this.onDisconnect)
    this._provider.disconnect()

    typeof localStorage !== 'undefined' &&
      localStorage.removeItem('walletconnect')
  }

  async getChainId() {
    if (!this._provider)
      this._provider = new WalletConnectProvider(this._options)
    const chainId = normalizeChainId(this._provider.chainId)
    return chainId
  }

  async isAuthorized() {
    try {
      if (!this._provider)
        this._provider = new WalletConnectProvider(this._options)
      const accounts = this._provider.accounts
      const account = accounts[0]

      return !!account
    } catch {
      return false
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
