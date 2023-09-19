import {
  type EthereumProvider,
  SupportedProviders,
  loadConnectKit,
} from '@ledgerhq/connect-kit-loader'
import {
  ChainNotConfiguredError,
  createConnector,
  normalizeChainId,
} from '@wagmi/core'
import {
  type ProviderConnectInfo,
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

export type LedgerParameters = {
  enableDebugLogs?: boolean | undefined
  optionalEvents?: string[] | undefined
  optionalMethods?: string[] | undefined
  projectId?: string | undefined
  requiredChains?: number[] | undefined
  requiredEvents?: string[] | undefined
  requiredMethods?: string[] | undefined
}

export function ledger(parameters: LedgerParameters = {}) {
  type Provider = EthereumProvider
  type Properties = {
    onConnect(connectInfo: ProviderConnectInfo): void
    onSessionDelete(data: { topic: string }): void
  }

  let provider_: Provider | undefined
  let providerPromise: Promise<typeof provider_>

  return createConnector<Provider, Properties>((config) => ({
    id: 'ledger',
    name: 'Ledger',
    async setup() {
      const provider = await this.getProvider().catch(() => null)
      if (!provider) return
      provider.on('connect', this.onConnect.bind(this))
      provider.on('session_delete', this.onSessionDelete.bind(this))
    },
    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider()

        // TODO: Update this logic to be more stable (a la WalletConnect connector)
        // Don't request accounts if we have a session, like when reloading with
        // an active WC v2 session
        if (!provider.session)
          await provider.request({ method: 'eth_requestAccounts' })

        const accounts = await this.getAccounts()

        provider.removeListener('connect', this.onConnect.bind(this))
        provider.on('accountsChanged', this.onAccountsChanged.bind(this))
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect.bind(this))
        provider.on('session_delete', this.onSessionDelete.bind(this))

        // Switch to chain if provided
        let currentChainId = await this.getChainId()
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch(() => ({
            id: currentChainId,
          }))
          currentChainId = chain?.id ?? currentChainId
        }

        return { accounts, chainId: currentChainId }
      } catch (error) {
        if (/user rejected/i.test((error as ProviderRpcError)?.message))
          throw new UserRejectedRequestError(error as Error)
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()
      try {
        await provider?.disconnect?.().catch(() => {})
      } catch (error) {
        if (!/No matching key/i.test((error as Error).message)) throw error
      } finally {
        provider.removeListener(
          'accountsChanged',
          this.onAccountsChanged.bind(this),
        )
        provider.removeListener('chainChanged', this.onChainChanged)
        provider.removeListener('disconnect', this.onDisconnect.bind(this))
        provider.removeListener(
          'session_delete',
          this.onSessionDelete.bind(this),
        )
        provider.on('connect', this.onConnect.bind(this))
      }
    },
    async getAccounts() {
      const provider = await this.getProvider()
      return (await provider.request<string[]>({ method: 'eth_accounts' })).map(
        getAddress,
      )
    },
    async getProvider({ chainId } = {}) {
      async function initProvider() {
        const connectKit = await loadConnectKit()
        if (parameters.enableDebugLogs) connectKit.enableDebugLogs()

        const {
          optionalEvents,
          optionalMethods,
          projectId,
          requiredChains,
          requiredEvents,
          requiredMethods,
        } = parameters
        connectKit.checkSupport({
          chains: requiredChains,
          events: requiredEvents,
          methods: requiredMethods,
          optionalChains: config.chains.map(({ id }) => id),
          optionalEvents,
          optionalMethods,
          projectId,
          providerType: SupportedProviders.Ethereum,
          rpcMap: Object.fromEntries(
            config.chains.map((chain) => [
              chain.id,
              chain.rpcUrls.default.http[0]!,
            ]),
          ),
          walletConnectVersion: 2,
        })

        return connectKit.getProvider()
      }

      if (!provider_) {
        if (!providerPromise) providerPromise = initProvider()
        provider_ = await providerPromise
      }
      if (chainId) await this.switchChain!({ chainId })
      return provider_!
    },
    async getChainId() {
      const provider = await this.getProvider()
      const chainId = await provider.request({ method: 'eth_chainId' })
      return normalizeChainId(chainId)
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

      try {
        const provider = await this.getProvider()
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chainId) }],
        })
        return chain
      } catch (error) {
        const message =
          typeof error === 'string'
            ? error
            : (error as ProviderRpcError)?.message
        if (/user rejected request/i.test(message))
          throw new UserRejectedRequestError(error as Error)

        throw new SwitchChainError(error as Error)
      }
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) config.emitter.emit('disconnect')
      else config.emitter.emit('change', { accounts: accounts.map(getAddress) })
    },
    onChainChanged(chain) {
      const chainId = normalizeChainId(chain)
      config.emitter.emit('change', { chainId })
    },
    async onConnect(connectInfo) {
      const chainId = normalizeChainId(connectInfo.chainId)
      const accounts = await this.getAccounts()
      config.emitter.emit('connect', { accounts, chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
      provider.removeListener('accountsChanged', this.onAccountsChanged)
      provider.removeListener('chainChanged', this.onChainChanged)
      provider.removeListener('disconnect', this.onDisconnect.bind(this))
    },
    onSessionDelete() {
      this.onDisconnect()
    },
  }))
}
