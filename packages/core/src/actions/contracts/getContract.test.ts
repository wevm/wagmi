import { beforeEach, describe, expect, it } from 'vitest'

import { setupConfig, wagmiContractConfig } from '../../../test'
import { getContract } from './getContract'

describe('getContract', () => {
  beforeEach(() => {
    setupConfig()
  })

  it('default', () => {
    const contract = getContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
    })
    expect(contract).toBeDefined()
  })
})
