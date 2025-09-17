import type { createBaseAccountSDK, ProviderInterface } from '@base-org/account'
import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
} from '@wagmi/core'
import type { Mutable, Omit } from '@wagmi/core/internal'
import {
  type AddEthereumChainParameter,
  getAddress,
  type Hex,
  numberToHex,
  type ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from 'viem'

export type BaseAccountParameters = Mutable<
  Omit<
    Parameters<typeof createBaseAccountSDK>[0],
    'appChainIds' // set via wagmi config
  >
>

export function baseAccount(parameters: BaseAccountParameters = {}) {
  type Provider = ProviderInterface

  let walletProvider: Provider | undefined

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let chainChanged: Connector['onChainChanged'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider>((config) => ({
    id: 'baseAccount',
    name: 'Base Account',
    rdns: 'app.base.account',
    type: 'baseAccount',
    async connect({ chainId, withCapabilities } = {}) {
      try {
        const provider = await this.getProvider()
        const accounts = (
          (await provider.request({
            method: 'eth_requestAccounts',
            params: [],
          })) as string[]
        ).map((x) => getAddress(x))

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

        // Switch to chain if provided
        let currentChainId = await this.getChainId()
        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error
            return { id: currentChainId }
          })
          currentChainId = chain?.id ?? currentChainId
        }

        return {
          // TODO(v3): Make `withCapabilities: true` default behavior
          accounts: (withCapabilities
            ? accounts.map((address) => ({ address, capabilities: {} }))
            : accounts) as never,
          chainId: currentChainId,
        }
      } catch (error) {
        if (
          /(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(
            (error as Error).message,
          )
        )
          throw new UserRejectedRequestError(error as Error)
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()

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

      provider.disconnect()
    },
    async getAccounts() {
      const provider = await this.getProvider()
      return (
        (await provider.request({
          method: 'eth_accounts',
        })) as string[]
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
      if (!walletProvider) {
        const preference = (() => {
          if (typeof parameters.preference === 'string')
            return { options: parameters.preference }
          return {
            ...parameters.preference,
            options: parameters.preference?.options ?? 'all',
          }
        })()

        const { createBaseAccountSDK } = await import('@base-org/account')
        const sdk = createBaseAccountSDK({
          ...parameters,
          appChainIds: config.chains.map((x) => x.id),
          preference,
        })

        walletProvider = sdk.getProvider()
      }

      return walletProvider
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch {
        return false
      }
    },
    async switchChain({ addEthereumChainParameter, chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const provider = await this.getProvider()

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chain.id) }],
        })
        return chain
      } catch (error) {
        // Indicates chain is not added to provider
        if ((error as ProviderRpcError).code === 4902) {
          try {
            let blockExplorerUrls: string[] | undefined
            if (addEthereumChainParameter?.blockExplorerUrls)
              blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls
            else
              blockExplorerUrls = chain.blockExplorers?.default.url
                ? [chain.blockExplorers?.default.url]
                : []

            let rpcUrls: readonly string[]
            if (addEthereumChainParameter?.rpcUrls?.length)
              rpcUrls = addEthereumChainParameter.rpcUrls
            else rpcUrls = [chain.rpcUrls.default?.http[0] ?? '']

            const addEthereumChain = {
              blockExplorerUrls,
              chainId: numberToHex(chainId),
              chainName: addEthereumChainParameter?.chainName ?? chain.name,
              iconUrls: addEthereumChainParameter?.iconUrls,
              nativeCurrency:
                addEthereumChainParameter?.nativeCurrency ??
                chain.nativeCurrency,
              rpcUrls,
            } satisfies AddEthereumChainParameter

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [addEthereumChain],
            })

            return chain
          } catch (error) {
            throw new UserRejectedRequestError(error as Error)
          }
        }

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
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
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
    },
  }))
}
