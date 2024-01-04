# actions

Plugin for type-safe VanillaJS actions.

## Import

```ts
import { actions } from '@wagmi/cli/plugins'
```

## Usage

```ts{2,6}
import { defineConfig } from '@wagmi/cli'
import { actions } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    actions(),
  ],
})
```

## Configuration

```ts
import { type ActionsConfig } from '@wagmi/cli/plugins'
```

### getActionName

`` 'legacy' | ((options: { contractName: string; type: 'read' | 'simulate' | 'watch' | 'write' }) => `use${string}`) ``

- Function for setting custom hook names.
- Defaults to `` `${type}${contractName}` ``. For example, `readErc20`, `simulateErc20`, `watchErc20Event`, `writeErc20`.
- When `'legacy'` (deprecated), hook names are set to `@wagmi/cli@1` format.

```ts
import { defineConfig } from '@wagmi/cli'
import { actions } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    actions({
      getActionName({ contractName, type }) { // [!code focus]
        return `${contractName}__${type}` // [!code focus]
      }, // [!code focus]
    }),
  ],
})
```

### overridePackageName

`'@wagmi/core' | 'wagmi'`

- Override detected import source.
- Defaults to `'wagmi'` or `'@wagmi/core'` depending on which package is installed.

```ts
import { defineConfig } from '@wagmi/cli'
import { actions } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    actions({
      overridePackageName: 'wagmi', // [!code focus]
    }),
  ],
})
```

