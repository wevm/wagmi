import { abi, address } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useInfiniteContractReads } from './useInfiniteContractReads.js'

test('default', async () => {
  const { result } = renderHook(() =>
    useInfiniteContractReads({
      cacheKey: 'foo',
      contracts(pageParam) {
        return [
          {
            address: address.shields,
            abi: abi.shields,
            functionName: 'tokenURI',
            args: [pageParam + 1n],
          },
          {
            address: address.shields,
            abi: abi.shields,
            functionName: 'tokenURI',
            args: [pageParam + 2n],
          },
          {
            address: address.shields,
            abi: abi.shields,
            functionName: 'tokenURI',
            args: [pageParam + 3n],
          },
        ]
      },
      query: {
        initialPageParam: 0n,
        getNextPageParam(_lastPage, _allPages, lastPageParam, _allPageParams) {
          return lastPageParam + 3n
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
})
