import { describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { getProvider } from './getProvider'

describe('getProvider', () => {
  it('default', async () => {
    setupClient()
    expect(getProvider()).toMatchInlineSnapshot('"<Provider network={1} />"')
  })

  describe('args', () => {
    it('chainId', async () => {
      setupClient()
      expect(getProvider({ chainId: 1 })).toMatchInlineSnapshot(
        `"<Provider network={1} />"`,
      )
    })
  })

  describe('behavior', () => {
    it('referentially equal', async () => {
      setupClient()
      expect(
        getProvider({ chainId: 1 }) === getProvider({ chainId: 1 }),
      ).toBeTruthy()
    })
  })
})
