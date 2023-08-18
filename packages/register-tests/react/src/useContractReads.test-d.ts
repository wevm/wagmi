import { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { type UseContractReadsParameters } from 'wagmi'

import type { ChainId } from './config.js'

test('UseContractReadsParameters', () => {
  type Result = UseContractReadsParameters<
    [
      {
        abi: typeof abi.erc20
        functionName: 'balanceOf'
        address: Address
        args: readonly [Address]
      },
    ]
  >['contracts']
  expectTypeOf<Result>().toMatchTypeOf<
    | readonly [
        {
          abi?: typeof abi.erc20 | undefined
          functionName?:
            | 'symbol'
            | 'name'
            | 'allowance'
            | 'balanceOf'
            | 'decimals'
            | 'totalSupply'
            | undefined
          address?: Address | undefined
          args?: readonly [Address] | undefined
          chainId?: ChainId | undefined
        },
      ]
    | undefined
  >()
})
