import { verifyNormalizedMessage } from 'wagmi-private'
import { messageLookup } from 'wagmi-private/testing'

import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import { Config, useSignMessage } from './useSignMessage'

const useSignMessageWithConnect = (
  config: { useSignMessageProps?: Config } = {},
) => {
  const signMessage = useSignMessage(config.useSignMessageProps)
  const connect = useConnect()
  return { connect, signMessage } as const
}

describe('useSignMessage', () => {
  it('on mount', async () => {
    const { result } = renderHook(() =>
      useSignMessage({
        message: messageLookup.basic,
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
          useSignMessageProps: {
            message: messageLookup.basic,
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
        if (typeof res !== 'string') throw new Error('No signature')
        const recovered = verifyNormalizedMessage(messageLookup.basic, res)
        const account =
          await result.current.connect[0].data.connector?.getAccount()
        expect(account).toEqual(recovered)
      })

      expect(result.current.signMessage[0]).toMatchInlineSnapshot(`
        {
          "data": "0x8a34db89a19ddef2fa8c5ee1922437598724e92c41dd5ecf2440b94ae8f6aaad31f51d078910e438ee88952ae2b1429a6b9770d8d85ce9eb4f8e19c84ee5bde01b",
          "error": undefined,
          "loading": false,
        }
      `)
      const recovered = verifyNormalizedMessage(
        messageLookup.basic,
        <any>result.current.signMessage[0]?.data,
      )
      const account =
        await result.current.connect[0].data.connector?.getAccount()
      expect(account).toEqual(recovered)
    })

    it('uses params', async () => {
      const { result } = renderHook(() => useSignMessageWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signMessage[1]({
          message: messageLookup.basic,
        })
        if (typeof res !== 'string') throw new Error('No signature')
        const recovered = verifyNormalizedMessage(messageLookup.basic, res)
        const account =
          await result.current.connect[0].data.connector?.getAccount()
        expect(account).toEqual(recovered)
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() => useSignMessageWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signMessage[1]()
        expect(res).toMatchInlineSnapshot(`[Error: message is required]`)
      })
    })
  })
})
