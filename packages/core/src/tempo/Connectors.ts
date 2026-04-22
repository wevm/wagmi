import type {
  Provider as AccountsProvider,
  Rpc as AccountsRpc,
  dangerous_secp256k1 as accountsDangerousSecp256k1,
  dialog as accountsDialog,
  webAuthn as accountsWebAuthn,
} from 'accounts'
import {
  type Address,
  numberToHex,
  type ProviderConnectInfo,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  withRetry,
} from 'viem'

import { createConnector } from '../connectors/createConnector.js'
import type { Connector } from '../createConfig.js'
import { ChainNotConfiguredError } from '../errors/config.js'

type AccountsModule = {
  dialog: typeof accountsDialog
  Provider: typeof AccountsProvider
  dangerous_secp256k1: typeof accountsDangerousSecp256k1
  webAuthn: typeof accountsWebAuthn
}
type AccountsDialogParameters = NonNullable<
  Parameters<typeof accountsDialog>[0]
>
type AccountsProviderParameters = NonNullable<
  Parameters<typeof AccountsProvider.create>[0]
>
type AccountsAdapter = NonNullable<AccountsProviderParameters['adapter']>
type AccountsDangerousSecp256k1Parameters = NonNullable<
  Parameters<typeof accountsDangerousSecp256k1>[0]
>
type AccountsStorage = NonNullable<AccountsProviderParameters['storage']>
type AccountsWebAuthnParameters = NonNullable<
  Parameters<typeof accountsWebAuthn>[0]
>
type Provider = Pick<
  ReturnType<typeof AccountsProvider.create>,
  'getAccount' | 'getClient' | 'on' | 'removeListener' | 'request'
>
type AccountsConnectParameters = NonNullable<
  AccountsRpc.wallet_connect.Decoded['params']
>[0]
type CapabilitiesRequest = AccountsConnectParameters['capabilities']
type InternalAccount =
  AccountsRpc.wallet_connect.Encoded['returns']['accounts'][number]

const tempoWalletIcon =
  'data:image/svg+xml,<svg width="269" height="269" viewBox="0 0 269 269" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="269" height="269" fill="black"/><path d="M123.273 190.794H93.445L121.09 105.318H85.7334L93.445 80.2642H191.95L184.238 105.318H150.773L123.273 190.794Z" fill="white"/></svg>'

/** @deprecated use `tempoWallet.Parameters` instead */
export type TempoWalletParameters = tempoWallet.Parameters

/**
 * Connector for the Tempo Wallet dialog.
 */
export function tempoWallet(parameters: tempoWallet.Parameters = {}) {
  const {
    dialog: dialogOption,
    host,
    icon = tempoWalletIcon,
    name,
    rdns,
    theme,
    ...providerParameters
  } = parameters

  return _setup({
    createAdapter(accounts) {
      return accounts.dialog({
        dialog: dialogOption,
        host,
        icon,
        name,
        rdns,
        theme,
      })
    },
    icon,
    id: rdns ?? 'xyz.tempo',
    name: name ?? 'Tempo Wallet',
    providerParameters,
    rdns: rdns ?? 'xyz.tempo',
    type: 'injected',
  })
}

export declare namespace tempoWallet {
  export type Parameters = Omit<
    AccountsProviderParameters,
    'adapter' | 'chains'
  > &
    AccountsDialogParameters

  export type ConnectParameters<withCapabilities extends boolean = false> =
    setup.ConnectParameters<withCapabilities>

  export type ConnectReturnType<withCapabilities extends boolean = false> =
    setup.ConnectReturnType<withCapabilities>
}

/** @deprecated use `webAuthn.Parameters` instead */
export type WebAuthnParameters = webAuthn.Parameters

webAuthn.type = 'webAuthn' as const

/**
 * Connector for a WebAuthn EOA.
 */
export function webAuthn(parameters: webAuthn.Parameters = {}) {
  const { authUrl, ceremony, icon, name, rdns, ...providerParameters } =
    parameters

  return _setup({
    createAdapter(accounts) {
      return ceremony
        ? accounts.webAuthn({ ceremony, icon, name, rdns })
        : accounts.webAuthn({ authUrl, icon, name, rdns })
    },
    icon,
    id: 'webAuthn',
    name: name ?? 'EOA (WebAuthn)',
    providerParameters,
    rdns,
    type: 'webAuthn',
  })
}

