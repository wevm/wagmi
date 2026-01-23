---
title: useConnection
description: Composable for getting current connection.
---

# useConnection

Composable for getting current connection.

## Import

```ts
import { useConnection } from '@wagmi/vue'
```

## Usage

::: code-group
```vue twoslash [index.vue]
// @twoslash-cache: {"v":1,"hash":"13c71d856a5988592573d4377882b1c1fa1e1a07a6da8a54925e9753a897fb69","data":"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"}
<script setup lang="ts">
// ---cut-start---
// @errors: 2322
import { type Config } from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'

declare module '@wagmi/vue' {
  interface Register {
    config: Config<readonly [typeof mainnet, typeof sepolia]>
  }
}
// ---cut-end---
import { useConnection } from '@wagmi/vue'

const connection = useConnection()
</script>

<template>
  Address: {{ connection.address }}
</template>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"7e300c04b97782c39df43713d56b7a3f066187bfbb69ba67cfe1b4d60e143b11","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAJMcvAKpwYAYQhgwMAMZp2kgArNSzALYwapOAB4ZkgGbsA5rzo0wUOLwlgjpgLw3DJgHy8nwADphef3vp2JgD8iAEupgA+zkFRvACuljBG0lAA3D4Avj7salgQpGjCorbScgpgyqoaWghUcGgqDIgAjAAsVKwwYMZo+EgATADMVI2kxpp4IuKSZfJKKuqaZHUgHNJIAAxUMviLcmRI7ZkAujvQuIggufmFvMD82DDFM1Ky85WLNSu8mbwGpAgal4AHIAAIAd2YxjU7AA9ER4jAQZQQDVmEhQOZunAKng0AhMpkgA=="}
import { type UseConnectionParameters } from '@wagmi/vue'
```

### config

`Config | undefined`

[`Config`](/vue/api/createConfig#config) to use instead of retrieving from the nearest [`WagmiPlugin`](/vue/api/WagmiPlugin).

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { useConnection } from '@wagmi/vue'
import { config } from './config' // [!code focus]

const connection = useConnection({
  config, // [!code focus]
})
</script>
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Return Type

```ts twoslash
// @twoslash-cache: {"v":1,"hash":"b6f1971287fb7adb77e1a5d5dc952329e6dd516b560ac655f5064dcb9d4b925c","data":"N4Igdg9gJgpgziAXAbVAFwJ4AcZJACwgDcYAnEAGhDRgA808AKAQwBsBLZuASgAJMcvAKpwYAYQhgwMAMZp2kgEow0AV1JgAKthgAeGZIBm7AOa86NMFDi8JYY2YC8to6YB8vZ5ojLDcXcAAOmC8obzMUFCk8HCIvKpWMMbSUADcwWHhkdFworHxickwaRlhMvjM7GBxCbBFJSFlFVUAklA1hVXF6Y2hBlKyaBCkHXVdDZnscHbScsVxhmyiPZNwyv2z8mAmC0swK2FTM4NVO7yLrMuloVMAIlMbg/P8pKr717xwaMxq+YEgUAekk2xX+PQAvh4AD68by+fxBXpZKIxOIAQWyMQOoQiKNy8Di0QiklYGF4yAxeLgFF4ADp6ZScnBkABdFnY3jlSrVXiMOwOcz0GBWGz9AUAflszRCcTFpmQ/y5VTg/xZyDAqgAtgAjMgsvgw2pJcYcpVgNpxDU6sim4GDYZxY5yYYco52ubtF5vV3Td1bM4XK5Iu5AgYe3aXd7BtayP2nCNBzJfH6qP4gR4esHBSG8GFwpL+em06GwnwF3RFtzBdiarDDNDCURO+RKFTqLQ6SggZOkBiIACMABYqKxhSY0PgkAAmADMVG+pBMKjwInEcdbag02hwXY40iQAAYqFzSMw5uQB4PwSzj9BcIgQDW673eMB+DpG2uwy2wMpNx3BHBc5SAgTVeAAcgAAQAd2YExNXYAB6Ig3nArtNRUZgkFACxhTgBQwDwNAEHBcEgA=="}
import { type UseConnectionReturnType } from '@wagmi/vue'
```

<!--@include: @shared/getConnection-return-type.md-->

## Action

- [`getConnection`](/core/api/actions/getConnection)
