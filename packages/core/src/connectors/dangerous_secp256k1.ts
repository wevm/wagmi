import {
  type Address,
  createClient,
  type EIP1193Provider,
  getAddress,
  type Hex,
  isAddressEqual,
  type LocalAccount,
  SwitchChainError,
} from 'viem'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { walletNamespaceCompat } from 'viem/tempo'
import { ChainNotConfiguredError } from '../errors/config.js'
import { createConnector } from './createConnector.js'

/** @deprecated use `dangerous_secp256k1.Parameters` instead */
export type Dangerous_Secp256k1Parameters = dangerous_secp256k1.Parameters

dangerous_secp256k1.type = 'dangerous_secp256k1' as const

/**
 * Connector for a Secp256k1 EOA.
 *
 * WARNING: NOT RECOMMENDED FOR PRODUCTION USAGE.
 * This connector stores private keys in clear text, and are bound to the session
 * length of the storage used.
 */
export function dangerous_secp256k1(
  options: dangerous_secp256k1.Parameters = {},
) {
  let account: LocalAccount | undefined

  type Properties = {
    // TODO(v3): Make `withCapabilities: true` default behavior
    connect<withCapabilities extends boolean = false>(parameters: {
      capabilities?: { type?: 'sign-up' | undefined } | undefined
      chainId?: number | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    }): Promise<{
      accounts: readonly Address[]
      chainId: number
    }>
  }
  type Provider = Pick<EIP1193Provider, 'request'>
  type StorageItem = {
    'secp256k1.activeAddress': Address
    'secp256k1.lastActiveAddress': Address
    [key: `secp256k1.${string}.privateKey`]: Hex
  }

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'secp256k1',
    name: 'EOA (Secp256k1)',
    type: 'secp256k1',
    async setup() {
      const address = await config.storage?.getItem('secp256k1.activeAddress')
      const privateKey = await config.storage?.getItem(
        `secp256k1.${address}.privateKey`,
      )
      if (privateKey) account = privateKeyToAccount(privateKey)
      else if (
        address &&
        options.account &&
        isAddressEqual(address, options.account.address)
      )
        account = options.account
    },
    async connect(parameters = {}) {
      const address = await (async () => {
        if (
          'capabilities' in parameters &&
          parameters.capabilities?.type === 'sign-up'
        ) {
          const privateKey = generatePrivateKey()
          const account = privateKeyToAccount(privateKey)
          const address = account.address
          await config.storage?.setItem(
            `secp256k1.${address}.privateKey`,
            privateKey,
          )
          await config.storage?.setItem('secp256k1.activeAddress', address)
          await config.storage?.setItem('secp256k1.lastActiveAddress', address)
          return address
        }

        const address = await config.storage?.getItem(
          'secp256k1.lastActiveAddress',
        )
        const privateKey = await config.storage?.getItem(
          `secp256k1.${address}.privateKey`,
        )

        if (privateKey) account = privateKeyToAccount(privateKey)
        else if (options.account) {
          account = options.account
          await config.storage?.setItem(
            'secp256k1.lastActiveAddress',
            account.address,
          )
        }

        if (!account) throw new Error('account not found.')

        await config.storage?.setItem(
          'secp256k1.activeAddress',
          account.address,
        )
        return account.address
      })()

      const chainId = parameters.chainId ?? config.chains[0]?.id
      if (!chainId) throw new ChainNotConfiguredError()

      return {
        accounts: (parameters.withCapabilities
          ? [{ address }]
          : [address]) as never,
        chainId,
      }
    },
    async disconnect() {
      await config.storage?.removeItem('secp256k1.activeAddress')
      account = undefined
    },
    async getAccounts() {
      if (!account) return []
      return [getAddress(account.address)]
    },
    async getChainId() {
      return config.chains[0]?.id!
    },
    async isAuthorized() {
      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: notify
        console.error(
          'Connector.secp256k1: Failed to check authorization',
          error,
        )
        return false
      }
    },
    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())
      return chain
    },
    onAccountsChanged() {},
    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },
    async onDisconnect() {
      config.emitter.emit('disconnect')
      account = undefined
    },
    async getClient({ chainId } = {}) {
      const chain =
        config.chains.find((x) => x.id === chainId) ?? config.chains[0]
      if (!chain) throw new ChainNotConfiguredError()

      const transports = config.transports
      if (!transports) throw new ChainNotConfiguredError()

      const transport = transports[chain.id]
      if (!transport) throw new ChainNotConfiguredError()

      if (!account) throw new Error('account not found.')

      return createClient({
        account,
        chain,
        transport: walletNamespaceCompat(transport, {
          account,
        }),
      })
    },
    async getProvider({ chainId } = {}) {
      const { request } = await this.getClient!({ chainId })
      return { request }
    },
  }))
}

export declare namespace dangerous_secp256k1 {
  export type Parameters = {
    account?: LocalAccount | undefined
  }
}
