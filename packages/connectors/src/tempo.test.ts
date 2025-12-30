// biome-ignore lint/correctness/noUnusedImports: need for webauth cdp types
import type * as _ from '@vitest/browser-playwright'
import { renderHook } from '@wagmi/test/react'
import type { Hex } from 'ox'
import { expect, test, vi } from 'vitest'
import { cdp } from 'vitest/browser'
import { useConnect, useConnection } from 'wagmi'
import { webAuthn } from './tempo.js'

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
      keyManager: {
        async getPublicKey(parameters) {
          const publicKey = localStorage.getItem(parameters.credential.id)
          if (!publicKey) throw new Error('publicKey not found.')
          return publicKey as Hex.Hex
        },
        async setPublicKey(parameters) {
          localStorage.setItem(parameters.credential.id, parameters.publicKey)
        },
      },
    }),
  })

  await vi.waitFor(() =>
    expect(result.current.useConnection.isConnected).toBeTruthy(),
  )

  expect(result.current.useConnection.address).toBeDefined()
  expect(result.current.useConnection.address).toMatch(/^0x[a-fA-F0-9]{40}$/)
  expect(result.current.useConnection.status).toEqual('connected')
})
