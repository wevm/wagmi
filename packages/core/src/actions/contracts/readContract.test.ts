import type { ResolvedConfig } from 'abitype'
import { assertType, beforeEach, describe, expect, it } from 'vitest'

import {
  mlootContractConfig,
  setupClient,
  wagmiContractConfig,
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
      expect(result).toMatchInlineSnapshot('2n')
      assertType<ResolvedConfig['BigIntType']>(result)
    })

    it('contract args', async () => {
      const result = await readContract({
        //  ^?
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
      })
      expect(result).toMatchInlineSnapshot('2n')
      assertType<ResolvedConfig['BigIntType']>(result)
    })

    it('blockNumber', async () => {
      let result = await readContract({
        //  ^?
        ...wagmiContractConfig,
        functionName: 'totalSupply',
        blockNumber: 15567770n,
      })
      expect(result).toMatchInlineSnapshot('4n')

      result = await readContract({
        //  ^?
        ...wagmiContractConfig,
        functionName: 'totalSupply',
        blockNumber: 15572683n,
      })
      expect(result).toMatchInlineSnapshot('102n')
      assertType<ResolvedConfig['BigIntType']>(result)
    })

    it('blockTag', async () => {
      const result = await readContract({
        //  ^?
        ...wagmiContractConfig,
        functionName: 'totalSupply',
        blockTag: 'safe',
      })
      expect(result).toBeDefined()
    })
  })

  describe('behavior', () => {
    it('can use multiple args', async () => {
      const result = await readContract({
        //  ^?
        ...mlootContractConfig,
        functionName: 'tokenOfOwnerByIndex',
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
      })
      expect(result).toMatchInlineSnapshot('370395n')
      assertType<ResolvedConfig['BigIntType']>(result)
    })
  })

  describe('errors', () => {
    it('fake address', async () => {
      await expect(() =>
        readContract({
          //  ^?
          ...mlootContractConfig,
          address: '0x0000000000000000000000000000000000000000',
          functionName: 'tokenOfOwnerByIndex',
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "The contract function \\"tokenOfOwnerByIndex\\" returned no data (\\"0x\\").

        This could be due to any of the following:
          - The contract does not have the function \\"tokenOfOwnerByIndex\\",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.
         
        Contract Call:
          address:   0x0000000000000000000000000000000000000000
          function:  tokenOfOwnerByIndex(address owner, uint256 index)
          args:                         (0xA0Cf798816D4b9b9866b5330EEa46a18382f251e, 0)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12"
      `)
    })
  })
})
