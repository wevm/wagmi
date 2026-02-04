# WagmiProvider

Solid Context Provider for Wagmi.

## Import

```ts
import { WagmiProvider } from '@wagmi/solid'
```

## Usage

```tsx
import { WagmiProvider } from '@wagmi/solid'
import { config } from './config'

function App() {
  return (
    <WagmiProvider config={config}>
      {/** ... */}
    </WagmiProvider>
  )
}
```

## Parameters

```ts
import { type WagmiProviderProps } from '@wagmi/solid'
```

### config

[`Config`](/solid/api/createConfig#config) object to inject with context.

```tsx
import { WagmiProvider } from '@wagmi/solid'
import { config } from './config'

function App() {
  return (
    <WagmiProvider
      config={config} // [!code focus]
    >
      {/** ... */}
    </WagmiProvider>
  )
}
```

### initialState

`State | undefined`

- Initial state to hydrate into the [Wagmi Config](/solid/api/createConfig). Useful for SSR.

```tsx
import { WagmiProvider } from '@wagmi/solid'
import { config } from './config'

function App() {
  return (
    <WagmiProvider
      config={config}
      initialState={/* ... */} // [!code focus]
    >
      {/** ... */}
    </WagmiProvider>
  )
}
```

### reconnectOnMount

`boolean | undefined`

- Whether or not to reconnect previously connected [connectors](/solid/api/createConfig#connectors) on mount.
- Defaults to `true`.

```tsx
import { WagmiProvider } from '@wagmi/solid'
import { config } from './config'

function App() {
  return (
    <WagmiProvider
      config={config}
      reconnectOnMount={false} // [!code focus]
    >
      {/** ... */}
    </WagmiProvider>
  )
}
```

## Context

```ts
import { type WagmiContext } from '@wagmi/solid'
```
