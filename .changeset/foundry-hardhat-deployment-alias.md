---
'@wagmi/cli': minor
---

Added support for aliasing an artifact's ABI under a different contract name in the `foundry` and `hardhat` plugins' `deployments` mapping. A deployment entry can now be `{ artifact, address }`, which creates a contract named after the deployment key that reuses the named artifact's ABI. This makes it possible to generate multiple contracts (e.g. different ERC20 tokens) that share a single artifact's ABI but have different addresses.
