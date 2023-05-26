import {
  ChainNotConfiguredError,
  ProviderNotFoundError,
  createConnector,
  normalizeChainId,
} from '@wagmi/core'
import {
  EthereumProvider,
  OPTIONAL_EVENTS,
  OPTIONAL_METHODS,
} from '@walletconnect/ethereum-provider'
import {
  type Address,
  type ProviderConnectInfo,
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
  numberToHex,
} from 'viem'

type EthereumProviderOptions = Parameters<EthereumProvider['initialize']>[0]

export type WalletConnectParameters = {
  /**
   * If a new chain is added to a previously existing configured connector `chains`, this flag
   * will determine if that chain should be considered as stale. A stale chain is a chain that
   * WalletConnect has yet to establish a relationship with (ie. the user has not approved or
   * rejected the chain).
   *
   * Preface: Whereas WalletConnect v1 supported dynamic chain switching, WalletConnect v2 requires
   * the user to pre-approve a set of chains up-front. This comes with consequent UX nuances (see below) when
   * a user tries to switch to a chain that they have not approved.
   *
   * This flag mainly affects the behavior when a wallet does not support dynamic chain authorization
   * with WalletConnect v2.
   *
   * If `true` (default), the new chain will be treated as a stale chain. If the user
   * has yet to establish a relationship (approved/rejected) with this chain in their WalletConnect
   * session, the connector will disconnect upon the dapp auto-connecting, and the user will have to
   * reconnect to the dapp (revalidate the chain) in order to approve the newly added chain.
   * This is the default behavior to avoid an unexpected error upon switching chains which may
   * be a confusing user experience (ie. the user will not know they have to reconnect
   * unless the dapp handles these types of errors).
   *
   * If `false`, the new chain will be treated as a validated chain. This means that if the user
   * has yet to establish a relationship with the chain in their WalletConnect session, wagmi will successfully
   * auto-connect the user. This comes with the trade-off that the connector will throw an error
   * when attempting to switch to the unapproved chain. This may be useful in cases where a dapp constantly
   * modifies their configured chains, and they do not want to disconnect the user upon
   * auto-connecting. If the user decides to switch to the unapproved chain, it is important that the
   * dapp handles this error and prompts the user to reconnect to the dapp in order to approve
   * the newly added chain.
   *
   * @default true
   */
  isNewChainsStale?: boolean
  /**
   * Metadata for your app.
   * @link https://docs.walletconnect.com/2.0/javascript/providers/ethereum#initialization
   */
  metadata?: EthereumProviderOptions['metadata']
  /**
   * WalletConnect Cloud Project ID.
   * @link https://cloud.walletconnect.com/sign-in.
   */
  projectId: EthereumProviderOptions['projectId']
  /**
   * Options of QR code modal.
   * @link https://docs.walletconnect.com/2.0/web3modal/options
   */
  qrModalOptions?: EthereumProviderOptions['qrModalOptions']
  /**
   * Whether or not to show the QR code modal.
   * @default true
   * @link https://docs.walletconnect.com/2.0/javascript/providers/ethereum#initialization
   */
  showQrModal?: EthereumProviderOptions['showQrModal']
}

