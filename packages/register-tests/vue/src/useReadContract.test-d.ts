import type { abi } from '@wagmi/test'
import type { useReadContract } from '@wagmi/vue'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'

import type { DeepUnwrapRef } from '../../../vue/src/types/ref.js'
import type { ChainId } from './config.js'

test('UseReadContractParameters', () => {
  type Result = DeepUnwrapRef<
    NonNullable<
      Parameters<
        typeof useReadContract<typeof abi.erc20, 'balanceOf', ['0x']>
      >[0]
    >
  >

  expectTypeOf<Result>().toMatchTypeOf<{
    functionName?:
      | 'symbol'
      | 'name'
      | 'allowance'
      | 'balanceOf'
      | 'decimals'
      | 'totalSupply'
      | undefined
    args?: readonly [Address] | undefined
    chainId?: ChainId | undefined
  }>()
})
