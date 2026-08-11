import { abi, address, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useInfiniteReadContracts } from './useInfiniteReadContracts.js'

test('default', async () => {
  const limit = 3

  const { result } = renderPrimitive(() =>
    useInfiniteReadContracts(() => ({
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
    })),
  )
  await wait(0)

  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })
  expect(result.data).toMatchInlineSnapshot(`
    [
      "Three Shields on Pink Perfect",
      "Three Shields on Sky Perfect",
      "Three Shields on Evergreen Perfect",
    ]
  `)
}, 20_000)
