<script setup>
import { getSidebar } from '../../.vitepress/sidebar'

const connectors = getSidebar()['/react']
  .find(x => x.text.includes('Configuration')).items
  .find(x => x.text.includes('Connectors')).items
  .sort((a, b) => a.text.localeCompare(b.text))
</script>

# Connectors

Connectors for popular wallet providers and protocols.

## Import

Import via the `'@wagmi/vue/connectors'` entrypoint.

```ts
import { injected } from '@wagmi/vue/connectors'
```

## Available Connectors

<ul>
  <li v-for="connector of connectors">
    <a :href="connector.link">{{ connector.text }}</a>
  </li>
</ul>
