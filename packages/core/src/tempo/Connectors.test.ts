/// <reference types="@vitest/browser-playwright" />

import { connect, createConfig, disconnect, getConnection } from '@wagmi/core'
import { tempoWallet, webAuthn } from '@wagmi/core/tempo'
import { accounts, tempoLocal } from '@wagmi/test/tempo'
import { Storage as AccountsStorage, Dialog } from 'accounts'
import { http } from 'viem'
import { describe, expect, test } from 'vitest'
import { cdp } from 'vitest/browser'

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
  capabilities: Record<string, unknown> = {},
) {
  return Dialog.define({ name: 'test' }, ({ store }: any) => ({
    close() {},
    destroy() {},
    open() {},
    async syncRequests(requests) {
      for (const queued of requests) {
        if (queued.request.method !== 'wallet_connect') continue

        store.setState((state: any) => ({
          ...state,
          requestQueue: state.requestQueue.map((request: any) =>
            request.request.id === queued.request.id
              ? {
                  request: request.request,
                  result: {
                    accounts: [{ address, capabilities }],
                  },
                  status: 'success',
                }
              : request,
          ),
        }))
      }
    },
  }))
}

describe('tempoWallet', () => {
  test('connect + getAccounts + disconnect', async () => {
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
        storage: AccountsStorage.memory({ key: 'tempo-wallet-test' }),
      }),
    )

    expect(await connector.getAccounts()).toEqual([])
    expect(await connector.isAuthorized()).toBe(false)
    expect(getConnection(config).status).toBe('disconnected')

    const result = await connect(config, { connector })
    expect(result).toMatchObject({
      accounts: [address],
      chainId: tempoLocal.id,
    })
    expect(await connector.getAccounts()).toEqual([address])
    expect(await connector.isAuthorized()).toBe(true)
    expect(getConnection(config)).toMatchObject({
      address,
      addresses: [address],
      chainId: tempoLocal.id,
      isConnected: true,
      status: 'connected',
    })

    await disconnect(config, { connector })
    expect(await connector.getAccounts()).toEqual([])
    expect(await connector.isAuthorized()).toBe(false)
  })
})

describe('webAuthn', () => {
  describe('register with authorizeAccessKey', () => {
    test('passes chainId to signKeyAuthorization', async (context) => {
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

      const chainId = tempoLocal.id

      const result = await connector.connect({
        capabilities: { method: 'register', name: 'ChainId Test' },
        chainId,
        withCapabilities: true,
      })

      expect(result.chainId).toBe(chainId)
      expect(result.accounts[0]?.capabilities.keyAuthorization).toBeDefined()
      expect(
        BigInt(
          result.accounts[0]?.capabilities.keyAuthorization
            ?.chainId as unknown as `0x${string}`,
        ),
      ).toBe(BigInt(chainId))
    })
  })
})
