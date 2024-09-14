import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
} from '@wagmi/core'

import type { WalletTgSdk } from '@uxuycom/web3-tg-sdk'

import type { EventEmitter } from 'eventemitter3'

export type UxuyWalletParameters = {
  appLogoUrl: string | null | undefined;
  appName: string | null | undefined;
}

import {
  type AddEthereumChainParameter,
  type Hex,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

declare const mapping: {
  readonly handshake: readonly ['eth_requestAccounts']
  readonly sign: readonly [
    'eth_ecRecover',
    'personal_sign',
    'personal_ecRecover',
    'eth_signTransaction',
    'eth_sendTransaction',
    'eth_signTypedData_v1',
    'eth_signTypedData_v3',
    'eth_signTypedData_v4',
    'eth_signTypedData',
    'wallet_addEthereumChain',
    'wallet_switchEthereumChain',
    'wallet_watchAsset',
    'wallet_getCapabilities',
    'wallet_sendCalls',
    'wallet_showCallsStatus',
  ]
  readonly state: readonly [
    'eth_chainId',
    'eth_accounts',
    'eth_coinbase',
    'net_version',
  ]
  readonly deprecated: readonly ['eth_sign', 'eth_signTypedData_v2']
  readonly unsupported: readonly ['eth_subscribe', 'eth_unsubscribe']
  readonly fetch: readonly []
}

type MethodCategory = keyof typeof mapping

type Method<C extends MethodCategory = MethodCategory> =
  (typeof mapping)[C][number]

interface RequestArguments {
  readonly method: Method | string
  readonly params?: readonly unknown[] | object
}

interface ProviderConnectInfo {
  readonly chainId: string
}

export interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

interface ProviderMessage {
  type: string
  data: unknown
}

interface ProviderInterface extends EventEmitter {
  request<T>(args: RequestArguments): Promise<T>
  disconnect(): void
  on(event: 'connect', listener: (info: ProviderConnectInfo) => void): this
  on(event: 'disconnect', listener: (error: ProviderRpcError) => void): this
  on(event: 'chainChanged', listener: (chainId: string) => void): this
  on(event: 'accountsChanged', listener: (accounts: string[]) => void): this
  on(event: 'message', listener: (message: ProviderMessage) => void): this
}

export function uxuyWallet(parameters: UxuyWalletParameters = {}) {
  let sdk: WalletTgSdk | undefined

  type Provider = ProviderInterface & {
    // for backwards compatibility
    close?(): void
  }
  let walletProvider: Provider | undefined

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let chainChanged: Connector['onChainChanged'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider>((config) => ({
    id: 'uxuyWallet',
    name: 'Uxuy Wallet',
    type: 'injected',

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
      // Implement get chain ID logic here
      const provider = await this.getProvider()
      const chainId = await provider.request<Hex>({
        method: 'eth_chainId',
      })
      return Number(chainId)
    },
    async getProvider() {
      if (!walletProvider) {
        const { WalletTgSdk } = await (async () => {
          const { default: SDK } = await import('@uxuycom/web3-tg-sdk')

          if (typeof SDK !== 'function' && typeof SDK.default === 'function') {
            return SDK.default
          }

          return SDK as unknown as typeof SDK.default
        })()
        sdk = new WalletTgSdk({
          ...parameters,
        })

        walletProvider = sdk.ethereum
        return sdk.ethereum
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
