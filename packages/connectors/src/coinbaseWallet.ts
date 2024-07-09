import type {
  CoinbaseWalletSDK,
  Preference,
  ProviderInterface,
} from '@coinbase/wallet-sdk'
import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
} from '@wagmi/core'
import type { Compute, Mutable, Omit } from '@wagmi/core/internal'
import type {
  CoinbaseWalletProvider as CBW_Provider,
  CoinbaseWalletSDK as CBW_SDK,
} from 'cbw-sdk'
import {
  type AddEthereumChainParameter,
  type Hex,
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

type Version = '3' | '4'

export type CoinbaseWalletParameters<version extends Version = '3'> =
  version extends '4'
    ? Compute<
        {
          headlessMode?: false | undefined
          /** Coinbase Wallet SDK version */
          version?: version | '3' | undefined
        } & Version4Parameters
      >
    : Compute<
        {
          /**
           * @deprecated `headlessMode` will be removed in the next major version. Upgrade to `version: '4'`.
           */
          headlessMode?: true | undefined
          /**
           * Coinbase Wallet SDK version
           * @deprecated Version 3 will be removed in the next major version. Upgrade to `version: '4'`.
           * @default '4'
           */
          version?: version | '4' | undefined
        } & Version3Parameters
      >

coinbaseWallet.type = 'coinbaseWallet' as const
export function coinbaseWallet<version extends Version>(
  parameters: CoinbaseWalletParameters<version> = {} as any,
): version extends '4'
  ? ReturnType<typeof version4>
  : ReturnType<typeof version3> {
  if (parameters.version === '3' || parameters.headlessMode)
    return version3(parameters as Version3Parameters) as any
  return version4(parameters as Version4Parameters) as any
}

type Version4Parameters = Mutable<
  Omit<
    ConstructorParameters<typeof CoinbaseWalletSDK>[0],
    'appChainIds' // set via wagmi config
  > & {
    /**
     * Preference for the type of wallet to display.
     * @default 'all'
     */
    preference?: Preference['options'] | undefined
  }
>

function version4(parameters: Version4Parameters) {
  type Provider = ProviderInterface & {
    // for backwards compatibility
    close?(): void
  }

  let sdk: CoinbaseWalletSDK | undefined
  let walletProvider: Provider | undefined

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let chainChanged: Connector['onChainChanged'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider>((config) => ({
    id: 'coinbaseWalletSDK',
    name: 'Coinbase Wallet',
    supportsSimulation: true,
    type: coinbaseWallet.type,
    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider()
        const accounts = (
          (await provider.request({
            method: 'eth_requestAccounts',
          })) as string[]
        ).map((x) => getAddress(x))

        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this)
          provider.on('accountsChanged', accountsChanged)
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this)
          provider.on('chainChanged', chainChanged)
        }
        if (!disconnect) {
          disconnect = this.onDisconnect.bind(this)
          provider.on('disconnect', disconnect)
        }

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
          /(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(
            (error as Error).message,
          )
        )
          throw new UserRejectedRequestError(error as Error)
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()

      if (accountsChanged) {
        provider.removeListener('accountsChanged', accountsChanged)
        accountsChanged = undefined
      }
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect)
        disconnect = undefined
      }

      provider.disconnect()
      provider.close?.()
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
      const chainId = await provider.request<Hex>({
        method: 'eth_chainId',
      })
      return Number(chainId)
    },
    async getProvider() {
      if (!walletProvider) {
        // Unwrapping import for Vite compatibility.
        // See: https://github.com/vitejs/vite/issues/9703
        const CoinbaseWalletSDK = await (async () => {
          const { default: SDK } = await import('@coinbase/wallet-sdk')
          if (typeof SDK !== 'function' && typeof SDK.default === 'function')
            return SDK.default
          return SDK as unknown as typeof SDK.default
        })()

        sdk = new CoinbaseWalletSDK({
          ...parameters,
          appChainIds: config.chains.map((x) => x.id),
        })

        walletProvider = sdk.makeWeb3Provider({
          ...parameters,
          options: parameters.preference ?? 'all',
        })
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
    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const provider = await this.getProvider()

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chain.id) }],
        })
        return chain
      } catch (error) {
        // Indicates chain is not added to provider
        if ((error as ProviderRpcError).code === 4902) {
          try {
            let blockExplorerUrls: string[] | undefined
            if (addEthereumChainParameter?.blockExplorerUrls)
              blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls
            else
              blockExplorerUrls = chain.blockExplorers?.default.url
                ? [chain.blockExplorers?.default.url]
                : []

            let rpcUrls: readonly string[]
            if (addEthereumChainParameter?.rpcUrls?.length)
              rpcUrls = addEthereumChainParameter.rpcUrls
            else rpcUrls = [chain.rpcUrls.default?.http[0] ?? '']

            const addEthereumChain = {
              blockExplorerUrls,
              chainId: numberToHex(chainId),
              chainName: addEthereumChainParameter?.chainName ?? chain.name,
              iconUrls: addEthereumChainParameter?.iconUrls,
              nativeCurrency:
                addEthereumChainParameter?.nativeCurrency ??
                chain.nativeCurrency,
              rpcUrls,
            } satisfies AddEthereumChainParameter

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [addEthereumChain],
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
      if (accounts.length === 0) this.onDisconnect()
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
      if (accountsChanged) {
        provider.removeListener('accountsChanged', accountsChanged)
        accountsChanged = undefined
      }
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect)
        disconnect = undefined
      }
    },
  }))
}

