import type { Address, ResolvedConfig } from 'abitype'
import { BigNumber } from 'ethers'
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
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
  },
]

let warnMessages: string[] = []
const warn = vi
  .spyOn(console, 'warn')
  .mockImplementation((message) => warnMessages.push(message))

describe('readContracts', () => {
  beforeEach(() => {
    setupClient({
      chains: [mainnet, { ...polygon, contracts: { multicall3: undefined } }],
    })
    warnMessages = []
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
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
      },
    ] as const
    const results = await readContracts({
      //  ^?
      contracts,
    })
    assertType<
      [
        ResolvedConfig['BigIntType'],
        ResolvedConfig['BigIntType'],
        boolean,
        ResolvedConfig['BigIntType'],
      ]
    >(results)

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
          args: [
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            BigNumber.from(0),
          ],
        },
      ] as const
      const goerliContracts = [
        {
          ...wagmiContractConfig,
          chainId: goerli.id,
          functionName: 'ownerOf',
          args: [BigNumber.from(69)],
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
          ResolvedConfig['BigIntType'],
          Address,
          ResolvedConfig['BigIntType'],
          boolean,
          ResolvedConfig['BigIntType'],
          ResolvedConfig['BigIntType'],
          ResolvedConfig['BigIntType'],
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
            "hex": "0x02",
            "type": "BigNumber",
          },
          "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          {
            "hex": "0x01",
            "type": "BigNumber",
          },
          false,
          {
            "hex": "0x02",
            "type": "BigNumber",
          },
          {
            "hex": "0x05a6db",
            "type": "BigNumber",
          },
          {
            "hex": "0x00",
            "type": "BigNumber",
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
          args: [
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            BigNumber.from(0),
          ],
        },
      ] as const
      const results = await readContracts({
        //  ^?
        contracts: [...ethContracts, ...polygonContracts],
      })
      assertType<
        [
          ResolvedConfig['BigIntType'],
          ResolvedConfig['BigIntType'],
          boolean,
          ResolvedConfig['BigIntType'],
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
              args: [
                '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                BigNumber.from(69420),
              ],
            },
          ],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"call revert exception; VM Exception while processing transaction: reverted with reason string \\"ERC721Enumerable: owner index out of bounds\\" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"tokenOfOwnerByIndex(address,uint256)\\", data=\\"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002b455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e6473000000000000000000000000000000000000000000\\", errorArgs=[\\"ERC721Enumerable: owner index out of bounds\\"], errorName=\\"Error\\", errorSignature=\\"Error(string)\\", reason=\\"ERC721Enumerable: owner index out of bounds\\", code=CALL_EXCEPTION, version=abi/5.7.0)"',
      )
    })

    it('warns if allowFailure=true & a contract method fails', async () => {
      expect(
        await readContracts({
          allowFailure: true,
          contracts: [
            ...contracts,
            {
              ...mlootContractConfig,
              chainId: polygon.id,
              functionName: 'tokenOfOwnerByIndex',
              args: [
                '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                BigNumber.from(69420),
              ],
            },
            {
              ...mlootContractConfig,
              chainId: polygon.id,
              functionName: 'tokenOfOwnerByIndex',
              args: [
                '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                BigNumber.from(69421),
              ],
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
          null,
        ]
      `)
      expect(warn).toBeCalled()
      expect(warnMessages).toMatchInlineSnapshot(`
        [
          "Chain \\"Polygon\\" does not support multicall.",
          "Contract method reverted with an error.

        Config:
        {
          \\"address\\": \\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\",
          \\"abi\\": \\"...\\",
          \\"functionName\\": \\"tokenOfOwnerByIndex\\",
          \\"chainId\\": 137,
          \\"args\\": [
            \\"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e\\",
            {
              \\"type\\": \\"BigNumber\\",
              \\"hex\\": \\"0x010f2c\\"
            }
          ]
        }

        Details: Error: call revert exception; VM Exception while processing transaction: reverted with reason string \\"ERC721Enumerable: owner index out of bounds\\" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"tokenOfOwnerByIndex(address,uint256)\\", data=\\"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002b455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e6473000000000000000000000000000000000000000000\\", errorArgs=[\\"ERC721Enumerable: owner index out of bounds\\"], errorName=\\"Error\\", errorSignature=\\"Error(string)\\", reason=\\"ERC721Enumerable: owner index out of bounds\\", code=CALL_EXCEPTION, version=abi/5.7.0)",
          "Contract method reverted with an error.

        Config:
        {
          \\"address\\": \\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\",
          \\"abi\\": \\"...\\",
          \\"functionName\\": \\"tokenOfOwnerByIndex\\",
          \\"chainId\\": 137,
          \\"args\\": [
            \\"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e\\",
            {
              \\"type\\": \\"BigNumber\\",
              \\"hex\\": \\"0x010f2d\\"
            }
          ]
        }

        Details: Error: call revert exception; VM Exception while processing transaction: reverted with reason string \\"ERC721Enumerable: owner index out of bounds\\" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"tokenOfOwnerByIndex(address,uint256)\\", data=\\"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002b455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e6473000000000000000000000000000000000000000000\\", errorArgs=[\\"ERC721Enumerable: owner index out of bounds\\"], errorName=\\"Error\\", errorSignature=\\"Error(string)\\", reason=\\"ERC721Enumerable: owner index out of bounds\\", code=CALL_EXCEPTION, version=abi/5.7.0)",
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
        '"overflow [ See: https://links.ethers.org/v5-errors-NUMERIC_FAULT-overflow ] (fault=\\"overflow\\", operation=\\"BigNumber.from\\", value=1e+31, code=NUMERIC_FAULT, version=bignumber/5.7.0)"',
      )
    })

    it('warns if allowFailure=true & encoding contract function data fails', async () => {
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
          null,
        ]
      `)
      expect(warn).toBeCalled()
      expect(warnMessages).toMatchInlineSnapshot(`
        [
          "Chain \\"Polygon\\" does not support multicall.",
          "Contract method reverted with an error.

        Config:
        {
          \\"address\\": \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\",
          \\"abi\\": \\"...\\",
          \\"functionName\\": \\"ownerOf\\",
          \\"chainId\\": 137,
          \\"args\\": [
            1e+31
          ]
        }

        Details: Error: overflow [ See: https://links.ethers.org/v5-errors-NUMERIC_FAULT-overflow ] (fault=\\"overflow\\", operation=\\"BigNumber.from\\", value=1e+31, code=NUMERIC_FAULT, version=bignumber/5.7.0)",
          "Contract method reverted with an error.

        Config:
        {
          \\"address\\": \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\",
          \\"abi\\": \\"...\\",
          \\"functionName\\": \\"ownerOf\\",
          \\"chainId\\": 137,
          \\"args\\": [
            1e+31
          ]
        }

        Details: Error: overflow [ See: https://links.ethers.org/v5-errors-NUMERIC_FAULT-overflow ] (fault=\\"overflow\\", operation=\\"BigNumber.from\\", value=1e+31, code=NUMERIC_FAULT, version=bignumber/5.7.0)",
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
        '"call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"love(address)\\", data=\\"0x\\", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.7.0)"',
      )
    })

    it('warns if allowFailure=true & a contract has no response', async () => {
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
      expect(warn).toBeCalled()
      expect(warnMessages).toMatchInlineSnapshot(`
        [
          "Chain \\"Polygon\\" does not support multicall.",
          "Contract method reverted with an error.

        Config:
        {
          \\"address\\": \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\",
          \\"abi\\": \\"...\\",
          \\"functionName\\": \\"love\\",
          \\"chainId\\": 137,
          \\"args\\": [
            \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\"
          ]
        }

        Details: Error: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"love(address)\\", data=\\"0x\\", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.7.0)",
        ]
      `)
    })
  })
})
