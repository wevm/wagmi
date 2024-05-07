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

The following Etherscan block explorers and their testnets are supported (e.g. Ethereum Mainnet and Sepolia):

- [Ethereum](https://etherscan.io)
- [Arbiscan](https://arbiscan.io)
- [SnowScan](https://snowscan.xyz)
- [BscScan](https://bscscan.com)
- [FTMScan](https://ftmscan.com)
- [HecoScan](https://hecoinfo.com)
- [Optimistic Etherscan](https://optimistic.etherscan.io)
- [PolygonScan](https://polygonscan.com)
- [CeloScan](https://celoscan.io)
- [FraxScan](https://fraxscan.com)
- [GnosisScan](https://gnosisscan.io)

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
