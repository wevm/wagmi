import { BigNumber } from 'ethers'
import { test } from 'vitest'

import { expectType, mlootContractConfig } from '../../../test'
import { watchReadContract } from './watchReadContract'

test.todo('watchReadContract')

// Test types
;() => {
  watchReadContract(
    {
      ...mlootContractConfig,
      functionName: 'tokenOfOwnerByIndex',
      args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
    },
    (result) => {
      // ^?
      expectType<BigNumber>(result)
    },
  )
}
;() => {
  watchReadContract(
    {
      addressOrName: '0x123',
      contractInterface: [],
      functionName: 'tokenOfOwnerByIndex',
      args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
    },
    (result) => {
      // ^?
      expectType<any>(result)
    },
  )
}
