import { setupWagmiClient } from '../../../test'
import { readContract } from './readContract'

const contractConfig = {
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

describe('readContract', () => {
  describe('args', () => {
    beforeEach(() => setupWagmiClient())

    it('contract args', async () => {
      const result = await readContract(contractConfig, 'love', {
        args: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "hex": "0x00",
          "type": "BigNumber",
        }
      `)
    })

    it('chainId', async () => {
      const result = await readContract(contractConfig, 'love', {
        args: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        chainId: 1,
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "hex": "0x00",
          "type": "BigNumber",
        }
      `)
    })

    it('overrides', async () => {
      const result = await readContract(contractConfig, 'love', {
        args: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        overrides: {},
      })
      expect(result).toMatchInlineSnapshot(`
        {
          "hex": "0x00",
          "type": "BigNumber",
        }
      `)
    })
  })
})
