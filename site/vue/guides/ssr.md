---
outline: deep
---

# SSR

Wagmi uses client-only external stores (such as `localStorage` and `mipd`) to show the user the most relevant data as quickly as possible on first render.

However, the caveat of using these external client stores is that frameworks which incorporate SSR (such as Next.js) will throw hydration warnings on the client when it identifies mismatches between the server-rendered HTML and the client-rendered HTML.

To stop this from happening, you can toggle on the [`ssr`](/vue/api/createConfig#ssr) property in the Wagmi Config.

```tsx
import { createConfig, http } from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'

const config = createConfig({ // [!code focus:99]
  chains: [mainnet, sepolia],
  ssr: true, // [!code ++]
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

Turning on the `ssr` property means that content from the external stores will be hydrated on the client after the initial mount.

## Persistence using Cookies

As a result of turning on the `ssr` property, external persistent stores like `localStorage` will be hydrated on the client **after the initial mount**.

This means that you will still see a flash of "empty" data on the client (e.g. a `"disconnected"` account instead of a `"reconnecting"` account, or an empty address instead of the last connected address) until after the first mount, when the store hydrates.

In order to persist data between the server and the client, you can use cookies.

### 1. Set up cookie storage

First, we will set up cookie storage in the Wagmi Config.

```tsx
import { 
  createConfig, 
  http, 
  cookieStorage, // [!code ++]
  createStorage // [!code ++]
} from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  storage: createStorage({  // [!code ++]
    storage: cookieStorage, // [!code ++]
  }),  // [!code ++]
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

### 2. Hydrate the cookie

Next, we will need to add some mechanisms to hydrate the stored cookie in Wagmi.

#### Nuxt.js

In a Nuxt plugin, read the cookie (from the request headers on the server, `document.cookie` on the client) and pass it to [`cookieToInitialState`](/vue/api/utilities/cookieToInitialState). Pass the result to the [`initialState` property](/vue/api/WagmiPlugin#initialstate) of `WagmiPlugin`.

Create the config inside the plugin so each server request gets its own config instead of sharing state across users.

::: code-group
```ts [plugins/wagmi.ts]
import { VueQueryPlugin } from '@tanstack/vue-query'
import { cookieToInitialState, WagmiPlugin } from '@wagmi/vue' // [!code ++]
import { defineNuxtPlugin, useRequestHeaders } from 'nuxt/app' // [!code ++]

import { getConfig } from '../config'

export default defineNuxtPlugin((nuxtApp) => {
  const config = getConfig()
  const initialState = cookieToInitialState( // [!code ++]
    config, // [!code ++]
    import.meta.server // [!code ++]
      ? useRequestHeaders(['cookie']).cookie // [!code ++]
      : document.cookie, // [!code ++]
  ) // [!code ++]

  nuxtApp.vueApp
    .use(WagmiPlugin, { config }) // [!code --]
    .use(WagmiPlugin, { config, initialState }) // [!code ++]
    .use(VueQueryPlugin, {})
})
```

```ts [config.ts]
import { 
  createConfig, 
  http, 
  cookieStorage,
  createStorage 
} from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    ssr: true,
    storage: createStorage({  // [!code ++]
      storage: cookieStorage, // [!code ++]
    }),  // [!code ++]
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  })
}
```
:::

#### Vanilla SSR

Would you like to contribute this content? Feel free to [open a Pull Request](https://github.com/wevm/wagmi/pulls)!
<!-- TODO -->


