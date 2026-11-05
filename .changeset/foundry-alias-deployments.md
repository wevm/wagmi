---
"@wagmi/cli": patch
---

Added support for named Foundry deployments that share one artifact's ABI, via `deployments: { <name>: { artifact, address } }` in the `foundry` plugin. This fixes multiple contract addresses (e.g. different ERC20 tokens) that reuse the same ABI only generating one config.
