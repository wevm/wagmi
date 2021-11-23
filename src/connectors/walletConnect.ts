import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { IWCEthRpcConnectionOptions } from '@walletconnect/types'

import { Network } from '../types'
import { Connector } from './types'

export class WalletConnectConnector extends Connector {
  name = 'walletConnect'

  config: IWCEthRpcConnectionOptions
  provider: WalletConnectProvider

  constructor(config: IWCEthRpcConnectionOptions) {
    super()

    this.config = config
    this.provider = new WalletConnectProvider(config)

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  async activate() {
    this.provider.on('accountsChanged', this.handleAccountsChanged)
    this.provider.on('chainChanged', this.handleChainChanged)
    this.provider.on('disconnect', this.handleDisconnect)

    try {
      const accounts = <string[]>(<unknown>this.provider.enable())
      const account = accounts[0]
      return { account, provider: this.provider }
    } catch (error) {
      if ((<any>error).message === 'User closed modal')
        throw Error('eth_requestAccounts rejected')
      throw error
    }
  }

  deactivate() {
    if (!this.provider) return

    this.provider.removeListener('accountsChanged', this.handleAccountsChanged)
    this.provider.removeListener('chainChanged', this.handleChainChanged)
    this.provider.removeListener('disconnect', this.handleDisconnect)
    this.provider.disconnect()
  }

  async getAccount() {
    const accounts = this.provider.accounts
    return accounts[0]
  }

  async getChainId() {
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
