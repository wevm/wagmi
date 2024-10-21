---
"@wagmi/connectors": patch
"@wagmi/core": patch
---

Added `rdns` property to connector interface. This is used to filter out duplicate [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) injected providers when `createConfig#multiInjectedProviderDiscovery` is enabled.
