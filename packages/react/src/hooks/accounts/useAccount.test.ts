import { actHook, renderHook } from '../../../test'
import { Config, useAccount } from './useAccount'
import { useConnect } from './useConnect'

const useAccountWithConnect = (config: { useAccountProps?: Config } = {}) => {
  const account = useAccount(config.useAccountProps)
  const connect = useConnect()
  return { account, connect } as const
}

describe('useAccount', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result } = renderHook(() => useAccount())
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
      const { result } = renderHook(() => useAccountWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)
      })

      const { data: { connector, ...restData } = {}, ...rest } =
        result.current.account[0]
      expect(connector).toBeDefined()
      expect({ data: restData, ...rest }).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1",
            "balance": undefined,
            "ens": undefined,
          },
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('fetches balance', async () => {
      const { result } = renderHook(() =>
        useAccountWithConnect({ useAccountProps: { fetchBalance: true } }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)
      })

      const { data: { connector, ...restData } = {}, ...rest } =
        result.current.account[0]
      expect(connector).toBeDefined()
      expect({ data: restData, ...rest }).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1",
            "balance": undefined,
            "ens": undefined,
          },
          "error": [Error: missing response (requestBody="{\\"method\\":\\"eth_getBalance\\",\\"params\\":[\\"0x71cb05ee1b1f506ff321da3dac38f25c0c9ce6e1\\",\\"latest\\"],\\"id\\":42,\\"jsonrpc\\":\\"2.0\\"}", requestMethod="POST", serverError={}, url="https://mainnet.infura.io/v3/mockApiKey", code=SERVER_ERROR, version=web/5.5.1)],
          "loading": false,
        }
      `)
    })

    it('fetches ens', async () => {
      const { result } = renderHook(() =>
        useAccountWithConnect({ useAccountProps: { fetchEns: true } }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)
      })

      const { data: { connector, ...restData } = {}, ...rest } =
        result.current.account[0]
      expect(connector).toBeDefined()
      expect({ data: restData, ...rest }).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1",
            "balance": undefined,
            "ens": undefined,
          },
          "error": undefined,
          "loading": false,
        }
      `)
    })
  })

  it('disconnects', async () => {
    const { result } = renderHook(() => useAccountWithConnect())

    await actHook(async () => {
      const mockConnector = result.current.connect[0].data.connectors[0]
      await result.current.connect[1](mockConnector)
    })

    const { data: { connector, ...restData } = {}, ...rest } =
      result.current.account[0]
    expect(connector).toBeDefined()
    expect({ data: restData, ...rest }).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1",
            "balance": undefined,
            "ens": undefined,
          },
          "error": undefined,
          "loading": false,
        }
      `)

    actHook(() => {
      result.current.account[1]()
    })

    expect(result.current.account[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })
})
