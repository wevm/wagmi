import { setupWagmiClient } from '../../../test'
import { fetchBlockNumber } from './fetchBlockNumber'

describe('fetchBlockNumber', () => {
  beforeEach(() => setupWagmiClient())

  it('default', async () => {
    expect(await fetchBlockNumber()).toBeDefined()
  })

  describe('args', () => {
    it('chainId', async () => {
      expect(await fetchBlockNumber({ chainId: 1 })).toBeDefined()
    })
  })
})
