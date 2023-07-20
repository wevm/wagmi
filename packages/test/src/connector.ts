import {
  ChainNotConfiguredError,
  createConnector,
  normalizeChainId,
} from '@wagmi/core'
import {
  type Address,
  type EIP1193RequestFn,
  type Hex,
  RpcRequestError,
  SwitchChainError,
  type Transport,
  UserRejectedRequestError,
  type WalletRpcSchema,
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
        connectError?: boolean | Error
        switchChainError?: boolean | Error
        signMessageError?: boolean | Error
        signTypedDataError?: boolean | Error
        reconnect?: boolean
      }
    | undefined
}

export function testConnector(parameters: TestConnectorParameters) {
  const features = parameters.features ?? {}

  type Provider = ReturnType<
    Transport<'custom', {}, EIP1193RequestFn<WalletRpcSchema>>
  >
  let connected = false

  return createConnector<Provider>((config) => ({
    id: 'test',
    name: 'Test Connector',
    async connect({ chainId } = {}) {
      if (features.connectError) {
        if (typeof features.connectError === 'boolean')
          throw new UserRejectedRequestError(new Error('Failed to connect.'))
        throw features.connectError
      }

      const provider = await this.getProvider()
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

        // Change `personal_sign` to `eth_sign` and swap params
        if (method === 'personal_sign') {
          if (features.signMessageError) {
            if (typeof features.signMessageError === 'boolean')
              throw new UserRejectedRequestError(
                new Error('Failed to sign message.'),
              )
            throw features.signMessageError
          }

          method = 'eth_sign'
          type Params = [data: Hex, address: Address]
          params = [(params as Params)[1], (params as Params)[0]]
        }

        if (method === 'eth_signTypedData_v4')
          if (features.signTypedDataError) {
            if (typeof features.signTypedDataError === 'boolean')
              throw new UserRejectedRequestError(
                new Error('Failed to sign typed data.'),
              )
            throw features.signTypedDataError
          }

        const { error, result } = await rpc.http(url, {
          body: { method, params },
        })
        if (error)
          throw new RpcRequestError({ body: { method, params }, error, url })

        return result
      }
      return custom({ request })({ retryCount: 0 })
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
      if (features.switchChainError) {
        if (typeof features.switchChainError === 'boolean')
          throw new UserRejectedRequestError(
            new Error('Failed to switch chain.'),
          )
        throw features.switchChainError
      }

      const provider = await this.getProvider()
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
