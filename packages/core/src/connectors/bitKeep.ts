import { getClient } from '../client'
import {
  ConnectorNotFoundError,
  ResourceUnavailableError,
  RpcError,
  UserRejectedRequestError,
} from '../errors'
import { Chain } from '../types'
import {
  InjectedConnector,
  InjectedConnectorOptions,
  shimDisconnectKey,
} from './injected'

export type BitKeepConnectorOptions = Pick<
  InjectedConnectorOptions,
  'shimChainChangedDisconnect' | 'shimDisconnect'
> & {
  /**
   * While "disconnected" with `shimDisconnect`, allows user to select a different BitKeep account (than the currently connected account) when trying to connect.
   */
  UNSTABLE_shimOnConnectSelectAccount?: boolean
}

export class BitKeepConnector extends InjectedConnector {
  readonly id = 'bitKeep'
  readonly ready =
    typeof window != 'undefined' && !!this.#findProvider(window.bitkeep?.ethereum)

  #provider?: Window['ethereum']
  #UNSTABLE_shimOnConnectSelectAccount: BitKeepConnectorOptions['UNSTABLE_shimOnConnectSelectAccount']

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[]
    options?: BitKeepConnectorOptions
  } = {}) {
    const options = {
      name: 'BitKeep',
      shimDisconnect: true,
      shimChainChangedDisconnect: true,
      ...options_,
    }
    super({
      chains,
      options,
    })

    this.#UNSTABLE_shimOnConnectSelectAccount =
      options.UNSTABLE_shimOnConnectSelectAccount
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      const provider = await this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      this.emit('message', { type: 'connecting' })

      // Attempt to show wallet select prompt with `wallet_requestPermissions` when
      // `shimDisconnect` is active and account is in disconnected state (flag in storage)
      if (
        this.#UNSTABLE_shimOnConnectSelectAccount &&
        this.options?.shimDisconnect &&
        !getClient().storage?.getItem(shimDisconnectKey)
      ) {
        const accounts = await provider
          .request({
            method: 'eth_accounts',
          })
          .catch(() => [])
        const isConnected = !!accounts[0]
        if (isConnected)
          await provider.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }],
          })
      }

      const account = await this.getAccount()
      // Switch to chain if provided
      let id = await this.getChainId()
      let unsupported = this.isChainUnsupported(id)
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId)
        id = chain.id
        unsupported = this.isChainUnsupported(id)
      }

      if (this.options?.shimDisconnect)
        getClient().storage?.setItem(shimDisconnectKey, true)

      return { account, chain: { id, unsupported }, provider }
    } catch (error) {
      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error)
      if ((<RpcError>error).code === -32002)
        throw new ResourceUnavailableError(error)
      throw error
    }
  }

  async getProvider() {
    if (typeof window !== 'undefined') {
      // TODO: Fallback to `ethereum#initialized` event for async injection
      // https://github.com/BitKeep/detect-provider#synchronous-and-asynchronous-injection=
      this.#provider = this.#findProvider(window.bitkeep?.ethereum)
    }
    return this.#provider
  }

  #getReady(ethereum?: Ethereum) {
    const isBitKeep = !!window?.bitkeep?.ethereum
    if (!isBitKeep || !ethereum) return
    // Brave tries to make itself look like BitKeep
    // Could also try RPC `web3_clientVersion` if following is unreliable
    if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) return
    if (ethereum.isTokenPocket) return
    if (ethereum.isTokenary) return
    return ethereum
  }

  #findProvider(ethereum?: Ethereum) {
    if (ethereum?.providers) return ethereum.providers.find(this.#getReady)
    return this.#getReady(ethereum)
  }
}
