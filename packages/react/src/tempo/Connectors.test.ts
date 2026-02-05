import { KeyManager, webAuthn } from '@wagmi/core/tempo'
import { renderHook } from '@wagmi/test/tempo'
import { describe, expect, test, vi } from 'vitest'
import { cdp } from 'vitest/browser'
import { useConnect, useConnection, useDisconnect } from 'wagmi'

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

test('connect', async (context) => {
  const cleanup = await setupWebAuthn()
  context.onTestFinished(async () => await cleanup())

  const { result } = await renderHook(() => ({
    useConnection: useConnection(),
    useConnect: useConnect(),
  }))

  expect(result.current.useConnection.address).not.toBeDefined()
  expect(result.current.useConnection.status).toEqual('disconnected')

  result.current.useConnect.mutate({
    capabilities: { type: 'sign-up', label: 'Test Account' },
    connector: webAuthn({
      keyManager: KeyManager.localStorage(),
    }),
  })

  await vi.waitFor(() =>
    expect(result.current.useConnection.isConnected).toBeTruthy(),
  )

  expect(result.current.useConnection.address).toBeDefined()
  expect(result.current.useConnection.address).toMatch(/^0x[a-fA-F0-9]{40}$/)
  expect(result.current.useConnection.status).toEqual('connected')
})

describe('capabilities.accessKey', () => {
  test('connect with accessKey', async (context) => {
    const cleanup = await setupWebAuthn()
    context.onTestFinished(async () => await cleanup())

    const connector = webAuthn({
      keyManager: KeyManager.localStorage(),
    })

    const { result } = await renderHook(() => ({
      useConnection: useConnection(),
      useConnect: useConnect(),
      useDisconnect: useDisconnect(),
    }))

    // Sign up first to create a credential
    await result.current.useConnect.mutateAsync({
      capabilities: { type: 'sign-up', label: 'Access Key Test' },
      connector,
    })
    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeTruthy(),
    )
    const address = result.current.useConnection.address
    expect(address).toBeDefined()

    await result.current.useDisconnect.mutateAsync({})
    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeFalsy(),
    )

    // Reconnect with an external access key
    await result.current.useConnect.mutateAsync({
      capabilities: {
        accessKey: {
          address: '0x0000000000000000000000000000000000000001',
          expiry: Math.floor(Date.now() / 1000) + 86400,
        },
      },
      connector,
    })

    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeTruthy(),
    )
    expect(result.current.useConnection.address).toBeDefined()
    expect(result.current.useConnection.address).toMatch(/^0x[a-fA-F0-9]{40}$/)
  })

  test('connect with accessKey (without grantAccessKey)', async (context) => {
    const cleanup = await setupWebAuthn()
    context.onTestFinished(async () => await cleanup())

    // Connector created without grantAccessKey
    const connector = webAuthn({
      keyManager: KeyManager.localStorage(),
    })

    const { result } = await renderHook(() => ({
      useConnection: useConnection(),
      useConnect: useConnect(),
      useDisconnect: useDisconnect(),
    }))

    // Sign up to create credential
    await result.current.useConnect.mutateAsync({
      capabilities: { type: 'sign-up', label: 'No Grant Test' },
      connector,
    })
    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeTruthy(),
    )

    await result.current.useDisconnect.mutateAsync({})
    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeFalsy(),
    )

    // Should work with accessKey even without grantAccessKey on the connector
    await result.current.useConnect.mutateAsync({
      capabilities: {
        accessKey: {
          address: '0x0000000000000000000000000000000000000002',
          expiry: Math.floor(Date.now() / 1000) + 86400,
        },
      },
      connector,
    })

    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeTruthy(),
    )
    expect(result.current.useConnection.address).toBeDefined()
  })

  test('expired accessKey throws', async (context) => {
    const cleanup = await setupWebAuthn()
    context.onTestFinished(async () => await cleanup())

    const connector = webAuthn({
      keyManager: KeyManager.localStorage(),
    })

    const { result } = await renderHook(() => ({
      useConnect: useConnect(),
    }))

    await expect(
      result.current.useConnect.mutateAsync({
        capabilities: {
          accessKey: {
            address: '0x0000000000000000000000000000000000000001',
            expiry: Math.floor(Date.now() / 1000) - 3600, // 1 hour in the past
          },
        },
        connector,
      }),
    ).rejects.toThrow('is in the past')
  })
})
