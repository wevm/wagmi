import { ResolvedConfig } from 'abitype'
import { BigNumber } from 'ethers'
import { describe, it } from 'vitest'

import { expectType, mlootContractConfig } from '../../../test'
import { watchReadContract } from './watchReadContract'

describe('watchReadContract', () => {
  it.skip('types', () => {
    watchReadContract(
      {
        ...mlootContractConfig,
        functionName: 'tokenOfOwnerByIndex',
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
      },
      (result) => {
        // ^?
        expectType<ResolvedConfig['BigIntType']>(result)
      },
    )

    watchReadContract(
      {
        address: '0x123',
        abi: [],
        functionName: 'tokenOfOwnerByIndex',
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
      },
      (result) => {
        // ^?
        expectType<unknown>(result)
      },
    )
  })
})
