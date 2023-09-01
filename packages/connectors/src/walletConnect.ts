import type WalletConnectProvider from '@walletconnect/ethereum-provider'
import { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
import { normalizeNamespaces } from '@walletconnect/utils'
import {
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
  numberToHex,
} from 'viem'
import type { Chain } from 'viem/chains'

import { Connector } from './base'
import type { StorageStoreData, WalletClient } from './types'

type WalletConnectOptions = {
  /**
   * WalletConnect Cloud Project ID.
   * @link https://cloud.walletconnect.com/sign-in.
   */
  projectId: EthereumProviderOptions['projectId']
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
   * Whether or not to show the QR code modal.
   * @default true
   * @link https://docs.walletconnect.com/2.0/javascript/providers/ethereum#initialization
   */
  showQrModal?: EthereumProviderOptions['showQrModal']
  /**
   * Options of QR code modal.
   * @link https://docs.walletconnect.com/2.0/web/walletConnectModal/modal/options
   */
  qrModalOptions?: EthereumProviderOptions['qrModalOptions']
  /**
   * Option to override default relay url.
   * @link https://docs.walletconnect.com/2.0/web/providers/ethereum
   */
  relayUrl?: string
}

type ConnectConfig = {
  /** Target chain to connect to. */
  chainId?: number
  /** If provided, will attempt to connect to an existing pairing. */
  pairingTopic?: string
}

const NAMESPACE = 'eip155'
const STORE_KEY = 'store'
const REQUESTED_CHAINS_KEY = 'requestedChains'
const ADD_ETH_CHAIN_METHOD = 'wallet_addEthereumChain'

export class WalletConnectConnector extends Connector<
  WalletConnectProvider,
  WalletConnectOptions
> {
  readonly id = 'walletConnect'
  readonly name = 'WalletConnect'
  readonly ready = true

  #provider?: WalletConnectProvider
  #initProviderPromise?: Promise<void>

  constructor(config: { chains?: Chain[]; options: WalletConnectOptions }) {
    super({
      ...config,
      options: { isNewChainsStale: true, ...config.options },
    })
    this.#createProvider()
  }

  async connect({ chainId, pairingTopic }: ConnectConfig = {}) {
    try {
      let targetChainId = chainId
      if (!targetChainId) {
        const store = this.storage?.getItem<StorageStoreData>(STORE_KEY)
        const lastUsedChainId = store?.state?.data?.chain?.id
        if (lastUsedChainId && !this.isChainUnsupported(lastUsedChainId))
          targetChainId = lastUsedChainId
        else targetChainId = this.chains[0]?.id
      }
      if (!targetChainId) throw new Error('No chains found on connector.')

      const provider = await this.getProvider()
      this.#setupListeners()

      const isChainsStale = this.#isChainsStale()

      // If there is an active session with stale chains, disconnect the current session.
      if (provider.session && isChainsStale) await provider.disconnect()

      // If there no active session, or the chains are stale, connect.
      if (!provider.session || isChainsStale) {
        const optionalChains = this.chains
          .filter((chain) => chain.id !== targetChainId)
          .map((optionalChain) => optionalChain.id)

        this.emit('message', { type: 'connecting' })

        await provider.connect({
          pairingTopic,
          chains: [targetChainId],
          optionalChains: optionalChains.length ? optionalChains : undefined,
        })

        this.#setRequestedChainsIds(this.chains.map(({ id }) => id))
      }

      // If session exists and chains are authorized, enable provider for required chain
      const accounts = await provider.enable()
      const account = getAddress(accounts[0]!)
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      return {
        account,
        chain: { id, unsupported },
      }
    } catch (error) {
      if (/user rejected/i.test((error as ProviderRpcError)?.message)) {
        throw new UserRejectedRequestError(error as Error)
      }
      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    try {
      await provider.disconnect()
    } catch (error) {
      if (!/No matching key/i.test((error as Error).message)) throw error
    } finally {
      this.#removeListeners()
      this.#setRequestedChainsIds([])
    }
  }

  async getAccount() {
    const { accounts } = await this.getProvider()
    return getAddress(accounts[0]!)
  }

  async getChainId() {
    const { chainId } = await this.getProvider()
    return chainId
  }

  async getProvider({ chainId }: { chainId?: number } = {}) {
    if (!this.#provider) await this.#createProvider()
    if (chainId) await this.switchChain(chainId)
    return this.#provider!
  }

  async getWalletClient({
    chainId,
  }: { chainId?: number } = {}): Promise<WalletClient> {
    const [provider, account] = await Promise.all([
      this.getProvider({ chainId }),
      this.getAccount(),
    ])
    const chain = this.chains.find((x) => x.id === chainId)
    if (!provider) throw new Error('provider is required.')
    return createWalletClient({
      account,
      chain,
      transport: custom(provider),
    })
  }

  async isAuthorized() {
    try {
      const [account, provider] = await Promise.all([
        this.getAccount(),
        this.getProvider(),
      ])
      const isChainsStale = this.#isChainsStale()

      // If an account does not exist on the session, then the connector is unauthorized.
      if (!account) return false

      // If the chains are stale on the session, then the connector is unauthorized.
      if (isChainsStale && provider.session) {
        try {
          await provider.disconnect()
        } catch {} // eslint-disable-line no-empty
        return false
      }

      return true
    } catch {
      return false
    }
  }

  async switchChain(chainId: number) {
    const chain = this.chains.find((chain) => chain.id === chainId)
    if (!chain)
      throw new SwitchChainError(new Error('chain not found on connector.'))

    try {
      const provider = await this.getProvider()
      const namespaceChains = this.#getNamespaceChainsIds()
      const namespaceMethods = this.#getNamespaceMethods()
      const isChainApproved = namespaceChains.includes(chainId)

      if (!isChainApproved && namespaceMethods.includes(ADD_ETH_CHAIN_METHOD)) {
        await provider.request({
          method: ADD_ETH_CHAIN_METHOD,
          params: [
            {
              chainId: numberToHex(chain.id),
              blockExplorerUrls: [chain.blockExplorers?.default?.url],
              chainName: chain.name,
              nativeCurrency: chain.nativeCurrency,
              rpcUrls: [...chain.rpcUrls.default.http],
            },
          ],
        })
        const requestedChains = this.#getRequestedChainsIds()
        requestedChains.push(chainId)
        this.#setRequestedChainsIds(requestedChains)
      }
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: numberToHex(chainId) }],
      })

      return chain
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as ProviderRpcError)?.message
      if (/user rejected request/i.test(message)) {
        throw new UserRejectedRequestError(error as Error)
      }
      throw new SwitchChainError(error as Error)
    }
  }

  async #createProvider() {
    if (!this.#initProviderPromise && typeof window !== 'undefined') {
      this.#initProviderPromise = this.#initProvider()
    }
    return this.#initProviderPromise
  }

  async #initProvider() {
    const { EthereumProvider, OPTIONAL_EVENTS, OPTIONAL_METHODS } =
      await import('@walletconnect/ethereum-provider')
    const [defaultChain, ...optionalChains] = this.chains.map(({ id }) => id)
    if (defaultChain) {
      const {
        projectId,
        showQrModal = true,
        qrModalOptions,
        metadata,
        relayUrl,
      } = this.options
      this.#provider = await EthereumProvider.init({
        showQrModal,
        qrModalOptions,
        projectId,
        optionalMethods: OPTIONAL_METHODS,
        optionalEvents: OPTIONAL_EVENTS,
        chains: [defaultChain],
        optionalChains: optionalChains.length ? optionalChains : undefined,
        rpcMap: Object.fromEntries(
          this.chains.map((chain) => [
            chain.id,
            chain.rpcUrls.default.http[0]!,
          ]),
        ),
        metadata,
        relayUrl,
      })
    }
  }

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
  #isChainsStale() {
    const namespaceMethods = this.#getNamespaceMethods()
    if (namespaceMethods.includes(ADD_ETH_CHAIN_METHOD)) return false
    if (!this.options.isNewChainsStale) return false

    const requestedChains = this.#getRequestedChainsIds()
    const connectorChains = this.chains.map(({ id }) => id)
    const namespaceChains = this.#getNamespaceChainsIds()

    if (
      namespaceChains.length &&
      !namespaceChains.some((id) => connectorChains.includes(id))
    )
      return false

    return !connectorChains.every((id) => requestedChains.includes(id))
  }

  #setupListeners() {
    if (!this.#provider) return
    this.#removeListeners()
    this.#provider.on('accountsChanged', this.onAccountsChanged)
    this.#provider.on('chainChanged', this.onChainChanged)
    this.#provider.on('disconnect', this.onDisconnect)
    this.#provider.on('session_delete', this.onDisconnect)
    this.#provider.on('display_uri', this.onDisplayUri)
    this.#provider.on('connect', this.onConnect)
  }

  #removeListeners() {
    if (!this.#provider) return
    this.#provider.removeListener('accountsChanged', this.onAccountsChanged)
    this.#provider.removeListener('chainChanged', this.onChainChanged)
    this.#provider.removeListener('disconnect', this.onDisconnect)
    this.#provider.removeListener('session_delete', this.onDisconnect)
    this.#provider.removeListener('display_uri', this.onDisplayUri)
    this.#provider.removeListener('connect', this.onConnect)
  }

  #setRequestedChainsIds(chains: number[]) {
    this.storage?.setItem(REQUESTED_CHAINS_KEY, chains)
  }

  #getRequestedChainsIds(): number[] {
    return this.storage?.getItem(REQUESTED_CHAINS_KEY) ?? []
  }

  #getNamespaceChainsIds() {
    if (!this.#provider) return []
    const namespaces = this.#provider.session?.namespaces
    if (!namespaces) return []

    const normalizedNamespaces = normalizeNamespaces(namespaces)
    const chainIds = normalizedNamespaces[NAMESPACE]?.chains?.map((chain) =>
      parseInt(chain.split(':')[1] || ''),
    )

    return chainIds ?? []
  }

  #getNamespaceMethods() {
    if (!this.#provider) return []
    const namespaces = this.#provider.session?.namespaces
    if (!namespaces) return []

    const normalizedNamespaces = normalizeNamespaces(namespaces)
    const methods = normalizedNamespaces[NAMESPACE]?.methods

    return methods ?? []
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0]!) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = Number(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.#setRequestedChainsIds([])
    this.emit('disconnect')
  }

  protected onDisplayUri = (uri: string) => {
    this.emit('message', { type: 'display_uri', data: uri })
  }

  protected onConnect = () => {
    this.emit('connect', {})
  }
}
