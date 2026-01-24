import { abi, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getContractEventsQueryOptions } from './getContractEvents.js'

test('default', () => {
  expect(
    getContractEventsQueryOptions(config, {
      address: '0x',
      abi: abi.erc20,
      eventName: 'Approval',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "getContractEvents",
        {
          "address": "0x",
          "eventName": "Approval",
        },
      ],
      "structuralSharing": [Function],
    }
  `)
})

test('enabled', () => {
  expect(
    getContractEventsQueryOptions(config, {
      address: '0x',
      eventName: 'Approval',
    }).enabled,
  ).toBe(false)
})
