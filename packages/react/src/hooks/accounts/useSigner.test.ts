import { Signer } from 'ethers'

import { actHook, renderHook } from '../../../test'
import { useSigner } from './useSigner'
import { useConnect } from './useConnect'

const useSignerWithConnect = () => {
  const signer = useSigner()
  const connect = useConnect()
  return { signer, connect } as const
}

describe('useSigner', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useSigner())
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
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('connected', async () => {
      const { result } = renderHook(() => useSignerWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)
      })

      const { data, loading, error } = result.current.signer[0]
      expect(data).toBeInstanceOf(Signer)
      expect(loading).toBe(false)
      expect(error).toBeUndefined()
    })
  })

  it('skip', async () => {
    const { result } = renderHook(() => useSigner({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  describe('getSigner', () => {
    it('connected', async () => {
      const { result } = renderHook(() => useSignerWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)
        const res = await result.current.signer[1]()
        expect(res).toBeInstanceOf(Signer)
      })
    })

    it('not connected', async () => {
      const { result } = renderHook(() => useSigner())

      await actHook(async () => {
        const res = await result.current[1]()
        expect(res).toMatchInlineSnapshot(`undefined`)
      })
    })
  })
})
