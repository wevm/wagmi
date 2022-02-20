import { wallets } from 'wagmi-testing'

import { actHook, renderHook } from '../../../test'
import { useEnsResolver } from './useEnsResolver'

describe('useEnsResolver', () => {
  describe('on mount', () => {
    it('has resolver', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsResolver({
          name: wallets.ethers3.ensName,
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
      const { data, ...rest } = result.current[0]
      expect(data?.name).toEqual(wallets.ethers3.ensName)
      expect(rest).toMatchInlineSnapshot(`
        {
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('does not have resolver', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsResolver({
          name: 'foobar.eth',
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
  })

  it('skip', async () => {
    const { result } = renderHook(() => useEnsResolver({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  describe('getEnsResolver', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useEnsResolver({
          name: wallets.ethers3.ensName,
          skip: true,
        }),
      )
      await actHook(async () => {
        const res = await result.current[1]()
        expect(res?.data?.name).toEqual(wallets.ethers3.ensName)
      })
    })

    it('uses params', async () => {
      const { result } = renderHook(() => useEnsResolver({ skip: true }))
      await actHook(async () => {
        const res = await result.current[1]({
          name: wallets.ethers3.ensName,
        })
        expect(res?.data?.name).toEqual(wallets.ethers3.ensName)
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() => useEnsResolver({ skip: true }))
      await actHook(async () => {
        const res = await result.current[1]()
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [Error: name is required],
          }
        `)
      })
    })
  })
})
