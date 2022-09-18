---
'wagmi': minor
---

**Breaking**: The `usePrepareSendTransaction` hook will now only run when the end-user is connected to their wallet.

This is to reach parity with `usePrepareContractWrite`.

If the end-user is not connected, then the `usePrepareSendTransaction` hook will remain idle.
