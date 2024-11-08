<!--
<script setup>
const docsPath = 'react'
const packageName = 'wagmi'
</script>
-->

## BaseError

Error class extended by all errors.

```ts-vue
import { BaseError } from '{{packageName}}'
```

## Config

### ConnectorAccountNotFoundError

When an account does not exist on the connector or is unable to be used.

```ts-vue
import { ConnectorAccountNotFoundError } from '{{packageName}}'
```

### ConnectorAlreadyConnectedError

When a connector is already connected.

```ts-vue
import { ConnectorAlreadyConnectedError } from '{{packageName}}'
```

### ConnectorChainMismatchError

When the Wagmi Config is out-of-sync with the connector's active chain ID. This is rare and likely an upstream wallet issue.

```ts-vue
import { ConnectorChainMismatchError } from '{{packageName}}'
```

### ChainNotConfiguredError

When a chain is not configured. You likely need to add the chain to <a :href="`/${docsPath}/api/createConfig#chains`">`Config['chains']`</a>.

```ts-vue
import { ChainNotConfiguredError } from '{{packageName}}'
```

### ConnectorNotConnectedError

When a connector is not connected.

```ts-vue
import { ConnectorNotConnectedError } from '{{packageName}}'
```

### ConnectorNotFoundError

When a connector is not found or able to be used.

```ts-vue
import { ConnectorNotFoundError } from '{{packageName}}'
```

### ConnectorUnavailableReconnectingError

During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uuid`. All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored. This error commonly occurs for connectors that asynchronously inject after reconnection has already started.

```ts-vue
import { ConnectorUnavailableReconnectingError } from '{{packageName}}'
```

## Connector

### ProviderNotFoundError

When a connector's provider is not found or able to be used.

```ts-vue
import { ProviderNotFoundError } from '{{packageName}}'
```

### SwitchChainNotSupportedError

When switching chains is not supported by connectors.

```ts-vue
import { SwitchChainNotSupportedError } from '{{packageName}}'
```
