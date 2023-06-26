import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { disconnectMutationOptions } from './disconnect.js'

const connector = config.connectors[0]!

test('default', () => {
  expect(disconnectMutationOptions(config)).toMatchInlineSnapshot(`
      {
        "mutationFn": [Function],
        "mutationKey": [
          "disconnect",
          {
            "connector": undefined,
          },
        ],
      }
    `)
})

test('parameters: connector', () => {
  expect(disconnectMutationOptions(config, { connector })).toMatchObject(
    expect.objectContaining({
      mutationFn: expect.any(Function),
      mutationKey: [
        'disconnect',
        expect.objectContaining({
          connector: expect.any(Object),
        }),
      ],
    }),
  )
})
