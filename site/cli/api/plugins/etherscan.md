# etherscan

Plugin for fetching ABIs from [Etherscan](https://etherscan.io) and adding into `contracts` config.

## Import

```ts
import { etherscan } from '@wagmi/cli/plugins'
```

## Usage

```ts{2,6-14}
import { defineConfig } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY,
      chainId: 1,
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
import { type EtherscanConfig } from '@wagmi/cli/plugins'
```

### apiKey

`string`

Etherscan API key. Etherscan API keys are specific per network and include testnets (e.g. Ethereum Mainnet and Sepolia share same API key).

```ts
import { defineConfig } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY, // [!code focus]
      chainId: 1,
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

- Duration in milliseconds to cache ABIs.
- Defaults to `1_800_000` (30 minutes).

```ts
import { defineConfig } from '@wagmi/cli'
import { etherscan } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY,
      cacheDuration: 300_000, // [!code focus]
      chainId: 1,
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

### chainId

`number`

Chain ID to use for fetching ABI. If [`address`](/cli/config/options#address) is an object, `chainId` is used to select the address.

View supported chains on the [Etherscan docs](https://docs.etherscan.io/etherscan-v2/getting-started/supported-chains).

```ts
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY,
      chainId: 1, // [!code focus]
      contracts: [
        {
          name: 'Wagmigotchi',
          address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
        },
        {
          name: 'EnsRegistry',
          address: {
            1: '0x314159265dd8dbb310642f98f50c066173c1259b',
            5: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
          },
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
import { etherscan } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY,
      chainId: 1,
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

### tryFetchProxyImplementation

`boolean | undefined`

- Whether to try fetching proxy implementation address of the contract.
- Defaults to `false`.

```ts
import { defineConfig } from '@wagmi/cli'
import { blockExplorer } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY,
      chainId: 1, 
      contracts: [
        {
          name: 'FiatToken',
          address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
      ],
      tryFetchProxyImplementation: true, // [!code focus]
    }),
  ],
})
```


