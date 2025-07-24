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
      "writeContractsMutationOptions",
      "getCallsStatusQueryKey",
      "getCallsStatusQueryOptions",
      "getCapabilitiesQueryKey",
      "getCapabilitiesQueryOptions",
      "sendCallsMutationOptions",
      "showCallsStatusMutationOptions",
      "waitForCallsStatusQueryKey",
      "waitForCallsStatusQueryOptions",
    ]
  `)
})
