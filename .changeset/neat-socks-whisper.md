---
"create-wagmi": patch
"wagmi": patch
"@wagmi/core": patch
"@wagmi/vue": patch
---

Bumped Tanstack React Query dependencies to fix typing issues. Using `wagmi`'s Query Options methods in Suspense Queries previously thrown a type issue due to `direction` property in `QueryFunctionContext` being deprecated. [See more](https://github.com/TanStack/query/pull/7410).
