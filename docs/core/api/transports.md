<script setup>
import { getSidebar } from '../../.vitepress/sidebar'

const transports = getSidebar()['/core']
  .find(x => x.text.includes('Configuration')).items
  .find(x => x.text.includes('Transports')).items
  .sort((a, b) => a.text.localeCompare(b.text))
</script>

# Transports

[`createConfig`](/core/api/createConfig) can be instantiated with a set of Transports for each chain. A Transport is the intermediary layer that is responsible for executing outgoing JSON-RPC requests to the RPC Provider (e.g. Alchemy, Infura, etc).

## Import

```ts
import { http } from '@wagmi/core'
```

## Built-In Transports

Available via the `'@wagmi/core'` entrypoint.

<ul>
  <li v-for="transport of transports">
    <a :href="transport.link">{{ transport.text }}</a>
  </li>
</ul>
