import { setupWagmiClient } from '../../../test'
import { getProvider } from './getProvider'

describe('getProvider', () => {
  it('defined', async () => {
    setupWagmiClient()
    expect(getProvider()).toBeDefined()
  })
})
