<script setup>
const packageName = '@wagmi/core'
const actionName = 'call'
const typeName = 'call'
</script>

# call

Action for executing a new message call immediately without submitting a transaction to the network.

## Import

```ts
import { call } from '@wagmi/core'
```

## Usage

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Parameters

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"f9d98dd791931821ca041f2ffa5df1409ff16b6299b7878935aa5d977af43747","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAJMcvAMJtWABWalmAWxg1ScADwBjCGABm7AOa86NMFDjC1mnQF5jG7QD5eFka3GSZcskYBkw/M3ZgAklASUrLyKiY2ADpg7NJYEKRowqJBLvIIVHBokgyIAIwALFSsMGBaaPhIBVRZpFpyeA5Owa4KlCAcYLiIAAxUyt5SyvKV+QC+ALp90F0gMXEJvMD82DBJjikhbryjvOqkENK8AOQAAgDuzFrS7AD0qqQwR20hzEigeiVw7Gp4aAijoyAA"}
import { type CallParameters } from '@wagmi/core'
```

### account

`Account | Address | undefined`

The Account to call from.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### data

`` `0x${string}` | undefined ``

A contract hashed method call with encoded args.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### to

`Address | undefined`

The contract address or recipient.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### accessList

`AccessList | undefined`

The access list.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  accessList: [ // [!code focus:6] 
    {
      address: '0x1',
      storageKeys: ['0x1'],
    },
  ],
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### gas

`bigint | undefined`

The gas provided for transaction execution.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  gas: 1_000_000n, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### gasPrice

`bigint | undefined`

The price (in wei) to pay per gas. Only applies to [Legacy Transactions](https://viem.sh/docs/glossary/terms#legacy-transaction).

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { parseGwei } from 'viem'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### maxFeePerGas

`bigint | undefined`

Total fee per gas (in wei), inclusive of `maxPriorityFeePerGas`. Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { parseGwei } from 'viem'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  maxFeePerGas: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### maxPriorityFeePerGas

`bigint | undefined`

Max priority fee per gas (in wei). Only applies to [EIP-1559 Transactions](https://viem.sh/docs/glossary/terms#eip-1559-transaction).

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { parseGwei } from 'viem'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### nonce

`number | undefined`

Unique number identifying this transaction.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  nonce: 420, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### value

`bigint | undefined`

Value (in wei) sent with this transaction.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { parseEther } from 'viem'
import { config } from './config'

await call(config, {
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'), // [!code focus]
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockNumber

`number | undefined`

The block number to perform the call against.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  blockNumber: 15121123n, // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### blockTag

`'latest' | 'earliest' | 'pending' | 'safe' | 'finalized' | undefined`

The block tag to perform the call against.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'

await call(config, {
  blockTag: 'safe', // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

### chainId

`config['chains'][number]['id'] | undefined`

The block tag to perform the call against.

::: code-group
```ts [index.ts]
import { call } from '@wagmi/core'
import { config } from './config'
import { mainnet } from '@wagmi/core/chains'

await call(config, {
  chainId: mainnet.id, // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Return Type

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"21d9f77d5084c8206ac7e44980e375eda94c1b843ad4d776e3c3ed3a076f7de7","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAJMcvAMJtWAJRhoArqTAAVbDF4BeXsAA6YXtt5RmaZol4AJOrwA+vKWFgAzdmBhQA3JoC+m9gFssEUmmFRCWlZBRxKEDgDfyQARgAWKlYYMABzNHw4xOpmUlTJPBFWcUkZeUUIjkckAAYqAGN8XOZ6mnJEBLcAXQboXEQQb19/NX5FQOLgsrClN15bUggvXgByAAEAd2ZUr3YAenq/GBWIr0lmJFA6GjA4dggwPDQENzcgA==="}
import { type CallReturnType } from '@wagmi/core'
```

`{ data: 0x${string} }`

The call data.

## Error

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"b8acbdeab78439603d8a045b8f32426b8530ecc55b9057e0cccd65e1da03193a","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAJMcvAMJtWAUVKkIpACrYYvALy8A8gFt2aADwjW42jADGAVzTsIYCVNnyKvADohDzY3BiOAfLwBkvYPbBeIN5nVxhEXgAFZlI3AEFDQwhjMDQraTlBAB9eAEkwIjZ2KDioKFJ4OHSbbN4EpJS0AGU0ZhohCwAzDkM0yQz5Xhz8mgBzMhVTFU6AJWYwcerMhRym9gAvGDFaQxgYKDhosvYFtc2lwZyL2pa2mDi4OHZRsDUYVI6wbvZe65W8gpFKAAIQwNDgABl3qM0Pg/kNeAA6ZG8ABsAEZeGppApkYiEQBxGBoABy0C2/VIM2JxlIYGWAG4AgBfALsNRYaRoYSiP6UEBwVqkBiIdEAFiorGhsKQ6IAzFQheMRSBdOJKct+RwwLhEAAGKiGfAxZi9MiysXMgC6hvJeHZnOFfn4gzV8OZvE6UjUvAA5AABADuzFGGgA9EkKr7+W9WkhQHQaGAnhY8GgEMzmUA=="}
import { type CallErrorType } from '@wagmi/core'
```

<!--@include: @shared/query-imports.md-->

## Viem

- [`call`](https://viem.sh/docs/actions/public/call)
