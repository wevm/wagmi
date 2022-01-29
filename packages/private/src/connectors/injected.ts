import { ExternalProvider, Web3Provider } from '@ethersproject/providers'

import { Chain } from '../types'
import {
  getAddress,
  getInjectedName,
  hexValue,
  normalizeChainId,
} from '../utils'
import {
  AddChainError,
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  SwitchChainError,
  UserRejectedRequestError,
} from '../errors'
import { Connector } from './base'

type InjectedConnectorOptions = {
  /**
   * MetaMask and other injected providers do not support programmatic disconnect.
   * This flag simulates the disconnect behavior by keeping track of connection status in localStorage.
   * @see https://github.com/MetaMask/metamask-extension/issues/10353
   */
  shimDisconnect?: boolean
}

const shimKey = 'wagmi.shimDisconnect'

export class InjectedConnector extends Connector<
  Window['ethereum'],
  InjectedConnectorOptions | undefined
> {
  readonly id = 'injected'
  readonly name: string
  readonly ready = typeof window != 'undefined' && !!window.ethereum

  #provider?: Window['ethereum']

  constructor(config?: {
    chains?: Chain[]
    options?: InjectedConnectorOptions
  }) {
    super({ ...config, options: config?.options })

    let name = 'Injected'
    if (typeof window !== 'undefined') name = getInjectedName(window.ethereum)
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
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      if (this.options?.shimDisconnect)
        typeof localStorage !== 'undefined' &&
          localStorage.setItem(shimKey, 'true')

      return { account, chain: { id, unsupported }, provider }
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

    if (this.options?.shimDisconnect)
      typeof localStorage !== 'undefined' && localStorage.removeItem(shimKey)
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
      this.#provider = window.ethereum
    return this.#provider
  }

  async getSigner() {
    const provider = this.getProvider()
    const account = await this.getAccount()
    return new Web3Provider(<ExternalProvider>provider).getSigner(account)
  }

  async isAuthorized() {
    try {
      console.log(localStorage.getItem(shimKey))
      if (
        this.options?.shimDisconnect &&
        typeof localStorage !== 'undefined' &&
        !localStorage.getItem(shimKey)
      )
        return false

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
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')

    if (this.options?.shimDisconnect)
      typeof localStorage !== 'undefined' && localStorage.removeItem(shimKey)
  }
}
