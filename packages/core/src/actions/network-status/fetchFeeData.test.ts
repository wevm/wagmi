import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { fetchFeeData } from './fetchFeeData'

describe('fetchFeeData', () => {
  beforeEach(() => {
    setupClient()
  })

  it('default', async () => {
    const result = await fetchFeeData()
    expect(Object.keys(result)).toMatchInlineSnapshot(`
      [
        "lastBaseFeePerGas",
        "maxFeePerGas",
        "maxPriorityFeePerGas",
        "gasPrice",
        "formatted",
      ]
    `)
  })

  describe('args', () => {
    it('chainId', async () => {
      const result = await fetchFeeData({ chainId: 1 })
      expect(Object.keys(result)).toMatchInlineSnapshot(`
        [
          "lastBaseFeePerGas",
          "maxFeePerGas",
          "maxPriorityFeePerGas",
          "gasPrice",
          "formatted",
        ]
      `)
    })

    it('formatUnits', async () => {
      const result = await fetchFeeData({ formatUnits: 'ether' })
      expect(Object.keys(result)).toMatchInlineSnapshot(`
        [
          "lastBaseFeePerGas",
          "maxFeePerGas",
          "maxPriorityFeePerGas",
          "gasPrice",
          "formatted",
        ]
      `)
      expect(result.formatted.gasPrice?.includes('.')).toBeTruthy()
    })
  })
})
