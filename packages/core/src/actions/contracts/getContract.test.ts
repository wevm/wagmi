import { ExtractAbiEvent, ResolvedConfig } from 'abitype'
import { ethers } from 'ethers'
import { describe, expect, it } from 'vitest'

import { expectType, wagmiContractConfig } from '../../../test'
import { Event, Overrides } from '../../types/contracts'
import { getContract } from './getContract'

describe('getContract', () => {
  it('default', () => {
    const contract = getContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
    })
    expect(contract).toBeDefined()

    // Regular function
    expectType<typeof contract['balanceOf']>(
      contract['balanceOf'] as (
        args_0: `0x${string}`,
        args_1?: (Overrides & { from?: `0x${string}` | undefined }) | undefined,
      ) => Promise<ResolvedConfig['BigIntType']>,
    )
    expectType<typeof contract.functions['balanceOf']>(
      contract.functions['balanceOf'] as (
        args_0: `0x${string}`,
        args_1?: (Overrides & { from?: `0x${string}` | undefined }) | undefined,
      ) => Promise<[ResolvedConfig['BigIntType']]>,
    )

    // Overloaded functions
    expectType<typeof contract['safeTransferFrom(address,address,uint256)']>(
      contract['safeTransferFrom(address,address,uint256)'] as (
        args_0: `0x${string}`,
        args_1: `0x${string}`,
        args_2: ResolvedConfig['BigIntType'],
        args_3?: (Overrides & { from?: `0x${string}` | undefined }) | undefined,
      ) => Promise<ethers.ContractTransaction>,
    )
    expectType<
      typeof contract['safeTransferFrom(address,address,uint256,bytes)']
    >(
      contract['safeTransferFrom(address,address,uint256,bytes)'] as (
        args_0: `0x${string}`,
        args_1: `0x${string}`,
        args_2: ResolvedConfig['BigIntType'],
        args_3: `0x${string}`,
        args_4?: (Overrides & { from?: `0x${string}` | undefined }) | undefined,
      ) => Promise<ethers.ContractTransaction>,
    )

    // Events
    ;() => {
      contract.on('Transfer', (from, to, value, event) => {
        expectType<ResolvedConfig['AddressType']>(from)
        expectType<ResolvedConfig['AddressType']>(to)
        expectType<ResolvedConfig['BigIntType']>(value)
        expectType<
          Event<ExtractAbiEvent<typeof wagmiContractConfig.abi, 'Transfer'>>
        >(event)
      })
    }
  })
})
