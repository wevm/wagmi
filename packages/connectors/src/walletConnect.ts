import {
  ChainNotConfiguredError,
  type Connector,
  ProviderNotFoundError,
  createConnector,
  extractRpcUrls,
} from '@wagmi/core'
import type { Compute, ExactPartial, Omit } from '@wagmi/core/internal'
import type { EthereumProvider } from '@walletconnect/ethereum-provider'
import {
  type AddEthereumChainParameter,
  type Address,
  type ProviderConnectInfo,
  type ProviderRpcError,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

type WalletConnectConnector = Connector & {
  onDisplayUri(uri: string): void
  onSessionDelete(data: { topic: string }): void
}

type EthereumProviderOptions = Parameters<(typeof EthereumProvider)['init']>[0]

export type WalletConnectParameters = Compute<
  {
    /**
     * If a new chain is added to a previously existing configured connector `chains`, this flag
     * will determine if that chain should be considered as stale. A stale chain is a chain that
     * WalletConnect has yet to establish a relationship with (e.g. the user has not approved or
     * rejected the chain).
     *
     * This flag mainly affects the behavior when a wallet does not support dynamic chain authorization
     * with WalletConnect v2.
     *
     * If `true` (default), the new chain will be treated as a stale chain. If the user
     * has yet to establish a relationship (approved/rejected) with this chain in their WalletConnect
     * session, the connector will disconnect upon the dapp auto-connecting, and the user will have to
     * reconnect to the dapp (revalidate the chain) in order to approve the newly added chain.
     * This is the default behavior to avoid an unexpected error upon switching chains which may
     * be a confusing user experience (e.g. the user will not know they have to reconnect
     * unless the dapp handles these types of errors).
     *
     * If `false`, the new chain will be treated as a potentially valid chain. This means that if the user
     * has yet to establish a relationship with the chain in their WalletConnect session, wagmi will successfully
     * auto-connect the user. This comes with the trade-off that the connector will throw an error
     * when attempting to switch to the unapproved chain if the wallet does not support dynamic session updates.
     * This may be useful in cases where a dapp constantly
     * modifies their configured chains, and they do not want to disconnect the user upon
     * auto-connecting. If the user decides to switch to the unapproved chain, it is important that the
     * dapp handles this error and prompts the user to reconnect to the dapp in order to approve
     * the newly added chain.
     *
     * @default true
     */
    isNewChainsStale?: boolean
  } & Omit<
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
  const isNewChainsStale = parameters.isNewChainsStale ?? true

  type Provider = Awaited<ReturnType<(typeof EthereumProvider)['init']>>
  type Properties = {
    connect(parameters?: { chainId?: number; pairingTopic?: string }): Promise<{
      accounts: readonly Address[]
      chainId: number
    }>
    getNamespaceChainsIds(): number[]
    getRequestedChainsIds(): Promise<number[]>
    isChainsStale(): Promise<boolean>
    onConnect(connectInfo: ProviderConnectInfo): void
    onDisplayUri(uri: string): void
    onSessionDelete(data: { topic: string }): void
    setRequestedChainsIds(chains: number[]): void
    requestedChainsStorageKey: `${string}.requestedChains`
  }
  type StorageItem = {
    [_ in Properties['requestedChainsStorageKey']]: number[]
  }

  let provider_: Provider | undefined
  let providerPromise: Promise<typeof provider_>
  const NAMESPACE = 'eip155'

  let accountsChanged: WalletConnectConnector['onAccountsChanged'] | undefined
  let chainChanged: WalletConnectConnector['onChainChanged'] | undefined
  let connect: WalletConnectConnector['onConnect'] | undefined
  let displayUri: WalletConnectConnector['onDisplayUri'] | undefined
  let sessionDelete: WalletConnectConnector['onSessionDelete'] | undefined
  let disconnect: WalletConnectConnector['onDisconnect'] | undefined

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'walletConnect',
    name: 'WalletConnect',
    type: walletConnect.type,
    async setup() {
      const provider = await this.getProvider().catch(() => null)
      if (!provider) return
      if (!connect) {
        connect = this.onConnect.bind(this)
        provider.on('connect', connect)
      }
      if (!sessionDelete) {
        sessionDelete = this.onSessionDelete.bind(this)
        provider.on('session_delete', sessionDelete)
      }
    },
    async connect({ chainId, ...rest } = {}) {
      try {
        const provider = await this.getProvider()
        if (!provider) throw new ProviderNotFoundError()
        if (!displayUri) {
          displayUri = this.onDisplayUri
          provider.on('display_uri', displayUri)
        }

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

        const isChainsStale = await this.isChainsStale()
        // If there is an active session with stale chains, disconnect current session.
        if (provider.session && isChainsStale) await provider.disconnect()

        // If there isn't an active session or chains are stale, connect.
        if (!provider.session || isChainsStale) {
          const optionalChains = config.chains
            .filter((chain) => chain.id !== targetChainId)
            .map((optionalChain) => optionalChain.id)
          await provider.connect({
            optionalChains: [targetChainId, ...optionalChains],
            ...('pairingTopic' in rest
              ? { pairingTopic: rest.pairingTopic }
              : {}),
          })

          this.setRequestedChainsIds(config.chains.map((x) => x.id))
        }

        // If session exists and chains are authorized, enable provider for required chain
        const accounts = (await provider.enable()).map((x) => getAddress(x))
        const currentChainId = await this.getChainId()

        if (displayUri) {
          provider.removeListener('display_uri', displayUri)
          displayUri = undefined
        }
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
        if (!sessionDelete) {
          sessionDelete = this.onSessionDelete.bind(this)
          provider.on('session_delete', sessionDelete)
        }

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
        if (chainChanged) {
          provider?.removeListener('chainChanged', chainChanged)
          chainChanged = undefined
        }
        if (disconnect) {
          provider?.removeListener('disconnect', disconnect)
          disconnect = undefined
        }
        if (!connect) {
          connect = this.onConnect.bind(this)
          provider?.on('connect', connect)
        }
        if (accountsChanged) {
          provider?.removeListener('accountsChanged', accountsChanged)
          accountsChanged = undefined
        }
        if (sessionDelete) {
          provider?.removeListener('session_delete', sessionDelete)
          sessionDelete = undefined
        }

        this.setRequestedChainsIds([])
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
            config.chains.map((chain) => {
              const [url] = extractRpcUrls({
                chain,
                transports: config.transports,
              })
              return [chain.id, url]
            }),
          ),
          showQrModal: parameters.showQrModal ?? true,
        })
      }

      if (!provider_) {
        if (!providerPromise) providerPromise = initProvider()
        provider_ = await providerPromise
        provider_?.events.setMaxListeners(Number.POSITIVE_INFINITY)
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
        const [accounts, provider] = await Promise.all([
          this.getAccounts(),
          this.getProvider(),
        ])

        // If an account does not exist on the session, then the connector is unauthorized.
        if (!accounts.length) return false

        // If the chains are stale on the session, then the connector is unauthorized.
        const isChainsStale = await this.isChainsStale()
        if (isChainsStale && provider.session) {
          await provider.disconnect().catch(() => {})
          return false
        }
        return true
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
          new Promise<void>((resolve) => {
            const listener = ({
              chainId: currentChainId,
            }: { chainId?: number | undefined }) => {
              if (currentChainId === chainId) {
                config.emitter.off('change', listener)
                resolve()
              }
            }
            config.emitter.on('change', listener)
          }),
          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: numberToHex(chainId) }],
          }),
        ])

        const requestedChains = await this.getRequestedChainsIds()
        this.setRequestedChainsIds([...requestedChains, chainId])

        return chain
      } catch (err) {
        const error = err as RpcError

        if (/(user rejected)/i.test(error.message))
          throw new UserRejectedRequestError(error)

        // Indicates chain is not added to provider
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
          else rpcUrls = [...chain.rpcUrls.default.http]

          const addEthereumChain = {
            blockExplorerUrls,
            chainId: numberToHex(chainId),
            chainName: addEthereumChainParameter?.chainName ?? chain.name,
            iconUrls: addEthereumChainParameter?.iconUrls,
            nativeCurrency:
              addEthereumChainParameter?.nativeCurrency ?? chain.nativeCurrency,
            rpcUrls,
          } satisfies AddEthereumChainParameter

          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [addEthereumChain],
          })

          const requestedChains = await this.getRequestedChainsIds()
          this.setRequestedChainsIds([...requestedChains, chainId])
          return chain
        } catch (error) {
          throw new UserRejectedRequestError(error as Error)
        }
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
      this.setRequestedChainsIds([])
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
      if (sessionDelete) {
        provider.removeListener('session_delete', sessionDelete)
        sessionDelete = undefined
      }
      if (!connect) {
        connect = this.onConnect.bind(this)
        provider.on('connect', connect)
      }
    },
    onDisplayUri(uri) {
      config.emitter.emit('message', { type: 'display_uri', data: uri })
    },
    onSessionDelete() {
      this.onDisconnect()
    },
    getNamespaceChainsIds() {
      if (!provider_) return []
      const chainIds = provider_.session?.namespaces[NAMESPACE]?.accounts?.map(
        (account) => Number.parseInt(account.split(':')[1] || ''),
      )
      return chainIds ?? []
    },
    async getRequestedChainsIds() {
      return (
        (await config.storage?.getItem(this.requestedChainsStorageKey)) ?? []
      )
    },
    /**
     * Checks if the target chains match the chains that were
     * initially requested by the connector for the WalletConnect session.
     * If there is a mismatch, this means that the chains on the connector
     * are considered stale, and need to be revalidated at a later point (via
     * connection).
     *
     * There may be a scenario where a dapp adds a chain to the
     * connector later on, however, this chain will not have been approved or rejected
     * by the wallet. In this case, the chain is considered stale.
     */
    async isChainsStale() {
      if (!isNewChainsStale) return false

      const connectorChains = config.chains.map((x) => x.id)
      const namespaceChains = this.getNamespaceChainsIds()
      if (
        namespaceChains.length &&
        !namespaceChains.some((id) => connectorChains.includes(id))
      )
        return false

      const requestedChains = await this.getRequestedChainsIds()
      return !connectorChains.every((id) => requestedChains.includes(id))
    },
    async setRequestedChainsIds(chains) {
      await config.storage?.setItem(this.requestedChainsStorageKey, chains)
    },
    get requestedChainsStorageKey() {
      return `${this.id}.requestedChains` as Properties['requestedChainsStorageKey']
    },
  }))
}
