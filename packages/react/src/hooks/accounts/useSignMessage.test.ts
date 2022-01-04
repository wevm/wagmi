import { toUtf8Bytes, verifyMessage } from 'ethers/lib/utils'

import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import { Config, useSignMessage } from './useSignMessage'

const messages = {
  basic: 'The quick brown fox jumped over the lazy dogs.',
  bytes: toUtf8Bytes('The quick brown fox jumped over the lazy dogs.'),
}

const useSignMessageWithConnect = (config: { message?: Config } = {}) => {
  const connect = useConnect()
  const signMessage = useSignMessage(config.message)
  return { connect, signMessage } as const
}

describe('useSignMessage', () => {
  it('on mount', async () => {
    const { result } = renderHook(() =>
      useSignMessage({
        message: messages.basic,
      }),
    )
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
    expect(result.current[1]).toBeDefined()
  })

  describe('signMessage', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useSignMessageWithConnect({
          message: {
            message: messages.basic,
          },
        }),
      )

      expect(result.current.signMessage[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": undefined,
          "loading": false,
        }
      `)

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signMessage[1]()
        if (res.error) throw new Error('No signature')
        const account =
          await result.current.connect[0].data.connector?.getAccount()
        const recoveredAccount = verifyMessage(messages.basic, res.data)
        expect(account).toEqual(recoveredAccount)
      })

      expect(result.current.signMessage[0]).toMatchInlineSnapshot(`
        {
          "data": "0x28005a47b2d96159654ddc9e762b005f429a37b7790036a7817e3a6db60c634d538fe762c641f48da1c4aa3f8d001d2d4ca0c804a1a87f5b401d5b73b314fa221b",
          "error": undefined,
          "loading": false,
        }
      `)
      const account =
        await result.current.connect[0].data.connector?.getAccount()
      const recoveredAccount = verifyMessage(
        messages.basic,
        <any>result.current.signMessage[0]?.data,
      )
      expect(account).toEqual(recoveredAccount)
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
