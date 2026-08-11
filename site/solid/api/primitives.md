<script setup>
import { getSidebar } from '../../.vitepress/sidebar'

const primitives = getSidebar()['/solid']
  .find(x => x.text === 'Primitives').items
  .sort((a, b) => a.text.localeCompare(b.text))
</script>

# Primitives

Solid Primitives for accounts, wallets, contracts, transactions, signing, and more.

## Import

```ts
import { useConnection } from '@wagmi/solid'
```

## Reactive Parameters

In Solid, primitive parameters are passed as getter functions (accessors) to maintain reactivity. This is different from React where parameters are passed directly as objects.

```ts
// Solid style
useBlockNumber(() => ({ chainId: 1 }))
```

## Available Primitives

<ul>
  <li v-for="primitive of primitives">
    <a :href="primitive.link">{{ primitive.text }}</a>
  </li>
</ul>
