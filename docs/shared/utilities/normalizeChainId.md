<!--
<script setup>
const packageName = 'wagmi'
</script>
-->

# normalizeChainId

Normalizes a chain ID to a number.

## Import

```ts-vue
import { normalizeChainId } from '{{packageName}}'
```

## Usage

:::warning Deprecated
Use `Number` instead.

```ts-vue
import { normalizeChainId } from '{{packageName}}' // [!code --]
const chainId = normalizeChainId(123n) // [!code --]
const chainId = Number(123n) // [!code ++]
```
:::

```ts-vue
import { normalizeChainId } from '{{packageName}}'

const result = normalizeChainId('0x1')
```

## Parameters


### chainId

`bigint | number | string`

The chain ID to normalize.

```ts-vue
import { normalizeChainId } from '{{packageName}}'

normalizeChainId(1n)
normalizeChainId(1)
normalizeChainId('0x1')
```

## Return Type

`number`

The normalized chain ID.
