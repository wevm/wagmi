---
"@wagmi/core": patch
---

Added chain check to `getConnectorClient` since it's possible for connection state chain ID to get out of sync with the connector (e.g. [wallet bug](https://github.com/MetaMask/metamask-extension/issues/25097)).
