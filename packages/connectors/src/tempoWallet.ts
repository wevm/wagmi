import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
} from '@wagmi/core'
import type {
  Provider as AccountsProvider,
  Rpc as AccountsRpc,
  dialog as accountsDialog,
} from 'accounts'
import {
  type Address,
  numberToHex,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from 'viem'

export type TempoWalletParameters = Omit<
  AccountsProviderParameters,
  'adapter'
> &
  AccountsDialogParameters

type AccountsProviderParameters = NonNullable<
  Parameters<typeof AccountsProvider.create>[0]
>
type AccountsDialogParameters = NonNullable<
  Parameters<typeof accountsDialog>[0]
>

export function tempoWallet(parameters: TempoWalletParameters = {}) {
  type Provider = Pick<
    ReturnType<typeof AccountsProvider.create>,
    'on' | 'removeListener' | 'request'
  >
  type Properties = {
    connect<withCapabilities extends boolean = false>(
      parameters?: tempoWallet.ConnectParameters<withCapabilities>,
    ): Promise<tempoWallet.ConnectReturnType<withCapabilities>>
  }

  const {
    dialog: dialogOption,
    host,
    icon,
    name,
    rdns,
    ...providerParameters
  } = parameters

  return createConnector<Provider, Properties>((wagmiConfig) => {
    const chains = wagmiConfig.chains

    let providerPromise: Promise<Provider> | undefined

    let accountsChanged: Connector['onAccountsChanged'] | undefined
    let chainChanged: Connector['onChainChanged'] | undefined
    let connect: Connector['onConnect'] | undefined
    let disconnect: Connector['onDisconnect'] | undefined

    async function getAccountsModule() {
      return await import('accounts').catch(() => {
        throw new Error('dependency "accounts" not found')
      })
    }

    return {
      async connect(parameters = {}) {
        const { chainId, isReconnecting, withCapabilities } = parameters
        const capabilities =
          'capabilities' in parameters ? parameters.capabilities : undefined

        let accounts: readonly AccountsRpc.wallet_connect.Encoded['returns']['accounts'][number][] =
          []
        let currentChainId: number | undefined

        if (isReconnecting) {
          accounts = await this.getAccounts()
            .then((accounts) =>
              accounts.map((address) => ({ address, capabilities: {} })),
            )
            .catch(() => [])
        }

        const provider = await this.getProvider()

        try {
          if (!accounts.length && !isReconnecting) {
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
        const provider = await this.getProvider()

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
          if (connect) provider.on('connect', connect as never)
        }

        await provider.request({ method: 'wallet_disconnect' })
      },
      async getAccounts() {
        const provider = await this.getProvider()
        return await provider.request({ method: 'eth_accounts' })
      },
      async getChainId() {
        const provider = await this.getProvider()
        const hexChainId = await provider.request({ method: 'eth_chainId' })
        return Number(hexChainId)
      },
      async getProvider() {
        providerPromise ??= (async () => {
          const { Provider, dialog } = await getAccountsModule()
          return Provider.create({
            ...providerParameters,
            adapter: dialog({
              dialog: dialogOption,
              host,
              icon: icon,
              name,
              rdns,
            }),
            chains: chains as never,
          })
        })()

        return await providerPromise
      },
      icon:
        icon ??
        'data:image/svg+xml,<svg width="269" height="269" viewBox="0 0 269 269" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="269" height="269" fill="black"/><path d="M123.273 190.794H93.445L121.09 105.318H85.7334L93.445 80.2642H191.95L184.238 105.318H150.773L123.273 190.794Z" fill="white"/></svg>',
      id: rdns ?? 'xyz.tempo',
      async isAuthorized() {
        try {
          const accounts = await this.getAccounts()
          return !!accounts.length
        } catch {
          return false
        }
      },
      name: name ?? 'Tempo Wallet',
      async onAccountsChanged(accounts) {
        wagmiConfig.emitter.emit('change', {
          accounts: accounts as readonly Address[],
        })
      },
      onChainChanged(chain) {
        const chainId = Number(chain)
        wagmiConfig.emitter.emit('change', { chainId })
      },
      async onConnect(connectInfo) {
        const accounts = await this.getAccounts()
        if (accounts.length === 0) return

        const chainId = Number(connectInfo.chainId)
        wagmiConfig.emitter.emit('connect', { accounts, chainId })

        const provider = await this.getProvider()
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
        const provider = await this.getProvider()

        wagmiConfig.emitter.emit('disconnect')

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
          if (connect) provider.on('connect', connect as never)
        }
      },
      rdns: rdns ?? 'xyz.tempo',
      async setup() {
        if (!connect) {
          const provider = await this.getProvider()
          connect = this.onConnect?.bind(this)
          if (connect) provider.on('connect', connect as never)
        }
      },
      async switchChain({ chainId }) {
        const chain = chains.find((chain) => chain.id === chainId)
        if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

        const provider = await this.getProvider()
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: numberToHex(chainId) }],
        })

        return chain
      },
      type: 'injected',
    }
  })
}

export declare namespace tempoWallet {
  export type ConnectParameters<withCapabilities extends boolean = false> = {
    capabilities?:
      | NonNullable<
          AccountsRpc.wallet_connect.Decoded['params']
        >[0]['capabilities']
      | undefined
    chainId?: number | undefined
    isReconnecting?: boolean | undefined
    withCapabilities?: withCapabilities | boolean | undefined
  }

  export type ConnectReturnType<withCapabilities extends boolean = false> = {
    accounts: withCapabilities extends true
      ? readonly AccountsRpc.wallet_connect.Encoded['returns']['accounts'][number][]
      : readonly Address[]
    chainId: number
  }
}
