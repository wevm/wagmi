import { toUtf8Bytes, verifyMessage } from 'ethers/lib/utils.js'
import { describe, expect, it, vi } from 'vitest'

import { act, actConnect, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import type { UseSignMessageArgs, UseSignMessageConfig } from './useSignMessage'
import { useSignMessage } from './useSignMessage'

const messages = {
  string: 'The quick brown fox jumped over the lazy dogs.',
  bytes: toUtf8Bytes('The quick brown fox jumped over the lazy dogs.'),
}

function useSignMessageWithConnect(
  config: UseSignMessageArgs & UseSignMessageConfig = {},
) {
  return {
    connect: useConnect(),
    signMessage: useSignMessage(config),
  }
}

describe('useSignMessage', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useSignMessage())
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": null,
        "isError": false,
        "isIdle": true,
        "isLoading": false,
        "isSuccess": false,
        "reset": [Function],
        "signMessage": [Function],
        "signMessageAsync": [Function],
        "status": "idle",
        "variables": undefined,
      }
    `)
  })

  describe('configuration', () => {
    it('onSuccess', async () => {
      const onSuccess = vi.fn()
      const utils = renderHook(() =>
        useSignMessageWithConnect({
          message: messages.string,
          onSuccess,
        }),
      )
      const { result, waitFor } = utils

      await actConnect({ utils })

      await act(async () => result.current.signMessage.signMessage())
      await waitFor(() =>
        expect(result.current.signMessage.isSuccess).toBeTruthy(),
      )
      expect(onSuccess).toBeCalledWith(
        result.current.signMessage.data,
        { message: messages.string },
        undefined,
      )
    })
  })

  describe('return value', () => {
    describe('signMessage', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSignMessageWithConnect({
            message: messages.string,
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => result.current.signMessage.signMessage())
        await waitFor(() =>
          expect(result.current.signMessage.isSuccess).toBeTruthy(),
        )
        expect(result.current.signMessage).toMatchInlineSnapshot(`
          {
            "data": "0x4a05822c986433a093433ba479c8f500fd70215e8864241035498db99107e8a56b34b373e0a3580dc9f532d610341cd83ccdfc623a6545a865314200acfe4f151c",
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "reset": [Function],
            "signMessage": [Function],
            "signMessageAsync": [Function],
            "status": "success",
            "variables": {
              "message": "The quick brown fox jumped over the lazy dogs.",
            },
          }
        `)
      })

      it('uses deferred args', async () => {
        const utils = renderHook(() => useSignMessageWithConnect())
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () =>
          result.current.signMessage.signMessage({ message: messages.string }),
        )
        await waitFor(() =>
          expect(result.current.signMessage.isSuccess).toBeTruthy(),
        )
        expect(result.current.signMessage).toMatchInlineSnapshot(`
          {
            "data": "0x4a05822c986433a093433ba479c8f500fd70215e8864241035498db99107e8a56b34b373e0a3580dc9f532d610341cd83ccdfc623a6545a865314200acfe4f151c",
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "reset": [Function],
            "signMessage": [Function],
            "signMessageAsync": [Function],
            "status": "success",
            "variables": {
              "message": "The quick brown fox jumped over the lazy dogs.",
            },
          }
        `)
      })

      it('fails', async () => {
        const utils = renderHook(() => useSignMessageWithConnect())
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => result.current.signMessage.signMessage())
        await waitFor(() =>
          expect(result.current.signMessage.isError).toBeTruthy(),
        )
        expect(result.current.signMessage).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [Error: message is required],
            "isError": true,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": false,
            "reset": [Function],
            "signMessage": [Function],
            "signMessageAsync": [Function],
            "status": "error",
            "variables": {
              "message": undefined,
            },
          }
        `)
      })
    })

    describe('signMessageAsync', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSignMessageWithConnect({
            message: messages.string,
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.signMessage.signMessageAsync()
          expect(res).toMatchInlineSnapshot(
            `"0x4a05822c986433a093433ba479c8f500fd70215e8864241035498db99107e8a56b34b373e0a3580dc9f532d610341cd83ccdfc623a6545a865314200acfe4f151c"`,
          )
        })
        await waitFor(() =>
          expect(result.current.signMessage.isSuccess).toBeTruthy(),
        )
      })

      it('throws error', async () => {
        const utils = renderHook(() => useSignMessageWithConnect())
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          await expect(
            result.current.signMessage.signMessageAsync(),
          ).rejects.toThrowErrorMatchingInlineSnapshot(`"message is required"`)
        })
        await waitFor(() =>
          expect(result.current.signMessage.isError).toBeTruthy(),
        )
      })
    })
  })

  describe('behavior', () => {
    it('can sign bytes message', async () => {
      const utils = renderHook(() =>
        useSignMessageWithConnect({
          message: messages.bytes,
        }),
      )
      const { result, waitFor } = utils
      await actConnect({ utils })

      await act(async () => result.current.signMessage.signMessage())
      await waitFor(() =>
        expect(result.current.signMessage.isSuccess).toBeTruthy(),
      )
      expect(result.current.signMessage).toMatchInlineSnapshot(`
        {
          "data": "0x4a05822c986433a093433ba479c8f500fd70215e8864241035498db99107e8a56b34b373e0a3580dc9f532d610341cd83ccdfc623a6545a865314200acfe4f151c",
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isSuccess": true,
          "reset": [Function],
          "signMessage": [Function],
          "signMessageAsync": [Function],
          "status": "success",
          "variables": {
            "message": Uint8Array [
              84,
              104,
              101,
              32,
              113,
              117,
              105,
              99,
              107,
              32,
              98,
              114,
              111,
              119,
              110,
              32,
              102,
              111,
              120,
              32,
              106,
              117,
              109,
              112,
              101,
              100,
              32,
              111,
              118,
              101,
              114,
              32,
              116,
              104,
              101,
              32,
              108,
              97,
              122,
              121,
              32,
              100,
              111,
              103,
              115,
              46,
            ],
          },
        }
      `)
    })

    it('can verify message', async () => {
      const utils = renderHook(() =>
        useSignMessageWithConnect({
          message: messages.string,
        }),
      )
      const { result, waitFor } = utils
      await actConnect({ utils })

      await act(async () => result.current.signMessage.signMessage())
      await waitFor(() =>
        expect(result.current.signMessage.isSuccess).toBeTruthy(),
      )
      expect(
        verifyMessage(
          messages.string,
          result.current.signMessage.data as string,
        ),
      ).toMatchInlineSnapshot(`"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`)
    })
  })
})
