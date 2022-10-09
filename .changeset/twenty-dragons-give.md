---
'@wagmi/core': minor
---

**Breaking**: Updated TypeScript version to `typescript@>=4.7.4`.

`@wagmi/core` can now infer types based on [ABI](https://docs.soliditylang.org/en/v0.8.15/abi-spec.html#json) and [EIP-712](https://eips.ethereum.org/EIPS/eip-712) Typed Data definitions, giving you full end-to-end type-safety from your contracts to your frontend and incredible developer experience (e.g. autocomplete contract function names and catch misspellings, type contract function arguments, etc.).

For this to work, you must upgrade to `typescript@>=4.7.4`. Why is TypeScript v4.7.4 or greater necessary? TypeScript 4.7.4 introduced the ability to [extend constraints on inferred type variables](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#extends-constraints-on-infer-type-variables), which is used extensively to help narrow types for ABIs. Good news! When upgrading TypeScript from 4.6 to 4.7 there are likely no [breaking changes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#breaking-changes) for your set up.
