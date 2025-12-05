import {
  createMetamaskConnectEVM,
  type EIP1193Provider,
  type MetamaskConnectEVM,
} from '@metamask/connect-evm'

import {
  ChainNotConfiguredError,
  createConnector,
  ProviderNotFoundError,
} from '@wagmi/core'

import type {
  Compute,
  ExactPartial,
  OneOf,
  Omit as StrictOmit,
} from '@wagmi/core/internal'

import {
  type Address,
  getAddress,
  type ProviderConnectInfo,
  ResourceUnavailableRpcError,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  type AddEthereumChainParameter as ViemAddEthereumChainParameter,
  withRetry,
  withTimeout,
} from 'viem'

type CreateMetamaskConnectEVMParameters = Parameters<
  typeof createMetamaskConnectEVM
>[0]

const DEFAULT_CHAIN_ID = 1

export type MetaMaskParameters = {
  dapp?: CreateMetamaskConnectEVMParameters['dapp'] | undefined
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

metaMask.type = 'metaMask' as const
export function metaMask(parameters: MetaMaskParameters = {}) {
  type Provider = EIP1193Provider
  type Properties = {
    onConnect(connectInfo: ProviderConnectInfo): void
    onDisplayUri(uri: string): void
  }

  let metamask: MetamaskConnectEVM | undefined
  let metamaskPromise: Promise<MetamaskConnectEVM> | undefined

  return createConnector<Provider, Properties>((config) => {
    // Helper to ensure metamask is initialized
    async function ensureMetamask() {
      if (!metamask) {
        if (!metamaskPromise) {
          const supportedNetworks = Object.fromEntries(
            config.chains.map((chain) => [
              `eip155:${chain.id}`,
              chain.rpcUrls.default?.http[0],
            ]),
          )

          metamaskPromise = createMetamaskConnectEVM({
            dapp: parameters.dapp ?? { name: window.location.hostname },
            eventHandlers: {
              accountsChanged: connector.onAccountsChanged.bind(connector),
              chainChanged: connector.onChainChanged.bind(connector),
              connect: connector.onConnect.bind(connector),
              disconnect: connector.onDisconnect.bind(connector),
            },
            api: {
              supportedNetworks,
            },
          })
        }
        metamask = await metamaskPromise
      }
      return metamask
    }

    const connector = {
      id: 'metaMaskSDK',
      name: 'MetaMask',
      rdns: ['io.metamask', 'io.metamask.mobile'],
      type: metaMask.type,
      async setup() {
        // Ensure provider is initialized by calling getProvider
        await this.getProvider()
      },

      async connect<withCapabilities extends boolean = false>(connectParams?: {
        chainId?: number | undefined
        isReconnecting?: boolean | undefined
        withCapabilities?: withCapabilities | boolean | undefined
      }) {
        const chainId = connectParams?.chainId ?? DEFAULT_CHAIN_ID
        const withCapabilities = connectParams?.withCapabilities

        const instance = await ensureMetamask()

        let accounts: readonly Address[] = []
        if (connectParams?.isReconnecting) {
          accounts = (await this.getAccounts().catch(() => [])).map((account) =>
            getAddress(account),
          )
        }

        try {
          let signResponse: string | undefined
          let connectWithResponse: unknown | undefined

          if (!accounts?.length) {
            if (parameters.connectAndSign || parameters.connectWith) {
              if (parameters.connectAndSign) {
                signResponse = await instance.connectAndSign(
                  parameters.connectAndSign,
                )
              } else if (parameters.connectWith) {
                connectWithResponse = await instance.connectWith({
                  method: parameters.connectWith.method,
                  params: parameters.connectWith.params,
                })
              }

              accounts = (await this.getAccounts()).map((account) =>
                getAddress(account),
              )
            } else {
              const result = await instance.connect({
                chainId,
                account: undefined,
              })
              accounts = result.accounts.map((account) => getAddress(account))
            }
          }

          // Switch to chain if provided
          let currentChainId = (await this.getChainId()) as number
          if (chainId && currentChainId !== chainId) {
            const chain = await this.switchChain!({
              chainId,
              addEthereumChainParameter: undefined,
            }).catch((error) => {
              if (error.code === UserRejectedRequestError.code) throw error
              return { id: currentChainId }
            })
            currentChainId = chain?.id ?? currentChainId
          }

          // Emit events for connectAndSign and connectWith
          const provider = await this.getProvider()
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
            accounts: (withCapabilities
              ? accounts.map((account) => ({
                  address: account,
                  capabilities: {},
                }))
              : accounts) as never,
            chainId: currentChainId,
          }
        } catch (err) {
          const error = err as RpcError
          if (error.code === UserRejectedRequestError.code) {
            throw new UserRejectedRequestError(error)
          }
          if (error.code === ResourceUnavailableRpcError.code) {
            throw new ResourceUnavailableRpcError(error)
          }
          throw error
        }
      },

      async disconnect() {
        const instance = await ensureMetamask()
        return instance.disconnect()
      },

      async getAccounts() {
        const instance = await ensureMetamask()
        return instance.accounts
      },

      async getChainId() {
        const instance = await ensureMetamask()
        const chainId = await instance.getChainId()
        if (chainId) {
          return Number(chainId)
        }
        // Fallback to requesting chainId from provider if SDK doesn't return it
        const provider = await this.getProvider()

        const hexChainId = await provider.request({ method: 'eth_chainId' })
        return Number(hexChainId)
      },

      async getProvider() {
        const instance = await ensureMetamask()
        const provider = await instance.getProvider()
        if (!provider) {
          throw new ProviderNotFoundError()
        }
        // Provider type-mismatch because Metamask uses tuples,
        // whereas viem uses direct parameters.
        // This is safe because both providers implement the same runtime interface
        // (on, removeListener, request); only the TypeScript signatures differ.
        return provider
      },

      async isAuthorized() {
        try {
          // MetaMask mobile provider sometimes fails to immediately resolve
          // JSON-RPC requests on page load
          const timeout = 200
          const accounts = await withRetry(
            () => withTimeout(() => this.getAccounts(), { timeout }),
            {
              delay: timeout + 1,
              retryCount: 3,
            },
          )
          return !!accounts.length
        } catch {
          return false
        }
      },

      async switchChain(
        parameters: Compute<{
          addEthereumChainParameter?:
            | ExactPartial<StrictOmit<ViemAddEthereumChainParameter, 'chainId'>>
            | undefined
          chainId: number
        }>,
      ) {
        const { addEthereumChainParameter, chainId } = parameters
        const instance = await ensureMetamask()
        const chain = config.chains.find(({ id }) => id === chainId)

        if (!chain) {
          throw new SwitchChainError(new ChainNotConfiguredError())
        }

        const rpcUrls = addEthereumChainParameter?.rpcUrls
          ? [...addEthereumChainParameter.rpcUrls]
          : chain.rpcUrls.default?.http
            ? [...chain.rpcUrls.default.http]
            : undefined

        const blockExplorerUrls = addEthereumChainParameter?.blockExplorerUrls
          ? [...addEthereumChainParameter.blockExplorerUrls]
          : chain.blockExplorers?.default.url
            ? [chain.blockExplorers.default.url]
            : undefined

        // Convert viem AddEthereumChainParameter to MetaMask SDK format
        const chainConfiguration = {
          chainId: `0x${chainId.toString(16)}`,
          rpcUrls: rpcUrls,
          nativeCurrency:
            addEthereumChainParameter?.nativeCurrency ?? chain.nativeCurrency,
          chainName: addEthereumChainParameter?.chainName ?? chain.name,
          blockExplorerUrls: blockExplorerUrls,
          iconUrls: addEthereumChainParameter?.iconUrls,
        }

        try {
          await instance.switchChain({ chainId, chainConfiguration })
          return chain
        } catch (err) {
          const error = err as RpcError

          if (error.code === UserRejectedRequestError.code) {
            throw new UserRejectedRequestError(error)
          }

          throw new SwitchChainError(error)
        }
      },

      async onAccountsChanged(accounts: string[]) {
        config.emitter.emit('change', {
          accounts: accounts.map((account: string) => getAddress(account)),
        })
      },

      async onChainChanged(chain: string) {
        const chainId = Number(chain)
        config.emitter.emit('change', { chainId })
      },

      async onConnect(connectInfo: ProviderConnectInfo) {
        const accounts = await this.getAccounts()
        if (accounts.length === 0) return

        const chainId = Number(connectInfo.chainId)
        config.emitter.emit('connect', { accounts, chainId })
      },

      async onDisconnect(error?: RpcError) {
        // If MetaMask emits a `code: 1013` error, wait for reconnection before disconnecting
        // https://github.com/MetaMask/providers/pull/120
        if (error && (error as unknown as RpcError<1013>).code === 1013) {
          const provider = await this.getProvider()
          if (provider && !!(await this.getAccounts()).length) return
        }

        config.emitter.emit('disconnect')
      },

      async onDisplayUri(uri: string) {
        config.emitter.emit('message', { type: 'display_uri', data: uri })
      },
    }

    return connector
  })
}
