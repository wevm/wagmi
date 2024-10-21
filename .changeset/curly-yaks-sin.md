---
"@wagmi/connectors": minor
"@wagmi/core": minor
---

Added `rdns` property to connector interface. This is used to filter out duplicate [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) injected providers when [`createConfig#multiInjectedProviderDiscovery`](https://wagmi.sh/core/api/createConfig#multiinjectedproviderdiscovery) is enabled and `createConfig#connectors` already matches EIP-6963 providers' `rdns` property.
