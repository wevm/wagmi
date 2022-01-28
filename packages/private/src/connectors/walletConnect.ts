import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { IWCEthRpcConnectionOptions } from '@walletconnect/types'

import { SwitchChainError, UserRejectedRequestError } from '../errors'
import { Chain } from '../types'
import { getAddress, hexValue, normalizeChainId } from '../utils'
import { Connector } from './base'

const switchChainAllowedRegex = /(rainbow)/i

export class WalletConnectConnector extends Connector<
  WalletConnectProvider,
  IWCEthRpcConnectionOptions
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
      const provider = this.getProvider(true)
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)

      const accounts = await provider.enable()
      const account = getAddress(accounts[0])
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      // Not all WalletConnect options support programmatic chain switching
      // Only enable for wallet options that do
      const walletName = provider.connector?.peerMeta?.name ?? ''
      if (switchChainAllowedRegex.test(walletName))
        this.switchChain = this.#switchChain

      return {
        account,
        chain: { id, unsupported },
        provider: new Web3Provider(<ExternalProvider>provider),
      }
    } catch (error) {
      if (/user closed modal/i.test((<ProviderRpcError>error).message))
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    const provider = this.getProvider()
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    typeof localStorage !== 'undefined' &&
      localStorage.removeItem('walletconnect')
  }

  async getAccount() {
    const provider = this.getProvider()
    const accounts = provider.accounts
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    const provider = this.getProvider()
    const chainId = normalizeChainId(provider.chainId)
    return chainId
  }

  getProvider(create?: boolean) {
    if (!this.#provider || create)
      this.#provider = new WalletConnectProvider(this.options)
    return this.#provider
  }

  async getSigner() {
    const provider = this.getProvider()
    const account = await this.getAccount()
    return new Web3Provider(<ExternalProvider>provider).getSigner(account)
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
    const provider = this.getProvider()
    const id = hexValue(chainId)

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
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
    else this.emit('change', { account: accounts[0] })
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
