import { describe, expect, it } from 'vitest'

import { erc20ABI } from '../../constants'
import { getContract } from './getContract'

describe('getContract', () => {
  it('default', () => {
    const result = getContract({
      address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      abi: erc20ABI,
    })
    expect(result).toBeDefined()
  })
})
