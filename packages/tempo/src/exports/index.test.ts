import { expect, test } from 'vitest'

import * as core from './index.js'

test('exports', () => {
  expect(Object.keys(core)).toMatchInlineSnapshot(`
    [
      "Actions",
      "Hooks",
      "KeyManager",
      "dangerous_secp256k1",
      "webAuthn",
    ]
  `)
})
