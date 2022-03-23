import { verifyTypedData } from 'ethers/lib/utils'

import { setupWagmiClient } from '../../../test'

import { connect } from './connect'
import { signTypedData } from './signTypedData'

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
  it('not connected', async () => {
    setupWagmiClient()
    await expect(
      signTypedData({ domain, types, value }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
  })

  describe('connected', () => {
    it('signs message', async () => {
      const client = setupWagmiClient()
      const connectResult = await connect(client.connectors[0])
      const signMessageResult = await signTypedData({ domain, types, value })
      expect(signMessageResult).toMatchInlineSnapshot(
        `"0x6ea8bb309a3401225701f3565e32519f94a0ea91a5910ce9229fe488e773584c0390416a2190d9560219dab757ecca2029e63fa9d1c2aebf676cc25b9f03126a1b"`,
      )
      expect(verifyTypedData(domain, types, value, signMessageResult)).toEqual(
        connectResult.data?.account,
      )
    })
  })
})
