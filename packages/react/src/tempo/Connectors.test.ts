import { createConfig, createStorage } from '@wagmi/core'
import { tempoWallet, webAuthn } from '@wagmi/core/tempo'
import {
  accounts,
  createWrapper,
  renderHook,
  tempoLocal,
} from '@wagmi/test/tempo'
import { http } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import { cdp } from 'vitest/browser'
import { useConnect, useConnection, useDisconnect, WagmiProvider } from 'wagmi'

function createMemoryStorage() {
  const state: Record<string, string> = {}
  return {
    getItem(key: string) {
      return state[key] ?? null
    },
    removeItem(key: string) {
      delete state[key]
    },
    setItem(key: string, value: string) {
      state[key] = value
    },
  }
}

async function setupWebAuthn() {
  const client = cdp()
  await client.send('WebAuthn.enable')
  const result = await client.send('WebAuthn.addVirtualAuthenticator', {
    options: {
      protocol: 'ctap2',
      transport: 'internal',
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true,
    },
  })
  return async () => {
    const client = cdp()
    await client.send('WebAuthn.removeVirtualAuthenticator', {
      authenticatorId: result.authenticatorId,
    })
    await client.send('WebAuthn.disable')
  }
}

function createTempoWalletDialog(
  address: `0x${string}`,
  onConnectRequest?: () => void,
) {
  return (({ store }: any) => ({
    close() {},
    destroy() {},
    open() {},
    async syncRequests(requests: any[]) {
      for (const queued of requests) {
        if (queued.request.method !== 'wallet_connect') continue
        onConnectRequest?.()

        store.setState((state: any) => ({
          ...state,
          requestQueue: state.requestQueue.map((request: any) =>
            request.request.id === queued.request.id
              ? {
                  request: request.request,
                  result: {
                    accounts: [{ address, capabilities: {} }],
                  },
                  status: 'success',
                }
              : request,
          ),
        }))
      }
    },
  })) as any
}

