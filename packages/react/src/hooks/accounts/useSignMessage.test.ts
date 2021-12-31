import { verifyMessage } from 'ethers/lib/utils'
import { messageLookup } from 'wagmi-testing'

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
        const recovered = verifyMessage(messageLookup.basic, res)
        expect(account).toEqual(recovered)
      })

      expect(result.current.signMessage[0]).toMatchInlineSnapshot(`
        {
          "data": "0x223300220dc60762ff5bda6168f3810e5f01ed354ae0bafc129bbe6c425e9d3d4f3da02d19239765a3fe4b383d6f76e605643844f06faf163fabe38babee46e01b",
          "error": undefined,
          "loading": false,
        }
      `)
      const account =
        await result.current.connect[0].data.connector?.getAccount()
      const recovered = verifyMessage(
        messageLookup.basic,
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
        const recovered = verifyMessage(messageLookup.basic, res)
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
