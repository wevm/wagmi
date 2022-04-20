import { ExternalProvider, Web3Provider } from '@ethersproject/providers'
import { WalletLink, WalletLinkProvider } from 'walletlink'
import { WalletLinkOptions } from 'walletlink/dist/WalletLink'

import { allChains } from '../constants'
import { SwitchChainError, UserRejectedRequestError } from '../errors'
import { Chain } from '../types'
import { getAddress, hexValue, normalizeChainId } from '../utils'
import { Connector } from './base'

type Options = WalletLinkOptions & { jsonRpcUrl?: string }

const cache = new Set<string>()
const deprecatedMessage =
  'WalletLinkConnector is deprecated. Use CoinbaseWalletConnector instead.'

/**
 * @deprecated se the new {@link CoinbaseWalletConnector} base class instead.
 */
export class WalletLinkConnector extends Connector<
  WalletLinkProvider,
  Options
> {
  readonly id = 'walletLink'
  readonly name = 'Coinbase Wallet'
  readonly ready =
    typeof window !== 'undefined' && !window.ethereum?.isCoinbaseWallet

  #client?: WalletLink
  #provider?: WalletLinkProvider

  constructor(config: { chains?: Chain[]; options: Options }) {
    super(config)

    if (typeof window !== 'undefined' && !cache.has(deprecatedMessage)) {
      console.warn(deprecatedMessage)
      cache.add(deprecatedMessage)
    }
  }

  async connect() {
    try {
      const provider = this.getProvider()
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)

      const accounts = await provider.enable()
      const account = getAddress(accounts[0])
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)
      return {
        account,
        chain: { id, unsupported },
        provider: new Web3Provider(<ExternalProvider>(<unknown>provider)),
      }
    } catch (error) {
      if (/user closed modal/i.test((<ProviderRpcError>error).message))
        throw new UserRejectedRequestError()
      throw error
    }
  }

  async disconnect() {
    if (!this.#provider) return

    const provider = this.getProvider()
    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
    provider.disconnect()
    provider.close()

    if (typeof localStorage !== 'undefined') {
      let n = localStorage.length
      while (n--) {
        const key = localStorage.key(n)
        if (!key) continue
        if (!/-walletlink/.test(key)) continue
        localStorage.removeItem(key)
      }
    }
  }

  async getAccount() {
    const provider = this.getProvider()
    const accounts = await provider.request<string[]>({
      method: 'eth_accounts',
    })
    // return checksum address
    return getAddress(accounts[0])
  }

  async getChainId() {
    const provider = this.getProvider()
    const chainId = normalizeChainId(provider.chainId)
    return chainId
  }

  getProvider() {
    if (!this.#provider) {
      this.#client = new WalletLink(this.options)
      this.#provider = this.#client.makeWeb3Provider(this.options.jsonRpcUrl)
    }
    return this.#provider
  }

  async getSigner() {
    const provider = this.getProvider()
    const account = await this.getAccount()
    return new Web3Provider(<ExternalProvider>(<unknown>provider)).getSigner(
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

  async switchChain(chainId: number) {
    const provider = this.getProvider()
    const id = hexValue(chainId)

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
      const chains = [...this.chains, ...allChains]
      return chains.find((x) => x.id === chainId)
    } catch (error) {
      if (
        /user rejected signature request/i.test(
          (<ProviderRpcError>error).message,
        )
      )
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