type Version3Parameters = Mutable<
  Omit<
    ConstructorParameters<typeof CBW_SDK>[0],
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

function version3(parameters: Version3Parameters) {
  const reloadOnDisconnect = false

  type Provider = CBW_Provider

  let sdk: CBW_SDK | undefined
  let walletProvider: Provider | undefined

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let chainChanged: Connector['onChainChanged'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider>((config) => ({
    id: 'coinbaseWalletSDK',
    name: 'Coinbase Wallet',
    supportsSimulation: true,
    type: coinbaseWallet.type,
    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider()
        const accounts = (
          (await provider.request({
            method: 'eth_requestAccounts',
          })) as string[]
        ).map((x) => getAddress(x))

        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this)
          provider.on('accountsChanged', accountsChanged)
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this)
          provider.on('chainChanged', chainChanged)
        }
        if (!disconnect) {
          disconnect = this.onDisconnect.bind(this)
          provider.on('disconnect', disconnect)
        }

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

      if (accountsChanged) {
        provider.removeListener('accountsChanged', accountsChanged)
        accountsChanged = undefined
      }
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect)
        disconnect = undefined
      }

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
      const chainId = await provider.request<Hex>({
        method: 'eth_chainId',
      })
      return Number(chainId)
    },
    async getProvider() {
      if (!walletProvider) {
        // Unwrapping import for Vite compatibility.
        // See: https://github.com/vitejs/vite/issues/9703
        const CoinbaseWalletSDK = await (async () => {
          const { default: SDK } = await import('cbw-sdk')
          if (typeof SDK !== 'function' && typeof SDK.default === 'function')
            return SDK.default
          return SDK as unknown as typeof SDK.default
        })()

        sdk = new CoinbaseWalletSDK({ ...parameters, reloadOnDisconnect })

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
    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const provider = await this.getProvider()

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chain.id) }],
        })
        return chain
      } catch (error) {
        // Indicates chain is not added to provider
        if ((error as ProviderRpcError).code === 4902) {
          try {
            let blockExplorerUrls: string[] | undefined
            if (addEthereumChainParameter?.blockExplorerUrls)
              blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls
            else
              blockExplorerUrls = chain.blockExplorers?.default.url
                ? [chain.blockExplorers?.default.url]
                : []

            let rpcUrls: readonly string[]
            if (addEthereumChainParameter?.rpcUrls?.length)
              rpcUrls = addEthereumChainParameter.rpcUrls
            else rpcUrls = [chain.rpcUrls.default?.http[0] ?? '']

            const addEthereumChain = {
              blockExplorerUrls,
              chainId: numberToHex(chainId),
              chainName: addEthereumChainParameter?.chainName ?? chain.name,
              iconUrls: addEthereumChainParameter?.iconUrls,
              nativeCurrency:
                addEthereumChainParameter?.nativeCurrency ??
                chain.nativeCurrency,
              rpcUrls,
            } satisfies AddEthereumChainParameter

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [addEthereumChain],
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
      if (accounts.length === 0) this.onDisconnect()
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
      if (accountsChanged) {
        provider.removeListener('accountsChanged', accountsChanged)
        accountsChanged = undefined
      }
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect)
        disconnect = undefined
      }
    },
  }))
}
