import type { ExternalProvider } from '@ethersproject/providers'
import { providers } from 'ethers'
import { getAddress, hexValue } from 'ethers/lib/utils'

import { Chain } from '../types'
import { allChains } from '../constants'
import { getInjectedName, normalizeChainId } from '../utils'
import {
  AddChainError,
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  SwitchChainError,
  UserRejectedRequestError,
} from '../errors'
import { Connector } from './base'
import { getClient } from '../client'

type InjectedConnectorOptions = {
  /**
   * MetaMask and other injected providers do not support programmatic disconnect.
   * This flag simulates the disconnect behavior by keeping track of connection status in storage.
   * @see https://github.com/MetaMask/metamask-extension/issues/10353
   * @default true
   */
  shimDisconnect?: boolean
}

const shimKey = 'injected.shimDisconnect'

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
    super({ ...config, options: { shimDisconnect: true, ...config?.options } })

    let name = 'Injected'
    if (typeof window !== 'undefined') name = getInjectedName(window.ethereum)
    this.name = name
  }

  async connect() {
    try {
      const provider = await this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      this.emit('message', { type: 'connecting' })

      const account = await this.getAccount()
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      if (this.options?.shimDisconnect)
        getClient().storage?.setItem(shimKey, true)

      return { account, chain: { id, unsupported }, provider }
    } catch (error) {
      if ((<ProviderRpcError>error).code === 4001)
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    if (!provider?.removeListener) return

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    if (this.options?.shimDisconnect) getClient().storage?.removeItem(shimKey)
  }

  async getAccount() {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    const accounts = await provider.request<string[]>({
      method: 'eth_requestAccounts',
    })
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    return await provider
      .request<string>({ method: 'eth_chainId' })
      .then(normalizeChainId)
  }

  async getProvider() {
    if (typeof window !== 'undefined' && !!window.ethereum)
      this.#provider = window.ethereum
    return this.#provider
  }

  async getSigner() {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ])
    return new providers.Web3Provider(<ExternalProvider>provider).getSigner(
      account,
    )
  }

  async isAuthorized() {
    try {
      if (
        this.options?.shimDisconnect &&
        !getClient().storage?.getItem(shimKey)
      )
        return false

      const provider = await this.getProvider()
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
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    const id = hexValue(chainId)

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
      const chains = [...this.chains, ...allChains]
      return (
        chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          rpcUrls: { default: '' },
        }
      )
    } catch (error) {
      // Indicates chain is not added to provider
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
                rpcUrls: this.getRpcUrls(chain),
                blockExplorerUrls: this.getBlockExplorerUrls(chain),
              },
            ],
          })
          return chain
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
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    return await provider.request({
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
    else this.emit('change', { account: getAddress(accounts[0]) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')
    if (this.options?.shimDisconnect) getClient().storage?.removeItem(shimKey)
  }
}
