import { abi, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { readContract, watchReadContract } from './readContract.js'

test('default', async () => {
  const result = await readContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
  })
  expectTypeOf(result).toEqualTypeOf<bigint>()
})

test('watchReadContract', async () => {
  watchReadContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
    onData(result) {
      expectTypeOf(result).toEqualTypeOf<bigint>()
    },
  })
})
