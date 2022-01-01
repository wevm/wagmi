import { contracts } from 'wagmi-testing'

import { actHook, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import { Config, useToken } from './useToken'

const useTokenWithConnect = (config: { token?: Config } = {}) => {
  const connect = useConnect()
  const token = useToken(config.token)
  return { connect, token } as const
}

describe('useToken', () => {
  describe('on mount', () => {
    it('has token', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useToken({
          address: contracts.uniToken,
        }),
      )

      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": undefined,
          "loading": true,
        }
      `)
      await waitForNextUpdate()
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "symbol": "UNI",
            "totalSupply": {
              "formatted": "1000000000.0",
              "value": {
                "hex": "0x033b2e3c9fd0803ce8000000",
                "type": "BigNumber",
              },
            },
          },
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('bogus token', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useToken({
          address: contracts.bogusToken,
        }),
      )

      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": undefined,
          "loading": true,
        }
      `)
      await waitForNextUpdate()
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": [Error: call revert exception (method="symbol()", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.5.0)],
          "loading": false,
        }
      `)
    })
  })

  it('skip', async () => {
    const { result } = renderHook(() => useToken({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  describe('watchAsset', () => {
    it('succeeds', async () => {
      const { result } = renderHook(() =>
        useTokenWithConnect({ token: { skip: true } }),
      )
      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.token[1]({
          address: contracts.uniToken,
          decimals: 18,
          symbol: 'UNI',
        })
        expect(res).toMatchInlineSnapshot(`true`)
      })
    })

    it('not connected', async () => {
      const { result } = renderHook(() => useToken({ skip: true }))
      await actHook(async () => {
        const res = await result.current[1]({
          address: contracts.uniToken,
          decimals: 18,
          symbol: 'UNI',
        })
        expect(res).toMatchInlineSnapshot(`false`)
      })
    })
  })

  describe('getToken', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useToken({ address: contracts.uniToken, skip: true }),
      )

      await actHook(async () => {
        const res = await result.current[2]()
        expect(res).toMatchInlineSnapshot(`
          {
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "symbol": "UNI",
            "totalSupply": {
              "formatted": "1000000000.0",
              "value": {
                "hex": "0x033b2e3c9fd0803ce8000000",
                "type": "BigNumber",
              },
            },
          }
        `)
      })
    })

    it('uses params', async () => {
      const { result } = renderHook(() => useToken({ skip: true }))

      await actHook(async () => {
        const res = await result.current[2]({
          address: contracts.uniToken,
        })
        expect(res).toMatchInlineSnapshot(`
          {
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "symbol": "UNI",
            "totalSupply": {
              "formatted": "1000000000.0",
              "value": {
                "hex": "0x033b2e3c9fd0803ce8000000",
                "type": "BigNumber",
              },
            },
          }
        `)
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() => useToken({ skip: true }))
      await actHook(async () => {
        const res = await result.current[2]()
        expect(res).toMatchInlineSnapshot(`[Error: address is required]`)
      })
    })
  })
})
