<!--
<script setup>
const docsPath = 'react'
const packageName = 'wagmi'
</script>
-->

# createStorage

Creates new [`Storage`](#storage) object.

## Import

```ts-vue
import { createStorage } from '{{packageName}}'
```

## Usage

```ts-vue
import { createStorage } from '{{packageName}}'

const storage = createStorage({ storage: localStorage })
```

## Parameters

```ts-vue
import { type CreateStorageParameters } from '{{packageName}}'
```

### deserialize

`(<T>(value: string) => T) | undefined`

- Function to deserialize data from storage.
- Defaults to <a :href="`/${docsPath}/utilities/deserialize`">`deserialize`</a>.

```ts-vue
import { createStorage, deserialize } from '{{packageName}}' // [!code focus]

const storage = createStorage({
  deserialize, // [!code focus]
  storage: localStorage,
})
```

::: warning
If you use a custom `deserialize` function, make sure it can handle `bigint` and `Map` values.
:::

### key

`string | undefined`

- Key prefix to use when persisting data.
- Detaults to `'wagmi'`.

```ts-vue
import { createStorage } from '{{packageName}}'

const storage = createStorage({
  key: 'my-app', // [!code focus]
  storage: localStorage,
})
```

### serialize

`(<T>(value: T) => string) | undefined`

- Function to serialize data for storage.
- Defaults to <a :href="`/${docsPath}/utilities/serialize`">`serialize`</a>.

```ts-vue
import { createStorage, serialize } from '{{packageName}}' // [!code focus]

const storage = createStorage({
  serialize, // [!code focus]
  storage: localStorage,
})
```

::: warning
If you use a custom `serialize` function, make sure it can handle `bigint` and `Map` values.
:::

### storage

`{ getItem: (key: string) => string | null; setItem: (key: string, value: string) => void; removeItem: (key: string) => void; }`

Storage interface to use for persisting data.

```ts-vue
import { createStorage } from '{{packageName}}'

const storage = createStorage({
  storage: localStorage, // [!code focus]
})
```

## Return Type

```ts-vue
import { type Storage } from '{{packageName}}'
```

## Storage

Object responsible for persisting Wagmi <a :href="`/${docsPath}/createConfig#state-1`">`State`</a> and other data.

```ts-vue
import { type Storage } from '{{packageName}}'
```

### getItem

`getItem(key: string, defaultValue?: value | null) => value | null`

```ts-vue
import { createStorage } from '{{packageName}}'

const storage = createStorage({ storage: localStorage })
const recentConnectorId = storage.getItem('recentConnectorId') // [!code focus]
```

### setItem

`setItem(key: string, value: any) => void`

```ts-vue
import { createStorage } from '{{packageName}}'

const storage = createStorage({ storage: localStorage })
storage.setItem('recentConnectorId', 'foo') // [!code focus]
```

### removeItem

`removeItem(key: string) => void`

```ts-vue
import { createStorage } from '{{packageName}}'

const storage = createStorage({ storage: localStorage })
storage.removeItem('recentConnectorId') // [!code focus]
```