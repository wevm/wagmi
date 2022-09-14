import { verifyTypedData } from 'ethers/lib/utils'
import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { signTypedData } from './signTypedData'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

// All properties on a domain are optional
const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
}

// Named list of all type definitions
const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
}

// Data to sign
const value = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
}

describe('signTypedData', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('args', () => {
    it('domain, types, and value', async () => {
      await connect({ connector })
      expect(
        await signTypedData({ domain, types, value }),
      ).toMatchInlineSnapshot(
        '"0x638234ed750f57f80c0526707a590fe65749aba4e5fa0cd16ace23e90a88e82f74ee81000af0e16fc25cf82a0a7b33e4264e2f8ecb7598e9938130a9fd9807991c"',
      )
    })
  })

  describe('behavior', () => {
    it('not connected', async () => {
      await expect(
        signTypedData({ domain, types, value }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('can verify typed data', async () => {
      await connect({ connector })
      const res = await signTypedData({ domain, types, value })
      expect(verifyTypedData(domain, types, value, res)).toMatchInlineSnapshot(
        `"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`,
      )
    })

    describe('when chainId is provided in domain', () => {
      it("throws mismatch if chainId doesn't match signer", async () => {
        await connect({
          chainId: 4,
          connector: new MockConnector({
            options: {
              flags: { noSwitchChain: true },
              signer: getSigners()[0]!,
            },
          }),
        })
        await expect(
          signTypedData({ domain, types, value }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"Chain mismatch: Expected \\"Ethereum\\", received \\"Rinkeby\\"."`,
        )
      })
    })
  })
})
