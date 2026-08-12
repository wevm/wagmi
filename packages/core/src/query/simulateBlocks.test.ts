import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { simulateBlocksQueryOptions } from './simulateBlocks.js'

const name4bytes = '0x06fdde03'

test('default', () => {
  expect(
    simulateBlocksQueryOptions(config, {
      blocks: [
        {
          calls: [
            {
              data: name4bytes,
              to: '0x',
            },
          ],
        },
      ],
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "simulateBlocks",
        {
          "blocks": [
            {
              "calls": [
                {
                  "data": "0x06fdde03",
                  "to": "0x",
                },
              ],
            },
          ],
        },
      ],
      "structuralSharing": [Function],
    }
  `)
})

test('behavior: forwards parameters and strips query metadata', async () => {
  const action = vi.fn().mockResolvedValue([])
  const getClient = vi.fn(() => ({ simulateBlocks: action }))
  const config_ = { ...config, getClient } as unknown as typeof config
  const blocks = [{ calls: [{ data: name4bytes, to: '0x' }] }] as const
  const options = simulateBlocksQueryOptions(config_, {
    blocks,
    chainId: 1,
    scopeKey: 'test',
  })

  await options.queryFn({
    queryKey: options.queryKey,
    signal: new AbortSignal(),
    meta: undefined,
  })

  expect(getClient).toHaveBeenCalledWith({ chainId: 1 })
  expect(action).toHaveBeenCalledWith({ blocks })
})

test('behavior: requires blocks', async () => {
  const options = simulateBlocksQueryOptions(config)

  expect(options.enabled).toBe(false)
  await expect(
    options.queryFn({
      queryKey: options.queryKey,
      signal: new AbortSignal(),
      meta: undefined,
    }),
  ).rejects.toThrow('blocks is required')
})

test('behavior: respects query enabled', () => {
  expect(
    simulateBlocksQueryOptions(config, {
      blocks: [],
      query: { enabled: false },
    }).enabled,
  ).toBe(false)
})
