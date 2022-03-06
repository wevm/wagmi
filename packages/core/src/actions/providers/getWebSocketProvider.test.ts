import { setupWagmiClient } from '../../../test'
import { getWebSocketProvider } from './getWebSocketProvider'

describe('getWebSocketProvider', () => {
  it('undefined', async () => {
    await setupWagmiClient()
    expect(getWebSocketProvider()).toBeUndefined()
  })
})
