import { setupWagmiClient } from '../../../test'
import { fetchFeeData } from './fetchFeeData'

describe('fetchFeeData', () => {
  it('fetches fee data', async () => {
    await setupWagmiClient()
    const result = await fetchFeeData()
    expect(result).toMatchInlineSnapshot(`
      {
        "formatted": {
          "gasPrice": "75890397599",
          "maxFeePerGas": "148748803302",
          "maxPriorityFeePerGas": "2500000000",
        },
        "gasPrice": {
          "hex": "0x11ab6b919f",
          "type": "BigNumber",
        },
        "maxFeePerGas": {
          "hex": "0x22a21e9ce6",
          "type": "BigNumber",
        },
        "maxPriorityFeePerGas": {
          "hex": "0x9502f900",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('fetches fee data in ether', async () => {
    await setupWagmiClient()
    const result = await fetchFeeData({ formatUnits: 'ether' })
    expect(result).toMatchInlineSnapshot(`
      {
        "formatted": {
          "gasPrice": "0.000000075890397599",
          "maxFeePerGas": "0.000000148748803302",
          "maxPriorityFeePerGas": "0.0000000025",
        },
        "gasPrice": {
          "hex": "0x11ab6b919f",
          "type": "BigNumber",
        },
        "maxFeePerGas": {
          "hex": "0x22a21e9ce6",
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
