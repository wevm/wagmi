---
"create-wagmi": patch
"wagmi": patch
"@wagmi/core": patch
"@wagmi/vue": patch
---

Bumped Tanstack Query dependencies to fix typing issues between exported Wagmi query options and TanStack Query suspense query methods (due to [`direction` property in `QueryFunctionContext` being deprecated](https://github.com/TanStack/query/pull/7410)).
