import { addressLookup } from 'wagmi-private/testing'

import { actHook, renderHook } from '../../../test'
import { useEnsAvatar } from './useEnsAvatar'

describe('useEnsAvatar', () => {
  describe('on mount', () => {
    it('has ens', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsAvatar({
          addressOrName: addressLookup.ensNameWithAvatar,
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
          addressOrName: addressLookup.ensNameWithoutAvatar,
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

  it('lookupAddress', async () => {
    const { result } = renderHook(() => useEnsAvatar({ skip: true }))
    await actHook(async () => {
      const res = await result.current[1]({
        addressOrName: addressLookup.ensNameWithAvatar,
      })
      expect(res).toMatchInlineSnapshot(
        `"https://pbs.twimg.com/profile_images/1462291760135258115/tJ9K8K5v_400x400.jpg"`,
      )
    })
  })
})
