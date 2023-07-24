import { abi, address, testChains } from '@wagmi/test'
import { expect, expectTypeOf, test, vi } from 'vitest'

import { createConfig } from '../config.js'
import * as multicall from './multicall.js'
import * as readContract from './readContract.js'
import { readContracts } from './readContracts.js'
import { type Address, type MulticallResult, http } from 'viem'

const contracts = [
  {
    abi: abi.wagmigotchi,
    address: address.wagmigotchi,
    functionName: 'love',
    args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
  },
  {
    abi: abi.wagmigotchi,
    address: address.wagmigotchi,
    functionName: 'love',
    args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
  },
  {
    abi: abi.wagmigotchi,
    address: address.wagmigotchi,
    functionName: 'getAlive',
  },
  {
    abi: abi.mloot,
    address: address.mloot,
    functionName: 'tokenOfOwnerByIndex',
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
  },
]

// beforeEach(() => {
//   setupConfig({
//     chains: [mainnet, { ...polygon, contracts: { multicall3: undefined } }],
//   })
// })

const { mainnet, mainnet2, mainnet3 } = testChains

test('default', async () => {
  const spy = vi.spyOn(multicall, 'multicall')
  const config = createConfig({
    chains: [mainnet, mainnet2],
    transports: {
      [mainnet.id]: http(),
      [mainnet2.id]: http(),
    },
  })
  const results = await readContracts(config, { contracts })

  expect(spy).toHaveBeenCalledWith(config, {
    allowFailure: true,
    contracts,
    chainId: mainnet.id,
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

test('falls back to readContract if multicall is not available', async () => {
  const spy = vi.spyOn(readContract, 'readContract')
  const config = createConfig({
    chains: [mainnet, { ...mainnet2, contracts: { multicall3: undefined } }],
    transports: {
      [mainnet.id]: http(),
      [mainnet2.id]: http(),
    },
  })
  const chainId = mainnet2.id
  const contracts = [
    {
      abi: abi.wagmigotchi,
      address: address.wagmigotchi,
      chainId: mainnet2.id,
      functionName: 'love',
      args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
    },
    {
      abi: abi.wagmigotchi,
      address: address.wagmigotchi,
      chainId: mainnet2.id,
      functionName: 'love',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    },
    {
      abi: abi.wagmigotchi,
      address: address.wagmigotchi,
      chainId: mainnet2.id,
      functionName: 'getAlive',
    },
    {
      abi: abi.mloot,
      address: address.mloot,
      chainId: mainnet2.id,
      functionName: 'tokenOfOwnerByIndex',
      args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
    },
  ] as const
  const results = await readContracts(config, { contracts })
  expectTypeOf(results).toMatchTypeOf<
    [
      MulticallResult<bigint>,
      MulticallResult<bigint>,
      MulticallResult<boolean>,
      MulticallResult<bigint>,
    ]
  >()

  for (const contract of contracts) {
    expect(spy).toBeCalledWith(config, { ...contract, chainId })
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

test('multi-chain', async () => {
  const config = createConfig({
    chains: [mainnet, mainnet2, mainnet3],
    transports: {
      [mainnet.id]: http(),
      [mainnet2.id]: http(),
      [mainnet3.id]: http(),
    },
  })

  const spy = vi.spyOn(multicall, 'multicall')
  const mainnetContracts = [
    {
      abi: abi.wagmigotchi,
      address: address.wagmigotchi,
      chainId: mainnet.id,
      functionName: 'love',
      args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
    },
    {
      abi: abi.wagmigotchi,
      address: address.wagmigotchi,
      chainId: mainnet.id,
      functionName: 'love',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    },
    {
      abi: abi.wagmigotchi,
      address: address.wagmigotchi,
      chainId: mainnet.id,
      functionName: 'love',
      args: ['0xd2135CfB216b74109775236E36d4b433F1DF507B'],
    },
  ] as const
  const mainnet2Contracts = [
    {
      abi: abi.wagmigotchi,
      address: address.wagmigotchi,
      chainId: mainnet2.id,
      functionName: 'getAlive',
    },
    {
      abi: abi.mloot,
      address: address.mloot,
      chainId: mainnet2.id,
      functionName: 'tokenOfOwnerByIndex',
      args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
    },
  ] as const
  const mainnet3Contracts = [
    {
      abi: abi.wagmiMintExample,
      address: address.wagmiMintExample,
      chainId: mainnet3.id,
      functionName: 'ownerOf',
      args: [69n],
    },
    {
      abi: abi.wagmiMintExample,
      address: address.wagmiMintExample,
      chainId: mainnet3.id,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    },
  ] as const
  const results = await readContracts(config, {
    contracts: [
      mainnetContracts[0]!,
      mainnet3Contracts[0]!,
      mainnetContracts[1]!,
      mainnet2Contracts[0]!,
      mainnet3Contracts[1]!,
      mainnet2Contracts[1]!,
      mainnetContracts[2]!,
    ],
  })
  expectTypeOf(results).toEqualTypeOf<
    [
      MulticallResult<bigint>,
      MulticallResult<Address>,
      MulticallResult<bigint>,
      MulticallResult<boolean>,
      MulticallResult<bigint>,
      MulticallResult<bigint>,
      MulticallResult<bigint>,
    ]
  >()

  expect(spy).toHaveBeenCalledWith(config, {
    allowFailure: true,
    contracts: mainnetContracts,
    chainId: mainnet.id,
    overrides: undefined,
  })
  expect(spy).toHaveBeenCalledWith(config, {
    allowFailure: true,
    contracts: mainnet2Contracts,
    chainId: mainnet2.id,
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

//   it('falls back to readContract if multicall is not available', async () => {
//     const spy = vi.spyOn(readContract, 'readContract')
//     const ethContracts = [
//       {
//         abi: abi.wagmigotchi,
//         address: address.wagmigotchi,
//         chainId: mainnet.id,
//         functionName: 'love',
//         args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
//       },
//       {
//         abi: abi.wagmigotchi,
//         address: address.wagmigotchi,
//         chainId: mainnet.id,
//         functionName: 'love',
//         args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
//       },
//     ] as const
//     const polygonContracts = [
//       {
//         abi: abi.wagmigotchi,
//         address: address.wagmigotchi,
//         chainId: polygon.id,
//         functionName: 'getAlive',
//       },
//       {
//         abi: abi.mloot,
//         address: address.mloot,
//         chainId: polygon.id,
//         functionName: 'tokenOfOwnerByIndex',
//         args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0n],
//       },
//     ] as const
//     const results = await readContracts(config, {
//       //  ^?
//       contracts: [...ethContracts, ...polygonContracts],
//     })
//     assertType<
//       [
//         MulticallResult<bigint>,
//         MulticallResult<bigint>,
//         MulticallResult<boolean>,
//         MulticallResult<bigint>,
//       ]
//     >(results)

//     for (const contract of ethContracts) {
//       expect(spy).toBeCalledWith({ ...contract, chainId: mainnet.id })
//     }
//     for (const contract of polygonContracts) {
//       expect(spy).toBeCalledWith({ ...contract, chainId: polygon.id })
//     }
//     expect(results).toMatchInlineSnapshot(`
//       [
//         {
//           "result": 2n,
//           "status": "success",
//         },
//         {
//           "result": 1n,
//           "status": "success",
//         },
//         {
//           "result": false,
//           "status": "success",
//         },
//         {
//           "result": 370395n,
//           "status": "success",
//         },
//       ]
//     `)
//   })
// })

// describe('allowFailure', () => {
//   it('throws if allowFailure=false & a contract method fails', async () => {
//     await expect(
//       readContracts(config, {
//         allowFailure: false,
//         contracts: [
//           ...contracts,
//           {
//             abi: abi.mloot,
//             address: address.mloot,
//             chainId: polygon.id,
//             functionName: 'tokenOfOwnerByIndex',
//             args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69420n],
//           },
//         ],
//       }),
//     ).rejects.toThrowErrorMatchingInlineSnapshot(
//       `
//       "The contract function \\"tokenOfOwnerByIndex\\" reverted with the following reason:
//       ERC721Enumerable: owner index out of bounds

//       Contract Call:
//         address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
//         function:  tokenOfOwnerByIndex(address owner, uint256 index)
//         args:                         (0xA0Cf798816D4b9b9866b5330EEa46a18382f251e, 69420)

//       Docs: https://viem.sh/docs/contract/readContract.html
//       Version: viem@1.0.0"
//     `,
//     )
//   })

//   it('allowFailure=true & a contract method fails', async () => {
//     expect(
//       await readContracts(config, {
//         allowFailure: true,
//         contracts: [
//           ...contracts,
//           {
//             abi: abi.mloot,
//             address: address.mloot,
//             chainId: polygon.id,
//             functionName: 'tokenOfOwnerByIndex',
//             args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69420n],
//           },
//           {
//             abi: abi.mloot,
//             address: address.mloot,
//             chainId: polygon.id,
//             functionName: 'tokenOfOwnerByIndex',
//             args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69421n],
//           },
//         ],
//       }),
//     ).toMatchInlineSnapshot(`
//       [
//         {
//           "result": 2n,
//           "status": "success",
//         },
//         {
//           "result": 1n,
//           "status": "success",
//         },
//         {
//           "result": false,
//           "status": "success",
//         },
//         {
//           "result": 370395n,
//           "status": "success",
//         },
//         {
//           "error": [ContractFunctionExecutionError: The contract function "tokenOfOwnerByIndex" reverted with the following reason:
//       ERC721Enumerable: owner index out of bounds

//       Contract Call:
//         address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
//         function:  tokenOfOwnerByIndex(address owner, uint256 index)
//         args:                         (0xA0Cf798816D4b9b9866b5330EEa46a18382f251e, 69420)

//       Docs: https://viem.sh/docs/contract/readContract.html
//       Version: viem@1.0.0],
//           "result": undefined,
//           "status": "failure",
//         },
//         {
//           "error": [ContractFunctionExecutionError: The contract function "tokenOfOwnerByIndex" reverted with the following reason:
//       ERC721Enumerable: owner index out of bounds

//       Contract Call:
//         address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
//         function:  tokenOfOwnerByIndex(address owner, uint256 index)
//         args:                         (0xA0Cf798816D4b9b9866b5330EEa46a18382f251e, 69421)

//       Docs: https://viem.sh/docs/contract/readContract.html
//       Version: viem@1.0.0],
//           "result": undefined,
//           "status": "failure",
//         },
//       ]
//     `)
//   })

//   it('throws if allowFailure=false & encoding contract function data fails', async () => {
//     await expect(
//       readContracts(config, {
//         allowFailure: false,
//         contracts: [
//           ...contracts,
//           {
//             abi: abi.mloot,
//             address: address.mloot,
//             chainId: polygon.id,
//             functionName: 'ownerOf',
//             // address is not the wagmigotchi contract
//             address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
//             args: [10e30],
//           },
//         ],
//       }),
//     ).rejects.toThrowErrorMatchingInlineSnapshot(
//       `
//       "The contract function \\"ownerOf\\" returned no data (\\"0x\\").

//       This could be due to any of the following:
//         - The contract does not have the function \\"ownerOf\\",
//         - The parameters passed to the contract function may be invalid, or
//         - The address is not a contract.

//       Contract Call:
//         address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
//         function:  ownerOf(uint256 tokenId)
//         args:             (1e+31)

//       Docs: https://viem.sh/docs/contract/readContract.html
//       Version: viem@1.0.0"
//     `,
//     )
//   })

//   it('allowFailure=true & encoding contract function data fails', async () => {
//     expect(
//       await readContracts(config, {
//         allowFailure: true,
//         contracts: [
//           ...contracts,
//           {
//             abi: abi.mloot,
//             address: address.mloot,
//             chainId: polygon.id,
//             functionName: 'ownerOf',
//             // address is not the wagmigotchi contract
//             address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
//             args: [10e30],
//           },
//           {
//             abi: abi.mloot,
//             address: address.mloot,
//             chainId: polygon.id,
//             functionName: 'ownerOf',
//             // address is not the wagmigotchi contract
//             address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
//             args: [10e30],
//           },
//         ],
//       }),
//     ).toMatchInlineSnapshot(`
//       [
//         {
//           "result": 2n,
//           "status": "success",
//         },
//         {
//           "result": 1n,
//           "status": "success",
//         },
//         {
//           "result": false,
//           "status": "success",
//         },
//         {
//           "result": 370395n,
//           "status": "success",
//         },
//         {
//           "error": [ContractFunctionExecutionError: The contract function "ownerOf" returned no data ("0x").

//       This could be due to any of the following:
//         - The contract does not have the function "ownerOf",
//         - The parameters passed to the contract function may be invalid, or
//         - The address is not a contract.

//       Contract Call:
//         address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
//         function:  ownerOf(uint256 tokenId)
//         args:             (1e+31)

//       Docs: https://viem.sh/docs/contract/readContract.html
//       Version: viem@1.0.0],
//           "result": undefined,
//           "status": "failure",
//         },
//         {
//           "error": [ContractFunctionExecutionError: The contract function "ownerOf" returned no data ("0x").

//       This could be due to any of the following:
//         - The contract does not have the function "ownerOf",
//         - The parameters passed to the contract function may be invalid, or
//         - The address is not a contract.

//       Contract Call:
//         address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
//         function:  ownerOf(uint256 tokenId)
//         args:             (1e+31)

//       Docs: https://viem.sh/docs/contract/readContract.html
//       Version: viem@1.0.0],
//           "result": undefined,
//           "status": "failure",
//         },
//       ]
//     `)
//   })

//   it('should throw if allowFailure=false & a contract has no response', async () => {
//     await expect(
//       readContracts(config, {
//         allowFailure: false,
//         contracts: [
//           ...contracts,
//           {
//             abi: abi.wagmigotchi,
//             address: address.wagmigotchi,
//             chainId: polygon.id,
//             functionName: 'love',
//             // address is not the wagmigotchi contract
//             address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
//             args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
//           },
//         ],
//       }),
//     ).rejects.toThrowErrorMatchingInlineSnapshot(
//       `
//       "The contract function \\"love\\" returned no data (\\"0x\\").

//       This could be due to any of the following:
//         - The contract does not have the function \\"love\\",
//         - The parameters passed to the contract function may be invalid, or
//         - The address is not a contract.

//       Contract Call:
//         address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
//         function:  love(address)
//         args:          (0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC)

//       Docs: https://viem.sh/docs/contract/readContract.html
//       Version: viem@1.0.0"
//     `,
//     )
//   })

//   it('allowFailure=true & a contract has no response', async () => {
//     expect(
//       await readContracts(config, {
//         allowFailure: true,
//         contracts: [
//           ...contracts,
//           {
//             abi: abi.wagmigotchi,
//             address: address.wagmigotchi,
//             chainId: polygon.id,
//             functionName: 'love',
//             // address is not the wagmigotchi contract
//             address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
//             args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
//           },
//         ],
//       }),
//     ).toMatchInlineSnapshot(`
//       [
//         {
//           "result": 2n,
//           "status": "success",
//         },
//         {
//           "result": 1n,
//           "status": "success",
//         },
//         {
//           "result": false,
//           "status": "success",
//         },
//         {
//           "result": 370395n,
//           "status": "success",
//         },
//         {
//           "error": [ContractFunctionExecutionError: The contract function "love" returned no data ("0x").

//       This could be due to any of the following:
//         - The contract does not have the function "love",
//         - The parameters passed to the contract function may be invalid, or
//         - The address is not a contract.

//       Contract Call:
//         address:   0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
//         function:  love(address)
//         args:          (0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC)

//       Docs: https://viem.sh/docs/contract/readContract.html
//       Version: viem@1.0.0],
//           "result": undefined,
//           "status": "failure",
//         },
//       ]
//     `)
//   })
// })
