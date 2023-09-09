import { SafeAppProvider } from '@safe-global/safe-apps-provider'
import { type Opts, default as SafeAppsSDK } from '@safe-global/safe-apps-sdk'
import { ProviderNotFoundError } from '@wagmi/core'
import { createConnector, normalizeChainId } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import { getAddress } from 'viem'

export type SafeParameters = Evaluate<
  Opts & {
    /**
     * Connector automatically connects when used as Safe App.
     *
     * This flag simulates the disconnect behavior by keeping track of connection status in storage
     * and only autoconnecting when previously connected by user action (e.g. explicitly choosing to connect).
     *
     * @default false
     */
    shimDisconnect?: boolean | undefined
  }
>

export function safe(parameters: SafeParameters = {}) {
  type Provider = SafeAppProvider
  type Properties = {}
  type StorageItem = { 'safe.shimDisconnect': true }

  const shimDisconnectStorageKey = 'safe.shimDisconnect'

  let provider_: Provider | undefined
  let SDK: typeof SafeAppsSDK.default
  if (
    typeof SafeAppsSDK !== 'function' &&
    typeof SafeAppsSDK.default === 'function'
  )
    SDK = SafeAppsSDK.default
  else SDK = SafeAppsSDK as unknown as typeof SafeAppsSDK.default
  const sdk = new SDK(parameters)

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'safe',
    name: 'Safe',
    async connect() {
      // Only allowed in iframe context
      const isIframe =
        typeof window !== 'undefined' && window?.parent !== window
      if (!isIframe) throw new ProviderNotFoundError()

      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()

      const accounts = await this.getAccounts()
      const chainId = await this.getChainId()

      provider.on('disconnect', this.onDisconnect.bind(this))

      // Add shim to storage signalling wallet is connected
      if (parameters.shimDisconnect)
        await config.storage?.setItem(shimDisconnectStorageKey, true)

      return { accounts, chainId }
    },
    async disconnect() {
      const provider = await this.getProvider()
      provider.removeListener('disconnect', this.onDisconnect.bind(this))

      // Remove shim signalling wallet is disconnected
      if (parameters.shimDisconnect)
        await config.storage?.removeItem(shimDisconnectStorageKey)
    },
    async getAccounts() {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()
      return (await provider.request({ method: 'eth_accounts' })).map(
        getAddress,
      )
    },
    async getProvider() {
      if (!provider_) {
        const safe = await sdk.safe.getInfo()
        if (!safe) throw new Error('Could not load Safe information')
        provider_ = new SafeAppProvider(safe, sdk)
      }
      return provider_
    },
    async getChainId() {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()
      return normalizeChainId(provider.chainId)
    },
    async isAuthorized() {
      try {
        const isDisconnected =
          parameters.shimDisconnect &&
          // If shim does not exist in storage, wallet is disconnected
          !(await config.storage?.getItem(shimDisconnectStorageKey))
        if (isDisconnected) return false

        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch {
        return false
      }
    },
    onAccountsChanged() {
      // Not relevant for Safe because changing account requires app reload.
    },
    onChainChanged() {
      // Not relevant for Safe because Safe smart contract wallets only exist on single chain.
    },
    onDisconnect() {
      config.emitter.emit('disconnect')
    },
  }))
}
