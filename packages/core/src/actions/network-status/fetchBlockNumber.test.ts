import { setupWagmiClient } from '../../../test'
import { fetchBlockNumber } from './fetchBlockNumber'

describe('fetchBlockNumber', () => {
  it('fetches block number', async () => {
    setupWagmiClient()
    const result = await fetchBlockNumber()
    expect(result).toBeDefined()
  })
})
