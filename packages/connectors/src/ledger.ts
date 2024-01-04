import {
  EthereumProvider,
  SupportedProviders,
  loadConnectKit,
} from '@ledgerhq/connect-kit-loader'
import { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
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
import type { WalletClient } from './types'
import { normalizeChainId } from './utils/normalizeChainId'

type LedgerConnectorWcV1Options = {
  walletConnectVersion?: 1
  bridge?: string
  chainId?: number
  projectId?: never
  rpc?: { [chainId: number]: string }
}

type LedgerConnectorWcV2Options = {
  walletConnectVersion?: 2
  projectId?: EthereumProviderOptions['projectId']
  requiredChains?: number[]
  requiredMethods?: string[]
  optionalMethods?: string[]
  requiredEvents?: string[]
  optionalEvents?: string[]
}

type LedgerConnectorOptions = {
  enableDebugLogs?: boolean
} & (LedgerConnectorWcV1Options | LedgerConnectorWcV2Options)

type ConnectConfig = {
  /** Target chain to connect to. */
  chainId?: number
}

export class LedgerConnector extends Connector<
  EthereumProvider,
  LedgerConnectorOptions
> {
  readonly id = 'ledger'
  readonly name = 'Ledger'
  readonly ready = true

  #provider?: EthereumProvider
  #initProviderPromise?: Promise<void>
  #isV1: boolean

  get walletConnectVersion(): 1 | 2 {
    if (this.options.walletConnectVersion)
      return this.options.walletConnectVersion
    else if ((this.options as LedgerConnectorWcV2Options).projectId) return 2
    return 1
  }

  constructor(config: { chains?: Chain[]; options: LedgerConnectorOptions }) {
    super({
      ...config,
      options: { ...config.options },
    })

    this.#isV1 = this.walletConnectVersion === 1
  }

  async connect({ chainId }: ConnectConfig = {}) {
    try {
      const provider = await this.getProvider({ create: true })
      this.#setupListeners()

      // Don't request accounts if we have a session, like when reloading with
      // an active WC v2 session
      if (!provider.session) {
        this.emit('message', { type: 'connecting' })

        await provider.request({
          method: 'eth_requestAccounts',
        })
      }

      const account = await this.getAccount()
      let id = await this.getChainId()
      let unsupported = this.isChainUnsupported(id)

      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId)
        id = chain.id
        unsupported = this.isChainUnsupported(id)
      }

      return {
        account,
        chain: { id, unsupported },
        provider,
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
      if (provider?.disconnect) await provider.disconnect()
    } catch (error) {
      if (!/No matching key/i.test((error as Error).message)) throw error
    } finally {
      this.#removeListeners()

      this.#isV1 &&
        typeof localStorage !== 'undefined' &&
        localStorage.removeItem('walletconnect')
    }
  }

  async getAccount() {
    const provider = await this.getProvider()
    const accounts = (await provider.request({
      method: 'eth_accounts',
    })) as string[]
    const account = getAddress(accounts[0] as string)

    return account
  }

  async getChainId() {
    const provider = await this.getProvider()
    const chainId = (await provider.request({
      method: 'eth_chainId',
    })) as number

    return normalizeChainId(chainId)
  }

  async getProvider(
    { chainId, create }: { chainId?: number; create?: boolean } = {
      create: false,
    },
  ) {
    if (!this.#provider || (this.#isV1 && create)) {
      await this.#createProvider()
    }
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
    return createWalletClient({ account, chain, transport: custom(provider) })
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()

      return !!account
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
    const connectKit = await loadConnectKit()

    if (this.options.enableDebugLogs) {
      connectKit.enableDebugLogs()
    }

    let checkSupportOptions

    if (this.#isV1) {
      const { chainId, bridge } = this.options as LedgerConnectorWcV1Options
      checkSupportOptions = {
        providerType: SupportedProviders.Ethereum,
        walletConnectVersion: 1,
        chainId,
        bridge,
        rpc: Object.fromEntries(
          this.chains.map((chain) => [
            chain.id,
            chain.rpcUrls.default.http[0]!,
          ]),
        ),
      }
    } else {
      const {
        projectId,
        requiredChains,
        requiredMethods,
        optionalMethods,
        requiredEvents,
        optionalEvents,
      } = this.options as LedgerConnectorWcV2Options
      const optionalChains = this.chains.map(({ id }) => id)

      checkSupportOptions = {
        providerType: SupportedProviders.Ethereum,
        walletConnectVersion: 2,
        projectId,
        chains: requiredChains,
        optionalChains,
        methods: requiredMethods,
        optionalMethods,
        events: requiredEvents,
        optionalEvents,
        rpcMap: Object.fromEntries(
          this.chains.map((chain) => [
            chain.id,
            chain.rpcUrls.default.http[0]!,
          ]),
        ),
      }
    }
    connectKit.checkSupport(checkSupportOptions)

    this.#provider =
      (await connectKit.getProvider()) as unknown as EthereumProvider
  }

  #setupListeners() {
    if (!this.#provider) return
    this.#removeListeners()
    this.#provider.on('accountsChanged', this.onAccountsChanged)
    this.#provider.on('chainChanged', this.onChainChanged)
    this.#provider.on('disconnect', this.onDisconnect)
    this.#provider.on('session_delete', this.onDisconnect)
    this.#provider.on('connect', this.onConnect)
  }

  #removeListeners() {
    if (!this.#provider) return
    this.#provider.removeListener('accountsChanged', this.onAccountsChanged)
    this.#provider.removeListener('chainChanged', this.onChainChanged)
    this.#provider.removeListener('disconnect', this.onDisconnect)
    this.#provider.removeListener('session_delete', this.onDisconnect)
    this.#provider.removeListener('connect', this.onConnect)
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0]!) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')
  }

  protected onConnect = () => {
    this.emit('connect', {})
  }
}
