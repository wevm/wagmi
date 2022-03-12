import { getSigners, renderHook } from '../../../test'
import { useEnsLookup } from './useEnsLookup'

describe('useEnsLookup', () => {
  describe('address', () => {
    it('has ens', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsLookup({
          address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        }),
      )
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
      await waitForNextUpdate()
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": true,
          "isSuccess": false,
          "refetch": [Function],
          "status": "loading",
        }
      `)
      await waitForNextUpdate()
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": "awkweb.eth",
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })

    it('does not have ens', async () => {
      const address = await getSigners()[0].getAddress()
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsLookup({
          address,
        }),
      )
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
      await waitForNextUpdate()
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": true,
          "isSuccess": false,
          "refetch": [Function],
          "status": "loading",
        }
      `)
      await waitForNextUpdate()
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": null,
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })
  })
})
