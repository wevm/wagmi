import { addressLookup } from 'wagmi-private/testing'

import { actHook, renderHook } from '../../../test'
import { useEnsLookup } from './useEnsLookup'

describe('useEnsLookup', () => {
  describe('on mount', () => {
    it('has ens', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsLookup({
          address: addressLookup.addressWithEns,
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
                "data": "meagher.eth",
                "error": undefined,
                "loading": false,
              }
          `)
    })

    it('does not have ens', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsLookup({
          address: addressLookup.addressWithoutEns,
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
          "data": null,
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('has error', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsLookup({
          address: 'meagher.eth',
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
          "error": [Error: invalid address (argument="address", value="meagher.eth", code=INVALID_ARGUMENT, version=address/5.5.0)],
          "loading": false,
        }
      `)
    })
  })

  it('skip', async () => {
    const { result } = renderHook(() => useEnsLookup({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  it('lookupAddress', async () => {
    const { result } = renderHook(() => useEnsLookup({ skip: true }))
    await actHook(async () => {
      const res = await result.current[1]({
        address: addressLookup.addressWithEns,
      })
      expect(res).toMatchInlineSnapshot(`"meagher.eth"`)
    })
  })
})
