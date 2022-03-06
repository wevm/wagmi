import { toUtf8Bytes, verifyMessage } from 'ethers/lib/utils'

import { setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { signMessage } from './signMessage'

const messages = {
  string: 'The quick brown fox jumped over the lazy dogs.',
  bytes: toUtf8Bytes('The quick brown fox jumped over the lazy dogs.'),
}

describe('signMessage', () => {
  it('not connected', async () => {
    await setupWagmiClient()
    try {
      await signMessage({ message: messages.string })
    } catch (err) {
      expect(err).toMatchInlineSnapshot(
        `[ConnectorNotFoundError: Connector not found]`,
      )
    }
  })

  describe('connected', () => {
    it('signs string message', async () => {
      const client = await setupWagmiClient()
      const connectResult = await connect(client.connectors[0])
      const signMessageResult = await signMessage({ message: messages.string })
      expect(signMessageResult).toMatchInlineSnapshot(
        `"0x4a05822c986433a093433ba479c8f500fd70215e8864241035498db99107e8a56b34b373e0a3580dc9f532d610341cd83ccdfc623a6545a865314200acfe4f151c"`,
      )
      expect(verifyMessage(messages.string, signMessageResult)).toEqual(
        connectResult.data?.account,
      )
    })

    it('signs bytes message', async () => {
      const client = await setupWagmiClient()
      const connectResult = await connect(client.connectors[0])
      const signMessageResult = await signMessage({ message: messages.bytes })
      expect(signMessageResult).toMatchInlineSnapshot(
        `"0x4a05822c986433a093433ba479c8f500fd70215e8864241035498db99107e8a56b34b373e0a3580dc9f532d610341cd83ccdfc623a6545a865314200acfe4f151c"`,
      )
      expect(verifyMessage(messages.bytes, signMessageResult)).toEqual(
        connectResult.data?.account,
      )
    })
  })
})
