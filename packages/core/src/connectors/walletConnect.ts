import type { ExternalProvider } from '@ethersproject/providers'
import { providers } from 'ethers'
import type WalletConnectProvider from '@walletconnect/ethereum-provider'
import type { IWCEthRpcConnectionOptions } from '@walletconnect/types'
import { getAddress, hexValue } from 'ethers/lib/utils'

import { allChains } from '../constants'
import { SwitchChainError, UserRejectedRequestError } from '../errors'
import { Chain } from '../types'
import { normalizeChainId } from '../utils'
import { Connector } from './base'

const switchChainAllowedRegex = /(rainbow)/i

type Accounts = string[]

export class WalletConnectConnector extends Connector<
  WalletConnectProvider,
  IWCEthRpcConnectionOptions,
  Accounts
> {
  readonly id = 'walletConnect'
  readonly name = 'WalletConnect'
  readonly ready = true

  #provider?: WalletConnectProvider

  constructor(config: {
    chains?: Chain[]
    options: IWCEthRpcConnectionOptions
  }) {
    super(config)
  }

  async connect() {
    try {
      // Defer message to the next tick to ensure wallet connect data (provided by `.enable()`) is available
      setTimeout(() => this.emit('message', { type: 'connecting' }), 0)

      const { accounts, provider } = await this.enable()

      const account = getAddress(accounts[0])
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      return {
        account,
        chain: { id, unsupported },
        provider: new providers.Web3Provider(<ExternalProvider>provider),
      }
    } catch (error) {
      if (/user closed modal/i.test((<ProviderRpcError>error).message))
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    await provider.disconnect()

    await this.disable()

    typeof localStorage !== 'undefined' &&
      localStorage.removeItem('walletconnect')
  }

  async disable() {
    const provider = await this.getProvider()
    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
  }

  async enable() {
    const provider = await this.getProvider(true)

    provider.on('accountsChanged', this.onAccountsChanged)
    provider.on('chainChanged', this.onChainChanged)
    provider.on('disconnect', this.onDisconnect)

    const accounts: Accounts = await provider.enable()

    // Not all WalletConnect options support programmatic chain switching
    // Only enable for wallet options that do
    const walletName = provider.connector?.peerMeta?.name ?? ''
    console.log('test', walletName)
    if (switchChainAllowedRegex.test(walletName))
      this.switchChain = this.#switchChain

    return { accounts, provider }
  }

  async getAccount() {
    const provider = await this.getProvider()
    const accounts = provider.accounts
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    const provider = await this.getProvider()
    const chainId = normalizeChainId(provider.chainId)
    return chainId
  }

  async getProvider(create?: boolean) {
    if (!this.#provider || create) {
      const WalletConnectProvider = (
        await import('@walletconnect/ethereum-provider')
      ).default
      this.#provider = new WalletConnectProvider(this.options)
    }
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
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  async #switchChain(chainId: number) {
    const provider = await this.getProvider()
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
      const message =
        typeof error === 'string' ? error : (<ProviderRpcError>error)?.message
      if (/user rejected request/i.test(message))
        throw new UserRejectedRequestError()
      else throw new SwitchChainError()
    }
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
  }
}
