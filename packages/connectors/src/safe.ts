import { SafeAppProvider } from '@safe-global/safe-apps-provider'
import { Opts, default as SafeAppsSDK } from '@safe-global/safe-apps-sdk'
import { createWalletClient, custom, getAddress } from 'viem'
import type { Chain } from 'viem/chains'

import { Connector } from './base'
import { ConnectorNotFoundError } from './errors'
import type { WalletClient } from './types'
import { normalizeChainId } from './utils/normalizeChainId'

export type SafeConnectorProvider = SafeAppProvider
export type SafeConnectorOptions = Opts & {
  /**
   * Connector automatically connects when used as Safe App.
   *
   * This flag simulates the disconnect behavior by keeping track of connection status in storage
   * and only autoconnecting when previously connected by user action (e.g. explicitly choosing to connect).
   *
   * @default false
   */
  shimDisconnect?: boolean
}

/**
 * Connector for [Safe Wallet](https://safe.global)
 */
export class SafeConnector extends Connector<
  SafeConnectorProvider,
  SafeConnectorOptions
> {
  readonly id = 'safe'
  readonly name = 'Safe'
  // Only allowed in iframe context
  ready = !(typeof window === 'undefined') && window?.parent !== window

  #provider?: SafeConnectorProvider
  #sdk: SafeAppsSDK

  protected shimDisconnectKey = `${this.id}.shimDisconnect`

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[]
    options?: SafeConnectorOptions
  }) {
    const options = {
      shimDisconnect: false,
      ...options_,
    }
    super({ chains, options })

    let SDK = SafeAppsSDK
    if (
      typeof SafeAppsSDK !== 'function' &&
      // @ts-expect-error This import error is not visible to TypeScript
      typeof SafeAppsSDK.default === 'function'
    )
      SDK = (SafeAppsSDK as unknown as { default: typeof SafeAppsSDK }).default
    this.#sdk = new SDK(options)
  }

  async connect() {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()

    if (provider.on) {
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)
    }

    this.emit('message', { type: 'connecting' })

    const account = await this.getAccount()
    const id = await this.getChainId()

    // Add shim to storage signalling wallet is connected
    if (this.options.shimDisconnect)
      this.storage?.setItem(this.shimDisconnectKey, true)

    return {
      account,
      chain: { id, unsupported: this.isChainUnsupported(id) },
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    if (!provider?.removeListener) return

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    // Remove shim signalling wallet is disconnected
    if (this.options.shimDisconnect)
      this.storage?.removeItem(this.shimDisconnectKey)
  }

  async getAccount() {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    const accounts = await provider.request({
      method: 'eth_accounts',
    })
    return getAddress(accounts[0] as string)
  }

  async getChainId() {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    return normalizeChainId(provider.chainId)
  }

  async getProvider() {
    if (!this.#provider) {
      const safe = await this.#sdk.safe.getInfo()
      if (!safe) throw new Error('Could not load Safe information')
      this.#provider = new SafeAppProvider(safe, this.#sdk)
    }
    return this.#provider
  }

  async getWalletClient({
    chainId,
  }: { chainId?: number } = {}): Promise<WalletClient> {
    const provider = await this.getProvider()
    const account = await this.getAccount()
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
      if (
        this.options.shimDisconnect &&
        // If shim does not exist in storage, wallet is disconnected
        !this.storage?.getItem(this.shimDisconnectKey)
      )
        return false

      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  protected onAccountsChanged(_accounts: string[]) {
    // Not relevant for Safe because changing account requires app reload.
  }

  protected onChainChanged(_chainId: string | number) {
    // Not relevant for Safe because Safe smart contract wallets only exist on single chain.
  }

  protected onDisconnect() {
    this.emit('disconnect')
  }
}
