import { expect, test } from 'vitest'
import { unstable_connector } from './connector.js'

test('setup', () => {
  expect(unstable_connector({ type: 'injected' })({})).toMatchInlineSnapshot(`
    {
      "config": {
        "key": "connector",
        "name": "Connector",
        "request": [Function],
        "retryCount": 3,
        "retryDelay": 150,
        "timeout": undefined,
        "type": "connector",
      },
      "request": [Function],
      "value": undefined,
    }
  `)
})
