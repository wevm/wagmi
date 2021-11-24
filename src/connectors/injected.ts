import { Network } from '../types'
import { hasInjected, isMetaMask } from '../utils'
import { Connector } from './types'

const unwrap = (response: { result: any } | any) =>
  response?.result ? response.result : response

export class InjectedConnector extends Connector {
  name = isMetaMask() ? 'MetaMask' : 'injected'
  disabled = !hasInjected()

  constructor() {
    super()

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  async connect() {
    try {
      if (!window.ethereum) throw Error('window.ethereum not found')

      if (window.ethereum.on) {
        window.ethereum.on('accountsChanged', this.handleAccountsChanged)
        window.ethereum.on('chainChanged', this.handleChainChanged)
        window.ethereum.on('disconnect', this.handleDisconnect)
      }

      if (window.ethereum.isMetaMask)
        window.ethereum.autoRefreshOnNetworkChange = false

      const accounts = await window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then(unwrap)
      const account = accounts[0]
      const chainId = await window.ethereum
        .request({ method: 'eth_chainId' })
        .then(unwrap)
      return { account, chainId, provider: window.ethereum }
    } catch (error) {
      if ((<ProviderRpcError>error).code === 4001)
        throw Error('eth_requestAccounts rejected')
      throw error
    }
  }

  disconnect() {
    if (!window?.ethereum?.removeListener) return

    window.ethereum.removeListener(
      'accountsChanged',
      this.handleAccountsChanged,
    )
    window.ethereum.removeListener('chainChanged', this.handleChainChanged)
    window.ethereum.removeListener('disconnect', this.handleDisconnect)
  }

  async getAccount() {
    if (!window.ethereum) throw Error('window.ethereum not found')

    try {
      const accounts = await window.ethereum
        .request({ method: 'eth_accounts' })
        .then(unwrap)
      return accounts[0]
    } catch {
      throw Error('eth_accounts failed')
    }
  }

  async getChainId() {
    if (!window.ethereum) throw Error('window.ethereum not found')

    try {
      return await window.ethereum
        .request({ method: 'eth_chainId' })
        .then(unwrap)
    } catch {
      try {
        return await window.ethereum
          .request({ method: 'net_version' })
          .then(unwrap)
      } catch {
        throw Error('chain id not detected')
      }
    }
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  async switchChain(chainId: string) {
    if (!window.ethereum) throw Error('window.ethereum not found')

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
    } catch (error) {
      // This error code indicates the chain has not been added
      if ((<ProviderRpcError>error).code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{ chainId: '0xf00' }],
          })
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }

  async getProvider() {
    return window.ethereum
  }

  private handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: accounts[0] })
  }

  private handleChainChanged(chainId: Network) {
    this.emit('change', { chainId, provider: window.ethereum })
  }

  private handleDisconnect() {
    this.emit('disconnect')
  }
}
