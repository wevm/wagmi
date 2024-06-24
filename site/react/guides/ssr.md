---
outline: deep
---

# SSR

Wagmi uses client-only external stores (such as `localStorage` and `mipd`) to show the user the most relevant data as quickly as possible on first render.

However, the caveat of using these external client stores is that frameworks which incorporate SSR (such as Next.js) will throw hydration warnings on the client when it identifies mismatches between the server-rendered HTML and the client-rendered HTML.

To stop this from happening, you can toggle on the [`ssr`](/react/api/createConfig#ssr) property in the Wagmi Config.

```tsx
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

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
} from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

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

### 2. Hydrate the cookie

Next, we will need to add some mechanisms to hydrate the stored cookie in Wagmi.

#### Next.js App Directory

In our `app/layout.tsx` file (a [Server Component](https://nextjs.org/docs/app/building-your-application/rendering/server-components)), we will need to extract the cookie from the `headers` function and pass it to [`cookieToInitialState`](/react/api/utilities/cookieToInitialState). 

We will need to pass this result to the [`initialState` property](/react/api/WagmiProvider#initialstate) of the `WagmiProvider`. The `WagmiProvider` **must** be in a Client Component tagged with `"use client"` (see `app/providers.tsx` tab).

::: code-group
```tsx [app/layout.tsx]
import { type ReactNode } from 'react'
import { headers } from 'next/headers' // [!code ++]
import { cookieToInitialState } from 'wagmi' // [!code ++]

import { getConfig } from './config'
import { Providers } from './providers'

export default function Layout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState( // [!code ++]
    getConfig(), // [!code ++]
    headers().get('cookie') // [!code ++]
  ) // [!code ++]
  return (
    <html lang="en">
      <body>
        <Providers> // [!code --]
        <Providers initialState={initialState}> // [!code ++]
          {children}
        </Providers>
      </body>
    </html>
  )
}

```

```tsx [app/providers.tsx]
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'

import { getConfig } from './config'

type Props = {
  children: ReactNode,
  initialState: State | undefined, // [!code ++]
}

export function Providers({ children }: Props) {  // [!code --]
export function Providers({ children, initialState }: Props) {  // [!code ++]
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}> // [!code --]
    <WagmiProvider config={config} initialState={initialState}> // [!code ++]
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

```

```tsx [app/config.ts]
import { 
  createConfig, 
  http, 
  cookieStorage,
  createStorage 
} from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

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

#### Next.js Pages Directory

Would you like to contribute this content? Feel free to [open a Pull Request](https://github.com/wevm/wagmi/pulls)!
<!-- TODO -->

#### Vanilla SSR

Would you like to contribute this content? Feel free to [open a Pull Request](https://github.com/wevm/wagmi/pulls)!
<!-- TODO -->

