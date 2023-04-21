import { describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { getPublicClient } from './getPublicClient'

describe('getPublicClient', () => {
  it('default', async () => {
    setupClient()
    expect(getPublicClient()).toMatchInlineSnapshot(
      '"<PublicClient network={1} />"',
    )
  })

  describe('args', () => {
    it('chainId', async () => {
      setupClient()
      expect(getPublicClient({ chainId: 1 })).toMatchInlineSnapshot(
        '"<PublicClient network={1} />"',
      )
    })
  })

  describe('behavior', () => {
    it('referentially equal', async () => {
      setupClient()
      expect(
        getPublicClient({ chainId: 1 }) === getPublicClient({ chainId: 1 }),
      ).toBeTruthy()
    })
  })
})
