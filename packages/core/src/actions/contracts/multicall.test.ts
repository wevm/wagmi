import { beforeEach, describe, expect, it } from 'vitest'

import {
  mlootContractConfig,
  setupClient,
  wagmigotchiContractConfig,
} from '../../../test'
import { mainnet, polygon } from '../../chains'

import { multicall } from './multicall'

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
  {
    ...wagmigotchiContractConfig,
    functionName: 'getAlive',
  },
  {
    ...mlootContractConfig,
    functionName: 'tokenOfOwnerByIndex',
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
  },
]

describe('multicall', () => {
  beforeEach(() => {
    setupClient({
      chains: [mainnet, { ...polygon, contracts: { multicall3: undefined } }],
    })
  })

  it('default', async () => {
    await expect(multicall({ contracts })).resolves.toMatchInlineSnapshot(`
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

  describe('args', () => {
    it('chainId', async () => {
      await expect(multicall({ chainId: 1, contracts })).resolves
        .toMatchInlineSnapshot(`
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

    it('blockTag', async () => {
      await expect(multicall({ contracts, blockTag: 'latest' })).resolves
        .toMatchInlineSnapshot(`
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

    describe('allowFailure', () => {
      it('throws if allowFailure=false & a contract method fails', async () => {
        await expect(
          multicall({
            allowFailure: false,
            contracts: [
              ...contracts,
              {
                ...mlootContractConfig,
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

          Docs: https://viem.sh/docs/contract/multicall.html
          Version: viem@0.3.12"
        `,
        )
      })

      it('allowFailure=true & a contract method fails', async () => {
        await expect(
          multicall({
            allowFailure: true,
            contracts: [
              ...contracts,
              {
                ...mlootContractConfig,
                functionName: 'tokenOfOwnerByIndex',
                args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69420n],
              },
              {
                ...mlootContractConfig,
                functionName: 'tokenOfOwnerByIndex',
                args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69421n],
              },
            ],
          }),
        ).resolves.toMatchInlineSnapshot(`
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

          Docs: https://viem.sh/docs/contract/multicall.html
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

          Docs: https://viem.sh/docs/contract/multicall.html
          Version: viem@0.3.12],
              "result": undefined,
              "status": "failure",
            },
          ]
        `)
      })

      it('throws if allowFailure=false & encoding contract function data fails', async () => {
        await expect(
          multicall({
            allowFailure: false,
            contracts: [
              ...contracts,
              {
                ...mlootContractConfig,
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

          Docs: https://viem.sh/docs/contract/multicall.html
          Version: viem@0.3.12"
        `,
        )
      })

      it('allowFailure=true & encoding contract function data fails', async () => {
        await expect(
          multicall({
            allowFailure: true,
            contracts: [
              ...contracts,
              {
                ...mlootContractConfig,
                functionName: 'ownerOf',
                // address is not the wagmigotchi contract
                address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                args: [10e30],
              },
              {
                ...mlootContractConfig,
                functionName: 'ownerOf',
                // address is not the wagmigotchi contract
                address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                args: [10e30],
              },
            ],
          }),
        ).resolves.toMatchInlineSnapshot(`
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

          Docs: https://viem.sh/docs/contract/multicall.html
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

          Docs: https://viem.sh/docs/contract/multicall.html
          Version: viem@0.3.12],
              "result": undefined,
              "status": "failure",
            },
          ]
        `)
      })

      it('throws if allowFailure=false & a contract has no response', async () => {
        await expect(
          multicall({
            allowFailure: false,
            contracts: [
              ...contracts,
              {
                ...wagmigotchiContractConfig,
                functionName: 'love',
                // address is not the wagmigotchi contract
                address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
              },
            ],
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(`
          "The contract function \\"love\\" returned no data (\\"0x\\").

          This could be due to any of the following:
            - The contract does not have the function \\"love\\",
            - The parameters passed to the contract function may be invalid, or
            - The address is not a contract.
           
          Contract Call:
            address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
            function:  love(address)
            args:          (0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC)

          Docs: https://viem.sh/docs/contract/multicall.html
          Version: viem@0.3.12"
        `)
      })

      it('allowFailure=true & a contract has no response', async () => {
        await expect(
          multicall({
            allowFailure: true,
            contracts: [
              ...contracts,
              {
                ...wagmigotchiContractConfig,
                functionName: 'love',
                // address is not the wagmigotchi contract
                address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
                args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
              },
              {
                ...wagmigotchiContractConfig,
                functionName: 'love',
                // address is not the wagmigotchi contract
                address: '0x01D13b073CE170e94f6d530B0Cd54498A87A537F',
                args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
              },
            ],
          }),
        ).resolves.toMatchInlineSnapshot(`
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

          Docs: https://viem.sh/docs/contract/multicall.html
          Version: viem@0.3.12],
              "result": undefined,
              "status": "failure",
            },
            {
              "error": [ContractFunctionExecutionError: The contract function "love" returned no data ("0x").

          This could be due to any of the following:
            - The contract does not have the function "love",
            - The parameters passed to the contract function may be invalid, or
            - The address is not a contract.
           
          Contract Call:
            address:   0x01D13b073CE170e94f6d530B0Cd54498A87A537F
            function:  love(address)
            args:          (0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC)

          Docs: https://viem.sh/docs/contract/multicall.html
          Version: viem@0.3.12],
              "result": undefined,
              "status": "failure",
            },
          ]
        `)
      })
    })
  })

  describe('errors', () => {
    it('should throw if the chain does not support multicall', async () => {
      await expect(
        multicall({ contracts, chainId: polygon.id }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        "Chain \\"Polygon\\" does not support contract \\"multicall3\\".

        This could be due to any of the following:
        - The chain does not have the contract \\"multicall3\\" configured.

        Version: viem@0.3.12"
      `,
      )
    })

    it('should throw if the chain has not deployed multicall on block', async () => {
      await expect(
        multicall({ contracts, blockNumber: 1n }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        "Chain \\"Ethereum\\" does not support contract \\"multicall3\\".

        This could be due to any of the following:
        - The contract \\"multicall3\\" was not deployed until block 14353601 (current block 1).

        Version: viem@0.3.12"
      `,
      )
    })

    it('should throw if a chain is not configured on wagmi client', async () => {
      await expect(
        multicall({ contracts, chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Chain \\"69\\" not configured."',
      )
    })
  })
})
