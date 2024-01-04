# blockExplorer

Plugin for fetching ABIs from block explorers that supports the `?module=contract&action=getabi` API format.

## Import

```ts
import { blockExplorer } from '@wagmi/cli/plugins'
```

## Usage

```ts{2,6-14}
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    blockExplorer({
      baseUrl: 'https://api.etherscan.io/api',
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
    }),
  ],
})
```

## Configuration

```ts
import { type BlockExplorerConfig } from '@wagmi/cli/plugins'
```

### apiKey

`string | undefined`

API key for block explorer. Appended to the request URL as query param `&apikey=${apiKey}`.

```ts
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    blockExplorer({
      apiKey: process.env.ETHERSCAN_API_KEY, // [!code focus]
      baseUrl: 'https://api.etherscan.io/api',
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
    }),
  ],
})
```

### baseUrl

`string`

Base URL for block explorer.

```ts
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    blockExplorer({
      baseUrl: 'https://api.etherscan.io/api', // [!code focus]
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
    }),
  ],
})
```

### cacheDuration

`number | undefined`

Duration in milliseconds to cache ABIs. Defaults to `1_800_000` (30 minutes).

```ts
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    blockExplorer({
      baseUrl: 'https://api.etherscan.io/api',
      cacheDuration: 300_000, // [!code focus]
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
    }),
  ],
})
```

### contracts

`{ name: string; address?: Address | Record<number, Address> | undefined }[]`

Contracts to fetch ABIs for.

```ts
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    blockExplorer({
      baseUrl: 'https://api.etherscan.io/api',
      contracts: [ // [!code focus]
        { // [!code focus]
          name: 'Wagmigotchi', // [!code focus]
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1', // [!code focus]
        }, // [!code focus]
      ], // [!code focus]
    }),
  ],
})
```

### getAddress

`((config: { address: Address | Record<number, Address> }) => Address) | undefined`

- Function to get address from contract config.
- Defaults to `({ address }) => typeof address === 'string' ? address : Object.values(address)[0]`.

```ts
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    blockExplorer({
      baseUrl: 'https://api.etherscan.io/api',
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
      getAddress({ address }) { // [!code focus]
        if (typeof address === 'string') return address // [!code focus]
        return Object.values(address)[0] // [!code focus]
      }, // [!code focus]
    }),
  ],
})
```

### name

`string`

- Name of source.
- Defaults to `'Block Explorer'`.

```ts
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    blockExplorer({
      baseUrl: 'https://api.etherscan.io/api',
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
      name: 'Etherscan', // [!code focus]
    }),
  ],
})
```