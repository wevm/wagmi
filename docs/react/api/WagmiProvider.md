# WagmiProvider

React Context Provider for Wagmi.

## Import

```ts
import { WagmiProvider } from 'wagmi'
```

## Usage

::: code-group
```tsx [app.tsx]
import { WagmiProvider } from 'wagmi'
import { config } from './config' 

function App() {
  return (
    <WagmiProvider value={config}> 
      {/** Your App */}
    </WagmiProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Parameters

```ts
import { type WagmiProviderProps } from 'wagmi'
```

### value

[`Config`](/react/createConfig#config) object to inject with context.

::: code-group
```tsx [app.tsx]
import { WagmiProvider } from 'wagmi'
import { config } from './config' 

function App() {
  return (
    <WagmiProvider value={config}> // [!code focus]
      {/** Your App */}
    </WagmiProvider>
  )
}
```
<<< @/snippets/react/config.ts[config.ts]
:::

## Context

```ts
import { type WagmiContext } from 'wagmi'
```