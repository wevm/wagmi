import { expect, test } from 'vitest'

import * as experimentalActions from './experimental.js'

test('exports', () => {
  expect(Object.keys(experimentalActions)).toMatchInlineSnapshot(`
    [
      "getCallsStatus",
      "getCallsStatusQueryKey",
      "getCallsStatusQueryOptions",
      "getCapabilities",
      "getCapabilitiesQueryKey",
      "getCapabilitiesQueryOptions",
      "sendCalls",
      "sendCallsMutationOptions",
      "showCallsStatus",
      "showCallsStatusMutationOptions",
      "waitForCallsStatus",
      "waitForCallsStatusQueryKey",
      "waitForCallsStatusQueryOptions",
      "writeContracts",
      "writeContractsMutationOptions",
    ]
  `)
})
