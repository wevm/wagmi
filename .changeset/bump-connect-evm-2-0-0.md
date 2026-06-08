---
"@wagmi/connectors": minor
---

Updated `@metamask/connect-evm` to `2.0.0` and set `skipAutoAnnounce: true` on the `metaMask` connector to prevent the SDK from announcing its EIP-1193 provider via EIP-6963.

`@metamask/connect-evm` v2 makes `@metamask/connect-multichain` a required peer dependency (it was previously installed transitively). If you use the `metaMask` connector, install it alongside `@metamask/connect-evm`:

```bash
npm install @metamask/connect-evm@^2.0.0 @metamask/connect-multichain@^1.0.0
```
