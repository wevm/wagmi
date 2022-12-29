import { BigNumber } from 'ethers'
import {
  mlootContractConfig,
  wagmigotchiContractConfig,
} from 'packages/core/test'
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
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
  },
] as const

describe('useContractInfiniteReads', () => {
  it('default', () => {
    const { data } = useContractReads({
      contracts,
    })

    assertType<[BigNumber, BigNumber, boolean, BigNumber] | undefined>(data)
  })

  describe('select', () => {
    it('to primitive', () => {
      const { data } = useContractReads({
        contracts,
        select: (data) =>
          [
            data[0].toBigInt(),
            data[1].toBigInt(),
            data[2],
            data[3].toBigInt(),
          ] as const,
      })

      assertType<readonly [bigint, bigint, boolean, bigint] | undefined>(data)
    })

    it('to object', () => {
      const { data } = useContractReads({
        contracts,
        select: (data) => ({
          loveByTom: data[0].toBigInt(),
          loveByJake: data[1].toBigInt(),
          isAlive: data[2],
          tokenId: data[3].toBigInt(),
        }),
      })

      assertType<
        | {
            loveByTom: bigint
            loveByJake: bigint
            isAlive: boolean
            tokenId: bigint
          }
        | undefined
      >(data)
    })
  })
})
