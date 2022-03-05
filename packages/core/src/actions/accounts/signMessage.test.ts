import { toUtf8Bytes } from 'ethers/lib/utils'

import { setupWagmiClient } from '../../../test'
import { wagmiClient } from '../../client'
import { connect } from './connect'
import { signMessage } from './signMessage'

const messages = {
  basic: 'The quick brown fox jumped over the lazy dogs.',
  bytes: toUtf8Bytes('The quick brown fox jumped over the lazy dogs.'),
}

describe('signMessage', () => {
  it('not connected', async () => {
    setupWagmiClient()
    try {
      await signMessage({ message: messages.basic })
    } catch (err) {
      expect(err).toMatchInlineSnapshot(
        `[ConnectorNotFoundError: Connector not found]`,
      )
    }
  })

  describe('connected', () => {
    it('signs message', async () => {
      setupWagmiClient()
      await connect(wagmiClient.connectors[0])
      const signature = await signMessage({ message: messages.basic })
      expect(signature).toMatchInlineSnapshot(
        `"0x28005a47b2d96159654ddc9e762b005f429a37b7790036a7817e3a6db60c634d538fe762c641f48da1c4aa3f8d001d2d4ca0c804a1a87f5b401d5b73b314fa221b"`,
      )
    })
  })
})
