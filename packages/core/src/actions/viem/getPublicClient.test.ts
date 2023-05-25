import { describe, expect, it } from 'vitest'

import { setupConfig } from '../../../test'
import { getPublicClient } from './getPublicClient'

describe('getPublicClient', () => {
  it('default', async () => {
    setupConfig()
    expect(getPublicClient()).toMatchInlineSnapshot(
      '"<PublicClient network={1} />"',
    )
  })

  describe('args', () => {
    it('chainId', async () => {
      setupConfig()
      expect(getPublicClient({ chainId: 1 })).toMatchInlineSnapshot(
        '"<PublicClient network={1} />"',
      )
    })
  })

  describe('behavior', () => {
    it('referentially equal', async () => {
      setupConfig()
      expect(
        // rome-ignore lint/suspicious/noSelfCompare: <explanation>
        getPublicClient({ chainId: 1 }) === getPublicClient({ chainId: 1 }),
      ).toBeTruthy()
    })
  })
})
