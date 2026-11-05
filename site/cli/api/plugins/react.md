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

`boolean | ((options: { contractName: string }) => boolean)`

- Generate hooks for each ABI function and event, in addition to contract-level hooks (e.g. `useReadErc20BalanceOf` alongside `useReadErc20`).
- Defaults to `true`.
- Pass a function to enable ABI item hooks for some contracts and not others. `contractName` is the contract `name` from config.

```ts
plugins: [
  react({ abiItemHooks: false }), // [!code focus]
],
```

```ts
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    react({
      abiItemHooks({ contractName }) { // [!code focus]
        return contractName === 'Erc20' // [!code focus]
      }, // [!code focus]
    }),
  ],
})
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

