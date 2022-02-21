import { getProvider } from '../../../test'
import { blockNumberAction } from './blockNumber'

const provider = getProvider()

describe('blockNumberAction', () => {
  it('fetches block number', async () => {
    const balance = await blockNumberAction({
      provider,
    })
    expect(balance).toEqual(13897897)
  })
})
