import { addressLookup } from 'wagmi-private/testing'

import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import { Config, useBalance } from './useBalance'

const useBalanceWithConnect = (config: { balance?: Config } = {}) => {
  const balance = useBalance(config.balance)
  const connect = useConnect()
  return { balance, connect } as const
}

describe('useBalance', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result } = renderHook(() => useBalance())
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": undefined,
          "loading": false,
        }
      `)
      expect(result.current[1]).toBeDefined()
    })

    it('connected', async () => {
      const { result } = renderHook(() => useBalanceWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)
      })

      expect(result.current.balance[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": undefined,
          "loading": false,
        }
      `)
    })
  })

  it('skip', async () => {
    const { result } = renderHook(() => useBalance({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  describe('getBalance', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useBalanceWithConnect({
          balance: {
            address: addressLookup.addressWithEns,
            skip: true,
          },
        }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.balance[1]()
        expect(res).toMatchInlineSnapshot(
          `[Error: missing response (requestBody="{\\"method\\":\\"eth_getBalance\\",\\"params\\":[\\"0xa0cf798816d4b9b9866b5330eea46a18382f251e\\",\\"latest\\"],\\"id\\":42,\\"jsonrpc\\":\\"2.0\\"}", requestMethod="POST", serverError={}, url="https://mainnet.infura.io/v3/mockApiKey", code=SERVER_ERROR, version=web/5.5.1)]`,
        )
      })
    })

    it('uses params', async () => {
      const { result } = renderHook(() =>
        useBalanceWithConnect({ balance: { skip: true } }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.balance[1]({
          address: addressLookup.addressWithEns,
        })
        expect(res).toMatchInlineSnapshot(
          `[Error: missing response (requestBody="{\\"method\\":\\"eth_getBalance\\",\\"params\\":[\\"0xa0cf798816d4b9b9866b5330eea46a18382f251e\\",\\"latest\\"],\\"id\\":42,\\"jsonrpc\\":\\"2.0\\"}", requestMethod="POST", serverError={}, url="https://mainnet.infura.io/v3/mockApiKey", code=SERVER_ERROR, version=web/5.5.1)]`,
        )
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() =>
        useBalanceWithConnect({ balance: { skip: true } }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.balance[1]()
        expect(res).toMatchInlineSnapshot(`[Error: address is required]`)
      })
    })
  })
})
