import {
  type Address,
  ProviderRpcError,
  ResourceUnavailableRpcError,
  UserRejectedRequestError,
  getAddress,
} from 'viem'
import type { Chain } from 'viem/chains'

import { ConnectorNotFoundError } from './errors'
import type { InjectedConnectorOptions } from './injected'
import { InjectedConnector } from './injected'
import { WindowProvider } from './types'

export type MetaMaskConnectorOptions = Pick<
  InjectedConnectorOptions,
  'shimDisconnect'
> & {
  /**
   * While "disconnected" with `shimDisconnect`, allows user to select a different MetaMask account (than the currently connected account) when trying to connect.
   */
  UNSTABLE_shimOnConnectSelectAccount?: boolean
}

export class MetaMaskConnector extends InjectedConnector {
  readonly id = 'metaMask'

  protected shimDisconnectKey = `${this.id}.shimDisconnect`

  #UNSTABLE_shimOnConnectSelectAccount: MetaMaskConnectorOptions['UNSTABLE_shimOnConnectSelectAccount']

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[]
    options?: MetaMaskConnectorOptions
  } = {}) {
    const options = {
      name: 'MetaMask',
      shimDisconnect: true,
      getProvider() {
        function getReady(ethereum?: WindowProvider) {
          const isMetaMask = !!ethereum?.isMetaMask
          if (!isMetaMask) return
          // Brave tries to make itself look like MetaMask
          // Could also try RPC `web3_clientVersion` if following is unreliable
          if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state)
            return
          if (ethereum.isApexWallet) return
          if (ethereum.isAvalanche) return
          if (ethereum.isBitKeep) return
          if (ethereum.isBlockWallet) return
          if (ethereum.isCoin98) return
          if (ethereum.isFordefi) return
          if (ethereum.isMathWallet) return
          if (ethereum.isOkxWallet || ethereum.isOKExWallet) return
          if (ethereum.isOneInchIOSWallet || ethereum.isOneInchAndroidWallet)
            return
          if (ethereum.isOpera) return
          if (ethereum.isPortal) return
          if (ethereum.isRabby) return
          if (ethereum.isDefiant) return
          if (ethereum.isTokenPocket) return
          if (ethereum.isTokenary) return
          if (ethereum.isZerion) return
          return ethereum
        }

        if (typeof window === 'undefined') return
        const ethereum = (window as unknown as { ethereum?: WindowProvider })
          .ethereum
        if (ethereum?.providers) return ethereum.providers.find(getReady)
        return getReady(ethereum)
      },
      ...options_,
    }
    super({ chains, options })

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
      let account: Address | null = null
      if (
        this.#UNSTABLE_shimOnConnectSelectAccount &&
        this.options?.shimDisconnect &&
        !this.storage?.getItem(this.shimDisconnectKey)
      ) {
        account = await this.getAccount().catch(() => null)
        const isConnected = !!account
        if (isConnected)
          // Attempt to show another prompt for selecting wallet if already connected
          try {
            await provider.request({
              method: 'wallet_requestPermissions',
              params: [{ eth_accounts: {} }],
            })
            // User may have selected a different account so we will need to revalidate here.
            account = await this.getAccount()
          } catch (error) {
            // Not all MetaMask injected providers support `wallet_requestPermissions` (e.g. MetaMask iOS).
            // Only bubble up error if user rejects request
            if (this.isUserRejectedRequestError(error))
              throw new UserRejectedRequestError(error as Error)
            // Or MetaMask is already open
            if (
              (error as ProviderRpcError).code ===
              new ResourceUnavailableRpcError(error as ProviderRpcError).code
            )
              throw error
          }
      }

      if (!account) {
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        })
        account = getAddress(accounts[0] as string)
      }

      // Switch to chain if provided
      let id = await this.getChainId()
      let unsupported = this.isChainUnsupported(id)
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId)
        id = chain.id
        unsupported = this.isChainUnsupported(id)
      }

      if (this.options?.shimDisconnect)
        this.storage?.setItem(this.shimDisconnectKey, true)

      return { account, chain: { id, unsupported }, provider }
    } catch (error) {
      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error as Error)
      if ((error as ProviderRpcError).code === -32002)
        throw new ResourceUnavailableRpcError(error as ProviderRpcError)
      throw error
    }
  }
}
