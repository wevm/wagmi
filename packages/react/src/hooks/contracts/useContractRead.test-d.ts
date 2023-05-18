import { wagmigotchiContractConfig } from 'packages/core/test'
import { assertType, describe, it } from 'vitest'

import { useContractRead } from './useContractRead'

describe('useContractRead', () => {
  it('default', () => {
    const { data } = useContractRead({
      ...wagmigotchiContractConfig,
      functionName: 'love',
      args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
    })

    assertType<bigint | undefined>(data)
  })

  describe('select', () => {
    it('to primitive', () => {
      const { data } = useContractRead({
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        select(result) {
          assertType<bigint>(result)
          return result
        },
      })

      assertType<bigint | undefined>(data)
    })

    it('to object', () => {
      const { data } = useContractRead({
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        select(result) {
          assertType<bigint>(result)
          return {
            address: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
            value: result,
          }
        },
      })

      assertType<{ address: string; value: bigint } | undefined>(data)
    })
  })
})
