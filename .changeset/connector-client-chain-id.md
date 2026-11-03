---
"@wagmi/core": patch
---

Improved `getConnectorClient` performance by reusing the connector chain ID it already read when `connector` is passed, instead of requesting it from the connector a second time.
