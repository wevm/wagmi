---
'@wagmi/core': patch
'wagmi': patch
---

Added the ability to provide a custom logger to override how logs are broadcasted to the consumer in wagmi.

A custom logger can be provided to the wagmi client via `logger`.

### API

```tsx
logger?: {
  warn: typeof console.warn | null
}
```

### Examples

**Passing in a custom logger**

You can pass in a function to define your own custom logger.

```diff
+ import { logWarn } from './logger';

const client = createClient({
  ...
+ logger: {
+   warn: message => logWarn(message)
+ }
  ...
})
```

**Disabling a logger**

You can disable a logger by passing `null` as the value.

```diff
const client = createClient({
  ...
+ logger: {
+   warn: null
+ }
  ...
})
```
