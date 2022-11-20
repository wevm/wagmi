import type { ExtractAbiEvent, ResolvedConfig } from 'abitype'
import type { ethers } from 'ethers'
import { BigNumber } from 'ethers'
import { assertType, describe, expectTypeOf } from 'vitest'

import { wagmiContractConfig } from '../../../test'
import type { CallOverrides, Event, Overrides } from '../../types/contracts'
import { getContract } from './getContract'

describe('getContract', () => {
  const contract = getContract({
    address: wagmiContractConfig.address,
    abi: wagmiContractConfig.abi,
  })

  describe('regular function', () => {
    expectTypeOf(contract.balanceOf).toBeCallableWith('0x…', { from: '0x…' })
    expectTypeOf(contract.balanceOf)
      .parameter(0)
      .toEqualTypeOf<ResolvedConfig['AddressType']>()
    expectTypeOf(contract.balanceOf)
      .parameter(1)
      .toEqualTypeOf<CallOverrides | undefined>()
    expectTypeOf(contract.balanceOf).returns.resolves.toEqualTypeOf<BigNumber>()

    expectTypeOf(contract.functions.balanceOf).toBeCallableWith('0x…', {
      from: '0x…',
    })
    expectTypeOf(contract.functions.balanceOf)
      .parameter(0)
      .toEqualTypeOf<ResolvedConfig['AddressType']>()
    expectTypeOf(contract.functions.balanceOf)
      .parameter(1)
      .toEqualTypeOf<CallOverrides | undefined>()
    expectTypeOf(contract.functions.balanceOf).returns.resolves.toEqualTypeOf<
      [BigNumber]
    >()
  })

  describe('overloaded function', () => {
    const functionNameA = 'safeTransferFrom(address,address,uint256)'
    expectTypeOf(contract[functionNameA]).toBeCallableWith(
      '0x…',
      '0x…',
      BigNumber.from('123'),
      { from: '0x…' },
    )
    expectTypeOf(contract[functionNameA])
      .parameter(0)
      .toEqualTypeOf<ResolvedConfig['AddressType']>()
    expectTypeOf(contract[functionNameA])
      .parameter(1)
      .toEqualTypeOf<ResolvedConfig['AddressType']>()
    expectTypeOf(contract[functionNameA])
      .parameter(2)
      .toEqualTypeOf<ResolvedConfig['BigIntType']>()
    expectTypeOf(contract[functionNameA])
      .parameter(3)
      .toEqualTypeOf<
        (Overrides & { from?: `0x${string}` | undefined }) | undefined
      >()
    expectTypeOf(
      contract[functionNameA],
    ).returns.resolves.toEqualTypeOf<ethers.ContractTransaction>()

    const functionNameB = 'safeTransferFrom(address,address,uint256,bytes)'
    expectTypeOf(contract[functionNameB]).toBeCallableWith(
      '0x…',
      '0x…',
      BigNumber.from('123'),
      '0x…',
      { from: '0x…' },
    )
    expectTypeOf(contract[functionNameB])
      .parameter(0)
      .toEqualTypeOf<ResolvedConfig['AddressType']>()
    expectTypeOf(contract[functionNameB])
      .parameter(1)
      .toEqualTypeOf<ResolvedConfig['AddressType']>()
    expectTypeOf(contract[functionNameB])
      .parameter(2)
      .toEqualTypeOf<ResolvedConfig['BigIntType']>()
    expectTypeOf(contract[functionNameB])
      .parameter(3)
      .toEqualTypeOf<ResolvedConfig['BytesType']>()
    expectTypeOf(contract[functionNameB])
      .parameter(4)
      .toEqualTypeOf<
        (Overrides & { from?: `0x${string}` | undefined }) | undefined
      >()
    expectTypeOf(
      contract[functionNameB],
    ).returns.resolves.toEqualTypeOf<ethers.ContractTransaction>()
  })

  // Events
  contract.on('Transfer', (from, to, value, event) => {
    assertType<ResolvedConfig['AddressType']>(from)
    assertType<ResolvedConfig['AddressType']>(to)
    assertType<ResolvedConfig['BigIntType']>(value)
    assertType<
      Event<ExtractAbiEvent<typeof wagmiContractConfig.abi, 'Transfer'>>
    >(event)
  })
})
