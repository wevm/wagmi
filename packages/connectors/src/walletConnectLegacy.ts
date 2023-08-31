import type WalletConnectProvider from '@walletconnect/legacy-provider'
import {
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
  numberToHex,
} from 'viem'
import type { Chain } from 'viem/chains'

import { Connector } from './base'
import type { StorageStoreData, WalletClient } from './types'
import { normalizeChainId } from './utils/normalizeChainId'

/**
 * Wallets that support chain switching through WalletConnect
 * - imToken (token.im)
 * - Ledger Live (ledger.com)
 * - MetaMask (metamask.io)
 * - Rainbow (rainbow.me)
 * - Trust Wallet (trustwallet.com)
 * - Uniswap Wallet (uniswap.org)
 */
const switchChainAllowedRegex =
  /(imtoken|metamask|rainbow|trust wallet|uniswap wallet|ledger)/i

type WalletConnectOptions = ConstructorParameters<
  typeof WalletConnectProvider
>[0]

export class WalletConnectLegacyConnector extends Connector<
  WalletConnectProvider,
  WalletConnectOptions
> {
  readonly id = 'walletConnectLegacy'
  readonly name = 'WalletConnectLegacy'
  readonly ready = true

  #provider?: WalletConnectProvider

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      let targetChainId = chainId
      if (!targetChainId) {
        const store = this.storage?.getItem<StorageStoreData>('store')
        const lastUsedChainId = store?.state?.data?.chain?.id
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
      }
    } catch (error) {
      if (/user closed modal/i.test((error as ProviderRpcError).message))
        throw new UserRejectedRequestError(error as Error)
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
            (rpc, chain) => ({
              ...rpc,
              [chain.id]: chain.rpcUrls.default.http[0],
            }),
            {},
          )
        : {}

      const WalletConnectProvider = (
        await import('@walletconnect/legacy-provider')
      ).default
      this.#provider = new WalletConnectProvider({
        ...this.options,
        chainId,
        rpc: { ...rpc, ...this.options?.rpc },
      })

      // `@walletconnect/legacy-provider` automatically sets the chainId to `1`
      // if a wallet does not support the target chain regardless of what `chainId`
      // we pass to `WalletConnectProvider`.
      // This causes the target chain RPC URL to become out-of-sync.
      // WalletConnect's HTTP Provider should still work even if a wallet does
      // not support the chain. We just need to provide it with a valid RPC URL.
      // Here, we are making sure the RPC URL is set to the chain's RPC URL.
      // @ts-expect-error – ignore
      this.#provider.http = await this.#provider.setHttpProvider(chainId)
    }

    return this.#provider
  }

  async getWalletClient({
    chainId,
  }: { chainId?: number } = {}): Promise<WalletClient> {
    const [provider, account] = await Promise.all([
      this.getProvider({ chainId }),
      this.getAccount(),
    ])
    const chain = this.chains.find((x) => x.id === chainId)
    if (!provider) throw new Error('provider is required.')
    return createWalletClient({
      account,
      chain,
      transport: custom(provider),
    })
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
    const id = numberToHex(chainId)

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
        this.chains.find((x) => x.id === chainId) ??
        ({
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
          rpcUrls: { default: { http: [''] }, public: { http: [''] } },
        } as Chain)
      )
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as ProviderRpcError)?.message
      if (/user rejected request/i.test(message))
        throw new UserRejectedRequestError(error as Error)
      throw new SwitchChainError(error as Error)
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
