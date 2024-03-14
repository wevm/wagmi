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

### ChainNotConfiguredError

When a chain is not configured. You likely need to add the chain to <a :href="`/${docsPath}/api/createConfig#chains`">`Config['chains']`</a>.

```ts-vue
import { ChainNotConfiguredError } from '{{packageName}}'
```

### ConnectorAccountNotFound

When an account does not exist on the connector or is unable to be used.

```ts-vue
import { ConnectorAccountNotFound } from '{{packageName}}'
```

### ConnectorAlreadyConnectedError

When a connector is already connected.

```ts-vue
import { ConnectorAlreadyConnectedError } from '{{packageName}}'
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
