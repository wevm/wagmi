import { abi } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useReadContract } from 'wagmi'

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

  const result = useReadContract({
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
    query: {
      select(data) {
        expectTypeOf(data).toEqualTypeOf<bigint>()
        return data?.toString()
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<string | undefined>()
})
