import { setupWagmiClient } from '../../../test'
import { fetchFeeData } from './fetchFeeData'

describe('fetchFeeData', () => {
  it('fetches the fee data', async () => {
    setupWagmiClient()
    expect(await fetchFeeData()).toMatchInlineSnapshot(`
      {
        "formatted": {
          "gasPrice": "73955459093",
          "maxFeePerGas": "147410918186",
          "maxPriorityFeePerGas": "2500000000",
        },
        "gasPrice": {
          "hex": "0x113816c015",
          "type": "BigNumber",
        },
        "maxFeePerGas": {
          "hex": "0x2252601b2a",
          "type": "BigNumber",
        },
        "maxPriorityFeePerGas": {
          "hex": "0x9502f900",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('fetches the fee data in ether', async () => {
    setupWagmiClient()
    expect(await fetchFeeData({ formatUnits: 'ether' })).toMatchInlineSnapshot(`
      {
        "formatted": {
          "gasPrice": "0.000000073955459093",
          "maxFeePerGas": "0.000000147410918186",
          "maxPriorityFeePerGas": "0.0000000025",
        },
        "gasPrice": {
          "hex": "0x113816c015",
          "type": "BigNumber",
        },
        "maxFeePerGas": {
          "hex": "0x2252601b2a",
          "type": "BigNumber",
        },
        "maxPriorityFeePerGas": {
          "hex": "0x9502f900",
          "type": "BigNumber",
        },
      }
    `)
  })
})