describe('connectors', () => {
  describe('tempoWallet', () => {
    test('connect + get accounts + disconnect', async () => {
      const config = createConfig({
        chains: [tempoLocal],
        connectors: [],
        storage: null,
        transports: {
          [tempoLocal.id]: http(),
        },
      })

      const address = accounts[0]!.address
      const connector = config._internal.connectors.setup(
        tempoWallet({
          dialog: createTempoWalletDialog(address),
          storage: {
            async getItem() {
              return null
            },
            async removeItem() {},
            async setItem() {},
          },
        }),
      )

      const { result } = await renderHook(
        () => ({
          useConnection: useConnection(),
          useConnect: useConnect(),
          useDisconnect: useDisconnect(),
        }),
        {
          wrapper: createWrapper(WagmiProvider, {
            config,
            reconnectOnMount: false,
          }),
        },
      )

      expect(result.current.useConnection.address).not.toBeDefined()
      expect(result.current.useConnection.status).toEqual('disconnected')

      const connectResult = await result.current.useConnect.mutateAsync({
        connector,
      })
      expect(connectResult).toMatchObject({
        accounts: [address],
        chainId: tempoLocal.id,
      })

      await vi.waitFor(() =>
        expect(result.current.useConnection.isConnected).toBeTruthy(),
      )
      expect(result.current.useConnection.address).toEqual(address)
      expect(result.current.useConnection.addresses).toEqual([address])

      await result.current.useDisconnect.mutateAsync({ connector })
      await vi.waitFor(() =>
        expect(result.current.useDisconnect.isSuccess).toBeTruthy(),
      )
      expect(await connector.getAccounts()).toEqual([])
    })

    test('reconnects on mount', async () => {
      const address = accounts[0]!.address
      const storage = createMemoryStorage()
      let connectRequests = 0

      const connectorFn = tempoWallet({
        dialog: createTempoWalletDialog(address, () => {
          connectRequests += 1
        }),
      })

      const config = createConfig({
        chains: [tempoLocal],
        connectors: [connectorFn],
        storage: createStorage({ storage, key: 'tempo-wallet-test' }),
        transports: {
          [tempoLocal.id]: http(),
        },
      })

      const firstRender = await renderHook(
        () => ({
          useConnection: useConnection(),
          useConnect: useConnect(),
        }),
        {
          wrapper: createWrapper(WagmiProvider, {
            config,
            reconnectOnMount: false,
          }),
        },
      )

      await firstRender.result.current.useConnect.mutateAsync({
        connector: config.connectors[0]!,
      })

      await vi.waitFor(() =>
        expect(
          firstRender.result.current.useConnection.isConnected,
        ).toBeTruthy(),
      )
      expect(connectRequests).toBe(1)

      await vi.waitFor(() =>
        expect(storage.getItem('tempo-wallet-test.store')).not.toBeNull(),
      )
      await vi.waitFor(() =>
        expect(
          JSON.parse(storage.getItem('tempo-wallet-test.recentConnectorId')!),
        ).toBe('xyz.tempo'),
      )
      await vi.waitFor(() =>
        expect(
          storage.getItem('tempo-wallet-test.accounts.xyz.tempo.store'),
        ).not.toBeNull(),
      )
      firstRender.unmount()

      const reconnectedConfig = createConfig({
        chains: [tempoLocal],
        connectors: [connectorFn],
        storage: createStorage({ storage, key: 'tempo-wallet-test' }),
        transports: {
          [tempoLocal.id]: http(),
        },
      })

      const secondRender = await renderHook(() => useConnection(), {
        wrapper: createWrapper(WagmiProvider, {
          config: reconnectedConfig,
          reconnectOnMount: true,
        }),
      })

      await vi.waitFor(() =>
        expect(secondRender.result.current.isConnected).toBeTruthy(),
      )
      expect(secondRender.result.current.address).toEqual(address)
      expect(secondRender.result.current.addresses).toEqual([address])
      expect(connectRequests).toBe(1)
    })
  })

  test('connect', async (context) => {
    const cleanup = await setupWebAuthn()
    context.onTestFinished(async () => await cleanup())

    const config = createConfig({
      chains: [tempoLocal],
      connectors: [],
      storage: null,
      transports: {
        [tempoLocal.id]: http(),
      },
    })
    const connector = config._internal.connectors.setup(webAuthn())

    const { result } = await renderHook(
      () => ({
        useConnection: useConnection(),
        useConnect: useConnect(),
      }),
      {
        wrapper: createWrapper(WagmiProvider, {
          config,
          reconnectOnMount: false,
        }),
      },
    )

    expect(result.current.useConnection.address).not.toBeDefined()
    expect(result.current.useConnection.status).toEqual('disconnected')

    result.current.useConnect.mutate({
      capabilities: { method: 'register', name: 'Test Account' },
      connector,
    })

    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeTruthy(),
    )

    expect(result.current.useConnection.address).toBeDefined()
    expect(result.current.useConnection.address).toMatch(/^0x[a-fA-F0-9]{40}$/)
    expect(result.current.useConnection.status).toEqual('connected')
  })

  describe('capabilities.sign', () => {
    test('register + sign (create path)', async (context) => {
      const cleanup = await setupWebAuthn()
      context.onTestFinished(async () => await cleanup())

      const config = createConfig({
        chains: [tempoLocal],
        connectors: [],
        storage: null,
        transports: {
          [tempoLocal.id]: http(),
        },
      })

      const connector = config._internal.connectors.setup(webAuthn())

      const { result } = await renderHook(
        () => ({
          useConnection: useConnection(),
          useConnect: useConnect(),
        }),
        {
          wrapper: createWrapper(WagmiProvider, {
            config,
            reconnectOnMount: false,
          }),
        },
      )

      const hash =
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      const connectResult = await result.current.useConnect.mutateAsync({
        capabilities: { digest: hash, method: 'register', name: 'Create+Sign' },
        connector,
        withCapabilities: true,
      })

      await vi.waitFor(() =>
        expect(result.current.useConnection.isConnected).toBeTruthy(),
      )
      expect(result.current.useConnection.address).toBeDefined()
      expect(result.current.useConnection.address).toMatch(
        /^0x[a-fA-F0-9]{40}$/,
      )

      expect(connectResult.accounts[0]?.capabilities.signature).toBeDefined()
      expect(connectResult.accounts[0]?.capabilities.signature).toMatch(/^0x/)
    })

    test('discover path: disconnect then reconnect with sign', async (context) => {
      const cleanup = await setupWebAuthn()
      context.onTestFinished(async () => await cleanup())

      const config = createConfig({
        chains: [tempoLocal],
        connectors: [],
        storage: null,
        transports: {
          [tempoLocal.id]: http(),
        },
      })

      const connector = config._internal.connectors.setup(webAuthn())

      const { result } = await renderHook(
        () => ({
          useConnection: useConnection(),
          useConnect: useConnect(),
          useDisconnect: useDisconnect(),
        }),
        {
          wrapper: createWrapper(WagmiProvider, {
            config,
            reconnectOnMount: false,
          }),
        },
      )

      await result.current.useConnect.mutateAsync({
        capabilities: { method: 'register', name: 'Discover Test' },
        connector,
      })
      await vi.waitFor(() =>
        expect(result.current.useConnection.isConnected).toBeTruthy(),
      )
      const address = result.current.useConnection.address
      expect(address).toBeDefined()

      await result.current.useDisconnect.mutateAsync({ connector })
      await vi.waitFor(() =>
        expect(result.current.useConnection.isConnected).toBeFalsy(),
      )

      const hash =
        '0x0000000000000000000000000000000000000000000000000000000000000001'
      const connectResult = await result.current.useConnect.mutateAsync({
        capabilities: { digest: hash },
        connector,
        withCapabilities: true,
      })

      await vi.waitFor(() =>
        expect(result.current.useConnection.isConnected).toBeTruthy(),
      )
      expect(result.current.useConnection.address).toBeDefined()
      expect(result.current.useConnection.address).toMatch(
        /^0x[a-fA-F0-9]{40}$/,
      )

      expect(connectResult.accounts[0]?.capabilities.signature).toBeDefined()
      expect(connectResult.accounts[0]?.capabilities.signature).toMatch(/^0x/)
    })

    test('sign skips access key provisioning (with authorizeAccessKey)', async (context) => {
      const cleanup = await setupWebAuthn()
      context.onTestFinished(async () => await cleanup())

      const config = createConfig({
        chains: [tempoLocal],
        connectors: [],
        storage: null,
        transports: {
          [tempoLocal.id]: http(),
        },
      })

      const connector = config._internal.connectors.setup(
        webAuthn({
          authorizeAccessKey: () => ({
            expiry: Math.floor((Date.now() + 24 * 60 * 60 * 1000) / 1000),
          }),
        }),
      )

      const { result } = await renderHook(
        () => ({
          useConnection: useConnection(),
          useConnect: useConnect(),
          useDisconnect: useDisconnect(),
        }),
        {
          wrapper: createWrapper(WagmiProvider, {
            config,
            reconnectOnMount: false,
          }),
        },
      )

      await result.current.useConnect.mutateAsync({
        capabilities: { method: 'register', name: 'Grant Test' },
        connector,
      })
      await vi.waitFor(() =>
        expect(result.current.useConnection.isConnected).toBeTruthy(),
      )

      await result.current.useDisconnect.mutateAsync({ connector })
      await vi.waitFor(() =>
        expect(result.current.useConnection.isConnected).toBeFalsy(),
      )

      const hash =
        '0x0000000000000000000000000000000000000000000000000000000000000002'
      const connectResult = await result.current.useConnect.mutateAsync({
        capabilities: { digest: hash },
        connector,
        withCapabilities: true,
      })

      await vi.waitFor(() =>
        expect(result.current.useConnection.isConnected).toBeTruthy(),
      )
      expect(result.current.useConnection.address).toBeDefined()

      expect(connectResult.accounts[0]?.capabilities.signature).toBeDefined()
      expect(connectResult.accounts[0]?.capabilities.signature).toMatch(/^0x/)
    })
  })
})
