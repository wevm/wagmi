import { wallets } from 'wagmi-testing'

import { actHook, renderHook } from '../../../test'
import { useEnsResolveName } from './useEnsResolveName'

describe('useEnsResolveName', () => {
  describe('on mount', () => {
    it('has ens', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsResolveName({
          name: wallets.ethers3.name,
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
          "data": "0xa0cf798816d4b9b9866b5330eea46a18382f251e",
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('does not have ens', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsResolveName({
          name: wallets.ethers3.name,
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
          "data": "0xa0cf798816d4b9b9866b5330eea46a18382f251e",
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('has error', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useEnsResolveName({
          name: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
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
          "error": [Error: invalid name (argument="name", value="0xa0cf798816d4b9b9866b5330eea46a18382f251e", code=INVALID_ARGUMENT, version=name/5.5.0)],
          "loading": false,
        }
      `)
    })
  })

  it('skip', async () => {
    const { result } = renderHook(() => useEnsResolveName({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  describe('resolveName', () => {
    it('uses config', async () => {
      const { result } = renderHook(() =>
        useEnsResolveName({
          name: wallets.ethers3.name,
          skip: true,
        }),
      )
      await actHook(async () => {
        const res = await result.current[1]()
        expect(res).toMatchInlineSnapshot(`
          {
            "data": "0xa0cf798816d4b9b9866b5330eea46a18382f251e",
            "error": undefined,
          }
        `)
      })
    })

    it('uses params', async () => {
      const { result } = renderHook(() => useEnsResolveName({ skip: true }))
      await actHook(async () => {
        const res = await result.current[1]({
          name: wallets.ethers3.name,
        })
        expect(res).toMatchInlineSnapshot(`
          {
            "data": "0xa0cf798816d4b9b9866b5330eea46a18382f251e",
            "error": undefined,
          }
        `)
      })
    })

    it('has error', async () => {
      const { result } = renderHook(() => useEnsResolveName({ skip: true }))
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
