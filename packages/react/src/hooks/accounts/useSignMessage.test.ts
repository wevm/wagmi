import { verifyMessage } from 'ethers/lib/utils'
import { normalizeMessage } from 'wagmi-private'
import { messageLookup } from 'wagmi-private/testing'

import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import { Config, useSignMessage } from './useSignMessage'

const useSignMessageWithConnect = (config: { message?: Config } = {}) => {
  const connect = useConnect()
  const signMessage = useSignMessage(config.message)
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
          message: {
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
        const account =
          await result.current.connect[0].data.connector?.getAccount()
        const recovered = verifyMessage(
          normalizeMessage(messageLookup.basic),
          res,
        )
        expect(account).toEqual(recovered)
      })

      expect(result.current.signMessage[0]).toMatchInlineSnapshot(`
        {
          "data": "0xb900ae5a07c093e7e5f66ff9d30f336023aa30c1b5cfcb64d8e7e2bf4d75bac9153c8092afcbf7493d4ef267efe9d01d36ede8905336dddf8d21b5ecd8d4a6381b",
          "error": undefined,
          "loading": false,
        }
      `)
      const account =
        await result.current.connect[0].data.connector?.getAccount()
      const recovered = verifyMessage(
        normalizeMessage(messageLookup.basic),
        <any>result.current.signMessage[0]?.data,
      )
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
        const account =
          await result.current.connect[0].data.connector?.getAccount()
        const recovered = verifyMessage(
          normalizeMessage(messageLookup.basic),
          res,
        )
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
