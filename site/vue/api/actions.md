# Actions

Sometimes the declarative nature of Vue Composables doesn't work for parts of your app. For those cases, you can use Wagmi Core Actions directly!

All the Wagmi Core Actions are importable using the `@wagmi/vue/actions` entrypoint. For example, you can use the `watchBlockNumber` action to watch for block number changes.

::: code-group
```vue [index.vue]
<script setup lang="ts">
import { watchEffect } from 'vue'
import { useConfig } from '@wagmi/vue'
import { watchBlockNumber } from '@wagmi/vue/actions'

const config = useConfig()

watchEffect((onCleanup) => {
  const unwatch = watchBlockNumber(config, {
    onBlockNumber(blockNumber) {
      console.log('Block number changed!', blockNumber)
    },
  })

  onCleanup(unwatch)
})
</script>
```
<<< @/snippets/react/config.ts[config.ts]
:::

See the [Wagmi Core docs](/core/api/actions) for more info on what actions are available.
