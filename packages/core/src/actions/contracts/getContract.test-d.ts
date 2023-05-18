import { describe, expectTypeOf } from 'vitest'

import { wagmiContractConfig } from '../../../test'
import { getWalletClient } from '../viem'
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

  describe('args: walletClient', async () => {
    const walletClient = await getWalletClient()
    const contract = getContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
      walletClient: walletClient!,
    })

    expectTypeOf(contract).toHaveProperty('read')
    expectTypeOf(contract).toHaveProperty('createEventFilter')
    expectTypeOf(contract).toHaveProperty('estimateGas')
    expectTypeOf(contract).toHaveProperty('simulate')
    expectTypeOf(contract).toHaveProperty('watchEvent')
    expectTypeOf(contract).toHaveProperty('write')
  })
})
