import {
  type Chain,
  ChainNotConfiguredError,
  createConnector,
  normalizeChainId,
} from '@wagmi/core'
import {
  type Account,
  type Address,
  type CustomTransport,
  type Requests,
  SwitchChainError,
  type WalletClient,
  createPublicClient,
  createWalletClient,
  custom,
  fromHex,
  getAddress,
  http,
  numberToHex,
} from 'viem'
import { rpc } from 'viem/utils'

export type TestConnectorParameters = {
  accounts: readonly [Address, ...Address[]]
  features?:
    | {
        isAuthorized?: boolean
        shimDisconnect?: boolean
      }
    | undefined
}

export function testConnector(parameters: TestConnectorParameters) {
  const features = parameters.features ?? {}
  const shimDisconnect = features.shimDisconnect ?? true

  type Provider = WalletClient<CustomTransport, Chain, Account<Address>>
  type Properties = {}
  type StorageItem = {}

  let connected = false

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'test',
    name: 'Test Connector',
    async connect({ chainId } = {}) {
      const provider = await this.getProvider()
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      })

      let currentChainId = await this.getChainId()
      if (chainId && currentChainId !== chainId) {
        const chain = await this.switchChain!({ chainId })
        currentChainId = chain.id
      }

      if (shimDisconnect) connected = true

      return { accounts, chainId: currentChainId }
    },
    async disconnect() {
      if (shimDisconnect) connected = false
    },
    async getAccounts() {
      const provider = await this.getProvider()
      const accounts = await provider.request({ method: 'eth_accounts' })
      return accounts.map(getAddress)
    },
    async getProvider({ chainId } = {}) {
      const chain =
        config.chains.find((x) => x.id === chainId) ?? config.chains[0]
      const url = chain.rpcUrls.default.http[0]!
      const publicClient = createPublicClient({
        chain,
        transport: http(url),
        pollingInterval: 1_000,
      })
      const requests: Requests = {
        async request({ method, params }) {
          if (method === 'wallet_switchEthereumChain') {
            return
          }

          const { result } = await rpc.http(url, { body: { method, params } })
          return result
        },
      }
      const walletClient = createWalletClient({
        account: parameters.accounts[0]!,
        chain: publicClient.chain,
        transport: custom({
          ...publicClient,
          ...requests,
        }),
      })
      return walletClient
    },
    async getChainId() {
      const provider = await this.getProvider()
      const hexChainId = await provider.request({ method: 'eth_chainId' })
      return fromHex(hexChainId, 'number')
    },
    async isAuthorized() {
      if (features.isAuthorized === false) return false
      if (shimDisconnect && !connected) return false
      const accounts = await this.getAccounts()
      return !!accounts.length
    },
    async switchChain({ chainId }) {
      const provider = await this.getProvider()

      const id = numberToHex(chainId)
      const chain = config.chains.find((x) => x.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
      return chain
    },
    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect()
      else config.emitter.emit('change', { accounts: accounts.map(getAddress) })
    },
    onChainChanged(chain) {
      const chainId = normalizeChainId(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect(_error) {
      config.emitter.emit('disconnect')
      connected = false
    },
  }))
}
