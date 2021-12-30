import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { IWCEthRpcConnectionOptions } from '@walletconnect/types'

import { UserRejectedRequestError } from '../errors'
import { Chain } from '../types'
import { getAddress, normalizeChainId, normalizeMessage } from '../utils'
import { Connector } from './base'

export class WalletConnectConnector extends Connector<
  WalletConnectProvider,
  IWCEthRpcConnectionOptions
> {
  readonly name = 'WalletConnect'
  readonly ready = true

  private _provider?: WalletConnectProvider

  constructor(config: {
    chains?: Chain[]
    options: IWCEthRpcConnectionOptions
  }) {
    super(config)
  }

  get provider() {
    return this._provider
  }

  async connect() {
    try {
      // Use new provider instance for every connect
      this._provider = new WalletConnectProvider(this.options)

      this._provider.on('accountsChanged', this.onAccountsChanged)
      this._provider.on('chainChanged', this.onChainChanged)
      this._provider.on('disconnect', this.onDisconnect)

      const accounts = await this._provider.enable()
      const account = getAddress(accounts[0])
      const chainId = await this.getChainId()
      return { account, chainId, provider: this._provider }
    } catch (error) {
      if ((<ProviderRpcError>error).message === 'User closed modal')
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    if (!this._provider) return
    await this._provider.disconnect()

    this._provider.removeListener('accountsChanged', this.onAccountsChanged)
    this._provider.removeListener('chainChanged', this.onChainChanged)
    this._provider.removeListener('disconnect', this.onDisconnect)

    typeof localStorage !== 'undefined' &&
      localStorage.removeItem('walletconnect')
  }

  async getAccount() {
    if (!this._provider)
      this._provider = new WalletConnectProvider(this.options)
    const accounts = this._provider.accounts
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    if (!this._provider)
      this._provider = new WalletConnectProvider(this.options)
    const chainId = normalizeChainId(this._provider.chainId)
    return chainId
  }

  async isAuthorized() {
    try {
      if (!this._provider)
        this._provider = new WalletConnectProvider(this.options)
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  async signMessage({ message }: { message: string }) {
    try {
      if (!this._provider)
        this._provider = new WalletConnectProvider(this.options)

      const account = await this.getAccount()
      const _message = normalizeMessage(message)
      const signature = await this._provider.request<string>({
        method: 'personal_sign',
        params: [_message, account],
      })
      return signature
    } catch (error) {
      if ((<ProviderRpcError>error).code === 4001)
        throw new UserRejectedRequestError()
      throw error
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
