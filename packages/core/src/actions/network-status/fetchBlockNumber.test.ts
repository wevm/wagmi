import { setupWagmiClient } from '../../../test'
import { fetchBlockNumber } from './fetchBlockNumber'

describe('fetchBlockNumber', () => {
  it('fetches block number', async () => {
    await setupWagmiClient()
    const result = await fetchBlockNumber()
    expect(result).toMatchInlineSnapshot(`14297676`)
  })
})
