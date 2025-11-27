import {
  type AddEthereumChainParameter,
  createMetamaskConnectEVM,
  type EIP1193Provider,
  type MetamaskConnectEVM,
} from '@metamask/connect-evm'

import {
  ChainNotConfiguredError,
  createConnector,
  ProviderNotFoundError,
} from '@wagmi/core'

import type { OneOf } from '@wagmi/core/internal'

import {
  type Address,
  getAddress,
  type ProviderConnectInfo,
  ResourceUnavailableRpcError,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
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

  let metamask: MetamaskConnectEVM

  return createConnector<Provider, Properties>((config) => ({
    id: 'metaMaskSDK',
    name: 'MetaMask',
    rdns: ['io.metamask', 'io.metamask.mobile'],
    type: metaMask.type,
    async setup() {
      const supportedNetworks = Object.fromEntries(
        config.chains.map((chain) => [
          `eip155:${chain.id}`,
          chain.rpcUrls.default?.http[0],
        ]),
      )

      // TODO: check if we need to support other parameters
      metamask = await createMetamaskConnectEVM({
        dapp: parameters.dapp ?? {},
        eventHandlers: {
          accountsChanged: this.onAccountsChanged.bind(this),
          chainChanged: this.onChainChanged.bind(this),
          connect: this.onConnect.bind(this),
          disconnect: this.onDisconnect.bind(this),
        },
        api: {
          supportedNetworks,
        },
      })
    },

    async connect<withCapabilities extends boolean = false>(connectParams?: {
      chainId?: number | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    }) {
      const chainId = connectParams?.chainId ?? DEFAULT_CHAIN_ID
      const withCapabilities = connectParams?.withCapabilities

      let accounts: readonly string[] = []
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
              signResponse = await (metamask as any).connectAndSign({
                msg: parameters.connectAndSign,
              })
            } else if (parameters.connectWith) {
              connectWithResponse = await (metamask as any).connectWith({
                method: parameters.connectWith.method,
                params: parameters.connectWith.params,
              })
            }

            accounts = (await this.getAccounts()).map((account) =>
              getAddress(account),
            )
          } else {
            const result = await metamask.connect({
              chainId,
              account: undefined,
            })
            accounts = result.accounts.map((account) => getAddress(account))
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

        // Emit events for connectAndSign and connectWith
        const provider = await this.getProvider()
        if (signResponse)
          provider.emit('connectAndSign', {
            accounts: accounts as Address[],
            chainId: currentChainId,
            signResponse,
          })
        else if (connectWithResponse)
          provider.emit('connectWith', {
            accounts: accounts as Address[],
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
      return metamask.disconnect()
    },

    async getAccounts() {
      return metamask.accounts
    },

    async getChainId() {
      const chainId = await metamask.getChainId()
      if (chainId) {
        return Number(chainId)
      }
      // Fallback to requesting chainId from provider if SDK doesn't return it
      const provider = await this.getProvider()

      const hexChainId = await provider.request({ method: 'eth_chainId' })
      return Number(hexChainId)
    },

    async getProvider() {
      const provider = await metamask.getProvider()
      if (!provider) {
        throw new ProviderNotFoundError()
      }
      // Provider type-mismatch because Metamask uses tuples,
      // whereas viem uses direct parameters.
      // This is safe because both providers implement the same runtime interface
      // (on, removeListener, request); only the TypeScript signatures differ.
      // TODO: potential improvement here to avoid cast?
      return provider as unknown as Provider
    },

    async isAuthorized() {
      const accounts = await this.getAccounts()
      return accounts.length > 0
    },

    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find((x) => x.id === chainId)

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

      const chainConfiguration: AddEthereumChainParameter = {
        chainId: `0x${chainId.toString(16)}`,
        rpcUrls,
        nativeCurrency:
          addEthereumChainParameter?.nativeCurrency ?? chain.nativeCurrency,
        chainName: addEthereumChainParameter?.chainName ?? chain.name,
        blockExplorerUrls,
        iconUrls: addEthereumChainParameter?.iconUrls,
      }

      try {
        await metamask.switchChain({ chainId, chainConfiguration })
        return chain
      } catch (err) {
        const error = err as RpcError

        if (error.code === UserRejectedRequestError.code) {
          throw new UserRejectedRequestError(error)
        }

        throw new SwitchChainError(error)
      }
    },

    async onAccountsChanged(accounts) {
      config.emitter.emit('change', {
        accounts: accounts.map((account) => getAddress(account)),
      })
    },

    async onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },

    async onConnect(connectInfo) {
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

    async onDisplayUri(uri) {
      config.emitter.emit('message', { type: 'display_uri', data: uri })
    },
  }))
}
