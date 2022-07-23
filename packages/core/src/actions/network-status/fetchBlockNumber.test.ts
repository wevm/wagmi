import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { fetchBlockNumber } from './fetchBlockNumber'

describe('fetchBlockNumber', () => {
  beforeEach(() => {
    setupClient()
  })

  it('default', async () => {
    expect(await fetchBlockNumber()).toBeDefined()
  })

  describe('args', () => {
    it('chainId', async () => {
      expect(await fetchBlockNumber({ chainId: 1 })).toBeDefined()
    })
  })
})
