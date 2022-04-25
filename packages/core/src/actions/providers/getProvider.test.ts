import { setupWagmiClient } from '../../../test'
import { getProvider } from './getProvider'

describe('getProvider', () => {
  it('default', async () => {
    setupWagmiClient()
    expect(getProvider()).toMatchInlineSnapshot(
      `"<Provider network={31337} />"`,
    )
  })

  describe('args', () => {
    it('chainId', async () => {
      setupWagmiClient()
      expect(getProvider({ chainId: 1 })).toMatchInlineSnapshot(
        `"<Provider network={1} />"`,
      )
    })
  })
})
