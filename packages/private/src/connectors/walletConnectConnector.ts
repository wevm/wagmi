import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { IWCEthRpcConnectionOptions } from '@walletconnect/types'

import { UserRejectedRequestError } from '../errors'
import { Chain } from '../types'
import { getAddress, normalizeChainId } from '../utils'
import { Connector } from './base'

export class WalletConnectConnector extends Connector<
  WalletConnectProvider,
  IWCEthRpcConnectionOptions
> {
  readonly id = 'walletConnect'
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
    if (!this._provider)
      this._provider = new WalletConnectProvider(this.options)
    return this._provider
  }

  async connect() {
    try {
      // Use new provider instance for every connect
      const provider = new WalletConnectProvider(this.options)
      this._provider = provider

      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)

      const accounts = await provider.enable()
      const account = getAddress(accounts[0])
      const chainId = await this.getChainId()
      return {
        account,
        chainId,
        provider: new Web3Provider(<ExternalProvider>provider),
      }
    } catch (error) {
      if ((<ProviderRpcError>error).message === 'User closed modal')
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    const provider = this.provider
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    typeof localStorage !== 'undefined' &&
      localStorage.removeItem('walletconnect')
  }

  async getAccount() {
    const provider = this.provider
    const accounts = provider.accounts
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    const provider = this.provider
    const chainId = normalizeChainId(provider.chainId)
    return chainId
  }

  async getSigner() {
    const provider = this.provider
    const account = await this.getAccount()
    return new Web3Provider(<ExternalProvider>provider).getSigner(account)
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
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
