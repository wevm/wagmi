import { Chain, Message } from '../types'
import {
  getAddress,
  hexValue,
  normalizeChainId,
  normalizeMessage,
} from '../utils'
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
  readonly name =
    typeof window !== 'undefined' && window.ethereum?.isMetaMask
      ? 'MetaMask'
      : 'Injected'
  readonly ready = typeof window !== 'undefined' && !!window.ethereum

  private _provider?: Window['ethereum']

  constructor(config?: { chains?: Chain[] }) {
    super({ ...config, options: undefined })
  }

  get provider() {
    if (!this._provider) this._provider = window.ethereum
    return this._provider
  }

  async connect() {
    try {
      const provider = this.provider
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
    const provider = this.provider
    if (!provider?.removeListener) return

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
  }

  async getAccount() {
    const provider = this.provider
    if (!provider) throw new ConnectorNotFoundError()
    const accounts = await provider.request<string[]>({
      method: 'eth_requestAccounts',
    })
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    const provider = this.provider
    if (!provider) throw new ConnectorNotFoundError()
    return await provider
      .request<string>({ method: 'eth_chainId' })
      .then(normalizeChainId)
  }

  async isAuthorized() {
    try {
      const provider = this.provider
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

  async signMessage({ message }: { message: Message }) {
    try {
      const provider = this.provider
      if (!provider) throw new ConnectorNotFoundError()

      const account = await this.getAccount()
      const signature = await provider.request<string>({
        method: 'personal_sign',
        params: [normalizeMessage(message), account],
      })
      return signature
    } catch (error) {
      if ((<ProviderRpcError>error).code === 4001)
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async switchChain(chainId: number) {
    const provider = this.provider
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
    const provider = this.provider
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
