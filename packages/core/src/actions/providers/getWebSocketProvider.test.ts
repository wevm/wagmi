import { setupWagmiClient } from '../../../test'
import { getWebSocketProvider } from './getWebSocketProvider'

describe('getWebSocketProvider', () => {
  it('undefined', async () => {
    setupWagmiClient()
    expect(getWebSocketProvider()).toBeUndefined()
  })
})
