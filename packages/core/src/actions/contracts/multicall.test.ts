import { setupClient } from '../../../test'

import { chain } from '../../constants'
import { MulticallArgs, multicall } from './multicall'

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

const contracts: MulticallArgs = [
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
  beforeEach(() =>
    setupClient({
      chains: [chain.mainnet, { ...chain.polygon, multicall: undefined }],
    }),
  )

  it('default', async () => {
    expect(await multicall(contracts)).toMatchInlineSnapshot(`
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
      expect(await multicall(contracts, { chainId: 1 })).toMatchInlineSnapshot(`
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
      expect(await multicall(contracts, { overrides: { blockTag: 'latest' } }))
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

    it('allowFailure', async () => {
      try {
        await multicall(
          [
            ...contracts,
            {
              ...mlootContractConfig,
              functionName: 'tokenOfOwnerByIndex',
              args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69420],
            },
          ],
          { allowFailure: false },
        )
      } catch (err) {
        expect(err).toMatchInlineSnapshot(
          `[Error: call revert exception; VM Exception while processing transaction: reverted with reason string "Multicall3: call failed" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="aggregate3((address,bool,bytes)[])", data="0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000174d756c746963616c6c333a2063616c6c206661696c6564000000000000000000", errorArgs=["Multicall3: call failed"], errorName="Error", errorSignature="Error(string)", reason="Multicall3: call failed", code=CALL_EXCEPTION, version=abi/5.6.1)]`,
        )
      }
    })

    it('allowFailure in contract config', async () => {
      try {
        await multicall([
          ...contracts,
          {
            ...mlootContractConfig,
            functionName: 'tokenOfOwnerByIndex',
            args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 69420],
            allowFailure: false,
          },
        ])
      } catch (err) {
        expect(err).toMatchInlineSnapshot(
          `[Error: call revert exception; VM Exception while processing transaction: reverted with reason string "Multicall3: call failed" [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="aggregate3((address,bool,bytes)[])", data="0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000174d756c746963616c6c333a2063616c6c206661696c6564000000000000000000", errorArgs=["Multicall3: call failed"], errorName="Error", errorSignature="Error(string)", reason="Multicall3: call failed", code=CALL_EXCEPTION, version=abi/5.6.1)]`,
        )
      }
    })
  })

  describe('errors', () => {
    it('should throw if the chain does not support multicall', async () => {
      try {
        await multicall(contracts, { chainId: chain.polygon.id })
      } catch (err) {
        expect(err).toMatchInlineSnapshot(
          `[Error: Chain "Polygon" does not support multicall.]`,
        )
      }
    })

    it('should throw if the chain has not deployed multicall on block', async () => {
      try {
        await multicall(contracts, { overrides: { blockTag: 1 } })
      } catch (err) {
        expect(err).toMatchInlineSnapshot(
          `[Error: Chain "Ethereum" does not support multicall on block 1]`,
        )
      }
    })
  })
})
