---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking:** Removed the `version` config option for `WalletConnectConnector`.

`WalletConnectConnector` now uses WalletConnect v2 by default. WalletConnect v1 is now `WalletConnectLegacyConnector`.

### WalletConnect v2

```diff
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const connector = new WalletConnectConnector({
  options: {
-   version: '2',
    projectId: 'abc',
  },
})
```

### WalletConnect v1

```diff
-import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
+import { WalletConnectConnector } from 'wagmi/connectors/walletConnectLegacy'

-const connector = new WalletConnectConnector({
+const connector = new WalletConnectLegacyConnector({
  options: {
    qrcode: true,
  },
})
```
