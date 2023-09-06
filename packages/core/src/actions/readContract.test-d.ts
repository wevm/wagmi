import { abi, config } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { parseAbi } from 'viem'
import { readContract } from './readContract.js'

test('default', async () => {
  const result = await readContract(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
  })
  expectTypeOf(result).toEqualTypeOf<bigint>()
})

test('overloads', async () => {
  const abi = parseAbi([
    'function foo() view returns (int8)',
    'function foo(address) view returns (string)',
    'function foo(address, address) view returns ((address foo, address bar))',
    'function bar() view returns (int8)',
  ])

  const result1 = await readContract(config, {
    address: '0x',
    abi,
    functionName: 'foo',
  })
  assertType<number>(result1)

  const result2 = await readContract(config, {
    address: '0x',
    abi,
    functionName: 'foo',
    args: [],
  })
  assertType<number>(result2)

  const result3 = await readContract(config, {
    address: '0x',
    abi,
    functionName: 'foo',
    args: ['0x'],
  })
  assertType<string>(result3)

  const result4 = await readContract(config, {
    address: '0x',
    abi,
    functionName: 'foo',
    args: ['0x', '0x'],
  })
  assertType<{
    foo: `0x${string}`
    bar: `0x${string}`
  }>(result4)
})
