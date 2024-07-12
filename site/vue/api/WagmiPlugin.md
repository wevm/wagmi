# WagmiPlugin

[Vue Plugin](https://vuejs.org/guide/reusability/plugins.html#plugins) for Wagmi.

## Import

```ts
import { WagmiPlugin } from '@wagmi/vue'
```

## Usage

::: code-group
```ts [main.ts]
import { createApp } from 'vue'
import { WagmiPlugin } from '@wagmi/vue'

import App from './App.vue'
import { config } from './config' 

createApp(App)
  .use(WagmiPlugin, { config })
  .mount('#app')
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## Parameters

```ts
import { type WagmiPluginProps } from '@wagmi/vue'
```

### config

[`Config`](/vue/api/createConfig#config) object to inject with context.

::: code-group
```ts [main.ts]
import { createApp } from 'vue'
import { WagmiPlugin } from '@wagmi/vue'

import App from './App.vue'
import { config } from './config' 

createApp(App)
  .use(WagmiPlugin, { 
    config // [!code focus]
  })
  .mount('#app')
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### initialState

`State | undefined`

- Initial state to hydrate into the [Wagmi Config](/vue/api/createConfig). Useful for SSR.

::: code-group
```ts [main.ts]
import { createApp } from 'vue'
import { WagmiPlugin } from '@wagmi/vue'

import App from './App.vue'
import { config } from './config' 

createApp(App)
  .use(WagmiPlugin, { 
    config,
    initialState: /* ... */ // [!code focus]
  })
  .mount('#app')
```
<<< @/snippets/vue/config.ts[config.ts]
:::

### reconnectOnMount

`boolean | undefined`

- Whether or not to reconnect previously connected [connectors](/vue/api/createConfig#connectors) on mount.
- Defaults to `true`.

::: code-group
```ts [main.ts]
import { createApp } from 'vue'
import { WagmiPlugin } from '@wagmi/vue'

import App from './App.vue'
import { config } from './config' 

createApp(App)
  .use(WagmiPlugin, { 
    config,
    reconnectOnMount: false // [!code focus]
  })
  .mount('#app')
```
<<< @/snippets/vue/config.ts[config.ts]
:::

## configKey

Key to use to provide/inject `Config` via `WagmiPlugin`.

```ts
import { configKey, type Config } from '@wagmi/vue'
import { inject } from 'vue'

inject<Config | undefined>(configKey)
```
