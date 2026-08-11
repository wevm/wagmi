import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { simulateCallsQueryOptions } from './simulateCalls.js'

const name4bytes = '0x06fdde03'

test('default', () => {
  expect(
    simulateCallsQueryOptions(config, {
      calls: [
        {
          data: name4bytes,
          to: '0x',
        },
      ],
      traceAssetChanges: true,
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "simulateCalls",
        {
          "calls": [
            {
              "data": "0x06fdde03",
              "to": "0x",
            },
          ],
          "traceAssetChanges": true,
        },
      ],
      "structuralSharing": [Function],
    }
  `)
})

test('behavior: strips query metadata', async () => {
  const simulateCalls = vi.fn().mockResolvedValue({})
  const config_ = {
    ...config,
    getClient: () => ({ simulateCalls }),
  } as unknown as typeof config
  const options = simulateCallsQueryOptions(config_, {
    calls: [
      {
        data: name4bytes,
        to: '0x',
      },
    ],
  })

  await options.queryFn({
    queryKey: [
      'simulateCalls',
      {
        ...options.queryKey[1],
        connectorUid: 'mock',
        scopeKey: 'test',
      },
    ],
    signal: new AbortSignal(),
    meta: undefined,
  })

  expect(simulateCalls).toHaveBeenCalledWith({
    calls: [
      {
        data: name4bytes,
        to: '0x',
      },
    ],
  })
})
