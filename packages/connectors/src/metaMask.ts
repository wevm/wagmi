import {
  type AddEthereumChainParameter,
  createMetamaskConnectEVM,
  type MetamaskConnectEVM,
} from '@metamask/connect-evm'

import {
  ChainNotConfiguredError,
  createConnector,
  ProviderNotFoundError,
} from '@wagmi/core'

import type { OneOf } from '@wagmi/core/internal'

import {
  type EIP1193Provider,
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
      // TODO: check if we need to support other parameters
      metamask = await createMetamaskConnectEVM({
        dapp: parameters.dapp ?? {},
        eventHandlers: {
          accountsChanged: this.onAccountsChanged.bind(this),
          chainChanged: this.onChainChanged.bind(this),
          connect: this.onConnect.bind(this),
          disconnect: this.onDisconnect.bind(this),
        },
      })
    },

    async connect<withCapabilities extends boolean = false>(parameters?: {
      chainId?: number | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    }) {
      // TODO: better handling when not providing a chainId?

      const chainId = parameters?.chainId ?? 1
      const withCapabilities =
        ('withCapabilities' in (parameters ?? {}) &&
          parameters?.withCapabilities) ||
        false

      // TODO: Bind display_uri event?
      // TODO: Add connectAndSign and connectWith support, including events

      try {
        const result = await metamask.connect({
          chainId: chainId,
          account: undefined,
        })

        return {
          accounts: (withCapabilities
            ? result.accounts.map((account) => ({
                address: account,
                capabilities: {},
              }))
            : result.accounts) as never,
          chainId: result.chainId ?? chainId,
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
      // TODO: Handle case where chainId is not found
      return 1
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

      metamask.switchChain({ chainId, chainConfiguration })

      return chain
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

      config.emitter.emit('connect', {
        accounts,
        chainId: Number(connectInfo.chainId),
      })
    },

    async onDisconnect() {
      config.emitter.emit('disconnect')
    },

    async onDisplayUri(uri) {
      config.emitter.emit('message', { type: 'display_uri', data: uri })
    },
  }))
}
