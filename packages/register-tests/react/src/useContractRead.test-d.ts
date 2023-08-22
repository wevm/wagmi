import { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useContractRead } from 'wagmi'

import type { ChainId } from './config.js'

test('UseContractReadParameters', () => {
  type Result = NonNullable<
    Parameters<typeof useContractRead<typeof abi.erc20, 'balanceOf', ['0x']>>[0]
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
