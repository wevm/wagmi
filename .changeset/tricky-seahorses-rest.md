---
'@wagmi/core': patch
---

Added a `multicall` & `watchMulticall` action that provides multicall support.

Internally uses the [`multicall3` contract](https://github.com/mds1/multicall).

[See example usage](https://github.com/tmm/wagmi/blob/194866032985fdd3f49bc46bf1b14181d7cb61d1/packages/core/src/actions/contracts/multicall.test.ts)
