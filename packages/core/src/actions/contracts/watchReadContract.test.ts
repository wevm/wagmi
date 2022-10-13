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
        abi: [
          {
            inputs: [
              { name: 'owner', type: 'address' },
              { name: 'index', type: 'uint256' },
            ],
            name: 'tokenOfOwnerByIndex',
            outputs: [{ name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'tokenOfOwnerByIndex',
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
      },
      (result) => {
        // ^?
        expectType<ResolvedConfig['BigIntType']>(result)
      },
    )
  })
})
