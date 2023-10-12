# hardhat

Plugin for resolving ABIs from [Hardhat](https://hardhat.org) projects. Supports [`watch`](/cli/api/commands/generate#w-watch) mode.

```ts
import { hardhat } from '@wagmi/cli/plugins'
```

## Usage

```ts{2,6-8}
import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    hardhat({
      project: '../hello_hardhat',
    }),
  ],
})
```

## Configuration

```ts
import { type HardhatConfig } from '@wagmi/cli/plugins'
```

### artifacts

`string | undefined`

- Project's artifacts directory. Same as your project's `artifacts` [path configuration](https://hardhat.org/hardhat-runner/docs/config#path-configuration) option.
- Defaults to `'artifacts/'`.

```ts
import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    hardhat({
      artifacts: 'out/', // [!code focus]
      project: '../hello_hardhat',
    }),
  ],
})
```

### deployments

`{ [key: string]: address?: Address | Record<chainId, Address> | undefined } | undefined`

Mapping of addresses to attach to artifacts.

```ts
import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    hardhat({
      project: '../hello_hardhat',
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
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    hardhat({
      exclude: [ // [!code focus]
        // the following patterns are excluded by default // [!code focus]
        'build-info/**', // [!code focus]
        '*.dbg.json', // [!code focus]
      ], // [!code focus]
      project: '../hello_hardhat',
    }),
  ],
})
```

### commands

`{ clean?: string | boolean | undefined; build?: string | boolean | undefined; rebuild?: string | boolean | undefined } | undefined`

Hardhat command options.

```ts
import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    hardhat({
      commands: { // [!code focus]
        clean: 'pnpm hardhat clean', // [!code focus]
        build: 'pnpm hardhat compile', // [!code focus]
        rebuild: 'pnpm hardhat compile', // [!code focus]
      }, // [!code focus]
      project: '../hello_hardhat',
    }),
  ],
})
```

#### clean

- Remove build artifacts and cache directories on start up.
- Defaults to `'${packageManger} hardhat clean'`.

#### build

- Build Foundry project before fetching artifacts.
- Defaults to `'${packageManger} hardhat compile'`.

#### rebuild

- Command to run when watched file or directory is changed. Used for setting up [`watch`](/cli/api/commands/generate#w-watch) mode.
- Defaults to `'${packageManger} hardhat compile'`.

### include

`string[] | undefined`

Artifact files to include relative to `artifacts`. Supports glob patterns.

```ts
import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    hardhat({
      include: [ // [!code focus]
        // the following patterns are included by default // [!code focus]
        '*.json', // [!code focus]
      ], // [!code focus]
      project: '../hello_hardhat',
    }),
  ],
})
```

### namePrefix

`string | undefined`

Prefix to prepend to artifact names. Useful for preventing name collisions between contracts from other sources.

```ts
import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    hardhat({
      namePrefix: 'HelloHardhat', // [!code focus]
      project: '../hello_hardhat',
    }),
  ],
})
```

### project

`string`

Path to Hardhat project.

```ts
import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    hardhat({
      project: '../hello_hardhat', // [!code focus]
    }),
  ],
})
```