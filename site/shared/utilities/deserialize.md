<!--
<script setup>
const packageName = 'wagmi'
</script>
-->

# deserialize

Deserialize function that supports `bigint` and `Map`.

## Import

```ts-vue
import { deserialize } from '{{packageName}}'
```

## Usage

```ts-vue
import { deserialize } from '{{packageName}}'

const result = deserialize('{"foo":"wagmi","bar":{"__type":"bigint","value":"123"}}')
```

## Parameters

### value

`string`

The string to deserialize.


### reviver

`(key: string, value: any) => any`

A custom reviver function for handling standard values.

## Return Type

`unknown`

Parsed value.