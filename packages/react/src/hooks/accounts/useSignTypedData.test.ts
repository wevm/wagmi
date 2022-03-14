import { verifyTypedData } from 'ethers/lib/utils'

import { actHook, renderHook } from '../../../test'
import { useConnect } from './useConnect'
import { Config, useSignTypedData } from './useSignTypedData'

// All properties on a domain are optional
const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
}

// The named list of all type definitions
const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
}

// The data to sign
const value = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
}

const useSignTypedDataWithConnect = (config: { typedData?: Config } = {}) => {
  const connect = useConnect()
  const signTypedData = useSignTypedData(config.typedData)
  return { connect, signTypedData } as const
}

describe('useSignTypedData', () => {
  it('on mount', async () => {
    const { result } = renderHook(() =>
      useSignTypedData({
        domain,
        types,
        value,
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

  describe('signTypedData', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useSignTypedDataWithConnect({
          typedData: { domain, types, value },
        }),
      )

      expect(result.current.signTypedData[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": undefined,
          "loading": false,
        }
      `)

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signTypedData[1]()
        if (res.error) throw new Error('No signature')
        const account =
          await result.current.connect[0].data.connector?.getAccount()
        const recoveredAccount = verifyTypedData(domain, types, value, res.data)
        expect(account).toEqual(recoveredAccount)
      })

      expect(result.current.signTypedData[0]).toMatchInlineSnapshot(`
        {
          "data": "0x8324a2818a0960e6cd037a93eddd38371c74c5299a76110ae72a7084295464ae48f6ea5388440723bd26c3cef91878b3aa95d93d390ce542817d3fbdbbc240161b",
          "error": undefined,
          "loading": false,
        }
      `)
      const account =
        await result.current.connect[0].data.connector?.getAccount()
      const recoveredAccount = verifyTypedData(
        domain,
        types,
        value,
        <any>result.current.signTypedData[0]?.data,
      )
      expect(account).toEqual(recoveredAccount)
    })

    it('uses params', async () => {
      const { result } = renderHook(() => useSignTypedDataWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signTypedData[1]({
          domain,
          types,
          value,
        })
        if (res.error) throw new Error('No signature')
        const account =
          await result.current.connect[0].data.connector?.getAccount()
        const recoveredAccount = verifyTypedData(domain, types, value, res.data)
        expect(account).toEqual(recoveredAccount)
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() => useSignTypedDataWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signTypedData[1]()
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [Error: domain is required],
          }
        `)
      })
    })
  })
})
