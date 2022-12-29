import type { InfiniteData } from '@tanstack/react-query'
import { BigNumber } from 'ethers'
import { mlootContractConfig } from 'packages/core/test'
import { assertType, describe, it } from 'vitest'

import { useContractInfiniteReads } from './useContractInfiniteReads'

describe('useContractReads', () => {
  it('default', () => {
    const { data } = useContractInfiniteReads({
      cacheKey: 'contracts',
      contracts(index = 0) {
        const args = [BigNumber.from(index)] as const
        return [
          { ...mlootContractConfig, functionName: 'getChest', args },
          { ...mlootContractConfig, functionName: 'getFoot', args },
          {
            ...mlootContractConfig,
            functionName: 'balanceOf',
            args: ['0x123'] as const,
          },
        ]
      },
    })

    assertType<InfiniteData<[string, string, BigNumber]> | undefined>(data)
  })

  describe('select', () => {
    it('to primitive', () => {
      const { data } = useContractInfiniteReads({
        cacheKey: 'contracts',
        contracts(index = 0) {
          const args = [BigNumber.from(index)] as const
          return [
            { ...mlootContractConfig, functionName: 'getChest', args },
            { ...mlootContractConfig, functionName: 'getFoot', args },
            {
              ...mlootContractConfig,
              functionName: 'balanceOf',
              args: ['0x123'] as const,
            },
          ]
        },
        select: (data) => ({
          ...data,
          pages: data.pages.map(
            ([chest, foot, balance]) =>
              [`handsome ${chest}`, `big ${foot}`, balance.toBigInt()] as const,
          ),
        }),
      })

      assertType<
        | InfiniteData<readonly [`handsome ${string}`, `big ${string}`, bigint]>
        | undefined
      >(data)
    })

    it('to object', () => {
      const { data } = useContractInfiniteReads({
        cacheKey: 'contracts',
        contracts(index = 0) {
          const args = [BigNumber.from(index)] as const
          return [
            { ...mlootContractConfig, functionName: 'getChest', args },
            { ...mlootContractConfig, functionName: 'getFoot', args },
            {
              ...mlootContractConfig,
              functionName: 'balanceOf',
              args: ['0x123'] as const,
            },
          ]
        },
        select: (data) => ({
          ...data,
          pages: data.pages.map(([chest, foot, balance]) => ({
            chest,
            foot,
            balance: balance.toBigInt(),
          })),
        }),
      })

      assertType<
        | InfiniteData<{ chest: string; foot: string; balance: bigint }>
        | undefined
      >(data)
    })
  })
})
