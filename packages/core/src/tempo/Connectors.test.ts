/// <reference types="@vitest/browser-playwright" />
import { createConfig, createStorage } from '@wagmi/core'
import { KeyManager, webAuthn } from '@wagmi/core/tempo'
import { tempoLocal } from '@wagmi/test/tempo'
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

describe('webAuthn', () => {
  describe('sign-up with grantAccessKey', () => {
    test('passes chainId to signKeyAuthorization', async (context) => {
      const cleanup = await setupWebAuthn()
      context.onTestFinished(async () => await cleanup())

      const storage = createStorage({ storage: localStorage })
      const config = createConfig({
        chains: [tempoLocal],
        connectors: [],
        storage,
        transports: {
          [tempoLocal.id]: http(),
        },
      })

      const connector = config._internal.connectors.setup(
        webAuthn({
          grantAccessKey: true,
          keyManager: KeyManager.localStorage(),
        }),
      )

      const chainId = tempoLocal.id

      const result = await connector.connect({
        capabilities: { type: 'sign-up', label: 'ChainId Test' },
        chainId,
      })

      expect(result.chainId).toBe(chainId)

      // Retrieve the pending key authorization from storage to verify chainId.
      // The connector stores it at `pendingKeyAuthorization:<address>`.
      const address = (result.accounts as readonly string[])[0]!.toLowerCase()
      const keyAuth = await storage.getItem(
        `pendingKeyAuthorization:${address}` as any,
      )

      expect(keyAuth).toBeDefined()
      // The key authorization should include the chainId passed during connect.
      // KeyAuthorization stores chainId as bigint.
      expect(BigInt((keyAuth as any).chainId)).toBe(BigInt(chainId))
    })
  })
})
