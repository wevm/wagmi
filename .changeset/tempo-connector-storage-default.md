---
'@wagmi/core': patch
---

Made `tempoWallet` connector use the accounts SDK's default storage (`Storage.idb`) instead of wrapping wagmi's `config.storage`. Access keys now share state with other `Provider.create` consumers on the same origin, so silent signing works cross-page.

Users may need to reconnect once — old state at `wagmi.accounts.xyz.tempo.*` in localStorage is no longer read.
