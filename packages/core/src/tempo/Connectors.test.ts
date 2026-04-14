/// <reference types="@vitest/browser-playwright" />
import { createConfig, createStorage } from '@wagmi/core'
import { webAuthn } from '@wagmi/core/tempo'
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
  describe('register with authorizeAccessKey', () => {
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
