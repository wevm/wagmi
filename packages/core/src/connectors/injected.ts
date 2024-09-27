import {
  type AddEthereumChainParameter,
  type Address,
  type EIP1193Provider,
  type ProviderConnectInfo,
  type ProviderRpcError,
  ResourceUnavailableRpcError,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
  withRetry,
  withTimeout,
} from 'viem'

import type { Connector } from '../createConfig.js'
import { ChainNotConfiguredError } from '../errors/config.js'
import { ProviderNotFoundError } from '../errors/connector.js'
import type { Compute } from '../types/utils.js'
import { createConnector } from './createConnector.js'

export type InjectedParameters = {
  /**
   * Some injected providers do not support programmatic disconnect.
   * This flag simulates the disconnect behavior by keeping track of connection status in storage.
   * @default true
   */
  shimDisconnect?: boolean | undefined
  /**
   * [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) Ethereum Provider to target
   */
  target?: TargetId | Target | (() => Target | undefined) | undefined
  unstable_shimAsyncInject?: boolean | number | undefined
}

// Regex of wallets/providers that can accurately simulate contract calls & display contract revert reasons.
const supportsSimulationIdRegex = /(rabby|trustwallet)/

const targetMap = {
  coinbaseWallet: {
    id: 'coinbaseWallet',
    name: 'Coinbase Wallet',
    provider(window) {
      if (window?.coinbaseWalletExtension) return window.coinbaseWalletExtension
      return findProvider(window, 'isCoinbaseWallet')
    },
  },
  metaMask: {
    id: 'metaMask',
    name: 'MetaMask',
    provider(window) {
      return findProvider(window, (provider) => {
        if (!provider.isMetaMask) return false
        // Brave tries to make itself look like MetaMask
        // Could also try RPC `web3_clientVersion` if following is unreliable
        if (provider.isBraveWallet && !provider._events && !provider._state)
          return false
        // Other wallets that try to look like MetaMask
        const flags: WalletProviderFlags[] = [
          'isApexWallet',
          'isAvalanche',
          'isBitKeep',
          'isBlockWallet',
          'isKuCoinWallet',
          'isMathWallet',
          'isOkxWallet',
          'isOKExWallet',
          'isOneInchIOSWallet',
          'isOneInchAndroidWallet',
          'isOpera',
          'isPortal',
          'isRabby',
          'isTokenPocket',
          'isTokenary',
          'isZerion',
        ]
        for (const flag of flags) if (provider[flag]) return false
        return true
      })
    },
  },
  phantom: {
    id: 'phantom',
    name: 'Phantom',
    provider(window) {
      if (window?.phantom?.ethereum) return window.phantom?.ethereum
      return findProvider(window, 'isPhantom')
    },
  },
} as const satisfies TargetMap

