import { expect, test } from 'vitest'

import * as react from './index.js'

test('exports', () => {
  expect(react).toMatchInlineSnapshot(`
    {
      "WagmiConfig": [Function],
      "WagmiContext": {
        "$$typeof": Symbol(react.context),
        "Consumer": {
          "$$typeof": Symbol(react.context),
          "_context": [Circular],
        },
        "Provider": {
          "$$typeof": Symbol(react.provider),
          "_context": [Circular],
        },
        "_currentRenderer": null,
        "_currentRenderer2": null,
        "_currentValue": undefined,
        "_currentValue2": undefined,
        "_defaultValue": null,
        "_globalName": null,
        "_threadCount": 0,
      },
      "createConfig": [Function],
      "createStorage": [Function],
      "useAccount": [Function],
      "useBlockNumber": [Function],
      "useConfig": [Function],
      "useConnect": [Function],
      "useDisconnect": [Function],
      "useSyncExternalStoreWithTracked": [Function],
    }
  `)
})
