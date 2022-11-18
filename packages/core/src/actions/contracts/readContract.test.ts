import type { ResolvedConfig } from 'abitype'
import { BigNumber } from 'ethers'
import { assertType, beforeEach, describe, expect, it } from 'vitest'

import {
  mlootContractConfig,
  setupClient,
  wagmigotchiContractConfig,
} from '../../../test'
import { readContract } from './readContract'

describe('readContract', () => {
  describe('args', () => {
    beforeEach(() => {
      setupClient()
    })

    it('chainId', async () => {
      const result = await readContract({
        //  ^?
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        chainId: 1,
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "hex": "0x02",
          "type": "BigNumber",
        }
      `)
      assertType<ResolvedConfig['BigIntType']>(result)
    })

    it('contract args', async () => {
      const result = await readContract({
        //  ^?
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "hex": "0x02",
          "type": "BigNumber",
        }
      `)
      assertType<ResolvedConfig['BigIntType']>(result)
    })

    it('overrides', async () => {
      const result = await readContract({
        //  ^?
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        overrides: {},
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "hex": "0x02",
          "type": "BigNumber",
        }
      `)
      assertType<ResolvedConfig['BigIntType']>(result)
    })
  })

  describe('behavior', () => {
    it('can use multiple args', async () => {
      const result = await readContract({
        //  ^?
        ...mlootContractConfig,
        functionName: 'tokenOfOwnerByIndex',
        args: [
          '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          BigNumber.from('0'),
        ],
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "hex": "0x05a6db",
          "type": "BigNumber",
        }
      `)
      assertType<ResolvedConfig['BigIntType']>(result)
    })
  })
})