injected.type = 'injected' as const
export function injected(parameters: InjectedParameters = {}) {
  const { shimDisconnect = true, unstable_shimAsyncInject } = parameters

  function getTarget(): Compute<Target & { id: string }> {
    const target = parameters.target
    if (typeof target === 'function') {
      const result = target()
      if (result) return result
    }

    if (typeof target === 'object') return target

    if (typeof target === 'string')
      return {
        ...(targetMap[target as keyof typeof targetMap] ?? {
          id: target,
          name: `${target[0]!.toUpperCase()}${target.slice(1)}`,
          provider: `is${target[0]!.toUpperCase()}${target.slice(1)}`,
        }),
      }

    return {
      id: 'injected',
      name: 'Injected',
      provider(window) {
        return window?.ethereum
      },
    }
  }

  type Provider = WalletProvider | undefined
  type Properties = {
    onConnect(connectInfo: ProviderConnectInfo): void
  }
  type StorageItem = {
    [_ in 'injected.connected' | `${string}.disconnected`]: true
  }

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let chainChanged: Connector['onChainChanged'] | undefined
  let connect: Connector['onConnect'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    get icon() {
      return getTarget().icon
    },
    get id() {
      return getTarget().id
    },
    get name() {
      return getTarget().name
    },
    get supportsSimulation() {
      return supportsSimulationIdRegex.test(this.id.toLowerCase())
    },
    type: injected.type,
    async setup() {
      const provider = await this.getProvider()
      // Only start listening for events if `target` is set, otherwise `injected()` will also receive events
      if (provider?.on && parameters.target) {
        if (!connect) {
          connect = this.onConnect.bind(this)
          provider.on('connect', connect)
        }

        // We shouldn't need to listen for `'accountsChanged'` here since the `'connect'` event should suffice (and wallet shouldn't be connected yet).
        // Some wallets, like MetaMask, do not implement the `'connect'` event and overload `'accountsChanged'` instead.
        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this)
          provider.on('accountsChanged', accountsChanged)
        }
      }
    },
    async connect({ chainId, isReconnecting } = {}) {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()

      let accounts: readonly Address[] = []
      if (isReconnecting) accounts = await this.getAccounts().catch(() => [])
      else if (shimDisconnect) {
        // Attempt to show another prompt for selecting account if `shimDisconnect` flag is enabled
        try {
          const permissions = await provider.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          })
          accounts = (permissions[0]?.caveats?.[0]?.value as string[])?.map(
            (x) => getAddress(x),
          )
          // `'wallet_requestPermissions'` can return a different order of accounts than `'eth_accounts'`
          // switch to `'eth_accounts'` ordering if more than one account is connected
          // https://github.com/wevm/wagmi/issues/4140
          if (accounts.length > 0) {
            const sortedAccounts = await this.getAccounts()
            accounts = sortedAccounts
          }
        } catch (err) {
          const error = err as RpcError
          // Not all injected providers support `wallet_requestPermissions` (e.g. MetaMask iOS).
          // Only bubble up error if user rejects request
          if (error.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(error)
          // Or prompt is already open
          if (error.code === ResourceUnavailableRpcError.code) throw error
        }
      }

      try {
        if (!accounts?.length && !isReconnecting) {
          const requestedAccounts = await provider.request({
            method: 'eth_requestAccounts',
          })
          accounts = requestedAccounts.map((x) => getAddress(x))
        }

        // Manage EIP-1193 event listeners
        // https://eips.ethereum.org/EIPS/eip-1193#events
        if (connect) {
          provider.removeListener('connect', connect)
          connect = undefined
        }
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

        // Remove disconnected shim if it exists
        if (shimDisconnect)
          await config.storage?.removeItem(`${this.id}.disconnected`)

        // Add connected shim if no target exists
        if (!parameters.target)
          await config.storage?.setItem('injected.connected', true)

        return { accounts, chainId: currentChainId }
      } catch (err) {
        const error = err as RpcError
        if (error.code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error)
        if (error.code === ResourceUnavailableRpcError.code)
          throw new ResourceUnavailableRpcError(error)
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()

      // Manage EIP-1193 event listeners
      if (chainChanged) {
        provider.removeListener('chainChanged', chainChanged)
        chainChanged = undefined
      }
      if (disconnect) {
        provider.removeListener('disconnect', disconnect)
        disconnect = undefined
      }
      if (!connect) {
        connect = this.onConnect.bind(this)
        provider.on('connect', connect)
      }

      // Experimental support for MetaMask disconnect
      // https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-2.md
      try {
        // Adding timeout as not all wallets support this method and can hang
        // https://github.com/wevm/wagmi/issues/4064
        await withTimeout(
          () =>
            // TODO: Remove explicit type for viem@3
            provider.request<{
              Method: 'wallet_revokePermissions'
              Parameters: [permissions: { eth_accounts: Record<string, any> }]
              ReturnType: null
            }>({
              // `'wallet_revokePermissions'` added in `viem@2.10.3`
              method: 'wallet_revokePermissions',
              params: [{ eth_accounts: {} }],
            }),
          { timeout: 100 },
        )
      } catch {}

      // Add shim signalling connector is disconnected
      if (shimDisconnect) {
        await config.storage?.setItem(`${this.id}.disconnected`, true)
      }

      if (!parameters.target)
        await config.storage?.removeItem('injected.connected')
    },
    async getAccounts() {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()
      const accounts = await provider.request({ method: 'eth_accounts' })
      return accounts.map((x) => getAddress(x))
    },
    async getChainId() {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()
      const hexChainId = await provider.request({ method: 'eth_chainId' })
      return Number(hexChainId)
    },
    async getProvider() {
      if (typeof window === 'undefined') return undefined

      let provider: Provider
      const target = getTarget()
      if (typeof target.provider === 'function')
        provider = target.provider(window as Window | undefined)
      else if (typeof target.provider === 'string')
        provider = findProvider(window, target.provider)
      else provider = target.provider

      // Some wallets do not conform to EIP-1193 (e.g. Trust Wallet)
      // https://github.com/wevm/wagmi/issues/3526#issuecomment-1912683002
      if (provider && !provider.removeListener) {
        // Try using `off` handler if it exists, otherwise noop
        if ('off' in provider && typeof provider.off === 'function')
          provider.removeListener =
            provider.off as typeof provider.removeListener
        else provider.removeListener = () => {}
      }

      return provider
    },
    async isAuthorized() {
      try {
        const isDisconnected =
          shimDisconnect &&
          // If shim exists in storage, connector is disconnected
          (await config.storage?.getItem(`${this.id}.disconnected`))
        if (isDisconnected) return false

        // Don't allow injected connector to connect if no target is set and it hasn't already connected
        // (e.g. flag in storage is not set). This prevents a targetless injected connector from connecting
        // automatically whenever there is a targeted connector configured.
        if (!parameters.target) {
          const connected = await config.storage?.getItem('injected.connected')
          if (!connected) return false
        }

        const provider = await this.getProvider()
        if (!provider) {
          if (
            unstable_shimAsyncInject !== undefined &&
            unstable_shimAsyncInject !== false
          ) {
            // If no provider is found, check for async injection
            // https://github.com/wevm/references/issues/167
            // https://github.com/MetaMask/detect-provider
            const handleEthereum = async () => {
              if (typeof window !== 'undefined')
                window.removeEventListener(
                  'ethereum#initialized',
                  handleEthereum,
                )
              const provider = await this.getProvider()
              return !!provider
            }
            const timeout =
              typeof unstable_shimAsyncInject === 'number'
                ? unstable_shimAsyncInject
                : 1_000
            const res = await Promise.race([
              ...(typeof window !== 'undefined'
                ? [
                    new Promise<boolean>((resolve) =>
                      window.addEventListener(
                        'ethereum#initialized',
                        () => resolve(handleEthereum()),
                        { once: true },
                      ),
                    ),
                  ]
                : []),
              new Promise<boolean>((resolve) =>
                setTimeout(() => resolve(handleEthereum()), timeout),
              ),
            ])
            if (res) return true
          }

          throw new ProviderNotFoundError()
        }

        // Use retry strategy as some injected wallets (e.g. MetaMask) fail to
        // immediately resolve JSON-RPC requests on page load.
        const accounts = await withRetry(() => this.getAccounts())
        return !!accounts.length
      } catch {
        return false
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()

      const chain = config.chains.find((x) => x.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      try {
        await Promise.all([
          provider
            .request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: numberToHex(chainId) }],
            })
            // During `'wallet_switchEthereumChain'`, MetaMask makes a `'net_version'` RPC call to the target chain.
            // If this request fails, MetaMask does not emit the `'chainChanged'` event, but will still switch the chain.
            // To counter this behavior, we request and emit the current chain ID to confirm the chain switch either via
            // this callback or an externally emitted `'chainChanged'` event.
            // https://github.com/MetaMask/metamask-extension/issues/24247
            .then(async () => {
              const currentChainId = await this.getChainId()
              if (currentChainId === chainId)
                config.emitter.emit('change', { chainId })
            }),
          new Promise<void>((resolve) => {
            const listener = ((data) => {
              if ('chainId' in data && data.chainId === chainId) {
                config.emitter.off('change', listener)
                resolve()
              }
            }) satisfies Parameters<typeof config.emitter.on>[1]
            config.emitter.on('change', listener)
          }),
        ])
        return chain
      } catch (err) {
        const error = err as RpcError

        // Indicates chain is not added to provider
        if (
          error.code === 4902 ||
          // Unwrapping for MetaMask Mobile
          // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
          (error as ProviderRpcError<{ originalError?: { code: number } }>)
            ?.data?.originalError?.code === 4902
        ) {
          try {
            const { default: blockExplorer, ...blockExplorers } =
              chain.blockExplorers ?? {}
            let blockExplorerUrls: string[] | undefined
            if (addEthereumChainParameter?.blockExplorerUrls)
              blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls
            else if (blockExplorer)
              blockExplorerUrls = [
                blockExplorer.url,
                ...Object.values(blockExplorers).map((x) => x.url),
              ]

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

            const currentChainId = await this.getChainId()
            if (currentChainId !== chainId)
              throw new UserRejectedRequestError(
                new Error('User rejected switch after adding network.'),
              )

            return chain
          } catch (error) {
            throw new UserRejectedRequestError(error as Error)
          }
        }

        if (error.code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error)
        throw new SwitchChainError(error)
      }
    },
    async onAccountsChanged(accounts) {
      // Disconnect if there are no accounts
      if (accounts.length === 0) this.onDisconnect()
      // Connect if emitter is listening for connect event (e.g. is disconnected and connects through wallet interface)
      else if (config.emitter.listenerCount('connect')) {
        const chainId = (await this.getChainId()).toString()
        this.onConnect({ chainId })
        // Remove disconnected shim if it exists
        if (shimDisconnect)
          await config.storage?.removeItem(`${this.id}.disconnected`)
      }
      // Regular change event
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onConnect(connectInfo) {
      const accounts = await this.getAccounts()
      if (accounts.length === 0) return

      const chainId = Number(connectInfo.chainId)
      config.emitter.emit('connect', { accounts, chainId })

      // Manage EIP-1193 event listeners
      const provider = await this.getProvider()
      if (provider) {
        if (connect) {
          provider.removeListener('connect', connect)
          connect = undefined
        }
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
      }
    },
    async onDisconnect(error) {
      const provider = await this.getProvider()

      // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
      // https://github.com/MetaMask/providers/pull/120
      if (error && (error as RpcError<1013>).code === 1013) {
        if (provider && !!(await this.getAccounts()).length) return
      }

      // No need to remove `${this.id}.disconnected` from storage because `onDisconnect` is typically
      // only called when the wallet is disconnected through the wallet's interface, meaning the wallet
      // actually disconnected and we don't need to simulate it.
      config.emitter.emit('disconnect')

      // Manage EIP-1193 event listeners
      if (provider) {
        if (chainChanged) {
          provider.removeListener('chainChanged', chainChanged)
          chainChanged = undefined
        }
        if (disconnect) {
          provider.removeListener('disconnect', disconnect)
          disconnect = undefined
        }
        if (!connect) {
          connect = this.onConnect.bind(this)
          provider.on('connect', connect)
        }
      }
    },
  }))
}

