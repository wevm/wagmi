import { addressLookup } from 'wagmi-private/testing'

import { actHook, renderHook } from '../../../test'
import { useToken } from './useToken'

describe('useToken', () => {
  it('inits', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useToken({
        address: addressLookup.uniToken,
      }),
    )
    expect(result.current[1]).toBeDefined()
    expect(result.current[2]).toBeDefined()

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
        address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      }),
    )
    expect(result.current[1]).toBeDefined()
    expect(result.current[2]).toBeDefined()

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
        "error": [Error: missing revert data in call exception (error={"reason":"missing response","code":"SERVER_ERROR","requestBody":"{\\"method\\":\\"eth_call\\",\\"params\\":[{\\"to\\":\\"0xa0cf798816d4b9b9866b5330eea46a18382f251e\\",\\"data\\":\\"0x313ce567\\"},\\"latest\\"],\\"id\\":42,\\"jsonrpc\\":\\"2.0\\"}","requestMethod":"POST","serverError":{},"url":"https://mainnet.infura.io/v3/mockApiKey"}, data="0x", code=CALL_EXCEPTION, version=providers/5.5.1)],
        "loading": false,
      }
    `)
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

  it('watchToken', async () => {
    const { result } = renderHook(() => useToken({ skip: true }))
    await actHook(async () => {
      await result.current[1]({
        address: addressLookup.uniToken,
        decimals: 18,
        symbol: 'UNI',
      })
      expect(true).toEqual(true)
    })
  })

  it('getToken', async () => {
    const { result } = renderHook(() => useToken({ skip: true }))

    await actHook(async () => {
      const res = await result.current[2]({
        address: addressLookup.uniToken,
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
})
