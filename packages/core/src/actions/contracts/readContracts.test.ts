import { setupClient } from '../../../test'
import { ReadContractsConfig, readContracts } from './readContracts'

import * as readContract from './readContract'
import * as multicall from './multicall'
import { chain } from '../../constants'

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
    {
      inputs: [],
      name: 'getAlive',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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

describe('readContracts', () => {
  beforeEach(() =>
    setupClient({
      chains: [chain.mainnet, { ...chain.polygon, multicall: undefined }],
    }),
  )

  it('default', async () => {
    const spy = jest.spyOn(multicall, 'multicall')
    const contracts: ReadContractsConfig['contracts'] = [
      {
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
      },
      {
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      },
      { ...wagmigotchiContractConfig, functionName: 'getAlive' },
      {
        ...mlootContractConfig,
        functionName: 'tokenOfOwnerByIndex',
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
      },
    ]
    const results = await readContracts({ contracts })

    expect(spy).toHaveBeenCalledWith({
      allowFailure: true,
      contracts,
      chainId: 1,
      overrides: undefined,
    })
    expect(results).toMatchInlineSnapshot(`
      [
        {
          "hex": "0x02",
          "type": "BigNumber",
        },
        {
          "hex": "0x01",
          "type": "BigNumber",
        },
        false,
        {
          "hex": "0x05a6db",
          "type": "BigNumber",
        },
      ]
    `)
  })

  it('falls back to readContract if multicall is not available', async () => {
    const spy = jest.spyOn(readContract, 'readContract')
    const chainId = chain.polygon.id
    const contracts: ReadContractsConfig['contracts'] = [
      {
        ...wagmigotchiContractConfig,
        chainId: chain.polygon.id,
        functionName: 'love',
        args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
      },
      {
        ...wagmigotchiContractConfig,
        chainId: chain.polygon.id,
        functionName: 'love',
        args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      },
      {
        ...wagmigotchiContractConfig,
        chainId: chain.polygon.id,
        functionName: 'getAlive',
      },
      {
        ...mlootContractConfig,
        chainId: chain.polygon.id,
        functionName: 'tokenOfOwnerByIndex',
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
      },
    ]
    const results = await readContracts({
      contracts,
    })

    for (const contract of contracts) {
      expect(spy).toBeCalledWith({ ...contract, chainId })
    }
    expect(results).toMatchInlineSnapshot(`
      [
        {
          "hex": "0x02",
          "type": "BigNumber",
        },
        {
          "hex": "0x01",
          "type": "BigNumber",
        },
        false,
        {
          "hex": "0x05a6db",
          "type": "BigNumber",
        },
      ]
    `)
  })

  describe('multi-chain', () => {
    it('default', async () => {
      const spy = jest.spyOn(multicall, 'multicall')
      const ethContracts: ReadContractsConfig['contracts'] = [
        {
          ...wagmigotchiContractConfig,
          chainId: chain.mainnet.id,
          functionName: 'love',
          args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
        },
        {
          ...wagmigotchiContractConfig,
          chainId: chain.mainnet.id,
          functionName: 'love',
          args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        },
      ]
      const polygonContracts: ReadContractsConfig['contracts'] = [
        {
          ...wagmigotchiContractConfig,
          chainId: chain.polygon.id,
          functionName: 'getAlive',
        },
        {
          ...mlootContractConfig,
          chainId: chain.polygon.id,
          functionName: 'tokenOfOwnerByIndex',
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
        },
      ]
      const results = await readContracts({
        contracts: [...ethContracts, ...polygonContracts],
      })

      expect(spy).toHaveBeenCalledWith({
        allowFailure: true,
        contracts: ethContracts,
        chainId: chain.mainnet.id,
        overrides: undefined,
      })
      expect(spy).toHaveBeenCalledWith({
        allowFailure: true,
        contracts: polygonContracts,
        chainId: chain.polygon.id,
        overrides: undefined,
      })
      expect(results).toMatchInlineSnapshot(`
        [
          {
            "hex": "0x02",
            "type": "BigNumber",
          },
          {
            "hex": "0x01",
            "type": "BigNumber",
          },
          false,
          {
            "hex": "0x05a6db",
            "type": "BigNumber",
          },
        ]
      `)
    })
    it('falls back to readContract if multicall is not available', async () => {
      const spy = jest.spyOn(readContract, 'readContract')
      const ethContracts: ReadContractsConfig['contracts'] = [
        {
          ...wagmigotchiContractConfig,
          chainId: chain.mainnet.id,
          functionName: 'love',
          args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
        },
        {
          ...wagmigotchiContractConfig,
          chainId: chain.mainnet.id,
          functionName: 'love',
          args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        },
      ]
      const polygonContracts: ReadContractsConfig['contracts'] = [
        {
          ...wagmigotchiContractConfig,
          chainId: chain.polygon.id,
          functionName: 'getAlive',
        },
        {
          ...mlootContractConfig,
          chainId: chain.polygon.id,
          functionName: 'tokenOfOwnerByIndex',
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
        },
      ]
      const results = await readContracts({
        contracts: [...ethContracts, ...polygonContracts],
      })

      for (const contract of ethContracts) {
        expect(spy).toBeCalledWith({ ...contract, chainId: chain.mainnet.id })
      }
      for (const contract of polygonContracts) {
        expect(spy).toBeCalledWith({ ...contract, chainId: chain.polygon.id })
      }
      expect(results).toMatchInlineSnapshot(`
        [
          {
            "hex": "0x02",
            "type": "BigNumber",
          },
          {
            "hex": "0x01",
            "type": "BigNumber",
          },
          false,
          {
            "hex": "0x05a6db",
            "type": "BigNumber",
          },
        ]
      `)
    })
  })
})
