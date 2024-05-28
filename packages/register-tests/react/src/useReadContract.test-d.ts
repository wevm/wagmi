import type { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import type { useReadContract } from 'wagmi'

import type { ChainId } from './config.js'

test('UseReadContractParameters', () => {
  type Result = NonNullable<
    Parameters<typeof useReadContract<typeof abi.erc20, 'balanceOf', ['0x']>>[0]
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