export declare namespace webAuthn {
  export type Parameters = AccountsWebAuthnParameters &
    Omit<AccountsProviderParameters, 'adapter' | 'chains'>
}

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
  parameters: dangerous_secp256k1.Parameters = {},
) {
  const { icon, name, privateKey, rdns, ...providerParameters } = parameters

  return _setup({
    createAdapter(accounts) {
      return accounts.dangerous_secp256k1({ icon, name, privateKey, rdns })
    },
    icon,
    id: 'secp256k1',
    name: name ?? 'EOA (Secp256k1)',
    providerParameters,
    rdns,
    type: 'secp256k1',
  })
}

export declare namespace dangerous_secp256k1 {
  export type Parameters = AccountsDangerousSecp256k1Parameters &
    Omit<AccountsProviderParameters, 'adapter' | 'chains'>
}

function createAccountsStorage(
  storage: {
    getItem(key: string, defaultValue?: null | undefined): unknown
    setItem(key: string, value: unknown): void | Promise<void>
    removeItem(key: string): void | Promise<void>
  },
  namespace: string,
): AccountsStorage {
  const prefix = `accounts.${namespace}`
  return {
    async getItem<value>(key: string) {
      return ((await storage.getItem(`${prefix}.${key}`, null)) ??
        null) as value | null
    },
    async removeItem(key) {
      await storage.removeItem(`${prefix}.${key}`)
    },
    async setItem(key, value) {
      await storage.setItem(`${prefix}.${key}`, value)
    },
  }
}

function createMemoryAccountsStorage(): AccountsStorage {
  const map = new Map<string, unknown>()
  return {
    async getItem<value>(key: string) {
      return (map.get(key) ?? null) as value | null
    },
    async removeItem(key) {
      map.delete(key)
    },
    async setItem(key, value) {
      map.set(key, value)
    },
  }
}

