import type { EthereumProvider } from '@ledgerhq/connect-kit/dist/umd/index.d.ts'
import { type EthereumProviderOptions } from '@walletconnect/ethereum-provider'

import { createConnector, normalizeChainId } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

type LedgerConnectorWcV2Options = {
  enableDebugLogs?: boolean
  walletConnectVersion?: 2
  projectId?: EthereumProviderOptions['projectId']
  requiredChains?: number[]
  requiredMethods?: string[]
  optionalMethods?: string[]
  requiredEvents?: string[]
  optionalEvents?: string[]
}

export type LedgerParameters = Evaluate<
  LedgerConnectorWcV2Options & {
    enableDebugLogs?: boolean
    /**
     Target chain to connect to.
     */
    chainId?: number | undefined
  }
>

ledger.type = 'ledger' as const
export function ledger(parameters: LedgerParameters) {
  type Provider = EthereumProvider
  type Properties = {
    createProvider: any
    initProvider: any
    setupListeners: any
    removeListeners: any
  }

  let provider_: Provider | undefined
  let initProviderPromise: Promise<void>
  const enableDebugLogs = parameters.enableDebugLogs ?? false

  return createConnector<Provider, Properties>((config) => ({
    id: 'ledger',
    name: 'Ledger',
    type: ledger.type,
    async connect({ chainId }: { chainId?: number } = {}) {
      try {
        const provider = await this.getProvider()
        this.setupListeners()

        // Don't request accounts if we have a session, like when reloading with
        // an active WC v2 session
        if (!provider.session) {
          config.emitter.emit('message', { type: 'connecting' })

          await provider.request({
            method: 'eth_requestAccounts',
          })
        }

        const accounts = await this.getAccounts()
        let id = await this.getChainId()

        if (chainId && id !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch(() => ({
            id,
          }))
          id = chain.id
        }

        return {
          accounts,
          chainId: id,
          provider,
        }
      } catch (error) {
        console.error(error)
        if (/user rejected/i.test((error as ProviderRpcError)?.message)) {
          throw new UserRejectedRequestError(error as Error)
        }
        throw error
      }
    },

    async disconnect() {
      const provider = await this.getProvider()
      try {
        if (provider?.disconnect) await provider.disconnect()
      } catch (error) {
        if (!/No matching key/i.test((error as Error).message)) throw error
      } finally {
        this.removeListeners()
      }
    },

    async getAccounts() {
      const provider = await this.getProvider()
      const accounts = (await provider.request({
        method: 'eth_accounts',
      })) as string[]
      return accounts.map(getAddress)
    },

    async getChainId() {
      const provider = await this.getProvider()
      const chainId = (await provider.request({
        method: 'eth_chainId',
      })) as number

      return normalizeChainId(chainId)
    },

    async getProvider({ chainId } = {}) {
      if (!provider_) {
        await this.createProvider()
      }

      if (chainId) await this.switchChain?.({ chainId })
      return provider_!
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
      if (!chain)
        throw new SwitchChainError(new Error('chain not found on connector.'))

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
        if (/user rejected request/i.test(message)) {
          throw new UserRejectedRequestError(error as Error)
        }
        throw new SwitchChainError(error as Error)
      }
    },
    async createProvider() {
      if (!initProviderPromise && typeof window !== 'undefined') {
        initProviderPromise = this.initProvider()
      }
      return initProviderPromise
    },
    async initProvider() {
      const connectKit = await import('@ledgerhq/connect-kit/dist/umd')

      if (enableDebugLogs) {
        connectKit.enableDebugLogs()
      }

      const {
        projectId,
        requiredChains,
        requiredMethods,
        optionalMethods,
        requiredEvents,
        optionalEvents,
      } = parameters as LedgerConnectorWcV2Options
      const optionalChains = config.chains.map(({ id }) => id)

      const checkSupportOptions = {
        providerType: connectKit.SupportedProviders.Ethereum,
        walletConnectVersion: 2,
        projectId,
        chains: requiredChains,
        optionalChains,
        methods: requiredMethods,
        optionalMethods,
        events: requiredEvents,
        optionalEvents,
        rpcMap: Object.fromEntries(
          config.chains.map((chain) => [
            chain.id,
            chain.rpcUrls.default.http[0]!,
          ]),
        ),
      }
      connectKit.checkSupport(checkSupportOptions)

      provider_ =
        (await connectKit.getProvider()) as unknown as EthereumProvider
    },
    setupListeners() {
      if (!provider_) return
      this.removeListeners()
      provider_.on('accountsChanged', this.onAccountsChanged)
      provider_.on('chainChanged', this.onChainChanged)
      provider_.on('disconnect', this.onDisconnect)
      provider_.on('session_delete', this.onDisconnect)
      provider_.on('connect', this.onConnect?.bind(this))
    },
    removeListeners() {
      if (!provider_) return
      provider_.removeListener('accountsChanged', this.onAccountsChanged)
      provider_.removeListener('chainChanged', this.onChainChanged)
      provider_.removeListener('disconnect', this.onDisconnect)
      provider_.removeListener('session_delete', this.onDisconnect)
      provider_.removeListener('connect', this.onConnect?.bind(this))
    },
    onAccountsChanged(accounts: string[]) {
      if (accounts.length === 0) config.emitter.emit('disconnect')
      else config.emitter.emit('change', { accounts: accounts.map(getAddress) })
    },
    onChainChanged(chainId: number | string) {
      const id = normalizeChainId(chainId)
      config.emitter.emit('change', { chainId: id })
    },
    onDisconnect() {
      config.emitter.emit('disconnect')
    },
    async onConnect() {
      const accounts = await this.getAccounts()
      const chainId = await this.getChainId()
      config.emitter.emit('connect', { accounts, chainId })
    },
  }))
}
