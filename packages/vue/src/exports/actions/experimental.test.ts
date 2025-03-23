import { expect, test } from 'vitest'

import * as experimentalActions from './experimental.js'

test('exports', () => {
  expect(Object.keys(experimentalActions)).toMatchInlineSnapshot(`
    [
      "getCallsStatus",
      "getCapabilities",
      "sendCalls",
      "showCallsStatus",
      "waitForCallsStatus",
      "writeContracts",
      "getCallsStatusQueryOptions",
      "getCallsStatusQueryKey",
      "getCapabilitiesQueryOptions",
      "getCapabilitiesQueryKey",
      "sendCallsMutationOptions",
      "showCallsStatusMutationOptions",
      "waitForCallsStatusQueryKey",
      "waitForCallsStatusQueryOptions",
      "writeContractsMutationOptions",
    ]
  `)
})
