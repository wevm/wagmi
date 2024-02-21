import type {
  EthereumProviderConfig as BloctoEthereumProviderParameters,
  EthereumProviderInterface as BloctoProvider,
} from '@blocto/sdk'
import BloctoSDK from '@blocto/sdk'
import { createConnector, normalizeChainId } from '@wagmi/core'
import {
  RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'

export type BloctoParameters = {
  /**
   * Your app’s unique identifier that can be obtained at https://developers.blocto.app,
   * To get advanced features and support with Blocto.
   *
   * https://docs.blocto.app/blocto-sdk/register-app-id
   */
  appId?: string
}

blocto.type = 'blocto' as const
export function blocto({ appId }: BloctoParameters = {}) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  type Properties = {}
  type StorageItem = {
    store: any
    'wagmi.recentConnectorId': string
  }

  let walletProvider: BloctoProvider | undefined
  const handleConnectReset = () => {
    walletProvider = undefined
  }

  return createConnector<BloctoProvider, Properties, StorageItem>((config) => ({
    id: 'blocto',
    name: 'Blocto',
    type: blocto.type,
    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider({ chainId })

        config.emitter.emit('message', { type: 'connecting' })

        await provider.request({
          method: 'eth_requestAccounts',
        })

        const accounts = await this.getAccounts()
        const _chainId = await this.getChainId()

        return { accounts, chainId: _chainId }
      } catch (error: unknown) {
        handleConnectReset()
        throw error
      }
    },
    async disconnect() {
      const provider = await this.getProvider()
      await provider.request({ method: 'wallet_disconnect' })
      handleConnectReset()
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
      const chainId = await provider?.request({ method: 'eth_chainId' })
      return normalizeChainId(chainId)
    },
    async getProvider({ chainId } = {}) {
      if (!walletProvider) {
        const store = await config.storage?.getItem('store')
        const lastConnectedChainId = store?.state?.chainId
        const desiredChainId = chainId ?? lastConnectedChainId
        const ethereum: BloctoEthereumProviderParameters = {
          chainId: desiredChainId,
          rpc: config.chains.find((x) => x.id === desiredChainId)?.rpcUrls
            .default.http[0],
        }

        walletProvider = new BloctoSDK({ ethereum, appId })?.ethereum
        if (!walletProvider) {
          throw new Error('Blocto SDK is not initialized.')
        }

        walletProvider.on('accountsChanged', this.onAccountsChanged.bind(this))
        walletProvider.on('chainChanged', this.onChainChanged.bind(this))
        walletProvider.on('disconnect', this.onDisconnect.bind(this))
      }

      return Promise.resolve(walletProvider)
    },
    async isAuthorized() {
      const recentConnectorId = await config.storage?.getItem(
        'recentConnectorId',
      )
      if (recentConnectorId !== this.id) return false

      const accounts = await this.getAccounts()
      return !!accounts.length
    },
    async switchChain({ chainId }) {
      try {
        const provider = await this.getProvider()
        const id = numberToHex(chainId)
        const chain = config.chains.find((x) => x.id === chainId)
        const networks = await provider.supportChainList()
        const evmSupportMap = networks.reduce(
          (a: any, v: any) => ({ ...a, [v.chainId]: v }),
          {},
        )
        const isBloctoSupportChain = evmSupportMap[`${chainId}`]

        if (!chain) {
          throw new SwitchChainError(new Error(`Chain not in config: ${id}`))
        }

        if (!isBloctoSupportChain) {
          throw new SwitchChainError(
            new Error(`Blocto unsupported chain: ${id}`),
          )
        }

        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: id, rpcUrls: chain?.rpcUrls.default.http }],
        })
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: id }],
        })

        return chain
      } catch (err) {
        const error = err as RpcError
        if (error.code === UserRejectedRequestError.code)
          throw new UserRejectedRequestError(error)

        throw new SwitchChainError(error as Error)
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onAccountsChanged() {},
    async onChainChanged(chainId: string) {
      const accounts = await this.getAccounts()
      config.emitter.emit('change', {
        chainId: normalizeChainId(chainId),
        accounts,
      })
    },
    async onDisconnect() {
      config.emitter.emit('disconnect')
    },
  }))
}
