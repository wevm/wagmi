import { ResolvedConfig } from 'abitype'
import { ethers } from 'ethers'
import { describe, expect, it } from 'vitest'

import { expectType, wagmiContractConfig } from '../../../test'
import { Overrides } from '../../types/contracts'
import { getContract } from './getContract'

describe('getContract', () => {
  it('default', () => {
    const result = getContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
    })
    expect(result).toBeDefined()

    // Regular function
    expectType<typeof result['balanceOf']>(
      result['balanceOf'] as (
        args_0: `0x${string}`,
        args_1?: (Overrides & { from?: `0x${string}` | undefined }) | undefined,
      ) => Promise<ResolvedConfig['BigIntType']>,
    )
    expectType<typeof result.functions['balanceOf']>(
      result.functions['balanceOf'] as (
        args_0: `0x${string}`,
        args_1?: (Overrides & { from?: `0x${string}` | undefined }) | undefined,
      ) => Promise<[ResolvedConfig['BigIntType']]>,
    )

    // Overloaded functions
    expectType<typeof result['safeTransferFrom(address,address,uint256)']>(
      result['safeTransferFrom(address,address,uint256)'] as (
        args_0: `0x${string}`,
        args_1: `0x${string}`,
        args_2: ResolvedConfig['BigIntType'],
        args_3?: (Overrides & { from?: `0x${string}` | undefined }) | undefined,
      ) => Promise<ethers.ContractTransaction>,
    )
    expectType<
      typeof result['safeTransferFrom(address,address,uint256,bytes)']
    >(
      result['safeTransferFrom(address,address,uint256,bytes)'] as (
        args_0: `0x${string}`,
        args_1: `0x${string}`,
        args_2: ResolvedConfig['BigIntType'],
        args_3: `0x${string}`,
        args_4?: (Overrides & { from?: `0x${string}` | undefined }) | undefined,
      ) => Promise<ethers.ContractTransaction>,
    )
  })
})
