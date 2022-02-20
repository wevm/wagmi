import { wallets } from 'wagmi-testing'

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
            addressOrName: wallets.ethers1.address,
            skip: true,
          },
        }),
      )

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.balance[1]()
        expect(res).toMatchInlineSnapshot(`
          {
            "data": {
              "decimals": 18,
              "formatted": "0.193861344139087225",
              "symbol": "ETH",
              "unit": "ether",
              "value": {
                "hex": "0x02b0bbdd89170d79",
                "type": "BigNumber",
              },
            },
            "error": undefined,
          }
        `)
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
          addressOrName: wallets.ethers1.address,
        })
        expect(res).toMatchInlineSnapshot(`
          {
            "data": {
              "decimals": 18,
              "formatted": "0.193861344139087225",
              "symbol": "ETH",
              "unit": "ether",
              "value": {
                "hex": "0x02b0bbdd89170d79",
                "type": "BigNumber",
              },
            },
            "error": undefined,
          }
        `)
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
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [Error: address is required],
          }
        `)
      })
    })
  })
})
