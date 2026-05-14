import type {
  createEVMClient,
  EIP1193Provider,
  MetamaskConnectEVM,
} from '@metamask/connect-evm'
import { ChainNotConfiguredError, createConnector } from '@wagmi/core'
import type { ExactPartial, OneOf, UnionCompute } from '@wagmi/core/internal'
import {
  type Address,
  getAddress,
  type Hex,
  numberToHex,
  type ProviderConnectInfo,
  ResourceUnavailableRpcError,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  withRetry,
  withTimeout,
} from 'viem'

export type MetaMaskParameters = UnionCompute<
  ExactPartial<Omit<CreateEVMClientParameters, 'api' | 'eventHandlers'>> & {
    /**
     * @deprecated Use `dapp` instead.
     *
     * Metadata is used to fill details for the UX on confirmation screens in MetaMask.
     */
    dappMetadata?: { name?: string; url?: string; iconUrl?: string } | undefined
    /**
     * @deprecated Use `debug` instead.
     */
    logging?: { sdk?: boolean } | undefined
    /**
     * @deprecated Use `ui.headless` instead.
     */
    headless?: boolean | undefined
  } & OneOf<
      | {
          /* Shortcut to connect and sign a message */
          connectAndSign?: string | undefined
        }
      | {
          // TODO: Strongly type `method` and `params`
          /* Allow `connectWith` any rpc method */
          connectWith?: { method: string; params: unknown[] } | undefined
        }
    >
>

type CreateEVMClientParameters = Parameters<typeof createEVMClient>[0]

const metaMaskRdns = ['io.metamask', 'io.metamask.mobile'] as const

type Eip6963ProviderDetail = {
  info?: { rdns?: string | undefined } | undefined
  provider?: unknown
}

let unwatchInjectedMetaMaskProvider: (() => void) | undefined
const injectedMetaMaskProviders = new Map<
  (typeof metaMaskRdns)[number],
  EIP1193Provider
>()

/**
 * If the SDK has not been loaded yet, watch EIP-6963 announcements for the
 * MetaMask provider so the connector's read-only / probe methods
 * (`getProvider`, `isAuthorized`, `getAccounts`, `getChainId`) can answer
 * without dynamically importing `@metamask/connect-evm`.
 *
 * This avoids paying the SDK bundle download/parse cost on every page load
 * via `reconnect()` for users who have the MetaMask extension installed but
 * have not yet user-initiated a connection through this connector. Once
 * `connect()` runs, the SDK is loaded and all subsequent calls go through it
 * — no provider-instance flip-flop, event wiring stays on the SDK provider.
 *
 * Returns `undefined` on the server or when no MetaMask EIP-6963 announcement
 * has been received (e.g. mobile-web with no extension), in which case callers
 * fall through to `getInstance()`.
 */
function watchInjectedMetaMaskProvider() {
  if (typeof window === 'undefined') return undefined
  if (unwatchInjectedMetaMaskProvider) return undefined

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<Eip6963ProviderDetail>).detail
    if (!detail?.provider) return

    const rdns = detail.info?.rdns
    if (rdns !== 'io.metamask' && rdns !== 'io.metamask.mobile') return

    injectedMetaMaskProviders.set(rdns, detail.provider as EIP1193Provider)
  }

  window.addEventListener('eip6963:announceProvider', handler)
  window.dispatchEvent(new Event('eip6963:requestProvider'))

  unwatchInjectedMetaMaskProvider = () => {
    window.removeEventListener('eip6963:announceProvider', handler)
    unwatchInjectedMetaMaskProvider = undefined
    injectedMetaMaskProviders.clear()
  }
}

function findInjectedMetaMaskProvider(): EIP1193Provider | undefined {
  // Match the connector's own `rdns` array. Order matters: prefer the desktop
  // extension over the mobile in-app browser when both somehow announce on the
  // same surface. The cache is primed by `setup()` via
  // `watchInjectedMetaMaskProvider()`.
  for (const rdns of metaMaskRdns) {
    const provider = injectedMetaMaskProviders.get(rdns)
    if (provider) return provider
  }
  return undefined
}

