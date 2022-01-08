---
'wagmi-private': minor
'wagmi': minor
'wagmi-testing': minor
---

Moves connectors to their own entrypoints to reduce bundle size.

```ts
// old - WalletLinkConnector unused, but still in final bundle
import { InjectedConnector, WalletConnectConnector } from 'wagmi'

// new - WalletLinkConnector not in final bundle
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
```