type Target = {
  icon?: string | undefined
  id: string
  name: string
  provider:
    | WalletProviderFlags
    | WalletProvider
    | ((window?: Window | undefined) => WalletProvider | undefined)
}

/** @deprecated */
type TargetId = Compute<WalletProviderFlags> extends `is${infer name}`
  ? name extends `${infer char}${infer rest}`
    ? `${Lowercase<char>}${rest}`
    : never
  : never

type TargetMap = { [_ in TargetId]?: Target | undefined }

/** @deprecated */
type WalletProviderFlags =
  | 'isApexWallet'
  | 'isAvalanche'
  | 'isBackpack'
  | 'isBifrost'
  | 'isBitKeep'
  | 'isBitski'
  | 'isBlockWallet'
  | 'isBraveWallet'
  | 'isCoinbaseWallet'
  | 'isDawn'
  | 'isEnkrypt'
  | 'isExodus'
  | 'isFrame'
  | 'isFrontier'
  | 'isGamestop'
  | 'isHyperPay'
  | 'isImToken'
  | 'isKuCoinWallet'
  | 'isMathWallet'
  | 'isMetaMask'
  | 'isOkxWallet'
  | 'isOKExWallet'
  | 'isOneInchAndroidWallet'
  | 'isOneInchIOSWallet'
  | 'isOpera'
  | 'isPhantom'
  | 'isPortal'
  | 'isRabby'
  | 'isRainbow'
  | 'isStatus'
  | 'isTally'
  | 'isTokenPocket'
  | 'isTokenary'
  | 'isTrust'
  | 'isTrustWallet'
  | 'isXDEFI'
  | 'isZerion'

