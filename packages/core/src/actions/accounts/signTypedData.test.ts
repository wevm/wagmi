import { verifyTypedData } from 'ethers/lib/utils'

import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { signTypedData } from './signTypedData'

const connector = new MockConnector({
  options: { signer: getSigners()[0] },
})

// All properties on a domain are optional
const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
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
  beforeEach(() => setupClient())

  describe('args', () => {
    it('domain, types, and value', async () => {
      await connect({ connector })
      expect(
        await signTypedData({ domain, types, value }),
      ).toMatchInlineSnapshot(
        `"0x6ea8bb309a3401225701f3565e32519f94a0ea91a5910ce9229fe488e773584c0390416a2190d9560219dab757ecca2029e63fa9d1c2aebf676cc25b9f03126a1b"`,
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
  })
})
