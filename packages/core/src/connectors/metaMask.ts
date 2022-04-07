import { InjectedConnector } from './injected'

export class MetaMaskConnector extends InjectedConnector {
  readonly name = 'MetaMask'
  readonly ready =
    typeof window !== 'undefined' &&
    !!this.#getMetaMaskProvider(window.ethereum)

  #provider?: Ethereum

  getProvider() {
    this.#provider = this.#getMetaMaskProvider(window.ethereum)

    return this.#provider
  }

  #getMetaMaskProvider(ethereum?: Ethereum): Ethereum | undefined {
    if (ethereum?.providers)
      return ethereum.providers.find(this.#getMetaMaskProvider)

    if (
      !!ethereum?.isMetaMask &&
      !!ethereum._events?.connect &&
      !!ethereum._state
    )
      return ethereum
  }
}
