import { hexValue } from 'ethers/lib/utils'

import { defaultChains } from '../constants'
import { normalizeChainId } from '../utils'
import { BaseConnector, Chain } from './base'
import {
  AddChainError,
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  SwitchChainError,
  UserRejectedRequestError,
} from './errors'

export class InjectedConnector extends BaseConnector {
  private _chains: Chain[]

  constructor(
    config: { chains: Chain[] } = {
      chains: defaultChains,
    },
  ) {
    super()
    this._chains = config.chains
  }

  get chains() {
    return this._chains
  }

  get name() {
    return typeof window !== 'undefined' && window.ethereum?.isMetaMask
      ? 'MetaMask'
      : 'injected'
  }

  get provider() {
    return window.ethereum
  }

  get ready() {
    return typeof window !== 'undefined' && !!window.ethereum
  }

  async connect() {
    try {
      if (!window.ethereum) throw new ConnectorNotFoundError()

      if (window.ethereum.on) {
        window.ethereum.on('accountsChanged', this.onAccountsChanged)
        window.ethereum.on('chainChanged', this.onChainChanged)
        window.ethereum.on('disconnect', this.onDisconnect)
      }

      const accounts = await window.ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      })
      const account = accounts[0]
      const chainId = await window.ethereum
        .request<string>({
          method: 'eth_chainId',
        })
        .then(normalizeChainId)

      return { account, chainId, provider: window.ethereum }
    } catch (error) {
      if ((<ProviderRpcError>error).code === 4001)
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    if (!window?.ethereum?.removeListener) return

    window.ethereum.removeListener('accountsChanged', this.onAccountsChanged)
    window.ethereum.removeListener('chainChanged', this.onChainChanged)
    window.ethereum.removeListener('disconnect', this.onDisconnect)
  }

  async isAuthorized() {
    if (!window.ethereum) throw new ConnectorNotFoundError()

    try {
      const accounts = await window.ethereum.request<string[]>({
        method: 'eth_accounts',
      })
      const account = accounts[0]
      return !!account
    } catch {
      return false
    }
  }

  async isConnected() {
    return await this.isAuthorized()
  }

  async switchChain(chainId: number) {
    if (!window.ethereum) throw new ConnectorNotFoundError()
    const id = hexValue(chainId)

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
    } catch (error) {
      // Indicates chain is not added to MetaMask
      if ((<ProviderRpcError>error).code === 4902) {
        try {
          const chain = this._chains.find((x) => x.id === chainId)
          if (!chain) throw new ChainNotConfiguredError()
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: id,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: chain.rpcUrls,
                blockExplorerUrls: chain.blockExplorerUrls,
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
