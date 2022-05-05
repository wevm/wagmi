import { Chain } from '../types'
import { InjectedConnector, InjectedConnectorOptions } from './injected'

export type OperaConnectorOptions = Pick<
  InjectedConnectorOptions,
  'shimDisconnect'
>

export class OperaConnector extends InjectedConnector {
  readonly id = 'opera'
  readonly ready =
    typeof window !== 'undefined' && !!this.#findProvider(window.ethereum)

  #provider?: Window['ethereum']

  constructor(config?: { chains?: Chain[]; options?: OperaConnectorOptions }) {
    super({
      ...config,
      options: {
        name: 'Opera',
        shimDisconnect: true,
        ...config?.options,
      },
    })
  }

  async getProvider() {
    if (typeof window !== 'undefined')
      this.#provider = this.#findProvider(window.ethereum)
    return this.#provider
  }

  #getReady(ethereum?: Ethereum) {
    const isOpera = !!ethereum?.isOpera
    if (isOpera) return ethereum
  }

  #findProvider(ethereum?: Ethereum) {
    if (ethereum?.providers) return ethereum.providers.find(this.#getReady)
    return this.#getReady(ethereum)
  }
}
