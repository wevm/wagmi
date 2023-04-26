import type { Address, ResolvedConfig } from 'abitype'
import type { MulticallResult } from 'viem'
import { assertType, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  mlootContractConfig,
  setupClient,
  wagmiContractConfig,
  wagmigotchiContractConfig,
} from '../../../test'
import { goerli, mainnet, polygon } from '../../chains'

import * as multicall from './multicall'
import * as readContract from './readContract'
import { readContracts } from './readContracts'

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
]

describe('readContracts', () => {
  beforeEach(() => {
    setupClient({
      chains: [mainnet, { ...polygon, contracts: { multicall3: undefined } }],
    })
  })

  it('default', async () => {
    const spy = vi.spyOn(multicall, 'multicall')
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
          "result": 2n,
          "status": "success",
        },
        {
          "result": 1n,
          "status": "success",
        },
        {
          "result": false,
          "status": "success",
        },
        {
          "result": 370395n,
          "status": "success",
        },
      ]
    `)
  })

  it('falls back to readContract if multicall is not available', async () => {
    const spy = vi.spyOn(readContract, 'readContract')
    const chainId = polygon.id
    const contracts = [
      {
        ...wagmigotchiContractConfig,
        chainId: polygon.id,
        functionName: 'love',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
      },
      {
        ...wagmigotchiContractConfig,
        chainId: polygon.id,
        functionName: 'love',
        args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      },
      {
        ...wagmigotchiContractConfig,
        chainId: polygon.id,
        functionName: 'getAlive',
      },
      {
        ...mlootContractConfig,
        chainId: polygon.id,
        functionName: 'tokenOfOwnerByIndex',
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
      },
    ] as const
    const results = await readContracts({
      //  ^?
      contracts,
    })
    assertType<
      [
        MulticallResult<ResolvedConfig['BigIntType']>,
        MulticallResult<ResolvedConfig['BigIntType']>,
        MulticallResult<boolean>,
        MulticallResult<ResolvedConfig['BigIntType']>,
      ]
    >(results)

    for (const contract of contracts) {
      expect(spy).toBeCalledWith({ ...contract, chainId })
    }
    expect(results).toMatchInlineSnapshot(`
      [
        {
          "result": 2n,
          "status": "success",
        },
        {
          "result": 1n,
          "status": "success",
        },
        {
          "result": false,
          "status": "success",
        },
        {
          "result": 370395n,
          "status": "success",
        },
      ]
    `)
  })

  describe('multi-chain', () => {
    it('default', async () => {
      setupClient({
        chains: [mainnet, polygon, goerli],
      })

      const spy = vi.spyOn(multicall, 'multicall')
      const ethContracts = [
        {
          ...wagmigotchiContractConfig,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        },
        {
          ...wagmigotchiContractConfig,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
        {
          ...wagmigotchiContractConfig,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
        },
      ] as const
      const polygonContracts = [
        {
          ...wagmigotchiContractConfig,
          chainId: polygon.id,
          functionName: 'getAlive',
        },
        {
          ...mlootContractConfig,
          chainId: polygon.id,
          functionName: 'tokenOfOwnerByIndex',
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
        },
      ] as const
      const goerliContracts = [
        {
          ...wagmiContractConfig,
          chainId: goerli.id,
          functionName: 'ownerOf',
          args: [69n],
        },
        {
          ...wagmiContractConfig,
          chainId: goerli.id,
          functionName: 'balanceOf',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
      ] as const
      const results = await readContracts({
        contracts: [
          ethContracts[0]!,
          goerliContracts[0]!,
          ethContracts[1]!,
          polygonContracts[0]!,
          goerliContracts[1]!,
          polygonContracts[1]!,
          ethContracts[2]!,
        ],
      })
      assertType<
        [
          MulticallResult<ResolvedConfig['BigIntType']>,
          MulticallResult<Address>,
          MulticallResult<ResolvedConfig['BigIntType']>,
          MulticallResult<boolean>,
          MulticallResult<ResolvedConfig['BigIntType']>,
          MulticallResult<ResolvedConfig['BigIntType']>,
          MulticallResult<ResolvedConfig['BigIntType']>,
        ]
      >(results)

      expect(spy).toHaveBeenCalledWith({
        allowFailure: true,
        contracts: ethContracts,
        chainId: mainnet.id,
        overrides: undefined,
      })
      expect(spy).toHaveBeenCalledWith({
        allowFailure: true,
        contracts: polygonContracts,
        chainId: polygon.id,
        overrides: undefined,
      })
      expect(results).toMatchInlineSnapshot(`
        [
          {
            "result": 2n,
            "status": "success",
          },
          {
            "result": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
            "status": "success",
          },
          {
            "result": 1n,
            "status": "success",
          },
          {
            "result": false,
            "status": "success",
          },
          {
            "result": 3n,
            "status": "success",
          },
          {
            "result": 370395n,
            "status": "success",
          },
          {
            "result": 0n,
            "status": "success",
          },
        ]
      `)
    })

    it('falls back to readContract if multicall is not available', async () => {
      const spy = vi.spyOn(readContract, 'readContract')
      const ethContracts = [
        {
          ...wagmigotchiContractConfig,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
        },
        {
          ...wagmigotchiContractConfig,
          chainId: mainnet.id,
          functionName: 'love',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
      ] as const
      const polygonContracts = [
        {
          ...wagmigotchiContractConfig,
          chainId: polygon.id,
          functionName: 'getAlive',
        },
        {
          ...mlootContractConfig,
          chainId: polygon.id,
          functionName: 'tokenOfOwnerByIndex',
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
        },
      ] as const
      const results = await readContracts({
        //  ^?
        contracts: [...ethContracts, ...polygonContracts],
      })
      assertType<
        [
          MulticallResult<ResolvedConfig['BigIntType']>,
          MulticallResult<ResolvedConfig['BigIntType']>,
          MulticallResult<boolean>,
          MulticallResult<ResolvedConfig['BigIntType']>,
        ]
      >(results)

      for (const contract of ethContracts) {
        expect(spy).toBeCalledWith({ ...contract, chainId: mainnet.id })
      }
      for (const contract of polygonContracts) {
        expect(spy).toBeCalledWith({ ...contract, chainId: polygon.id })
      }
      expect(results).toMatchInlineSnapshot(`
        [
          {
            "result": 2n,
            "status": "success",
          },
          {
            "result": 1n,
            "status": "success",
          },
          {
            "result": false,
            "status": "success",
          },
          {
            "result": 370395n,
            "status": "success",
          },
        ]
      `)
    })
  })

  describe('allowFailure', () => {
    it('throws if allowFailure=false & a contract method fails', async () => {
      await expect(
        readContracts({
          allowFailure: false,
          contracts: [
            ...contracts,
            {
              ...mlootContractConfig,
              chainId: polygon.id,
              functionName: 'tokenOfOwnerByIndex',
              args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69420n],
            },
          ],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        "The contract function \\"tokenOfOwnerByIndex\\" reverted with the following reason:
        ERC721Enumerable: owner index out of bounds

        Contract Call:
          address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
          function:  tokenOfOwnerByIndex(address owner, uint256 index)
          args:                         (0xA0Cf798816D4b9b9866b5330EEa46a18382f251e, 69420)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12"
      `,
      )
    })

    it('allowFailure=true & a contract method fails', async () => {
      expect(
        await readContracts({
          allowFailure: true,
          contracts: [
            ...contracts,
            {
              ...mlootContractConfig,
              chainId: polygon.id,
              functionName: 'tokenOfOwnerByIndex',
              args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69420n],
            },
            {
              ...mlootContractConfig,
              chainId: polygon.id,
              functionName: 'tokenOfOwnerByIndex',
              args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69421n],
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        [
          {
            "result": 2n,
            "status": "success",
          },
          {
            "result": 1n,
            "status": "success",
          },
          {
            "result": false,
            "status": "success",
          },
          {
            "result": 370395n,
            "status": "success",
          },
          {
            "error": [ContractFunctionExecutionError: The contract function "tokenOfOwnerByIndex" reverted with the following reason:
        ERC721Enumerable: owner index out of bounds

        Contract Call:
          address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
          function:  tokenOfOwnerByIndex(address owner, uint256 index)
          args:                         (0xA0Cf798816D4b9b9866b5330EEa46a18382f251e, 69420)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12],
            "result": undefined,
            "status": "failure",
          },
          {
            "error": [ContractFunctionExecutionError: The contract function "tokenOfOwnerByIndex" reverted with the following reason:
        ERC721Enumerable: owner index out of bounds

        Contract Call:
          address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
          function:  tokenOfOwnerByIndex(address owner, uint256 index)
          args:                         (0xA0Cf798816D4b9b9866b5330EEa46a18382f251e, 69421)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12],
            "result": undefined,
            "status": "failure",
          },
        ]
      `)
    })

    it('throws if allowFailure=false & encoding contract function data fails', async () => {
      await expect(
        readContracts({
          allowFailure: false,
          contracts: [
            ...contracts,
            {
              ...mlootContractConfig,
              chainId: polygon.id,
              functionName: 'ownerOf',
              // address is not the wagmigotchi contract
              address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              args: [10e30],
            },
          ],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        "The contract function \\"ownerOf\\" returned no data (\\"0x\\").

        This could be due to any of the following:
          - The contract does not have the function \\"ownerOf\\",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.
         
        Contract Call:
          address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
          function:  ownerOf(uint256 tokenId)
          args:             (1e+31)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12"
      `,
      )
    })

    it('allowFailure=true & encoding contract function data fails', async () => {
      expect(
        await readContracts({
          allowFailure: true,
          contracts: [
            ...contracts,
            {
              ...mlootContractConfig,
              chainId: polygon.id,
              functionName: 'ownerOf',
              // address is not the wagmigotchi contract
              address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              args: [10e30],
            },
            {
              ...mlootContractConfig,
              chainId: polygon.id,
              functionName: 'ownerOf',
              // address is not the wagmigotchi contract
              address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              args: [10e30],
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        [
          {
            "result": 2n,
            "status": "success",
          },
          {
            "result": 1n,
            "status": "success",
          },
          {
            "result": false,
            "status": "success",
          },
          {
            "result": 370395n,
            "status": "success",
          },
          {
            "error": [ContractFunctionExecutionError: The contract function "ownerOf" returned no data ("0x").

        This could be due to any of the following:
          - The contract does not have the function "ownerOf",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.
         
        Contract Call:
          address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
          function:  ownerOf(uint256 tokenId)
          args:             (1e+31)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12],
            "result": undefined,
            "status": "failure",
          },
          {
            "error": [ContractFunctionExecutionError: The contract function "ownerOf" returned no data ("0x").

        This could be due to any of the following:
          - The contract does not have the function "ownerOf",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.
         
        Contract Call:
          address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
          function:  ownerOf(uint256 tokenId)
          args:             (1e+31)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12],
            "result": undefined,
            "status": "failure",
          },
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
              chainId: polygon.id,
              functionName: 'love',
              // address is not the wagmigotchi contract
              address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
            },
          ],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        "The contract function \\"love\\" returned no data (\\"0x\\").

        This could be due to any of the following:
          - The contract does not have the function \\"love\\",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.
         
        Contract Call:
          address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
          function:  love(address)
          args:          (0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12"
      `,
      )
    })

    it('allowFailure=true & a contract has no response', async () => {
      expect(
        await readContracts({
          allowFailure: true,
          contracts: [
            ...contracts,
            {
              ...wagmigotchiContractConfig,
              chainId: polygon.id,
              functionName: 'love',
              // address is not the wagmigotchi contract
              address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
            },
          ],
        }),
      ).toMatchInlineSnapshot(`
        [
          {
            "result": 2n,
            "status": "success",
          },
          {
            "result": 1n,
            "status": "success",
          },
          {
            "result": false,
            "status": "success",
          },
          {
            "result": 370395n,
            "status": "success",
          },
          {
            "error": [ContractFunctionExecutionError: The contract function "love" returned no data ("0x").

        This could be due to any of the following:
          - The contract does not have the function "love",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.
         
        Contract Call:
          address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
          function:  love(address)
          args:          (0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC)

        Docs: https://viem.sh/docs/contract/readContract.html
        Version: viem@0.3.12],
            "result": undefined,
            "status": "failure",
          },
        ]
      `)
    })
  })
})
