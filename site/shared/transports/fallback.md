<!-- <script setup>
const packageName = 'wagmi'
</script> -->

# fallback

The `fallback` Transport consumes **multiple** Transports. If a Transport request fails, it will fall back to the next one in the list. Wraps Viem's [`fallback` Transport](https://viem.sh/docs/clients/transports/fallback).

## Import

```ts-vue
import { fallback } from '{{packageName}}'
```

## Usage

```ts-vue
import { 
  createConfig, 
  fallback, // [!code hl]
  http,
} from '{{packageName}}'
import { mainnet } from '{{packageName}}/chains'

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: fallback([ // [!code hl]
      http('https://foo-bar-baz.quiknode.pro/...'), // [!code hl]
      http('https://mainnet.infura.io/v3/...'), // [!code hl]
    ]) // [!code hl]
  },
})
```

