import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { reconnectMutationOptions } from './reconnect.js'

const connector = config.connectors[0]!

test('default', () => {
  expect(reconnectMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "getVariables": [Function],
      "mutationFn": [Function],
      "mutationKey": [
        "reconnect",
        {},
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
