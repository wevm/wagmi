import { contracts } from 'wagmi-testing'

import { setupWagmiClient } from '../../../test'
import { fetchToken } from './fetchToken'

describe('fetchToken', () => {
  it('fetches the token', async () => {
    setupWagmiClient()
    expect(await fetchToken({ address: contracts.uniToken }))
      .toMatchInlineSnapshot(`
      {
        "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        "decimals": 18,
        "symbol": "UNI",
        "totalSupply": {
          "formatted": "1000000000.0",
          "value": {
            "hex": "0x033b2e3c9fd0803ce8000000",
            "type": "BigNumber",
          },
        },
      }
    `)
  })
})
