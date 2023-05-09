import type { InfiniteData } from '@tanstack/react-query'
import { mlootContractConfig } from 'packages/core/test'
import type { MulticallResult } from 'viem'
import { assertType, describe, it } from 'vitest'

import { useContractInfiniteReads } from './useContractInfiniteReads'

describe('useContractReads', () => {
  it('default', () => {
    const { data } = useContractInfiniteReads({
      cacheKey: 'contracts',
      contracts(index = 0) {
        const args = [BigInt(index)] as const
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

    assertType<
      | InfiniteData<
          [
            MulticallResult<string>,
            MulticallResult<string>,
            MulticallResult<bigint>,
          ]
        >
      | undefined
    >(data)
  })

  describe('select', () => {
    it('to primitive', () => {
      const { data } = useContractInfiniteReads({
        cacheKey: 'contracts',
        contracts(index = 0) {
          const args = [BigInt(index)] as const
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
              [
                `handsome ${chest.result}`,
                `big ${foot.result}`,
                balance.result,
              ] as const,
          ),
        }),
      })

      assertType<
        | InfiniteData<
            readonly [`handsome ${string}`, `big ${string}`, bigint | undefined]
          >
        | undefined
      >(data)
    })

    it('to object', () => {
      const { data } = useContractInfiniteReads({
        cacheKey: 'contracts',
        contracts(index = 0) {
          const args = [BigInt(index)] as const
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
            chest: chest.result,
            foot: foot.result,
            balance: balance.result,
          })),
        }),
      })

      assertType<
        | InfiniteData<{
            chest: string | undefined
            foot: string | undefined
            balance: bigint | undefined
          }>
        | undefined
      >(data)
    })
  })
})
