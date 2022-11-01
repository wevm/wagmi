import { Ethereum } from '../types'
import { InjectedConnector, InjectedConnectorOptions } from './injected'

export type MetaMaskConnectorOptions = Pick<
  InjectedConnectorOptions,
  'shimChainChangedDisconnect' | 'shimDisconnect'
> & {
  /**
   * While "disconnected" with `shimDisconnect`, allows user to select a different MetaMask account (than the currently connected account) when trying to connect.
   */
  UNSTABLE_shimOnConnectSelectAccount?: boolean
}

export class MetaMaskConnector extends InjectedConnector {
  readonly id = 'bitski'
  readonly ready =
    typeof window != 'undefined' && !!this.#findProvider(window.ethereum)

  #provider?: Window['ethereum']

  async getProvider() {
    if (typeof window !== 'undefined') {
      // TODO: Fallback to `ethereum#initialized` event for async injection
      // https://github.com/MetaMask/detect-provider#synchronous-and-asynchronous-injection=
      this.#provider = this.#findProvider(window.ethereum)
    }
    return this.#provider
  }

  #findProvider(ethereum?: Ethereum) {
    if (ethereum?.providers)
      return ethereum.providers.find(
        (ethereum?: Ethereum) => ethereum?.isBitski,
      )

    return ethereum?.isBitski ? ethereum : undefined
  }
}
