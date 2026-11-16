import type { OWSProxyCore } from '@1shotapi/ows-provider/evm'
import {
  ChainNotConfiguredError,
  type Connector,
  ConnectorNotConnectedError,
  createConnector,
} from '@wagmi/core'
import {
  getAddress,
  type Hex,
  isHex,
  numberToHex,
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from 'viem'

export type OneShotWalletParameters = {
  /** Branding Layer URL. Default: `https://wallet.1shotapi.com`. */
  walletUrl?: string | undefined
  /**
   * Element the wallet iframe is mounted into. Default: a `div` appended to
   * `document.body`. Never reparent it after connect.
   */
  container?: HTMLElement | (() => HTMLElement) | undefined
  /**
   * `flyout` (default): lower-right panel / mobile drawer shown on demand.
   * `inline`: always-visible fill of `container`.
   */
  presentationMode?: 'flyout' | 'inline' | undefined
  /** Flyout panel width in CSS pixels. Default: 360. */
  walletSizeX?: number | undefined
  /** Flyout panel height in CSS pixels. Default: 600. */
  walletSizeY?: number | undefined
  /** Host RPC `configure` payload (copy, theme, `destinationUrl`, …) applied once after the iframe loads. */
  configure?: Record<string, unknown> | undefined
}

const DEFAULT_WALLET_URL = 'https://wallet.1shotapi.com'

const ICON =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzBCMTIyMCIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InN5c3RlbS11aSxzYW5zLXNlcmlmIiBmaWxsPSIjNUI4REVGIj4xPC90ZXh0Pjwvc3ZnPg=='

export function oneShotWallet(parameters: OneShotWalletParameters = {}) {
  type Provider = {
    request(args: {
      method: string
      params?: readonly unknown[] | undefined
    }): Promise<unknown>
    on(event: string, listener: (...args: any[]) => void): void
    removeListener(event: string, listener: (...args: any[]) => void): void
  }
  type Properties = {
    /** Underlying OWS proxy for 1Shot Host RPC (`onramp`, `bridge`, `focusWallet`, `showWallet`, analytics). */
    getProxy(): Promise<OWSProxyCore>
  }

  let proxyPromise: Promise<OWSProxyCore> | undefined

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let chainChanged: Connector['onChainChanged'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider, Properties>((config) => ({
    id: 'oneShotWallet',
    name: '1Shot Wallet',
    rdns: 'com.1shotapi.wallet',
    icon: ICON,
    type: 'oneShotWallet',
    async connect({ chainId, isReconnecting, withCapabilities } = {}) {
      try {
        const provider = await this.getProvider()

        const accounts = (
          (await provider.request({
            method: isReconnecting ? 'eth_accounts' : 'eth_requestAccounts',
          })) as string[]
        ).map((x) => getAddress(x))
        // Permission was revoked (wagmi disconnect) since the last session.
        if (accounts.length === 0) throw new ConnectorNotConnectedError()

        let currentChainId = await this.getChainId()

        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this)
          provider.on('accountsChanged', accountsChanged)
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this)
          provider.on('chainChanged', chainChanged)
        }
        if (!disconnect) {
          disconnect = this.onDisconnect.bind(this)
          provider.on('disconnect', disconnect)
        }

        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error
            return { id: currentChainId }
          })
          currentChainId = chain?.id ?? currentChainId
        }

        return {
          accounts: (withCapabilities
            ? accounts.map((address) => ({ address, capabilities: {} }))
            : accounts) as never,
          chainId: currentChainId,
        }
      } catch (error) {
        if ((error as ProviderRpcError).code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error as Error)
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()
      removeListeners(provider)
      try {
        await provider.request({
          method: 'wallet_revokePermissions',
          params: [{ eth_accounts: {} }],
        })
      } catch {}
    },
    async getAccounts() {
      const provider = await this.getProvider()
      return (
        (await provider.request({ method: 'eth_accounts' })) as string[]
      ).map((x) => getAddress(x))
    },
    async getChainId() {
      const provider = await this.getProvider()
      const chainId = (await provider.request({
        method: 'eth_chainId',
      })) as Hex
      return Number(chainId)
    },
    async getProvider() {
      return (await this.getProxy()).ethereum
    },
    async getProxy() {
      if (!proxyPromise) {
        proxyPromise = createProxy(parameters).catch((error) => {
          proxyPromise = undefined
          throw error
        })
      }
      return proxyPromise
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return accounts.length > 0
      } catch {
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const provider = await this.getProvider()

      // The wallet only supports its built-in networks and does not implement
      // `wallet_addEthereumChain`, so an unknown chain (4902) is a plain failure.
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chainId) }],
        })
        return chain
      } catch (error) {
        if ((error as ProviderRpcError).code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error as Error)
        throw new SwitchChainError(error as Error)
      }
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect()
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      // The wallet also switches to Bitcoin / Solana sessions and announces
      // them with non-hex ids (`Bitcoin`, `solana:mainnet`); wagmi is EVM-only.
      if (typeof chain === 'string' && !isHex(chain)) return
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
      removeListeners(provider)
    },
  }))

  function removeListeners(provider: Provider) {
    if (accountsChanged) {
      provider.removeListener('accountsChanged', accountsChanged)
      accountsChanged = undefined
    }
    if (chainChanged) {
      provider.removeListener('chainChanged', chainChanged)
      chainChanged = undefined
    }
    if (disconnect) {
      provider.removeListener('disconnect', disconnect)
      disconnect = undefined
    }
  }
}

async function createProxy(
  parameters: OneShotWalletParameters,
): Promise<OWSProxyCore> {
  if (typeof window === 'undefined')
    throw new Error('1Shot Wallet requires a browser environment')

  let ows: typeof import('@1shotapi/ows-provider/evm')
  // safe webpack optional peer dependency dynamic import
  try {
    ows = await import(
      /* turbopackOptional: true */
      '@1shotapi/ows-provider/evm'
    )
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: try block marks dependency as optional for webpack
    throw error
  }
  const { EWalletPresentationMode, OWSProxyCore } = ows

  let ownedContainer: HTMLElement | undefined
  const container = (() => {
    if (typeof parameters.container === 'function')
      return parameters.container()
    if (parameters.container) return parameters.container
    ownedContainer = document.createElement('div')
    ownedContainer.dataset.oneShotWallet = ''
    document.body.appendChild(ownedContainer)
    return ownedContainer
  })()

  let proxy: OWSProxyCore | undefined
  try {
    proxy = await OWSProxyCore.create(
      container,
      parameters.walletUrl ?? DEFAULT_WALLET_URL,
      {
        presentationMode:
          parameters.presentationMode === 'inline'
            ? EWalletPresentationMode.Inline
            : EWalletPresentationMode.Flyout,
        walletSizeX: parameters.walletSizeX,
        walletSizeY: parameters.walletSizeY,
      },
    )
    if (parameters.configure) await proxy.rpc('configure', parameters.configure)
    return proxy
  } catch (error) {
    proxy?.destroy()
    ownedContainer?.remove()
    throw error
  }
}
