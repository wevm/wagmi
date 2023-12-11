import { http } from 'viem'
import { expect, test } from 'vitest'
import { unstable_connector } from './connector.js'
import { fallback } from './fallback.js'

test('setup', () => {
  expect(
    fallback([
      unstable_connector({ type: 'injected' }),
      http('https://example.com'),
    ])({}),
  ).toMatchInlineSnapshot(`
    {
      "config": {
        "key": "fallback",
        "name": "Fallback",
        "request": [Function],
        "retryCount": 3,
        "retryDelay": 150,
        "timeout": undefined,
        "type": "fallback",
      },
      "request": [Function],
      "value": {
        "onResponse": [Function],
        "transports": [
          {
            "config": {
              "key": "connector",
              "name": "Connector",
              "request": [Function],
              "retryCount": 0,
              "retryDelay": 150,
              "timeout": undefined,
              "type": "connector",
            },
            "request": [Function],
            "value": undefined,
          },
          {
            "config": {
              "key": "http",
              "name": "HTTP JSON-RPC",
              "request": [Function],
              "retryCount": 0,
              "retryDelay": 150,
              "timeout": 10000,
              "type": "http",
            },
            "request": [Function],
            "value": {
              "fetchOptions": undefined,
              "url": "https://example.com",
            },
          },
        ],
      },
    }
  `)
})
