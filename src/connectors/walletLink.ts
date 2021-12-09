import { WalletLink, WalletLinkProvider } from 'walletlink'
import { WalletLinkOptions } from 'walletlink/dist/WalletLink'

import { normalizeChainId } from '../utils'
import { BaseConnector } from './base'
import { UserRejectedRequestError } from './errors'

export class WalletLinkConnector extends BaseConnector {
  private _client: WalletLink
  private _config: WalletLinkOptions & { jsonRpcUrl?: string }
  private _provider?: WalletLinkProvider

  constructor(config: WalletLinkOptions & { jsonRpcUrl?: string }) {
    super()
    this._config = config
    this._client = new WalletLink(config)
  }

  get name() {
    return 'WalletLink'
  }

  get provider() {
    return this._provider
  }

  get ready() {
    return true
  }

  async connect() {
    try {
      if (!this._provider)
        this._provider = this._client.makeWeb3Provider(this._config.jsonRpcUrl)

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

    if (typeof localStorage !== 'undefined') {
      let n = localStorage.length
      while (n--) {
        console.log(n)
        const key = localStorage.key(n)
        console.log(key)
        if (!key) continue
        if (!/-walletlink/.test(key)) continue
        localStorage.removeItem(key)
      }
    }
  }

  async getChainId() {
    if (!this._provider) this._provider = this._client.makeWeb3Provider()
    const chainId = normalizeChainId(this._provider.chainId)
    return chainId
  }

  async isAuthorized() {
    try {
      if (!this._provider) this._provider = this._client.makeWeb3Provider()
      return this._provider.connected
    } catch {
      return false
    }
  }

  async isConnected() {
    if (!this._provider) this._provider = this._client.makeWeb3Provider()
    return this._provider.connected
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
