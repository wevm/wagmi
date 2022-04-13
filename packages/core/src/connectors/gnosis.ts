import { Web3Provider } from '@ethersproject/providers'
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider'
import SafeAppsSDK, {
  Opts as SafeOpts,
  SafeInfo,
} from '@gnosis.pm/safe-apps-sdk'
import { getAddress } from 'ethers/lib/utils'

import { Chain } from '../types'
import { Connector } from './base'
import { normalizeChainId } from '../utils'
import { ConnectorNotFoundError } from '../errors'

const __IS_SERVER__ = typeof window === 'undefined'

export class GnosisConnector extends Connector<
  SafeAppProvider,
  SafeOpts | undefined
> {
  readonly id = 'gnosis'
  readonly name = 'Gnosis'
  readonly ready = !__IS_SERVER__

  #provider?: SafeAppProvider
  #sdk?: SafeAppsSDK
  #safe?: SafeInfo

  constructor(config: { chains?: Chain[]; options?: SafeOpts }) {
    super({ ...config, options: config?.options })
    if (!__IS_SERVER__) {
      this.#sdk = new SafeAppsSDK(config.options)
      // Auto connect on safe environment
      this.connect()
    }
  }

  async connect() {
    const runningAsSafeApp = await this.#isSafeApp()

    if (!runningAsSafeApp) {
      throw new Error("You're not running in a Gnosis Safe APP")
    }

    const provider = await this.getProvider()

    if (provider.on) {
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)
    }

    const account = await this.getAccount()
    const id = await this.getChainId()

    return {
      account,
      provider,
      chain: { id, unsupported: !runningAsSafeApp },
    }
  }

  async disconnect() {
    const provider = this.getProvider()
    if (!provider?.removeListener) return

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
  }

  async getAccount() {
    if (!this.#safe) {
      throw new ConnectorNotFoundError()
    }

    return getAddress(this.#safe.safeAddress)
  }

  async getChainId() {
    if (!this.#provider) {
      throw new ConnectorNotFoundError()
    }

    return normalizeChainId(this.#provider.chainId)
  }

  async #getSafeInfo(): Promise<SafeInfo> {
    if (!this.#sdk) {
      throw new ConnectorNotFoundError()
    }
    if (!this.#safe) {
      this.#safe = await this.#sdk.safe.getInfo()
    }
    return this.#safe
  }

  async #isSafeApp(): Promise<boolean> {
    // check if we're in an iframe
    if (window?.parent === window) {
      return false
    }
    const safe = await Promise.race([
      this.#getSafeInfo(),
      new Promise<void>((resolve) => setTimeout(resolve, 300)),
    ])
    return !!safe
  }

  getProvider() {
    if (!this.#provider) {
      const safe = this.#safe
      if (!safe || !this.#sdk) {
        throw new Error('Could not load Safe information')
      }
      this.#provider = new SafeAppProvider(safe, this.#sdk)
    }
    return this.#provider
  }

  async getSigner() {
    const provider = this.getProvider()
    const account = await this.getAccount()
    return new Web3Provider(<SafeAppProvider>(<unknown>provider)).getSigner(
      account,
    )
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  protected onAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0]) })
  }

  protected isChainUnsupported(chainId: number) {
    return !this.chains.some((x) => x.id === chainId)
  }

  protected onChainChanged(chainId: string | number) {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect() {
    this.emit('disconnect')
  }
}
