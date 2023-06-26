import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { reconnectMutationOptions } from './reconnect.js'

const connector = config.connectors[0]!

test('default', () => {
  expect(reconnectMutationOptions(config)).toMatchInlineSnapshot(`
      {
        "mutationFn": [Function],
        "mutationKey": [
          "reconnect",
          {
            "connectors": undefined,
          },
        ],
      }
    `)
})

test('parameters: connectors', () => {
  expect(
    reconnectMutationOptions(config, { connectors: [connector] }),
  ).toMatchObject(
    expect.objectContaining({
      mutationFn: expect.any(Function),
      mutationKey: [
        'reconnect',
        expect.objectContaining({
          connectors: expect.arrayContaining([expect.any(Object)]),
        }),
      ],
    }),
  )
})
