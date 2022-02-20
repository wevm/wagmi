import { wallets } from 'wagmi-testing'

import { actHook, renderHook } from '../../../test'
import { useEnsLookup } from './useEnsLookup'

describe('useEnsLookup', () => {
  describe('on mount', () => {
    it('has ens', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsLookup({
          address: wallets.ethers3.address,
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
          address: wallets.ethers2.address,
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

  describe('lookupAddress', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useEnsLookup({
          address: wallets.ethers3.address,
          skip: true,
        }),
      )
      await actHook(async () => {
        const res = await result.current[1]()
        expect(res).toMatchInlineSnapshot(`
          {
            "data": "meagher.eth",
            "error": undefined,
          }
        `)
      })
    })

    it('uses params', async () => {
      const { result } = renderHook(() => useEnsLookup({ skip: true }))
      await actHook(async () => {
        const res = await result.current[1]({
          address: wallets.ethers3.address,
        })
        expect(res).toMatchInlineSnapshot(`
          {
            "data": "meagher.eth",
            "error": undefined,
          }
        `)
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() => useEnsLookup({ skip: true }))
      await actHook(async () => {
        const res = await result.current[1]()
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
