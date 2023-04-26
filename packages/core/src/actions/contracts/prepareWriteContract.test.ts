import { beforeEach, describe, expect, it } from 'vitest'

import {
  getRandomTokenId,
  getWalletClients,
  setupClient,
  wagmiContractConfig,
} from '../../../test'
import { mainnet } from '../../chains'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { prepareWriteContract } from './prepareWriteContract'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

describe('prepareWriteContract', () => {
  beforeEach(() => {
    setupClient()
  })

  it('default', async () => {
    await connect({ connector })
    const { request, ...rest } = await prepareWriteContract({
      ...wagmiContractConfig,
      functionName: 'mint',
      args: [getRandomTokenId()],
    })
    const { abi, args, ...request_ } = request || {}
    expect(abi).toBeDefined()
    expect(args.length).toBe(1)
    expect(request_).toMatchInlineSnapshot(`
      {
        "accessList": undefined,
        "account": {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "type": "json-rpc",
        },
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "blockNumber": undefined,
        "blockTag": undefined,
        "chainId": undefined,
        "functionName": "mint",
        "gas": undefined,
        "gasPrice": undefined,
        "maxFeePerGas": undefined,
        "maxPriorityFeePerGas": undefined,
        "nonce": undefined,
        "value": undefined,
      }
    `)
    expect(rest).toMatchInlineSnapshot(`
      {
        "mode": "prepared",
        "result": undefined,
      }
    `)
  })

  describe('args', () => {
    it('chainId', async () => {
      await connect({ connector })
      const { request, ...rest } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
        chainId: mainnet.id,
      })
      const { abi, args, ...request_ } = request || {}
      expect(abi).toBeDefined()
      expect(args.length).toBe(1)
      expect(request_).toMatchInlineSnapshot(`
        {
          "accessList": undefined,
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": undefined,
          "blockTag": undefined,
          "chainId": 1,
          "functionName": "mint",
          "gas": undefined,
          "gasPrice": undefined,
          "maxFeePerGas": undefined,
          "maxPriorityFeePerGas": undefined,
          "nonce": undefined,
          "value": undefined,
        }
      `)
      expect(rest).toMatchInlineSnapshot(`
        {
          "mode": "prepared",
          "result": undefined,
        }
      `)
    })

    it('gas', async () => {
      await connect({ connector })
      const { request, ...rest } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
        gas: 1_000_000n,
      })
      const { abi, args, ...request_ } = request || {}
      expect(abi).toBeDefined()
      expect(args.length).toBe(1)
      expect(request_).toMatchInlineSnapshot(`
        {
          "accessList": undefined,
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": undefined,
          "blockTag": undefined,
          "chainId": undefined,
          "functionName": "mint",
          "gas": 1000000n,
          "gasPrice": undefined,
          "maxFeePerGas": undefined,
          "maxPriorityFeePerGas": undefined,
          "nonce": undefined,
          "value": undefined,
        }
      `)
      expect(rest).toMatchInlineSnapshot(`
        {
          "mode": "prepared",
          "result": undefined,
        }
      `)
    })

    it('blockNumber', async () => {
      await connect({ connector })
      const { request, ...rest } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
        blockNumber: 42069n,
      })
      const { abi, args, ...request_ } = request || {}
      expect(abi).toBeDefined()
      expect(args.length).toBe(1)
      expect(request_).toMatchInlineSnapshot(`
        {
          "accessList": undefined,
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": 42069n,
          "blockTag": undefined,
          "chainId": undefined,
          "functionName": "mint",
          "gas": undefined,
          "gasPrice": undefined,
          "maxFeePerGas": undefined,
          "maxPriorityFeePerGas": undefined,
          "nonce": undefined,
          "value": undefined,
        }
      `)
      expect(rest).toMatchInlineSnapshot(`
        {
          "mode": "prepared",
          "result": undefined,
        }
      `)
    })

    it('blockTag', async () => {
      await connect({ connector })
      const { request, ...rest } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
        blockTag: 'latest',
      })
      const { abi, args, ...request_ } = request || {}
      expect(abi).toBeDefined()
      expect(args.length).toBe(1)
      expect(request_).toMatchInlineSnapshot(`
        {
          "accessList": undefined,
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": undefined,
          "blockTag": "latest",
          "chainId": undefined,
          "functionName": "mint",
          "gas": undefined,
          "gasPrice": undefined,
          "maxFeePerGas": undefined,
          "maxPriorityFeePerGas": undefined,
          "nonce": undefined,
          "value": undefined,
        }
      `)
      expect(rest).toMatchInlineSnapshot(`
        {
          "mode": "prepared",
          "result": undefined,
        }
      `)
    })

    it('nonce', async () => {
      await connect({ connector })
      const { request, ...rest } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
        nonce: 1,
      })
      const { abi, args, ...request_ } = request || {}
      expect(abi).toBeDefined()
      expect(args.length).toBe(1)
      expect(request_).toMatchInlineSnapshot(`
        {
          "accessList": undefined,
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "blockNumber": undefined,
          "blockTag": undefined,
          "chainId": undefined,
          "functionName": "mint",
          "gas": undefined,
          "gasPrice": undefined,
          "maxFeePerGas": undefined,
          "maxPriorityFeePerGas": undefined,
          "nonce": 1,
          "value": undefined,
        }
      `)
      expect(rest).toMatchInlineSnapshot(`
        {
          "mode": "prepared",
          "result": undefined,
        }
      `)
    })
  })

  describe('errors', () => {
    it('wallet is on different chain', async () => {
      await connect({ connector })

      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          chainId: 69,
          args: [getRandomTokenId()],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 69\\", received \\"Ethereum\\"."`,
      )
    })

    it('chain not configured for connector', async () => {
      await connect({ connector, chainId: 69_420 })

      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          chainId: 69_420,
          args: [getRandomTokenId()],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Chain \\"69420\\" not configured for connector \\"mock\\"."',
      )
    })

    it('contract method error', async () => {
      await connect({ connector })
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          // @ts-expect-error invalid function name
          functionName: 'claim',
        }),
      ).rejects.toThrowError()
    })

    it('connector not found', async () => {
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          args: [getRandomTokenId()],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('contract function not found', async () => {
      await connect({ connector })
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          // @ts-expect-error invalid function name
          functionName: 'wagmi',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Function \\"wagmi\\" not found on ABI.
        Make sure you are using the correct ABI and that the function exists on it.

        Docs: https://viem.sh/docs/contract/encodeFunctionData.html
        Version: viem@0.3.12"
      `)
    })
  })
})
