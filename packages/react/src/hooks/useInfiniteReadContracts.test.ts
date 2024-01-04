import { abi, address } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useInfiniteReadContracts } from './useInfiniteReadContracts.js'

test(
  'default',
  async () => {
    const limit = 3

    const { result } = renderHook(() =>
      useInfiniteReadContracts({
        cacheKey: 'foo',
        contracts(pageParam) {
          return [...new Array(limit)].map(
            (_, i) =>
              ({
                address: address.shields,
                abi: abi.shields,
                functionName: 'tokenURI',
                args: [BigInt(pageParam + i + 1)],
              }) as const,
          )
        },
        query: {
          initialPageParam: 0,
          getNextPageParam(_lastPage, _allPages, lastPageParam) {
            return lastPageParam + limit
          },
          select(data) {
            const results = []
            for (const page of data.pages) {
              for (const response of page) {
                if (response.status === 'success') {
                  const decoded = atob(
                    response.result.replace(/(^.*base64,)/, ''),
                  )
                  const json = JSON.parse(decoded) as { name: string }
                  results.push(json.name)
                } else results.push('Error fetching shield')
              }
            }
            return results
          },
        },
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
    expect(result.current.data).toMatchInlineSnapshot(`
    [
      "Three Shields on Pink Perfect",
      "Three Shields on Sky Perfect",
      "Three Shields on Evergreen Perfect",
    ]
  `)

    await result.current.fetchNextPage()

    await waitFor(() => expect(result.current.hasNextPage).toBeTruthy())
    expect(result.current.data).toMatchInlineSnapshot(`
    [
      "Three Shields on Pink Perfect",
      "Three Shields on Sky Perfect",
      "Three Shields on Evergreen Perfect",
      "Three Shields on Hi-Vis Perfect",
      "Three Shields on Gray Perfect",
      "Everlasting: Tracery on Onyx and Pink Razor Bordure",
    ]
  `)

    await result.current.fetchNextPage()

    await waitFor(() => expect(result.current.hasNextPage).toBeTruthy())
    expect(result.current.data).toMatchInlineSnapshot(`
    [
      "Three Shields on Pink Perfect",
      "Three Shields on Sky Perfect",
      "Three Shields on Evergreen Perfect",
      "Three Shields on Hi-Vis Perfect",
      "Three Shields on Gray Perfect",
      "Everlasting: Tracery on Onyx and Pink Razor Bordure",
      "The Book of Shields on Pink Perfect",
      "Menacing: Necklace on Evergreen and Hi-Vis Chief Indented",
      "Secured: Telescope and Stars on Ultraviolet and Sky Doppler",
    ]
  `)
  },
  { timeout: 20_000 },
)
