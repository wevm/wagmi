import { setupClient } from '../../../test'
import { readContract } from './readContract'

const wagmigotchiContractConfig = {
  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  contractInterface: [
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'love',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

const mlootContractConfig = {
  addressOrName: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  contractInterface: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

describe('readContract', () => {
  describe('args', () => {
    beforeEach(() => setupClient())

    it('chainId', async () => {
      expect(
        await readContract(wagmigotchiContractConfig, 'love', {
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
        await readContract(wagmigotchiContractConfig, 'love', {
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
        await readContract(wagmigotchiContractConfig, 'love', {
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
        await readContract(mlootContractConfig, 'tokenOfOwnerByIndex', {
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