metaMask.type = 'metaMask' as const
export function metaMask(parameters: MetaMaskParameters = {}) {
  type Provider = EIP1193Provider
  type Properties = {
    onConnect(connectInfo: ProviderConnectInfo): void
    onDisplayUri(uri: string): void
    getInstance(): Promise<MetamaskConnectEVM>
  }

  let metamask: MetamaskConnectEVM | undefined
  let metamaskPromise: Promise<MetamaskConnectEVM> | undefined

  return createConnector<Provider, Properties>((config) => ({
    id: 'metaMaskSDK',
    name: 'MetaMask',
    rdns: ['io.metamask', 'io.metamask.mobile'],
    type: metaMask.type,
    async setup() {
      watchInjectedMetaMaskProvider()
    },
    async connect({ chainId, isReconnecting, withCapabilities } = {}) {
      const instance = await this.getInstance()
      const provider = instance.getProvider() as EIP1193Provider & {
        emit: <key extends keyof LegacyConnectorEventPayloads>(
          event: key,
          payload: LegacyConnectorEventPayloads[key],
        ) => boolean
      }
      type LegacyConnectorEventPayloads = {
        connectAndSign: {
          accounts: readonly Address[]
          chainId: Hex
          signResponse: string
        }
        connectWith: {
          accounts: readonly Address[]
          chainId: Hex
          connectWithResponse: unknown
        }
      }

      let accounts: readonly Address[] = []
      if (isReconnecting) accounts = await this.getAccounts().catch(() => [])

      try {
        let signResponse: string | undefined
        let connectWithResponse: unknown | undefined
        if (!accounts?.length) {
          const chainIds = config.chains.map((chain) => numberToHex(chain.id))
          if (parameters.connectAndSign || parameters.connectWith) {
            if (parameters.connectAndSign)
              signResponse = (
                await instance.connectAndSign({
                  chainIds,
                  message: parameters.connectAndSign,
                })
              ).signature
            else if (parameters.connectWith)
              connectWithResponse = (
                await instance.connectWith({
                  chainIds,
                  method: parameters.connectWith.method,
                  params: parameters.connectWith.params,
                })
              ).result

            accounts = await this.getAccounts()
          } else {
            const result = await instance.connect({ chainIds })
            accounts = result.accounts.map((x) => getAddress(x))
          }
        }
        // Switch to chain if provided
        let currentChainId = await this.getChainId()
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error
            return { id: currentChainId }
          })
          currentChainId = chain?.id ?? currentChainId
        }

        if (signResponse)
          provider.emit('connectAndSign', {
            accounts,
            chainId: numberToHex(currentChainId),
            signResponse,
          })
        else if (connectWithResponse)
          provider.emit('connectWith', {
            accounts,
            chainId: numberToHex(currentChainId),
            connectWithResponse,
          })

        return {
          // TODO(v3): Make `withCapabilities: true` default behavior
          accounts: (withCapabilities
            ? accounts.map((address) => ({ address, capabilities: {} }))
            : accounts) as never,
          chainId: currentChainId,
        }
      } catch (err) {
        const error = err as RpcError
        if (error.code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error)
        if (error.code === ResourceUnavailableRpcError.code)
          throw new ResourceUnavailableRpcError(error)
        throw error
      }
    },
    async disconnect() {
      const instance = await this.getInstance()
      return instance.disconnect()
    },
    async getAccounts() {
      // Pre-connect: serve from the EIP-6963 MetaMask provider when present
      // so we don't import the SDK chunk just to answer this probe.
      if (!metamask && !metamaskPromise) {
        const injected = findInjectedMetaMaskProvider()
        if (injected) {
          const accounts = (await injected.request({
            method: 'eth_accounts',
          })) as string[]
          return accounts.map((x) => getAddress(x))
        }
      }
      const instance = await this.getInstance()
      if (instance.accounts.length)
        return instance.accounts.map((x) => getAddress(x))
      // Fallback to provider if SDK doesn't return accounts
      const provider = instance.getProvider()
      const accounts = (await provider.request({
        method: 'eth_accounts',
      })) as string[]
      return accounts.map((x) => getAddress(x))
    },
    async getChainId() {
      // Pre-connect: serve from the EIP-6963 MetaMask provider when present.
      if (!metamask && !metamaskPromise) {
        const injected = findInjectedMetaMaskProvider()
        if (injected) {
          const chainId = await injected.request({ method: 'eth_chainId' })
          return Number(chainId)
        }
      }
      const instance = await this.getInstance()
      if (instance.getChainId()) return Number(instance.getChainId())
      // Fallback to provider if SDK doesn't return chainId
      const provider = instance.getProvider()
      const chainId = await provider.request({ method: 'eth_chainId' })
      return Number(chainId)
    },
    async getProvider() {
      // Pre-connect: return the EIP-6963 MetaMask provider directly so
      // wagmi's `reconnect()` probe doesn't have to dynamically import the
      // SDK on every page load for extension users.
      if (!metamask && !metamaskPromise) {
        const injected = findInjectedMetaMaskProvider()
        if (injected) return injected
      }
      const instance = await this.getInstance()
      return instance.getProvider()
    },
    async isAuthorized() {
      try {
        // Pre-connect: ask the EIP-6963 MetaMask provider directly to avoid
        // a chunk download for an `eth_accounts` probe on page load. The
        // SDK retry/timeout dance below is only necessary for the mobile
        // SDK transport path.
        if (!metamask && !metamaskPromise) {
          const injected = findInjectedMetaMaskProvider()
          if (injected) {
            const accounts = (await injected.request({
              method: 'eth_accounts',
            })) as readonly string[]
            return accounts.length > 0
          }
        }
        // MetaMask mobile provider sometimes fails to immediately resolve
        // JSON-RPC requests on page load
        const timeout = 10
        const accounts = await withRetry(
          async () =>
            withTimeout(
              async () => {
                const accounts = await this.getAccounts()
                if (!accounts.length) throw new Error('try again')
                return accounts
              },
              { timeout },
            ),
          { delay: timeout + 1, retryCount: 3 },
        )
        return Boolean(accounts.length)
      } catch {
        return false
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find(({ id }) => id === Number(chainId))
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const hexChainId = numberToHex(chainId)

      try {
        const instance = await this.getInstance()
        await instance.switchChain({
          chainId: hexChainId,
          chainConfiguration: {
            blockExplorerUrls: addEthereumChainParameter?.blockExplorerUrls
              ? [...addEthereumChainParameter.blockExplorerUrls]
              : chain.blockExplorers?.default.url
                ? [chain.blockExplorers.default.url]
                : undefined,
            chainId: hexChainId,
            chainName: addEthereumChainParameter?.chainName ?? chain.name,
            iconUrls: addEthereumChainParameter?.iconUrls,
            nativeCurrency:
              addEthereumChainParameter?.nativeCurrency ?? chain.nativeCurrency,
            rpcUrls: addEthereumChainParameter?.rpcUrls
              ? [...addEthereumChainParameter.rpcUrls]
              : chain.rpcUrls.default?.http
                ? [...chain.rpcUrls.default.http]
                : undefined,
          },
        })
        return chain
      } catch (err) {
        const error = err as RpcError

        if (error.code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error)

        throw new SwitchChainError(error)
      }
    },
    async onAccountsChanged(accounts) {
      config.emitter.emit('change', {
        accounts: accounts.map((x) => getAddress(x)),
      })
    },
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onConnect(connectInfo) {
      const accounts = await this.getAccounts()
      if (accounts.length === 0) return

      const chainId = Number(connectInfo.chainId)
      config.emitter.emit('connect', { accounts, chainId })
    },
    async onDisconnect(error) {
      // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
      // https://github.com/MetaMask/providers/pull/120
      if (error && (error as RpcError<1013>).code === 1013) {
        const provider = await this.getProvider()
        if (provider && Boolean((await this.getAccounts()).length)) return
      }

      config.emitter.emit('disconnect')
    },
    onDisplayUri(uri) {
      config.emitter.emit('message', { type: 'display_uri', data: uri })
    },
    async getInstance() {
      if (!metamask) {
        if (!metamaskPromise) {
          const { createEVMClient } = await (async () => {
            try {
              return import('@metamask/connect-evm')
            } catch {
              throw new Error('dependency "@metamask/connect-evm" not found')
            }
          })()
          const defaultDappParams =
            typeof window === 'undefined'
              ? { name: 'wagmi' }
              : { name: window.location.hostname, url: window.location.href }

          metamaskPromise = createEVMClient({
            ...parameters,
            api: {
              supportedNetworks: Object.fromEntries(
                config.chains.map((chain) => [
                  numberToHex(chain.id),
                  chain.rpcUrls.default?.http[0] ?? '',
                ]),
              ),
            },
            dapp: parameters.dapp ?? {
              ...defaultDappParams,
              ...parameters.dappMetadata,
            },
            debug: parameters.debug ?? parameters.logging?.sdk,
            eventHandlers: {
              accountsChanged: this.onAccountsChanged.bind(this),
              chainChanged: this.onChainChanged.bind(this),
              connect: this.onConnect.bind(this),
              disconnect: this.onDisconnect.bind(this),
              displayUri: this.onDisplayUri.bind(this),
            },
            analytics: {
              integrationType: 'wagmi',
            },
            ui: {
              ...parameters.ui,
              ...(parameters.headless != null && {
                headless: parameters.headless,
              }),
            },
            ...(parameters.mobile && { mobile: parameters.mobile }),
          })
        }
        metamask = await metamaskPromise
      }
      return metamask
    },
  }))
}
