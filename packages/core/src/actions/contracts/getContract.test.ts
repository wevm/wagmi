import { describe, expect, it } from 'vitest'

import { wagmiContractConfig } from '../../../test'
import { getContract } from './getContract'

describe('getContract', () => {
  it('default', () => {
    const contract = getContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
    })
    expect(contract).toBeDefined()
  })
})
