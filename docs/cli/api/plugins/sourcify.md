# sourcify

Plugin for fetching ABIs from [Sourcify](https://sourcify.dev/). Sourcify is a decentralized, open-source, smart contract verification and metadata repository.

## Import

```ts
import { sourcify } from '@wagmi/cli/plugins'
```

## Usage

```ts{2,6-13}
import { defineConfig } from '@wagmi/cli'
import { sourcify } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    sourcify({
      contracts: [
        {
          name: 'deposit',
          address: '0x00000000219ab540356cbb839cbe05303d7705fa',
        },
      ],
    }),
  ],
})
```

## Configuration

```ts
import { type SourcifyConfig } from '@wagmi/cli/plugins'
```

### cacheDuration

`number | undefined`

- Duration in milliseconds to cache ABIs.
- Defaults to `1_800_000` (30 minutes).

```ts
import { defineConfig } from '@wagmi/cli'
import { sourcify } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    sourcify({
      cacheDuration: 300_000, // [!code focus]
      chainId: 100,
      contracts: [
        {
          name: 'Deposit',
          address: '0x00000000219ab540356cbb839cbe05303d7705fa',
        },
      ],
    }),
  ],
})
```

### chainId

`number`

Chain ID to use for fetching ABI. If `address` is an object, `chainId` is used to select the address. See [Sourcify docs](https://docs.sourcify.dev/docs/chains) for supported chains.

```ts
import { defineConfig } from '@wagmi/cli'
import { sourcify } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    sourcify({
      chainId: 100, // [!code focus]
      contracts: [
        {
          name: 'Community',
          address: {
            100: '0xC4c622862a8F548997699bE24EA4bc504e5cA865',
            137: '0xC4c622862a8F548997699bE24EA4bc504e5cA865',
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
import { sourcify } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    sourcify({
      chainId: 100,
      contracts: [ // [!code focus]
        { // [!code focus]
          name: 'Deposit', // [!code focus]
          address: '0x00000000219ab540356cbb839cbe05303d7705fa', // [!code focus]
        }, // [!code focus]
      ], // [!code focus]
    }),
  ],
})
```
