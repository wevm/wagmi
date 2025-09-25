import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
} from '@wagmi/core'
import type { ExactPartial } from '@wagmi/core/internal'
import { type Porto, RpcSchema } from 'porto'
import { z } from 'porto/internal'
import {
  type Address,
  getAddress,
  numberToHex,
  type ProviderConnectInfo,
  type RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  withRetry,
} from 'viem'

export type PortoParameters = ExactPartial<Porto.Config>

export function porto(parameters: PortoParameters = {}) {
  type Provider = ReturnType<typeof Porto.create>['provider']
  type Properties = {
    connect<withCapabilities extends boolean = false>(parameters?: {
      chainId?: number | undefined
      capabilities?:
        | (RpcSchema.wallet_connect.Capabilities & {
            force?: boolean | undefined
          })
        | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    }): Promise<{
      accounts: withCapabilities extends true
        ? readonly {
            address: Address
            capabilities: RpcSchema.wallet_connect.ResponseCapabilities
          }[]
        : readonly Address[]
      chainId: number
    }>
    onConnect(connectInfo: ProviderConnectInfo): void
  }

  return createConnector<Provider, Properties>((wagmiConfig) => {
    const chains = wagmiConfig.chains ?? parameters.chains ?? []

    const transports = (() => {
      if (wagmiConfig.transports) return wagmiConfig.transports
      return parameters.transports
    })()

    let porto_promise: Promise<any> | undefined

    let accountsChanged: Connector['onAccountsChanged'] | undefined
    let chainChanged: Connector['onChainChanged'] | undefined
    let connect: Connector['onConnect'] | undefined
    let disconnect: Connector['onDisconnect'] | undefined

    return {
      async connect({ chainId = chains[0].id, ...rest } = {}) {
        const isReconnecting =
          ('isReconnecting' in rest && rest.isReconnecting) || false
        const withCapabilities =
          ('withCapabilities' in rest && rest.withCapabilities) || false

        let accounts: readonly (Address | { address: Address })[] = []
        let currentChainId: number | undefined

        if (isReconnecting) {
          ;[accounts, currentChainId] = await Promise.all([
            this.getAccounts().catch(() => []),
            this.getChainId().catch(() => undefined),
          ])
          if (chainId && currentChainId !== chainId) {
            const chain = await this.switchChain!({ chainId }).catch(
              (error) => {
                if (error.code === UserRejectedRequestError.code) throw error
                return { id: currentChainId }
              },
            )
            currentChainId = chain?.id ?? currentChainId
          }
        }

        const provider = (await this.getProvider()) as Provider

        try {
          if (!accounts?.length && !isReconnecting) {
            const res = await provider.request({
              method: 'wallet_connect',
              params: [
                {
                  ...('capabilities' in rest
                    ? {
                        capabilities: z.encode(
                          RpcSchema.wallet_connect.Capabilities,
                          rest.capabilities ?? {},
                        ),
                      }
                    : {}),
                  chainIds: [
                    numberToHex(chainId),
                    ...chains
                      .filter((x) => x.id !== chainId)
                      .map((x) => numberToHex(x.id)),
                  ],
                },
              ],
            })
            accounts = res.accounts
            currentChainId = Number(res.chainIds[0])
          }

          if (!currentChainId) throw new ChainNotConfiguredError()

          // Manage EIP-1193 event listeners
          // https://eips.ethereum.org/EIPS/eip-1193#events
          if (connect) {
            provider.removeListener('connect', connect)
            connect = undefined
          }
          if (!accountsChanged) {
            accountsChanged = this.onAccountsChanged.bind(this)
            // Porto Provider uses Ox, which uses `readonly Address.Address[]` for `accountsChanged`,
            // while Connector `accountsChanged` is `string[]`
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
            accounts: accounts.map((account) => {
              if (typeof account === 'object')
                return withCapabilities ? account : account.address
              return withCapabilities
                ? { address: account, capabilities: {} }
                : account
            }) as never,
            chainId: currentChainId,
          }
        } catch (err) {
          const error = err as RpcError
          if (error.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(error)
          throw error
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
          connect = this.onConnect.bind(this)
          provider.on('connect', connect)
        }

        await provider.request({ method: 'wallet_disconnect' })
      },
      async getAccounts() {
        const provider = await this.getProvider()
        const accounts = await provider.request({
          method: 'eth_accounts',
        })
        return accounts.map((x) => getAddress(x))
      },
      async getChainId() {
        const provider = await this.getProvider()
        const hexChainId = await provider.request({
          method: 'eth_chainId',
        })
        return Number(hexChainId)
      },
      async getProvider() {
        porto_promise ??= (async () => {
          const { Porto } = await import('porto')
          return Porto.create({
            ...parameters,
            announceProvider: false,
            chains: chains as never,
            transports: transports as never,
          })
        })()
        return (await porto_promise).provider
      },
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIyIiBoZWlnaHQ9IjQyMiIgdmlld0JveD0iMCAwIDQyMiA0MjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MjIiIGhlaWdodD0iNDIyIiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMV8xNSkiPgo8cGF0aCBkPSJNODEgMjg2LjM2NkM4MSAyODAuODkzIDg1LjQ1MDUgMjc2LjQ1NSA5MC45NDA0IDI3Ni40NTVIMzI5LjUxMUMzMzUuMDAxIDI3Ni40NTUgMzM5LjQ1MiAyODAuODkzIDMzOS40NTIgMjg2LjM2NlYzMDYuMTg4QzMzOS40NTIgMzExLjY2MiAzMzUuMDAxIDMxNi4wOTkgMzI5LjUxMSAzMTYuMDk5SDkwLjk0MDRDODUuNDUwNSAzMTYuMDk5IDgxIDMxMS42NjIgODEgMzA2LjE4OFYyODYuMzY2WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTAuOTQwNCAyMzQuODI4Qzg1LjQ1MDUgMjM0LjgyOCA4MSAyMzkuMjY2IDgxIDI0NC43MzlWMjcxLjUzMUM4My44NDMyIDI2OS42MzMgODcuMjYyMiAyNjguNTI2IDkwLjk0MDQgMjY4LjUyNkgzMjkuNTExQzMzMy4xODggMjY4LjUyNiAzMzYuNjA4IDI2OS42MzMgMzM5LjQ1MiAyNzEuNTMxVjI0NC43MzlDMzM5LjQ1MiAyMzkuMjY2IDMzNS4wMDEgMjM0LjgyOCAzMjkuNTExIDIzNC44MjhIOTAuOTQwNFpNMzM5LjQ1MiAyODYuMzY2QzMzOS40NTIgMjgwLjg5MyAzMzUuMDAxIDI3Ni40NTUgMzI5LjUxMSAyNzYuNDU1SDkwLjk0MDRDODUuNDUwNSAyNzYuNDU1IDgxIDI4MC44OTMgODEgMjg2LjM2NlYzMDYuMTlDODEgMzExLjY2NCA4NS40NTA1IDMxNi4xMDEgOTAuOTQwNCAzMTYuMTAxSDMyOS41MTFDMzM1LjAwMSAzMTYuMTAxIDMzOS40NTIgMzExLjY2NCAzMzkuNDUyIDMwNi4xOVYyODYuMzY2WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTAuOTQwNCAxOTMuMjAxQzg1LjQ1MDUgMTkzLjIwMSA4MSAxOTcuNjM4IDgxIDIwMy4xMTJWMjI5LjkwM0M4My44NDMyIDIyOC4wMDYgODcuMjYyMiAyMjYuODk5IDkwLjk0MDQgMjI2Ljg5OUgzMjkuNTExQzMzMy4xODggMjI2Ljg5OSAzMzYuNjA4IDIyOC4wMDYgMzM5LjQ1MiAyMjkuOTAzVjIwMy4xMTJDMzM5LjQ1MiAxOTcuNjM4IDMzNS4wMDEgMTkzLjIwMSAzMjkuNTExIDE5My4yMDFIOTAuOTQwNFpNMzM5LjQ1MiAyNDQuNzM5QzMzOS40NTIgMjM5LjI2NSAzMzUuMDAxIDIzNC44MjggMzI5LjUxMSAyMzQuODI4SDkwLjk0MDRDODUuNDUwNSAyMzQuODI4IDgxIDIzOS4yNjUgODEgMjQ0LjczOVYyNzEuNTNDODEuMjE3NSAyNzEuMzg1IDgxLjQzODMgMjcxLjI0NSA4MS42NjI0IDI3MS4xMDlDODMuODMyNSAyNjkuNzk0IDg2LjMwNTQgMjY4LjkyNyA4OC45NTIzIDI2OC42MzVDODkuNjA1MSAyNjguNTYzIDkwLjI2ODQgMjY4LjUyNiA5MC45NDA0IDI2OC41MjZIMzI5LjUxMUMzMzAuMTgzIDI2OC41MjYgMzMwLjg0NiAyNjguNTYzIDMzMS40OTggMjY4LjYzNUMzMzQuNDE5IDI2OC45NTcgMzM3LjEyOCAyNjkuOTggMzM5LjQ1MiAyNzEuNTNWMjQ0LjczOVpNMzM5LjQ1MiAyODYuMzY2QzMzOS40NTIgMjgxLjAyMSAzMzUuMjA2IDI3Ni42NjMgMzI5Ljg5MyAyNzYuNDYyQzMyOS43NjcgMjc2LjQ1NyAzMjkuNjQgMjc2LjQ1NSAzMjkuNTExIDI3Ni40NTVIOTAuOTQwNEM4NS40NTA1IDI3Ni40NTUgODEgMjgwLjg5MyA4MSAyODYuMzY2VjMwNi4xODhDODEgMzExLjY2MiA4NS40NTA1IDMxNi4xMDEgOTAuOTQwNCAzMTYuMTAxSDMyOS41MTFDMzM1LjAwMSAzMTYuMTAxIDMzOS40NTIgMzExLjY2MiAzMzkuNDUyIDMwNi4xODhWMjg2LjM2NloiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBvcGFjaXR5PSIwLjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOTguMDE0NiAxMDRDODguNjE3NyAxMDQgODEgMTExLjU5NSA4MSAxMjAuOTY1VjE4OC4yNzZDODMuODQzMiAxODYuMzc5IDg3LjI2MjIgMTg1LjI3MiA5MC45NDA0IDE4NS4yNzJIMzI5LjUxMUMzMzMuMTg4IDE4NS4yNzIgMzM2LjYwOCAxODYuMzc5IDMzOS40NTIgMTg4LjI3NlYxMjAuOTY1QzMzOS40NTIgMTExLjU5NSAzMzEuODMzIDEwNCAzMjIuNDM3IDEwNEg5OC4wMTQ2Wk0zMzkuNDUyIDIwMy4xMTJDMzM5LjQ1MiAxOTcuNjM4IDMzNS4wMDEgMTkzLjIwMSAzMjkuNTExIDE5My4yMDFIOTAuOTQwNEM4NS40NTA1IDE5My4yMDEgODEgMTk3LjYzOCA4MSAyMDMuMTEyVjIyOS45MDNDODEuMjE3NSAyMjkuNzU4IDgxLjQzODMgMjI5LjYxOCA4MS42NjI0IDIyOS40ODJDODMuODMyNSAyMjguMTY3IDg2LjMwNTQgMjI3LjMgODguOTUyMyAyMjcuMDA4Qzg5LjYwNTEgMjI2LjkzNiA5MC4yNjg0IDIyNi44OTkgOTAuOTQwNCAyMjYuODk5SDMyOS41MTFDMzMwLjE4MyAyMjYuODk5IDMzMC44NDYgMjI2LjkzNiAzMzEuNDk4IDIyNy4wMDhDMzM0LjQxOSAyMjcuMzMgMzM3LjEyOCAyMjguMzUyIDMzOS40NTIgMjI5LjkwM1YyMDMuMTEyWk0zMzkuNDUyIDI0NC43MzlDMzM5LjQ1MiAyMzkuMzkzIDMzNS4yMDYgMjM1LjAzNiAzMjkuODkzIDIzNC44MzVDMzI5Ljc2NyAyMzQuODMgMzI5LjY0IDIzNC44MjggMzI5LjUxMSAyMzQuODI4SDkwLjk0MDRDODUuNDUwNSAyMzQuODI4IDgxIDIzOS4yNjUgODEgMjQ0LjczOVYyNzEuNTNMODEuMDcwNyAyNzEuNDgzQzgxLjI2NTMgMjcxLjM1NSA4MS40NjI1IDI3MS4yMyA4MS42NjI0IDI3MS4xMDlDODEuOTA4MyAyNzAuOTYgODIuMTU4MSAyNzAuODE3IDgyLjQxMTcgMjcwLjY3OUM4NC4zOTUzIDI2OS42MDUgODYuNjA1NCAyNjguODk0IDg4Ljk1MjMgMjY4LjYzNUM4OS4wMDUyIDI2OC42MjkgODkuMDU4IDI2OC42MjQgODkuMTExIDI2OC42MThDODkuNzEyNSAyNjguNTU3IDkwLjMyMjggMjY4LjUyNiA5MC45NDA0IDI2OC41MjZIMzI5LjUxMUMzMjkuNzM4IDI2OC41MjYgMzI5Ljk2NSAyNjguNTMgMzMwLjE5MiAyNjguNTM5QzMzMC42MzEgMjY4LjU1NSAzMzEuMDY3IDI2OC41ODcgMzMxLjQ5OCAyNjguNjM1QzMzNC40MTkgMjY4Ljk1NyAzMzcuMTI4IDI2OS45OCAzMzkuNDUyIDI3MS41M1YyNDQuNzM5Wk0zMzkuNDUyIDI4Ni4zNjZDMzM5LjQ1MiAyODEuMDIxIDMzNS4yMDYgMjc2LjY2MyAzMjkuODkzIDI3Ni40NjJMMzI5Ljg2NSAyNzYuNDYxQzMyOS43NDggMjc2LjQ1NyAzMjkuNjI5IDI3Ni40NTUgMzI5LjUxMSAyNzYuNDU1SDkwLjk0MDRDODUuNDUwNSAyNzYuNDU1IDgxIDI4MC44OTMgODEgMjg2LjM2NlYzMDYuMTg4QzgxIDMxMS42NjIgODUuNDUwNSAzMTYuMTAxIDkwLjk0MDQgMzE2LjEwMUgzMjkuNTExQzMzNS4wMDEgMzE2LjEwMSAzMzkuNDUyIDMxMS42NjIgMzM5LjQ1MiAzMDYuMTg4VjI4Ni4zNjZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjY5Ljg2OCAxMzEuNzUyQzI2OS44NjggMTI2LjI3OCAyNzQuMzE4IDEyMS44NCAyNzkuODA4IDEyMS44NEgzMTEuNjE4QzMxNy4xMDggMTIxLjg0IDMyMS41NTggMTI2LjI3OCAzMjEuNTU4IDEzMS43NTJWMTYxLjQ4NUMzMjEuNTU4IDE2Ni45NTkgMzE3LjEwOCAxNzEuMzk2IDMxMS42MTggMTcxLjM5NkgyNzkuODA4QzI3NC4zMTggMTcxLjM5NiAyNjkuODY4IDE2Ni45NTkgMjY5Ljg2OCAxNjEuNDg1VjEzMS43NTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzFfMTUiPgo8cmVjdCB3aWR0aD0iMjU5IiBoZWlnaHQ9IjIxMyIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgxIDEwNCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K',
      id: 'xyz.ithaca.porto',
      async isAuthorized() {
        try {
          // Use retry strategy as some injected wallets (e.g. MetaMask) fail to
          // immediately resolve JSON-RPC requests on page load.
          const accounts = await withRetry(() => this.getAccounts())
          return !!accounts.length
        } catch {
          return false
        }
      },
      name: 'Porto',
      async onAccountsChanged(accounts) {
        wagmiConfig.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
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

        // Manage EIP-1193 event listeners
        const provider = await this.getProvider()
        if (provider) {
          if (connect) {
            provider.removeListener('connect', connect)
            connect = undefined
          }
          if (!accountsChanged) {
            accountsChanged = this.onAccountsChanged.bind(this)
            // Porto Provider uses Ox, which uses `readonly Address.Address[]` for `accountsChanged`,
            // while Connector `accountsChanged` is `string[]`
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
        }
      },
      async onDisconnect(_error) {
        const provider = await this.getProvider()

        wagmiConfig.emitter.emit('disconnect')

        // Manage EIP-1193 event listeners
        if (provider) {
          if (chainChanged) {
            provider.removeListener('chainChanged', chainChanged)
            chainChanged = undefined
          }
          if (disconnect) {
            provider.removeListener('disconnect', disconnect)
            disconnect = undefined
          }
          if (!connect) {
            connect = this.onConnect.bind(this)
            provider.on('connect', connect)
          }
        }
      },
      async setup() {
        if (!connect) {
          const provider = await this.getProvider()
          connect = this.onConnect.bind(this)
          provider.on('connect', connect)
        }
      },
      async switchChain({ chainId }) {
        const chain = chains.find((x) => x.id === chainId)
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
