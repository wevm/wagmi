---
'@wagmi/core': minor
---

**Breaking**: `prepareSendTransaction` now only accepts a `signer` instead of `signerOrProvider`. 

This is to reach parity with `prepareWriteContract`.

If no `signer` is provided, wagmi will use the signer that is currently connected. If no user is connected, then `prepareWriteContract` will throw an error.
