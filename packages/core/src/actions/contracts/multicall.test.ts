import {
  mlootContractConfig,
  setupClient,
  wagmigotchiContractConfig,
} from '../../../test'

import { chain } from '../../constants'
import { MulticallConfig, multicall } from './multicall'

const contracts: MulticallConfig['contracts'] = [
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

describe('multicall', () => {
  beforeEach(() => {
    setupClient({
      chains: [chain.mainnet, { ...chain.polygon, multicall: undefined }],
    })
    console.warn = jest.fn()
  })

  it('default', async () => {
    expect(await multicall({ contracts })).toMatchInlineSnapshot(`
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
      expect(await multicall({ chainId: 1, contracts })).toMatchInlineSnapshot(`
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
      expect(await multicall({ contracts, overrides: { blockTag: 'latest' } }))
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

    describe('allowFailure', () => {
      it('it should throw if a contract method fails', async () => {
        await expect(
          multicall({
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
          `"call revert exception; VM Exception while processing transaction: reverted with reason string \\"Multicall3: call failed\\" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method=\\"aggregate3((address,bool,bytes)[])\\", data=\\"0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000174d756c746963616c6c333a2063616c6c206661696c6564000000000000000000\\", errorArgs=[\\"Multicall3: call failed\\"], errorName=\\"Error\\", errorSignature=\\"Error(string)\\", reason=\\"Multicall3: call failed\\", code=CALL_EXCEPTION, version=abi/5.6.1)"`,
        )
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

      it('does not throw if allowFailure=true & a contract has no response', async () => {
        expect(
          await multicall({
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
    })
  })

  describe('errors', () => {
    it('should throw if the chain does not support multicall', async () => {
      await expect(
        multicall({ contracts, chainId: chain.polygon.id }),
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
