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

describe('capabilities.sign', () => {
  test('sign-up + sign (create path)', async (context) => {
    const cleanup = await setupWebAuthn()
    context.onTestFinished(async () => await cleanup())

    const connector = webAuthn({
      keyManager: KeyManager.localStorage(),
    })

    const { result } = await renderHook(() => ({
      useConnection: useConnection(),
      useConnect: useConnect(),
    }))

    const hash =
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    const connectResult = await result.current.useConnect.mutateAsync({
      capabilities: { type: 'sign-up', label: 'Create+Sign', sign: { hash } },
      connector,
      withCapabilities: true,
    })

    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeTruthy(),
    )
    expect(result.current.useConnection.address).toBeDefined()
    expect(result.current.useConnection.address).toMatch(/^0x[a-fA-F0-9]{40}$/)

    expect(connectResult.accounts[0]?.capabilities.signature).toBeDefined()
    expect(connectResult.accounts[0]?.capabilities.signature).toMatch(/^0x/)
  })

  test('discover path: disconnect then reconnect with sign', async (context) => {
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

    await result.current.useConnect.mutateAsync({
      capabilities: { type: 'sign-up', label: 'Discover Test' },
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

    const hash =
      '0x0000000000000000000000000000000000000000000000000000000000000001'
    const connectResult = await result.current.useConnect.mutateAsync({
      capabilities: {
        sign: { hash },
      },
      connector,
      withCapabilities: true,
    })

    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeTruthy(),
    )
    expect(result.current.useConnection.address).toBeDefined()
    expect(result.current.useConnection.address).toMatch(/^0x[a-fA-F0-9]{40}$/)

    expect(connectResult.accounts[0]?.capabilities.signature).toBeDefined()
    expect(connectResult.accounts[0]?.capabilities.signature).toMatch(/^0x/)
  })

  test('sign skips access key provisioning (with grantAccessKey)', async (context) => {
    const cleanup = await setupWebAuthn()
    context.onTestFinished(async () => await cleanup())

    const connector = webAuthn({
      grantAccessKey: true,
      keyManager: KeyManager.localStorage(),
    })

    const { result } = await renderHook(() => ({
      useConnection: useConnection(),
      useConnect: useConnect(),
      useDisconnect: useDisconnect(),
    }))

    await result.current.useConnect.mutateAsync({
      capabilities: { type: 'sign-up', label: 'Grant Test' },
      connector,
    })
    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeTruthy(),
    )

    await result.current.useDisconnect.mutateAsync({})
    await vi.waitFor(() =>
      expect(result.current.useConnection.isConnected).toBeFalsy(),
    )

    const hash =
      '0x0000000000000000000000000000000000000000000000000000000000000002'
    const connectResult = await result.current.useConnect.mutateAsync({
      capabilities: {
        sign: { hash },
      },
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
