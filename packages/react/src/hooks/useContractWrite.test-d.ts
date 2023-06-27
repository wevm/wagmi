import type { WriteContractError } from '@wagmi/core'
import { type Abi, type Address, parseAbi } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { useContractWrite } from './useContractWrite.js'

const abi = parseAbi([
  'function createBid(uint256 nounId) payable',
  'function initialize(address _nouns, address _weth, uint256 _timeBuffer, uint256 _reservePrice, uint8 _minBidIncrementPercentage, uint256 _duration)',
  'function minBidIncrementPercentage() view returns (uint8)',
  'function nouns() view returns (address)',
  'function owner() view returns (address)',
  'function pause()',
  'function paused() view returns (bool)',
])

const contextValue = { foo: 'bar' } as const

test('required', () => {
  // @ts-expect-error
  useContractWrite().write()

  expectTypeOf(useContractWrite().write).parameter(0).toEqualTypeOf<{
    abi: readonly unknown[] | Abi
    address: Address
    args?: readonly unknown[] | undefined
    chainId?: number | undefined
    functionName: string
    value?: bigint | undefined
  }>()
})

test('optional', () => {
  expectTypeOf(useContractWrite({ abi, address: '0x' }).write)
    .parameter(0)
    .toEqualTypeOf<{
      abi?: readonly unknown[] | Abi | undefined
      address?: Address | undefined
      args?: readonly unknown[] | undefined
      chainId?: number | undefined
      functionName: string
      value?: bigint | undefined
    }>()
})

test('example', () => {
  useContractWrite({
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
  }).write()
  useContractWrite({
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
  }).write({
    value: 123n,
  })
  useContractWrite({
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
  }).write({
    args: [123n],
    // ^?
    value: 123n,
  })
  useContractWrite({
    abi,
    address: '0x',
  }).write({
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
  })
  useContractWrite({
    address: '0x',
  }).write({
    abi,
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
  })
  useContractWrite().write({
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
  })
})

test('context', () => {
  type Variables = {
    abi: typeof abi
    address: Address
    functionName: 'createBid' | 'initialize' | 'pause'
    args: readonly [bigint]
    chainId?: number | undefined
    value: bigint
  }
  useContractWrite({
    address: '0x',
    abi,
    functionName: 'createBid',
    args: [123n],
    value: 123n,
    onMutate(variables) {
      expectTypeOf(variables).toEqualTypeOf<Variables>()
      return contextValue
    },
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<Variables>()
      expectTypeOf(error).toEqualTypeOf<WriteContractError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<Variables>()
      expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
      expectTypeOf(error).toEqualTypeOf<WriteContractError | null>()
      expectTypeOf(variables).toEqualTypeOf<Variables>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  }).write(undefined, {
    onError(error, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<Variables>()
      expectTypeOf(error).toEqualTypeOf<WriteContractError>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
    onSuccess(data, variables, context) {
      expectTypeOf(variables).toEqualTypeOf<Variables>()
      expectTypeOf(data).toEqualTypeOf<`0x${string}`>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue>()
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
      expectTypeOf(error).toEqualTypeOf<WriteContractError | null>()
      expectTypeOf(variables).toEqualTypeOf<Variables>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  })
})

test.todo('const asserted abi', () => {})

test.todo('declared as Abi', () => {})

test.todo('unknown abi', () => {})
