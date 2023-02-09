import { describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test'
import { useNFT } from './useNFT'

const baycNFTAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'
const uniNFTAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

describe('useNFT', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useNFT({
        address: baycNFTAddress,
        id: '1',
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
          "name": "BoredApeYachtClub",
          "symbol": "BAYC",
          "totalSupply": {
            "formatted": "1000",
            "value": {
              "hex": "0x3e8",
              "type": "BigNumber",
            },
          },
          "uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
        },
        "error": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetched": true,
        "isFetchedAfterMount": true,
        "isFetching": false,
        "isIdle": false,
        "isLoading": false,
        "isRefetching": false,
        "isSuccess": true,
        "refetch": [Function],
        "status": "success",
      }
    `)
  })

  describe('configuration', () => {
    describe('address', () => {
      it('has nft', async () => {
        const { result, waitFor } = renderHook(() =>
          useNFT({
            address: baycNFTAddress,
            id: '1',
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": {
              "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
              "name": "BoredApeYachtClub",
              "symbol": "BAYC",
              "totalSupply": {
                "formatted": "1000",
                "value": {
                  "hex": "0x3e8",
                  "type": "BigNumber",
                },
              },
              "uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
            },
            "error": null,
            "fetchStatus": "idle",
            "isError": false,
            "isFetched": true,
            "isFetchedAfterMount": true,
            "isFetching": false,
            "isIdle": false,
            "isLoading": false,
            "isRefetching": false,
            "isSuccess": true,
            "refetch": [Function],
            "status": "success",
          }
        `)
      })

      it('bogus nft', async () => {
        const { result, waitFor } = renderHook(() =>
          useNFT({
            address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
            id: '1',
          }),
        )

        await waitFor(() => expect(result.current.isError).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [ContractMethodNoResultError: Contract read returned an empty response. This could be due to any of the following:
          - The contract does not have the function "tokenURI",
          - The parameters passed to the contract function may be invalid, or
          - The address is not a contract.

          Config:
          {
            "address": "0xa0cf798816d4b9b9866b5330eea46a18382f251e",
            "abi": "...",
            "functionName": "tokenURI",
            "chainId": 1
          }],
            "fetchStatus": "idle",
            "isError": true,
            "isFetched": true,
            "isFetchedAfterMount": true,
            "isFetching": false,
            "isIdle": false,
            "isLoading": false,
            "isRefetching": false,
            "isSuccess": false,
            "refetch": [Function],
            "status": "error",
          }
        `)
      })
    })

    it('scopeKey', async () => {
      const { result, waitFor } = renderHook(() => {
        return {
          nft: useNFT({
            address: baycNFTAddress,
            id: '1',
          }),
          nftwithoutScopeKey: useNFT({
            address: baycNFTAddress,
            id: '1',
            enabled: false,
          }),
          nftwithScopeKey: useNFT({
            address: baycNFTAddress,
            id: '1',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() => expect(result.current.nft.isSuccess).toBeTruthy())
      await waitFor(() =>
        expect(result.current.nftwithoutScopeKey.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.nftwithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useNFT({ address: baycNFTAddress, chainId: 1, id: '1' }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
            "name": "BoredApeYachtClub",
            "symbol": "BAYC",
            "totalSupply": {
              "formatted": "1000",
              "value": {
                "hex": "0x3e8",
                "type": "BigNumber",
              },
            },
            "uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
          },
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })

    it('enabled', async () => {
      const { result, waitFor } = renderHook(() => useNFT({ enabled: false }))

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })
  })

  describe('return value', () => {
    it('refetch', async () => {
      const { result } = renderHook(() =>
        useNFT({ address: uniNFTAddress, id: '1', enabled: false }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(`
          {
            "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
            "name": "BoredApeYachtClub",
            "symbol": "BAYC",
            "totalSupply": {
              "formatted": "1000",
              "value": {
                "hex": "0x3e8",
                "type": "BigNumber",
              },
            },
            "uri": "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1",
          }
        `)
      })
    })
  })

  describe('behavior', () => {
    it('does nothing when `address` and `id` are missing', async () => {
      const { result, waitFor } = renderHook(() => useNFT())

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })

    it('does nothing when `address` is missing', async () => {
      const { result, waitFor } = renderHook(() => useNFT({ id: '1' }))

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })

    it('does nothing when `id` is missing', async () => {
      const { result, waitFor } = renderHook(() =>
        useNFT({ address: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72' }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })
  })
})
