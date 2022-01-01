import { wallets } from 'wagmi-testing'

import { actHook, renderHook } from '../../../test'
import { useEnsAvatar } from './useEnsAvatar'

describe('useEnsAvatar', () => {
  describe('on mount', () => {
    it('has ens', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsAvatar({
          addressOrName: wallets.ethers3.ensName,
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
          "data": "https://pbs.twimg.com/profile_images/1462291760135258115/tJ9K8K5v_400x400.jpg",
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('does not have avatar', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsAvatar({
          addressOrName: wallets.ethers1.address,
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
    const { result } = renderHook(() => useEnsAvatar({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  describe('getEnsAvatar', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useEnsAvatar({
          addressOrName: wallets.ethers3.ensName,
          skip: true,
        }),
      )
      await actHook(async () => {
        const res = await result.current[1]()
        expect(res).toMatchInlineSnapshot(
          `"https://pbs.twimg.com/profile_images/1462291760135258115/tJ9K8K5v_400x400.jpg"`,
        )
      })
    })

    it('uses params', async () => {
      const { result } = renderHook(() => useEnsAvatar({ skip: true }))
      await actHook(async () => {
        const res = await result.current[1]({
          addressOrName: wallets.ethers3.ensName,
        })
        expect(res).toMatchInlineSnapshot(
          `"https://pbs.twimg.com/profile_images/1462291760135258115/tJ9K8K5v_400x400.jpg"`,
        )
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() => useEnsAvatar({ skip: true }))
      await actHook(async () => {
        const res = await result.current[1]()
        expect(res).toMatchInlineSnapshot(`[Error: addressOrName is required]`)
      })
    })
  })
})
