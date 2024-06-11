# foundry

Plugin for resolving ABIs from [Foundry](https://github.com/foundry-rs/foundry) projects. Supports [`watch`](/cli/api/commands/generate#w-watch) mode.

## Import

```ts
import { foundry } from '@wagmi/cli/plugins'
```

## Usage

```ts{2,6-8}
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      project: '../hello_foundry',
    }),
  ],
})
```

## Configuration

```ts
import { type FoundryConfig } from '@wagmi/cli/plugins'
```

### artifacts

`string | undefined`

- Project's artifacts directory. Same as your `foundry.toml`/`forge`s `--out` (`-o`) option.
- Defaults to `'out/'`.

```ts
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      artifacts: 'out/', // [!code focus]
    }),
  ],
})
```

### deployments

`{ [key: string]: address?: Address | Record<chainId, Address> | undefined } | undefined`

Mapping of addresses to attach to artifacts.

```ts
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      deployments: { // [!code focus]
        Counter: { // [!code focus]
          1: '0x314159265dd8dbb310642f98f50c066173c1259b', // [!code focus]
          5: '0x112234455c3a32fd11230c42e7bccd4a84e02010', // [!code focus]
        }, // [!code focus]
      }, // [!code focus]
    }),
  ],
})
```

### exclude

`string[] | undefined`

Artifact files to exclude relative to `artifacts`. Supports glob patterns.

```ts
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      exclude: [ // [!code focus]
        // the following patterns are excluded by default // [!code focus]
        'Common.sol/**', // [!code focus]
        'Components.sol/**', // [!code focus]
        'Script.sol/**', // [!code focus]
        'StdAssertions.sol/**', // [!code focus]
        'StdInvariant.sol/**', // [!code focus]
        'StdError.sol/**', // [!code focus]
        'StdCheats.sol/**', // [!code focus]
        'StdMath.sol/**', // [!code focus]
        'StdJson.sol/**', // [!code focus]
        'StdStorage.sol/**', // [!code focus]
        'StdUtils.sol/**', // [!code focus]
        'Vm.sol/**', // [!code focus]
        'console.sol/**', // [!code focus]
        'console2.sol/**', // [!code focus]
        'test.sol/**', // [!code focus]
        '**.s.sol/*.json', // [!code focus]
        '**.t.sol/*.json', // [!code focus]
      ], // [!code focus]
    }),
  ],
})
```

### forge

`{ clean?: boolean | undefined; build?: boolean | undefined; path?: string | undefined; rebuild?: boolean | undefined } | undefined`

Options for `forge`.

```ts
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      forge: {  // [!code focus]
        clean: true,  // [!code focus]
        build: true,  // [!code focus]
        path: 'path/to/forge',  // [!code focus]
        rebuild: true,  // [!code focus]
      },  // [!code focus]
    }),
  ],
})
```

#### clean

- Remove build artifacts and cache directories on start up.
- Defaults to `false`.

#### build

- Build Foundry project before fetching artifacts.
- Defaults to `true`.

#### path

- Path to `forge` executable command.
- Defaults to `forge`.

#### rebuild

- Rebuild every time a watched file or directory is changed. Used for setting up [`watch`](/cli/api/commands/generate#w-watch) mode.
- Defaults to `true`.

### include

`string[] | undefined`

Artifact files to include relative to `artifacts`. Supports glob patterns.

```ts
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      include: [  // [!code focus]
        // the following patterns are included by default  // [!code focus]
        '*.json',  // [!code focus]
      ],  // [!code focus]
    }),
  ],
})
```

### namePrefix

`string | undefined`

Prefix to prepend to artifact names. Useful for preventing name collisions between contracts from other sources.

```ts
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({  // [!code focus]
      namePrefix: 'HelloFoundry',  // [!code focus]
    }),  // [!code focus]
  ],
})
```

### project

`string | undefined`

- Path to Foundry project.
- Defaults to Foundry configuration using `forge config --json` command.

```ts
import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({ // [!code focus]
      project: '../hello_foundry', // [!code focus]
    }), // [!code focus]
  ],
})
```