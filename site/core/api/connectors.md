<script setup>
import { getSidebar } from '../../.vitepress/sidebar'

const connectors = getSidebar()['/core']
  .find(x => x.text.includes('Configuration')).items
  .find(x => x.text.includes('Connectors')).items
  .sort((a, b) => a.text.localeCompare(b.text))
</script>

# Connectors

Connectors for popular wallet providers and protocols.

## Import

```ts
import { injected } from 'wagmi/connectors'
```

## Dedicated Connectors Package

Available via the `@wagmi/connectors` package.

<ul>
  <li v-for="connector of connectors">
    <a :href="connector.link">{{ connector.text }}</a>
  </li>
</ul>
