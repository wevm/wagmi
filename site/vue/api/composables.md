<script setup>
import { getSidebar } from '../../.vitepress/sidebar'

const composables = getSidebar()['/vue']
  .find(x => x.text === 'Composables').items
  .sort((a, b) => a.text.localeCompare(b.text))
</script>

# Composables

Vue Composables for accounts, wallets, contracts, transactions, signing, ENS, and more.

## Import

```ts
import { useAccount } from '@wagmi/vue'
```

## Available Composables

<ul>
  <li v-for="composable of composables">
    <a :href="composable.link">{{ composable.text }}</a>
  </li>
</ul>
