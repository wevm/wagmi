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

test('behavior: forwards parameters', async () => {
  const action = vi.fn().mockResolvedValue({})
  const getClient = vi.fn(() => ({ simulateCalls: action }))
  const config_ = { ...config, getClient } as unknown as typeof config
  const calls = [{ data: name4bytes, to: '0x' }] as const
  const options = simulateCallsQueryOptions(config_, {
    account: '0x0000000000000000000000000000000000000001',
    calls,
    chainId: 1,
  })

  await options.queryFn({
    queryKey: options.queryKey,
    signal: new AbortSignal(),
    meta: undefined,
  })

  expect(getClient).toHaveBeenCalledWith({ chainId: 1 })
  expect(action).toHaveBeenCalledWith({
    account: '0x0000000000000000000000000000000000000001',
    calls,
  })
})

test('behavior: required properties', async () => {
  const missingCalls = simulateCallsQueryOptions(config)
  expect(missingCalls.enabled).toBe(false)
  await expect(
    missingCalls.queryFn({
      queryKey: missingCalls.queryKey,
      signal: new AbortSignal(),
      meta: undefined,
    }),
  ).rejects.toThrow('calls is required')

  const missingAccount = simulateCallsQueryOptions(config, {
    calls: [],
    traceAssetChanges: true,
  })
  expect(missingAccount.enabled).toBe(false)
  await expect(
    missingAccount.queryFn({
      queryKey: missingAccount.queryKey,
      signal: new AbortSignal(),
      meta: undefined,
    }),
  ).rejects.toThrow(
    'account or connector is required when traceAssetChanges is true',
  )
})

test('behavior: enable gating', () => {
  const calls = [{ data: name4bytes, to: '0x' }] as const
  expect(simulateCallsQueryOptions(config, { calls }).enabled).toBe(true)
  expect(
    simulateCallsQueryOptions(config, {
      calls,
      query: { enabled: false },
    }).enabled,
  ).toBe(false)
  expect(
    simulateCallsQueryOptions(config, {
      calls,
      connector: config.connectors[0],
      traceAssetChanges: true,
    }).enabled,
  ).toBe(true)
})
