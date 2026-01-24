import { KeyManager, webAuthn } from '@wagmi/core/tempo'
import { renderHook } from '@wagmi/test/tempo'
import { expect, test, vi } from 'vitest'
import { cdp } from 'vitest/browser'
import { useConnect, useConnection } from 'wagmi'

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
