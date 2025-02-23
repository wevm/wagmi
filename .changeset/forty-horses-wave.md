---
"wagmi": patch
"@wagmi/core": patch
---

**Experimental (ERC-5792)**: 

- Removed `writeContracts` Action and Hook – use `sendCalls` instead.
- Added support for `account: null` in `sendCalls` to cater for sending calls without a connected account (account will be filled by the wallet).