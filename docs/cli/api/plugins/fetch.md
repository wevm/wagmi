# fetch

Plugin for fetching and parsing ABIs from network resource with `fetch`.

## Import

```ts
import { fetch } from '@wagmi/cli/plugins'
```

## Usage

```ts{2,6-23}
import { defineConfig } from '@wagmi/cli'
import { fetch } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    fetch({
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
      request(contract) {
        if (!contract.address) throw new Error('address is required')
        const address =
          typeof contract.address === 'string'
            ? contract.address
            : Object.values(contract.address)[0]
        return {
          url: `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`,
        }
      },
    }),
  ],
})
```


## Configuration

```ts
import { type FetchConfig } from '@wagmi/cli/plugins'
```

### cacheDuration

`number | undefined`

- Duration in milliseconds to cache ABIs.
- Defaults to `1_800_000` (30 minutes).

```ts
import { defineConfig } from '@wagmi/cli'
import { fetch } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    fetch({
      cacheDuration: 300_000, // [!code focus]
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
      request(contract) {
        if (!contract.address) throw new Error('address is required')
        const address =
          typeof contract.address === 'string'
            ? contract.address
            : Object.values(contract.address)[0]
        return {
          url: `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`,
        }
      },
    }),
  ],
})
```

### contracts

`{ name: string; address?: Address | Record<number, Address> | undefined }[]`

Contracts to fetch ABIs for.

```ts
import { defineConfig } from '@wagmi/cli'
import { fetch } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    fetch({
      contracts: [ // [!code focus]
        { // [!code focus]
          name: 'Wagmigotchi', // [!code focus]
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1', // [!code focus]
        }, // [!code focus]
      ], // [!code focus]
      request(contract) {
        if (!contract.address) throw new Error('address is required')
        const address =
          typeof contract.address === 'string'
            ? contract.address
            : Object.values(contract.address)[0]
        return {
          url: `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`,
        }
      },
    }),
  ],
})

```

### getCacheKey

`((config: { contract: { address: Address | Record<chainId, Address> | undefined; name: string } }) => string) | undefined`

- Function for creating a cache key for contract. Contract data is cached at `~/.wagmi-cli/plugins/fetch/cache/`.
- Defaults to `({ contract }) => JSON.stringify(contract)`.

```ts
import { defineConfig } from '@wagmi/cli'
import { fetch } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    fetch({
      contracts: [
        {
          name: 'wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
      getCacheKey({ contract }) { // [!code focus]
        if (typeof contract.address === 'string') // [!code focus]
          return `${name}:${contract.address}` // [!code focus]
        return `${name}:${JSON.stringify(contract.address)}` // [!code focus]
      }, // [!code focus]
      request(contract) {
        if (!contract.address) throw new Error('address is required')
        const address =
          typeof contract.address === 'string'
            ? contract.address
            : Object.values(contract.address)[0]
        return {
          url: `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`,
        }
      },
    }),
  ],
})

```

### name

`string`

- Name of source.
- Defaults to `'Fetch'`.

```ts
import { defineConfig } from '@wagmi/cli'
import { fetch } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    fetch({
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
      name: 'Etherscan', // [!code focus]
      request(contract) {
        if (!contract.address) throw new Error('address is required')
        const address =
          typeof contract.address === 'string'
            ? contract.address
            : Object.values(contract.address)[0]
        return {
          url: `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`,
        }
      },
    }),
  ],
})
```

### parse

`((config: { response: Response }) => Abi | Promise<Abi>) | undefined`

- Function for parsing ABI from fetch response.
- Defaults to `({ response }) => response.json()`

```ts
import { defineConfig } from '@wagmi/cli'
import { fetch } from '@wagmi/cli/plugins'
 
export default defineConfig({
  plugins: [
    fetch({
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
      async parse({ response }) { // [!code focus]
        const json = await response.json() // [!code focus]
        if (json.status === '0') throw new Error(json.message) // [!code focus]
        return json.result // [!code focus]
      }, // [!code focus]
      request(contract) {
        if (!contract.address) throw new Error('address is required')
        const address =
          typeof contract.address === 'string'
            ? contract.address
            : Object.values(contract.address)[0]
        return {
          url: `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`,
        }
      },
    }),
  ],
})
```

### request

`(config: { address?: Address | Record<chainId, Address> | undefined }) => { url: RequestInfo; init?: RequestInit | undefined } | Promise<{ url: RequestInfo; init?: RequestInit | undefined }>`

Function for returning a request to fetch ABI from.

```ts
import { defineConfig } from '@wagmi/cli'
import { fetch } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    fetch({
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
      ],
      request(contract) { // [!code focus]
        if (!contract.address) throw new Error('address is required') // [!code focus]
        const address = // [!code focus]
          typeof contract.address === 'string' // [!code focus]
            ? contract.address // [!code focus]
            : Object.values(contract.address)[0] // [!code focus]
        return { // [!code focus]
          url: `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`, // [!code focus]
        } // [!code focus]
      }, // [!code focus]
    }),
  ],
})

```
