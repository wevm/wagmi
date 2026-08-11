# Errors

`@wagmi/solid` exports error types that can be used for type-safe error handling.

## Import

```ts
import { 
  BaseError,
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  // ...
} from '@wagmi/solid'
```

## Base Error

All Wagmi errors extend from `BaseError`:

```ts
import { BaseError } from '@wagmi/solid'

try {
  // Wagmi operation
} catch (error) {
  if (error instanceof BaseError) {
    console.error('Wagmi error:', error.message)
    console.error('Details:', error.details)
  }
}
```

## Available Errors

### ChainNotConfiguredError

Thrown when trying to use a chain that isn't configured in your Wagmi config.

```ts
import { ChainNotConfiguredError } from '@wagmi/solid'

try {
  // Operation with unconfigured chain
} catch (error) {
  if (error instanceof ChainNotConfiguredError) {
    console.error('Chain not configured:', error.message)
  }
}
```

### ConnectorNotFoundError

Thrown when trying to use a connector that doesn't exist or isn't available.

```ts
import { ConnectorNotFoundError } from '@wagmi/solid'

try {
  // Connect operation
} catch (error) {
  if (error instanceof ConnectorNotFoundError) {
    console.error('Wallet not installed')
  }
}
```

### ConnectorAlreadyConnectedError

Thrown when trying to connect with a connector that's already connected.

```ts
import { ConnectorAlreadyConnectedError } from '@wagmi/solid'

try {
  // Connect operation
} catch (error) {
  if (error instanceof ConnectorAlreadyConnectedError) {
    console.error('Already connected')
  }
}
```

### ProviderNotFoundError

Thrown when the connector's provider is not found.

```ts
import { ProviderNotFoundError } from '@wagmi/solid'

try {
  // Provider operation
} catch (error) {
  if (error instanceof ProviderNotFoundError) {
    console.error('Provider not found')
  }
}
```

### SwitchChainNotSupportedError

Thrown when the connector doesn't support programmatic chain switching.

```ts
import { SwitchChainNotSupportedError } from '@wagmi/solid'

try {
  // Switch chain operation
} catch (error) {
  if (error instanceof SwitchChainNotSupportedError) {
    console.error('Chain switching not supported')
  }
}
```

## More Errors

See the [`@wagmi/core` Errors docs](/core/api/errors) for the full list of available error types.
