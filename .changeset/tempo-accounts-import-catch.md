---
"@wagmi/core": patch
---

Fixed the Tempo connectors crashing with `TypeError: undefined is not a function` when lazily loading the `accounts` peer dependency under bundlers whose transformed `import()` does not return a spec-compliant `Promise` (e.g. Metro/React Native). The result of `import()` is now awaited instead of having `.catch()` chained onto it.
