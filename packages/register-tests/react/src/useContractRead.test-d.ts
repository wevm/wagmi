import { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { type UseContractReadParameters } from 'wagmi'

import type { ChainId } from './config.js'

test('UseContractReadParameters', () => {
  type Result = UseContractReadParameters<typeof abi.erc20, 'balanceOf'>
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
