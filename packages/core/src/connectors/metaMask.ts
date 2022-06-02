import { Chain } from '../types'
import { InjectedConnector, InjectedConnectorOptions } from './injected'

export type MetaMaskConnectorOptions = Pick<
  InjectedConnectorOptions,
  'shimDisconnect'
> & {
  /**
   * MetaMask 10.9.3 emits disconnect event when chain is changed.
   * This flag prevents the `"disconnect"` event from being emitted upon switching chains.
   * @see https://github.com/MetaMask/metamask-extension/issues/13375#issuecomment-1027663334
   */
  shimChainChangedDisconnect?: boolean
}

export class MetaMaskConnector extends InjectedConnector {
  readonly id = 'metaMask'
  readonly ready =
    typeof window != 'undefined' && !!this.#findProvider(window.ethereum)

  #switchingChains?: boolean
  #provider?: Window['ethereum']

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
      shimChainChangedDisconnect: true,
      ...options_,
    }
    super({
      chains,
      options,
    })

    // We need this as MetaMask can emit the "disconnect" event
    // upon switching chains. This workaround ensures that the
    // user currently isn't in the process of switching chains.
    if (options.shimChainChangedDisconnect) {
      const onDisconnect = this.onDisconnect
      super.onDisconnect = () => {
        if (this.#switchingChains) {
          this.#switchingChains = false
          return
        }
        onDisconnect()
      }
    }
  }

  async getProvider() {
    if (typeof window !== 'undefined') {
      // TODO: Fallback to `ethereum#initialized` event for async injection
      // https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=
      this.#provider = this.#findProvider(window.ethereum)
    }
    return this.#provider
  }

  async switchChain(chainId: number): Promise<Chain> {
    this.#switchingChains = true
    return super.switchChain(chainId)
  }

  #getReady(ethereum?: Ethereum) {
    const isMetaMask = !!ethereum?.isMetaMask
    if (!isMetaMask) return
    // Brave tries to make itself look like MetaMask
    // Could also try RPC `web3_clientVersion` if following is unreliable
    if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) return
    if (ethereum.isTokenary) return
    return ethereum
  }

  #findProvider(ethereum?: Ethereum) {
    if (ethereum?.providers) return ethereum.providers.find(this.#getReady)
    return this.#getReady(ethereum)
  }
}
