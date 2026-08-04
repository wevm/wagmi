---
"@wagmi/core": patch
---

Fixed Tempo connectors crashing when dynamic `import()` returns a thenable without `.catch`, such as with Metro.
