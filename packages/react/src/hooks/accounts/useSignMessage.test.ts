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
  it.only('on mount', async () => {
    const { result } = renderHook(() => useSignMessage())
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
        "signMessage": [Function],
        "signMessageAsync": [Function],
        "status": "idle",
        "variables": undefined,
      }
    `)
  })

  describe('signMessage', () => {
    it('uses config', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
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

      await waitForNextUpdate()

      expect(result.current.signMessage).toMatchInlineSnapshot()

      // await waitFor(() => result.current.signMessage.isSuccess)
      //
      // const account = await result.current.connect.activeConnector.getAccount()
      // const recoveredAccount = verifyMessage(
      //   result.current.signMessage.variables?.message,
      //   result.current.signMessage.data,
      // )
      // expect(account).toEqual(recoveredAccount)
    })

    it('uses params', async () => {
      const { result } = renderHook(() => useSignMessageWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signMessage[1]({
          message: messages.basic,
        })
        if (res.error) throw new Error('No signature')
        const account =
          await result.current.connect[0].data.connector?.getAccount()
        const recoveredAccount = verifyMessage(messages.basic, res.data)
        expect(account).toEqual(recoveredAccount)
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() => useSignMessageWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signMessage[1]()
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [Error: message is required],
          }
        `)
      })
    })
  })
})
