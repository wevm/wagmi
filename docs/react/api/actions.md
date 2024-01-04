# Actions

Sometimes the declarative nature of React Hooks doesn't work for parts of your app. For those cases, you can use Wagmi Core Actions directly!

All the Wagmi Core Actions are importable using the `wagmi/actions` entrypoint. For example, you can use the `watchBlockNumber` action to watch for block number changes.

::: code-group
```ts [index.tsx]
import { useConfig } from 'wagmi'
import { watchBlockNumber } from 'wagmi/actions'
import { useEffect } from 'react'

function App() {
  const config = useConfig()

  useEffect(() => {
    return watchBlockNumber(config, {
      onBlockNumber(blockNumber) {
        console.log('Block number changed!', blockNumber)
      },
    })
  }, [])
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

See the [Wagmi Core docs](/core/api/actions) for more info on what actions are available.
