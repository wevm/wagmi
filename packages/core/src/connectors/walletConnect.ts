import type WalletConnectProvider from '@walletconnect/ethereum-provider'
import { providers } from 'ethers'
import { getAddress, hexValue } from 'ethers/lib/utils.js'

import type { Chain } from '../chains'
import { getClient } from '../client'
import type { ProviderRpcError } from '../errors'
import { SwitchChainError, UserRejectedRequestError } from '../errors'
import { normalizeChainId } from '../utils'
import { Connector } from './base'

/**
 * Wallets that support chain switching through WalletConnect
 * - imToken (token.im)
 * - MetaMask (metamask.io)
 * - Rainbow (rainbow.me)
 * - Trust Wallet (trustwallet.com)
 */
const switchChainAllowedRegex = /(imtoken|metamask|rainbow|trust wallet)/i

type WalletConnectOptions = ConstructorParameters<
  typeof WalletConnectProvider
>[0]

type WalletConnectSigner = providers.JsonRpcSigner

export class WalletConnectConnector extends Connector<
  WalletConnectProvider,
  WalletConnectOptions,
  WalletConnectSigner
> {
  readonly id = 'walletConnect'
  readonly name = 'WalletConnect'
  readonly ready = true

  #provider?: WalletConnectProvider

  constructor(config: { chains?: Chain[]; options: WalletConnectOptions }) {
    super(config)
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      let targetChainId = chainId
      if (!targetChainId) {
        const lastUsedChainId = getClient().lastUsedChainId
        if (lastUsedChainId && !this.isChainUnsupported(lastUsedChainId))
          targetChainId = lastUsedChainId
      }

      const provider = await this.getProvider({
        chainId: targetChainId,
        create: true,
      })
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)

      // Defer message to the next tick to ensure wallet connect data (provided by `.enable()`) is available
      setTimeout(() => this.emit('message', { type: 'connecting' }), 0)

      const accounts = await provider.enable()
      const account = getAddress(accounts[0] as string)
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
        provider: new providers.Web3Provider(
          provider as providers.ExternalProvider,
        ),
      }
    } catch (error) {
      if (/user closed modal/i.test((error as ProviderRpcError).message))
        throw new UserRejectedRequestError(error)
      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    typeof localStorage !== 'undefined' &&
      localStorage.removeItem('walletconnect')
  }

  async getAccount() {
    const provider = await this.getProvider()
    const accounts = provider.accounts
    // return checksum address
    return getAddress(accounts[0] as string)
  }

  async getChainId() {
    const provider = await this.getProvider()
    const chainId = normalizeChainId(provider.chainId)
    return chainId
  }

  async getProvider({
    chainId,
    create,
  }: { chainId?: number; create?: boolean } = {}) {
    // Force create new provider
    if (!this.#provider || chainId || create) {
      const rpc = !this.options?.infuraId
        ? this.chains.reduce(
            (rpc, chain) => ({ ...rpc, [chain.id]: chain.rpcUrls.default }),
            {},
          )
        : {}

      const WalletConnectProvider = (
        await import('@walletconnect/ethereum-provider')
      ).default
      this.#provider = new WalletConnectProvider({
        ...this.options,
        chainId,
        rpc: { ...rpc, ...this.options?.rpc },
      })
    }

    return this.#provider
  }

  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider, account] = await Promise.all([
      this.getProvider({ chainId }),
      this.getAccount(),
    ])
    return new providers.Web3Provider(
      provider as providers.ExternalProvider,
      chainId,
    ).getSigner(account)
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
      // Set up a race between `wallet_switchEthereumChain` & the `chainChanged` event
      // to ensure the chain has been switched. This is because there could be a case
      // where a wallet may not resolve the `wallet_switchEthereumChain` method, or
      // resolves slower than `chainChanged`.
      await Promise.race([
        provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: id }],
        }),
        new Promise((res) =>
          this.on('change', ({ chain }) => {
            if (chain?.id === chainId) res(chainId)
          }),
        ),
      ])
      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
          rpcUrls: { default: { http: [''] } },
        }
      )
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as ProviderRpcError)?.message
      if (/user rejected request/i.test(message))
        throw new UserRejectedRequestError(error)
      throw new SwitchChainError(error)
    }
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0] as string) })
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
