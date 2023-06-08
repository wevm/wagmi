import { beforeEach, describe, expect, it } from 'vitest'

import {
  getRandomTokenId,
  getWalletClients,
  setupConfig,
  wagmiContractConfig,
} from '../../../test'
import { mainnet } from '../../chains'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { getPublicClient, getWalletClient } from '../viem'
import { prepareWriteContract } from './prepareWriteContract'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

describe('prepareWriteContract', () => {
  beforeEach(() => {
    setupConfig()
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
    it('account', async () => {
      await connect({ connector })
      const { request, ...rest } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
        account: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
      })
      const { abi, args, ...request_ } = request || {}
      expect(abi).toBeDefined()
      expect(args.length).toBe(1)
      expect(request_).toMatchInlineSnapshot(`
        {
          "accessList": undefined,
          "account": "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
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
      const publicClient = getPublicClient()
      const walletClient = await getWalletClient()
      const count = await publicClient.getTransactionCount({
        address: walletClient!.account.address!,
      })
      const { request, ...rest } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
        nonce: count,
      })
      const { abi, args, nonce, ...request_ } = request || {}
      expect(abi).toBeDefined()
      expect(args.length).toBe(1)
      expect(nonce).toBeDefined()
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
        Version: viem@1.0.0"
      `)
    })
  })
})
