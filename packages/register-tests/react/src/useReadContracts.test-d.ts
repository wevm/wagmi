import type { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import type { useReadContracts } from 'wagmi'

import type { ChainId } from './config.js'

test('UseReadContractsParameters', () => {
  type Result = NonNullable<
    Parameters<
      typeof useReadContracts<
        [
          {
            abi: typeof abi.erc20
            functionName: 'balanceOf'
            address: Address
            args: readonly [Address]
          },
        ]
      >
    >[0]
  >['contracts']
  expectTypeOf<Result>().toMatchTypeOf<
    | readonly [
        {
          abi?: typeof abi.erc20 | undefined
          functionName?:
            | 'approve'
            | 'symbol'
            | 'name'
            | 'allowance'
            | 'balanceOf'
            | 'decimals'
            | 'totalSupply'
            | 'transfer'
            | 'transferFrom'
            | undefined
          address?: Address | undefined
          args?: readonly [Address] | undefined
          chainId?: ChainId | undefined
        },
      ]
    | undefined
  >()
})
