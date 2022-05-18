import { setupClient } from '../../../test'
import { getProvider } from './getProvider'

describe('getProvider', () => {
  it('default', async () => {
    setupClient()
    expect(getProvider()).toMatchInlineSnapshot(
      `"<Provider network={31337} />"`,
    )
  })

  describe('args', () => {
    it('chainId', async () => {
      setupClient()
      expect(getProvider({ chainId: 1 })).toMatchInlineSnapshot(
        `"<Provider network={1} />"`,
      )
    })
  })
})
