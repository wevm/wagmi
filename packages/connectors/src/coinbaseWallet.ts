import {
  type CoinbaseWalletProvider,
  type CoinbaseWalletSDK,
} from '@coinbase/wallet-sdk'
import {
  ChainNotConfiguredError,
  createConnector,
  normalizeChainId,
} from '@wagmi/core'
import type { Evaluate, Mutable, Omit } from '@wagmi/core/internal'
import {
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

// TODO(@3): Set `enableMobileWalletLink` to `true`
export type CoinbaseWalletParameters = Evaluate<
  Mutable<
    Omit<
      ConstructorParameters<typeof CoinbaseWalletSDK>[0],
      'reloadOnDisconnect' // remove property since TSDoc says default is `true`
    >
  > & {
    /**
     * Fallback Ethereum JSON RPC URL
     * @default ""
     */
    jsonRpcUrl?: string | undefined
    /**
     * Fallback Ethereum Chain ID
     * @default 1
     */
    chainId?: number | undefined
    /**
     * Whether or not to reload dapp automatically after disconnect.
     * @default false
     */
    reloadOnDisconnect?: boolean | undefined
  }
>

coinbaseWallet.type = 'coinbaseWallet' as const
export function coinbaseWallet(parameters: CoinbaseWalletParameters) {
  const reloadOnDisconnect = false

  type Provider = CoinbaseWalletProvider
  type Properties = {}

  let sdk: CoinbaseWalletSDK | undefined
  let walletProvider: Provider | undefined

  return createConnector<Provider, Properties>((config) => ({
    id: 'coinbaseWalletSDK',
    name: 'Coinbase Wallet',
    type: coinbaseWallet.type,
    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider()
        const accounts = (
          (await provider.request({
            method: 'eth_requestAccounts',
          })) as string[]
        ).map((x) => getAddress(x))

        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect.bind(this))

        // Switch to chain if provided
        let currentChainId = await this.getChainId()
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error
            return { id: currentChainId }
          })
          currentChainId = chain?.id ?? currentChainId
        }

        return { accounts, chainId: currentChainId }
      } catch (error) {
        if (
          /(user closed modal|accounts received is empty|user denied account)/i.test(
            (error as Error).message,
          )
        )
          throw new UserRejectedRequestError(error as Error)
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()

      provider.removeListener('accountsChanged', this.onAccountsChanged)
      provider.removeListener('chainChanged', this.onChainChanged)
      provider.removeListener('disconnect', this.onDisconnect.bind(this))

      provider.disconnect()
      provider.close()
    },
    async getAccounts() {
      const provider = await this.getProvider()
      return (
        await provider.request<string[]>({
          method: 'eth_accounts',
        })
      ).map((x) => getAddress(x))
    },
    async getChainId() {
      const provider = await this.getProvider()
      const chainId = await provider.request<number>({ method: 'eth_chainId' })
      return normalizeChainId(chainId)
    },
    async getProvider() {
      if (!walletProvider) {
        const { default: CoinbaseWalletSDK } = await import(
          '@coinbase/wallet-sdk'
        )
        let SDK: typeof CoinbaseWalletSDK.default
        if (
          typeof CoinbaseWalletSDK !== 'function' &&
          typeof CoinbaseWalletSDK.default === 'function'
        )
          SDK = CoinbaseWalletSDK.default
        else
          SDK = CoinbaseWalletSDK as unknown as typeof CoinbaseWalletSDK.default
        sdk = new SDK({ reloadOnDisconnect, ...parameters })

        // Force types to retrieve private `walletExtension` method from the Coinbase Wallet SDK.
        const walletExtensionChainId = (
          sdk as unknown as {
            get walletExtension(): { getChainId(): number } | undefined
          }
        ).walletExtension?.getChainId()

        const chain =
          config.chains.find((chain) =>
            parameters.chainId
              ? chain.id === parameters.chainId
              : chain.id === walletExtensionChainId,
          ) || config.chains[0]
        const chainId = parameters.chainId || chain?.id
        const jsonRpcUrl =
          parameters.jsonRpcUrl || chain?.rpcUrls.default.http[0]

        walletProvider = sdk.makeWeb3Provider(jsonRpcUrl, chainId)
      }
      return walletProvider
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch {
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const provider = await this.getProvider()
      const chainId_ = numberToHex(chain.id)

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId_ }],
        })
        return chain
      } catch (error) {
        // Indicates chain is not added to provider
        if ((error as ProviderRpcError).code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: chainId_,
                  chainName: chain.name,
                  nativeCurrency: chain.nativeCurrency,
                  rpcUrls: [chain.rpcUrls.default?.http[0] ?? ''],
                  blockExplorerUrls: [chain.blockExplorers?.default.url],
                },
              ],
            })
            return chain
          } catch (error) {
            throw new UserRejectedRequestError(error as Error)
          }
        }

        throw new SwitchChainError(error as Error)
      }
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) config.emitter.emit('disconnect')
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      const chainId = normalizeChainId(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
      provider.removeListener('accountsChanged', this.onAccountsChanged)
      provider.removeListener('chainChanged', this.onChainChanged)
      provider.removeListener('disconnect', this.onDisconnect.bind(this))
    },
  }))
}
