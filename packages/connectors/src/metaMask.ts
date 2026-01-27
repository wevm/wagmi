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
  type ProviderConnectInfo,
  ResourceUnavailableRpcError,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  withRetry,
  withTimeout,
} from 'viem'

export type MetaMaskParameters = UnionCompute<
  ExactPartial<Omit<CreateEVMClientParameters, 'api' | 'eventHandlers'>> &
    OneOf<
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
    async connect({ chainId = 1, isReconnecting, withCapabilities } = {}) {
      const instance = await this.getInstance()
      const provider = instance.getProvider()

      let accounts: readonly Address[] = []
      if (isReconnecting) accounts = await this.getAccounts().catch(() => [])

      try {
        let signResponse: string | undefined
        let connectWithResponse: unknown | undefined
        if (!accounts?.length) {
          const chainIds = config.chains.map((chain) => chain.id)
          if (parameters.connectAndSign || parameters.connectWith) {
            if (parameters.connectAndSign)
              signResponse = await instance.connectAndSign({
                chainIds,
                message: parameters.connectAndSign,
              })
            else if (parameters.connectWith)
              connectWithResponse = await instance.connectWith({
                chainIds,
                method: parameters.connectWith.method,
                params: parameters.connectWith.params,
              })

            accounts = await this.getAccounts()
          } else {
            const result = await instance.connect({ chainIds })
            accounts = result.accounts.map((x) => getAddress(x))
          }
        }
        // Switch to chain if provided
        let currentChainId = (await this.getChainId()) as number
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
            chainId: currentChainId,
            signResponse,
          })
        else if (connectWithResponse)
          provider.emit('connectWith', {
            accounts,
            chainId: currentChainId,
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
      const instance = await this.getInstance()
      if (instance.getChainId()) return Number(instance.getChainId())
      // Fallback to provider if SDK doesn't return chainId
      const provider = instance.getProvider()
      const chainId = await provider.request({ method: 'eth_chainId' })
      return Number(chainId)
    },
    async getProvider() {
      const instance = await this.getInstance()
      return instance.getProvider()
    },
    async isAuthorized() {
      try {
        // MetaMask mobile provider sometimes fails to immediately resolve
        // JSON-RPC requests on page load
        const timeout = 10
        const accounts = await withRetry(
          () =>
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
        return !!accounts.length
      } catch {
        return false
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find(({ id }) => id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      try {
        const instance = await this.getInstance()
        await instance.switchChain({
          chainId,
          chainConfiguration: {
            blockExplorerUrls: addEthereumChainParameter?.blockExplorerUrls
              ? [...addEthereumChainParameter.blockExplorerUrls]
              : chain.blockExplorers?.default.url
                ? [chain.blockExplorers.default.url]
                : undefined,
            chainId: `0x${chainId.toString(16)}`,
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
        accounts: accounts.map((account) => getAddress(account)),
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
        if (provider && !!(await this.getAccounts()).length) return
      }

      config.emitter.emit('disconnect')
    },
    onDisplayUri(uri) {
      config.emitter.emit('message', { type: 'display_uri', data: uri })
    },
    async getInstance() {
      if (!metamask) {
        if (!metamaskPromise) {
          const { createEVMClient } = await (() => {
            try {
              return import('@metamask/connect-evm')
            } catch {
              throw new Error('dependency "@metamask/connect-evm" not found')
            }
          })()

          const defaultDappParams =
            typeof window === 'undefined'
              ? {
                  name: 'wagmi',
                }
              : {
                  name: window.location.hostname,
                  url: window.location.href,
                }

          metamaskPromise = createEVMClient({
            ...parameters,
            api: {
              supportedNetworks: Object.fromEntries(
                config.chains.map((chain) => [
                  `eip155:${chain.id}`,
                  chain.rpcUrls.default?.http[0],
                ]),
              ),
            },
            dapp: parameters.dapp ?? defaultDappParams,
            eventHandlers: {
              accountsChanged: this.onAccountsChanged.bind(this),
              chainChanged: this.onChainChanged.bind(this),
              connect: this.onConnect.bind(this),
              disconnect: this.onDisconnect.bind(this),
              displayUri: this.onDisplayUri.bind(this),
            },
          })
        }
        metamask = await metamaskPromise
      }
      return metamask
    },
  }))
}
