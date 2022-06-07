import {
  mlootContractConfig,
  setupClient,
  wagmigotchiContractConfig,
} from '../../../test'
import { readContract } from './readContract'

describe('readContract', () => {
  describe('args', () => {
    beforeEach(() => setupClient())

    it('chainId', async () => {
      expect(
        await readContract({
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(`
        {
          "hex": "0x02",
          "type": "BigNumber",
        }
      `)
    })

    it('contract args', async () => {
      expect(
        await readContract({
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
        }),
      ).toMatchInlineSnapshot(`
        {
          "hex": "0x02",
          "type": "BigNumber",
        }
      `)
    })

    it('overrides', async () => {
      expect(
        await readContract({
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
          overrides: {},
        }),
      ).toMatchInlineSnapshot(`
        {
          "hex": "0x02",
          "type": "BigNumber",
        }
      `)
    })
  })

  describe('behavior', () => {
    it('can use multiple args', async () => {
      expect(
        await readContract({
          ...mlootContractConfig,
          functionName: 'tokenOfOwnerByIndex',
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
        }),
      ).toMatchInlineSnapshot(`
        {
          "hex": "0x05a6db",
          "type": "BigNumber",
        }
      `)
    })
  })
})
