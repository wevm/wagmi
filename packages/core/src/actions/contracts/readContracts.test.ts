import {
  mlootContractConfig,
  setupClient,
  wagmigotchiContractConfig,
} from '../../../test'
import { ReadContractsConfig, readContracts } from './readContracts'

import * as readContract from './readContract'
import * as multicall from './multicall'
import { chain } from '../../constants'

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

describe('readContracts', () => {
  beforeEach(() => {
    setupClient({
      chains: [chain.mainnet, { ...chain.polygon, multicall: undefined }],
    })
    console.warn = jest.fn()
  })

  it('default', async () => {
    const spy = jest.spyOn(multicall, 'multicall')
    const results = await readContracts({ contracts })

    expect(spy).toHaveBeenCalledWith({
      allowFailure: true,
      contracts,
      chainId: 31337,
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

  describe('allowFailure', () => {
    it('it should throw if a contract method fails', async () => {
      await expect(
        readContracts({
          allowFailure: false,
          contracts: [
            ...contracts,
            {
              ...mlootContractConfig,
              functionName: 'tokenOfOwnerByIndex',
              args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69420],
            },
          ],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"call revert exception; VM Exception while processing transaction: reverted with reason string \\"ERC721Enumerable: owner index out of bounds\\" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"tokenOfOwnerByIndex(address,uint256)\\", data=\\"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002b455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e6473000000000000000000000000000000000000000000\\", errorArgs=[\\"ERC721Enumerable: owner index out of bounds\\"], errorName=\\"Error\\", errorSignature=\\"Error(string)\\", reason=\\"ERC721Enumerable: owner index out of bounds\\", code=CALL_EXCEPTION, version=abi/5.6.1)"`,
      )
    })

    it('should not throw if allowFailure=true & a contract has no response', async () => {
      expect(
        await readContracts({
          allowFailure: true,
          contracts: [
            ...contracts,
            {
              ...wagmigotchiContractConfig,
              functionName: 'love',
              // address is not the wagmigotchi contract
              addressOrName: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
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
          null,
        ]
      `)
    })

    it('should throw if allowFailure=false & a contract has no response', async () => {
      await expect(
        readContracts({
          allowFailure: false,
          contracts: [
            ...contracts,
            {
              ...wagmigotchiContractConfig,
              functionName: 'love',
              // address is not the wagmigotchi contract
              addressOrName: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            },
          ],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
              "Function \\"love\\" on contract \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\" returned an empty response.

              Are you sure the function \\"love\\" exists on this contract?

              Etherscan: https://etherscan.io/address/0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC#readContract"
            `)
    })
  })
})
