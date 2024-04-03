import {
  ChainNotConfiguredError,
  ProviderNotFoundError,
  createConnector,
} from '@wagmi/core'
import {
  type Evaluate,
  type ExactPartial,
  type Omit,
} from '@wagmi/core/internal'
import type { EthereumProvider } from '@walletconnect/ethereum-provider'
import {
  type Address,
  type ProviderConnectInfo,
  type ProviderRpcError,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

type EthereumProviderOptions = Parameters<typeof EthereumProvider['init']>[0]

export type WalletConnectParameters = Evaluate<
  Omit<
    EthereumProviderOptions,
    | 'chains'
    | 'events'
    | 'optionalChains'
    | 'optionalEvents'
    | 'optionalMethods'
    | 'methods'
    | 'rpcMap'
    | 'showQrModal'
  > &
    ExactPartial<Pick<EthereumProviderOptions, 'showQrModal'>>
>

walletConnect.type = 'walletConnect' as const
export function walletConnect(parameters: WalletConnectParameters) {
  type Provider = Awaited<ReturnType<typeof EthereumProvider['init']>>
  type Authenticate = Provider['authenticate']
  type Properties = {
    connect(parameters?: { chainId?: number; pairingTopic?: string }): Promise<{
      accounts: readonly Address[]
      chainId: number
    }>
    onConnect(connectInfo: ProviderConnectInfo): void
    onDisplayUri(uri: string): void
    onSessionDelete(data: { topic: string }): void
    authenticate(...params: Parameters<Authenticate>): ReturnType<Authenticate>
  }

  let provider_: Provider | undefined
  let providerPromise: Promise<typeof provider_>

  return createConnector<Provider, Properties>((config) => ({
    id: 'walletConnect',
    name: 'WalletConnect',
    type: walletConnect.type,
    async setup() {
      const provider = await this.getProvider().catch(() => null)
      if (!provider) return
      provider.on('connect', this.onConnect.bind(this))
      provider.on('session_delete', this.onSessionDelete.bind(this))
    },
    async authenticate(params) {
      const provider = await this.getProvider()

      return provider.authenticate(params)
    },
    async connect({ chainId, ...rest } = {}) {
      try {
        const provider = await this.getProvider()
        if (!provider) throw new ProviderNotFoundError()
        provider.on('display_uri', this.onDisplayUri)

        let targetChainId = chainId
        if (!targetChainId) {
          const state = (await config.storage?.getItem('state')) ?? {}
          const isChainSupported = config.chains.some(
            (x) => x.id === state.chainId,
          )
          if (isChainSupported) targetChainId = state.chainId
          else targetChainId = config.chains[0]?.id
        }
        if (!targetChainId) throw new Error('No chains found on connector.')

        // If there isn't an active session or chains are stale, connect.
        if (!provider.session) {
          const optionalChains = config.chains
            .filter((chain) => chain.id !== targetChainId)
            .map((optionalChain) => optionalChain.id)
          await provider.connect({
            optionalChains: [targetChainId, ...optionalChains],
            ...('pairingTopic' in rest
              ? { pairingTopic: rest.pairingTopic }
              : {}),
          })
        }

        // If session exists and chains are authorized, enable provider for required chain
        const accounts = (await provider.enable()).map((x) => getAddress(x))
        const currentChainId = await this.getChainId()

        provider.removeListener('display_uri', this.onDisplayUri)
        provider.removeListener('connect', this.onConnect.bind(this))
        provider.on('accountsChanged', this.onAccountsChanged.bind(this))
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect.bind(this))
        provider.on('session_delete', this.onSessionDelete.bind(this))

        return { accounts, chainId: currentChainId }
      } catch (error) {
        if (
          /(user rejected|connection request reset)/i.test(
            (error as ProviderRpcError)?.message,
          )
        ) {
          throw new UserRejectedRequestError(error as Error)
        }
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()
      try {
        await provider?.disconnect()
      } catch (error) {
        if (!/No matching key/i.test((error as Error).message)) throw error
      } finally {
        provider?.removeListener(
          'accountsChanged',
          this.onAccountsChanged.bind(this),
        )
        provider?.removeListener('chainChanged', this.onChainChanged)
        provider?.removeListener('disconnect', this.onDisconnect.bind(this))
        provider?.removeListener(
          'session_delete',
          this.onSessionDelete.bind(this),
        )
        provider?.on('connect', this.onConnect.bind(this))
      }
    },
    async getAccounts() {
      const provider = await this.getProvider()
      return provider.accounts.map((x) => getAddress(x))
    },
    async getProvider({ chainId } = {}) {
      async function initProvider() {
        const optionalChains = config.chains.map((x) => x.id) as [number]
        if (!optionalChains.length) return
        const { EthereumProvider } = await import(
          '@walletconnect/ethereum-provider'
        )
        return await EthereumProvider.init({
          ...parameters,
          disableProviderPing: true,
          optionalChains,
          projectId: parameters.projectId,
          rpcMap: Object.fromEntries(
            config.chains.map((chain) => [
              chain.id,
              chain.rpcUrls.default.http[0]!,
            ]),
          ),
          showQrModal: parameters.showQrModal ?? true,
        })
      }

      if (!provider_) {
        if (!providerPromise) providerPromise = initProvider()
        provider_ = await providerPromise
        provider_?.events.setMaxListeners(Infinity)
      }
      if (chainId) await this.switchChain?.({ chainId })
      return provider_!
    },
    async getChainId() {
      const provider = await this.getProvider()
      return provider.chainId
    },
    async isAuthorized() {
      try {
        // If an account does not exist on the session, then the connector is unauthorized.
        const accounts = await this.getAccounts()
        if (!accounts.length) return false

        return true
      } catch {
        return false
      }
    },
    async switchChain({ chainId }) {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()

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
            let blockExplorerUrls
            if (blockExplorer)
              blockExplorerUrls = [
                blockExplorer.url,
                ...Object.values(blockExplorers).map((x) => x.url),
              ]

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: numberToHex(chainId),
                  chainName: chain.name,
                  nativeCurrency: chain.nativeCurrency,
                  rpcUrls: [chain.rpcUrls.default?.http[0] ?? ''],
                  blockExplorerUrls,
                },
              ],
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
    async onConnect(connectInfo) {
      const chainId = Number(connectInfo.chainId)
      const accounts = await this.getAccounts()
      config.emitter.emit('connect', { accounts, chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
      provider.removeListener(
        'accountsChanged',
        this.onAccountsChanged.bind(this),
      )
      provider.removeListener('chainChanged', this.onChainChanged)
      provider.removeListener('disconnect', this.onDisconnect.bind(this))
      provider.removeListener('session_delete', this.onSessionDelete.bind(this))
      provider.on('connect', this.onConnect.bind(this))
    },
    onDisplayUri(uri) {
      config.emitter.emit('message', { type: 'display_uri', data: uri })
    },
    onSessionDelete() {
      this.onDisconnect()
    },
  }))
}
