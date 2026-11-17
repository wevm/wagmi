---
"@wagmi/core": patch
---

Fixed `getCapabilitiesQueryOptions`, `getCallsStatusQueryOptions`, `waitForCallsStatusQueryOptions`, and `prepareTransactionRequestQueryOptions` dropping an explicit `connector`, which made `useCapabilities`, `useCallsStatus`, `useWaitForCallsStatus`, and `usePrepareTransactionRequest` query the current connection instead of the passed connector.
