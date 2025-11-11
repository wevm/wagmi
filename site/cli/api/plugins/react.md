# react

Plugin for generating type-safe [Wagmi Hooks](/react/api/hooks).

## Import

```ts
import { react } from '@wagmi/cli/plugins'
```

## Usage

```ts{2,6}
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    react(),
  ],
})
```

## Configuration

```ts
import { type ReactConfig } from '@wagmi/cli/plugins'
```

### abiItemHooks

- Boolean flag to generate abi item hooks (e.g. hooks for each abi function and events).
- Defaults to `true`.

```ts
plugins: [
  react({ abiItemHooks: false }), // [!code focus]
],
```

### getHookName

`` 'legacy' | ((options: { contractName: string; type: 'read' | 'simulate' | 'watch' | 'write' }) => `use${string}`) ``

- Function for setting custom hook names.
- Defaults to `` `use${type}${contractName}` ``. For example, `useReadErc20`, `useSimulateErc20`, `useWatchErc20Event`, `useWriteErc20`.
- When `'legacy'` (deprecated), hook names are set to `@wagmi/cli@1` format.

```ts
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    react({
      getHookName({ contractName, type }) { // [!code focus]
        return `use${contractName}__${type}` // [!code focus]
      }, // [!code focus]
    }),
  ],
})
```

