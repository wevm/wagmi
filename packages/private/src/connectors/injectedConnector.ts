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

const isClient = typeof window !== 'undefined'

export class InjectedConnector extends Connector<
  Window['ethereum'],
  undefined
> {
  readonly name =
    !isClient && window.ethereum?.isMetaMask ? 'MetaMask' : 'Injected'
  readonly provider = isClient ? window?.ethereum : undefined
  readonly ready = isClient && !!window.ethereum

  constructor(config?: { chains?: Chain[] }) {
    super({ ...config, options: undefined })
  }

  async connect() {
    try {
      if (!this.provider) throw new ConnectorNotFoundError()

      if (this.provider.on) {
        this.provider.on('accountsChanged', this.onAccountsChanged)
        this.provider.on('chainChanged', this.onChainChanged)
        this.provider.on('disconnect', this.onDisconnect)
      }

      const account = await this.getAccount()
      const chainId = await this.getChainId()
      return { account, chainId, provider: this.provider }
    } catch (error) {
      if ((<ProviderRpcError>error).code === 4001)
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    if (!this.provider?.removeListener) return

    this.provider.removeListener('accountsChanged', this.onAccountsChanged)
    this.provider.removeListener('chainChanged', this.onChainChanged)
    this.provider.removeListener('disconnect', this.onDisconnect)
  }

  async getAccount() {
    if (!this.provider) throw new ConnectorNotFoundError()
    const accounts = await this.provider.request<string[]>({
      method: 'eth_requestAccounts',
    })
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    if (!this.provider) throw new ConnectorNotFoundError()
    return await this.provider
      .request<string>({ method: 'eth_chainId' })
      .then(normalizeChainId)
  }

  async isAuthorized() {
    try {
      if (!this.provider) throw new ConnectorNotFoundError()
      const accounts = await this.provider.request<string[]>({
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
      if (!this.provider) throw new ConnectorNotFoundError()

      const account = await this.getAccount()
      const _message = normalizeMessage(message)
      const signature = await this.provider.request<string>({
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

  async switchChain(chainId: number) {
    if (!this.provider) throw new ConnectorNotFoundError()
    const id = hexValue(chainId)

    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
    } catch (error) {
      // Indicates chain is not added to MetaMask
      if ((<ProviderRpcError>error).code === 4902) {
        try {
          const chain = this.chains.find((x) => x.id === chainId)
          if (!chain) throw new ChainNotConfiguredError()
          await this.provider.request({
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
    if (!this.provider) throw new ConnectorNotFoundError()

    await this.provider.request({
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