function _setup(parameters: setup.Parameters) {
  type Properties = {
    connect<withCapabilities extends boolean = false>(
      parameters?: setup.ConnectParameters<withCapabilities>,
    ): Promise<setup.ConnectReturnType<withCapabilities>>
  }

  return createConnector<Provider, Properties>((config) => {
    const chains = config.chains
    let providerPromise: Promise<Provider> | undefined

    let accountsChanged: Connector['onAccountsChanged'] | undefined
    let chainChanged: ((chain: string) => void) | undefined
    let connect: ((connectInfo: ProviderConnectInfo) => void) | undefined
    let disconnect: ((error?: Error | undefined) => void) | undefined

    async function getAccountsModule() {
      return await import('accounts').catch(() => {
        throw new Error('dependency "accounts" not found')
      })
    }

    async function getProvider() {
      providerPromise ??= (async () => {
        const accounts = await getAccountsModule()
        return accounts.Provider.create({
          ...parameters.providerParameters,
          adapter: parameters.createAdapter(accounts),
          chains: config.chains as never,
          storage:
            parameters.providerParameters.storage ??
            (config.storage
              ? createAccountsStorage(config.storage, parameters.id)
              : createMemoryAccountsStorage()),
        }) as unknown as Provider
      })()

      return await providerPromise
    }

    return {
      icon: parameters.icon,
      id: parameters.id,
      name: parameters.name,
      rdns: parameters.rdns,
      type: parameters.type,
      async connect(connectParameters = {}) {
        const { chainId, isReconnecting, withCapabilities } = connectParameters
        const capabilities =
          'capabilities' in connectParameters
            ? connectParameters.capabilities
            : undefined

        let accounts: readonly InternalAccount[] = []
        let currentChainId: number | undefined

        if (isReconnecting) {
          accounts = await this.getAccounts()
            .then((accounts) =>
              accounts.map((address) => ({ address, capabilities: {} })),
            )
            .catch(() => [])
        }

        try {
          if (!accounts.length && !isReconnecting) {
            const provider = await getProvider()
            const response = (await provider.request({
              method: 'wallet_connect',
              params: [
                {
                  ...(chainId ? { chainId } : {}),
                  ...(capabilities ? { capabilities } : {}),
                },
              ] as never,
            })) as AccountsRpc.wallet_connect.Encoded['returns']
            accounts = response.accounts
          }

          currentChainId ??= await this.getChainId()
          if (!currentChainId) throw new ChainNotConfiguredError()

          const provider = await getProvider()
          if (connect) {
            provider.removeListener('connect', connect)
            connect = undefined
          }
          if (!accountsChanged) {
            accountsChanged = this.onAccountsChanged.bind(this)
            provider.on('accountsChanged', accountsChanged as never)
          }
          if (!chainChanged) {
            chainChanged = this.onChainChanged.bind(this)
            provider.on('chainChanged', chainChanged)
          }
          if (!disconnect) {
            disconnect = this.onDisconnect.bind(this)
            provider.on('disconnect', disconnect)
          }

          return {
            accounts: (withCapabilities
              ? accounts
              : accounts.map((account) => account.address)) as never,
            chainId: currentChainId,
          }
        } catch (error) {
          const rpcError = error as RpcError
          if (rpcError.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(rpcError)
          throw rpcError
        }
      },
      async disconnect() {
        const provider = await getProvider()

        if (chainChanged) {
          provider.removeListener('chainChanged', chainChanged)
          chainChanged = undefined
        }
        if (disconnect) {
          provider.removeListener('disconnect', disconnect)
          disconnect = undefined
        }
        if (!connect) {
          connect = this.onConnect?.bind(this)
          if (connect) provider.on('connect', connect)
        }

        await provider.request({ method: 'wallet_disconnect' })
      },
      async getAccounts() {
        const provider = await getProvider()
        return await provider.request({ method: 'eth_accounts' })
      },
      async getChainId() {
        const provider = await getProvider()
        return Number(await provider.request({ method: 'eth_chainId' }))
      },
      async getClient({ chainId } = {}) {
        const provider = await getProvider()
        return Object.assign(provider.getClient({ chainId }), {
          account: provider.getAccount(),
        }) as never
      },
      async getProvider() {
        return await getProvider()
      },
      async isAuthorized() {
        try {
          const accounts = await withRetry(() => this.getAccounts())
          return !!accounts.length
        } catch {
          return false
        }
      },
      onAccountsChanged(accounts) {
        config.emitter.emit('change', {
          accounts: accounts as readonly Address[],
        })
      },
      onChainChanged(chain) {
        config.emitter.emit('change', { chainId: Number(chain) })
      },
      async onConnect(connectInfo) {
        const accounts = await this.getAccounts()
        if (accounts.length === 0) return

        const chainId = Number(connectInfo.chainId)
        config.emitter.emit('connect', { accounts, chainId })

        const provider = await getProvider()
        if (connect) {
          provider.removeListener('connect', connect)
          connect = undefined
        }
        if (!accountsChanged) {
          accountsChanged = this.onAccountsChanged.bind(this)
          provider.on('accountsChanged', accountsChanged as never)
        }
        if (!chainChanged) {
          chainChanged = this.onChainChanged.bind(this)
          provider.on('chainChanged', chainChanged)
        }
        if (!disconnect) {
          disconnect = this.onDisconnect.bind(this)
          provider.on('disconnect', disconnect)
        }
      },
      async onDisconnect(_error) {
        const provider = await getProvider()

        config.emitter.emit('disconnect')

        if (chainChanged) {
          provider.removeListener('chainChanged', chainChanged)
          chainChanged = undefined
        }
        if (disconnect) {
          provider.removeListener('disconnect', disconnect)
          disconnect = undefined
        }
        if (!connect) {
          connect = this.onConnect?.bind(this)
          if (connect) provider.on('connect', connect)
        }
      },
      async setup() {
        if (!connect) {
          const provider = await getProvider()
          connect = this.onConnect?.bind(this)
          if (connect) provider.on('connect', connect)
        }
      },
      async switchChain({ chainId }) {
        const chain = chains.find((chain) => chain.id === chainId)
        if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

        const provider = await getProvider()
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chainId) }],
        })

        return chain
      },
    }
  })
}

export declare namespace setup {
  export type Parameters = {
    createAdapter: (accounts: AccountsModule) => AccountsAdapter
    icon?: string | undefined
    id: string
    name: string
    providerParameters: Omit<AccountsProviderParameters, 'adapter' | 'chains'>
    rdns?: string | readonly string[] | undefined
    type: string
  }

  export type ConnectParameters<withCapabilities extends boolean = false> = {
    capabilities?: CapabilitiesRequest | undefined
    chainId?: number | undefined
    isReconnecting?: boolean | undefined
    withCapabilities?: withCapabilities | boolean | undefined
  }

  export type ConnectReturnType<withCapabilities extends boolean = false> = {
    accounts: withCapabilities extends true
      ? readonly InternalAccount[]
      : readonly Address[]
    chainId: number
  }
}