type WalletProvider = Compute<
  EIP1193Provider & {
    [key in WalletProviderFlags]?: true | undefined
  } & {
    providers?: WalletProvider[] | undefined
    /** Only exists in MetaMask as of 2022/04/03 */
    _events?: { connect?: (() => void) | undefined } | undefined
    /** Only exists in MetaMask as of 2022/04/03 */
    _state?:
      | {
          accounts?: string[]
          initialized?: boolean
          isConnected?: boolean
          isPermanentlyDisconnected?: boolean
          isUnlocked?: boolean
        }
      | undefined
  }
>

type Window = {
  coinbaseWalletExtension?: WalletProvider | undefined
  ethereum?: WalletProvider | undefined
  phantom?: { ethereum: WalletProvider } | undefined
}

function findProvider(
  window: globalThis.Window | Window | undefined,
  select?: WalletProviderFlags | ((provider: WalletProvider) => boolean),
) {
  function isProvider(provider: WalletProvider) {
    if (typeof select === 'function') return select(provider)
    if (typeof select === 'string') return provider[select]
    return true
  }

  const ethereum = (window as Window).ethereum
  if (ethereum?.providers)
    return ethereum.providers.find((provider) => isProvider(provider))
  if (ethereum && isProvider(ethereum)) return ethereum
  return undefined
}
