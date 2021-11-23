import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { IWCEthRpcConnectionOptions } from '@walletconnect/types'

import { Network } from '../types'
import { Connector } from './types'

export class WalletConnectConnector extends Connector {
  name = 'WalletConnect'

  config: IWCEthRpcConnectionOptions
  provider?: WalletConnectProvider

  constructor(config: IWCEthRpcConnectionOptions) {
    super()

    this.config = config

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  async connect() {
    try {
      if (!this.provider) this.provider = new WalletConnectProvider(this.config)

      this.provider.on('accountsChanged', this.handleAccountsChanged)
      this.provider.on('chainChanged', this.handleChainChanged)
      this.provider.on('disconnect', this.handleDisconnect)

      const accounts = await this.provider.enable()
      const account = accounts[0]
      return { account, provider: this.provider }
    } catch (error) {
      if ((<any>error).message === 'User closed modal')
        throw Error('eth_requestAccounts rejected')
      throw error
    }
  }

  disconnect() {
    if (!this.provider) return

    this.provider.removeListener('accountsChanged', this.handleAccountsChanged)
    this.provider.removeListener('chainChanged', this.handleChainChanged)
    this.provider.removeListener('disconnect', this.handleDisconnect)
    this.provider.disconnect()
  }

  async getAccount() {
    if (!this.provider) this.provider = new WalletConnectProvider(this.config)
    const accounts = this.provider.accounts
    return accounts[0]
  }

  async getChainId() {
    if (!this.provider) this.provider = new WalletConnectProvider(this.config)
    return this.provider.chainId
  }

  async getProvider() {
    return this.provider
  }

  private handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: accounts[0] })
  }

  private handleChainChanged(chainId: Network) {
    this.emit('change', { chainId })
  }

  private handleDisconnect() {
    this.emit('disconnect')
  }
}
