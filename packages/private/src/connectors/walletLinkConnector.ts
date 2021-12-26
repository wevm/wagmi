import { WalletLink, WalletLinkProvider } from 'walletlink'
import { WalletLinkOptions } from 'walletlink/dist/WalletLink'

import { Chain } from '../types'
import { normalizeChainId } from '../utils'
import { Connector } from './base'
import { UserRejectedRequestError } from './errors'

type Options = WalletLinkOptions & { jsonRpcUrl?: string }

export class WalletLinkConnector extends Connector<
  WalletLinkProvider,
  Options
> {
  readonly name = 'Coinbase Wallet'
  readonly ready = true

  private _client: WalletLink
  private _provider?: WalletLinkProvider

  constructor(config: { chains: Chain[]; options: Options }) {
    super(config)
    this._client = new WalletLink(config.options)
  }

  get provider() {
    return this._provider
  }

  async connect() {
    try {
      if (!this._provider)
        this._provider = this._client.makeWeb3Provider(this.options.jsonRpcUrl)

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
    this._provider.close()

    if (typeof localStorage !== 'undefined') {
      let n = localStorage.length
      while (n--) {
        const key = localStorage.key(n)
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
      const accounts = await this._provider.request<string[]>({
        method: 'eth_accounts',
      })
      const account = accounts[0]
      return !!account
    } catch {
      return false
    }
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
