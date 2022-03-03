import { setupWagmiClient } from '../../../test'
import { fetchBlockNumber } from './fetchBlockNumber'

describe('fetchBlockNumber', () => {
  it('fetches the block number', async () => {
    setupWagmiClient()
    expect(typeof (await fetchBlockNumber())).toBe('number')
  })
})
