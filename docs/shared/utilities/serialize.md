<!--
<script setup>
const packageName = 'wagmi'
</script>
-->

# serialize

Serialize function that supports `bigint` and `Map`.

## Import

```ts-vue
import { serialize } from '{{packageName}}'
```

## Usage

```ts-vue
import { serialize } from '{{packageName}}'

const result = serialize({ foo: 'wagmi', bar: 123n })
```

## Parameters

### value

`any`

The value to stringify.

### replacer

`(key: string, value: any) => any`

A custom replacer function for handling standard values.

### indent

`number | null | undefined`

The number of spaces to indent the output by.

### circularReplacer

A custom replacer function for handling circular values.

## Return Type

`string`

Stringified value.