export function walletConnect(parameters: WalletConnectParameters) {
  const isNewChainsStale = parameters.isNewChainsStale ?? true

  type Provider = EthereumProvider
  type NamespaceMethods =
    | 'wallet_addEthereumChain'
    | 'wallet_switchEthereumChain'
  type Properties = {
    connect(parameters?: { chainId?: number; pairingTopic?: string }): Promise<{
      accounts: readonly Address[]
      chainId: number
    }>
    getNamespaceChainsIds(): number[]
    getNamespaceMethods(): NamespaceMethods[]
    getRequestedChainsIds(): number[]
    isChainsStale(): boolean
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

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'walletConnect',
    name: 'WalletConnect',
    async setup() {
      const provider = await this.getProvider()
      if (!provider) return
      provider.on('connect', this.onConnect.bind(this))
      provider.on('session_delete', this.onSessionDelete.bind(this))
    },
    async connect({ chainId, ...rest } = {}) {
      try {
        const provider = await this.getProvider()
        if (!provider) throw new ProviderNotFoundError()
        provider.on('display_uri', this.onDisplayUri)

        let targetChainId = chainId
        if (!targetChainId) {
          const state = config.storage?.getItem('state') ?? {}
          const isChainSupported = config.chains.some(
            (x) => x.id === state.chainId,
          )
          if (isChainSupported) targetChainId = state.chainId
          else targetChainId = config.chains[0]?.id
        }
        if (!targetChainId) throw new Error('No chains found on connector.')

        const isChainsStale = this.isChainsStale()
        // If there is an active session with stale chains, disconnect current session.
        if (provider.session && isChainsStale) await provider.disconnect()

        // If there isn't an active session or chains are stale, connect.
        if (!provider.session || isChainsStale) {
          const optionalChains = config.chains
            .filter((chain) => chain.id !== targetChainId)
            .map((optionalChain) => optionalChain.id)
          await provider.connect({
            chains: [targetChainId],
            optionalChains,
            ...('pairingTopic' in rest
              ? { pairingTopic: rest.pairingTopic }
              : {}),
          })

          this.setRequestedChainsIds(config.chains.map((x) => x.id))
        }

        // If session exists and chains are authorized, enable provider for required chain
        const accounts = (await provider.enable()).map(getAddress)
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
        await provider.disconnect()
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

        this.setRequestedChainsIds([])
      }
    },
    async getAccounts() {
      const provider = await this.getProvider()
      return provider.accounts.map(getAddress)
    },
    async getProvider({ chainId } = {}) {
      async function initProvider() {
        const [defaultChain, ...optionalChains] = config.chains.map((x) => x.id)
        if (!defaultChain) return
        return await EthereumProvider.init({
          chains: [defaultChain],
          optionalMethods: OPTIONAL_METHODS,
          optionalEvents: OPTIONAL_EVENTS,
          optionalChains,
          projectId: parameters.projectId,
          rpcMap: Object.fromEntries(
            config.chains.map((chain) => [
              chain.id,
              chain.rpcUrls.default.http[0]!,
            ]),
          ),
          showQrModal: parameters.showQrModal ?? true,
          ...(parameters.qrModalOptions
            ? { qrModalOptions: parameters.qrModalOptions }
            : {}),
        })
      }

      if (!provider_) {
        if (!providerPromise) providerPromise = initProvider()
        provider_ = await providerPromise
      }
      if (chainId) await this.switchChain?.({ chainId })
      return provider_!
    },
    async getChainId() {
      const provider = await this.getProvider()
      return provider.chainId
    },
    async getWalletClient({ chainId } = {}) {
      const [provider, accounts] = await Promise.all([
        this.getProvider(),
        this.getAccounts(),
      ])
      const account = accounts[0]
      if (!account) throw new Error('No account found')
      const chain = config.chains.find((x) => x.id === chainId)
      if (!chain) throw new Error('No chain found')
      return createWalletClient({ account, chain, transport: custom(provider) })
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
        const isChainsStale = this.isChainsStale()
        if (isChainsStale && provider.session) {
          await provider.disconnect().catch(() => {})
          return false
        }
        return true
      } catch {
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      try {
        const provider = await this.getProvider()
        const namespaceChains = this.getNamespaceChainsIds()
        const namespaceMethods = this.getNamespaceMethods()
        const isChainApproved = namespaceChains.includes(chainId)

        if (
          !isChainApproved &&
          namespaceMethods.includes('wallet_addEthereumChain')
        ) {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: numberToHex(chain.id),
                blockExplorerUrls: [chain.blockExplorers?.default],
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: [...chain.rpcUrls.default.http],
              },
            ],
          })
          const requestedChains = this.getRequestedChainsIds()
          this.setRequestedChainsIds([...requestedChains, chainId])
        }

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
      if (accounts.length === 0) this.onDisconnect()
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
      this.setRequestedChainsIds([])
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
    getNamespaceChainsIds() {
      if (!provider_) return []
      const chainIds = provider_.session?.namespaces[NAMESPACE]?.chains?.map(
        (chain) => parseInt(chain.split(':')[1] || ''),
      )
      return chainIds ?? []
    },
    getNamespaceMethods() {
      if (!provider_) return []
      const methods = provider_.session?.namespaces[NAMESPACE]
        ?.methods as NamespaceMethods[]
      return methods ?? []
    },
    getRequestedChainsIds() {
      return config.storage?.getItem(this.requestedChainsStorageKey) ?? []
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
     *
     * There are exceptions however:
     * -  If the wallet supports dynamic chain addition via `eth_addEthereumChain`,
     *    then the chain is not considered stale.
     * -  If the `isNewChainsStale` flag is falsy on the connector, then the chain is
     *    not considered stale.
     *
     * For the above cases, chain validation occurs dynamically when the user
     * attempts to switch chain.
     *
     * Also check that dapp supports at least 1 chain from previously approved session.
     */
    isChainsStale() {
      const namespaceMethods = this.getNamespaceMethods()
      if (namespaceMethods.includes('wallet_addEthereumChain')) return false
      if (!isNewChainsStale) return false

      const connectorChains = config.chains.map((x) => x.id)
      const namespaceChains = this.getNamespaceChainsIds()
      if (
        namespaceChains.length &&
        !namespaceChains.some((id) => connectorChains.includes(id))
      )
        return false

      const requestedChains = this.getRequestedChainsIds()
      return !connectorChains.every((id) => requestedChains.includes(id))
    },
    setRequestedChainsIds(chains) {
      config.storage?.setItem(this.requestedChainsStorageKey, chains)
    },
    get requestedChainsStorageKey() {
      return `${this.id}.requestedChains` as Properties['requestedChainsStorageKey']
    },
  }))
}
