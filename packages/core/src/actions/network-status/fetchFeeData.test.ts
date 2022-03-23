import { setupWagmiClient } from '../../../test'
import { fetchFeeData } from './fetchFeeData'

describe('fetchFeeData', () => {
  beforeEach(() => {
    setupWagmiClient()
  })

  it('fetches fee data', async () => {
    const result = await fetchFeeData()
    expect(Object.keys(result)).toMatchInlineSnapshot(`
      [
        "maxFeePerGas",
        "maxPriorityFeePerGas",
        "gasPrice",
        "formatted",
      ]
    `)
  })

  it('fetches fee data in ether', async () => {
    const result = await fetchFeeData({ formatUnits: 'ether' })
    expect(Object.keys(result)).toMatchInlineSnapshot(`
      [
        "maxFeePerGas",
        "maxPriorityFeePerGas",
        "gasPrice",
        "formatted",
      ]
    `)
    expect(result.formatted.gasPrice.includes('.')).toBeTruthy()
  })
})
