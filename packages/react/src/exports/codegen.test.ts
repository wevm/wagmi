import { expect, test } from 'vitest'

import * as codegen from './codegen.js'

test('exports', () => {
  expect(Object.keys(codegen)).toMatchInlineSnapshot(`
    [
      "createReadContract",
      "createSimulateContract",
      "createUseReadContract",
      "createUseSimulateContract",
      "createUseWatchContractEvent",
      "createUseWriteContract",
      "createWatchContractEvent",
      "createWriteContract",
    ]
  `)
})
