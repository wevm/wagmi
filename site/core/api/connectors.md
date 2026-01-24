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

Available via the `'@wagmi/connectors'` package.

```ts
import { injected } from '@wagmi/connectors'
```

## Built-In Connectors

::: tip
Some connectors require third-party packages. See the "Install" section on each connector's page for more info on license, version, and more.
:::

<ul>
  <li v-for="connector of connectors">
    <a :href="connector.link">{{ connector.text }}</a>
  </li>
</ul>
