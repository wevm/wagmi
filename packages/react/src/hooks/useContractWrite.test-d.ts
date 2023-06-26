import type { WriteContractError } from '@wagmi/core'
import { type Address, parseAbi } from 'viem'
import { expectTypeOf } from 'vitest'

import { useContractWrite } from './useContractWrite.js'

const nounsAuctionHouseHumanReadableAbi = [
  'event AuctionBid(uint256 indexed nounId, address sender, uint256 value, bool extended)',
  'event AuctionCreated(uint256 indexed nounId, uint256 startTime, uint256 endTime)',
  'event AuctionExtended(uint256 indexed nounId, uint256 endTime)',
  'event AuctionMinBidIncrementPercentageUpdated(uint256 minBidIncrementPercentage)',
  'event AuctionReservePriceUpdated(uint256 reservePrice)',
  'event AuctionSettled(uint256 indexed nounId, address winner, uint256 amount)',
  'event AuctionTimeBufferUpdated(uint256 timeBuffer)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event Paused(address account)',
  'event Unpaused(address account)',
  'function auction(uint256 nounId) view returns (uint256 nounId, uint256 amount, uint256 startTime, uint256 endTime, address bidder, bool settled)',
  'function createBid(uint256 nounId) payable',
  'function duration() view returns (uint256)',
  'function initialize(address _nouns, address _weth, uint256 _timeBuffer, uint256 _reservePrice, uint8 _minBidIncrementPercentage, uint256 _duration)',
  'function minBidIncrementPercentage() view returns (uint8)',
  'function nouns() view returns (address)',
  'function owner() view returns (address)',
  'function pause()',
  'function paused() view returns (bool)',
  'function renounceOwnership()',
  'function reservePrice() view returns (uint256)',
  'function setMinBidIncrementPercentage(uint8 _minBidIncrementPercentage)',
  'function setReservePrice(uint256 _reservePrice)',
  'function setTimeBuffer(uint256 _timeBuffer)',
  'function settleAuction()',
  'function settleCurrentAndCreateNewAuction()',
  'function timeBuffer() view returns (uint256)',
  'function newOwner() view returns (address)',
  'function unpause()',
  'function weth() view returns (address)',
] as const
const abi = parseAbi(nounsAuctionHouseHumanReadableAbi)

const contextValue = { foo: 'bar' } as const

useContractWrite({
  abi,
  address: '0x',
  functionName: 'createBid',
  // ^?
  args: [123n],
  // ^?
  value: 123n,
  // ^?
  mutation: {
    onMutate() {
      return contextValue
    },
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
      expectTypeOf(error).toEqualTypeOf<WriteContractError | null>()
      expectTypeOf(variables).toEqualTypeOf<{
        abi: typeof abi
        address: Address
        functionName:
          | 'createBid'
          | 'initialize'
          | 'pause'
          | 'renounceOwnership'
          | 'setMinBidIncrementPercentage'
          | 'setReservePrice'
          | 'setTimeBuffer'
          | 'settleAuction'
          | 'settleCurrentAndCreateNewAuction'
          | 'unpause'
        args: readonly [bigint]
        chainId?: number | undefined
        value: bigint
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  },
}).write(
  {},
  {
    onSettled(data, error, variables, context) {
      expectTypeOf(data).toEqualTypeOf<`0x${string}` | undefined>()
      expectTypeOf(error).toEqualTypeOf<WriteContractError | null>()
      expectTypeOf(variables).toEqualTypeOf<{
        abi: typeof abi
        address: Address
        functionName:
          | 'createBid'
          | 'initialize'
          | 'pause'
          | 'renounceOwnership'
          | 'setMinBidIncrementPercentage'
          | 'setReservePrice'
          | 'setTimeBuffer'
          | 'settleAuction'
          | 'settleCurrentAndCreateNewAuction'
          | 'unpause'
        args: readonly [bigint]
        chainId?: number | undefined
        value: bigint
      }>()
      expectTypeOf(context).toEqualTypeOf<typeof contextValue | undefined>()
    },
  },
)

useContractWrite({
  abi,
  address: '0x',
  functionName: 'createBid',
  args: [123n],
}).write({
  value: 123n,
})
useContractWrite({
  abi: abi,
  address: '0x',
  functionName: 'initialize',
  args: ['0x', '0x', 123n, 123n, 123, 123n],
}).write({})
useContractWrite({
  address: '0x',
  abi,
}).writeAsync({
  functionName: 'initialize',
  args: ['0x', '0x', 123n, 123n, 123, 123n],
})

useContractWrite({
  address: '0x',
  abi: parseAbi(['function foo() returns (uint256)']),
  functionName: 'foo',
  args: [],
}).write({})
