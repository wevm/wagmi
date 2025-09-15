import type { AppMetadata, ProviderInterface } from '@gemini-wallet/core'
import { GeminiWalletProvider } from '@gemini-wallet/core'
import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
} from '@wagmi/core'
import {
  getAddress,
  numberToHex,
  SwitchChainError,
  UserRejectedRequestError,
} from 'viem'

export type GeminiParameters = {
  appMetadata?: AppMetadata
}

gemini.type = 'gemini' as const
export function gemini(parameters: GeminiParameters = {}) {
  type Provider = ProviderInterface

  let walletProvider: Provider | undefined
  let onAccountsChanged: Connector['onAccountsChanged'] | undefined
  let onChainChanged: Connector['onChainChanged'] | undefined
  let onDisconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider>((config) => ({
    id: 'gemini',
    name: 'Gemini Wallet',
    type: gemini.type,
    icon: 'https://keys.gemini.com/images/gemini-wallet-logo.svg',
    async connect({ chainId, withCapabilities } = {}) {
      try {
        const provider = await this.getProvider()
        const accounts = (await provider.request({
          method: 'eth_requestAccounts',
        })) as string[]

        if (!onAccountsChanged) {
          onAccountsChanged = this.onAccountsChanged.bind(this)
          provider.on('accountsChanged', onAccountsChanged)
        }
        if (!onChainChanged) {
          onChainChanged = this.onChainChanged.bind(this)
          provider.on('chainChanged', onChainChanged)
        }
        if (!onDisconnect) {
          onDisconnect = this.onDisconnect.bind(this)
          provider.on('disconnect', onDisconnect)
        }

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

      if (onAccountsChanged) {
        provider.removeListener('accountsChanged', onAccountsChanged)
        onAccountsChanged = undefined
      }
      if (onChainChanged) {
        provider.removeListener('chainChanged', onChainChanged)
        onChainChanged = undefined
      }
      if (onDisconnect) {
        provider.removeListener('disconnect', onDisconnect)
        onDisconnect = undefined
      }

      await provider.disconnect()
    },
    async getAccounts() {
      const provider = await this.getProvider()
      const accounts = (await provider.request({
        method: 'eth_accounts',
      })) as string[]
      return accounts.map((x) => getAddress(x))
    },
    async getChainId() {
      const provider = await this.getProvider()
      const chainId = (await provider.request({
        method: 'eth_chainId',
      })) as string
      return Number(chainId)
    },
    async getProvider() {
      if (!walletProvider) {
        walletProvider = new GeminiWalletProvider({
          appMetadata: parameters.appMetadata ?? {},
          chain: {
            id: config.chains[0]?.id ?? 1,
            rpcUrl: config.chains[0]?.rpcUrls?.default?.http[0],
          },
        })
      }
      return walletProvider
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return Boolean(accounts.length)
      } catch {
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const provider = await this.getProvider()

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chainId) }],
        })
        return chain
      } catch (error) {
        throw new SwitchChainError(error as Error)
      }
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect()
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x: string) => getAddress(x)),
        })
    },
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect() {
      config.emitter.emit('disconnect')

      const provider = await this.getProvider()
      if (onAccountsChanged) {
        provider.removeListener('accountsChanged', onAccountsChanged)
        onAccountsChanged = undefined
      }
      if (onChainChanged) {
        provider.removeListener('chainChanged', onChainChanged)
        onChainChanged = undefined
      }
      if (onDisconnect) {
        provider.removeListener('disconnect', onDisconnect)
        onDisconnect = undefined
      }
    },
  }))
}
