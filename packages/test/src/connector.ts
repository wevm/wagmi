import {
  ChainNotConfiguredError,
  createConnector,
  normalizeChainId,
} from '@wagmi/core'
import {
  type Address,
  type EIP1193RequestFn,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  fromHex,
  getAddress,
  numberToHex,
} from 'viem'
import { rpc } from 'viem/utils'

export type TestConnectorParameters = {
  accounts: readonly [Address, ...Address[]]
  features?:
    | {
        failConnect?: boolean
        failSwitchChain?: boolean
        reconnect?: boolean
      }
    | undefined
}

export function testConnector(parameters: TestConnectorParameters) {
  const features = parameters.features ?? {}

  type Provider = ReturnType<typeof createWalletClient>

  let connected = false

  return createConnector<Provider>((config) => ({
    id: 'test',
    name: 'Test Connector',
    async connect({ chainId } = {}) {
      const provider = await this.getProvider()

      if (features.failConnect)
        throw new UserRejectedRequestError(new Error('Failed to connect.'))

      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      })

      let currentChainId = await this.getChainId()
      if (chainId && currentChainId !== chainId) {
        const chain = await this.switchChain!({ chainId })
        currentChainId = chain.id
      }

      connected = true

      return { accounts, chainId: currentChainId }
    },
    async disconnect() {
      connected = false
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
      const request: EIP1193RequestFn = async ({ method, params }) => {
        if (method === 'eth_requestAccounts') return parameters.accounts
        if (method === 'wallet_switchEthereumChain') return

        const { result } = await rpc.http(url, { body: { method, params } })
        return result
      }
      const walletClient = createWalletClient({
        account: parameters.accounts[0]!,
        chain,
        transport: custom({ request }),
      })
      return walletClient
    },
    async getChainId() {
      const provider = await this.getProvider()
      const hexChainId = await provider.request({ method: 'eth_chainId' })
      return fromHex(hexChainId, 'number')
    },
    async isAuthorized() {
      if (!features.reconnect) return false
      if (!connected) return false
      const accounts = await this.getAccounts()
      return !!accounts.length
    },
    async switchChain({ chainId }) {
      const provider = await this.getProvider()

      if (features.failSwitchChain)
        throw new UserRejectedRequestError(new Error('Failed to switch chain.'))

      const id = numberToHex(chainId)
      const chain = config.chains.find((x) => x.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })
      this.onChainChanged(chainId.toString())
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
