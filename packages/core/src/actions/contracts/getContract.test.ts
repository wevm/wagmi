import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient, wagmiContractConfig } from '../../../test'
import { getContract } from './getContract'

describe('getContract', () => {
  beforeEach(() => {
    setupClient()
  })

  it('default', () => {
    const contract = getContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
    })
    expect(contract).toBeDefined()
  })
})
