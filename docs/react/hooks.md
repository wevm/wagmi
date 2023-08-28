<script setup>
import { getSidebar } from '../.vitepress/sidebar'

const hooks = getSidebar()['/react']
  .find(x => x.text === 'API').items
  .find(x => x.link === '/react/hooks').items
  .sort((a, b) => a.text.localeCompare(b.text))
</script>

# Hooks

React Hooks for accounts, wallets, contracts, transactions, signing, ENS, and more.

## Import

```ts
import { useAccount } from 'wagmi'
```

## All Hooks

<ul>
  <li v-for="hook of hooks">
    <a :href="hook.link">{{ hook.text }}</a>
  </li>
</ul>
