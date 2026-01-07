import { expect, test } from 'vitest'

import * as tempo from './tempo.js'

test('exports', () => {
  expect(Object.keys(tempo)).toMatchInlineSnapshot(`
    [
      "Actions",
      "Hooks",
      "KeyManager",
      "dangerous_secp256k1",
      "webAuthn",
    ]
  `)
})
