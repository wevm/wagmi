---
'@wagmi/core': patch
'wagmi': patch
---

Omitted `"EIP712Domain"` type from `signTypedData` `types` arg since ethers throws an [internal error](https://github.com/ethers-io/ethers.js/blob/c80fcddf50a9023486e9f9acb1848aba4c19f7b6/packages/hash/src.ts/typed-data.ts#L466) if you include it.
