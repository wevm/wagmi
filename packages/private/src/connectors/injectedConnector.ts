import { Chain } from '../types'
import { hexValue, normalizeChainId } from '../utils'
import { Connector } from './base'
import {
  AddChainError,
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  SwitchChainError,
  UserRejectedRequestError,
} from './errors'

export class InjectedConnector extends Connector<
  Window['ethereum'],
  undefined
> {
  readonly name =
    typeof window !== 'undefined' && window.ethereum?.isMetaMask
      ? 'MetaMask'
      : 'Injected'
  readonly ready = typeof window !== 'undefined' && !!window.ethereum

  constructor(config?: { chains?: Chain[] }) {
    super({ ...config, options: undefined })
  }

  get provider() {
    return window.ethereum
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
      const chainId = await this.getChainId()

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

  async getChainId() {
    if (!window.ethereum) throw new ConnectorNotFoundError()
    return await window.ethereum
      .request<string>({ method: 'eth_chainId' })
      .then(normalizeChainId)
  }

  async isAuthorized() {
    try {
      if (!window.ethereum) throw new ConnectorNotFoundError()
      const accounts = await window.ethereum.request<string[]>({
        method: 'eth_accounts',
      })
      const account = accounts[0]
      return !!account
    } catch {
      return false
    }
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
          const chain = this.chains.find((x) => x.id === chainId)
          if (!chain) throw new ChainNotConfiguredError()
          await window.ethereum.request({
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
    if (!window.ethereum) throw new ConnectorNotFoundError()

    await window.ethereum.request({
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
