import { verifyTypedData } from 'ethers/lib/utils'

import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import {
  UseSignTypedDataArgs,
  UseSignTypedDataConfig,
  useSignTypedData,
} from './useSignTypedData'

// All properties on a domain are optional
const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
}

// Named list of all type definitions
const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
}

// Data to sign
const value = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
}

const useSignTypedDataWithConnect = (
  config: UseSignTypedDataArgs & UseSignTypedDataConfig = {},
) => {
  const connect = useConnect()
  const signTypedData = useSignTypedData(config)
  return { connect, signTypedData } as const
}

describe('useSignTypedData', () => {
  it('on mount', async () => {
    const { result } = renderHook(() => useSignTypedData())
    expect(result.current).toMatchInlineSnapshot(`
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
        "signTypedData": [Function],
        "signTypedDataAsync": [Function],
        "status": "idle",
        "variables": undefined,
      }
    `)
  })

  describe('signTypedData', () => {
    it('uses config', async () => {
      const { result, waitFor } = renderHook(() =>
        useSignTypedDataWithConnect({
          domain,
          types,
          value,
        }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.signTypedData.signTypedData()
      })

      await waitFor(() => result.current.signTypedData.isSuccess)
      const account = await result.current.connect.activeConnector?.getAccount()
      const recoveredAccount = verifyTypedData(
        <any>result.current.signTypedData.variables?.domain,
        <any>result.current.signTypedData.variables?.types,
        <any>result.current.signTypedData.variables?.value,
        <string>result.current.signTypedData.data,
      )
      expect(account).toEqual(recoveredAccount)
      expect(result.current.signTypedData).toMatchInlineSnapshot(`
        {
          "context": undefined,
          "data": "0x6ea8bb309a3401225701f3565e32519f94a0ea91a5910ce9229fe488e773584c0390416a2190d9560219dab757ecca2029e63fa9d1c2aebf676cc25b9f03126a1b",
          "error": null,
          "failureCount": 0,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": true,
          "reset": [Function],
          "signTypedData": [Function],
          "signTypedDataAsync": [Function],
          "status": "success",
          "variables": {
            "domain": {
              "chainId": 1,
              "name": "Ether Mail",
              "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
              "version": "1",
            },
            "types": {
              "Mail": [
                {
                  "name": "from",
                  "type": "Person",
                },
                {
                  "name": "to",
                  "type": "Person",
                },
                {
                  "name": "contents",
                  "type": "string",
                },
              ],
              "Person": [
                {
                  "name": "name",
                  "type": "string",
                },
                {
                  "name": "wallet",
                  "type": "address",
                },
              ],
            },
            "value": {
              "contents": "Hello, Bob!",
              "from": {
                "name": "Cow",
                "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
              },
              "to": {
                "name": "Bob",
                "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              },
            },
          },
        }
      `)
    })

    it('uses params', async () => {
      const { result, waitFor } = renderHook(() =>
        useSignTypedDataWithConnect(),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.signTypedData.signTypedData({
          domain,
          types,
          value,
        })
      })

      await waitFor(() => result.current.signTypedData.isSuccess)
      const account = await result.current.connect.activeConnector?.getAccount()
      const recoveredAccount = verifyTypedData(
        <any>result.current.signTypedData.variables?.domain,
        <any>result.current.signTypedData.variables?.types,
        <any>result.current.signTypedData.variables?.value,
        <string>result.current.signTypedData.data,
      )
      expect(account).toEqual(recoveredAccount)
      expect(result.current.signTypedData).toMatchInlineSnapshot(`
        {
          "context": undefined,
          "data": "0x6ea8bb309a3401225701f3565e32519f94a0ea91a5910ce9229fe488e773584c0390416a2190d9560219dab757ecca2029e63fa9d1c2aebf676cc25b9f03126a1b",
          "error": null,
          "failureCount": 0,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": true,
          "reset": [Function],
          "signTypedData": [Function],
          "signTypedDataAsync": [Function],
          "status": "success",
          "variables": {
            "domain": {
              "chainId": 1,
              "name": "Ether Mail",
              "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
              "version": "1",
            },
            "types": {
              "Mail": [
                {
                  "name": "from",
                  "type": "Person",
                },
                {
                  "name": "to",
                  "type": "Person",
                },
                {
                  "name": "contents",
                  "type": "string",
                },
              ],
              "Person": [
                {
                  "name": "name",
                  "type": "string",
                },
                {
                  "name": "wallet",
                  "type": "address",
                },
              ],
            },
            "value": {
              "contents": "Hello, Bob!",
              "from": {
                "name": "Cow",
                "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
              },
              "to": {
                "name": "Bob",
                "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              },
            },
          },
        }
      `)
    })

    it('has error', async () => {
      const { result, waitFor } = renderHook(() =>
        useSignTypedDataWithConnect(),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.signTypedData.signTypedData()
      })

      await waitFor(() => result.current.signTypedData.isError)
      expect(result.current.signTypedData).toMatchInlineSnapshot(`
        {
          "context": undefined,
          "data": undefined,
          "error": [Error: domain, types, and value are all required],
          "failureCount": 1,
          "isError": true,
          "isIdle": false,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": false,
          "reset": [Function],
          "signTypedData": [Function],
          "signTypedDataAsync": [Function],
          "status": "error",
          "variables": {
            "domain": undefined,
            "types": undefined,
            "value": undefined,
          },
        }
      `)
    })
  })

  describe('signTypedDataAsync', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useSignTypedDataWithConnect({
          domain,
          types,
          value,
        }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        const res = await result.current.signTypedData.signTypedDataAsync()
        const account =
          await result.current.connect.activeConnector?.getAccount()
        const recoveredAccount = verifyTypedData(
          <any>result.current.signTypedData.variables?.domain,
          <any>result.current.signTypedData.variables?.types,
          <any>result.current.signTypedData.variables?.value,
          <string>res,
        )
        expect(account).toEqual(recoveredAccount)
      })
    })
  })
})
