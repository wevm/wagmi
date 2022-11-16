import type { ResolvedConfig } from 'abitype'
import { BigNumber } from 'ethers'
import { assertType, describe } from 'vitest'

import { mlootContractConfig } from '../../../test'
import { watchReadContract } from './watchReadContract'

describe('watchReadContract', () => {
  watchReadContract(
    {
      ...mlootContractConfig,
      functionName: 'tokenOfOwnerByIndex',
      args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
    },
    (result) => {
      // ^?
      assertType<ResolvedConfig['BigIntType']>(result)
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
      assertType<ResolvedConfig['BigIntType']>(result)
    },
  )
})
