import { verifyMessage } from 'viem'
import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { getAccount } from './getAccount'
import { signMessage } from './signMessage'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

const messages = {
  string: 'The quick brown fox jumped over the lazy dogs.',
}

describe('signMessage', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('args', () => {
    describe('message', () => {
      it('string message', async () => {
        await connect({ connector })
        expect(
          await signMessage({
            message: messages.string,
          }),
        ).toMatchInlineSnapshot(
          `"0x4a05822c986433a093433ba479c8f500fd70215e8864241035498db99107e8a56b34b373e0a3580dc9f532d610341cd83ccdfc623a6545a865314200acfe4f151c"`,
        )
      })
    })
  })

  describe('behavior', () => {
    it('not connected', async () => {
      await expect(
        signMessage({ message: messages.string }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('can verify message', async () => {
      await connect({ connector })
      const { address } = getAccount()
      const res = await signMessage({ message: messages.string })
      expect(
        await verifyMessage({
          address: address!,
          message: messages.string,
          signature: res,
        }),
      ).toBeTruthy()
    })
  })
})
