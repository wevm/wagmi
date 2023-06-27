import { config } from '@wagmi/test'
import { type Abi, type ExtractAbiFunctionNames } from 'abitype'
import { nounsAuctionHouseAbi } from 'abitype/test'
import { expectTypeOf, test } from 'vitest'

import { type WriteContractParameters, writeContract } from './writeContract.js'
import { type Address, parseAbi } from 'viem'

test('const asserted abi', () => {
  writeContract(config, {
    abi: nounsAuctionHouseAbi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
    // ^?
  })

  type Result = WriteContractParameters<
    typeof config,
    typeof nounsAuctionHouseAbi,
    'createBid',
    123
  >
  expectTypeOf<Result>().toEqualTypeOf<{
    abi: typeof nounsAuctionHouseAbi
    address: Address
    args: readonly [bigint]
    chainId?: 123 | 456 | undefined
    functionName: ExtractAbiFunctionNames<
      typeof nounsAuctionHouseAbi,
      'nonpayable' | 'payable'
    >
    value: bigint
  }>()
})

test('declared as Abi', () => {
  writeContract(config, {
    abi: nounsAuctionHouseAbi as Abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
    // ^?
  })

  type Result = WriteContractParameters<typeof config, Abi, never, 123>
  expectTypeOf<Result>().toEqualTypeOf<{
    abi: Abi
    address: Address
    args?: readonly unknown[] | undefined
    chainId?: 123 | 456 | undefined
    functionName: string
    value?: bigint | undefined
  }>()
})

test('unknown abi', () => {
  const abi = nounsAuctionHouseAbi as readonly unknown[]
  writeContract(config, {
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
    // ^?
  })

  type Result = WriteContractParameters<typeof config, typeof abi, never, 123>
  expectTypeOf<Result>().toEqualTypeOf<{
    abi: readonly unknown[]
    address: Address
    args?: readonly unknown[] | undefined
    chainId?: 123 | 456 | undefined
    functionName: string
    value?: bigint | undefined
  }>()
})

test('no args', () => {
  const abi = parseAbi(['function createBid() payable'])
  writeContract(config, {
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    value: 123n,
  })

  type Result = WriteContractParameters<typeof config, typeof abi, 'createBid'>
  expectTypeOf<Result>().toEqualTypeOf<{
    abi: typeof abi
    address: Address
    args?: readonly [] | undefined
    chainId?: 123 | 456 | undefined
    functionName: 'createBid'
    value: bigint
  }>()
})

test('nonpayable overloads', () => {
  const abi = parseAbi([
    'function createBid(uint256 nounId)',
    'function createBid(uint256 nounId, uint256 amount)',
  ])
  writeContract(config, {
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
  })

  type Result = WriteContractParameters<typeof config, typeof abi, 'createBid'>
  expectTypeOf<Result>().toEqualTypeOf<{
    abi: typeof abi
    address: Address
    args: readonly [bigint] | readonly [bigint, bigint]
    chainId?: 123 | 456 | undefined
    functionName: 'createBid'
  }>()
})

test('payable overloads', () => {
  const abi = parseAbi([
    'function createBid(uint256 nounId) payable',
    'function createBid(uint256 nounId, uint256 amount) payable',
  ])
  writeContract(config, {
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
    // ^?
  })

  type Result = WriteContractParameters<typeof config, typeof abi, 'createBid'>
  expectTypeOf<Result>().toEqualTypeOf<{
    abi: typeof abi
    address: Address
    args: readonly [bigint] | readonly [bigint, bigint]
    chainId?: 123 | 456 | undefined
    functionName: 'createBid'
    value: bigint
  }>()
})

test('mixed overloads', () => {
  const abi = parseAbi([
    'function createBid(uint256 nounId) payable',
    'function createBid(uint256 nounId, uint256 amount)',
  ])
  writeContract(config, {
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
    args: [123n],
    // ^?
    value: 123n,
    // ^?
  })

  type Result = WriteContractParameters<typeof config, typeof abi, 'createBid'>
  expectTypeOf<Result>().toEqualTypeOf<{
    abi: typeof abi
    address: Address
    args: readonly [bigint] | readonly [bigint, bigint]
    chainId?: 123 | 456 | undefined
    functionName: 'createBid'
    value?: bigint | undefined
  }>()
})

test('overload with no args', () => {
  const abi = parseAbi([
    'function createBid() payable',
    'function createBid(uint256 nounId, uint256 amount)',
  ])
  writeContract(config, {
    abi,
    address: '0x',
    functionName: 'createBid',
    // ^?
  })

  type Result = WriteContractParameters<typeof config, typeof abi, 'createBid'>
  expectTypeOf<Result>().toEqualTypeOf<{
    abi: typeof abi
    address: Address
    args?: readonly [] | readonly [bigint, bigint] | undefined
    chainId?: 123 | 456 | undefined
    functionName: 'createBid'
    value?: bigint | undefined
  }>()
})
