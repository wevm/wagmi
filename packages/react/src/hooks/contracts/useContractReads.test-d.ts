import {
  mlootContractConfig,
  wagmigotchiContractConfig,
} from 'packages/core/test'
import type { MulticallResult } from 'viem'
import { assertType, describe, it } from 'vitest'

import { useContractReads } from './useContractReads'

const contracts = [
  {
    ...wagmigotchiContractConfig,
    functionName: 'love',
    args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
  },
  {
    ...wagmigotchiContractConfig,
    functionName: 'love',
    args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
  },
  { ...wagmigotchiContractConfig, functionName: 'getAlive' },
  {
    ...mlootContractConfig,
    functionName: 'tokenOfOwnerByIndex',
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
  },
] as const

describe('useContractInfiniteReads', () => {
  it('default', () => {
    const { data } = useContractReads({
      contracts,
    })

    assertType<
      | [
          MulticallResult<bigint>,
          MulticallResult<bigint>,
          MulticallResult<boolean>,
          MulticallResult<bigint>,
        ]
      | undefined
    >(data)
  })

  describe('select', () => {
    it('to primitive', () => {
      const { data } = useContractReads({
        contracts,
        select: (data) =>
          [
            data[0].result,
            data[1].result,
            data[2].result,
            data[3].result,
          ] as const,
      })

      assertType<
        | readonly [
            bigint | undefined,
            bigint | undefined,
            boolean | undefined,
            bigint | undefined,
          ]
        | undefined
      >(data)
    })

    it('to object', () => {
      const { data } = useContractReads({
        contracts,
        select: (data) => ({
          loveByTom: data[0].result,
          loveByJake: data[1].result,
          isAlive: data[2].result,
          tokenId: data[3].result,
        }),
      })

      assertType<
        | {
            loveByTom: bigint | undefined
            loveByJake: bigint | undefined
            isAlive: boolean | undefined
            tokenId: bigint | undefined
          }
        | undefined
      >(data)
    })
  })
})
