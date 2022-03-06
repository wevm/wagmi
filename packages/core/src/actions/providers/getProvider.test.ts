import { setupWagmiClient } from '../../../test'
import { getProvider } from './getProvider'

describe('getProvider', () => {
  it('defined', async () => {
    await setupWagmiClient()
    expect(getProvider()).toBeDefined()
  })
})
