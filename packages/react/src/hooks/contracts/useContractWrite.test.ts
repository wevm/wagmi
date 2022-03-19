import { WriteContractArgs } from '@wagmi/core'

import { actHook, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
  useContractWrite,
} from './useContractWrite'

const useContractWriteWithConnect = (
  contractConfig: WriteContractArgs,
  functionName: string,
  config: UseContractWriteArgs & UseContractWriteConfig = {},
) => {
  const connect = useConnect()
  const contractWrite = useContractWrite(contractConfig, functionName, config)
  return { connect, contractWrite } as const
}

describe.skip('useContractWrite', () => {
  it('init', async () => {
    const { result } = renderHook(() =>
      useContractWriteWithConnect(
        {
          addressOrName: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
          contractInterface: [
            {
              inputs: [
                { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
              ],
              name: 'claim',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
        },
        'claim',
      ),
    )

    expect(result.current.contractWrite).toMatchInlineSnapshot(`
      {
        "context": undefined,
        "data": undefined,
        "error": null,
        "failureCount": 0,
        "isError": false,
        "isIdle": true,
        "isLoading": false,
        "isPaused": false,
        "isSuccess": false,
        "reset": [Function],
        "status": "idle",
        "variables": undefined,
        "write": [Function],
        "writeAsync": [Function],
      }
    `)
  })

  describe('write', () => {
    it('no deferred args', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useContractWriteWithConnect(
          {
            addressOrName: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
            contractInterface: [
              {
                inputs: [
                  { internalType: 'address', name: 'to', type: 'address' },
                  { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                ],
                name: 'approve',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
              },
            ],
          },
          'approve',
          { args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 121] },
        ),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.contractWrite.write()
      })

      await waitForNextUpdate()

      const { data, ...res } = result.current.contractWrite
      expect(data).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "context": undefined,
          "error": null,
          "failureCount": 0,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": true,
          "reset": [Function],
          "status": "success",
          "variables": {
            "args": [
              "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
              121,
            ],
            "overrides": undefined,
          },
          "write": [Function],
          "writeAsync": [Function],
        }
      `)
    })

    it('deferred args', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useContractWriteWithConnect(
          {
            addressOrName: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
            contractInterface: [
              {
                inputs: [
                  { internalType: 'address', name: 'to', type: 'address' },
                  { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                ],
                name: 'approve',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
              },
            ],
          },
          'approve',
        ),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.contractWrite.write({
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 121],
        })
      })

      await waitForNextUpdate()

      const { data, ...res } = result.current.contractWrite
      expect(data).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "context": undefined,
          "error": null,
          "failureCount": 0,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": true,
          "reset": [Function],
          "status": "success",
          "variables": {
            "args": [
              "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
              121,
            ],
          },
          "write": [Function],
          "writeAsync": [Function],
        }
      `)
    })

    it('contract error', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useContractWriteWithConnect(
          {
            addressOrName: '0xe614fbd03d58a60fd9418d4ab5eb5ec6c001415f',
            contractInterface: [
              {
                inputs: [
                  { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                ],
                name: 'claim',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
              },
            ],
          },
          'claim',
          { args: [121] },
        ),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.contractWrite.write()
      })

      await waitForNextUpdate()

      const { error, ...res } = result.current.contractWrite
      expect(error?.message).toContain('token already minted')
      expect(res).toMatchInlineSnapshot(`
        {
          "context": undefined,
          "data": undefined,
          "failureCount": 1,
          "isError": true,
          "isIdle": false,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": false,
          "reset": [Function],
          "status": "error",
          "variables": {
            "args": [
              121,
            ],
            "overrides": undefined,
          },
          "write": [Function],
          "writeAsync": [Function],
        }
      `)
    })
  })
})
