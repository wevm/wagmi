import { BigNumber } from 'ethers'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', BigNumber.from(0)],
  },
]

let warnMessages: string[] = []
const warn = vi
  .spyOn(console, 'warn')
  .mockImplementation((message) => warnMessages.push(message))

describe('multicall', () => {
  beforeEach(() => {
    setupClient({
      chains: [mainnet, { ...polygon, contracts: { multicall3: undefined } }],
    })
    warnMessages = []
  })

  afterEach(() => {
    warnMessages = []
  })

  it('default', async () => {
    await expect(multicall({ contracts })).resolves.toMatchInlineSnapshot(`
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

  describe('args', () => {
    it('chainId', async () => {
      await expect(multicall({ chainId: 1, contracts })).resolves
        .toMatchInlineSnapshot(`
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

    it('overrides', async () => {
      await expect(multicall({ contracts, overrides: { blockTag: 'latest' } }))
        .resolves.toMatchInlineSnapshot(`
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
                args: [
                  '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                  BigNumber.from('69420'),
                ],
              },
            ],
          }),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          '"call revert exception; VM Exception while processing transaction: reverted with reason string \\"Multicall3: call failed\\" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"aggregate3((address,bool,bytes)[])\\", data=\\"0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000174d756c746963616c6c333a2063616c6c206661696c6564000000000000000000\\", errorArgs=[\\"Multicall3: call failed\\"], errorName=\\"Error\\", errorSignature=\\"Error(string)\\", reason=\\"Multicall3: call failed\\", code=CALL_EXCEPTION, version=abi/5.7.0)"',
        )
      })

      it('warns when allowFailure=true & a contract method fails', async () => {
        await expect(
          multicall({
            allowFailure: true,
            contracts: [
              ...contracts,
              {
                ...mlootContractConfig,
                functionName: 'tokenOfOwnerByIndex',
                args: [
                  '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                  BigNumber.from(69420),
                ],
              },
              {
                ...mlootContractConfig,
                functionName: 'tokenOfOwnerByIndex',
                args: [
                  '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
                  BigNumber.from(69421),
                ],
              },
            ],
          }),
        ).resolves.toMatchInlineSnapshot(`
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
            "Contract method reverted with an error.

          Config:
          {
            \\"address\\": \\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\",
            \\"abi\\": \\"...\\",
            \\"functionName\\": \\"tokenOfOwnerByIndex\\",
            \\"chainId\\": 1,
            \\"args\\": [
              \\"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e\\",
              {
                \\"type\\": \\"BigNumber\\",
                \\"hex\\": \\"0x010f2c\\"
              }
            ]
          }

          Details: call revert exception; VM Exception while processing transaction: reverted with reason string \\"ERC721Enumerable: owner index out of bounds\\" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"tokenOfOwnerByIndex(address,uint256)\\", data=\\"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002b455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e6473000000000000000000000000000000000000000000\\", errorArgs=[\\"ERC721Enumerable: owner index out of bounds\\"], errorName=\\"Error\\", errorSignature=\\"Error(string)\\", reason=\\"ERC721Enumerable: owner index out of bounds\\", code=CALL_EXCEPTION, version=abi/5.7.0)",
            "Contract method reverted with an error.

          Config:
          {
            \\"address\\": \\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\",
            \\"abi\\": \\"...\\",
            \\"functionName\\": \\"tokenOfOwnerByIndex\\",
            \\"chainId\\": 1,
            \\"args\\": [
              \\"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e\\",
              {
                \\"type\\": \\"BigNumber\\",
                \\"hex\\": \\"0x010f2d\\"
              }
            ]
          }

          Details: call revert exception; VM Exception while processing transaction: reverted with reason string \\"ERC721Enumerable: owner index out of bounds\\" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"tokenOfOwnerByIndex(address,uint256)\\", data=\\"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002b455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e6473000000000000000000000000000000000000000000\\", errorArgs=[\\"ERC721Enumerable: owner index out of bounds\\"], errorName=\\"Error\\", errorSignature=\\"Error(string)\\", reason=\\"ERC721Enumerable: owner index out of bounds\\", code=CALL_EXCEPTION, version=abi/5.7.0)",
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
          '"overflow [ See: https://links.ethers.org/v5-errors-NUMERIC_FAULT-overflow ] (fault=\\"overflow\\", operation=\\"BigNumber.from\\", value=1e+31, code=NUMERIC_FAULT, version=bignumber/5.7.0)"',
        )
      })

      it('warns if allowFailure=true & encoding contract function data fails', async () => {
        warnMessages = []
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
            "Contract read returned an empty response. This could be due to any of the following:
          - The contract does not have the function \\"ownerOf\\",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.

          Config:
          {
            \\"address\\": \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\",
            \\"abi\\": \\"...\\",
            \\"functionName\\": \\"ownerOf\\",
            \\"chainId\\": 1,
            \\"args\\": [
              1e+31
            ]
          }",
            "Contract read returned an empty response. This could be due to any of the following:
          - The contract does not have the function \\"ownerOf\\",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.

          Config:
          {
            \\"address\\": \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\",
            \\"abi\\": \\"...\\",
            \\"functionName\\": \\"ownerOf\\",
            \\"chainId\\": 1,
            \\"args\\": [
              1e+31
            ]
          }",
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
          "Contract read returned an empty response. This could be due to any of the following:
          - The contract does not have the function \\"love\\",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.

          Config:
          {
            \\"address\\": \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\",
            \\"abi\\": \\"...\\",
            \\"functionName\\": \\"love\\",
            \\"chainId\\": 1,
            \\"args\\": [
              \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\"
            ]
          }"
        `)
      })

      it('warns if allowFailure=true & a contract has no response', async () => {
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
            "Contract read returned an empty response. This could be due to any of the following:
          - The contract does not have the function \\"love\\",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.

          Config:
          {
            \\"address\\": \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\",
            \\"abi\\": \\"...\\",
            \\"functionName\\": \\"love\\",
            \\"chainId\\": 1,
            \\"args\\": [
              \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\"
            ]
          }",
            "Contract read returned an empty response. This could be due to any of the following:
          - The contract does not have the function \\"love\\",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.

          Config:
          {
            \\"address\\": \\"0x01D13b073CE170e94f6d530B0Cd54498A87A537F\\",
            \\"abi\\": \\"...\\",
            \\"functionName\\": \\"love\\",
            \\"chainId\\": 1,
            \\"args\\": [
              \\"0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC\\"
            ]
          }",
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
        `"Chain \\"Polygon\\" does not support multicall."`,
      )
    })

    it('should throw if the chain has not deployed multicall on block', async () => {
      await expect(
        multicall({ contracts, overrides: { blockTag: 1 } }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain \\"Ethereum\\" does not support multicall on block 1."`,
      )
    })
  })
})
