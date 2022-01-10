import { Wallet } from 'ethers'

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
      await actHook(async () => {
        const { result } = renderHook(() => useSigner())

        expect(result.current[0]).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": undefined,
            "loading": false,
          }
        `)
        expect(result.current[1]).toBeDefined()
      })
    })

    it('connected', async () => {
      await actHook(async () => {
        const { result } = renderHook(() => useSignerWithConnect())

        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const { data, loading, error } = result.current.signer[0]

        expect(data).toBeInstanceOf(Wallet)
        expect(loading).toBe(false)
        expect(error).toBeUndefined()
      })
    })

    it('gets signer', async () => {
      await actHook(async () => {
        const { result } = renderHook(() => useSignerWithConnect())

        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)

        const res = await result.current.signer[1]()

        expect(res).toBeInstanceOf(Wallet)
      })
    })
  })
})
