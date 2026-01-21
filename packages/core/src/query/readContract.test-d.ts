import { abi, config } from '@wagmi/test'
import { assertType, expectTypeOf, test } from 'vitest'

import { readContractQueryOptions } from './readContract.js'

const context = {} as any

test('default', async () => {
  const options = readContractQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
  })
  const result = await options.queryFn(context)
  expectTypeOf(result).toEqualTypeOf<bigint>()

  readContractQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    // @ts-expect-error
    functionName: 'foo',
    args: ['0x'],
  })
})

test('overloads', async () => {
  {
    const options = readContractQueryOptions(config, {
      address: '0x',
      abi: abi.viewOverloads,
      functionName: 'foo',
    })
    const result = await options.queryFn(context)
    assertType<number>(result)
  }
  {
    const options = readContractQueryOptions(config, {
      address: '0x',
      abi: abi.viewOverloads,
      functionName: 'foo',
      args: [],
    })
    const result = await options.queryFn(context)
    assertType<number>(result)
  }
  {
    const options = readContractQueryOptions(config, {
      address: '0x',
      abi: abi.viewOverloads,
      functionName: 'foo',
      args: ['0x'],
    })
    const result = await options.queryFn(context)
    assertType<string>(result)
  }
  {
    const options = readContractQueryOptions(config, {
      address: '0x',
      abi: abi.viewOverloads,
      functionName: 'foo',
      args: ['0x', '0x'],
    })
    const result = await options.queryFn(context)
    assertType<{
      foo: `0x${string}`
      bar: `0x${string}`
    }>(result)
  }
})

test('deployless read (bytecode)', async () => {
  const options = readContractQueryOptions(config, {
    code: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
  })
  const result = await options.queryFn(context)
  expectTypeOf(result).toEqualTypeOf<bigint>()
})

test('deployless read (factory)', async () => {
  const options = readContractQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    functionName: 'balanceOf',
    args: ['0x'],
    factory: '0x',
    factoryData: '0x',
  })
  const result = await options.queryFn(context)
  expectTypeOf(result).toEqualTypeOf<bigint>()
})
