import { ExternalProvider, Web3Provider } from '@ethersproject/providers'

import { Chain } from '../types'
import { getAddress, hexValue, normalizeChainId } from '../utils'
import {
  AddChainError,
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  SwitchChainError,
  UserRejectedRequestError,
} from '../errors'
import { Connector } from './base'

export class InjectedConnector extends Connector<
  Window['ethereum'],
  undefined
> {
  readonly id = 'injected'
  readonly name: string
  readonly ready = typeof window != 'undefined' && !!window.ethereum

  private _provider?: Window['ethereum']

  constructor(config?: { chains?: Chain[] }) {
    super({ ...config, options: undefined })

    let name = 'Injected'
    if (typeof window !== 'undefined' && window.ethereum) {
      if (window.ethereum.isMetaMask) name = 'MetaMask'
      if (window.ethereum.isCoinbaseWallet) name = 'Coinbase Wallet'
    }
    this.name = name
  }

  async connect() {
    try {
      const provider = this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      const account = await this.getAccount()
      const chainId = await this.getChainId()
      return { account, chainId, provider }
    } catch (error) {
      if ((<ProviderRpcError>error).code === 4001)
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    const provider = this.getProvider()
    if (!provider?.removeListener) return

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
  }

  async getAccount() {
    const provider = this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    const accounts = await provider.request<string[]>({
      method: 'eth_requestAccounts',
    })
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    const provider = this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    return await provider
      .request<string>({ method: 'eth_chainId' })
      .then(normalizeChainId)
  }

  getProvider() {
    if (typeof window !== 'undefined' && !!window.ethereum)
      this._provider = window.ethereum
    return this._provider
  }

  async getSigner() {
    const provider = this.getProvider()
    const account = await this.getAccount()
    return new Web3Provider(<ExternalProvider>provider).getSigner(account)
  }

  async isAuthorized() {
    try {
      const provider = this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()
      const accounts = await provider.request<string[]>({
        method: 'eth_accounts',
      })
      const account = accounts[0]
      return !!account
    } catch {
      return false
    }
  }

  async switchChain(chainId: number) {
    const provider = this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    const id = hexValue(chainId)

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
    } catch (error) {
      // Indicates chain is not added to MetaMask
      if ((<ProviderRpcError>error).code === 4902) {
        try {
          const chain = this.chains.find((x) => x.id === chainId)
          if (!chain) throw new ChainNotConfiguredError()
          await provider.request({
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
      } else if ((<ProviderRpcError>error).code === 4001)
        throw new UserRejectedRequestError()
      else throw new SwitchChainError()
    }
  }

  async watchAsset({
    address,
    decimals = 18,
    image,
    symbol,
  }: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }) {
    const provider = this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    await provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          decimals,
          image,
          symbol,
        },
      },
    })
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
