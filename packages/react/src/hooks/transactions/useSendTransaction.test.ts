import { connect, disconnect } from '@wagmi/core'
import { client } from '@wagmi/core/src/client'

import { BigNumber } from 'ethers'

import { actHook, renderHook } from '../../../test'
import { useSendTransaction } from './useSendTransaction'

describe('useSendTransaction', () => {
  it('on mount', async () => {
    const { result } = renderHook(() =>
      useSendTransaction({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: BigNumber.from('1000000000000000000'), // 1 ETH
        },
      }),
    )

    await actHook(async () => {
      await disconnect()
      const mockConnector = client.connectors[0]
      await connect(mockConnector)
    })

    const res = result.current.sendTransaction
    expect(res).toMatchInlineSnapshot(`[Function]`)
  })

  it('sends transaction', async () => {
    const { result, waitFor } = renderHook(() =>
      useSendTransaction({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: BigNumber.from('1000000000000000000'), // 1 ETH
        },
      }),
    )

    await actHook(async () => {
      await disconnect()
      const mockConnector = client.connectors[0]
      await connect(mockConnector)
      result.current.sendTransaction()
    })

    await waitFor(() => result.current.isSuccess)

    const { data, ...res } = result.current
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
        "sendTransaction": [Function],
        "sendTransactionAsync": [Function],
        "status": "success",
        "variables": {
          "request": {
            "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            "value": {
              "hex": "0x0de0b6b3a7640000",
              "type": "BigNumber",
            },
          },
        },
      }
    `)
  })

  it('fails on insufficient balance', async () => {
    const { result, waitFor } = renderHook(() =>
      useSendTransaction({
        request: {
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          value: BigNumber.from('10000000000000000000000'), // 100,000 ETH
        },
      }),
    )

    await actHook(async () => {
      await disconnect()
      const mockConnector = client.connectors[0]
      await connect(mockConnector)
      result.current.sendTransaction()
    })

    await waitFor(() => result.current.isError)

    const { error, ...res } = result.current
    expect(error).toBeDefined()
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
        "sendTransaction": [Function],
        "sendTransactionAsync": [Function],
        "status": "error",
        "variables": {
          "request": {
            "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            "value": {
              "hex": "0x021e19e0c9bab2400000",
              "type": "BigNumber",
            },
          },
        },
      }
    `)
  })
})
