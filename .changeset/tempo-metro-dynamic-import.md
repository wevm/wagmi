---
"@wagmi/core": patch
---

Fixed Tempo connectors crashing with `TypeError: undefined is not a function` on bundlers where dynamic `import()` does not return a spec-compliant `Promise` (e.g. Metro/React Native).
