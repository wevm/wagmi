import { toUtf8Bytes, verifyMessage } from 'ethers/lib/utils'

import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import {
  UseSignMessageArgs,
  UseSignMessageConfig,
  useSignMessage,
} from './useSignMessage'

const messages = {
  basic: 'The quick brown fox jumped over the lazy dogs.',
  bytes: toUtf8Bytes('The quick brown fox jumped over the lazy dogs.'),
}

const useSignMessageWithConnect = (
  config: UseSignMessageArgs & UseSignMessageConfig = {},
) => {
  const connect = useConnect()
  const signMessage = useSignMessage(config)
  return { connect, signMessage } as const
}

describe('useSignMessage', () => {
  it('on mount', async () => {
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

  describe('signMessage', () => {
    it('uses config', async () => {
      const { result, waitFor } = renderHook(() =>
        useSignMessageWithConnect({
          message: messages.basic,
        }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.signMessage.signMessage()
      })

      await waitFor(() => result.current.signMessage.isSuccess)
      const account = await result.current.connect.activeConnector?.getAccount()
      const recoveredAccount = verifyMessage(
        <string>result.current.signMessage.variables?.message,
        <string>result.current.signMessage.data,
      )
      expect(account).toEqual(recoveredAccount)
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

    it('uses params', async () => {
      const { result, waitFor } = renderHook(() => useSignMessageWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.signMessage.signMessage({
          message: messages.basic,
        })
      })

      await waitFor(() => result.current.signMessage.isSuccess)
      const account = await result.current.connect.activeConnector?.getAccount()
      const recoveredAccount = verifyMessage(
        <string>result.current.signMessage.variables?.message,
        <string>result.current.signMessage.data,
      )
      expect(account).toEqual(recoveredAccount)
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

    it('has error', async () => {
      const { result, waitFor } = renderHook(() => useSignMessageWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        result.current.signMessage.signMessage()
      })

      await waitFor(() => result.current.signMessage.isError)
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
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useSignMessageWithConnect({
          message: messages.basic,
        }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      await actHook(async () => {
        const res = await result.current.signMessage.signMessageAsync()
        const account =
          await result.current.connect.activeConnector?.getAccount()
        const recoveredAccount = verifyMessage(
          <string>result.current.signMessage.variables?.message,
          <string>res,
        )
        expect(account).toEqual(recoveredAccount)
      })
    })
  })
})
