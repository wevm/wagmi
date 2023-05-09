import { MockConnector } from '@wagmi/core/connectors/mock'
import type { TypedData } from 'abitype'
import { recoverTypedDataAddress } from 'viem'
import { describe, expect, it, vi } from 'vitest'

import { act, actConnect, getWalletClients, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import type { UseSignTypedDataConfig } from './useSignTypedData'
import { useSignTypedData } from './useSignTypedData'

// All properties on a domain are optional
const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC' as const,
} as const

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
} as const

// Data to sign
const message = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
} as const

function useSignTypedDataWithConnect<
  TTypedData extends TypedData,
  TPrimaryType extends string,
>(config: UseSignTypedDataConfig<TTypedData, TPrimaryType> = {} as any) {
  return {
    connect: useConnect(),
    signTypedData: useSignTypedData(config as UseSignTypedDataConfig),
  }
}

describe('useSignTypedData', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useSignTypedData())
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": null,
        "isError": false,
        "isIdle": true,
        "isLoading": false,
        "isSuccess": false,
        "reset": [Function],
        "signTypedData": [Function],
        "signTypedDataAsync": [Function],
        "status": "idle",
        "variables": undefined,
      }
    `)
  })

  describe('configuration', () => {
    it('onSuccess', async () => {
      const onSuccess = vi.fn()
      const utils = renderHook(() =>
        useSignTypedDataWithConnect({
          domain,
          types,
          primaryType: 'Mail',
          message,
          onSuccess,
        }),
      )
      const { result, waitFor } = utils

      await actConnect({ utils })

      await act(async () => result.current.signTypedData.signTypedData())
      await waitFor(() =>
        expect(result.current.signTypedData.isSuccess).toBeTruthy(),
      )
      expect(onSuccess).toBeCalledWith(
        result.current.signTypedData.data,
        { domain, types, primaryType: 'Mail', message },
        undefined,
      )
    })
  })

  describe('return value', () => {
    describe('signTypedData', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSignTypedDataWithConnect({
            domain,
            primaryType: 'Mail',
            types,
            message,
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => result.current.signTypedData.signTypedData())
        await waitFor(() =>
          expect(result.current.signTypedData.isSuccess).toBeTruthy(),
        )
        expect(result.current.signTypedData).toMatchInlineSnapshot(`
          {
            "data": "0x6ea8bb309a3401225701f3565e32519f94a0ea91a5910ce9229fe488e773584c0390416a2190d9560219dab757ecca2029e63fa9d1c2aebf676cc25b9f03126a1b",
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
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
              "message": {
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
              "primaryType": "Mail",
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
            },
          }
        `)
      })

      it('uses deferred args', async () => {
        const utils = renderHook(() => useSignTypedDataWithConnect())
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () =>
          result.current.signTypedData.signTypedData({
            domain,
            types,
            message,
            primaryType: 'Mail',
          }),
        )
        await waitFor(() =>
          expect(result.current.signTypedData.isSuccess).toBeTruthy(),
        )
        expect(result.current.signTypedData).toMatchInlineSnapshot(`
          {
            "data": "0x6ea8bb309a3401225701f3565e32519f94a0ea91a5910ce9229fe488e773584c0390416a2190d9560219dab757ecca2029e63fa9d1c2aebf676cc25b9f03126a1b",
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
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
              "message": {
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
              "primaryType": "Mail",
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
            },
          }
        `)
      })
    })

    describe('signTypedDataAsync', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSignTypedDataWithConnect({
            domain,
            primaryType: 'Mail',
            types,
            message,
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.signTypedData.signTypedDataAsync()
          expect(res).toMatchInlineSnapshot(
            `"0x6ea8bb309a3401225701f3565e32519f94a0ea91a5910ce9229fe488e773584c0390416a2190d9560219dab757ecca2029e63fa9d1c2aebf676cc25b9f03126a1b"`,
          )
        })
        await waitFor(() =>
          expect(result.current.signTypedData.isSuccess).toBeTruthy(),
        )
      })

      it('throws error', async () => {
        const utils = renderHook(() => useSignTypedDataWithConnect())
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          await expect(
            result.current.signTypedData.signTypedDataAsync(),
          ).rejects.toThrowErrorMatchingInlineSnapshot('"domain is required"')
        })
        await waitFor(() =>
          expect(result.current.signTypedData.isError).toBeTruthy(),
        )
      })
    })
  })

  describe('behavior', () => {
    it('can verify typed data', async () => {
      const utils = renderHook(() =>
        useSignTypedDataWithConnect({
          domain,
          primaryType: 'Mail',
          types,
          message,
        }),
      )
      const { result, waitFor } = utils
      await actConnect({ utils })

      await act(async () => result.current.signTypedData.signTypedData())
      await waitFor(() =>
        expect(result.current.signTypedData.isSuccess).toBeTruthy(),
      )

      if (result.current.signTypedData.data)
        expect(
          recoverTypedDataAddress({
            domain,
            message,
            primaryType: 'Mail',
            signature: result.current.signTypedData.data,
            types,
          }),
        ).toMatchInlineSnapshot('Promise {}')
    })

    describe('when chainId is provided in domain', () => {
      it("throws mismatch if chainId doesn't match wallet", async () => {
        const connector = new MockConnector({
          options: {
            flags: { noSwitchChain: true },
            walletClient: getWalletClients()[0]!,
          },
        })
        const utils = renderHook(() =>
          useSignTypedDataWithConnect({
            domain,
            primaryType: 'Mail',
            types,
            message,
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ chainId: 5, connector, utils })

        await act(async () => result.current.signTypedData.signTypedData())
        await waitFor(() =>
          expect(result.current.signTypedData.isError).toBeTruthy(),
        )

        expect(result.current.signTypedData.error).toMatchInlineSnapshot(
          '[ChainMismatchError: Chain mismatch: Expected "Ethereum", received "Goerli".]',
        )
      })
    })

    it.each([
      { property: 'domain' },
      { property: 'types' },
      { property: 'primaryType' },
      { property: 'message' },
    ])('throws error when $property is undefined', async ({ property }) => {
      const baseConfig = {
        domain,
        primaryType: 'Mail',
        types,
        message,
      } as const
      const config = {
        ...baseConfig,
        domain: property === 'domain' ? undefined : baseConfig.domain,
        types: property === 'types' ? undefined : baseConfig.types,
        primaryType:
          property === 'primaryType' ? undefined : baseConfig.primaryType,
        message: property === 'message' ? undefined : baseConfig.message,
      } as const
      const utils = renderHook(() =>
        useSignTypedData(config as UseSignTypedDataConfig),
      )
      const { result, waitFor } = utils

      await act(async () => {
        result.current.signTypedData()
      })

      await waitFor(() => expect(result.current.isError).toBeTruthy())
      expect(result.current.error?.message).toBe(`${property} is required`)
    })
  })
})
