import { describe, expectTypeOf } from 'vitest'

import { wagmiContractConfig } from '../../../test'
import { fetchSigner } from '../accounts'
import { getContract } from './getContract'

describe('getContract', () => {
  describe('default', () => {
    const contract = getContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
    })

    expectTypeOf(contract).toHaveProperty('read')
    expectTypeOf(contract).toHaveProperty('createEventFilter')
    expectTypeOf(contract).toHaveProperty('estimateGas')
    expectTypeOf(contract).toHaveProperty('simulate')
    expectTypeOf(contract).toHaveProperty('watchEvent')
    expectTypeOf(contract).not.toHaveProperty('write')
  })

  describe('args: signer', async () => {
    const signer = await fetchSigner()
    const contract = getContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
      signer: signer!,
    })

    expectTypeOf(contract).toHaveProperty('read')
    expectTypeOf(contract).toHaveProperty('createEventFilter')
    expectTypeOf(contract).toHaveProperty('estimateGas')
    expectTypeOf(contract).toHaveProperty('simulate')
    expectTypeOf(contract).toHaveProperty('watchEvent')
    expectTypeOf(contract).toHaveProperty('write')
  })
})
