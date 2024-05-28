import type {
  MetaMaskSDK,
  MetaMaskSDKOptions,
  SDKProvider,
} from '@metamask/sdk'
import { ChainNotConfiguredError, createConnector } from '@wagmi/core'
import type { Evaluate, ExactPartial } from '@wagmi/core/internal'
import {
  type AddEthereumChainParameter,
  type Address,
  type ProviderConnectInfo,
  type ProviderRpcError,
  ResourceUnavailableRpcError,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

export type MetaMaskParameters = Evaluate<
  ExactPartial<Omit<MetaMaskSDKOptions, '_source' | 'readonlyRPCMap'>>
>

metaMask.type = 'metaMask' as const
export function metaMask(parameters: MetaMaskParameters = {}) {
  type Provider = SDKProvider
  type Properties = {
    onConnect(connectInfo: ProviderConnectInfo): void
  }
  type StorageItem = { 'metaMaskSDK.disconnected': true }
  type Listener = Parameters<Provider['on']>[1]

  let sdk: MetaMaskSDK
  let provider: Provider | undefined
  let providerPromise: Promise<typeof provider>

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'metaMaskSDK',
    name: 'MetaMask',
    type: metaMask.type,
    async setup() {
      const provider = await this.getProvider()
      if (provider)
        provider.on('connect', this.onConnect.bind(this) as Listener)
    },
    async connect({ chainId, isReconnecting } = {}) {
      const provider = await this.getProvider()

      let accounts: readonly Address[] = []
      if (isReconnecting) accounts = await this.getAccounts().catch(() => [])

      try {
        if (!accounts?.length) {
          const requestedAccounts = (await sdk.connect()) as string[]
          accounts = requestedAccounts.map((x) => getAddress(x))
        }

        provider.removeListener(
          'connect',
          this.onConnect.bind(this) as Listener,
        )
        provider.on(
          'accountsChanged',
          this.onAccountsChanged.bind(this) as Listener,
        )
        provider.on('chainChanged', this.onChainChanged as Listener)
        provider.on('disconnect', this.onDisconnect.bind(this) as Listener)

        // Switch to chain if provided
        let currentChainId = (await this.getChainId()) as number
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error
            return { id: currentChainId }
          })
          currentChainId = chain?.id ?? currentChainId
        }

        await config.storage?.removeItem('metaMaskSDK.disconnected')

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

      provider.removeListener(
        'accountsChanged',
        this.onAccountsChanged.bind(this),
      )
      provider.removeListener('chainChanged', this.onChainChanged)
      provider.removeListener('disconnect', this.onDisconnect.bind(this))
      provider.on('connect', this.onConnect.bind(this) as Listener)

      sdk.terminate()

      // Add shim signalling connector is disconnected
      await config.storage?.setItem('metaMaskSDK.disconnected', true)
    },
    async getAccounts() {
      const provider = await this.getProvider()
      const accounts = (await provider.request({
        method: 'eth_accounts',
      })) as string[]
      return accounts.map((x) => getAddress(x))
    },
    async getChainId() {
      const provider = await this.getProvider()
      const chainId =
        provider.getChainId() ||
        (await provider?.request({ method: 'eth_chainId' }))
      return Number(chainId)
    },
    async getProvider() {
      async function initProvider() {
        // Unwrapping import for Vite compatibility.
        // See: https://github.com/vitejs/vite/issues/9703
        const { default: MetaMaskSDK_ } = await import('@metamask/sdk')
        const MetaMaskSDK = (() => {
          if (
            typeof MetaMaskSDK_ !== 'function' &&
            typeof MetaMaskSDK_.default === 'function'
          )
            return MetaMaskSDK_.default
          return MetaMaskSDK_ as unknown as typeof MetaMaskSDK_.default
        })()

        sdk = new MetaMaskSDK({
          dappMetadata: {},
          ...parameters,
          _source: 'wagmi',
          readonlyRPCMap: Object.fromEntries(
            config.chains.map((chain) => [
              chain.id,
              chain.rpcUrls.default.http[0]!,
            ]),
          ),
        })
        await sdk.init()
        return sdk.getProvider()!
      }

      if (!provider) {
        if (!providerPromise) providerPromise = initProvider()
        provider = await providerPromise
      }
      return provider!
    },
    async isAuthorized() {
      try {
        const isMobileBrowser =
          typeof navigator !== 'undefined'
            ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent,
              )
            : false

        // MetaMask Mobile doesn't support persisted sessions.
        if (isMobileBrowser) return false

        const isDisconnected =
          // If shim exists in storage, connector is disconnected
          await config.storage?.getItem('metaMaskSDK.disconnected')
        if (isDisconnected) return false

        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch {
        return false
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const provider = await this.getProvider()

      const chain = config.chains.find((x) => x.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      try {
        await Promise.all([
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: numberToHex(chainId) }],
          }),
          new Promise<void>((resolve) =>
            config.emitter.once('change', ({ chainId: currentChainId }) => {
              if (currentChainId === chainId) resolve()
            }),
          ),
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
        await config.storage?.removeItem('metaMaskSDK.disconnected')
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

      const provider = await this.getProvider()
      if (provider) {
        provider.removeListener('connect', this.onConnect.bind(this))
        provider.on('accountsChanged', this.onAccountsChanged.bind(this) as any)
        provider.on('chainChanged', this.onChainChanged as any)
        provider.on('disconnect', this.onDisconnect.bind(this) as any)
      }
    },
    async onDisconnect(error) {
      const provider = await this.getProvider()

      // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
      // https://github.com/MetaMask/providers/pull/120
      if (error && (error as RpcError<1013>).code === 1013) {
        if (provider && !!(await this.getAccounts()).length) return
      }

      // Remove cached SDK properties.
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('MMSDK_cached_address')
        localStorage.removeItem('MMSDK_cached_chainId')
      }

      // No need to remove 'metaMaskSDK.disconnected' from storage because `onDisconnect` is typically
      // only called when the wallet is disconnected through the wallet's interface, meaning the wallet
      // actually disconnected and we don't need to simulate it.
      config.emitter.emit('disconnect')

      provider.removeListener(
        'accountsChanged',
        this.onAccountsChanged.bind(this),
      )
      provider.removeListener('chainChanged', this.onChainChanged)
      provider.removeListener('disconnect', this.onDisconnect.bind(this))
      provider.on('connect', this.onConnect.bind(this) as any)
    },
  }))
}
